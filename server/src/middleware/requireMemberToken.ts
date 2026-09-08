import { NextFunction, Request, Response } from "express";
import { verifyMemberToken } from "../services/groupStore";

export function requireMemberTokenForGroup(requiredGroupCode: string) {
  return function requireFixedGroupMemberToken(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const token = String(req.headers["x-cotw-session"] ?? "");

    if (!verifyMemberToken({ groupCode: requiredGroupCode, token })) {
      return res.status(403).json({ error: "Group member access required." });
    }

    next();
  };
}
