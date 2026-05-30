/*
 * File: src/engine/enochYearCycle.test.ts
 * Purpose: Test coverage for the Enoch calendar calculation engine.
 * Author: rpadgett
 */

import { buildEnochYear } from "./buildEnochYear";

/**
 * Formats Date fixtures as YYYY-MM-DD during year-cycle tests.
 * This test helper removes time data from generated dates.
 */
function formatDateOnly(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

/**
 * Adds days to a YYYY-MM-DD fixture for year-cycle expectations.
 * This test helper constructs expected Gregorian dates around sabbath-year transitions.
 */
function addDays(dateString: string, days: number): string {
  const [year, month, day] = dateString.split("-").map(Number);

  const date = new Date(year, month - 1, day);
  date.setHours(12, 0, 0, 0);
  date.setDate(date.getDate() + days);

  return formatDateOnly(date);
}

describe("Enoch year cycle with Sabbath-week reset", () => {
  it("keeps month days stable in Sabbath-week years", () => {
    const year = buildEnochYear({
      enochYear: 2032,
      startsOnGregorianDate: "2032-03-17",
    });

const monthOneDays1 = year
  .filter((node) => node.enoch?.month?.number === 1)
  .map((node) => ({
    gregorianDate: node.gregorianDate,
    day: node.enoch?.day,
  }));

console.log(monthOneDays1);

    const monthOneDays = year
      .filter((node) => node.enoch?.month?.number === 1)
      .map((node) => node.enoch?.day);

    expect(monthOneDays).toHaveLength(30);
    expect(monthOneDays).toEqual(
      Array.from({ length: 30 }, (_, index) => index + 1)
    );

    const firstfruits = year.find((node) =>
      node.enoch?.events?.some((event) => event.id === "firstfruits")
    );

    expect(firstfruits?.enoch?.month?.number).toBe(1);
    expect(firstfruits?.enoch?.day).toBe(12);

    const shavuot = year.find((node) =>
      node.enoch?.events?.some((event) => event.id === "shavuot")
    );

    expect(shavuot?.enoch?.month?.number).toBe(3);
    expect(shavuot?.enoch?.day).toBe(1);
  });

  it("calculates Sabbath-week reset year starts", () => {
    const startYear = 2026;
    const startDate = "2026-03-18";

    const results = [];

    let currentStartDate = startDate;

    for (let index = 0; index < 15; index++) {
      const enochYear = startYear + index;

      results.push({
        enochYear,
        abib1GregorianDate: currentStartDate,
      });

      const shouldAddSabbathWeek = (index + 1) % 6 === 0;

      currentStartDate = addDays(
        currentStartDate,
        shouldAddSabbathWeek ? 371 : 364
      );
    }

    expect(results[6]).toEqual({
      enochYear: 2032,
      abib1GregorianDate: "2032-03-17",
    });

    expect(results[12]).toEqual({
      enochYear: 2038,
      abib1GregorianDate: "2038-03-17",
    });
  });
});