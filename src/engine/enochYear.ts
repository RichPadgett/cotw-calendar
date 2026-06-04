/*
 * File: src/engine/enochYear.ts
 * Purpose: Shared Enoch year date helpers for calculating the Gregorian start date of a visible calendar year.
 * Author: rpadgett
 */

// Calendar baseline and app configuration
const BASE_ENOCH_YEAR = 2026;
const BASE_START_DATE = "2026-03-18";
const BASE_SABBATH_WEEK_START_YEAR = 2025;
const SABBATH_WEEK_CYCLE_YEARS = 7;

// Date helpers
/**
 * Calculates the Gregorian start date for a requested Enoch year.
 * This date helper walks from the configured base year and accounts for sabbath-week year offsets.
 */
export function getEnochYearStartDate(targetYear: number): string {
  let currentStartDate = BASE_START_DATE;

  for (let year = BASE_ENOCH_YEAR; year < targetYear; year++) {
    currentStartDate = addDays(currentStartDate, getEnochYearLength(year));
  }

  for (let year = BASE_ENOCH_YEAR - 1; year >= targetYear; year--) {
    currentStartDate = addDays(currentStartDate, -getEnochYearLength(year));
  }

  return currentStartDate;
}

/**
 * Determines whether the requested Enoch year begins after the seven-day sabbath-week reset.
 * This helper keeps sabbath-week display logic aligned for both forward and backward year navigation.
 */
export function hasSabbathWeekBeforeEnochYear(targetYear: number): boolean {
  return (
    positiveModulo(
      targetYear - BASE_SABBATH_WEEK_START_YEAR,
      SABBATH_WEEK_CYCLE_YEARS
    ) === 0
  );
}

/**
 * Returns the day length for one Enoch year.
 * This calendar helper includes the extra sabbath-week reset after every sixth completed year.
 */
function getEnochYearLength(year: number): number {
  return hasSabbathWeekBeforeEnochYear(year + 1) ? 371 : 364;
}

/**
 * Calculates a modulo result that stays positive for years before the base cycle.
 * JavaScript's remainder operator can return negative values when navigating backward.
 */
function positiveModulo(value: number, divisor: number): number {
  return ((value % divisor) + divisor) % divisor;
}

/**
 * Adds calendar days to a YYYY-MM-DD string using UTC date math.
 * This keeps year-start calculations stable across local timezone boundaries.
 */
function addDays(dateString: string, days: number): string {
  const [year, month, day] = dateString.split("-").map(Number);

  const date = new Date(Date.UTC(year, month - 1, day));
  date.setUTCDate(date.getUTCDate() + days);

  const nextYear = date.getUTCFullYear();
  const nextMonth = String(date.getUTCMonth() + 1).padStart(2, "0");
  const nextDay = String(date.getUTCDate()).padStart(2, "0");

  return `${nextYear}-${nextMonth}-${nextDay}`;
}
