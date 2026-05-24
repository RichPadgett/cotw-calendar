// src/engine/enochFeasts.ts

import { EnochDayEvent } from "../models/calendar";

export function getEnochDayEvents(params: {
  monthNumber?: number;
  day?: number;
  isWeeklySabbath: boolean;
}): EnochDayEvent[] {
  const { monthNumber, day, isWeeklySabbath } = params;

  const events: EnochDayEvent[] = [];

  if (isWeeklySabbath) {
    events.push({
      id: "weekly-sabbath",
      englishName: "Weekly Sabbath",
      hebrewName: "Shabbat",
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
      type: "preparation",
      icon: "lamb",
      color: "#d97706",
    });
  }

  if (monthNumber === 1 && day === 14) {
    events.push({
      id: "passover",
      englishName: "Passover",
      hebrewName: "Pesach",
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
      type: "high-sabbath",
      icon: "assembly",
      color: "#0f766e",
      isHighSabbath: true,
    });
  }

  return events;
}
