/*
 * File: server/src/services/appointedTimesCalendar.ts
 * Purpose: Generates the public iCalendar subscription for Enoch appointed times.
 */

const BASE_ENOCH_YEAR = 2026;
const BASE_START_DATE = "2026-03-18";
const BASE_SABBATH_WEEK_START_YEAR = 2025;
const SABBATH_WEEK_CYCLE_YEARS = 7;
const DEFAULT_YEAR_COUNT = 4;
const MAX_YEAR_COUNT = 8;

type AppointedTimeDefinition = {
  id: string;
  englishName: string;
  hebrewName: string;
  startDayOfYear: number;
  durationDays: number;
  description: string;
};

export type AppointedTimesCalendarOptions = {
  startYear?: number;
  yearCount?: number;
  calendarUrl?: string;
  additionalEvents?: CalendarFeedEvent[];
};

export type CalendarFeedEvent = {
  uid: string;
  startDate: string;
  summary: string;
  description?: string;
  url?: string;
  startTime?: string;
  endTime?: string;
  location?: string;
};

export function buildAppointedTimesCalendar(
  options: AppointedTimesCalendarOptions = {}
): string {
  const startYear = options.startYear ?? new Date().getUTCFullYear() - 1;
  const yearCount = Math.min(
    Math.max(options.yearCount ?? DEFAULT_YEAR_COUNT, 1),
    MAX_YEAR_COUNT
  );
  const calendarUrl = options.calendarUrl ?? "https://enochscalendar.com/";
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Enochs Calendar//Appointed Times//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "X-WR-CALNAME:Enoch's Calendar — Appointed Times",
    "X-WR-CALDESC:Enoch appointed times aligned to their calculated Gregorian dates.",
    "REFRESH-INTERVAL;VALUE=DURATION:PT6H",
    "X-PUBLISHED-TTL:PT6H",
  ];

  for (
    let enochYear = startYear;
    enochYear < startYear + yearCount;
    enochYear++
  ) {
    const yearStart = getEnochYearStartDate(enochYear);

    const appointedTimes = getAppointedTimes(yearStart).sort(
      (left, right) => left.startDayOfYear - right.startDayOfYear
    );

    for (const appointedTime of appointedTimes) {
      const startDate = addDays(yearStart, appointedTime.startDayOfYear - 1);
      const endDate = addDays(startDate, appointedTime.durationDays);
      const summary = appointedTime.hebrewName
        ? `${appointedTime.englishName} (${appointedTime.hebrewName})`
        : appointedTime.englishName;
      const description = [
        appointedTime.description,
        `Enoch Year ${enochYear}`,
        `Begins on the Gregorian date ${startDate}.`,
      ].join("\\n");

      lines.push(
        "BEGIN:VEVENT",
        `UID:${appointedTime.id}-${enochYear}@enochscalendar.com`,
        `DTSTAMP:${formatIcsDate(yearStart)}T000000Z`,
        `DTSTART;VALUE=DATE:${formatIcsDate(startDate)}`,
        `DTEND;VALUE=DATE:${formatIcsDate(endDate)}`,
        `SUMMARY:${escapeIcsText(summary)}`,
        `DESCRIPTION:${escapeIcsText(description)}`,
        `URL:${escapeIcsText(calendarUrl)}`,
        "TRANSP:TRANSPARENT",
        "STATUS:CONFIRMED",
        "SEQUENCE:0",
        "END:VEVENT"
      );
    }
  }

  for (const event of options.additionalEvents ?? []) {
    const endDate = addDays(event.startDate, 1);
    const hasTime = /^\d{2}:\d{2}$/.test(event.startTime ?? "");
    const timedEnd = hasTime
      ? getTimedEnd(event.startTime!, event.endTime)
      : null;
    const startValue = hasTime
      ? `DTSTART;TZID=America/Chicago:${formatIcsDate(event.startDate)}T${formatIcsTime(event.startTime!)}`
      : `DTSTART;VALUE=DATE:${formatIcsDate(event.startDate)}`;
    const endValue = hasTime
      ? `DTEND;TZID=America/Chicago:${formatIcsDate(
          addDays(event.startDate, timedEnd!.dayOffset)
        )}T${formatIcsTime(timedEnd!.time)}`
      : `DTEND;VALUE=DATE:${formatIcsDate(endDate)}`;

    lines.push(
      "BEGIN:VEVENT",
      `UID:${escapeIcsText(event.uid)}`,
      `DTSTAMP:${formatIcsDate(event.startDate)}T000000Z`,
      startValue,
      endValue,
      `SUMMARY:${escapeIcsText(event.summary)}`,
      `DESCRIPTION:${escapeIcsText(event.description ?? "")}`,
      ...(event.location ? [`LOCATION:${escapeIcsText(event.location)}`] : []),
      ...(event.url ? [`URL:${escapeIcsText(event.url)}`] : []),
      "TRANSP:TRANSPARENT",
      "STATUS:CONFIRMED",
      "SEQUENCE:0",
      "END:VEVENT"
    );
  }

  lines.push("END:VCALENDAR");

  return `${lines.map(foldIcsLine).join("\r\n")}\r\n`;
}

