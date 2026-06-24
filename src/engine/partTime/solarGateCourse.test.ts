/*
 * File: src/engine/partTime/solarGateCourse.test.ts
 * Purpose: Part Time model engine for Enoch day parts, solar gates, and variable course duration.
 */

import {
  getSolarGateArcTimings,
  getSolarGateCourseCheckpoints,
  getSolarGateCourseDurationMinutes,
  getSolarGateCourseYearTiming,
} from "./solarGateCourse";
import { getSolarGateYear } from "./solarGates";

/** sum. */
function sum(values: number[]) {
  return values.reduce((total, value) => total + value, 0);
}

describe("Solar-gate anchored Part Time course", () => {
  it("uses the JSON equinox and solstice timestamps as hard arc anchors", () => {
    const gates = getSolarGateYear(2028)!;
    const nextGates = getSolarGateYear(2029)!;

    expect(getSolarGateCourseCheckpoints(2028)).toEqual({
      spring: gates.march_equinox,
      summer: gates.june_solstice,
      fall: gates.september_equinox,
      winter: gates.december_solstice,
      nextSpring: nextGates.march_equinox,
    });
  });

  it("normalizes each seasonal sector to its own gate-to-gate elapsed time", () => {
    const arcs = getSolarGateArcTimings(2028);
    const days = getSolarGateCourseYearTiming(2028);

    expect(days).toHaveLength(364);

    arcs.forEach((arc) => {
      const arcDays = days.filter((day) => day.arcKey === arc.key);
      const arcMinutes = sum(
        arcDays.map((day) => day.courseDayDurationMinutes)
      );

      expect(arcDays).toHaveLength(arc.dayCount);
      expect(arcMinutes).toBeCloseTo(arc.elapsedMinutes, 6);
    });
  });

  it("keeps the full course equal to the actual spring-to-spring solar gates", () => {
    const gates = getSolarGateYear(2028)!;
    const nextGates = getSolarGateYear(2029)!;
    const expectedMinutes =
      (new Date(nextGates.march_equinox).getTime() -
        new Date(gates.march_equinox).getTime()) /
      60000;

    expect(getSolarGateCourseDurationMinutes(2028)).toBeCloseTo(
      expectedMinutes,
      6
    );
  });

  it("lets each sector carry a different average velocity", () => {
    const arcs = getSolarGateArcTimings(2028);
    const averages = Object.fromEntries(
      arcs.map((arc) => [arc.key, arc.averageDayMinutes])
    );

    expect(averages.spring_to_summer).not.toBe(averages.summer_to_fall);
    expect(averages.summer_to_fall).toBeGreaterThan(
      averages.fall_to_winter
    );
    expect(averages.fall_to_winter).toBeGreaterThan(
      averages.winter_to_spring
    );
  });

  it("makes turn gates longer than nearby taper gates inside the anchored model", () => {
    const days = getSolarGateCourseYearTiming(2028);
    const dayInGate = (gate: number, arcKey?: string) =>
      days.find(
        (day) => day.gate === gate && (!arcKey || day.arcKey === arcKey)
      )!.courseDayDurationMinutes;

    expect(dayInGate(3)).toBeGreaterThan(dayInGate(2));
    expect(dayInGate(4, "summer_to_fall")).toBeGreaterThan(
      dayInGate(5, "summer_to_fall")
    );
    expect(dayInGate(9)).toBeGreaterThan(dayInGate(8));
    expect(dayInGate(10)).toBeGreaterThan(dayInGate(11));
  });
});
