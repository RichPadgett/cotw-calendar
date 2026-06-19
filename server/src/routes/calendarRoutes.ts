/*
 * File: server/src/routes/calendarRoutes.ts
 * Purpose: Express route module for calendar and admin API endpoints.
 * Author: rpadgett
 */

// Dependencies
import { Router } from "express";
import {
  getCalendarDayContent,
  getLatestShabbatTeaching,
} from "../services/calendarContentStore";
import { getNoticeIndex } from "../services/calendarNoticeIndex";
import {
  getPerpetualMarkers,
  getPerpetualMarkersChecksum,
} from "../services/perpetualMarkers";

const router = Router();

/*
  ============================================================
  HEALTH TEST
  ============================================================
*/

/**
 * API endpoint: reports local calendar server health.
 * Used by clients or developers to confirm the Express server is running.
 */
router.get("/health", (_req, res) => {
  res.json({
    ok: true,
  });
});

/*
  ============================================================
  CALENDAR DAY CONTENT
  ============================================================
*/

// Helpers
/**
 * Reads the active group code from the request query string.
 * This route helper defaults public calendar requests to the shared public group.
 */
function getGroupCode(req: any) {
  return String(req.query.groupCode ?? "public");
}

/**
 * API endpoint: returns all perpetual calendar markers.
 * Used by the app to render recurring overlays that are not tied to one saved day-content file.
 */
router.get("/perpetual-markers", (_req, res) => {
  res.json(getPerpetualMarkers());
});

/**
 * API endpoint: returns a checksum for the perpetual marker dataset.
 * Used by the app to decide whether marker data needs to be fetched again.
 */
router.get("/perpetual-markers/checksum", (_req, res) => {
  res.json({
    checksum: getPerpetualMarkersChecksum(),
  });
});

/**
 * API endpoint: returns the latest posted Shabbat teaching for the active group.
 * Used by the app header to fill the Spotify player from saved calendar content.
 */
router.get("/latest-shabbat-teaching", (req, res) => {
  try {
    const groupCode = getGroupCode(req);
    const teaching = getLatestShabbatTeaching(groupCode);

    res.json(teaching);
  } catch (error) {
    console.log("Failed to load latest Shabbat teaching", error);

    res.status(500).json({
      error: "Failed to load latest Shabbat teaching.",
    });
  }
});

/**
 * API endpoint: returns notice and content summaries for a full Enoch year.
 * Used by calendar views to show day-level badges without loading every day's full content.
 */
router.get("/:year/notices", (req, res) => {
  try {
    const { year } = req.params;
    const groupCode = getGroupCode(req);

    const notices = getNoticeIndex(groupCode, year);

    res.json(notices);
  } catch (error) {
    console.log("Failed to load notice index", error);

    res.status(500).json({
      error: "Failed to load notice index.",
    });
  }
});

/**
 * API endpoint: returns saved content for one Enoch day.
 * Used by the day detail modal to show notes, readings, notices, and media for the active group.
 */
router.get("/:year/:month/:day", (req, res) => {
  try {
    const { year, month, day } = req.params;
    const groupCode = getGroupCode(req);

    const content = getCalendarDayContent(groupCode, year, month, day);

    if (!content) {
      return res.status(404).json({
        error: "No content found for this day.",
      });
    }

    res.json(content);
  } catch (error) {
    console.log("Failed to load calendar day content", error);

    res.status(500).json({
      error: "Failed to load calendar day content.",
    });
  }
});

export default router;