export function getEnochYearStartDate(targetYear: number): string {
  let currentStartDate = BASE_START_DATE;

  for (let year = BASE_ENOCH_YEAR; year < targetYear; year++) {
    currentStartDate = addDays(currentStartDate, getEnochYearLength(year));
  }

  for (let year = BASE_ENOCH_YEAR - 1; year >= targetYear; year--) {
    currentStartDate = addDays(currentStartDate, -getEnochYearLength(year));
  }

  return currentStartDate;
}

function getAppointedTimes(yearStart: string): AppointedTimeDefinition[] {
  const firstfruitsDayOfYear = getFirstfruitsDayOfYear(yearStart);

  return [
    {
      id: "passover",
      englishName: "Passover",
      hebrewName: "Pesach",
      startDayOfYear: 14,
      durationDays: 1,
      description: "Passover on Enoch Month 1, Day 14.",
    },
    {
      id: "unleavened-bread",
      englishName: "Feast of Unleavened Bread",
      hebrewName: "Chag HaMatzot",
      startDayOfYear: 15,
      durationDays: 7,
      description: "Seven days of Unleavened Bread, Enoch Month 1, Days 15–21.",
    },
    {
      id: "firstfruits",
      englishName: "Firstfruits",
      hebrewName: "Bikkurim",
      startDayOfYear: firstfruitsDayOfYear,
      durationDays: 1,
      description: "Firstfruits, observed on the day after the Sabbath.",
    },
    {
      id: "shavuot",
      englishName: "Shavuot",
      hebrewName: "Feast of Weeks",
      startDayOfYear: firstfruitsDayOfYear + 49,
      durationDays: 1,
      description:
        "Shavuot, observed after counting seven complete Sabbaths from Firstfruits.",
    },
    {
      id: "feast-of-trumpets",
      englishName: "Feast of Trumpets",
      hebrewName: "Yom Teruah",
      startDayOfYear: getMonthDayOfYear(7, 1),
      durationDays: 1,
      description: "Feast of Trumpets on Enoch Month 7, Day 1.",
    },
    {
      id: "atonement-affliction-begins",
      englishName: "Affliction Begins at Sundown",
      hebrewName: "Erev Yom Kippur",
      startDayOfYear: getMonthDayOfYear(7, 9),
      durationDays: 1,
      description:
        "The Day of Atonement period of affliction begins at sundown on Enoch Month 7, Day 9.",
    },
    {
      id: "day-of-atonement",
      englishName: "Day of Atonement",
      hebrewName: "Yom Kippur",
      startDayOfYear: getMonthDayOfYear(7, 10),
      durationDays: 1,
      description:
        "Day of Atonement on Enoch Month 7, Day 10. Affliction begins at sundown on Day 9.",
    },
    {
      id: "sukkot",
      englishName: "Feast of Booths",
      hebrewName: "Sukkot",
      startDayOfYear: getMonthDayOfYear(7, 15),
      durationDays: 7,
      description: "Seven days of Sukkot, Enoch Month 7, Days 15–21.",
    },
    {
      id: "eighth-day",
      englishName: "Eighth Day Assembly",
      hebrewName: "Shemini Atzeret",
      startDayOfYear: getMonthDayOfYear(7, 22),
      durationDays: 1,
      description: "The Eighth Day Assembly on Enoch Month 7, Day 22.",
    },
  ];
}

