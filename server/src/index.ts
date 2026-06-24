/*
 * File: server/src/index.ts
 * Purpose: Local Express server entry point for calendar APIs, admin routes, file uploads, and static content.
 * Author: rpadgett
 */

import cors from "cors";
import express from "express";

import { logApiRequest } from "./middleware/logApiRequest";
import adminCalendarRoutes from "./routes/adminCalendarRoutes";
import adminFileRoutes from "./routes/adminFileRoutes";
import calendarRoutes from "./routes/calendarRoutes";
import commandResourceRoutes from "./routes/commandResourceRoutes";
import groupRoutes from "./routes/groupRoutes";
import perpetualMarkerRoutes from "./routes/perpetualMarkerRoutes";
import solarRoutes from "./routes/solarRoutes";
import timelineRoutes from "./routes/timelineRoutes";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", logApiRequest);

app.get("/", (_req, res) => {
  res.send("Calendar API is running");
});

app.use("/api/calendar", calendarRoutes);
app.use("/api/command-resources", commandResourceRoutes);
app.use("/api/admin/calendar", adminCalendarRoutes);
app.use("/api/admin/calendar", adminFileRoutes);
app.use("/api/files", express.static("content"));
app.use("/files", express.static("content/files"));
app.use("/api/groups", groupRoutes);
app.use("/api/calendar/perpetual-markers", perpetualMarkerRoutes);
app.use("/api/solar", solarRoutes);
app.use("/api/timeline", timelineRoutes);

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Calendar API running on http://localhost:${PORT}`);
});
