import { NextFunction, Request, Response, Router } from "express";
import dotenv from "dotenv";
import { Pool } from "pg";
import { timingSafeEqual } from "node:crypto";
import { readFile } from "node:fs/promises";
import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

dotenv.config({ path: process.env.STUDYBOX_LIBRARY_ENV_FILE ?? "/etc/studybox/cloud-library.env" });

const router = Router();
const pool = new Pool({
  connectionString: process.env.STUDYBOX_LIBRARY_DATABASE_URL ?? process.env.DATABASE_URL,
});

router.post("/sync", requireSyncToken, async (req, res, next) => {
  const connection = await pool.connect();
  try {
    const recording = req.body?.recording as Record<string, unknown> | undefined;
    const document = req.body?.document as Record<string, unknown> | undefined;
    const recordingId = stringValue(document?.recordingId) ?? stringValue(recording?.id);
    if (!recordingId || !document) {
      res.status(400).json({ error: "A transcript document with a recordingId is required" });
      return;
    }

    const chunks = arrayOfRecords(document.chunks);
    const markers = arrayOfRecords(document.markers);
    const searchable = [
      recording?.title,
      document.title,
      document.description,
      ...chunks.map((chunk) => chunk.text),
      ...markers.flatMap((marker) => [marker.label, marker.scripture, marker["scripture?"]]),
    ].filter(Boolean).join(" ");
    const audioAsset = req.body?.audioAsset ?? document.audioAsset ?? findAsset(recording, "audio");
    const zoomAsset = req.body?.zoomAsset ?? document.zoomAsset ?? findAsset(recording, "zoom");

    await connection.query("BEGIN");
    await connection.query(`
      INSERT INTO library_recordings
        (id, title, description, recorded_at, duration_seconds, source_file_sha256, transcript_status, visibility, searchable_text, audio_asset, zoom_asset, updated_at)
      VALUES ($1,$2,$3,$4,$5,$6,$7,'public',$8,$9,$10,now())
      ON CONFLICT (id) DO UPDATE SET title=EXCLUDED.title, description=EXCLUDED.description,
        recorded_at=EXCLUDED.recorded_at, duration_seconds=COALESCE(EXCLUDED.duration_seconds, library_recordings.duration_seconds),
        source_file_sha256=EXCLUDED.source_file_sha256, transcript_status=EXCLUDED.transcript_status,
        visibility='public', searchable_text=EXCLUDED.searchable_text,
        audio_asset=COALESCE(EXCLUDED.audio_asset, library_recordings.audio_asset),
        zoom_asset=COALESCE(EXCLUDED.zoom_asset, library_recordings.zoom_asset), updated_at=now()`,
      [recordingId, stringValue(document.title) ?? stringValue(recording?.title) ?? "Untitled teaching",
        stringValue(document.description) ?? null, stringValue(recording?.startedAt) ?? stringValue(document.recordedAt) ?? null,
        integerValue(recording?.durationSeconds) ?? inferredDuration(chunks), stringValue(document.sourceFileSha256) ?? null,
        stringValue(document.status) ?? "completed", searchable, jsonValue(audioAsset), jsonValue(zoomAsset)]
    );
    await connection.query("DELETE FROM transcript_chunks WHERE recording_id = $1", [recordingId]);
    await connection.query("DELETE FROM transcript_markers WHERE recording_id = $1", [recordingId]);
    for (const chunk of chunks) {
      await connection.query(
        "INSERT INTO transcript_chunks (id, recording_id, chunk_index, start_seconds, end_seconds, text, audio_asset) VALUES ($1,$2,$3,$4,$5,$6,$7)",
        [stringValue(chunk.id) ?? `${recordingId}-${chunk.index}`, recordingId, numberValue(chunk.index) ?? 0,
          numberValue(chunk.startSeconds) ?? 0, numberValue(chunk.endSeconds), stringValue(chunk.text), audioAsset ? JSON.stringify({ ...audioAsset as object, chunkIndex: chunk.index }) : null]
      );
    }
    for (const marker of markers) {
      await connection.query(
        "INSERT INTO transcript_markers (recording_id, timestamp_seconds, label, scripture, kind) VALUES ($1,$2,$3,$4,$5)",
        [recordingId, numberValue(marker.timestampSeconds) ?? 0, stringValue(marker.label) ?? "Section",
          stringValue(marker.scripture ?? marker["scripture?"]), stringValue(marker.kind)]
      );
    }
    await connection.query("COMMIT");
    res.json({ ok: true, recordingId, chunks: chunks.length, markers: markers.length });
  } catch (error) {
    await connection.query("ROLLBACK").catch(() => undefined);
    next(error);
  } finally {
    connection.release();
  }
});

