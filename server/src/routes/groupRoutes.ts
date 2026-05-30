import { Router } from "express";
import { joinOrCreateGroup } from "../services/groupStore";

const router = Router();

router.post("/join", (req, res) => {
  try {
    const { groupCode, adminCode } = req.body;

    const result = joinOrCreateGroup({
      groupCode,
      adminCode,
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

export default router;
