/*
 * File: server/src/services/calendarContentStore.ts
 * Purpose: Server-side service module for reading, writing, indexing, or checksumming calendar content.
 * Author: rpadgett
 */

// Dependencies
import fs from "fs";
import path from "path";

import {
  CalendarContentItem,
  CalendarDayContent,
} from "../types/calendarContent";
import { updateNoticeIndexForDay } from "./calendarNoticeIndex";

// Constants
const CONTENT_ROOT = path.join(process.cwd(), "content", "groups");
const BASE_ENOCH_YEAR = 2026;
const BASE_START_DATE = "2026-03-18";
const BASE_SABBATH_WEEK_START_YEAR = 2025;
const SABBATH_WEEK_CYCLE_YEARS = 7;

export type LatestShabbatTeaching = {
  enochYear: number;
  month: number;
  day: number;
  gregorianDate: string;
  title: string;
  url: string;
  provider: "spotify";
};

// Helpers
/**
 * Builds the folder path for a group's saved day-content files in a given year and month.
 * This filesystem helper centralizes the content storage layout.
 */
function getDayFolder(groupCode: string, year: string, month: string) {
  return path.join(CONTENT_ROOT, groupCode, "days", year, month);
}

/**
 * Builds the JSON file path for one saved Enoch day.
 * This filesystem helper is used by both read and write operations.
 */
function getDayFilePath(
  groupCode: string,
  year: string,
  month: string,
  day: string
) {
  return path.join(getDayFolder(groupCode, year, month), `${day}.json`);
}

/**
 * Builds the history folder path for previous versions of one day-content file.
 * This filesystem helper supports simple backup snapshots before overwrites.
 */
function getHistoryFolder(
  groupCode: string,
  year: string,
  month: string,
  day: string
) {
  return path.join(CONTENT_ROOT, groupCode, "history", year, month, day);
}

function positiveModulo(value: number, divisor: number): number {
  return ((value % divisor) + divisor) % divisor;
}

function hasSabbathWeekBeforeEnochYear(targetYear: number): boolean {
  return (
    positiveModulo(
      targetYear - BASE_SABBATH_WEEK_START_YEAR,
      SABBATH_WEEK_CYCLE_YEARS
    ) === 0
  );
}

function getEnochYearLength(year: number): number {
  return hasSabbathWeekBeforeEnochYear(year + 1) ? 371 : 364;
}

function addDays(dateString: string, days: number): string {
  const [year, month, day] = dateString.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));

  date.setUTCDate(date.getUTCDate() + days);

  const nextYear = date.getUTCFullYear();
  const nextMonth = String(date.getUTCMonth() + 1).padStart(2, "0");
  const nextDay = String(date.getUTCDate()).padStart(2, "0");

  return `${nextYear}-${nextMonth}-${nextDay}`;
}

function getEnochYearStartDate(targetYear: number): string {
  let currentStartDate = BASE_START_DATE;

  for (let year = BASE_ENOCH_YEAR; year < targetYear; year++) {
    currentStartDate = addDays(currentStartDate, getEnochYearLength(year));
  }

  for (let year = BASE_ENOCH_YEAR - 1; year >= targetYear; year--) {
    currentStartDate = addDays(currentStartDate, -getEnochYearLength(year));
  }

  return currentStartDate;
}

function getEnochDayOfYear(month: number, day: number): number {
  const quarter = Math.floor((month - 1) / 3);
  const monthInQuarter = (month - 1) % 3;

  return quarter * 91 + monthInQuarter * 30 + day;
}

function getGregorianDateForEnochDate(
  enochYear: number,
  month: number,
  day: number
): string {
  const startDate = getEnochYearStartDate(enochYear);
  const dayOfYear = getEnochDayOfYear(month, day);

  return addDays(startDate, dayOfYear - 1);
}

