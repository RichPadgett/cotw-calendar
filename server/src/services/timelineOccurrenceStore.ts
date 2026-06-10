/*
 * File: server/src/services/timelineOccurrenceStore.ts
 * Purpose: File-backed store for timeline occurrence entries.
 */

import fs from "fs";
import path from "path";

const SYSTEM_ROOT = path.join(process.cwd(), "content", "system");
const TIMELINE_OCCURRENCES_PATH = path.join(
  SYSTEM_ROOT,
  "timelineOccurrences.json"
);

export function getTimelineOccurrences() {
  if (!fs.existsSync(TIMELINE_OCCURRENCES_PATH)) {
    return [];
  }

  return JSON.parse(fs.readFileSync(TIMELINE_OCCURRENCES_PATH, "utf-8"));
}

export function saveTimelineOccurrences(occurrences: unknown[]) {
  fs.mkdirSync(SYSTEM_ROOT, { recursive: true });

  fs.writeFileSync(
    TIMELINE_OCCURRENCES_PATH,
    JSON.stringify(occurrences, null, 2),
    "utf-8"
  );

  return occurrences;
}
