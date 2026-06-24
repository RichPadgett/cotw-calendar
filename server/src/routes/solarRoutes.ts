/*
 * File: server/src/routes/solarRoutes.ts
 * Purpose: Express API route module.
 */

import { Router, Request, Response } from "express";
import { SolarService } from "../services/solar/SolarService";

const router = Router();

/** check whether valid date. */
function isValidDate(value: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(value);
}

/** check whether valid year. */
function isValidYear(value: string): boolean {
  return /^\d{4}$/.test(value);
}

/** get boolean query flag. */
function getBooleanQueryFlag(value: unknown): boolean {
  return value === "true" || value === "1" || value === true;
}

router.get("/jerusalem", async (req: Request, res: Response) => {
  try {
    const date = String(req.query.date ?? "");

    if (!date) {
      return res.status(400).json({
        success: false,
        message: "Missing required query parameter: date",
      });
    }

    if (!isValidDate(date)) {
      return res.status(400).json({
        success: false,
        message: "Invalid date format. Use YYYY-MM-DD.",
      });
    }

    const solarDayResult = await SolarService.getJerusalemDayResult(date);

    return res.json({
      success: true,
      cacheStatus: solarDayResult.cacheStatus,
      data: solarDayResult.day,
    });
  } catch (error) {
    console.error("Solar route error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to retrieve Jerusalem solar data.",
    });
  }
});

router.get("/jerusalem/year/:year", async (req: Request, res: Response) => {
  try {
    const year = String(req.params.year ?? "");

    if (!isValidYear(year)) {
      return res.status(400).json({
        success: false,
        message: "Invalid year format. Use YYYY.",
      });
    }

    const solarYear = await SolarService.getJerusalemYear(Number(year), {
      fillMissing: getBooleanQueryFlag(req.query.fillMissing),
    });

    return res.json({
      success: true,
      complete: solarYear.failedDates.length === 0,
      data: solarYear,
    });
  } catch (error) {
    console.error("Solar year route error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to retrieve Jerusalem solar year data.",
    });
  }
});

export default router;
