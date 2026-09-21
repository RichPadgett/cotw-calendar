import { Router } from "express";
import {
  issueCalendarSubscriptionToken,
  joinOrCreateGroup,
  refreshMemberSession,
  verifyMemberToken,
} from "../services/groupStore";

const router = Router();

router.post("/join", (req, res) => {
  try {
    const { groupCode, adminCode, deviceName } = req.body;

    const result = joinOrCreateGroup({
      groupCode,
      adminCode,
      deviceName,
    });

    res.json(result);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to join group.";

    res.status(400).json({
      error: message,
    });
  }
});

router.post("/session", (req, res) => {
  const groupCode = String(req.body?.groupCode ?? "");
  const memberToken = refreshMemberSession(groupCode);

  if (!memberToken) {
    return res.status(404).json({ error: "Group not found." });
  }

  res.json({ groupCode: groupCode.trim().toLowerCase(), memberToken });
});

router.post("/calendar-subscription", (req, res) => {
  const groupCode = String(req.body?.groupCode ?? "")
    .trim()
    .toLowerCase();
  const memberToken = String(req.headers["x-cotw-session"] ?? "");

  if (
    groupCode === "public" ||
    !verifyMemberToken({ groupCode, token: memberToken })
  ) {
    return res.status(403).json({ error: "Group member access required." });
  }

  const calendarToken = issueCalendarSubscriptionToken(groupCode);
  if (!calendarToken) {
    return res.status(404).json({ error: "Group not found." });
  }

  res.json({ groupCode, calendarToken });
});

export default router;
