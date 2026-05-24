// src/engine/enochConstants.ts

export const ENOCH_DAYS_PER_YEAR = 364;

export const ENOCH_QUARTERS_PER_YEAR = 4;

export const ENOCH_MONTHS_PER_YEAR = 12;

export const ENOCH_MONTHS_PER_QUARTER = 3;

export const ENOCH_DAYS_PER_MONTH = 30;

export const ENOCH_DAYS_PER_QUARTER = 91;

export const ENOCH_INTERCALARY_DAYS = [
  91,
  182,
  273,
  364,
] as const;

export const ENOCH_WHEEL_DEGREES = 360;

export const ENOCH_WHEEL_DEGREES_PER_DAY =
  ENOCH_WHEEL_DEGREES / ENOCH_DAYS_PER_YEAR;
