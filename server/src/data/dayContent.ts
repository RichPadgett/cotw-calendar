/*
 * File: server/src/data/dayContent.ts
 * Purpose: Seed data module for calendar day content used by the local server.
 * Author: rpadgett
 */

import { CalendarDayContent } from "../types/calendarContent";

/**
 * Seed lookup table for calendar day content keyed by date-like identifiers.
 * This data export supports early server responses and static content experiments.
 */
export const dayContent: Record<
  string,
  CalendarDayContent
> = {
  "2026-1-1": {
    enochYear: 2026,

    month: 1,
    day: 1,

    gregorianDate: "2026-03-18",

    title: "Beginning of the Year",

    notes:
      "Welcome to the beginning of the Enoch year.",

    scriptureReadings: [
      {
        label: "Creation Week",
        reference: "Genesis 1",
        url: "https://www.blueletterbible.org/",
      },
    ],

    sections: [
      {
        title: "Teachings",

        items: [
          {
            label: "Opening Teaching PDF",

            type: "pdf",

            url: "/files/opening-teaching.pdf",

            access: "public",
          },
        ],
      },

      {
        title: "Live Gathering",

        items: [
          {
            label: "Shabbat Meeting",

            type: "video-link",

            url: "https://meet.google.com/",

            access: "members",
          },
        ],
      },
    ],
  },
};
