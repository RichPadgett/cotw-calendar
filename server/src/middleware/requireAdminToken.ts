import { NextFunction, Request, Response } from "express";
import { verifyAdminToken } from "../services/groupStore";

export function requireAdminToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const groupCode = String(req.query.groupCode ?? "public");

  const authHeader = req.headers.authorization ?? "";
  const token = authHeader.startsWith("Bearer ")
    ? authHeader.slice("Bearer ".length)
    : "";

  const isAllowed = verifyAdminToken({
    groupCode,
    token,
  });

  if (!isAllowed) {
    return res.status(403).json({
      error: "Admin access required.",
    });
  }

  next();
}
