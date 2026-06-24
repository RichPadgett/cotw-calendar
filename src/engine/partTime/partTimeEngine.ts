/*
 * File: src/engine/partTime/partTimeEngine.ts
 * Purpose: Part Time model engine for Enoch day parts, solar gates, and variable course duration.
 */

import { ENOCH_PARTS_PER_DAY } from "./constants";

import {
    getDayPartsForEnochDay,
    getNightPartsForEnochDay,
    getSeasonFromEnochDay,
} from "./partCurve";

import { getCourseSpeed } from "./courseSpeed";
import type { EnochPartTime, SolarDay } from "./types";

/** get enoch part time. */
export function getEnochPartTime(args: {
  enochDay: number;
  dateTime: Date;
  solar: SolarDay;
}): EnochPartTime {
  const { enochDay, dateTime, solar } = args;

  const dayParts = getDayPartsForEnochDay(enochDay);
  const nightParts = getNightPartsForEnochDay(enochDay);
  const sunrise = new Date(solar.sunriseIso);
  const sunset = new Date(solar.sunsetIso);
  const minutesSinceSunrise =
    (dateTime.getTime() - sunrise.getTime()) / 60000;

  const isDay =
    dateTime.getTime() >= sunrise.getTime() &&
    dateTime.getTime() < sunset.getTime();

  let enochPart: number;
  let partProgress: number;
  let currentPartMinutes: number;

  if (isDay) {
    currentPartMinutes = solar.daylightMinutes / dayParts;
    const partIndex = Math.floor(minutesSinceSunrise / currentPartMinutes);
    enochPart = partIndex + 1;
    partProgress =
      (minutesSinceSunrise % currentPartMinutes) / currentPartMinutes;
  } else {
    const minutesIntoNight =
      minutesSinceSunrise < 0
        ? solar.nightMinutes + minutesSinceSunrise
        : minutesSinceSunrise - solar.daylightMinutes;

    currentPartMinutes = solar.nightMinutes / nightParts;
    const nightPartIndex = Math.floor(minutesIntoNight / currentPartMinutes);

    enochPart = dayParts + nightPartIndex + 1;
    partProgress =
      (minutesIntoNight % currentPartMinutes) / currentPartMinutes;
  }

  return {
    enochDay,
    enochPart: Math.min(enochPart, ENOCH_PARTS_PER_DAY),
    partProgress,
    dayParts,
    nightParts,
    season: getSeasonFromEnochDay(enochDay),
    courseSpeed: getCourseSpeed(enochDay),
    sunriseIso: solar.sunriseIso,
    sunsetIso: solar.sunsetIso,
    daylightMinutes: solar.daylightMinutes,
    nightMinutes: solar.nightMinutes,
    currentPartMinutes,
  };
}
