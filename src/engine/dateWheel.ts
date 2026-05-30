/*
 * File: src/engine/dateWheel.ts
 * Purpose: Calendar calculation engine module for building Enoch calendar dates, months, years, and feast metadata.
 * Author: rpadgett
 */

import { EnochSeason } from "../models/calendar";
import {
  ENOCH_DAYS_PER_YEAR,
  ENOCH_INTERCALARY_DAYS,
  ENOCH_WHEEL_DEGREES_PER_DAY,
} from "./enochConstants";

/**
 * Converts a day-of-year into a circular wheel angle.
 * This geometry helper supports visual placement in year-wheel interfaces.
 */
export function getWheelAngle(dayOfYear: number): number {
  if (dayOfYear < 1 || dayOfYear > ENOCH_DAYS_PER_YEAR) {
    throw new Error(`Invalid wheel dayOfYear: ${dayOfYear}`);
  }

  return (dayOfYear - 1) * ENOCH_WHEEL_DEGREES_PER_DAY;
}


/**
 * Determines which seasonal gate a day belongs to on the year wheel.
 * This engine helper maps day positions to gate labels and visual regions.
 */
export function getWheelGate(
  dayOfYear: number
): EnochSeason | undefined {
  switch (dayOfYear) {
    case 364:
    case 1:
      return "spring";

    case 91:
      return "summer";

    case 182:
      return "fall";

    case 273:
      return "winter";

    default:
      return undefined;
  }
}
