// src/engine/buildMonth.ts

import { CalendarNode } from "../models/calendar";

export function buildMonth(year: number, month: number): CalendarNode[] {
  const daysInMonth = new Date(year, month, 0).getDate();

  const nodes: CalendarNode[] = [];

  for (let day = 1; day <= daysInMonth; day++) {
    const gregorianDate = `${year}-${String(month).padStart(2, "0")}-${String(
      day
    ).padStart(2, "0")}`;

    nodes.push({
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

  return nodes;
}
