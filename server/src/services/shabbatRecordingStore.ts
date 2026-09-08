import crypto from "crypto";
import fs from "fs";
import path from "path";

const RECORDINGS_ROOT =
  process.env.COTW_RECORDINGS_ROOT ??
  "/srv/studybox-backups/churchoftheword/completed";
const DOWNLOAD_TICKET_TTL_MS = 2 * 60 * 1000;
const MEDIA_EXTENSIONS = new Set([
  ".m4a",
  ".mkv",
  ".mov",
  ".mp3",
  ".mp4",
  ".wav",
  ".webm",
]);

type RecordingManifest = {
  recordingTitle?: string;
  meetingEndedAt?: string;
  recordingStartedAt?: string;
  createdAt?: string;
};

type DownloadTicket = {
  filePath: string;
  expiresAt: number;
};

const downloadTickets = new Map<string, DownloadTicket>();

function readManifest(bundlePath: string): RecordingManifest {
  const manifestPath = path.join(bundlePath, "manifest.json");

  try {
    return JSON.parse(fs.readFileSync(manifestPath, "utf-8"));
  } catch {
    return {};
  }
}

function getBundlePath(bundleId: string) {
  if (!/^[a-zA-Z0-9._-]+$/.test(bundleId)) {
    return null;
  }

  const bundlePath = path.join(RECORDINGS_ROOT, bundleId);

  if (!fs.existsSync(bundlePath) || !fs.statSync(bundlePath).isDirectory()) {
    return null;
  }

  return bundlePath;
}

function getMediaFilePath(bundleId: string, fileName: string) {
  const bundlePath = getBundlePath(bundleId);

  if (!bundlePath || path.basename(fileName) !== fileName) {
    return null;
  }

  const extension = path.extname(fileName).toLowerCase();
  const filePath = path.join(bundlePath, fileName);

  if (
    !MEDIA_EXTENSIONS.has(extension) ||
    !fs.existsSync(filePath) ||
    !fs.statSync(filePath).isFile()
  ) {
    return null;
  }

  const realRoot = fs.realpathSync(RECORDINGS_ROOT);
  const realFilePath = fs.realpathSync(filePath);

  return realFilePath.startsWith(`${realRoot}${path.sep}`)
    ? realFilePath
    : null;
}

export function listShabbatRecordings() {
  if (!fs.existsSync(RECORDINGS_ROOT)) {
    return [];
  }

  return fs
    .readdirSync(RECORDINGS_ROOT, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .flatMap((entry) => {
      const bundlePath = getBundlePath(entry.name);

      if (!bundlePath) return [];

      const manifest = readManifest(bundlePath);
      const files = fs
        .readdirSync(bundlePath, { withFileTypes: true })
        .filter(
          (file) =>
            file.isFile() &&
            MEDIA_EXTENSIONS.has(path.extname(file.name).toLowerCase())
        )
        .map((file) => {
          const stats = fs.statSync(path.join(bundlePath, file.name));
          const extension = path.extname(file.name).toLowerCase();

          return {
            name: file.name,
            size: stats.size,
            kind: [".mp4", ".mov", ".mkv", ".webm"].includes(extension)
              ? "video"
              : "audio",
          };
        });

      if (files.length === 0) return [];

      return [
        {
          id: entry.name,
          title: manifest.recordingTitle ?? entry.name,
          recordedAt:
            manifest.meetingEndedAt ??
            manifest.recordingStartedAt ??
            manifest.createdAt ??
            fs.statSync(bundlePath).mtime.toISOString(),
          files,
        },
      ];
    })
    .sort((left, right) => right.recordedAt.localeCompare(left.recordedAt));
}

export function createRecordingDownloadTicket(
  bundleId: string,
  fileName: string
) {
  const filePath = getMediaFilePath(bundleId, fileName);

  if (!filePath) return null;

  const ticket = crypto.randomBytes(32).toString("hex");
  downloadTickets.set(ticket, {
    filePath,
    expiresAt: Date.now() + DOWNLOAD_TICKET_TTL_MS,
  });

  return ticket;
}

export function consumeRecordingDownloadTicket(ticket: string) {
  const record = downloadTickets.get(ticket);
  downloadTickets.delete(ticket);

  if (!record || record.expiresAt <= Date.now()) {
    return null;
  }

  return record.filePath;
}

export function deleteShabbatRecording(bundleId: string) {
  const bundlePath = getBundlePath(bundleId);

  if (!bundlePath) {
    return false;
  }

  const realRoot = fs.realpathSync(RECORDINGS_ROOT);
  const realBundlePath = fs.realpathSync(bundlePath);

  if (
    path.dirname(realBundlePath) !== realRoot ||
    !realBundlePath.startsWith(`${realRoot}${path.sep}`)
  ) {
    return false;
  }

  fs.rmSync(realBundlePath, { recursive: true, force: false });
  return true;
}
