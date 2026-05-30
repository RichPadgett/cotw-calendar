import cors from "cors";
import express from "express";

import adminCalendarRoutes from "./routes/adminCalendarRoutes";
import adminFileRoutes from "./routes/adminFileRoutes";
import calendarRoutes from "./routes/calendarRoutes";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Calendar API is running");
});

app.use("/api/calendar", calendarRoutes);
app.use("/api/admin/calendar", adminCalendarRoutes);
app.use("/api/admin/calendar", adminFileRoutes);
app.use("/files", express.static("content/files"));


/*
  ============================================================
  ROUTES
  ============================================================
*/

app.use("/api/calendar", calendarRoutes);

const PORT = 3001;

app.listen(PORT, () => {
  console.log(
    `Calendar API running on http://localhost:${PORT}`
  );
});
