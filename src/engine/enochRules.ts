// src/engine/enochRules.ts

import { CalendarNode, EnochSeason } from "../models/calendar";
import { getEnochDayEvents } from "./enochFeasts";
import { ENOCH_MONTHS } from "./enochMonths";

import {
  ENOCH_DAYS_PER_MONTH,
  ENOCH_DAYS_PER_QUARTER,
  ENOCH_DAYS_PER_YEAR,
} from "./enochConstants";

/*
  Applies the Enoch overlay to Gregorian-backed CalendarNodes.

  The Gregorian date remains the canonical storage date.
  The Enoch date is projected from the configured Enoch year start date.
*/

export type EnochYearConfig = {
  enochYear: number;
  startsOnGregorianDate: string; // YYYY-MM-DD
};

export function applyEnochOverlay(
  nodes: CalendarNode[],
  config: EnochYearConfig
): CalendarNode[] {
  return nodes.map((node) => {
    const dayOfYear = getEnochDayOfYear(
      node.gregorianDate,
      config.startsOnGregorianDate
    );

    return {
      ...node,

      enoch: getEnochDay({
        enochYear: config.enochYear,
        dayOfYear,

        /*
          Needed for weekly Sabbath detection.

          JS Date.getDay():
          0 = Sunday
          6 = Saturday
        */
        gregorianDayOfWeek: node.gregorian.dayOfWeek,
      }),
    };
  });
}

/*
  Calculates the Enoch day-of-year from the Gregorian date
  and the configured Enoch year start date.

  Example:
  startsOnGregorianDate = 2026-03-18

  2026-03-18 => dayOfYear 1
  2026-03-19 => dayOfYear 2
*/

function getEnochDayOfYear(
  gregorianDate: string,
  startsOnGregorianDate: string
): number {
  const current = parseDateOnly(gregorianDate);
  const start = parseDateOnly(startsOnGregorianDate);

  const diffMs = current.getTime() - start.getTime();
  const diffDays = Math.floor(diffMs / 86_400_000);

  return diffDays + 1;
}

/*
  Converts an Enoch day-of-year into:

  - month
  - day
  - quarter
  - intercalary/gate status
  - feast/event metadata
  - weekly Sabbath metadata
*/

function getEnochDay(params: {
  enochYear: number;
  dayOfYear: number;
  gregorianDayOfWeek: number;
}) {
  const {
    enochYear,
    dayOfYear,
    gregorianDayOfWeek,
  } = params;

  /*
    Validate Enoch year bounds.
  */

  if (
    dayOfYear < 1 ||
    dayOfYear > ENOCH_DAYS_PER_YEAR
  ) {
    throw new Error(
      `Invalid Enoch dayOfYear: ${dayOfYear}`
    );
  }

  /*
    Quarter math.

    Each quarter:
    - 30 days
    - 30 days
    - 30 days
    - 1 intercalary/gate day

    Total = 91 days
  */

  const quarter = Math.ceil(
    dayOfYear / ENOCH_DAYS_PER_QUARTER
  );

  const quarterDay =
    ((dayOfYear - 1) % ENOCH_DAYS_PER_QUARTER) + 1;

  const isIntercalary =
    quarterDay === ENOCH_DAYS_PER_QUARTER;

  /*
    Weekly Sabbath detection.

    Current rule:
    Saturday = weekly Sabbath.

    This can later be replaced with a pure Enoch-week rule
    if you decide the app should not depend on Gregorian weekdays.
  */

  const isWeeklySabbath =
    gregorianDayOfWeek === 6;

  /*
    Intercalary / Gate Day

    These days are real days in the 364-day year,
    but they do not belong to an Enoch month.
  */

  if (isIntercalary) {
    const season = getSeasonForQuarter(quarter);

    return {
      year: enochYear,
      dayOfYear,

      quarter,

      isIntercalary: true,

      season,

      label: `${capitalize(season)} Gate Day`,

      events: getEnochDayEvents({
        isWeeklySabbath,
      }),
    };
  }

  /*
    Normal month/day math.

    Since the intercalary day is day 91 of each quarter,
    normal days 1–90 divide into three 30-day months.
  */

  const monthInQuarter = Math.ceil(
    quarterDay / ENOCH_DAYS_PER_MONTH
  );

  const monthNumber =
    (quarter - 1) * 3 + monthInQuarter;

  const day =
    ((quarterDay - 1) % ENOCH_DAYS_PER_MONTH) + 1;

  /*
    Look up month metadata:
    - month number
    - symbol image
    - theme color
    - season
    - optional Hebrew/Paleo data
  */

  const monthDefinition = ENOCH_MONTHS.find(
    (month) => month.number === monthNumber
  );

  if (!monthDefinition) {
    throw new Error(
      `Missing Enoch month definition: ${monthNumber}`
    );
  }

  /*
    Attach feast / Sabbath / appointed-day metadata.
  */

  const events = getEnochDayEvents({
    monthNumber: monthDefinition.number,
    day,
    isWeeklySabbath,
  });

  return {
    year: enochYear,
    dayOfYear,

    month: monthDefinition,

    day,
    quarter,

    isIntercalary: false,

    events,
  };
}

/*
  Maps each quarter's gate/intercalary day
  to the season it transitions toward.

  Current model:
  - Day 364 / Day 1 = Spring gate / new year transition
  - Day 91 = Summer gate
  - Day 182 = Fall gate
  - Day 273 = Winter gate
*/

function getSeasonForQuarter(
  quarter: number
): EnochSeason {
  switch (quarter) {
    case 1:
      return "summer";

    case 2:
      return "fall";

    case 3:
      return "winter";

    case 4:
      return "spring";

    default:
      throw new Error(
        `Invalid Enoch quarter: ${quarter}`
      );
  }
}

/*
  Small display helper for labels.
*/

function capitalize(value: string): string {
  return (
    value.charAt(0).toUpperCase() +
    value.slice(1)
  );
}

/*
  Parses YYYY-MM-DD without depending on UTC date parsing.

  This helps avoid timezone drift problems where a date
  can accidentally become the previous/next day.
*/

function parseDateOnly(value: string): Date {
  const [year, month, day] =
    value.split("-").map(Number);

  return new Date(year, month - 1, day);
}