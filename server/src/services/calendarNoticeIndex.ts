/*
 * File: server/src/services/calendarNoticeIndex.ts
 * Purpose: Server-side service module for reading, writing, indexing, or checksumming calendar content.
 * Author: rpadgett
 */

// Dependencies
import fs from "fs";
import path from "path";

import { CalendarDayContent } from "../types/calendarContent";

// Constants
const CONTENT_ROOT = path.join(process.cwd(), "content", "groups");

// Types
export type CalendarNoticeSummary = {
  year: number;
  month: number;
  day: number;

  notice: {
    year: number;
    month: number;
    day: number;
    title: string;
    access: string;
  } | null;

  hasContent: boolean;
};

// Helpers
/**
 * Builds the yearly notice-index file path for one group.
 * This filesystem helper stores lightweight badge data separately from full day content.
 */
function getNoticeIndexPath(groupCode: string, year: string) {
  return path.join(CONTENT_ROOT, groupCode, "notices", `${year}.json`);
}

// Public API
/**
 * Rebuilds the notice-index entries for one saved day.
 * This indexing service records notice badges and content-only badges used by calendar views.
 */
export function updateNoticeIndexForDay(
  groupCode: string,
  year: string,
  month: string,
  day: string,
  content: CalendarDayContent
) {
  const yearNumber = Number(year);
  const monthNumber = Number(month);
  const dayNumber = Number(day);

  const noticeItems =
    content.sections
      ?.filter((section) => section.displayStyle === "notice")
      .flatMap((section) => section.items ?? []) ?? [];

  const hasContent =
    Boolean(content.notes?.trim()) ||
    Boolean(content.scriptureReadings?.length) ||
    Boolean(
      content.sections?.some(
        (section) =>
          section.displayStyle !== "notice" && Boolean(section.items?.length)
      )
    );

  const notices: CalendarNoticeSummary[] =
    noticeItems.length > 0
      ? noticeItems.map((item) => ({
          year: yearNumber,
          month: monthNumber,
          day: dayNumber,
          notice: {
            year: yearNumber,
            month: monthNumber,
            day: dayNumber,
            title: item.label,
            access: item.access,
          },
          hasContent,
        }))
      : hasContent
        ? [
            {
              year: yearNumber,
              month: monthNumber,
              day: dayNumber,
              notice: null,
              hasContent: true,
            },
          ]
        : [];

  const indexPath = getNoticeIndexPath(groupCode, year);
  const indexFolder = path.dirname(indexPath);

  fs.mkdirSync(indexFolder, { recursive: true });

  let existing: CalendarNoticeSummary[] = [];

  if (fs.existsSync(indexPath)) {
    existing = JSON.parse(fs.readFileSync(indexPath, "utf-8"));
  }

  const withoutCurrentDay = existing.filter(
    (item) =>
      !(
        item.year === yearNumber &&
        item.month === monthNumber &&
        item.day === dayNumber
      )
  );

  const next = [...withoutCurrentDay, ...notices];

  fs.writeFileSync(indexPath, JSON.stringify(next, null, 2), "utf-8");
}

/**
 * Reads the yearly notice index for one group.
 * This service function returns an empty list when the group/year has no indexed notices yet.
 */
export function getNoticeIndex(
  groupCode: string,
  year: string
): CalendarNoticeSummary[] {
  const indexPath = getNoticeIndexPath(groupCode, year);

  if (!fs.existsSync(indexPath)) {
    return [];
  }

  return JSON.parse(fs.readFileSync(indexPath, "utf-8"));
}
