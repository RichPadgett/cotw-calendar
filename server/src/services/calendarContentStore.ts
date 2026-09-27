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
const CHURCH_GROUP_CODE = "church-of-the-word";
const PUBLIC_GROUP_CODE = "public";
const REPLICATED_GROUP_CODES = [CHURCH_GROUP_CODE, PUBLIC_GROUP_CODE];
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
  teachings: LatestShabbatTeachingItem[];
};

export type LatestShabbatTeachingItem = {
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

export function getEnochDateForGregorianDate(gregorianDate: string): {
  enochYear: number;
  month: number;
  day: number;
} | null {
  const gregorianYear = Number(gregorianDate.slice(0, 4));

  for (
    let enochYear = gregorianYear - 1;
    enochYear <= gregorianYear + 1;
    enochYear++
  ) {
    const startDate = getEnochYearStartDate(enochYear);
    const nextStartDate = getEnochYearStartDate(enochYear + 1);
    if (gregorianDate < startDate || gregorianDate >= nextStartDate) continue;

    const start = new Date(`${startDate}T00:00:00Z`);
    const target = new Date(`${gregorianDate}T00:00:00Z`);
    const dayOfYear =
      Math.floor((target.getTime() - start.getTime()) / 86_400_000) + 1;
    if (dayOfYear < 1 || dayOfYear > 364) return null;

    const quarterDay = ((dayOfYear - 1) % 91) + 1;
    if (quarterDay === 91) return null;

    const quarter = Math.floor((dayOfYear - 1) / 91);
    const monthInQuarter = Math.floor((quarterDay - 1) / 30);
    return {
      enochYear,
      month: quarter * 3 + monthInQuarter + 1,
      day: ((quarterDay - 1) % 30) + 1,
    };
  }

  return null;
}

export function publishLibraryTeachingToCalendar(input: {
  recordingId: string;
  title: string;
  description?: string;
  recordedAt: string;
}): CalendarDayContent | null {
  const gregorianDate = formatDateInCentralTime(input.recordedAt);
  if (!gregorianDate) return null;

  const enochDate = getEnochDateForGregorianDate(gregorianDate);
  if (!enochDate) return null;

  const year = String(enochDate.enochYear);
  const month = String(enochDate.month);
  const day = String(enochDate.day);
  const existing = getCalendarDayContent(
    CHURCH_GROUP_CODE,
    year,
    month,
    day
  ) ?? {
    ...enochDate,
    gregorianDate,
    title: `Enoch Month ${enochDate.month}, Day ${enochDate.day}`,
    scriptureReadings: [],
    sections: [],
  };
  const sectionTitle = "Library Teachings";
  const existingSection = existing.sections.find(
    (section) =>
      section.title === sectionTitle && section.displayStyle !== "notice"
  );
  const teachingItem: CalendarContentItem = {
    sourceId: input.recordingId,
    label: input.title,
    type: "internal-link",
    url: `/library?teaching=${encodeURIComponent(input.recordingId)}`,
    details: input.description,
    access: "members",
    uploadedAt: input.recordedAt,
  };
  const nextItems = [...(existingSection?.items ?? [])];
  const itemIndex = nextItems.findIndex(
    (item) =>
      item.sourceId === input.recordingId || item.url === teachingItem.url
  );
  if (itemIndex >= 0) nextItems[itemIndex] = teachingItem;
  else nextItems.push(teachingItem);

  const nextSections = existing.sections.filter(
    (section) => section !== existingSection
  );
  nextSections.push({ title: sectionTitle, items: nextItems });

  return saveCalendarDayContent(CHURCH_GROUP_CODE, year, month, day, {
    ...existing,
    ...enochDate,
    gregorianDate,
    sections: nextSections,
  });
}

export function publishSpotifyEpisodeToCalendar(
  input: {
    episodeId: string;
    title: string;
    url: string;
    releaseDate: string;
  },
  options: { dryRun?: boolean } = {}
): { changed: boolean; enochDate: string; groups: string[] } | null {
  const enochDate = getEnochDateForGregorianDate(input.releaseDate);
  if (!enochDate) return null;

  const year = String(enochDate.enochYear);
  const month = String(enochDate.month);
  const day = String(enochDate.day);
  const changedGroups: string[] = [];

  for (const groupCode of [CHURCH_GROUP_CODE, PUBLIC_GROUP_CODE]) {
    const existing = getCalendarDayContent(groupCode, year, month, day) ?? {
      ...enochDate,
      gregorianDate: input.releaseDate,
      title: `Enoch Month ${enochDate.month}, Day ${enochDate.day}`,
      scriptureReadings: [],
      sections: [],
    };
    const sourceId = `spotify:${input.episodeId}`;
    const episodeUrl = `https://open.spotify.com/episode/${input.episodeId}`;
    const item: CalendarContentItem = {
      sourceId,
      label: input.title,
      type: "external-link",
      url: input.url || episodeUrl,
      access: "public",
    };
    let found = false;
    const sections = existing.sections.map((section) => ({
      ...section,
      items: section.items.map((existingItem) => {
        const matches =
          existingItem.sourceId === sourceId ||
          existingItem.url?.startsWith(episodeUrl);
        if (!matches) return existingItem;
        found = true;
        return item;
      }),
    }));

    if (!found) {
      const linksSectionIndex = sections.findIndex(
        (section) =>
          section.displayStyle !== "notice" &&
          (section.title === "Teaching Links" ||
            section.title === "Files / Links / Media")
      );

      if (linksSectionIndex >= 0) {
        sections[linksSectionIndex] = {
          ...sections[linksSectionIndex],
          items: [...sections[linksSectionIndex].items, item],
        };
      } else {
        sections.push({ title: "Teaching Links", items: [item] });
      }
    }

    const nextContent: CalendarDayContent = {
      ...existing,
      ...enochDate,
      gregorianDate: input.releaseDate,
      sections,
    };

    if (JSON.stringify(existing) === JSON.stringify(nextContent)) continue;
    changedGroups.push(groupCode);
    if (!options.dryRun) {
      saveCalendarDayContent(groupCode, year, month, day, nextContent);
    }
  }

  return {
    changed: changedGroups.length > 0,
    enochDate: `${enochDate.enochYear}/${enochDate.month}/${enochDate.day}`,
    groups: changedGroups,
  };
}

function formatDateInCentralTime(value: string): string | null {
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return value;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Chicago",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);
  const values = Object.fromEntries(
    parts.map((part) => [part.type, part.value])
  );
  return `${values.year}-${values.month}-${values.day}`;
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

function getSpotifyItems(content: CalendarDayContent): CalendarContentItem[] {
  return (content.sections ?? []).flatMap((section) =>
    section.items.filter(isSpotifyItem)
  );
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

function getReplicatedTargetGroupCode(sourceGroupCode: string): string | null {
  if (!REPLICATED_GROUP_CODES.includes(sourceGroupCode)) {
    return null;
  }

  if (sourceGroupCode === CHURCH_GROUP_CODE) {
    return PUBLIC_GROUP_CODE;
  }

  if (sourceGroupCode === PUBLIC_GROUP_CODE) {
    return CHURCH_GROUP_CODE;
  }

  return null;
}

/**
 * Mirrors shared content between the public and church groups while keeping notices group-specific.
 * Notes, scripture readings, title, date metadata, and regular media/link sections are replicated.
 */
export function syncReplicatedCalendarContent(
  sourceGroupCode: string,
  year: string,
  month: string,
  day: string,
  sourceContent: CalendarDayContent
): CalendarDayContent {
  const targetGroupCode = getReplicatedTargetGroupCode(sourceGroupCode);

  if (!targetGroupCode) {
    return sourceContent;
  }

  const targetContent = getCalendarDayContent(
    targetGroupCode,
    year,
    month,
    day
  ) ?? {
    enochYear: Number(year),
    month: Number(month),
    day: Number(day),
    title: sourceContent.title,
    sections: [],
  };
  const targetNoticeSections = (targetContent.sections ?? []).filter(
    (section) => section.displayStyle === "notice"
  );
  const sourceSharedSections = (sourceContent.sections ?? []).filter(
    (section) => section.displayStyle !== "notice"
  );

  return saveCalendarDayContent(targetGroupCode, year, month, day, {
    ...targetContent,
    enochYear: sourceContent.enochYear,
    month: sourceContent.month,
    day: sourceContent.day,
    gregorianDate: sourceContent.gregorianDate,
    title: sourceContent.title,
    notes: sourceContent.notes,
    scriptureReadings: sourceContent.scriptureReadings ?? [],
    sections: [...targetNoticeSections, ...sourceSharedSections],
  });
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

        const spotifyItems = getSpotifyItems(content);

        if (spotifyItems.length === 0) {
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

        const teachings = spotifyItems
          .filter((item) => Boolean(item.url))
          .map((item, index) => ({
            title: item.label || `${content.title} Part ${index + 1}`,
            url: item.url as string,
            provider: "spotify" as const,
          }));
        const firstTeaching = teachings[0];

        if (!firstTeaching) {
          return null;
        }

        return {
          enochYear: content.enochYear,
          month: content.month,
          day: content.day,
          gregorianDate,
          title: firstTeaching.title || content.title,
          url: firstTeaching.url,
          provider: "spotify" as const,
          teachings,
        };
      })
      .filter((item): item is LatestShabbatTeaching => Boolean(item))
      .sort((left, right) =>
        right.gregorianDate.localeCompare(left.gregorianDate)
      )[0] ?? null
  );
}
