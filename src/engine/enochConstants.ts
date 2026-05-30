/*
 * File: src/engine/enochConstants.ts
 * Purpose: Calendar calculation engine module for building Enoch calendar dates, months, years, and feast metadata.
 * Author: rpadgett
 */

/**
 * Total number of regular days in the Enoch calendar year.
 * This engine constant anchors year generation and wheel geometry.
 */
export const ENOCH_DAYS_PER_YEAR = 364;

/**
 * Number of seasonal quarters in the Enoch calendar year.
 * This engine constant supports quarter and gate-day calculations.
 */
export const ENOCH_QUARTERS_PER_YEAR = 4;

/**
 * Number of months in the Enoch calendar year.
 * This engine constant supports month generation and year grouping.
 */
export const ENOCH_MONTHS_PER_YEAR = 12;

/**
 * Number of months inside each Enoch quarter.
 * This engine constant maps month numbers to seasonal quarters.
 */
export const ENOCH_MONTHS_PER_QUARTER = 3;

/**
 * Number of standard days in each Enoch month.
 * This engine constant drives month/day conversion.
 */
export const ENOCH_DAYS_PER_MONTH = 30;

export const ENOCH_DAYS_PER_QUARTER = 91;

/**
 * Day-of-year positions for quarter-ending intercalary gate days.
 * This engine constant identifies special days outside the standard month grid.
 */
export const ENOCH_INTERCALARY_DAYS = [91, 182, 273, 364] as const;

/**
 * Full degree span of the circular year wheel.
 * This geometry constant supports marker angle calculations.
 */
export const ENOCH_WHEEL_DEGREES = 360;

export const ENOCH_WHEEL_DEGREES_PER_DAY =
  ENOCH_WHEEL_DEGREES / ENOCH_DAYS_PER_YEAR;
