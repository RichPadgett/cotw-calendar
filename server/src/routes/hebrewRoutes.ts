/*
 * File: server/src/routes/hebrewRoutes.ts
 * Purpose: Express route module for the Hebrew Letter Study section
 * (alphabet + searchable, admin-editable glossary).
 */

import { Router } from "express";

import { requireAdminToken } from "../middleware/requireAdminToken";
import {
  addGlossaryTerm,
  deleteGlossaryTerm,
  updateGlossaryTerm,
} from "../services/hebrewGlossaryStore";
import {
  listGlossaryTerms,
  listHebrewAlphabet,
} from "../services/hebrewStudyService";

const router = Router();

router.get("/alphabet", async (_req, res) => {
  try {
    res.json(await listHebrewAlphabet());
  } catch (error) {
    console.log("Failed to load Hebrew alphabet", error);
    res.status(500).json({ error: "Failed to load Hebrew alphabet." });
  }
});

router.get("/glossary", async (req, res) => {
  try {
    const search =
      typeof req.query.search === "string" ? req.query.search : undefined;
    const language =
      typeof req.query.language === "string" ? req.query.language : undefined;

    res.json(await listGlossaryTerms(search, language));
  } catch (error) {
    console.log("Failed to load Hebrew glossary", error);
    res.status(500).json({ error: "Failed to load Hebrew glossary." });
  }
});

router.post("/glossary", requireAdminToken, (req, res) => {
  try {
    const result = addGlossaryTerm(req.body);
    res.json(result);
  } catch (error) {
    res.status(400).json({
      error:
        error instanceof Error ? error.message : "Failed to add glossary term.",
    });
  }
});

router.put("/glossary/:key", requireAdminToken, (req, res) => {
  try {
    const result = updateGlossaryTerm(String(req.params.key), req.body);
    res.json(result);
  } catch (error) {
    res.status(400).json({
      error:
        error instanceof Error
          ? error.message
          : "Failed to update glossary term.",
    });
  }
});

router.delete("/glossary/:key", requireAdminToken, (req, res) => {
  try {
    const result = deleteGlossaryTerm(String(req.params.key));
    res.json(result);
  } catch (error) {
    res.status(400).json({
      error:
        error instanceof Error
          ? error.message
          : "Failed to delete glossary term.",
    });
  }
});

export default router;
