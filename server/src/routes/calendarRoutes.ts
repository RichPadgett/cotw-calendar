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
import { buildAppointedTimesCalendar } from "../services/appointedTimesCalendar";
import { getPublishedCalendarEvents } from "../services/publishedCalendarEvents";
import { verifyCalendarSubscriptionToken } from "../services/groupStore";
import { getPublicCalendarFiles } from "../services/calendarFileLibrary";

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
 * Lists files attached to public calendar days for the StudyBox Library.
 * The day records are authoritative, so unreferenced server files stay hidden.
 */
router.get("/files", (req, res) => {
  try {
    const limit = parseOptionalInteger(req.query.limit, 1, 500) ?? 100;
    const items = getPublicCalendarFiles({
      query: typeof req.query.q === "string" ? req.query.q : "",
      type: typeof req.query.type === "string" ? req.query.type : "",
      limit,
    });
    res.json({ items, total: items.length });
  } catch (error) {
    console.log("Failed to load calendar files", error);
    res.status(500).json({ error: "Failed to load calendar files." });
  }
});

/**
 * Returns a stable public iCalendar subscription containing appointed times.
 * Calendar clients periodically refresh this URL and receive future updates.
 */
router.get("/subscriptions/appointed-times.ics", (req, res) => {
  const requestedGroupCode = String(req.query.group ?? "public")
    .trim()
    .toLowerCase();
  const groupCode = requestedGroupCode || "public";

  if (
    groupCode !== "public" &&
    !verifyCalendarSubscriptionToken({
      groupCode,
      token: String(req.query.token ?? ""),
    })
  ) {
    return res.status(403).json({ error: "Invalid calendar subscription." });
  }

  const startYear =
    parseOptionalInteger(req.query.startYear, 1900, 2200) ??
    new Date().getUTCFullYear() - 1;
  const yearCount = parseOptionalInteger(req.query.years, 1, 8) ?? 4;
  const calendar = buildAppointedTimesCalendar({
    startYear,
    yearCount,
    additionalEvents: getPublishedCalendarEvents(
      startYear,
      yearCount,
      groupCode
    ),
  });
  const disposition = req.query.download === "1" ? "attachment" : "inline";

  res.set({
    "Content-Type": "text/calendar; charset=utf-8",
    "Content-Disposition": `${disposition}; filename="enoch-appointed-times.ics"`,
    "Cache-Control":
      groupCode === "public" ? "public, max-age=3600" : "private, no-store",
  });
  res.send(calendar);
});

function parseOptionalInteger(
  value: unknown,
  minimum: number,
  maximum: number
): number | undefined {
  if (typeof value !== "string" || !/^-?\d+$/.test(value)) return undefined;

  const parsed = Number(value);
  return Number.isSafeInteger(parsed) && parsed >= minimum && parsed <= maximum
    ? parsed
    : undefined;
}

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
