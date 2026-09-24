/*
 * File: server/src/services/calendarFileLibrary.ts
 * Purpose: Builds the public Library file index from canonical calendar days.
 */

import fs from "fs";
import path from "path";
import { getEnochYearStartDate } from "./appointedTimesCalendar";
import { CalendarDayContent } from "../types/calendarContent";

export type CalendarLibraryFile = {
  id: string;
  label: string;
  url: string;
  mimeType: string;
  sizeBytes?: number;
  uploadedAt?: string;
  enochYear: number;
  month: number;
  day: number;
  gregorianDate: string;
  dayTitle: string;
};

export type CalendarFileLibraryOptions = {
  query?: string;
  type?: string;
  limit?: number;
  contentRoot?: string;
};

const FILE_URL_PREFIX = "/api/files/";

export function getPublicCalendarFiles(
  options: CalendarFileLibraryOptions = {}
): CalendarLibraryFile[] {
  const contentRoot = options.contentRoot ?? path.join(process.cwd(), "content");
  const daysRoot = path.join(contentRoot, "groups", "public", "days");
  const query = (options.query ?? "").trim().toLowerCase();
  const requestedType = (options.type ?? "").trim().toLowerCase();
  const limit = Math.min(Math.max(options.limit ?? 100, 1), 500);
  const records: CalendarLibraryFile[] = [];

  for (const jsonPath of walkJsonFiles(daysRoot)) {
    try {
      const content = JSON.parse(
        fs.readFileSync(jsonPath, "utf8")
      ) as CalendarDayContent;

      for (const section of content.sections ?? []) {
        for (const item of section.items ?? []) {
          if (
            item.access !== "public" ||
            !item.url?.startsWith(FILE_URL_PREFIX)
          ) {
            continue;
          }

          const mimeType = item.mimeType ?? inferMimeType(item.url);
          if (requestedType && !mimeType.includes(requestedType)) continue;

          const searchText = [
            item.label,
            content.title,
            content.notes,
            content.enochYear,
            content.month,
            content.day,
          ]
            .join(" ")
            .toLowerCase();
          if (query && !searchText.includes(query)) continue;

          const diskPath = resolveFilePath(contentRoot, item.url);
          if (!diskPath || !fs.existsSync(diskPath)) continue;
          const stat = fs.statSync(diskPath);
          const timestamp = getTimestampFromFilename(item.url);

          records.push({
            id: item.url,
            label: item.originalName ?? item.label,
            url: item.url,
            mimeType,
            sizeBytes: item.sizeBytes ?? stat.size,
            uploadedAt:
              item.uploadedAt ??
              (timestamp ? new Date(timestamp).toISOString() : stat.mtime.toISOString()),
            enochYear: content.enochYear,
            month: content.month,
            day: content.day,
            gregorianDate:
              content.gregorianDate ??
              addDays(
                getEnochYearStartDate(content.enochYear),
                (content.month - 1) * 30 + content.day - 1
              ),
            dayTitle: content.title,
          });
        }
      }
    } catch (error) {
      console.log(`Skipping unreadable calendar day ${jsonPath}`, error);
    }
  }

  return records
    .sort((left, right) => right.gregorianDate.localeCompare(left.gregorianDate))
    .slice(0, limit);
}

function walkJsonFiles(root: string): string[] {
  if (!fs.existsSync(root)) return [];
  return fs.readdirSync(root, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(root, entry.name);
    return entry.isDirectory()
      ? walkJsonFiles(entryPath)
      : entry.isFile() && entry.name.endsWith(".json")
        ? [entryPath]
        : [];
  });
}

function resolveFilePath(contentRoot: string, url: string): string | null {
  const relativePath = decodeURIComponent(url.slice(FILE_URL_PREFIX.length));
  const resolvedRoot = path.resolve(contentRoot);
  const resolvedPath = path.resolve(resolvedRoot, relativePath);
  return resolvedPath.startsWith(`${resolvedRoot}${path.sep}`) ? resolvedPath : null;
}

function getTimestampFromFilename(url: string): number | null {
  const match = path.basename(url).match(/^(\d{13})-/);
  return match ? Number(match[1]) : null;
}

function inferMimeType(url: string): string {
  const extension = path.extname(url).toLowerCase();
  const types: Record<string, string> = {
    ".pdf": "application/pdf",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".gif": "image/gif",
    ".webp": "image/webp",
    ".txt": "text/plain",
  };
  return types[extension] ?? "application/octet-stream";
}

function addDays(dateString: string, dayCount: number): string {
  const date = new Date(`${dateString}T00:00:00.000Z`);
  date.setUTCDate(date.getUTCDate() + dayCount);
  return date.toISOString().slice(0, 10);
}
