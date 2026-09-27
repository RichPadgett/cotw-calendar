/*
 * File: src/engine/publishedCalendarEvents.test.ts
 * Purpose: Verifies calendar publication flags and group visibility rules.
 */

import {
  getPublishedEventsForContent,
  getPublishedPerpetualMarkerEvents,
} from "../../server/src/services/publishedCalendarEvents";

const content = {
  enochYear: 2026,
  month: 7,
  day: 11,
  gregorianDate: "2026-09-26",
  title: "Shabbat gathering",
  notes: "Bring a chair.",
  scriptureReadings: [{ label: "Fast", reference: "Isaiah 58" }],
  sections: [
    {
      title: "Notices",
      displayStyle: "notice" as const,
      items: [
        {
          label: "Shabbat at Trey and Abby's",
          type: "note" as const,
          access: "members" as const,
          includeInCalendarFeed: true,
          details: "Dinner follows.",
          url: "https://maps.google.com/example",
          calendarStartTime: "18:00",
          calendarEndTime: "20:00",
          calendarLocation: "123 Example Road",
        },
      ],
    },
  ],
};

describe("published calendar content", () => {
  it("keeps member notices out of the public feed", () => {
    expect(getPublishedEventsForContent(content, "public")).toEqual([]);
  });

  it("includes marked member notices and their details in the group feed", () => {
    const [event] = getPublishedEventsForContent(content, "church-of-the-word");

    expect(event).toMatchObject({
      startDate: "2026-09-26",
      startTime: "18:00",
      endTime: "20:00",
      location: "123 Example Road",
      summary: "Shabbat at Trey and Abby's",
      url: "https://maps.google.com/example",
    });
    expect(event.description).toContain("Bring a chair.");
    expect(event.description).toContain("Scripture: Isaiah 58");
    expect(event.description).toContain("Dinner follows.");
  });

  it("publishes opted-in perpetual Beginning of Months markers every year", () => {
    const events = getPublishedPerpetualMarkerEvents(2026, 1).filter((event) =>
      event.summary.toLowerCase().includes("begin")
    );

    expect(events).toHaveLength(12);
    expect(events[0]).toMatchObject({
      startDate: "2026-03-18",
      summary: "Beginnings of Months",
    });
    expect(events[11].startDate).toBe("2027-02-14");
    expect(events[0].description).toContain("Numbers 28:11");
  });
});
