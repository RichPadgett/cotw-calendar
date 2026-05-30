/*
 * File: server/src/data/calendarContent.ts
 * Purpose: Seed data module for calendar day content used by the local server.
 * Author: rpadgett
 */

import { CalendarDayContent } from "../types/calendarContent";

/**
 * Seed list of full calendar day-content records.
 * This data export supports server-side fixtures or migration from static content into saved files.
 */
export const calendarContent: CalendarDayContent[] = [
  {
    enochYear: 2026,

    month: 3,
    day: 1,

    gregorianDate: "2026-05-31",

    title: "Shavuot 2026",

    scriptureReadings: [
      {
        label: "Ephesians 4:7-9",
        reference: "Ephesians 4:7-9",
        url: "https://www.blueletterbible.org/kjv/eph/4/7-9",
      },

      {
        label: "1 Corinthians 12:1-31",
        reference: "1 Corinthians 12:1-31",
        url: "https://www.blueletterbible.org/kjv/1co/12/1-31",
      },

      {
        label: "1 Peter 4:7-11",
        reference: "1 Peter 4:7-11",
        url: "https://www.blueletterbible.org/kjv/1pe/4/7-11",
      },

      {
        label: "Romans 12:1-21",
        reference: "Romans 12:1-21",
        url: "https://www.blueletterbible.org/kjv/rom/12/1-21",
      },

      {
        label: "Acts 15:1-22",
        reference: "Acts 15:1-22",
        url: "https://www.blueletterbible.org/kjv/act/15/1-22",
      },

      {
        label: "Isaiah 50:4",
        reference: "Isaiah 50:4",
        url: "https://www.blueletterbible.org/kjv/isa/50/4",
      },

      {
        label: "John 4:5-42",
        reference: "John 4:5-42",
        url: "https://www.blueletterbible.org/kjv/jhn/4/5-42",
      },

      {
        label: "John 7:37-39",
        reference: "John 7:37-39",
        url: "https://www.blueletterbible.org/kjv/jhn/7/37-39",
      },

      {
        label: "Acts 2:37-41",
        reference: "Acts 2:37-41",
        url: "https://www.blueletterbible.org/kjv/act/2/37-41",
      },
    ],

    sections: [
      {
        title: "Teaching Audio",

        items: [
          {
            label: "Spotify Teaching",

            type: "external-link",

            url: "https://open.spotify.com/episode/1RLvuYibJ9JVM3P8KMKAAU?si=DhB8iyy9SSaL1YDis-I0Sw&pi=WOCJ9LiMQQGbp&nd=1&dlsi=481deb03dca64f87",

            access: "public",
          },
        ],
      },

      {
        title: "Study Resources",

        items: [
          {
            label: "Shavuot Study PDF",

            type: "pdf",

            url: "PASTE_PDF_LINK_HERE",

            access: "public",
          },
        ],
      },

      {
        title: "Teaching Timeline",

        items: [
          {
            label: "00:30 - Grammar of Plurality",

            type: "note",

            access: "public",
          },

          {
            label: "04:16 - Ephesians 4:7-9 → Yeshua, Ascended & Descended",

            type: "note",

            access: "public",
          },

          {
            label: "17:41 - Word of Wisdom",

            type: "note",

            access: "public",
          },

          {
            label: "53:08 - One Body",

            type: "note",

            access: "public",
          },

          {
            label:
              "1:05:28 - Acts 2:37-41 → Three Thousand Believed & Baptised",

            type: "note",

            access: "public",
          },
        ],
      },
    ],

    notes:
      "Shavuot teaching focused on spiritual gifts, unity of the body, wisdom, faith, miracles, and glorifying the Father through service.",
  },
];
