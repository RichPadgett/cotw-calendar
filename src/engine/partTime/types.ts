/*
 * File: src/engine/partTime/types.ts
 * Purpose: Part Time model engine for Enoch day parts, solar gates, and variable course duration.
 */

export type Season = "spring" | "summer" | "fall" | "winter";

export type GateName =
  | "spring-equinox"
  | "summer-solstice"
  | "fall-equinox"
  | "winter-solstice";

export type CourseSpeed = "fast" | "normal" | "slow";
export type CourseGateNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

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

export type EnochPartTime = {
  enochDay: number;          // 1–364
  enochPart: number;         // 1–18
  partProgress: number;      // 0–1
  dayParts: number;          // 6–12
  nightParts: number;        // 12–6
  season: Season;
  nearestGate?: GateName;
  courseSpeed: CourseSpeed;

  sunriseIso?: string;
  sunsetIso?: string;
  daylightMinutes?: number;
  nightMinutes?: number;
  currentPartMinutes?: number;
};

export type CourseDayTiming = {
  enochDay: number;
  gate: CourseGateNumber;
  slowdownWeight: number;
  extraMinutes: number;
  courseDayDurationMinutes: number;
  speedMultiplier: number;
  courseSpeed: CourseSpeed;
};
