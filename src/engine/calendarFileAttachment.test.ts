/*
 * File: src/engine/calendarFileAttachment.test.ts
 * Purpose: Regression coverage for persisting uploaded files in day content.
 */

import { attachFileToCalendarContent } from "../../server/src/services/calendarFileAttachment";

describe("calendar file attachment", () => {
  it("keeps existing content and appends the uploaded file as a saved media item", () => {
    const result = attachFileToCalendarContent(
      {
        enochYear: 2026,
        month: 7,
        day: 11,
        title: "Shabbat gathering",
        notes: "Existing details",
        sections: [
          {
            title: "Notices",
            displayStyle: "notice",
            items: [{ label: "At Trey's", type: "note", access: "members" }],
          },
        ],
      },
      {
        originalName: "study-notes.pdf",
        url: "/api/files/groups/church/files/2026/7/11/study-notes.pdf",
        mimeType: "application/pdf",
        sizeBytes: 1234,
        uploadedAt: "2026-09-23T12:00:00.000Z",
      }
    );

    expect(result.notes).toBe("Existing details");
    expect(result.sections).toHaveLength(2);
    expect(result.sections[1].items).toEqual([
      {
        label: "study-notes.pdf",
        type: "pdf",
        url: "/api/files/groups/church/files/2026/7/11/study-notes.pdf",
        access: "public",
        includeInCalendarFeed: false,
        originalName: "study-notes.pdf",
        mimeType: "application/pdf",
        sizeBytes: 1234,
        uploadedAt: "2026-09-23T12:00:00.000Z",
      },
    ]);
  });
});
