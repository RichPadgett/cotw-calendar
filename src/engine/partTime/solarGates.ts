/*
 * File: src/engine/partTime/solarGates.ts
 * Purpose: Part Time model engine for Enoch day parts, solar gates, and variable course duration.
 */

import solarGates from "./solarGates.json";

export type SolarGateKey =
  | "march_equinox"
  | "june_solstice"
  | "september_equinox"
  | "december_solstice";

export type SolarGateYear = Record<SolarGateKey, string>;

type SolarGateData = {
  source: string;
  timeZone: "UTC";
  years: Record<string, SolarGateYear>;
};

const data = solarGates as SolarGateData;

/** get solar gate year. */
export function getSolarGateYear(year: number): SolarGateYear | null {
  return data.years[String(year)] ?? null;
}

/** get solar gate timestamp. */
export function getSolarGateTimestamp(
  year: number,
  gate: SolarGateKey
): string | null {
  return getSolarGateYear(year)?.[gate] ?? null;
}

/** list solar gate years. */
export function listSolarGateYears() {
  return Object.keys(data.years)
    .map(Number)
    .sort((left, right) => left - right);
}
