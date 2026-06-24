/*
 * File: src/engine/partTime/partTimeSeasonAlignment.test.ts
 * Purpose: Part Time model engine for Enoch day parts, solar gates, and variable course duration.
 */

import {
  getDayPartsForEnochDay,
  getNightPartsForEnochDay,
  getSeasonFromEnochDay,
} from "./partCurve";

const ANCHOR_YEAR = 2028;
const ANCHOR_START_DATE = "2028-03-22";
const ENOCH_YEAR_DAYS = 364;

/** add days. */
function addDays(dateString: string, days: number) {
  const date = new Date(`${dateString}T00:00:00.000Z`);
  date.setUTCDate(date.getUTCDate() + days);

  return date.toISOString().slice(0, 10);
}

/** get day delta. */
function getDayDelta(leftDateString: string, rightDateString: string) {
  const left = new Date(`${leftDateString}T00:00:00.000Z`);
  const right = new Date(`${rightDateString}T00:00:00.000Z`);

  return Math.round((left.getTime() - right.getTime()) / 86_400_000);
}

/** get anchored start date. */
function getAnchoredStartDate(enochYear: number) {
  return addDays(
    ANCHOR_START_DATE,
    (enochYear - ANCHOR_YEAR) * ENOCH_YEAR_DAYS
  );
}

/** get checkpoint dates. */
function getCheckpointDates(enochYear: number) {
  const start = getAnchoredStartDate(enochYear);

  return {
    spring: start,
    summer: addDays(start, 90),
    fall: addDays(start, 181),
    winter: addDays(start, 272),
    nextSpring: addDays(start, 364),
  };
}

describe("Part Time seasonal alignment from March 22, 2028 anchor", () => {
  it("keeps the part curve aligned to the four seasonal checkpoint days", () => {
    expect(getSeasonFromEnochDay(1)).toBe("spring");
    expect(getDayPartsForEnochDay(1)).toBe(9);
    expect(getNightPartsForEnochDay(1)).toBe(9);

    expect(getSeasonFromEnochDay(91)).toBe("spring");
    expect(getDayPartsForEnochDay(91)).toBe(12);
    expect(getNightPartsForEnochDay(91)).toBe(6);

    expect(getSeasonFromEnochDay(182)).toBe("summer");
    expect(getDayPartsForEnochDay(182)).toBe(9);
    expect(getNightPartsForEnochDay(182)).toBe(9);

    expect(getSeasonFromEnochDay(273)).toBe("fall");
    expect(getDayPartsForEnochDay(273)).toBe(6);
    expect(getNightPartsForEnochDay(273)).toBe(12);
  });

  it("treats the 2028 spring equinox as the final gate before the working year start", () => {
    const approximateSolarGates = {
      springEquinox: "2028-03-20",
      summerSolstice: "2028-06-20",
      fallEquinox: "2028-09-22",
      winterSolstice: "2028-12-21",
    };
    const modelGates = getCheckpointDates(2028);

    expect(modelGates.spring).toBe("2028-03-22");
    expect(
      getDayDelta(modelGates.spring, approximateSolarGates.springEquinox)
    ).toBe(2);

    expect(
      Math.abs(
        getDayDelta(modelGates.summer, approximateSolarGates.summerSolstice)
      )
    ).toBeLessThanOrEqual(3);
    expect(
      Math.abs(getDayDelta(modelGates.fall, approximateSolarGates.fallEquinox))
    ).toBeLessThanOrEqual(3);
    expect(
      Math.abs(
        getDayDelta(modelGates.winter, approximateSolarGates.winterSolstice)
      )
    ).toBeLessThanOrEqual(3);
  });

  it("projects the 364-day model backward and forward from the 2028 spring anchor", () => {
    expect(
      [2025, 2026, 2027, 2028, 2029, 2030, 2031].map((enochYear) => ({
        enochYear,
        ...getCheckpointDates(enochYear),
      }))
    ).toEqual([
      {
        enochYear: 2025,
        spring: "2025-03-26",
        summer: "2025-06-24",
        fall: "2025-09-23",
        winter: "2025-12-23",
        nextSpring: "2026-03-25",
      },
      {
        enochYear: 2026,
        spring: "2026-03-25",
        summer: "2026-06-23",
        fall: "2026-09-22",
        winter: "2026-12-22",
        nextSpring: "2027-03-24",
      },
      {
        enochYear: 2027,
        spring: "2027-03-24",
        summer: "2027-06-22",
        fall: "2027-09-21",
        winter: "2027-12-21",
        nextSpring: "2028-03-22",
      },
      {
        enochYear: 2028,
        spring: "2028-03-22",
        summer: "2028-06-20",
        fall: "2028-09-19",
        winter: "2028-12-19",
        nextSpring: "2029-03-21",
      },
      {
        enochYear: 2029,
        spring: "2029-03-21",
        summer: "2029-06-19",
        fall: "2029-09-18",
        winter: "2029-12-18",
        nextSpring: "2030-03-20",
      },
      {
        enochYear: 2030,
        spring: "2030-03-20",
        summer: "2030-06-18",
        fall: "2030-09-17",
        winter: "2030-12-17",
        nextSpring: "2031-03-19",
      },
      {
        enochYear: 2031,
        spring: "2031-03-19",
        summer: "2031-06-17",
        fall: "2031-09-16",
        winter: "2031-12-16",
        nextSpring: "2032-03-17",
      },
    ]);
  });
});
