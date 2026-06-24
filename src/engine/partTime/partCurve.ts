/*
 * File: src/engine/partTime/partCurve.ts
 * Purpose: Part Time model engine for Enoch day parts, solar gates, and variable course duration.
 */

import { Season } from "./types";

/** get season from enoch day. */
export function getSeasonFromEnochDay(enochDay: number): Season {
  if (enochDay <= 91) return "spring";
  if (enochDay <= 182) return "summer";
  if (enochDay <= 273) return "fall";
  return "winter";
}

/** get day parts for enoch day. */
export function getDayPartsForEnochDay(enochDay: number): number {
  const angle = ((enochDay - 1) / 364) * Math.PI * 2;

  // Starts near spring equinox: 9/9
  // Peaks at summer: 12/6
  // Returns to 9/9 at fall
  // Bottoms at winter: 6/12
  const raw = 9 + 3 * Math.sin(angle);

  return Math.round(raw);
}

/** get night parts for enoch day. */
export function getNightPartsForEnochDay(enochDay: number): number {
  return 18 - getDayPartsForEnochDay(enochDay);
}
