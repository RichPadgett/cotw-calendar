/*
 * File: src/engine/partTime/courseSpeed.ts
 * Purpose: Part Time model engine for Enoch day parts, solar gates, and variable course duration.
 */

import { CourseSpeed } from "./types";

/** get course speed. */
export function getCourseSpeed(enochDay: number): CourseSpeed {
  const distanceToSummer = Math.abs(enochDay - 91);
  const distanceToWinter = Math.abs(enochDay - 273);

  if (distanceToWinter <= 7) return "slow";
  if (distanceToSummer <= 5) return "slow";

  const distanceToEquinox =
    Math.min(Math.abs(enochDay - 1), Math.abs(enochDay - 182));

  if (distanceToEquinox <= 10) return "fast";

  return "normal";
}
