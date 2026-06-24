/*
 * File: src/engine/partTime/solarGateCourse.ts
 * Purpose: Part Time model engine for Enoch day parts, solar gates, and variable course duration.
 */

import { ENOCH_DAYS_PER_YEAR } from "./constants";
import {
  GATE_SLOWDOWN_WEIGHTS,
  MODERN_MINUTES_PER_DAY,
  getGateForEnochDay,
} from "./courseDuration";
import { getSolarGateTimestamp } from "./solarGates";
import type { CourseDayTiming, CourseGateNumber, CourseSpeed } from "./types";

type SolarGateArcKey =
  | "spring_to_summer"
  | "summer_to_fall"
  | "fall_to_winter"
  | "winter_to_spring";

type SolarGateArcDefinition = {
  key: SolarGateArcKey;
  startGate: "march_equinox" | "june_solstice" | "september_equinox" | "december_solstice";
  endGate: "march_equinox" | "june_solstice" | "september_equinox" | "december_solstice";
  endYearOffset: 0 | 1;
  startDay: number;
  dayCount: number;
  variationMinutes: number;
};

export type SolarGateArcTiming = {
  key: SolarGateArcKey;
  year: number;
  startIso: string;
  endIso: string;
  elapsedMinutes: number;
  startDay: number;
  dayCount: number;
  averageDayMinutes: number;
};

export type SolarGateCourseDayTiming = CourseDayTiming & {
  arcKey: SolarGateArcKey;
  arcAverageDayMinutes: number;
};

const SOLAR_GATE_ARCS: SolarGateArcDefinition[] = [
  {
    key: "spring_to_summer",
    startGate: "march_equinox",
    endGate: "june_solstice",
    endYearOffset: 0,
    startDay: 1,
    dayCount: 91,
    variationMinutes: 10,
  },
  {
    key: "summer_to_fall",
    startGate: "june_solstice",
    endGate: "september_equinox",
    endYearOffset: 0,
    startDay: 92,
    dayCount: 91,
    variationMinutes: 12,
  },
  {
    key: "fall_to_winter",
    startGate: "september_equinox",
    endGate: "december_solstice",
    endYearOffset: 0,
    startDay: 183,
    dayCount: 91,
    variationMinutes: 14,
  },
  {
    key: "winter_to_spring",
    startGate: "december_solstice",
    endGate: "march_equinox",
    endYearOffset: 1,
    startDay: 274,
    dayCount: 91,
    variationMinutes: 16,
  },
];

/** get solar gate arc timings. */
export function getSolarGateArcTimings(year: number): SolarGateArcTiming[] {
  return SOLAR_GATE_ARCS.map((arc) => {
    const startIso = getSolarGateTimestamp(year, arc.startGate);
    const endIso = getSolarGateTimestamp(year + arc.endYearOffset, arc.endGate);

    if (!startIso || !endIso) {
      throw new Error(`Missing solar gate data for ${arc.key} ${year}.`);
    }

    const elapsedMinutes =
      (new Date(endIso).getTime() - new Date(startIso).getTime()) / 60000;

    return {
      key: arc.key,
      year,
      startIso,
      endIso,
      elapsedMinutes,
      startDay: arc.startDay,
      dayCount: arc.dayCount,
      averageDayMinutes: elapsedMinutes / arc.dayCount,
    };
  });
}

/** get solar gate course year timing. */
export function getSolarGateCourseYearTiming(
  year: number
): SolarGateCourseDayTiming[] {
  return SOLAR_GATE_ARCS.flatMap((arc) => {
    const arcTiming = getSolarGateArcTimings(year).find(
      (item) => item.key === arc.key
    );

    if (!arcTiming) return [];

    const days = Array.from({ length: arc.dayCount }, (_, index) => {
      const enochDay = arc.startDay + index;
      const gate = getGateForEnochDay(enochDay);
      const slowdownWeight = GATE_SLOWDOWN_WEIGHTS[gate];

      return {
        enochDay,
        gate,
        slowdownWeight,
      };
    });
    const averageWeight =
      days.reduce((total, day) => total + day.slowdownWeight, 0) /
      days.length;
    const rawDurations = days.map((day) => ({
      ...day,
      rawDurationMinutes:
        arcTiming.averageDayMinutes +
        (day.slowdownWeight - averageWeight) * arc.variationMinutes,
    }));
    const rawTotalMinutes = rawDurations.reduce(
      (total, day) => total + day.rawDurationMinutes,
      0
    );
    const correctionMinutes =
      (arcTiming.elapsedMinutes - rawTotalMinutes) / rawDurations.length;

    return rawDurations.map((day) => {
      const courseDayDurationMinutes =
        day.rawDurationMinutes + correctionMinutes;

      return {
        enochDay: day.enochDay,
        gate: day.gate as CourseGateNumber,
        slowdownWeight: day.slowdownWeight,
        extraMinutes: courseDayDurationMinutes - MODERN_MINUTES_PER_DAY,
        courseDayDurationMinutes,
        speedMultiplier: courseDayDurationMinutes / MODERN_MINUTES_PER_DAY,
        courseSpeed: getCourseSpeedLabel(courseDayDurationMinutes),
        arcKey: arc.key,
        arcAverageDayMinutes: arcTiming.averageDayMinutes,
      };
    });
  }).sort((left, right) => left.enochDay - right.enochDay);
}

/** get solar gate course checkpoints. */
export function getSolarGateCourseCheckpoints(year: number) {
  const arcs = getSolarGateArcTimings(year);
  const firstArc = arcs[0];
  const secondArc = arcs[1];
  const thirdArc = arcs[2];
  const fourthArc = arcs[3];

  return {
    spring: firstArc.startIso,
    summer: firstArc.endIso,
    fall: secondArc.endIso,
    winter: thirdArc.endIso,
    nextSpring: fourthArc.endIso,
  };
}

/** get solar gate course duration minutes. */
export function getSolarGateCourseDurationMinutes(year: number) {
  return getSolarGateCourseYearTiming(year).reduce(
    (total, day) => total + day.courseDayDurationMinutes,
    0
  );
}

/** get course speed label. */
function getCourseSpeedLabel(durationMinutes: number): CourseSpeed {
  if (durationMinutes >= MODERN_MINUTES_PER_DAY + 8) return "slow";
  if (durationMinutes <= MODERN_MINUTES_PER_DAY + 1) return "fast";
  return "normal";
}
