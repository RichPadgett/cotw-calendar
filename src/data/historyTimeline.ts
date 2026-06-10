/*
 * File: src/data/historyTimeline.ts
 * Purpose: Editable occurrence data for the swipeable biblical history timeline.
 *
 * TimelineOccurrence is intentionally separate from perpetual markers for now.
 * A single occurrence may render as a range bar, an exact-date marker, or both.
 */

export type GregorianEra = "BC" | "AD";
export type TimelineDatePrecision = "exact" | "approximate" | "traditional";

export type HistoricalDate = {
  year: number;
  era: GregorianEra;
  month?: number;
  day?: number;
};

export type EnochDateReference = {
  label?: string;
  enochYear?: number;
  month?: number;
  day?: number;
  dayOfYear?: number;
};

export type TimelineExactDate = {
  label?: string;
  enochDate: EnochDateReference & {
    enochYear: number;
    month: number;
    day: number;
  };
  gregorianDate?: HistoricalDate;
  precision: TimelineDatePrecision;
};

export type TimelineRangeStartDate = {
  enochYear: number;
  enochMonth: number;
  enochDay: number;
};

export type TimelineTimeRange = {
  label?: string;
  start: TimelineRangeStartDate;
  gregorianDate?: HistoricalDate;
  durationDays: number;
  inclusive?: boolean;
  precision: TimelineDatePrecision;
};

export type TimelineColorFeature = {
  label?: string;
  primary: string;
  secondary?: string;
  text?: string;
};

export type TimelineLanePart = "top" | "bottom" | "both";

export type TimelineOccurrence = {
  id: string;
  title: string;
  summary?: string;
  notes?: string;
  category?: string;
  lane: number;
  lanePart?: TimelineLanePart;
  color: string;
  colorFeature?: TimelineColorFeature;
  showOnTimeline: boolean;
  showOnCalendar: boolean;
  timeRange?: TimelineTimeRange;
  exactDate?: TimelineExactDate;
};

export const HISTORY_TIMELINE_RANGE = {
  startYear: 1,
  endYear: 8000,
  label: "Enoch Years 1 - 8000",
};

export const HISTORY_TIMELINE_AXIS_YEARS = [
  1, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000,
];

export const HISTORY_TIMELINE_OCCURRENCES: TimelineOccurrence[] = [];
