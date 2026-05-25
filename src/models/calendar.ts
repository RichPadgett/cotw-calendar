// src/models/calendar.ts
import { ImageSourcePropType } from "react-native";

export type EnochSeason =
  | "spring"
  | "summer"
  | "fall"
  | "winter";

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
  | "intercalary";

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

  export type EnochDay = {
    ...
    notes?: DayNote[];
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

    label?: string;

  };
};
