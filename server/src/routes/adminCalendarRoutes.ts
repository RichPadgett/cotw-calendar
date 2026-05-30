/*
 * File: server/src/routes/adminCalendarRoutes.ts
 * Purpose: Express route module for calendar and admin API endpoints.
 * Author: rpadgett
 */

// Dependencies
import { Router } from "express";

import { saveCalendarDayContent } from "../services/calendarContentStore";

const router = Router();

// Helpers
/**
 * Reads the active group code from the admin request query string.
 * This route helper determines which group folder receives saved calendar content.
 */
function getGroupCode(req: any) {
  return String(req.query.groupCode ?? "public");
}

/**
 * API endpoint: saves admin-authored content for one Enoch day.
 * This write endpoint normalizes route params into the persisted day-content payload.
 */
router.put("/:year/:month/:day", (req, res) => {
  try {
    const { year, month, day } = req.params;
    const content = req.body;
    const groupCode = getGroupCode(req);

    const savedContent = saveCalendarDayContent(groupCode, year, month, day, {
      ...content,

      enochYear: Number(year),
      month: Number(month),
      day: Number(day),
    });

    res.json(savedContent);
  } catch (error) {
    console.log("Failed to save calendar day content", error);

    res.status(500).json({
      error: "Failed to save calendar day content.",
    });
  }
});

export default router;
