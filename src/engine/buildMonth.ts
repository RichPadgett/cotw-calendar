/*
 * File: src/engine/buildMonth.ts
 * Purpose: Calendar calculation engine module for building Enoch calendar dates, months, years, and feast metadata.
 * Author: rpadgett
 */

import { CalendarNode } from "../models/calendar";

/**
 * Builds placeholder calendar nodes for one Gregorian month.
 * This engine helper supports legacy month-view experiments and tests.
 */
export function buildMonth(year: number, month: number): CalendarNode[] {
  const daysInMonth = new Date(year, month, 0).getDate();

  const nodes: CalendarNode[] = [];

  for (let day = 1; day <= daysInMonth; day++) {
    const gregorianDate = `${year}-${String(month).padStart(2, "0")}-${String(
      day
    ).padStart(2, "0")}`;

    const date = new Date(year, month - 1, day);

    nodes.push({
      id: gregorianDate,
      type: "month-day",
      gregorianDate,
      gregorian: {
        year,
        month,
        day,
        dayOfWeek: date.getDay(),
      },
    });
  }

  return nodes;
}
