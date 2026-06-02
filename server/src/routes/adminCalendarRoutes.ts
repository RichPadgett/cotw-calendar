/*
 * File: server/src/routes/adminCalendarRoutes.ts
 * Purpose: Express route module for admin calendar content endpoints.
 */

import { Request, Router } from "express";

import { requireAdminToken } from "../middleware/requireAdminToken";
import {
  getCalendarDayContent,
  saveCalendarDayContent,
} from "../services/calendarContentStore";

const router = Router();

function getQueryString(value: unknown): string {
  if (Array.isArray(value)) {
    return String(value[0] ?? "");
  }

  return String(value ?? "");
}

function getGroupCode(req: Request): string {
  return getQueryString(req.query.groupCode).trim() || "public";
}

router.put<{
  year: string;
  month: string;
  day: string;
}>("/:year/:month/:day", requireAdminToken, (req, res) => {
  try {
    const { year, month, day } = req.params;
    const groupCode = getGroupCode(req);

    const savedContent = saveCalendarDayContent(groupCode, year, month, day, {
      ...req.body,
      enochYear: Number(year),
      month: Number(month),
      day: Number(day),
    });

    res.json(savedContent);
  } catch (error) {
    console.log("Failed to save calendar day content", error);

    res.status(500).json({
      error: "Failed to save calendar day content.",
    });
  }
});

router.delete<{
  year: string;
  month: string;
  day: string;
}>("/:year/:month/:day/notes", requireAdminToken, (req, res) => {
  try {
    const { year, month, day } = req.params;
    const groupCode = getGroupCode(req);
    const currentContent = getCalendarDayContent(groupCode, year, month, day);

    if (!currentContent) {
      return res.status(404).json({
        error: "Calendar day content not found.",
      });
    }

    const { notes: _notes, ...contentWithoutNotes } = currentContent;

    const savedContent = saveCalendarDayContent(
      groupCode,
      year,
      month,
      day,
      contentWithoutNotes
    );

    res.json(savedContent);
  } catch (error) {
    console.log("Failed to delete calendar day notes", error);

    res.status(500).json({
      error: "Failed to delete calendar day notes.",
    });
  }
});

/**
 * API endpoint: deletes one notice item from a selected calendar day.
 * Notice items live inside notice-style sections, so this keeps notes and scripture readings independent.
 */
router.delete<{
  year: string;
  month: string;
  day: string;
  index: string;
}>("/:year/:month/:day/notices/:index", requireAdminToken, (req, res) => {
  try {
    const { year, month, day, index } = req.params;
    const groupCode = getGroupCode(req);
    const currentContent = getCalendarDayContent(groupCode, year, month, day);
    const noticeIndex = Number(index);

    if (!currentContent) {
      return res.status(404).json({
        error: "Calendar day content not found.",
      });
    }

    const sections = currentContent.sections ?? [];
    const noticeSections = sections.filter(
      (section) => section.displayStyle === "notice"
    );
    const noticeItemCount = noticeSections.reduce(
      (count, section) => count + section.items.length,
      0
    );

    if (
      !Number.isInteger(noticeIndex) ||
      noticeIndex < 0 ||
      noticeIndex >= noticeItemCount
    ) {
      return res.status(400).json({
        error: "Invalid notice index.",
      });
    }

    let currentNoticeIndex = 0;
    const sectionsWithoutNotice = sections
      .map((section) => {
        if (section.displayStyle !== "notice") {
          return section;
        }

        const nextItems = section.items.filter(() => {
          const shouldKeep = currentNoticeIndex !== noticeIndex;
          currentNoticeIndex += 1;

          return shouldKeep;
        });

        return {
          ...section,
          items: nextItems,
        };
      })
      .filter(
        (section) =>
          section.displayStyle !== "notice" || section.items.length > 0
      );

    const savedContent = saveCalendarDayContent(groupCode, year, month, day, {
      ...currentContent,
      sections: sectionsWithoutNotice,
    });

    res.json(savedContent);
  } catch (error) {
    console.log("Failed to delete calendar day notice", error);

    res.status(500).json({
      error: "Failed to delete calendar day notice.",
    });
  }
});

router.delete<{
  year: string;
  month: string;
  day: string;
  index: string;
}>(
  "/:year/:month/:day/scripture-readings/:index",
  requireAdminToken,
  (req, res) => {
    try {
      const { year, month, day, index } = req.params;
      const groupCode = getGroupCode(req);
      const currentContent = getCalendarDayContent(groupCode, year, month, day);
      const scriptureIndex = Number(index);

      if (!currentContent) {
        return res.status(404).json({
          error: "Calendar day content not found.",
        });
      }

      if (
        !Number.isInteger(scriptureIndex) ||
        scriptureIndex < 0 ||
        !Array.isArray(currentContent.scriptureReadings) ||
        scriptureIndex >= currentContent.scriptureReadings.length
      ) {
        return res.status(400).json({
          error: "Invalid scripture reading index.",
        });
      }

      const savedContent = saveCalendarDayContent(groupCode, year, month, day, {
        ...currentContent,
        scriptureReadings: currentContent.scriptureReadings.filter(
          (_reading, readingIndex) => readingIndex !== scriptureIndex
        ),
      });

      res.json(savedContent);
    } catch (error) {
      console.log("Failed to delete scripture reading", error);

      res.status(500).json({
        error: "Failed to delete scripture reading.",
      });
    }
  }
);

export default router;
