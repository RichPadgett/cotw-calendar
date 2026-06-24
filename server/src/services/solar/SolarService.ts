/*
 * File: server/src/services/solar/SolarService.ts
 * Purpose: Server-side storage, persistence, or integration service.
 */

import fs from "fs/promises";
import path from "path";

const JERUSALEM_LAT = 31.7683;
const JERUSALEM_LNG = 35.2137;
const SERVER_ROOT = path.resolve(__dirname, "../../..");
const SOLAR_ROOT = path.join(
  SERVER_ROOT,
  "content",
  "system",
  "solar",
  "jerusalem"
);

export type SolarDay = {
  date: string;
  locationName: "Jerusalem";
  latitude: number;
  longitude: number;
  timeZone: "Asia/Jerusalem";
  sunriseIso: string;
  sunsetIso: string;
  solarNoonIso?: string;
  daylightMinutes: number;
  nightMinutes: number;
  source: string;
  fetchedAtIso?: string;
  cachedAtIso?: string;
};

type SolarYearFile = {
  location: {
    name: "Jerusalem";
    latitude: number;
    longitude: number;
    timeZone: "Asia/Jerusalem";
  };
  days: Record<string, SolarDay>;
};

export type SolarCacheStatus = "hit" | "miss";

export type SolarDayResult = {
  day: SolarDay;
  cacheStatus: SolarCacheStatus;
};

export type SolarYearResult = {
  year: number;
  days: SolarDay[];
  cachedCount: number;
  fetchedCount: number;
  expectedCount: number;
  failedDates: { date: string; message: string }[];
};

const pendingDayFetches = new Map<string, Promise<SolarDayResult>>();

export class SolarService {
  /** get jerusalem day. */
  static async getJerusalemDay(date: string): Promise<SolarDay> {
    const result = await this.getJerusalemDayResult(date);

    return result.day;
  }

  /** get jerusalem day result. */
  static async getJerusalemDayResult(date: string): Promise<SolarDayResult> {
    const pendingFetch = pendingDayFetches.get(date);

    if (pendingFetch) return pendingFetch;

    const fetchPromise = this.getOrFetchJerusalemDay(date);

    pendingDayFetches.set(date, fetchPromise);

    try {
      return await fetchPromise;
    } finally {
      pendingDayFetches.delete(date);
    }
  }

  /** get jerusalem year. */
  static async getJerusalemYear(
    year: number,
    options: { fillMissing?: boolean } = {}
  ): Promise<SolarYearResult> {
    const expectedDates = getGregorianYearDates(year);
    const yearFile = await this.readYearFile(year);
    const existingDays = expectedDates
      .map((date) => yearFile.days[date])
      .filter(Boolean);

    if (!options.fillMissing) {
      return {
        year,
        days: existingDays,
        cachedCount: existingDays.length,
        fetchedCount: 0,
        expectedCount: expectedDates.length,
        failedDates: [],
      };
    }

    const days: SolarDay[] = [];
    let fetchedCount = 0;
    const failedDates: SolarYearResult["failedDates"] = [];

    for (const date of expectedDates) {
      try {
        const result = await this.getJerusalemDayResult(date);

        if (result.cacheStatus === "miss") {
          fetchedCount += 1;
          await sleep(150);
        }

        days.push(result.day);
      } catch (error) {
        failedDates.push({
          date,
          message:
            error instanceof Error
              ? error.message
              : "Unknown solar data fetch error.",
        });
      }
    }

    return {
      year,
      days,
      cachedCount: days.length - fetchedCount,
      fetchedCount,
      expectedCount: expectedDates.length,
      failedDates,
    };
  }

  /** get or fetch jerusalem day. */
  private static async getOrFetchJerusalemDay(
    date: string
  ): Promise<SolarDayResult> {
    const year = date.substring(0, 4);
    const data = await this.readYearFile(Number(year));

    if (data.days[date]) {
      return {
        day: data.days[date],
        cacheStatus: "hit",
      };
    }

    const solarDay = await this.fetchSolarDay(date);

    const latestData = await this.readYearFile(Number(year));

    latestData.days[date] = {
      ...solarDay,
      cachedAtIso: new Date().toISOString(),
    };

    await this.writeYearFile(Number(year), latestData);

    return {
      day: latestData.days[date],
      cacheStatus: "miss",
    };
  }

  /** read year file. */
  private static async readYearFile(year: number): Promise<SolarYearFile> {
    const filePath = getYearFilePath(year);

    try {
      const file = await fs.readFile(filePath, "utf8");
      return JSON.parse(file) as SolarYearFile;
    } catch {
      return createEmptyYearFile();
    }
  }

  /** write year file. */
  private static async writeYearFile(year: number, data: SolarYearFile) {
    const filePath = getYearFilePath(year);

    await fs.mkdir(path.dirname(filePath), {
      recursive: true,
    });

    await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf8");
  }

  /** fetch solar day. */
  private static async fetchSolarDay(
    date: string
  ): Promise<SolarDay> {
    const url =
      `https://api.sunrise-sunset.org/json` +
      `?lat=${JERUSALEM_LAT}` +
      `&lng=${JERUSALEM_LNG}` +
      `&date=${date}` +
      `&formatted=0`;

    const response = await fetchWithRetry(url);

    if (!response.ok) {
      throw new Error(
        `Failed to retrieve solar data: HTTP ${response.status}`
      );
    }

    const json = await response.json();

    if (json.status && json.status !== "OK") {
      throw new Error(`Failed to retrieve solar data: ${json.status}`);
    }

    if (!json.results?.sunrise || !json.results?.sunset) {
      throw new Error("Failed to retrieve solar data: missing sunrise/sunset");
    }

    const sunrise = new Date(json.results.sunrise);
    const sunset = new Date(json.results.sunset);

    const daylightMinutes = Math.round(
      (sunset.getTime() - sunrise.getTime()) /
      60000
    );

    const nightMinutes =
      1440 - daylightMinutes;

    return {
      date,
      locationName: "Jerusalem",
      latitude: JERUSALEM_LAT,
      longitude: JERUSALEM_LNG,
      timeZone: "Asia/Jerusalem",
      sunriseIso: json.results.sunrise,
      sunsetIso: json.results.sunset,
      solarNoonIso: json.results.solar_noon,
      daylightMinutes,
      nightMinutes,
      source: "sunrise-sunset.org",
      fetchedAtIso: new Date().toISOString(),
    };
  }
}

/** get year file path. */
function getYearFilePath(year: number) {
  return path.join(SOLAR_ROOT, `${year}.json`);
}

/** create empty year file. */
function createEmptyYearFile(): SolarYearFile {
  return {
    location: {
      name: "Jerusalem",
      latitude: JERUSALEM_LAT,
      longitude: JERUSALEM_LNG,
      timeZone: "Asia/Jerusalem",
    },
    days: {},
  };
}

/** get gregorian year dates. */
function getGregorianYearDates(year: number) {
  const dates: string[] = [];
  const current = new Date(Date.UTC(year, 0, 1));

  while (current.getUTCFullYear() === year) {
    dates.push(current.toISOString().slice(0, 10));
    current.setUTCDate(current.getUTCDate() + 1);
  }

  return dates;
}

/** fetch with retry. */
async function fetchWithRetry(url: string, attempt = 1): Promise<Response> {
  const response = await fetch(url);

  if (response.ok || attempt >= 3) return response;

  await sleep(attempt * 750);

  return fetchWithRetry(url, attempt + 1);
}

/** sleep. */
function sleep(milliseconds: number) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}
