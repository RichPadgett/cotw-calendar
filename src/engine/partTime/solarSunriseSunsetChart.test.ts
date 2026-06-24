/*
 * File: src/engine/partTime/solarSunriseSunsetChart.test.ts
 * Purpose: Verifies cached Jerusalem sunrise/sunset events inside each 2028 Enoch day window.
 */

import fs from "fs";
import path from "path";

import { getSolarGateCourseYearTiming } from "./solarGateCourse";
import { getSolarGateYear } from "./solarGates";

type CachedSolarDay = {
  date: string;
  sunriseIso: string;
  sunsetIso: string;
};

type SolarYearCacheFile = {
  days?: Record<string, CachedSolarDay>;
};

type SunriseSunsetChartRow = {
  enochDay: number;
  enochDate: string;
  startsAtIso: string;
  endsAtIso: string;
  sunriseTimes: string[];
  sunsetTimes: string[];
  multipleSunrises: boolean;
  multipleSunsets: boolean;
};

type SunriseSunsetChartSummary = {
  totalRows: number;
  totalSunrises: number;
  totalSunsets: number;
  rowsWithNoSunrise: number[];
  rowsWithNoSunset: number[];
  rowsWithMultipleSunrises: number[];
  rowsWithMultipleSunsets: number[];
};

const CHART_YEAR = 2028;
const SOLAR_CACHE_ROOT = path.join(
  process.cwd(),
  "server",
  "content",
  "system",
  "solar",
  "jerusalem"
);

/** add minutes. */
function addMinutes(date: Date, minutes: number) {
  return new Date(date.getTime() + minutes * 60_000);
}

/** add days. */
function addDays(date: Date, days: number) {
  const next = new Date(date);

  next.setUTCDate(next.getUTCDate() + days);

  return next;
}

/** format date id. */
function formatDateId(date: Date) {
  return date.toISOString().slice(0, 10);
}

/** get enoch date label. */
function getEnochDateLabel(enochDay: number) {
  const quarter = Math.floor((enochDay - 1) / 91) + 1;
  const dayInQuarter = ((enochDay - 1) % 91) + 1;

  if (dayInQuarter === 91) {
    return `Q${quarter} Gate Day`;
  }

  const month = (quarter - 1) * 3 + Math.floor((dayInQuarter - 1) / 30) + 1;
  const day = ((dayInQuarter - 1) % 30) + 1;

  return `M${month} D${day}`;
}

/** check whether timestamp is inside row. */
function isTimestampInsideWindow(timestampIso: string, start: Date, end: Date) {
  const timestamp = new Date(timestampIso).getTime();

  return timestamp >= start.getTime() && timestamp < end.getTime();
}

/** read solar cache year. */
function readSolarCacheYear(year: number): Record<string, CachedSolarDay> {
  const filePath = path.join(SOLAR_CACHE_ROOT, `${year}.json`);

  if (!fs.existsSync(filePath)) return {};

  const file = JSON.parse(
    fs.readFileSync(filePath, "utf8")
  ) as SolarYearCacheFile;

  return file.days ?? {};
}

/** get required cache dates. */
function getRequiredCacheDates(startIso: string, endIso: string) {
  const dates: string[] = [];
  let cursor = new Date(`${startIso.slice(0, 10)}T00:00:00.000Z`);
  const finalDate = new Date(`${endIso.slice(0, 10)}T00:00:00.000Z`);

  while (cursor.getTime() <= finalDate.getTime()) {
    dates.push(formatDateId(cursor));
    cursor = addDays(cursor, 1);
  }

  return dates;
}

/** get cached solar days. */
function getCachedSolarDays(requiredDates: string[]) {
  const years = [...new Set(requiredDates.map((date) => Number(date.slice(0, 4))))];
  const cachedDays = Object.assign(
    {},
    ...years.map((year) => readSolarCacheYear(year))
  ) as Record<string, CachedSolarDay>;

  return requiredDates.map((date) => cachedDays[date]).filter(Boolean);
}

/** build sunrise sunset chart rows. */
function buildSunriseSunsetChartRows(
  year: number,
  solarDays: CachedSolarDay[]
): SunriseSunsetChartRow[] {
  const gates = getSolarGateYear(year);

  if (!gates) {
    throw new Error(`Missing solar gate data for ${year}.`);
  }

  let cursor = new Date(gates.march_equinox);

  return getSolarGateCourseYearTiming(year).map((day) => {
    const start = cursor;
    const end = addMinutes(start, day.courseDayDurationMinutes);
    const sunriseTimes = solarDays
      .map((solarDay) => solarDay.sunriseIso)
      .filter((sunriseIso) => isTimestampInsideWindow(sunriseIso, start, end));
    const sunsetTimes = solarDays
      .map((solarDay) => solarDay.sunsetIso)
      .filter((sunsetIso) => isTimestampInsideWindow(sunsetIso, start, end));

    cursor = end;

    return {
      enochDay: day.enochDay,
      enochDate: getEnochDateLabel(day.enochDay),
      startsAtIso: start.toISOString(),
      endsAtIso: end.toISOString(),
      sunriseTimes,
      sunsetTimes,
      multipleSunrises: sunriseTimes.length > 1,
      multipleSunsets: sunsetTimes.length > 1,
    };
  });
}

