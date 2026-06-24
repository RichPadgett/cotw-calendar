/*
 * File: src/engine/partTime/courseDuration.ts
 * Purpose: Part Time model engine for Enoch day parts, solar gates, and variable course duration.
 */

import {
  ENOCH_DAYS_PER_YEAR,
  TROPICAL_YEAR_DAYS,
} from "./constants";
import type { CourseDayTiming, CourseGateNumber, CourseSpeed } from "./types";

export const MODERN_MINUTES_PER_DAY = 1440;
export const TROPICAL_YEAR_MINUTES =
  TROPICAL_YEAR_DAYS * MODERN_MINUTES_PER_DAY;
export const BASE_ENOCH_YEAR_MINUTES =
  ENOCH_DAYS_PER_YEAR * MODERN_MINUTES_PER_DAY;
export const EXTRA_COURSE_MINUTES =
  TROPICAL_YEAR_MINUTES - BASE_ENOCH_YEAR_MINUTES;

export const GATE_SLOWDOWN_WEIGHTS: Record<CourseGateNumber, number> = {
  1: 0.03,
  2: 0.25,
  3: 0.75,
  4: 1,
  5: 0.25,
  6: 0.03,
  7: 0.03,
  8: 0.35,
  9: 1,
  10: 1.25,
  11: 0.35,
  12: 0.03,
};

/** get gate for enoch day. */
export function getGateForEnochDay(enochDay: number): CourseGateNumber {
  const normalizedDay = ((Math.trunc(enochDay) - 1) % ENOCH_DAYS_PER_YEAR) + 1;
  const gate = Math.min(12, Math.floor((normalizedDay - 1) / 30) + 1);

  return gate as CourseGateNumber;
}

/** get gate slowdown weight. */
export function getGateSlowdownWeight(enochDay: number) {
  return GATE_SLOWDOWN_WEIGHTS[getGateForEnochDay(enochDay)];
}

/** get course year timing. */
export function getCourseYearTiming(): CourseDayTiming[] {
  const baseDays = Array.from({ length: ENOCH_DAYS_PER_YEAR }, (_, index) => {
    const enochDay = index + 1;
    const gate = getGateForEnochDay(enochDay);
    const slowdownWeight = GATE_SLOWDOWN_WEIGHTS[gate];

    return {
      enochDay,
      gate,
      slowdownWeight,
    };
  });
  const totalWeight = baseDays.reduce(
    (total, day) => total + day.slowdownWeight,
    0
  );

  return baseDays.map((day) => {
    const extraMinutes =
      totalWeight > 0
        ? (day.slowdownWeight / totalWeight) * EXTRA_COURSE_MINUTES
        : 0;
    const courseDayDurationMinutes = MODERN_MINUTES_PER_DAY + extraMinutes;

    return {
      ...day,
      extraMinutes,
      courseDayDurationMinutes,
      speedMultiplier: courseDayDurationMinutes / MODERN_MINUTES_PER_DAY,
      courseSpeed: getCourseSpeedLabel(courseDayDurationMinutes),
    };
  });
}

/** get course day timing. */
export function getCourseDayTiming(enochDay: number): CourseDayTiming {
  return getCourseYearTiming()[((Math.trunc(enochDay) - 1) % ENOCH_DAYS_PER_YEAR)];
}

/** get course speed label. */
function getCourseSpeedLabel(durationMinutes: number): CourseSpeed {
  if (durationMinutes >= MODERN_MINUTES_PER_DAY + 8) return "slow";
  if (durationMinutes <= MODERN_MINUTES_PER_DAY + 1) return "fast";
  return "normal";
}
