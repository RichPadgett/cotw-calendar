import { Router } from "express";
import { getCalendarDayContent } from "../services/calendarContentStore";
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
