import { Router } from "express";
import { getCalendarDayContent } from "../services/calendarContentStore";
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

function getGroupCode(req: any) {
  return String(req.query.groupCode ?? "public");
}

router.get("/perpetual-markers", (_req, res) => {
    res.json(getPerpetualMarkers());
});

router.get("/perpetual-markers/checksum", (_req, res) => {
    res.json({
        checksum: getPerpetualMarkersChecksum(),
    });
});

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

router.get("/:year/:month/:day", (req, res) => {
  try {
    const { year, month, day } = req.params;
    const groupCode = getGroupCode(req);

    const content = getCalendarDayContent(
      groupCode,
      year,
      month,
      day
    );

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
