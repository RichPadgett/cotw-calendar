import path from "path";
import { Router } from "express";
import { requireMemberTokenForGroup } from "../middleware/requireMemberToken";
import {
  consumeRecordingDownloadTicket,
  createRecordingDownloadTicket,
  listShabbatRecordings,
} from "../services/shabbatRecordingStore";

const router = Router();
const requireChurchMember = requireMemberTokenForGroup("church-of-the-word");

router.get("/", requireChurchMember, (_req, res) => {
  try {
    res.json(listShabbatRecordings());
  } catch (error) {
    console.error("Failed to list Shabbat recordings", error);
    res.status(500).json({ error: "Unable to load recordings." });
  }
});

router.post(
  "/:bundleId/files/:fileName/ticket",
  requireChurchMember,
  (req, res) => {
    const ticket = createRecordingDownloadTicket(
      String(req.params.bundleId),
      String(req.params.fileName)
    );

    if (!ticket) {
      return res.status(404).json({ error: "Recording file not found." });
    }

    res.json({ downloadPath: `/api/shabbat/recordings/download/${ticket}` });
  }
);

router.get("/download/:ticket", (req, res) => {
  const filePath = consumeRecordingDownloadTicket(String(req.params.ticket));

  if (!filePath) {
    return res.status(404).send("This download link has expired.");
  }

  res.download(filePath, path.basename(filePath));
});

export default router;
