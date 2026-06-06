/*
 * File: src/engine/timelineValidation.ts
 * Purpose: Resolve and validate timeline dates against the Enoch calendar engine.
 */

import { EnochDateReference, HistoricalDate } from "../data/historyTimeline";
import { CalendarNode } from "../models/calendar";
import { buildEnochYear } from "./buildEnochYear";
import { getEnochYearStartDate } from "./enochYear";

const MIN_ENGINE_ENOCH_YEAR = 2026;
const MAX_ENGINE_SCAN_YEARS = 8;

export type TimelineValidationStatus =
  | "valid"
  | "mismatch"
  | "computed"
  | "insufficient-date"
  | "unsupported-era"
  | "out-of-engine-range";

export type TimelineDateValidation = {
  status: TimelineValidationStatus;
  message: string;
  computed?: {
    enochYear: number;
    month?: number;
    day?: number;
    dayOfYear?: number;
    label: string;
  };
};

function hasMonthAndDay(date: HistoricalDate) {
  return typeof date.month === "number" && typeof date.day === "number";
}

function toGregorianDateId(date: HistoricalDate) {
  if (!hasMonthAndDay(date)) return null;

  const month = String(date.month).padStart(2, "0");
  const day = String(date.day).padStart(2, "0");

  return `${String(date.year).padStart(4, "0")}-${month}-${day}`;
}

function getExpectedEnochYear(date: HistoricalDate) {
  if (date.era === "BC") return null;
  return date.year;
}

function findGregorianNode(date: HistoricalDate): CalendarNode | null {
  const gregorianDate = toGregorianDateId(date);
  const expectedEnochYear = getExpectedEnochYear(date);

  if (!gregorianDate || !expectedEnochYear) return null;
  if (expectedEnochYear < MIN_ENGINE_ENOCH_YEAR) return null;

  for (let offset = -1; offset < MAX_ENGINE_SCAN_YEARS - 1; offset++) {
    const enochYear = expectedEnochYear + offset;
    if (enochYear < MIN_ENGINE_ENOCH_YEAR) continue;

    const nodes = buildEnochYear({
      enochYear,
      startsOnGregorianDate: getEnochYearStartDate(enochYear),
    });

    const node = nodes.find((item) => item.gregorianDate === gregorianDate);
    if (node) return node;
  }

  return null;
}

function formatComputedLabel(node: CalendarNode) {
  const enoch = node.enoch;

  if (!enoch) return "Enoch date unavailable";
  if (enoch.month?.number && enoch.day) {
    return `Enoch Year ${enoch.year} Month ${enoch.month.number} Day ${enoch.day}`;
  }
  if (enoch.isIntercalary) {
    return `Enoch Year ${enoch.year} Gate ${enoch.quarter}`;
  }

  return `Enoch Year ${enoch.year} Day ${enoch.dayOfYear}`;
}

function referenceMatchesNode(
  reference: EnochDateReference,
  node: CalendarNode
) {
  const enoch = node.enoch;
  if (!enoch) return false;

  const checks = [
    reference.enochYear === undefined || reference.enochYear === enoch.year,
    reference.month === undefined || reference.month === enoch.month?.number,
    reference.day === undefined || reference.day === enoch.day,
    reference.dayOfYear === undefined ||
      reference.dayOfYear === enoch.dayOfYear,
  ];

  return checks.every(Boolean);
}

export function validateTimelineDate(
  date: HistoricalDate,
  reference?: EnochDateReference
): TimelineDateValidation {
  if (date.era === "BC") {
    return {
      status: "unsupported-era",
      message: "BC dates need a long-range Enoch epoch before validation.",
    };
  }

  if (!hasMonthAndDay(date)) {
    return {
      status: "insufficient-date",
      message: "Add Gregorian month and day to validate against the engine.",
    };
  }

  if (date.year < MIN_ENGINE_ENOCH_YEAR) {
    return {
      status: "out-of-engine-range",
      message: "This AD date is before the current engine baseline.",
    };
  }

  const node = findGregorianNode(date);

  if (!node?.enoch) {
    return {
      status: "out-of-engine-range",
      message: "No Enoch calendar node was found for this Gregorian date.",
    };
  }

  const computed = {
    enochYear: node.enoch.year,
    month: node.enoch.month?.number,
    day: node.enoch.day,
    dayOfYear: node.enoch.dayOfYear,
    label: formatComputedLabel(node),
  };

  if (!reference) {
    return {
      status: "computed",
      message: "Computed from the Enoch engine.",
      computed,
    };
  }

  if (referenceMatchesNode(reference, node)) {
    return {
      status: "valid",
      message: "Manual Enoch date matches the engine.",
      computed,
    };
  }

  return {
    status: "mismatch",
    message: "Manual Enoch date does not match the engine.",
    computed,
  };
}
