import { Router } from "express";
import { calendarContent } from "../data/calendarContent";
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

  const content = calendarContent.find(
    (entry) =>
      entry.enochYear === Number(year) &&
      entry.month === Number(month) &&
      entry.day === Number(day)
  );

  if (!content) {
    return res.status(404).json({
      error: "No content found for this day.",
    });
  }

  res.json(content);
});

export default router;
