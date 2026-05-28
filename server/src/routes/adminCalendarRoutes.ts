import { Router } from "express";

import { saveCalendarDayContent } from "../services/calendarContentStore";

const router = Router();

function getGroupCode(req: any) {
  return String(req.query.groupCode ?? "public");
}

router.put("/:year/:month/:day", (req, res) => {
  try {
    const { year, month, day } = req.params;
    const content = req.body;
    const groupCode = getGroupCode(req);

    const savedContent = saveCalendarDayContent(
      groupCode,
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
  } catch (error) {
    console.log("Failed to save calendar day content", error);

    res.status(500).json({
      error: "Failed to save calendar day content.",
    });
  }
});

export default router;