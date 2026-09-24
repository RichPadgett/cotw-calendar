/*
 * File: server/src/routes/adminFileRoutes.ts
 * Purpose: Express route module for calendar and admin API endpoints.
 * Author: rpadgett
 */

// Dependencies
import { Router } from "express";
import fs from "fs";
import multer from "multer";
import path from "path";
import { requireAdminToken } from "../middleware/requireAdminToken";
import {
  getCalendarDayContent,
  saveCalendarDayContent,
  syncReplicatedCalendarContent,
} from "../services/calendarContentStore";
import { attachFileToCalendarContent } from "../services/calendarFileAttachment";

const router = Router();

// Helpers
/**
 * Normalizes route/query params that may arrive as strings or arrays.
 * This helper keeps file paths and group-code values stable for upload handling.
 */
function getParam(value: string | string[] | undefined): string {
  return Array.isArray(value) ? value[0] : (value ?? "");
}

/**
 * Reads the active group code from the admin upload request.
 * This route helper ensures uploaded files are stored under the correct group folder.
 */
function getGroupCode(req: any) {
  return String(req.query.groupCode ?? "public");
}

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, _file, cb) => {
      const groupCode = getGroupCode(req);
      const year = getParam(req.params.year);
      const month = getParam(req.params.month);
      const day = getParam(req.params.day);

      const folder = path.join(
        process.cwd(),
        "content",
        "groups",
        groupCode,
        "files",
        year,
        month,
        day
      );

      fs.mkdirSync(folder, { recursive: true });

      cb(null, folder);
    },

    filename: (_req, file, cb) => {
      const safeName = file.originalname.replace(/[^a-zA-Z0-9._-]/g, "_");

      cb(null, `${Date.now()}-${safeName}`);
    },
  }),
});

/**
 * API endpoint: accepts a single uploaded file for one Enoch day.
 * This protected upload endpoint requires a valid admin bearer token before storing files.
 */
router.post(
  "/:year/:month/:day/files",
  requireAdminToken,
  upload.single("file"),
  (req, res) => {
    const year = getParam(req.params.year);
    const month = getParam(req.params.month);
    const day = getParam(req.params.day);
    const groupCode = getGroupCode(req);

    if (!req.file) {
      console.log(
        [
          "[UPLOAD]",
          "no file received",
          `group=${groupCode}`,
          `year=${year}`,
          `month=${month}`,
          `day=${day}`,
        ].join(" ")
      );

      return res.status(400).json({
        error: "No file uploaded.",
      });
    }

    const uploadedUrl = `/api/files/groups/${groupCode}/files/${year}/${month}/${day}/${req.file.filename}`;

    try {
      const currentContent = getCalendarDayContent(
        groupCode,
        year,
        month,
        day
      ) ?? {
        enochYear: Number(year),
        month: Number(month),
        day: Number(day),
        title: `Month ${month} Day ${day}`,
        sections: [],
      };
      const savedContent = saveCalendarDayContent(
        groupCode,
        year,
        month,
        day,
        attachFileToCalendarContent(currentContent, {
          originalName: req.file.originalname,
          url: uploadedUrl,
          mimeType: req.file.mimetype,
          sizeBytes: req.file.size,
          uploadedAt: new Date().toISOString(),
        })
      );
      syncReplicatedCalendarContent(groupCode, year, month, day, savedContent);
    } catch (error) {
      fs.rmSync(req.file.path, { force: true });
      console.log("Failed to attach uploaded file to calendar day", error);

      return res.status(500).json({
        error: "The file could not be attached to the calendar day.",
      });
    }

    console.log(
      [
        "[UPLOAD]",
        "stored file",
        `group=${groupCode}`,
        `year=${year}`,
        `month=${month}`,
        `day=${day}`,
        `filename=${req.file.filename}`,
        `size=${req.file.size}`,
        `url=${uploadedUrl}`,
      ].join(" ")
    );

    res.json({
      filename: req.file.filename,
      url: uploadedUrl,
      saved: true,
    });
  }
);

export default router;
