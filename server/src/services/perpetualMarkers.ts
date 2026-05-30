/*
 * File: server/src/services/perpetualMarkers.ts
 * Purpose: Server-side service module for reading, writing, indexing, or checksumming calendar content.
 * Author: rpadgett
 */

// Dependencies
import crypto from "crypto";
import fs from "fs";
import path from "path";

import { PerpetualMarker } from "../types/perpetualMarkers";

// Constants
const MARKERS_PATH = path.join(
    process.cwd(),
    "content",
    "system",
    "perpetualMarkers.json"
);

const EMPTY_MARKERS_JSON = "[]";

// Public API
/**
 * Reads global perpetual markers from the system content file.
 * This service function returns an empty list when no marker file has been created.
 */
export function getPerpetualMarkers(): PerpetualMarker[] {
    if (!fs.existsSync(MARKERS_PATH)) {
        return [];
    }

    return JSON.parse(fs.readFileSync(MARKERS_PATH, "utf-8"));
}

/**
 * Calculates a checksum for the perpetual marker JSON payload.
 * This service function lets clients cheaply detect whether marker data has changed.
 */
export function getPerpetualMarkersChecksum(): string {
    const text = fs.existsSync(MARKERS_PATH)
        ? fs.readFileSync(MARKERS_PATH, "utf-8")
        : EMPTY_MARKERS_JSON;

    return crypto.createHash("sha256").update(text).digest("hex");
}