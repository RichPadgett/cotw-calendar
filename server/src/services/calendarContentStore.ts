// server/src/services/calendarContentStore.ts

import fs from "fs";
import path from "path";

import { CalendarDayContent } from "../types/calendarContent";

const CONTENT_ROOT = path.join(
  process.cwd(),
  "content",
  "groups"
);

function getDayFolder(groupCode: string, year: string, month: string) {
  return path.join(CONTENT_ROOT, groupCode, "days", year, month);
}

function getDayFilePath(groupCode: string, year: string, month: string, day: string) {
  return path.join(getDayFolder(groupCode, year, month), `${day}.json`);
}

function getHistoryFolder(groupCode: string, year: string, month: string, day: string) {
  return path.join(CONTENT_ROOT, groupCode, "history", year, month, day);
}

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

    const timestamp = new Date()
      .toISOString()
      .replace(/[:.]/g, "-");

    fs.copyFileSync(
      filePath,
      path.join(historyFolder, `${timestamp}.json`)
    );
  }

  fs.writeFileSync(
    filePath,
    JSON.stringify(content, null, 2),
    "utf-8"
  );

  return content;
}