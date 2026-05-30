/*
 * File: server/src/types/calendarContent.ts
 * Purpose: Shared app-side TypeScript type definitions.
 * Author: rpadgett
 */

export type CalendarContentItem = {
  label: string;
  type:
    | "external-link"
    | "internal-link"
    | "pdf"
    | "video-link"
    | "scripture"
    | "note";

  url?: string;
  access: "public" | "members" | "code-required";
};

export type CalendarContentSection = {
  title: string;
  /*
    Optional visual style for special community notes,
    hosting info, temporary reminders, announcements, etc.
  */
  displayStyle?: "default" | "notice";
  items: CalendarContentItem[];
};

export type ScriptureReference = {
  label: string;

  /*
    Example:
    "Matthew 1"
    "Genesis 1-3"
  */
  reference: string;

  /*
    External scripture source
    if desired
  */
  url?: string;
};

export type CalendarDayContent = {
  enochYear: number;

  month: number;
  day: number;

  gregorianDate?: string;

  title: string;

  /*
    Structured scripture readings
  */
  scriptureReadings?: ScriptureReference[];

  /*
    General content sections
  */
  sections: CalendarContentSection[];

  notes?: string;
};

export type CalendarAccess =
  | "public"
  | "members"
  | "code-required";
