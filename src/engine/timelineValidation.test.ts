/*
 * File: src/engine/timelineValidation.test.ts
 * Purpose: Tests for timeline date validation against the Enoch engine.
 */

import { validateTimelineDate } from "./timelineValidation";

describe("timeline date validation", () => {
  it("reports year-only dates as insufficient for Enoch validation", () => {
    const validation = validateTimelineDate({ year: 30, era: "AD" });

    expect(validation.status).toBe("insufficient-date");
  });

  it("reports BC dates as unsupported until a long-range epoch exists", () => {
    const validation = validateTimelineDate({
      year: 1446,
      era: "BC",
      month: 1,
      day: 14,
    });

    expect(validation.status).toBe("unsupported-era");
  });

  it("computes an Enoch date for a full modern Gregorian date", () => {
    const validation = validateTimelineDate({
      year: 2026,
      era: "AD",
      month: 3,
      day: 29,
    });

    expect(validation.status).toBe("computed");
    expect(validation.computed).toMatchObject({
      enochYear: 2026,
      month: 1,
      day: 12,
      dayOfYear: 12,
    });
  });

  it("validates a matching manual Enoch reference", () => {
    const validation = validateTimelineDate(
      {
        year: 2026,
        era: "AD",
        month: 3,
        day: 29,
      },
      {
        month: 1,
        day: 12,
      }
    );

    expect(validation.status).toBe("valid");
  });

  it("detects a mismatched manual Enoch reference", () => {
    const validation = validateTimelineDate(
      {
        year: 2026,
        era: "AD",
        month: 3,
        day: 29,
      },
      {
        month: 1,
        day: 14,
      }
    );

    expect(validation.status).toBe("mismatch");
  });
});
