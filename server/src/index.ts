import express from "express";
import cors from "cors";

import calendarRoutes from "./routes/calendarRoutes";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Calendar API is running");
});

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