/** format sunrise sunset chart. */
function formatSunriseSunsetChart(rows: SunriseSunsetChartRow[]) {
  const header = [
    "Enoch Day",
    "Enoch",
    "Starts UTC",
    "Ends UTC",
    "Sunrise Times UTC",
    "Sunset Times UTC",
    "Multiple Sunrises",
    "Multiple Sunsets",
  ];
  const divider = header.map(() => "---");
  const body = rows.map((row) => [
    String(row.enochDay),
    row.enochDate,
    row.startsAtIso,
    row.endsAtIso,
    row.sunriseTimes.join(", "),
    row.sunsetTimes.join(", "),
    row.multipleSunrises ? "true" : "",
    row.multipleSunsets ? "true" : "",
  ]);

  return [header, divider, ...body]
    .map((cells) => `| ${cells.join(" | ")} |`)
    .join("\n");
}

/** summarize sunrise sunset chart. */
function summarizeSunriseSunsetChart(
  rows: SunriseSunsetChartRow[]
): SunriseSunsetChartSummary {
  return {
    totalRows: rows.length,
    totalSunrises: rows.reduce(
      (total, row) => total + row.sunriseTimes.length,
      0
    ),
    totalSunsets: rows.reduce(
      (total, row) => total + row.sunsetTimes.length,
      0
    ),
    rowsWithNoSunrise: rows
      .filter((row) => row.sunriseTimes.length === 0)
      .map((row) => row.enochDay),
    rowsWithNoSunset: rows
      .filter((row) => row.sunsetTimes.length === 0)
      .map((row) => row.enochDay),
    rowsWithMultipleSunrises: rows
      .filter((row) => row.multipleSunrises)
      .map((row) => row.enochDay),
    rowsWithMultipleSunsets: rows
      .filter((row) => row.multipleSunsets)
      .map((row) => row.enochDay),
  };
}

describe("2028 Jerusalem sunrise/sunset inside each Enoch day", () => {
  it("prints each Enoch day sunrise/sunset and reports duplicate events", () => {
    const gates = getSolarGateYear(CHART_YEAR)!;
    const nextGates = getSolarGateYear(CHART_YEAR + 1)!;
    const requiredDates = getRequiredCacheDates(
      gates.march_equinox,
      nextGates.march_equinox
    );
    const cachedSolarDays = getCachedSolarDays(requiredDates);
    const cachedDateSet = new Set(cachedSolarDays.map((day) => day.date));
    const missingDates = requiredDates.filter((date) => !cachedDateSet.has(date));

    if (missingDates.length > 0) {
      console.warn(
        [
          "Jerusalem solar cache is not populated for the full 2028 Enoch year.",
          `Missing ${missingDates.length} day(s).`,
          "Preload the server cache, then rerun this test:",
          "curl 'http://localhost:3001/api/solar/jerusalem/year/2028?fillMissing=true'",
          "curl 'http://localhost:3001/api/solar/jerusalem/year/2029?fillMissing=true'",
        ].join("\n")
      );

      expect(cachedSolarDays).toHaveLength(0);
      return;
    }

    const rows = buildSunriseSunsetChartRows(CHART_YEAR, cachedSolarDays);
    const summary = summarizeSunriseSunsetChart(rows);
    const anomalyRows = rows.filter(
      (row) =>
        row.sunriseTimes.length !== 1 ||
        row.sunsetTimes.length !== 1 ||
        row.multipleSunrises ||
        row.multipleSunsets
    );

    console.log(
      `Sunrise/sunset summary:\n${JSON.stringify(summary, null, 2)}`
    );
    console.log(formatSunriseSunsetChart(rows));

    if (anomalyRows.length > 0) {
      console.warn(
        `Sunrise/sunset anomaly matrix:\n${formatSunriseSunsetChart(
          anomalyRows
        )}`
      );
    }

    expect(rows).toHaveLength(364);
    expect(summary.totalSunrises).toBeGreaterThan(0);
    expect(summary.totalSunsets).toBeGreaterThan(0);
  });
});
