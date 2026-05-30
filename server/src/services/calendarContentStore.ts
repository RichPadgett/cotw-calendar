/*
 * File: server/src/services/calendarContentStore.ts
 * Purpose: Server-side service module for reading, writing, indexing, or checksumming calendar content.
 * Author: rpadgett
 */

// Dependencies
import fs from "fs";
import path from "path";

import { CalendarDayContent } from "../types/calendarContent";
import { updateNoticeIndexForDay } from "./calendarNoticeIndex";

// Constants
const CONTENT_ROOT = path.join(process.cwd(), "content", "groups");

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
