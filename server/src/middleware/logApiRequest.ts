/*
 * File: server/src/middleware/logApiRequest.ts
 * Purpose: Express middleware for logging API request paths, status codes, timing, and safe request metadata.
 * Author: rpadgett
 */

import { NextFunction, Request, Response } from "express";

function getQueryValue(value: unknown): string {
  if (Array.isArray(value)) {
    return String(value[0] ?? "");
  }

  return String(value ?? "");
}

/**
 * Logs one API request after the response finishes.
 * This middleware intentionally records whether auth exists without printing bearer token values.
 */
export function logApiRequest(req: Request, res: Response, next: NextFunction) {
  const startedAt = Date.now();
  const groupCode = getQueryValue(req.query.groupCode).trim() || "public";
  const hasAuthHeader = Boolean(req.headers.authorization);
  const contentType = req.headers["content-type"] ?? "none";
  const contentLength = req.headers["content-length"] ?? "unknown";

  res.on("finish", () => {
    const durationMs = Date.now() - startedAt;

    console.log(
      [
        "[API]",
        req.method,
        req.originalUrl,
        `status=${res.statusCode}`,
        `duration=${durationMs}ms`,
        `group=${groupCode}`,
        `auth=${hasAuthHeader ? "present" : "missing"}`,
        `contentType=${contentType}`,
        `contentLength=${contentLength}`,
      ].join(" ")
    );
  });

  next();
}
