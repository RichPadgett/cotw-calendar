/*
 * File: server/src/services/perpetualMarkerStore.ts
 * Purpose: Server-side storage, persistence, or integration service.
 */

import fs from "fs";
import path from "path";

const SYSTEM_ROOT = path.join(process.cwd(), "content", "system");
const MARKERS_PATH = path.join(SYSTEM_ROOT, "perpetualMarkers.json");

/** get perpetual markers. */
export function getPerpetualMarkers() {
  if (!fs.existsSync(MARKERS_PATH)) {
    return [];
  }

  return JSON.parse(fs.readFileSync(MARKERS_PATH, "utf-8"));
}

/** save perpetual markers. */
export function savePerpetualMarkers(markers: unknown[]) {
  fs.mkdirSync(SYSTEM_ROOT, { recursive: true });

  fs.writeFileSync(MARKERS_PATH, JSON.stringify(markers, null, 2), "utf-8");

  return markers;
}
