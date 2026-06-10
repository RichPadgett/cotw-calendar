/*
 * File: server/src/routes/commandResourceRoutes.ts
 * Purpose: Express routes for command resources backed by the Prolog command engine.
 */

import { Router } from "express";

import {
  getCommandResourceApplicability,
  getCommandResourceCategories,
  getCommandResourceFacts,
  getCommandResource,
  getCommandResourcesGroupedByCategory,
  getRandomCommandResource,
  getRandomCommandResourceCategory,
  getRandomCommandResourceInRandomCategory,
  listCommandResources,
} from "../services/prologCommandResource";

const router = Router();

function getCatalogFilters(req: { query: Record<string, unknown> }) {
  return {
    category:
      typeof req.query.category === "string" ? req.query.category : undefined,
    fact: typeof req.query.fact === "string" ? req.query.fact : undefined,
    facts:
      typeof req.query.facts === "string"
        ? req.query.facts
            .split(",")
            .map((fact) => fact.trim())
            .filter(Boolean)
        : undefined,
    appliesIf:
      typeof req.query.appliesIf === "string" ? req.query.appliesIf : undefined,
  };
}

router.get("/", async (req, res) => {
  try {
    res.json(await listCommandResources(getCatalogFilters(req)));
  } catch (error) {
    console.log("Failed to list command resources", error);

    res.status(400).json({
      error:
        error instanceof Error
          ? error.message
          : "Failed to list command resources.",
    });
  }
});

router.get("/categories/commands", async (_req, res) => {
  try {
    res.json(await getCommandResourcesGroupedByCategory());
  } catch (error) {
    console.log("Failed to list command categories with commands", error);

    res.status(500).json({
      error: "Failed to list command categories with commands.",
    });
  }
});

router.get("/categories", async (_req, res) => {
  try {
    res.json(await getCommandResourceCategories());
  } catch (error) {
    console.log("Failed to list command categories", error);

    res.status(500).json({
      error: "Failed to list command categories.",
    });
  }
});

router.get("/facts", async (_req, res) => {
  try {
    res.json(await getCommandResourceFacts());
  } catch (error) {
    console.log("Failed to list command facts", error);

    res.status(500).json({
      error: "Failed to list command facts.",
    });
  }
});

router.get("/applicability", async (_req, res) => {
  try {
    res.json(await getCommandResourceApplicability());
  } catch (error) {
    console.log("Failed to list command applicability", error);

    res.status(500).json({
      error: "Failed to list command applicability.",
    });
  }
});

router.get("/random", async (req, res) => {
  try {
    res.json(await getRandomCommandResource(getCatalogFilters(req)));
  } catch (error) {
    console.log("Failed to load random command resource", error);

    res.status(400).json({
      error:
        error instanceof Error
          ? error.message
          : "Failed to load random command resource.",
    });
  }
});

router.get("/random/category", async (_req, res) => {
  try {
    res.json(await getRandomCommandResourceCategory());
  } catch (error) {
    console.log("Failed to load random command category", error);

    res.status(500).json({
      error: "Failed to load random command category.",
    });
  }
});

router.get("/random/category-command", async (_req, res) => {
  try {
    res.json(await getRandomCommandResourceInRandomCategory());
  } catch (error) {
    console.log("Failed to load random command from random category", error);

    res.status(500).json({
      error: "Failed to load random command from random category.",
    });
  }
});

router.get("/:commandKey", async (req, res) => {
  try {
    res.json(await getCommandResource(req.params.commandKey));
  } catch (error) {
    console.log("Failed to load command resource", error);

    res.status(400).json({
      error:
        error instanceof Error ? error.message : "Invalid command resource.",
    });
  }
});

export default router;
