/*
 * File: src/engine/partTime/partDayModel.test.ts
 * Purpose: Locks the working 364-day, 18-part Enoch day/night ratio model.
 */

import { ENOCH_DAYS_PER_YEAR, ENOCH_PARTS_PER_DAY } from "./constants";
import { getEnochPartTime } from "./partTimeEngine";
import {
  getDayPartsForEnochDay,
  getNightPartsForEnochDay,
  getSeasonFromEnochDay,
} from "./partCurve";
import type { SolarDay } from "./types";

const SAMPLE_SOLAR_DAY: SolarDay = {
  date: "2028-06-20",
  locationName: "Jerusalem",
  latitude: 31.7683,
  longitude: 35.2137,
  timeZone: "Asia/Jerusalem",
  sunriseIso: "2028-06-20T02:32:42Z",
  sunsetIso: "2028-06-20T16:48:59Z",
  daylightMinutes: 856.2833333333333,
  nightMinutes: 583.95,
  source: "test",
};

describe("Working 364-day Enoch part-day model", () => {
  it("keeps 364 Enoch days and 18 counted parts per day", () => {
    expect(ENOCH_DAYS_PER_YEAR).toBe(364);
    expect(ENOCH_PARTS_PER_DAY).toBe(18);

    for (let enochDay = 1; enochDay <= ENOCH_DAYS_PER_YEAR; enochDay += 1) {
      expect(
        getDayPartsForEnochDay(enochDay) + getNightPartsForEnochDay(enochDay)
      ).toBe(ENOCH_PARTS_PER_DAY);
    }
  });

  it("preserves the expected seasonal day/night ratios", () => {
    expect(getSeasonFromEnochDay(1)).toBe("spring");
    expect(getDayPartsForEnochDay(1)).toBe(9);
    expect(getNightPartsForEnochDay(1)).toBe(9);

    expect(getDayPartsForEnochDay(91)).toBe(12);
    expect(getNightPartsForEnochDay(91)).toBe(6);

    expect(getDayPartsForEnochDay(182)).toBe(9);
    expect(getNightPartsForEnochDay(182)).toBe(9);

    expect(getDayPartsForEnochDay(273)).toBe(6);
    expect(getNightPartsForEnochDay(273)).toBe(12);
  });

  it("converts a modern timestamp into the current day or night part", () => {
    const dayPart = getEnochPartTime({
      enochDay: 91,
      dateTime: new Date("2028-06-20T03:44:30Z"),
      solar: SAMPLE_SOLAR_DAY,
    });
    const nightPart = getEnochPartTime({
      enochDay: 91,
      dateTime: new Date("2028-06-20T18:30:00Z"),
      solar: SAMPLE_SOLAR_DAY,
    });

    expect(dayPart).toEqual(
      expect.objectContaining({
        enochDay: 91,
        enochPart: 2,
        dayParts: 12,
        nightParts: 6,
      })
    );
    expect(nightPart).toEqual(
      expect.objectContaining({
        enochDay: 91,
        enochPart: 14,
        dayParts: 12,
        nightParts: 6,
      })
    );
  });
});
