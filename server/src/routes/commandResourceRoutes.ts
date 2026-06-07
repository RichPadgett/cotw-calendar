/*
 * File: server/src/routes/commandResourceRoutes.ts
 * Purpose: Express routes for command resources backed by the Prolog command engine.
 */

import { Router } from "express";

import {
  evaluateCommandResource,
  getCommandResource,
  listCommandResources,
} from "../services/prologCommandResource";

const router = Router();

router.get("/", async (_req, res) => {
  try {
    res.json(await listCommandResources());
  } catch (error) {
    console.log("Failed to list command resources", error);

    res.status(500).json({
      error: "Failed to list command resources.",
    });
  }
});

router.get("/:commandKey", async (req, res) => {
  try {
    res.json(await getCommandResource(req.params.commandKey));
  } catch (error) {
    console.log("Failed to load command resource", error);

    res.status(400).json({
      error: error instanceof Error ? error.message : "Invalid command resource.",
    });
  }
});

router.post("/:commandKey/evaluate", async (req, res) => {
  try {
    res.json(await evaluateCommandResource(req.params.commandKey, req.body));
  } catch (error) {
    console.log("Failed to evaluate command resource", error);

    res.status(400).json({
      error:
        error instanceof Error ? error.message : "Invalid command evaluation.",
    });
  }
});

export default router;
