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
router.get("/:year/:month/:day", (req, res) => {
  const { year, month, day } = req.params;

  const content = getCalendarDayContent(
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
});

export default router;
