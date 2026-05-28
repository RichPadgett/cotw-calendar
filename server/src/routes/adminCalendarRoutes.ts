import { Router } from "express";

import { saveCalendarDayContent } from "../services/calendarContentStore";

const router = Router();

router.put("/:year/:month/:day", (req, res) => {
  const { year, month, day } = req.params;

  const content = req.body;

  const savedContent = saveCalendarDayContent(
    year,
    month,
    day,
    {
      ...content,
      enochYear: Number(year),
      month: Number(month),
      day: Number(day),
    }
  );

  res.json(savedContent);
});

export default router;