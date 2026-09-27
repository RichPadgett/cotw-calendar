/*
 * File: server/src/index.ts
 * Purpose: Local Express server entry point for calendar APIs, admin routes, file uploads, and static content.
 * Author: rpadgett
 */

import "dotenv/config";

import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import path from "node:path";

import { logApiRequest } from "./middleware/logApiRequest";
import adminCalendarRoutes from "./routes/adminCalendarRoutes";
import adminFileRoutes from "./routes/adminFileRoutes";
import adminSpotifyRoutes from "./routes/adminSpotifyRoutes";
import calendarRoutes from "./routes/calendarRoutes";
import commandResourceRoutes from "./routes/commandResourceRoutes";
import groupRoutes from "./routes/groupRoutes";
import hebrewRoutes from "./routes/hebrewRoutes";
import perpetualMarkerRoutes from "./routes/perpetualMarkerRoutes";
import shabbatRecordingRoutes from "./routes/shabbatRecordingRoutes";
import shabbatRoutes from "./routes/shabbatRoutes";
import timelineRoutes from "./routes/timelineRoutes";
import studyboxLibraryRoutes from "./routes/studyboxLibraryRoutes";

dotenv.config({ path: process.env.STUDYBOX_LIBRARY_ENV_FILE ?? "/etc/studybox/cloud-library.env" });

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", logApiRequest);

app.get("/", (_req, res) => {
  res.send("Calendar API is running");
});

app.use("/library", express.static(path.join(process.cwd(), "public/studybox-library"), { index: "library.html" }));

app.use("/api/calendar", calendarRoutes);
app.use("/api/command-resources", commandResourceRoutes);
app.use("/api/admin/calendar", adminCalendarRoutes);
app.use("/api/admin/calendar", adminFileRoutes);
app.use("/api/admin/calendar", adminSpotifyRoutes);
app.use("/api/files", express.static("content"));
app.use("/files", express.static("content/files"));
app.use("/api/groups", groupRoutes);
app.use("/api/shabbat", shabbatRoutes);
app.use("/api/shabbat/recordings", shabbatRecordingRoutes);
app.use("/api/hebrew", hebrewRoutes);
app.use("/api/calendar/perpetual-markers", perpetualMarkerRoutes);
app.use("/api/timeline", timelineRoutes);
app.use("/api/library", studyboxLibraryRoutes);

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Calendar API running on http://localhost:${PORT}`);
});
