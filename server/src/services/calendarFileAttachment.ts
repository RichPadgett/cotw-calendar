/*
 * File: server/src/services/calendarFileAttachment.ts
 * Purpose: Adds a successfully uploaded file to a calendar day content record.
 */

import { CalendarDayContent } from "../types/calendarContent";

export function attachFileToCalendarContent(
  content: CalendarDayContent,
  file: { originalName: string; url: string }
): CalendarDayContent {
  const sections = content.sections ?? [];
  const mediaSectionIndex = sections.findIndex(
    (section) => section.displayStyle !== "notice"
  );
  const uploadedItem = {
    label: file.originalName,
    type: "pdf" as const,
    url: file.url,
    access: "public" as const,
    includeInCalendarFeed: false,
  };
  const nextSections = [...sections];

  if (mediaSectionIndex >= 0) {
    nextSections[mediaSectionIndex] = {
      ...nextSections[mediaSectionIndex],
      items: [...nextSections[mediaSectionIndex].items, uploadedItem],
    };
  } else {
    nextSections.push({
      title: "Files / Links / Media",
      displayStyle: "default",
      items: [uploadedItem],
    });
  }

  return { ...content, sections: nextSections };
}
