import { Router } from "express";
import {
  getPerpetualMarkers,
  savePerpetualMarkers,
} from "../services/perpetualMarkerStore";
import { requireAdminTokenForGroup } from "../middleware/requireAdminToken";

const router = Router();
const PERPETUAL_MARKER_ADMIN_GROUP = "church-of-the-word";

router.get("/", (_req, res) => {
  try {
    res.json(getPerpetualMarkers());
  } catch (error) {
    console.log("Failed to load perpetual markers", error);

    res.status(500).json({
      error: "Failed to load perpetual markers.",
    });
  }
});

/*
  Perpetual markers are shared calendar metadata, not group-scoped content.
  Only the church-of-the-word admin token may update this system-wide file.
*/
router.post(
  "/",
  requireAdminTokenForGroup(PERPETUAL_MARKER_ADMIN_GROUP),
  (req, res) => {
    try {
      if (!Array.isArray(req.body)) {
        return res.status(400).json({
          error: "Expected an array of perpetual markers.",
        });
      }

      const saved = savePerpetualMarkers(req.body);

      res.json(saved);
    } catch (error) {
      console.log("Failed to save perpetual markers", error);

      res.status(500).json({
        error: "Failed to save perpetual markers.",
      });
    }
  }
);

export default router;
