/*
 * File: src/models/calendar.ts
 * Purpose: Shared TypeScript model definitions for calendar nodes and calendar metadata.
 * Author: rpadgett
 */

// Dependencies
import { ImageSourcePropType } from "react-native";

// Types
export type EnochSeason = "spring" | "summer" | "fall" | "winter";

export type EnochMonth = {
  number: number;
  name: string;
  alternateName?: string;
  hebrew?: string;
  paleoHebrew?: string;
  symbolImage?: ImageSourcePropType;
  season: EnochSeason;
  themeColor?: string;
};

export type DayNote = {
  id: string;
  title: string;
  body?: string;
  verses?: string[];
  links?: {
    label: string;
    url: string;
  }[];
};

export type EnochDayEvent = {
  id: string;
  englishName: string;
  hebrewName?: string;
  shortName?: string;
  type:
    | "weekly-sabbath"
    | "high-sabbath"
    | "feast"
    | "fast"
    | "preparation"
    | "counting-day";
  icon?: string;
  color?: string;
  isHighSabbath?: boolean;
};

export type CalendarNodeType =
  | "month-day"
  | "intercalary"
  | "sabbath-week";

export type CalendarNode = {
  id: string;
  type: CalendarNodeType;
  gregorianDate: string;

  gregorian: {
    year: number;
    month: number;
    day: number;
    dayOfWeek: number;
  };

  enoch?: {
    year: number;
    dayOfYear: number;
    month?: EnochMonth;
    day?: number;
    quarter: number;
    isIntercalary: boolean;
    season?: EnochSeason;
    events?: EnochDayEvent[];
    notes?: DayNote[];

    isSabbathWeek?: boolean;
    label?: string;
    dateRange?: {
      start: string;
      end: string;
    };
  };
};