/*
 * File: server/src/routes/timelineRoutes.ts
 * Purpose: Express routes for timeline occurrence persistence.
 */

import { Router } from "express";
import {
  getTimelineOccurrences,
  saveTimelineOccurrences,
} from "../services/timelineOccurrenceStore";
import { requireAdminTokenForGroup } from "../middleware/requireAdminToken";

const router = Router();
const TIMELINE_ADMIN_GROUP = "church-of-the-word";

router.use((_req, res, next) => {
  res.set("Cache-Control", "no-store");
  next();
});

router.get("/occurrences", (_req, res) => {
  try {
    res.json(getTimelineOccurrences());
  } catch (error) {
    console.log("Failed to load timeline occurrences", error);

    res.status(500).json({
      error: "Failed to load timeline occurrences.",
    });
  }
});

/*
  Timeline occurrences are shared history metadata.
  Anyone may read them, but only the church-of-the-word admin token may update them.
*/
router.post(
  "/occurrences",
  requireAdminTokenForGroup(TIMELINE_ADMIN_GROUP),
  (req, res) => {
    try {
      if (!Array.isArray(req.body)) {
        return res.status(400).json({
          error: "Expected an array of timeline occurrences.",
        });
      }

      const saved = saveTimelineOccurrences(req.body);

      res.json(saved);
    } catch (error) {
      console.log("Failed to save timeline occurrences", error);

      res.status(500).json({
        error: "Failed to save timeline occurrences.",
      });
    }
  }
);

export default router;