function getFirstfruitsDayOfYear(yearStart: string): number {
  const lambSelectionDate = addDays(yearStart, 9);
  const selectionDayOfWeek = getUtcDayOfWeek(lambSelectionDate);
  const daysUntilSaturday = (6 - selectionDayOfWeek + 7) % 7 || 7;

  return 10 + daysUntilSaturday + 1;
}

function getMonthDayOfYear(month: number, day: number): number {
  const completedQuarters = Math.floor((month - 1) / 3);
  const monthWithinQuarter = (month - 1) % 3;

  return completedQuarters * 91 + monthWithinQuarter * 30 + day;
}

function getEnochYearLength(year: number): number {
  return hasSabbathWeekBeforeEnochYear(year + 1) ? 371 : 364;
}

function hasSabbathWeekBeforeEnochYear(targetYear: number): boolean {
  return (
    positiveModulo(
      targetYear - BASE_SABBATH_WEEK_START_YEAR,
      SABBATH_WEEK_CYCLE_YEARS
    ) === 0
  );
}

function positiveModulo(value: number, divisor: number): number {
  return ((value % divisor) + divisor) % divisor;
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

function getUtcDayOfWeek(dateString: string): number {
  const [year, month, day] = dateString.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, day)).getUTCDay();
}

function formatIcsDate(dateString: string): string {
  return dateString.replaceAll("-", "");
}

function formatIcsTime(time: string): string {
  return `${time.replace(":", "")}00`;
}

function getTimedEnd(
  startTime: string,
  requestedEndTime?: string
): { time: string; dayOffset: number } {
  const endTime = /^\d{2}:\d{2}$/.test(requestedEndTime ?? "")
    ? requestedEndTime!
    : addMinutesToTime(startTime, 60).time;
  const startMinutes = timeToMinutes(startTime);
  const endMinutes = timeToMinutes(endTime);

  return {
    time: endTime,
    dayOffset: endMinutes <= startMinutes ? 1 : 0,
  };
}

function addMinutesToTime(
  time: string,
  minutesToAdd: number
): { time: string; dayOffset: number } {
  const total = timeToMinutes(time) + minutesToAdd;
  const minutesInDay = 24 * 60;
  const normalized = total % minutesInDay;

  return {
    time: `${String(Math.floor(normalized / 60)).padStart(2, "0")}:${String(
      normalized % 60
    ).padStart(2, "0")}`,
    dayOffset: Math.floor(total / minutesInDay),
  };
}

function timeToMinutes(time: string): number {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

function escapeIcsText(value: string): string {
  return value
    .replaceAll("\\", "\\\\")
    .replaceAll(";", "\\;")
    .replaceAll(",", "\\,")
    .replaceAll("\n", "\\n");
}

function foldIcsLine(line: string): string {
  const chunks: string[] = [];
  let chunk = "";
  let chunkBytes = 0;

  for (const character of line) {
    const characterBytes = Buffer.byteLength(character, "utf8");

    if (chunk && chunkBytes + characterBytes > 74) {
      chunks.push(chunk);
      chunk = character;
      chunkBytes = characterBytes;
    } else {
      chunk += character;
      chunkBytes += characterBytes;
    }
  }

  if (chunk) chunks.push(chunk);

  return chunks.join("\r\n ");
}
