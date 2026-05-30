import crypto from "crypto";
import fs from "fs";
import path from "path";

import { PerpetualMarker } from "../types/perpetualMarkers";

const MARKERS_PATH = path.join(
    process.cwd(),
    "content",
    "system",
    "perpetualMarkers.json"
);

const EMPTY_MARKERS_JSON = "[]";

export function getPerpetualMarkers(): PerpetualMarker[] {
    if (!fs.existsSync(MARKERS_PATH)) {
        return [];
    }

    return JSON.parse(fs.readFileSync(MARKERS_PATH, "utf-8"));
}

export function getPerpetualMarkersChecksum(): string {
    const text = fs.existsSync(MARKERS_PATH)
        ? fs.readFileSync(MARKERS_PATH, "utf-8")
        : EMPTY_MARKERS_JSON;

    return crypto.createHash("sha256").update(text).digest("hex");
}