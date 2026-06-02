import { NextFunction, Request, Response } from "express";
import { verifyAdminToken } from "../services/groupStore";

function getBearerToken(req: Request) {
  const authHeader = req.headers.authorization ?? "";

  return authHeader.startsWith("Bearer ")
    ? authHeader.slice("Bearer ".length)
    : "";
}

export function requireAdminToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const groupCode = String(req.query.groupCode ?? "public");
  const token = getBearerToken(req);

  const isAllowed = verifyAdminToken({
    groupCode,
    token,
  });

  if (!isAllowed) {
    console.log(
      [
        "[AUTH]",
        "admin denied",
        `method=${req.method}`,
        `path=${req.originalUrl}`,
        `group=${groupCode}`,
        `auth=${token ? "present" : "missing"}`,
      ].join(" ")
    );

    return res.status(403).json({
      error: "Admin access required.",
    });
  }

  next();
}

export function requireAdminTokenForGroup(requiredGroupCode: string) {
  return function requireFixedGroupAdminToken(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const token = getBearerToken(req);

    const isAllowed = verifyAdminToken({
      groupCode: requiredGroupCode,
      token,
    });

    if (!isAllowed) {
      console.log(
        [
          "[AUTH]",
          "fixed-group admin denied",
          `method=${req.method}`,
          `path=${req.originalUrl}`,
          `group=${requiredGroupCode}`,
          `auth=${token ? "present" : "missing"}`,
        ].join(" ")
      );

      return res.status(403).json({
        error: "Admin access required.",
      });
    }

    next();
  };
}