function formatDateOnly(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function isSaturday(dateString: string): boolean {
  const [year, month, day] = dateString.split("-").map(Number);

  return new Date(Date.UTC(year, month - 1, day)).getUTCDay() === 6;
}

function isSpotifyItem(item: CalendarContentItem): boolean {
  return Boolean(item.url?.includes("open.spotify.com/episode"));
}

function getFirstSpotifyItem(
  content: CalendarDayContent
): CalendarContentItem | null {
  for (const section of content.sections ?? []) {
    const item = section.items.find(isSpotifyItem);

    if (item) {
      return item;
    }
  }

  return null;
}

function readDayContentFile(filePath: string): CalendarDayContent | null {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf-8"));
  } catch (error) {
    console.log("Failed to read calendar day content file", filePath, error);

    return null;
  }
}

function walkJsonFiles(folderPath: string): string[] {
  if (!fs.existsSync(folderPath)) {
    return [];
  }

  return fs
    .readdirSync(folderPath, { withFileTypes: true })
    .flatMap((entry) => {
      const entryPath = path.join(folderPath, entry.name);

      if (entry.isDirectory()) {
        return walkJsonFiles(entryPath);
      }

      return entry.isFile() && entry.name.endsWith(".json") ? [entryPath] : [];
    });
}

// Public API
/**
 * Reads saved calendar content for one group/year/month/day.
 * This service function returns null when no day-content JSON file exists yet.
 */
export function getCalendarDayContent(
  groupCode: string,
  year: string,
  month: string,
  day: string
): CalendarDayContent | null {
  const filePath = getDayFilePath(groupCode, year, month, day);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

/**
 * Saves calendar content for one group/year/month/day and updates the notice index.
 * This service function also copies the previous file into history before overwriting it.
 */
export function saveCalendarDayContent(
  groupCode: string,
  year: string,
  month: string,
  day: string,
  content: CalendarDayContent
): CalendarDayContent {
  const dayFolder = getDayFolder(groupCode, year, month);
  const filePath = getDayFilePath(groupCode, year, month, day);

  fs.mkdirSync(dayFolder, { recursive: true });

  if (fs.existsSync(filePath)) {
    const historyFolder = getHistoryFolder(groupCode, year, month, day);

    fs.mkdirSync(historyFolder, { recursive: true });

    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");

    fs.copyFileSync(filePath, path.join(historyFolder, `${timestamp}.json`));
  }

  fs.writeFileSync(filePath, JSON.stringify(content, null, 2), "utf-8");

  try {
    updateNoticeIndexForDay(groupCode, year, month, day, content);
  } catch (error) {
    console.log("Failed to update notice index", error);
  }

  return content;
}

/**
 * Finds the latest posted Shabbat teaching with a Spotify episode URL.
 * This keeps the calendar header driven by saved day content instead of a hard-coded embed.
 */
export function getLatestShabbatTeaching(
  groupCode: string,
  today = new Date()
): LatestShabbatTeaching | null {
  const daysFolder = path.join(CONTENT_ROOT, groupCode, "days");
  const todayDate = formatDateOnly(today);

  return (
    walkJsonFiles(daysFolder)
      .map((filePath) => {
        const content = readDayContentFile(filePath);

        if (!content) {
          return null;
        }

        const spotifyItem = getFirstSpotifyItem(content);

        if (!spotifyItem?.url) {
          return null;
        }

        const gregorianDate =
          content.gregorianDate ??
          getGregorianDateForEnochDate(
            content.enochYear,
            content.month,
            content.day
          );

        if (gregorianDate > todayDate || !isSaturday(gregorianDate)) {
          return null;
        }

        return {
          enochYear: content.enochYear,
          month: content.month,
          day: content.day,
          gregorianDate,
          title: spotifyItem.label || content.title,
          url: spotifyItem.url,
          provider: "spotify" as const,
        };
      })
      .filter((item): item is LatestShabbatTeaching => Boolean(item))
      .sort((left, right) =>
        right.gregorianDate.localeCompare(left.gregorianDate)
      )[0] ?? null
  );
}
