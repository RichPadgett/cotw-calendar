/*
 * File: server/src/routes/commandResourceRoutes.ts
 * Purpose: Express routes for command resources backed by the Prolog command engine.
 */

import { NextFunction, Request, Response, Router } from "express";

import { requireAdminTokenForGroup } from "../middleware/requireAdminToken";
import {
  approveCommandContribution,
  commandContributionModes,
  commandContributionStatuses,
  commandContributionTypes,
  CommandContributionStatus,
  createCommandContribution,
  deleteCommandContribution,
  getContributionGroupCode,
  listCommandContributions,
  promoteCommandContribution,
  rejectCommandContribution,
  updateCommandContribution,
  withdrawCommandContribution,
} from "../services/commandContributionStore";
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
const requireCommandContributionAdmin = requireAdminTokenForGroup(
  getContributionGroupCode()
);

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

function getRequestText(value: unknown) {
  return typeof value === "string" ? value : "";
}

function getRouteParam(value: string | string[]) {
  return Array.isArray(value) ? value[0] : value;
}

function getContributionStatus(
  value: unknown
): CommandContributionStatus | "all" {
  if (typeof value !== "string") return "approved";

  if (value === "all") {
    return "all";
  }

  return commandContributionStatuses.includes(value as CommandContributionStatus)
    ? (value as CommandContributionStatus)
    : "approved";
}

function handleContributionError(res: Response, error: unknown) {
  res.status(400).json({
    error:
      error instanceof Error
        ? error.message
        : "Failed to update command contribution.",
  });
}

function requireContributionMember(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const groupCode =
    getRequestText(req.query.groupCode) || getRequestText(req.body.groupCode);

  if (groupCode !== getContributionGroupCode()) {
    return res.status(403).json({
      error: "Church of the Word membership is required to submit suggestions.",
    });
  }

  next();
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

router.get("/contributions/types", (_req, res) => {
  res.json({
    types: commandContributionTypes,
    modes: commandContributionModes,
    statuses: commandContributionStatuses,
    writableGroupCode: getContributionGroupCode(),
  });
});

router.get("/contributions/visible", (_req, res) => {
  try {
    res.json({
      contributions: listCommandContributions({
        status: "pending",
      }),
    });
  } catch (error) {
    handleContributionError(res, error);
  }
});

router.get("/contributions", requireCommandContributionAdmin, (req, res) => {
  try {
    res.json({
      contributions: listCommandContributions({
        commandKey: getRequestText(req.query.commandKey) || undefined,
        status: getContributionStatus(req.query.status),
        includeDeleted: req.query.includeDeleted === "true",
        promoted:
          req.query.promoted === "true"
            ? true
            : req.query.promoted === "false"
            ? false
            : undefined,
      }),
    });
  } catch (error) {
    handleContributionError(res, error);
  }
});

router.put(
  "/contributions/:contributionId",
  requireCommandContributionAdmin,
  (req, res) => {
    try {
      res.json({
        contribution: updateCommandContribution(
          getRouteParam(req.params.contributionId),
          {
            mode: getRequestText(req.body.mode) || undefined,
            type: getRequestText(req.body.type) || undefined,
            text: getRequestText(req.body.text) || undefined,
            suggestedText: getRequestText(req.body.suggestedText) || undefined,
            reason: getRequestText(req.body.reason) || undefined,
            target: req.body.target,
            status: getRequestText(req.body.status) || undefined,
            updatedBy: getRequestText(req.body.updatedBy) || undefined,
          }
        ),
      });
    } catch (error) {
      handleContributionError(res, error);
    }
  }
);

router.delete(
  "/contributions/:contributionId",
  requireCommandContributionAdmin,
  (req, res) => {
    try {
      res.json({
        contribution: deleteCommandContribution(
          getRouteParam(req.params.contributionId),
          getRequestText(req.body.updatedBy) || undefined
        ),
      });
    } catch (error) {
      handleContributionError(res, error);
    }
  }
);

router.post(
  "/contributions/:contributionId/approve",
  requireCommandContributionAdmin,
  (req, res) => {
    try {
      res.json({
        contribution: approveCommandContribution(
          getRouteParam(req.params.contributionId),
          getRequestText(req.body.updatedBy) || undefined
        ),
      });
    } catch (error) {
      handleContributionError(res, error);
    }
  }
);

router.post(
  "/contributions/:contributionId/reject",
  requireCommandContributionAdmin,
  (req, res) => {
    try {
      res.json({
        contribution: rejectCommandContribution(
          getRouteParam(req.params.contributionId),
          getRequestText(req.body.updatedBy) || undefined
        ),
      });
    } catch (error) {
      handleContributionError(res, error);
    }
  }
);

router.post(
  "/contributions/:contributionId/promote",
  requireCommandContributionAdmin,
  (req, res) => {
    try {
      res.json({
        contribution: promoteCommandContribution({
          id: getRouteParam(req.params.contributionId),
          promotedBy: getRequestText(req.body.promotedBy),
          official:
            typeof req.body.official === "object" && req.body.official !== null
              ? req.body.official
              : {},
        }),
      });
    } catch (error) {
      handleContributionError(res, error);
    }
  }
);

router.get("/:commandKey/contributions", (req, res) => {
  try {
    const requestedStatus = getContributionStatus(req.query.status);

    res.json({
      contributions: listCommandContributions({
        commandKey: getRouteParam(req.params.commandKey),
        status: requestedStatus === "pending" ? "pending" : "approved",
      }),
    });
  } catch (error) {
    handleContributionError(res, error);
  }
});

router.delete(
  "/:commandKey/contributions/:contributionId",
  requireContributionMember,
  (req, res) => {
    try {
      res.json({
        contribution: withdrawCommandContribution({
          commandKey: getRouteParam(req.params.commandKey),
          id: getRouteParam(req.params.contributionId),
          username:
            getRequestText(req.query.username) || getRequestText(req.body.username),
        }),
      });
    } catch (error) {
      handleContributionError(res, error);
    }
  }
);

router.post(
  "/:commandKey/contributions",
  requireContributionMember,
  (req, res) => {
    try {
      res.status(201).json({
        contribution: createCommandContribution({
          commandKey: getRouteParam(req.params.commandKey),
          mode: getRequestText(req.body.mode) || undefined,
          type: getRequestText(req.body.type),
          text: getRequestText(req.body.text),
          suggestedText: getRequestText(req.body.suggestedText) || undefined,
          reason: getRequestText(req.body.reason) || undefined,
          target: req.body.target,
          createdBy: getRequestText(req.body.createdBy),
        }),
      });
    } catch (error) {
      handleContributionError(res, error);
    }
  }
);

router.get("/:commandKey", async (req, res) => {
  try {
    res.json(await getCommandResource(getRouteParam(req.params.commandKey)));
  } catch (error) {
    console.log("Failed to load command resource", error);

    res.status(400).json({
      error:
        error instanceof Error ? error.message : "Invalid command resource.",
    });
  }
});

export default router;
