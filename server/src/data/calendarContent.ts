// server/src/data/calendarContent.ts

import { CalendarDayContent } from "../types/calendarContent";

export const calendarContent: CalendarDayContent[] = [
  {
    enochYear: 2026,

    month: 3,
    day: 1,

    gregorianDate: "2026-05-17",

    title: "Month 3 Day 1",

    scriptureReadings: [
      {
        label: "Generation of Christ",

        reference: "Matthew 1",

        url:
          "https://www.blueletterbible.org/kjv/mat/1/1/t_conc_930001",
      },
    ],

    sections: [
      {
        title: "Teachings",

        items: [
          {
            label: "Shabbat Teaching PDF",

            type: "pdf",

            url:
              "https://example.com/teaching.pdf",

            access: "public",
          },
        ],
      },

      {
        title: "Live Gathering",

        items: [
          {
            label: "Google Meet",

            type: "video-link",

            url:
              "https://drive.google.com/file/d/1IZRV9604Nu1Uc4K02JknMys51qx6fcNS/view?pli=1",

            access: "code-required",
          },
        ],
      },
    ],

    notes:
      "Welcome to the sacred calendar.",
  },
];
