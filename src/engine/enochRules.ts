// src/engine/enochRules.ts

import { ENOCH_MONTHS } from "./enochMonths";
import { CalendarNode, EnochSeason } from "../models/calendar";
import { getEnochDayEvents } from "./enochFeasts";

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
      enoch: getEnochDay(config.enochYear, dayOfYear),
    };
  });
}

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

function getEnochDay(enochYear: number, dayOfYear: number) {
  if (dayOfYear < 1 || dayOfYear > 364) {
    throw new Error(`Invalid Enoch dayOfYear: ${dayOfYear}`);
  }

  const quarter = Math.ceil(dayOfYear / 91);
  const quarterDay = ((dayOfYear - 1) % 91) + 1;
  const isIntercalary = quarterDay === 91;

  if (isIntercalary) {
    const season = getSeasonForQuarter(quarter);

    return {
      year: enochYear,
      dayOfYear,
      quarter,
      isIntercalary: true,
      season,
      label: `${capitalize(season)} Intercalary Day`,
    };
  }

 

  const monthInQuarter = Math.ceil(quarterDay / 30);
  const monthNumber = (quarter - 1) * 3 + monthInQuarter;
  const day = ((quarterDay - 1) % 30) + 1;

  const monthDefinition = ENOCH_MONTHS.find(
    (m) => m.number === monthNumber
  );

  if (!monthDefinition) {
    throw new Error(`Missing Enoch month definition: ${monthNumber}`);
  }

    const events = getEnochDayEvents({
    monthNumber: monthDefinition.number,
    day,
    isWeeklySabbath: false, // we’ll wire this next
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

function getSeasonForQuarter(quarter: number): EnochSeason {
  switch (quarter) {
    case 1:
      return "spring";
    case 2:
      return "summer";
    case 3:
      return "fall";
    case 4:
      return "winter";
    default:
      throw new Error(`Invalid Enoch quarter: ${quarter}`);
  }
}

function capitalize(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function parseDateOnly(value: string): Date {
  const [year, month, day] = value.split("-").map(Number);

  return new Date(year, month - 1, day);
}