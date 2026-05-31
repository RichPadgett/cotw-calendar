import { Router } from "express";
import {
  getPerpetualMarkers,
  savePerpetualMarkers,
} from "../services/perpetualMarkerStore";

const router = Router();

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

router.post("/", (req, res) => {
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
});

export default router;
