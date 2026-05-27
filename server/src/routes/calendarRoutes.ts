import { Router } from "express";
import { dayContent } from "../data/dayContent";
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

  const key = `${year}-${month}-${day}`;

  const content = dayContent[key];

  if (!content) {
    return res.status(404).json({
      error: "No content found for this day.",
    });
  }

  res.json(content);
});

export default router;
