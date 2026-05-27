// src/engine/buildEnochYear.ts

import { CalendarNode } from "../models/calendar";
import { computeEnochFeasts } from "./enochComputedFeasts";
import { applyEnochOverlay, EnochYearConfig } from "./enochRules";

function formatDateOnly(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function buildEnochYear(
  config: EnochYearConfig
): CalendarNode[] {
const [year, month, day] =
  config.startsOnGregorianDate
    .split("-")
    .map(Number);

const startDate = new Date(
  year,
  month - 1,
  day
);



/*
  ============================================================
  BUILD 364 GREGORIAN NODES
  ============================================================

  IMPORTANT:
  We normalize dates to noon to avoid:

    - timezone rollback
    - DST boundary shifts
    - off-by-one date bugs

  Using midnight with JS Date arithmetic
  can cause March 18 to become March 17
  in some timezones.
*/

  const gregorianNodes: CalendarNode[] = [];

for (let index = 0; index < 364; index++) {
  /*
    Clone start date safely
  */
  const currentDate = new Date(startDate);

  /*
    Normalize to noon
    before date math
  */
  currentDate.setHours(12, 0, 0, 0);

  /*
    Advance by N days
  */
  currentDate.setDate(
    currentDate.getDate() + index
  );

  /*
    Stable YYYY-MM-DD string
  */
  const gregorianDate =
    formatDateOnly(currentDate);

  /*
    Gregorian metadata
  */
  const year =
    currentDate.getFullYear();

  const month =
    currentDate.getMonth() + 1;

  const day =
    currentDate.getDate();

  /*
    Create calendar node
  */
  gregorianNodes.push({
    id: gregorianDate,

    type: "month-day",

    gregorianDate,

    gregorian: {
      year,
      month,
      day,

      /*
        JS weekday:
          0 = Sunday
          6 = Saturday
      */
      dayOfWeek:
        currentDate.getDay(),
    },
  });
}

  const firstPassNodes = applyEnochOverlay(gregorianNodes, config);

  const computedFeasts = computeEnochFeasts(firstPassNodes);

  return applyEnochOverlay(
    gregorianNodes,
    config,
    computedFeasts
  );
}
