/*
 * File: src/engine/appointedTimesCalendar.test.ts
 * Purpose: Verifies the public iCalendar feed stays aligned with Enoch feast dates.
 */

import { buildAppointedTimesCalendar } from "../../server/src/services/appointedTimesCalendar";

function unfold(calendar: string) {
  return calendar.replace(/\r\n /g, "");
}

describe("appointed-times iCalendar feed", () => {
  it("emits the 2026 appointed times on their Gregorian dates", () => {
    const calendar = unfold(
      buildAppointedTimesCalendar({ startYear: 2026, yearCount: 1 })
    );
    const events = calendar
      .split("BEGIN:VEVENT")
      .slice(1)
      .map((event) => ({
        summary: event.match(/SUMMARY:(.*)\r\n/)?.[1],
        start: event.match(/DTSTART;VALUE=DATE:(\d{8})/)?.[1],
        end: event.match(/DTEND;VALUE=DATE:(\d{8})/)?.[1],
      }));

    expect(events).toEqual([
      {
        summary: "Firstfruits (Bikkurim)",
        start: "20260329",
        end: "20260330",
      },
      { summary: "Passover (Pesach)", start: "20260331", end: "20260401" },
      {
        summary: "Feast of Unleavened Bread (Chag HaMatzot)",
        start: "20260401",
        end: "20260408",
      },
      {
        summary: "Shavuot (Feast of Weeks)",
        start: "20260517",
        end: "20260518",
      },
      {
        summary: "Feast of Trumpets (Yom Teruah)",
        start: "20260916",
        end: "20260917",
      },
      {
        summary: "Day of Atonement (Yom Kippur)",
        start: "20260925",
        end: "20260926",
      },
      {
        summary: "Feast of Booths (Sukkot)",
        start: "20260930",
        end: "20261007",
      },
      {
        summary: "Eighth Day Assembly (Shemini Atzeret)",
        start: "20261007",
        end: "20261008",
      },
    ]);
  });

  it("uses stable event IDs across a rolling four-year subscription", () => {
    const calendar = buildAppointedTimesCalendar({
      startYear: 2025,
      yearCount: 4,
    });

    expect(calendar.match(/BEGIN:VEVENT/g)).toHaveLength(32);
    expect(calendar).toContain("UID:sukkot-2026@enochscalendar.com");
    expect(calendar).toContain("UID:sukkot-2027@enochscalendar.com");

    for (const line of calendar.split("\r\n")) {
      expect(Buffer.byteLength(line, "utf8")).toBeLessThanOrEqual(75);
    }
  });
});

