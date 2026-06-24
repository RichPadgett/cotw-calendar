/*
 * File: src/engine/partTime/courseDuration.test.ts
 * Purpose: Part Time model engine for Enoch day parts, solar gates, and variable course duration.
 */

import {
  EXTRA_COURSE_MINUTES,
  GATE_SLOWDOWN_WEIGHTS,
  MODERN_MINUTES_PER_DAY,
  TROPICAL_YEAR_MINUTES,
  getCourseDayTiming,
  getCourseYearTiming,
  getGateForEnochDay,
} from "./courseDuration";

/** sum. */
function sum(values: number[]) {
  return values.reduce((total, value) => total + value, 0);
}

describe("Part Time course duration curve", () => {
  it("maps Enoch days into twelve gate phases", () => {
    expect(getGateForEnochDay(1)).toBe(1);
    expect(getGateForEnochDay(30)).toBe(1);
    expect(getGateForEnochDay(31)).toBe(2);
    expect(getGateForEnochDay(90)).toBe(3);
    expect(getGateForEnochDay(91)).toBe(4);
    expect(getGateForEnochDay(180)).toBe(6);
    expect(getGateForEnochDay(181)).toBe(7);
    expect(getGateForEnochDay(270)).toBe(9);
    expect(getGateForEnochDay(271)).toBe(10);
    expect(getGateForEnochDay(331)).toBe(12);
    expect(getGateForEnochDay(364)).toBe(12);
  });

  it("places the strongest slowdown in the summer and winter turn gates", () => {
    expect(GATE_SLOWDOWN_WEIGHTS[3]).toBeGreaterThan(
      GATE_SLOWDOWN_WEIGHTS[2]
    );
    expect(GATE_SLOWDOWN_WEIGHTS[4]).toBeGreaterThan(
      GATE_SLOWDOWN_WEIGHTS[5]
    );
    expect(GATE_SLOWDOWN_WEIGHTS[9]).toBeGreaterThan(
      GATE_SLOWDOWN_WEIGHTS[8]
    );
    expect(GATE_SLOWDOWN_WEIGHTS[10]).toBeGreaterThan(
      GATE_SLOWDOWN_WEIGHTS[11]
    );
    expect(GATE_SLOWDOWN_WEIGHTS[10]).toBeGreaterThan(
      GATE_SLOWDOWN_WEIGHTS[4]
    );
  });

  it("normalizes the 364 Enoch course days to one 365.2422-day solar year", () => {
    const timing = getCourseYearTiming();
    const totalMinutes = sum(
      timing.map((day) => day.courseDayDurationMinutes)
    );
    const totalExtraMinutes = sum(timing.map((day) => day.extraMinutes));

    expect(timing).toHaveLength(364);
    expect(totalMinutes).toBeCloseTo(TROPICAL_YEAR_MINUTES, 6);
    expect(totalExtraMinutes).toBeCloseTo(EXTRA_COURSE_MINUTES, 6);
  });

  it("keeps straight gates nearly 24 hours and makes turn gates longer", () => {
    const gate1Day = getCourseDayTiming(1);
    const gate4Day = getCourseDayTiming(91);
    const gate10Day = getCourseDayTiming(271);

    expect(gate1Day.courseDayDurationMinutes).toBeGreaterThan(
      MODERN_MINUTES_PER_DAY
    );
    expect(gate1Day.courseDayDurationMinutes).toBeLessThan(
      MODERN_MINUTES_PER_DAY + 1
    );
    expect(gate4Day.courseDayDurationMinutes).toBeGreaterThan(
      MODERN_MINUTES_PER_DAY
    );
    expect(gate10Day.courseDayDurationMinutes).toBeGreaterThan(
      gate4Day.courseDayDurationMinutes
    );
  });
});
