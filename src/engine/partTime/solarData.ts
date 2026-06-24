/*
 * File: src/engine/partTime/solarData.ts
 * Purpose: Part Time model engine for Enoch day parts, solar gates, and variable course duration.
 */

import { apiUrl } from "../../config/api";
import type { SolarDay } from "./types";

export type SolarYearData = {
  year: number;
  days: SolarDay[];
  cachedCount: number;
  fetchedCount: number;
  expectedCount: number;
};

/** get jerusalem solar data. */
export async function getJerusalemSolarData(date: string): Promise<SolarDay> {
  const response = await fetch(
    apiUrl(`/solar/jerusalem?date=${encodeURIComponent(date)}`)
  );

  if (!response.ok) {
    throw new Error("Failed to load Jerusalem solar data.");
  }

  const json = await response.json();

  if (!json.success) {
    throw new Error(json.message ?? "Failed to load Jerusalem solar data.");
  }

  return json.data as SolarDay;
}

/** get jerusalem solar year data. */
export async function getJerusalemSolarYearData(
  year: number,
  options: { fillMissing?: boolean } = {}
): Promise<SolarYearData> {
  const query = options.fillMissing ? "?fillMissing=true" : "";
  const response = await fetch(apiUrl(`/solar/jerusalem/year/${year}${query}`));

  if (!response.ok) {
    throw new Error("Failed to load Jerusalem solar year data.");
  }

  const json = await response.json();

  if (!json.success) {
    throw new Error(
      json.message ?? "Failed to load Jerusalem solar year data."
    );
  }

  return json.data as SolarYearData;
}
