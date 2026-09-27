import { NextFunction, Request, Response } from "express";
import { verifyMemberToken } from "../services/groupStore";

export function requireMemberTokenForGroup(requiredGroupCode: string) {
  return function requireFixedGroupMemberToken(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const token =
      String(req.headers["x-cotw-session"] ?? "") ||
      getCookie(req, "cotw-member-session");

    if (!verifyMemberToken({ groupCode: requiredGroupCode, token })) {
      return res.status(403).json({ error: "Group member access required." });
    }

    next();
  };
}

function getCookie(req: Request, name: string): string {
  const cookieHeader = req.headers.cookie ?? "";
  const entry = cookieHeader
    .split(";")
    .map((value) => value.trim())
    .find((value) => value.startsWith(`${name}=`));

  return entry ? decodeURIComponent(entry.slice(name.length + 1)) : "";
}
