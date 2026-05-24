// src/engine/buildEnochYear.ts

import { CalendarNode } from "../models/calendar";
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
  const startDate = new Date(
    `${config.startsOnGregorianDate}T00:00:00`
  );

  const gregorianNodes: CalendarNode[] = [];

  for (let index = 0; index < 364; index++) {
    const currentDate = new Date(startDate);

    currentDate.setDate(startDate.getDate() + index);

    const gregorianDate = formatDateOnly(currentDate);

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();

    gregorianNodes.push({
      id: gregorianDate,
      type: "month-day",
      gregorianDate,
      gregorian: {
        year,
        month,
        day,
      },
    });
  }

  return applyEnochOverlay(gregorianNodes, config);
}
