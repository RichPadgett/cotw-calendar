/*
 * File: src/engine/partTime/solarGateCourseChart.test.ts
 * Purpose: Builds a visible 2028 Enoch/Gregorian alignment chart for the solar-gate anchored course.
 */

import { getSolarGateCourseYearTiming } from "./solarGateCourse";
import { getSolarGateYear } from "./solarGates";

type GateFlagKey =
  | "marchEquinoxTrue"
  | "juneSolsticeTrue"
  | "septemberEquinoxTrue"
  | "decemberSolsticeTrue";

type AlignmentChartRow = {
  enochDay: number;
  enochDate: string;
  gregorianDate: string;
  startsAtIso: string;
  endsAtIso: string;
  gate: number;
  marchEquinoxTrue: boolean;
  juneSolsticeTrue: boolean;
  septemberEquinoxTrue: boolean;
  decemberSolsticeTrue: boolean;
};

const CHART_YEAR = 2028;

/** add minutes. */
function addMinutes(date: Date, minutes: number) {
  return new Date(date.getTime() + minutes * 60_000);
}

/** check whether timestamp is inside row. */
function isTimestampInsideRow(timestampIso: string, start: Date, end: Date) {
  const timestamp = new Date(timestampIso).getTime();

  return timestamp >= start.getTime() && timestamp < end.getTime();
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

/** build alignment chart rows. */
function buildAlignmentChartRows(year: number): AlignmentChartRow[] {
  const gates = getSolarGateYear(year);

  if (!gates) {
    throw new Error(`Missing solar gate data for ${year}.`);
  }

  let cursor = new Date(gates.march_equinox);

  return getSolarGateCourseYearTiming(year).map((day) => {
    const start = cursor;
    const end = addMinutes(start, day.courseDayDurationMinutes);

    cursor = end;

    return {
      enochDay: day.enochDay,
      enochDate: getEnochDateLabel(day.enochDay),
      gregorianDate: start.toISOString().slice(0, 10),
      startsAtIso: start.toISOString(),
      endsAtIso: end.toISOString(),
      gate: day.gate,
      marchEquinoxTrue: isTimestampInsideRow(gates.march_equinox, start, end),
      juneSolsticeTrue: isTimestampInsideRow(gates.june_solstice, start, end),
      septemberEquinoxTrue: isTimestampInsideRow(
        gates.september_equinox,
        start,
        end
      ),
      decemberSolsticeTrue: isTimestampInsideRow(
        gates.december_solstice,
        start,
        end
      ),
    };
  });
}

/** format alignment chart. */
function formatAlignmentChart(rows: AlignmentChartRow[]) {
  const header = [
    "Enoch Day",
    "Enoch",
    "Gregorian",
    "Starts UTC",
    "Ends UTC",
    "Gate",
    "March Eq",
    "June Sol",
    "Sept Eq",
    "Dec Sol",
  ];
  const divider = header.map(() => "---");
  const body = rows.map((row) => [
    String(row.enochDay),
    row.enochDate,
    row.gregorianDate,
    row.startsAtIso,
    row.endsAtIso,
    String(row.gate),
    row.marchEquinoxTrue ? "true" : "",
    row.juneSolsticeTrue ? "true" : "",
    row.septemberEquinoxTrue ? "true" : "",
    row.decemberSolsticeTrue ? "true" : "",
  ]);

  return [header, divider, ...body]
    .map((cells) => `| ${cells.join(" | ")} |`)
    .join("\n");
}

/** get true flag rows. */
function getTrueFlagRows(rows: AlignmentChartRow[]) {
  const flagKeys: GateFlagKey[] = [
    "marchEquinoxTrue",
    "juneSolsticeTrue",
    "septemberEquinoxTrue",
    "decemberSolsticeTrue",
  ];

  return rows.filter((row) => flagKeys.some((key) => row[key]));
}

describe("2028 solar-gate Enoch/Gregorian alignment chart", () => {
  it("charts every 2028 Enoch day with true equinox and solstice flags", () => {
    const rows = buildAlignmentChartRows(CHART_YEAR);

    console.log(formatAlignmentChart(rows));

    expect(rows).toHaveLength(364);
    expect(getTrueFlagRows(rows)).toEqual([
      expect.objectContaining({
        enochDay: 1,
        enochDate: "M1 D1",
        gregorianDate: "2028-03-20",
        marchEquinoxTrue: true,
      }),
      expect.objectContaining({
        enochDay: 92,
        enochDate: "M4 D1",
        gregorianDate: "2028-06-20",
        juneSolsticeTrue: true,
      }),
      expect.objectContaining({
        enochDay: 183,
        enochDate: "M7 D1",
        gregorianDate: "2028-09-22",
        septemberEquinoxTrue: true,
      }),
      expect.objectContaining({
        enochDay: 274,
        enochDate: "M10 D1",
        gregorianDate: "2028-12-21",
        decemberSolsticeTrue: true,
      }),
    ]);
  });
});
