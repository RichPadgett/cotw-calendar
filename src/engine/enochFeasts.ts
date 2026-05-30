/*
 * File: src/engine/enochFeasts.ts
 * Purpose: Calendar calculation engine module for building Enoch calendar dates, months, years, and feast metadata.
 * Author: rpadgett
 */

import { EnochDayEvent } from "../models/calendar";
import { ComputedFeasts } from "./enochComputedFeasts";

/**
 * Returns feast and appointed-time events for a specific Enoch day.
 * This engine function supplies event badges and labels used by calendar UI components.
 */
export function getEnochDayEvents(params: {
  monthNumber?: number;
  day?: number;
  dayOfYear: number;
  isWeeklySabbath: boolean;
  computedFeasts?: ComputedFeasts;
}): EnochDayEvent[] {
  const { monthNumber, day, dayOfYear, isWeeklySabbath, computedFeasts } =
    params;

  const events: EnochDayEvent[] = [];

  if (isWeeklySabbath) {
    events.push({
      id: "weekly-sabbath",
      englishName: "Weekly Sabbath",
      hebrewName: "Shabbat",
      shortName: "Shab",
      type: "weekly-sabbath",
      icon: "sabbath",
      color: "#2563eb",
    });
  }

  if (monthNumber === 1 && day === 10) {
    events.push({
      id: "passover-lamb-selection",
      englishName: "Passover Lambs Selected",
      hebrewName: "Korban Pesach Selection",
      shortName: "Lamb",
      type: "preparation",
      icon: "lamb",
      color: "#d97706",
    });
  }

  if (computedFeasts?.firstfruitsDayOfYear === dayOfYear) {
    events.push({
      id: "firstfruits",
      englishName: "Firstfruits",
      hebrewName: "Bikkurim",
      shortName: "Omer",
      type: "feast",
      icon: "firstfruits",
      color: "#65a30d",
    });
  }

  const omerIndex =
    computedFeasts?.omerSabbathDaysOfYear.indexOf(dayOfYear) ?? -1;

  if (omerIndex >= 0) {
    const omerNumber = omerIndex + 1;

    events.push({
      id: `omer-sabbath-${omerNumber}`,
      englishName: `Omer Sabbath ${omerNumber}`,
      hebrewName: "Counting of the Omer",
      shortName: `Omer ${omerNumber}`,
      type: "counting-day",
      icon: "omer",
      color: "#84cc16",
    });
  }

  if (computedFeasts?.shavuotDayOfYear === dayOfYear) {
    events.push({
      id: "shavuot",
      englishName: "Shavuot",
      hebrewName: "Shavuot",
      shortName: "Shav",
      type: "high-sabbath",
      icon: "wheat",
      color: "#eab308",
      isHighSabbath: true,
    });
  }

  if (monthNumber === 1 && day === 14) {
    events.push({
      id: "passover",
      englishName: "Passover",
      hebrewName: "Pesach",
      shortName: "Pes",
      type: "feast",
      icon: "lamb",
      color: "#dc2626",
    });
  }

  if (monthNumber === 1 && day === 15) {
    events.push({
      id: "unleavened-bread-day-1",
      englishName: "First Day of Unleavened Bread",
      hebrewName: "Chag HaMatzot",
      shortName: "UB1",
      type: "high-sabbath",
      icon: "matzah",
      color: "#ca8a04",
      isHighSabbath: true,
    });
  }

  if (monthNumber === 1 && day && day >= 16 && day <= 20) {
    events.push({
      id: `unleavened-bread-day-${day - 14}`,
      englishName: `Unleavened Bread Day ${day - 14}`,
      hebrewName: "Chag HaMatzot",
      shortName: `UB${day - 14}`,
      type: "feast",
      icon: "matzah",
      color: "#eab308",
    });
  }

  if (monthNumber === 1 && day === 21) {
    events.push({
      id: "unleavened-bread-day-7",
      englishName: "Seventh Day of Unleavened Bread",
      hebrewName: "Chag HaMatzot",
      shortName: "UB7",
      type: "high-sabbath",
      icon: "matzah",
      color: "#ca8a04",
      isHighSabbath: true,
    });
  }

  if (monthNumber === 7 && day === 1) {
    events.push({
      id: "feast-of-trumpets",
      englishName: "Feast of Trumpets",
      hebrewName: "Yom Teruah",
      shortName: "Ter",
      type: "high-sabbath",
      icon: "shofar",
      color: "#7c3aed",
      isHighSabbath: true,
    });
  }

  if (monthNumber === 7 && day === 9) {
    events.push({
      id: "atonement-affliction-begins",
      englishName: "Affliction Begins at Sundown",
      hebrewName: "Erev Yom Kippur",
      shortName: "Fast",
      type: "fast",
      icon: "sunset",
      color: "#475569",
    });
  }

  if (monthNumber === 7 && day === 10) {
    events.push({
      id: "day-of-atonement",
      englishName: "Day of Atonement",
      hebrewName: "Yom Kippur",
      shortName: "YK",
      type: "high-sabbath",
      icon: "atonement",
      color: "#111827",
      isHighSabbath: true,
    });
  }

  if (monthNumber === 7 && day && day >= 15 && day <= 21) {
    events.push({
      id: `sukkot-day-${day - 14}`,
      englishName: `Feast of Booths Day ${day - 14}`,
      hebrewName: "Sukkot",
      shortName: `Suk${day - 14}`,
      type: day === 15 ? "high-sabbath" : "feast",
      icon: "booth",
      color: "#16a34a",
      isHighSabbath: day === 15,
    });
  }

  if (monthNumber === 7 && day === 22) {
    events.push({
      id: "eighth-day",
      englishName: "Eighth Day Assembly",
      hebrewName: "Shemini Atzeret",
      shortName: "8th",
      type: "high-sabbath",
      icon: "assembly",
      color: "#0f766e",
      isHighSabbath: true,
    });
  }

  return events;
}
