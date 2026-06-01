/*
 * File: server/src/routes/adminCalendarRoutes.ts
 * Purpose: Express route module for admin calendar content endpoints.
 */

import { Request, Router } from "express";

import { requireAdminToken } from "../middleware/requireAdminToken";
import { saveCalendarDayContent } from "../services/calendarContentStore";

const router = Router();

function getQueryString(value: unknown): string {
  if (Array.isArray(value)) {
    return String(value[0] ?? "");
  }

  return String(value ?? "");
}

function getGroupCode(req: Request): string {
  return getQueryString(req.query.groupCode).trim() || "public";
}

router.put<{
  year: string;
  month: string;
  day: string;
}>("/:year/:month/:day", requireAdminToken, (req, res) => {
  try {
    const { year, month, day } = req.params;
    const groupCode = getGroupCode(req);

    const savedContent = saveCalendarDayContent(groupCode, year, month, day, {
      ...req.body,
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
