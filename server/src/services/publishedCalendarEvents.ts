/*
 * File: server/src/services/publishedCalendarEvents.ts
 * Purpose: Builds public ICS events from calendar day content explicitly marked for publication.
 */

import { createHash } from "crypto";
import fs from "fs";
import path from "path";

import { CalendarDayContent } from "../types/calendarContent";
import {
  CalendarFeedEvent,
  getEnochYearStartDate,
} from "./appointedTimesCalendar";
import { getPerpetualMarkers } from "./perpetualMarkers";

const GROUPS_ROOT = path.join(process.cwd(), "content", "groups");

export function getPublishedCalendarEvents(
  startYear: number,
  yearCount: number,
  groupCode = "public"
): CalendarFeedEvent[] {
  const events: CalendarFeedEvent[] = [];

  for (
    let enochYear = startYear;
    enochYear < startYear + yearCount;
    enochYear++
  ) {
    const yearFolder = path.join(
      GROUPS_ROOT,
      groupCode,
      "days",
      String(enochYear)
    );

    for (const filePath of walkJsonFiles(yearFolder)) {
      const content = readContent(filePath);
      if (!content) continue;
      events.push(...getPublishedEventsForContent(content, groupCode));
    }
  }

  return events.sort((left, right) =>
    `${left.startDate}-${left.summary}`.localeCompare(
      `${right.startDate}-${right.summary}`
    )
  );
}

export function getPublishedPerpetualMarkerEvents(
  startYear: number,
  yearCount: number
): CalendarFeedEvent[] {
  const markers = getPerpetualMarkers().filter(
    (marker) => marker.includeInCalendarFeed === true
  );
  const events: CalendarFeedEvent[] = [];

  for (
    let enochYear = startYear;
    enochYear < startYear + yearCount;
    enochYear++
  ) {
    const yearStart = getEnochYearStartDate(enochYear);
    const nextYearStart = getEnochYearStartDate(enochYear + 1);

    for (const marker of markers) {
      const dayOfYear = getMarkerDayOfYear(marker);
      if (!dayOfYear) continue;

      const startDate = addDays(yearStart, dayOfYear - 1);
      if (startDate >= nextYearStart) continue;

      const description = [
        marker.description?.trim(),
        marker.notes?.trim(),
        marker.sourceLabel?.trim()
          ? `Source: ${marker.sourceLabel.trim()}`
          : undefined,
        marker.sourceUrl?.trim(),
        marker.intercalaryWeek
          ? `Enoch Year ${enochYear}, Intercalary Week`
          : marker.gateDay
            ? `Enoch Year ${enochYear}, Gate Day ${marker.gateDay}`
            : `Enoch Year ${enochYear}, Month ${marker.month}, Day ${marker.day}`,
      ]
        .filter(Boolean)
        .join("\n\n");

      events.push({
        uid: `perpetual-${marker.id}-${enochYear}@enochscalendar.com`,
        startDate,
        endDate: marker.intercalaryWeek ? nextYearStart : undefined,
        summary: marker.title,
        description,
        url: isWebUrl(marker.sourceUrl) ? marker.sourceUrl : undefined,
      });
    }
  }

  return events.sort((left, right) =>
    `${left.startDate}-${left.summary}`.localeCompare(
      `${right.startDate}-${right.summary}`
    )
  );
}

function getMarkerDayOfYear(marker: {
  month?: number;
  day?: number;
  gateDay?: number;
  intercalaryWeek?: boolean;
}) {
  if (marker.intercalaryWeek) return 365;
  if (marker.gateDay && marker.gateDay >= 1 && marker.gateDay <= 4) {
    return marker.gateDay * 91;
  }
  if (marker.month && marker.day) {
    return getDayOfYear(marker.month, marker.day);
  }
  return null;
}

export function getPublishedEventsForContent(
  content: CalendarDayContent,
  groupCode = "public"
): CalendarFeedEvent[] {
  const visibleItems = (content.sections ?? [])
    .flatMap((section) => section.items ?? [])
    .filter(
      (item) =>
        item.access === "public" ||
        (groupCode !== "public" && item.access === "members")
    );
  const date =
    content.gregorianDate ??
    addDays(
      getEnochYearStartDate(content.enochYear),
      getDayOfYear(content.month, content.day) - 1
    );

  if (content.includeInCalendarFeed) {
    return [
      {
        uid: getUid(content, "day"),
        startDate: date,
        summary:
          content.title || `Enoch Month ${content.month}, Day ${content.day}`,
        description: buildDescription(content, visibleItems),
        url: visibleItems.find((item) => isWebUrl(item.url))?.url,
        startTime: content.calendarStartTime,
        endTime: content.calendarEndTime,
        location: content.calendarLocation,
      },
    ];
  }

  return visibleItems.flatMap((item, index) => {
    if (!item.includeInCalendarFeed || !item.label.trim()) return [];

    return [
      {
        uid: getUid(content, `${index}-${item.label}-${item.url ?? ""}`),
        startDate: date,
        summary: item.label,
        description: buildDescription(content, [item]),
        url: isWebUrl(item.url) ? item.url : undefined,
        startTime: item.calendarStartTime,
        endTime: item.calendarEndTime,
        location: item.calendarLocation,
      },
    ];
  });
}

function buildDescription(
  content: CalendarDayContent,
  items: CalendarDayContent["sections"][number]["items"]
): string {
  const lines = [content.notes?.trim()];

  if (content.scriptureReadings?.length) {
    lines.push(
      `Scripture: ${content.scriptureReadings
        .map((reading) => reading.reference || reading.label)
        .filter(Boolean)
        .join(", ")}`
    );
  }

  for (const item of items) {
    const details = item.details?.trim();
    if (details) lines.push(details);
    if (isWebUrl(item.url)) lines.push(item.url);
  }

  lines.push(
    `Enoch Year ${content.enochYear}, Month ${content.month}, Day ${content.day}`
  );

  return lines.filter(Boolean).join("\n\n");
}

function getUid(content: CalendarDayContent, discriminator: string): string {
  const hash = createHash("sha256")
    .update(
      `${content.enochYear}-${content.month}-${content.day}-${discriminator}`
    )
    .digest("hex")
    .slice(0, 20);

  return `calendar-content-${hash}@enochscalendar.com`;
}

function walkJsonFiles(folderPath: string): string[] {
  if (!fs.existsSync(folderPath)) return [];

  return fs
    .readdirSync(folderPath, { withFileTypes: true })
    .flatMap((entry) => {
      const entryPath = path.join(folderPath, entry.name);
      if (entry.isDirectory()) return walkJsonFiles(entryPath);
      return entry.isFile() && entry.name.endsWith(".json") ? [entryPath] : [];
    });
}

function readContent(filePath: string): CalendarDayContent | null {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch (error) {
    console.log("Failed to read published calendar content", filePath, error);
    return null;
  }
}

function getDayOfYear(month: number, day: number): number {
  const quarter = Math.floor((month - 1) / 3);
  return quarter * 91 + ((month - 1) % 3) * 30 + day;
}

function addDays(dateString: string, days: number): string {
  const [year, month, day] = dateString.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  date.setUTCDate(date.getUTCDate() + days);

  return [
    date.getUTCFullYear(),
    String(date.getUTCMonth() + 1).padStart(2, "0"),
    String(date.getUTCDate()).padStart(2, "0"),
  ].join("-");
}

function isWebUrl(value?: string): value is string {
  return /^https?:\/\//i.test(value?.trim() ?? "");
}
