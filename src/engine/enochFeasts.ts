// src/engine/enochFeasts.ts

import { EnochDayEvent } from "../models/calendar";

/*
  Returns feast / sabbath / appointed-day metadata
  for a given Enoch month/day.

  This file should stay focused on:
  - appointed times
  - feast labels
  - short UI labels
  - icon/color metadata

  The UI can render shortName in small cells,
  while full screens can use englishName + hebrewName.
*/

export function getEnochDayEvents(params: {
  monthNumber?: number;
  day?: number;
  isWeeklySabbath: boolean;
}): EnochDayEvent[] {
  const { monthNumber, day, isWeeklySabbath } = params;

  const events: EnochDayEvent[] = [];

  /*
    Weekly Sabbath
  */

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

  /*
    Month 1, Day 10
    Passover lambs selected
  */

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

  /*
    Month 1, Day 14
    Passover
  */

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

  /*
    Month 1, Day 15
    First day of Unleavened Bread
    High Sabbath
  */

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

  /*
    Month 1, Days 16–20
    Middle days of Unleavened Bread
  */

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

  /*
    Month 1, Day 21
    Seventh day of Unleavened Bread
    High Sabbath
  */

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

  /*
    Month 7, Day 1
    Feast of Trumpets
    High Sabbath
  */

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

  /*
    Month 7, Day 9
    Affliction begins at sundown
  */

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

  /*
    Month 7, Day 10
    Day of Atonement
    High Sabbath
  */

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

  /*
    Month 7, Days 15–21
    Feast of Booths / Sukkot
    Day 1 is a High Sabbath
  */

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

  /*
    Month 7, Day 22
    Eighth Day Assembly / Shemini Atzeret
    High Sabbath
  */

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