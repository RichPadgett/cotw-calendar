/*
 * File: server/src/routes/adminSpotifyRoutes.ts
 * Purpose: Express route module for fetching Spotify episode details to speed up
 * weekly Shabbat-teaching calendar-day uploads.
 */

import { Router } from "express";

import { requireAdminToken } from "../middleware/requireAdminToken";
import { getSpotifyEpisodeDetails } from "../services/spotifyEpisodeService";

const router = Router();

router.get("/spotify-episode", requireAdminToken, async (req, res) => {
  try {
    const input = String(req.query.url ?? "").trim();

    if (!input) {
      return res.status(400).json({ error: "A Spotify episode URL is required." });
    }

    const details = await getSpotifyEpisodeDetails(input);

    res.json(details);
  } catch (error) {
    console.log("Failed to fetch Spotify episode details", error);

    res.status(500).json({
      error:
        error instanceof Error
          ? error.message
          : "Failed to fetch Spotify episode details.",
    });
  }
});

export default router;
