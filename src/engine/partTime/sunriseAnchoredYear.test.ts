/*
 * File: src/engine/partTime/sunriseAnchoredYear.test.ts
 * Purpose: Tests a Jerusalem-sunrise-anchored Enoch year against true 2028 solar gates.
 */

import fs from "fs";
import path from "path";

import {
  getDayPartsForEnochDay,
  getNightPartsForEnochDay,
} from "./partCurve";
import { getSolarGateYear } from "./solarGates";

type CachedSolarDay = {
  date: string;
  sunriseIso: string;
  sunsetIso: string;
};

type SolarYearCacheFile = {
  days?: Record<string, CachedSolarDay>;
};

type SunriseAnchoredRow = {
  enochDay: number;
  enochDate: string;
  startsAtSunriseIso: string;
  sunsetIso: string;
  endsAtNextSunriseIso: string;
  dayParts: number;
  nightParts: number;
  daylightMinutes: number;
  nightMinutes: number;
  marchEquinoxTrue: boolean;
  juneSolsticeTrue: boolean;
  septemberEquinoxTrue: boolean;
  decemberSolsticeTrue: boolean;
};

type GateComparisonRow = {
  startDate: string;
  juneSolstice: string;
  juneInQ1GateRegion: boolean;
  septemberEquinox: string;
  septemberInQ2GateRegion: boolean;
  decemberSolstice: string;
  decemberInQ3GateRegion: boolean;
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

/** read solar cache year. */
function readSolarCacheYear(year: number): Record<string, CachedSolarDay> {
  const filePath = path.join(SOLAR_CACHE_ROOT, `${year}.json`);

  if (!fs.existsSync(filePath)) return {};

  const file = JSON.parse(
    fs.readFileSync(filePath, "utf8")
  ) as SolarYearCacheFile;

  return file.days ?? {};
}

/** get cached solar days. */
function getCachedSolarDays(startDate: string, dayCount: number) {
  const start = new Date(`${startDate}T00:00:00.000Z`);
  const dates = Array.from({ length: dayCount }, (_, index) =>
    formatDateId(addDays(start, index))
  );
  const years = [...new Set(dates.map((date) => Number(date.slice(0, 4))))];
  const cachedDays = Object.assign(
    {},
    ...years.map((year) => readSolarCacheYear(year))
  ) as Record<string, CachedSolarDay>;

  return dates.map((date) => cachedDays[date]).filter(Boolean);
}

/** check whether timestamp is inside row. */
function isTimestampInsideWindow(
  timestampIso: string,
  startIso: string,
  endIso: string
) {
  const timestamp = new Date(timestampIso).getTime();

  return (
    timestamp >= new Date(startIso).getTime() &&
    timestamp < new Date(endIso).getTime()
  );
}

/** build sunrise anchored rows. */
function buildSunriseAnchoredRows(
  year: number,
  startDateOverride?: string
): SunriseAnchoredRow[] {
  const gates = getSolarGateYear(year);

  if (!gates) {
    throw new Error(`Missing solar gate data for ${year}.`);
  }

  const firstDate = startDateOverride ?? gates.march_equinox.slice(0, 10);
  const solarDays = getCachedSolarDays(firstDate, 365);

  if (solarDays.length < 365) {
    throw new Error(
      `Missing cached Jerusalem solar days. Found ${solarDays.length}, expected 365.`
    );
  }

  return Array.from({ length: 364 }, (_, index) => {
    const enochDay = index + 1;
    const currentSolarDay = solarDays[index];
    const nextSolarDay = solarDays[index + 1];
    const startIso = currentSolarDay.sunriseIso;
    const endIso = nextSolarDay.sunriseIso;
    const daylightMinutes =
      (new Date(currentSolarDay.sunsetIso).getTime() -
        new Date(startIso).getTime()) /
      60000;
    const nightMinutes =
      (new Date(endIso).getTime() -
        new Date(currentSolarDay.sunsetIso).getTime()) /
      60000;

    return {
      enochDay,
      enochDate: getEnochDateLabel(enochDay),
      startsAtSunriseIso: startIso,
      sunsetIso: currentSolarDay.sunsetIso,
      endsAtNextSunriseIso: endIso,
      dayParts: getDayPartsForEnochDay(enochDay),
      nightParts: getNightPartsForEnochDay(enochDay),
      daylightMinutes,
      nightMinutes,
      marchEquinoxTrue: isTimestampInsideWindow(
        gates.march_equinox,
        startIso,
        endIso
      ),
      juneSolsticeTrue: isTimestampInsideWindow(
        gates.june_solstice,
        startIso,
        endIso
      ),
      septemberEquinoxTrue: isTimestampInsideWindow(
        gates.september_equinox,
        startIso,
        endIso
      ),
      decemberSolsticeTrue: isTimestampInsideWindow(
        gates.december_solstice,
        startIso,
        endIso
      ),
    };
  });
}

/** get previous sunrise context. */
function getPreviousSunriseContext(year: number) {
  const gates = getSolarGateYear(year);

  if (!gates) {
    throw new Error(`Missing solar gate data for ${year}.`);
  }

  const firstDate = gates.march_equinox.slice(0, 10);
  const previousDate = formatDateId(
    addDays(new Date(`${firstDate}T00:00:00.000Z`), -1)
  );
  const solarDays = {
    ...readSolarCacheYear(Number(previousDate.slice(0, 4))),
    ...readSolarCacheYear(Number(firstDate.slice(0, 4))),
  };
  const previousSolarDay = solarDays[previousDate];
  const firstSolarDay = solarDays[firstDate];

  if (!previousSolarDay || !firstSolarDay) {
    throw new Error("Missing cached solar days around the March equinox.");
  }

  return {
    marchEquinoxIso: gates.march_equinox,
    previousSunriseIso: previousSolarDay.sunriseIso,
    previousSunsetIso: previousSolarDay.sunsetIso,
    firstSunriseIso: firstSolarDay.sunriseIso,
    marchEquinoxBelongsToPreviousSunriseDay: isTimestampInsideWindow(
      gates.march_equinox,
      previousSolarDay.sunriseIso,
      firstSolarDay.sunriseIso
    ),
  };
}

/** format rows. */
function formatRows(rows: SunriseAnchoredRow[]) {
  const header = [
    "Enoch Day",
    "Enoch",
    "Sunrise UTC",
    "Sunset UTC",
    "Next Sunrise UTC",
    "Day Parts",
    "Night Parts",
    "Daylight Min",
    "Night Min",
    "March Eq",
    "June Sol",
    "Sept Eq",
    "Dec Sol",
  ];
  const divider = header.map(() => "---");
  const body = rows.map((row) => [
    String(row.enochDay),
    row.enochDate,
    row.startsAtSunriseIso,
    row.sunsetIso,
    row.endsAtNextSunriseIso,
    String(row.dayParts),
    String(row.nightParts),
    row.daylightMinutes.toFixed(1),
    row.nightMinutes.toFixed(1),
    row.marchEquinoxTrue ? "true" : "",
    row.juneSolsticeTrue ? "true" : "",
    row.septemberEquinoxTrue ? "true" : "",
    row.decemberSolsticeTrue ? "true" : "",
  ]);

  return [header, divider, ...body]
    .map((cells) => `| ${cells.join(" | ")} |`)
    .join("\n");
}

/** get gate rows. */
function getGateRows(rows: SunriseAnchoredRow[]) {
  return rows.filter(
    (row) =>
      row.marchEquinoxTrue ||
      row.juneSolsticeTrue ||
      row.septemberEquinoxTrue ||
      row.decemberSolsticeTrue
  );
}

/** find flagged row. */
function findFlaggedRow(
  rows: SunriseAnchoredRow[],
  flagName:
    | "juneSolsticeTrue"
    | "septemberEquinoxTrue"
    | "decemberSolsticeTrue"
) {
  const row = rows.find((item) => item[flagName]);

  if (!row) {
    throw new Error(`Missing flagged row for ${flagName}.`);
  }

  return row;
}

/** format gate placement. */
function formatGatePlacement(row: SunriseAnchoredRow) {
  return `Day ${row.enochDay} ${row.enochDate}`;
}

/** check whether day is inside region. */
function isInsideRegion(day: number, allowedDays: number[]) {
  return allowedDays.includes(day);
}

/** build gate comparison rows. */
function buildGateComparisonRows(startDates: string[]): GateComparisonRow[] {
  return startDates.map((startDate) => {
    const rows = buildSunriseAnchoredRows(CHART_YEAR, startDate);
    const june = findFlaggedRow(rows, "juneSolsticeTrue");
    const september = findFlaggedRow(rows, "septemberEquinoxTrue");
    const december = findFlaggedRow(rows, "decemberSolsticeTrue");

    return {
      startDate,
      juneSolstice: formatGatePlacement(june),
      juneInQ1GateRegion: isInsideRegion(june.enochDay, [90, 91, 92]),
      septemberEquinox: formatGatePlacement(september),
      septemberInQ2GateRegion: isInsideRegion(september.enochDay, [
        181,
        182,
        183,
      ]),
      decemberSolstice: formatGatePlacement(december),
      decemberInQ3GateRegion: isInsideRegion(december.enochDay, [
        272,
        273,
        274,
      ]),
    };
  });
}

/** format comparison rows. */
function formatComparisonRows(rows: GateComparisonRow[]) {
  const header = [
    "Start Date",
    "June Solstice",
    "Q1 Region",
    "September Equinox",
    "Q2 Region",
    "December Solstice",
    "Q3 Region",
  ];
  const divider = header.map(() => "---");
  const body = rows.map((row) => [
    row.startDate,
    row.juneSolstice,
    row.juneInQ1GateRegion ? "true" : "false",
    row.septemberEquinox,
    row.septemberInQ2GateRegion ? "true" : "false",
    row.decemberSolstice,
    row.decemberInQ3GateRegion ? "true" : "false",
  ]);

  return [header, divider, ...body]
    .map((cells) => `| ${cells.join(" | ")} |`)
    .join("\n");
}

describe.skip("2028 sunrise-anchored Enoch year diagnostic", () => {
  it("anchors each Enoch day to Jerusalem sunrise and shows true solar gates", () => {
    const rows = buildSunriseAnchoredRows(CHART_YEAR);
    const gateRows = getGateRows(rows);
    const previousSunriseContext = getPreviousSunriseContext(CHART_YEAR);

    console.log(
      `March equinox sunrise context:\n${JSON.stringify(
        previousSunriseContext,
        null,
        2
      )}`
    );
    console.log(`Gate rows:\n${formatRows(gateRows)}`);

    expect(rows).toHaveLength(364);
    expect(
      rows.every(
        (row) =>
          new Date(row.startsAtSunriseIso).getTime() <
            new Date(row.sunsetIso).getTime() &&
          new Date(row.sunsetIso).getTime() <
            new Date(row.endsAtNextSunriseIso).getTime()
      )
    ).toBe(true);
    expect(previousSunriseContext).toEqual(
      expect.objectContaining({
        marchEquinoxBelongsToPreviousSunriseDay: true,
      })
    );
    expect(gateRows).toEqual([
      expect.objectContaining({
        enochDay: 93,
        enochDate: "M4 D2",
        juneSolsticeTrue: true,
      }),
      expect.objectContaining({
        enochDay: 187,
        enochDate: "M7 D5",
        septemberEquinoxTrue: true,
      }),
      expect.objectContaining({
        enochDay: 277,
        enochDate: "M10 D4",
        decemberSolsticeTrue: true,
      }),
    ]);
  });

  it("starts Day 1 on the Jerusalem sunrise after the equinox day completes", () => {
    const rows = buildSunriseAnchoredRows(CHART_YEAR, "2028-03-21");
    const gateRows = getGateRows(rows);

    console.log(`March 21 start gate rows:\n${formatRows(gateRows)}`);

    expect(rows[0]).toEqual(
      expect.objectContaining({
        enochDay: 1,
        enochDate: "M1 D1",
        startsAtSunriseIso: "2028-03-21T03:39:42+00:00",
      })
    );
    expect(rows).toHaveLength(364);
    expect(
      rows.every(
        (row) =>
          new Date(row.startsAtSunriseIso).getTime() <
            new Date(row.sunsetIso).getTime() &&
          new Date(row.sunsetIso).getTime() <
            new Date(row.endsAtNextSunriseIso).getTime()
      )
    ).toBe(true);
    expect(gateRows).toEqual([
      expect.objectContaining({
        enochDay: 92,
        enochDate: "M4 D1",
        juneSolsticeTrue: true,
      }),
      expect.objectContaining({
        enochDay: 186,
        enochDate: "M7 D4",
        septemberEquinoxTrue: true,
      }),
      expect.objectContaining({
        enochDay: 276,
        enochDate: "M10 D3",
        decemberSolsticeTrue: true,
      }),
    ]);
  });

  it("compares March 20, 21, and 22 sunrise starts against gate regions", () => {
    const comparisonRows = buildGateComparisonRows([
      "2028-03-20",
      "2028-03-21",
      "2028-03-22",
    ]);

    console.log(
      `Sunrise start comparison:\n${formatComparisonRows(comparisonRows)}`
    );

    expect(comparisonRows).toEqual([
      {
        startDate: "2028-03-20",
        juneSolstice: "Day 93 M4 D2",
        juneInQ1GateRegion: false,
        septemberEquinox: "Day 187 M7 D5",
        septemberInQ2GateRegion: false,
        decemberSolstice: "Day 277 M10 D4",
        decemberInQ3GateRegion: false,
      },
      {
        startDate: "2028-03-21",
        juneSolstice: "Day 92 M4 D1",
        juneInQ1GateRegion: true,
        septemberEquinox: "Day 186 M7 D4",
        septemberInQ2GateRegion: false,
        decemberSolstice: "Day 276 M10 D3",
        decemberInQ3GateRegion: false,
      },
      {
        startDate: "2028-03-22",
        juneSolstice: "Day 91 Q1 Gate Day",
        juneInQ1GateRegion: true,
        septemberEquinox: "Day 185 M7 D3",
        septemberInQ2GateRegion: false,
        decemberSolstice: "Day 275 M10 D2",
        decemberInQ3GateRegion: false,
      },
    ]);
  });
});