router.get("/", async (req, res, next) => {
  try {
    const query = String(req.query.q ?? "").trim();
    const limit = Math.min(100, Math.max(1, Number(req.query.limit ?? 30)));
    const offset = Math.max(0, Number(req.query.offset ?? 0));
    const result = query
      ? await pool.query(`
          SELECT id, title, description, recorded_at, duration_seconds, transcript_status, audio_asset, zoom_asset,
            ts_headline('simple', left(searchable_text, 12000), websearch_to_tsquery('simple', $1), 'MaxFragments=2,MaxWords=35,MinWords=12') AS match_preview
          FROM library_recordings
          WHERE visibility = 'public' AND to_tsvector('simple', searchable_text) @@ websearch_to_tsquery('simple', $1)
          ORDER BY recorded_at DESC NULLS LAST, created_at DESC LIMIT $2 OFFSET $3`, [query, limit, offset])
      : await pool.query(`
          SELECT id, title, description, recorded_at, duration_seconds, transcript_status, audio_asset, zoom_asset, NULL AS match_preview
          FROM library_recordings
          WHERE visibility = 'public'
          ORDER BY recorded_at DESC NULLS LAST, created_at DESC LIMIT $1 OFFSET $2`, [limit, offset]);
    res.json({ items: result.rows, query, limit, offset });
  } catch (error) { next(error); }
});

router.get("/search", async (req, res, next) => {
  try {
    const query = String(req.query.q ?? "").trim();
    const limit = Math.min(100, Math.max(1, Number(req.query.limit ?? 30)));
    const result = await pool.query(`
      SELECT id, title, description, recorded_at, duration_seconds, transcript_status, audio_asset, zoom_asset,
        ts_headline('simple', left(searchable_text, 12000), websearch_to_tsquery('simple', $1), 'MaxFragments=2,MaxWords=35,MinWords=12') AS match_preview
      FROM library_recordings
      WHERE visibility = 'public' AND ($1 = '' OR to_tsvector('simple', searchable_text) @@ websearch_to_tsquery('simple', $1))
      ORDER BY recorded_at DESC NULLS LAST, created_at DESC LIMIT $2`, [query, limit]);
    res.json({ items: result.rows, query, limit, offset: 0 });
  } catch (error) { next(error); }
});

router.get("/:id/assets/:kind/download", async (req, res, next) => {
  try {
    const kind = req.params.kind === "zoom" || req.params.kind === "audio" ? req.params.kind : undefined;
    if (!kind) { res.status(400).json({ error: "Asset kind must be audio or zoom" }); return; }
    const result = await pool.query(`SELECT title, ${kind}_asset AS asset FROM library_recordings WHERE id = $1 AND visibility = 'public'`, [req.params.id]);
    const row = result.rows[0] as { title?: string; asset?: Record<string, unknown> } | undefined;
    const asset = row?.asset;
    if (!asset) { res.status(404).json({ error: `${kind} archive is not available` }); return; }
    const directUrl = stringValue(asset.url);
    if (directUrl) { res.redirect(302, directUrl); return; }
    const bucket = stringValue(asset.archiveBucket);
    const key = stringValue(asset.archiveKey);
    if (!bucket || !key) { res.status(404).json({ error: `${kind} archive is not available` }); return; }
    const client = await s3Client();
    const url = await getSignedUrl(client, new GetObjectCommand({ Bucket: bucket, Key: key }), { expiresIn: 900 });
    res.redirect(302, url);
  } catch (error) { next(error); }
});

router.get("/:id", async (req, res, next) => {
  try {
    const recording = await pool.query("SELECT * FROM library_recordings WHERE id = $1", [req.params.id]);
    if (!recording.rowCount) { res.status(404).json({ error: "Recording not found" }); return; }
    const [chunks, markers] = await Promise.all([
      pool.query("SELECT id, chunk_index, start_seconds, end_seconds, text, audio_asset FROM transcript_chunks WHERE recording_id = $1 ORDER BY chunk_index", [req.params.id]),
      pool.query("SELECT timestamp_seconds, label, scripture, kind FROM transcript_markers WHERE recording_id = $1 ORDER BY timestamp_seconds", [req.params.id]),
    ]);
    res.json({ recording: recording.rows[0], chunks: chunks.rows, markers: markers.rows });
  } catch (error) { next(error); }
});

function requireSyncToken(req: Request, res: Response, next: NextFunction): void {
  const expected = process.env.STUDYBOX_CLOUD_SYNC_TOKEN?.trim() ?? "";
  const header = req.header("authorization") ?? "";
  const actual = header.startsWith("Bearer ") ? header.slice(7) : "";
  if (!expected || actual.length !== expected.length || !timingSafeEqual(Buffer.from(actual), Buffer.from(expected))) {
    res.status(401).json({ error: "Cloud library sync authorization required" });
    return;
  }
  next();
}

let configuredS3Client: S3Client | undefined;
async function s3Client(): Promise<S3Client> {
  if (configuredS3Client) return configuredS3Client;
  const accessKeyId = process.env.STUDYBOX_S3_ACCESS_KEY ?? await readFile(process.env.STUDYBOX_S3_ACCESS_KEY_FILE ?? "/etc/studybox/s3-access-key", "utf8");
  const secretAccessKey = process.env.STUDYBOX_S3_SECRET_KEY ?? await readFile(process.env.STUDYBOX_S3_SECRET_KEY_FILE ?? "/etc/studybox/s3-secret-key", "utf8");
  const bucketConfig = await readFile(process.env.STUDYBOX_S3_BUCKET_FILE ?? "/etc/studybox/s3-bucket", "utf8");
  const [, endpointLine] = bucketConfig.split(/\r?\n/).map((value) => value.trim()).filter(Boolean);
  configuredS3Client = new S3Client({ endpoint: process.env.STUDYBOX_S3_ENDPOINT ?? (endpointLine?.startsWith("http") ? endpointLine : `https://${endpointLine}`), region: process.env.STUDYBOX_S3_REGION ?? "us-east-1", forcePathStyle: true, credentials: { accessKeyId: accessKeyId.trim(), secretAccessKey: secretAccessKey.trim() } });
  return configuredS3Client;
}

function stringValue(value: unknown): string | undefined { return typeof value === "string" && value.trim() ? value.trim() : undefined; }
function numberValue(value: unknown): number | undefined { return typeof value === "number" && Number.isFinite(value) ? value : undefined; }
function integerValue(value: unknown): number | undefined { const number = numberValue(value); return number == null ? undefined : Math.round(number); }
function jsonValue(value: unknown): string | null { return value ? JSON.stringify(value) : null; }
function arrayOfRecords(value: unknown): Array<Record<string, any>> { return Array.isArray(value) ? value.filter((item): item is Record<string, any> => Boolean(item && typeof item === "object")) : []; }
function findAsset(recording: Record<string, unknown> | undefined, kind: string): unknown { return arrayOfRecords(recording?.assets).find((asset) => asset.kind === kind) ?? null; }
function inferredDuration(chunks: Array<Record<string, any>>): number | null { const duration = Math.max(0, ...chunks.map((chunk) => numberValue(chunk.endSeconds) ?? numberValue(chunk.startSeconds) ?? 0)); return duration ? Math.round(duration) : null; }

export default router;
