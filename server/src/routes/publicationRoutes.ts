import path from "node:path";
import { Router } from "express";
import multer from "multer";

import { requireAdminTokenForGroup } from "../middleware/requireAdminToken";
import {
  addPublicationFileSource,
  addPublicationSource,
  createPublicationProject,
  getPublicationFile,
  getPublicationProject,
  getPublicationUploadFolder,
  listPublicationProjects,
  updatePublicationProject,
} from "../services/publicationStore";

const router = Router();
const requireChurchAdmin = requireAdminTokenForGroup("church-of-the-word");

router.use(requireChurchAdmin);

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, _file, callback) => {
      try {
        callback(null, getPublicationUploadFolder(String(req.params.id)));
      } catch (error) {
        callback(error as Error, "");
      }
    },
    filename: (_req, file, callback) => {
      const extension = path.extname(file.originalname).toLowerCase();
      callback(null, `${Date.now()}-${Math.random().toString(36).slice(2)}${extension}`);
    },
  }),
  limits: { fileSize: 30 * 1024 * 1024 },
  fileFilter: (_req, file, callback) => {
    const allowed =
      file.mimetype.startsWith("image/") ||
      file.mimetype === "application/pdf" ||
      file.mimetype.startsWith("text/") ||
      [
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ].includes(file.mimetype);
    if (allowed) {
      callback(null, true);
    } else {
      callback(new Error("Unsupported publication file type."));
    }
  },
});

router.get("/", (_req, res) => res.json({ items: listPublicationProjects() }));

router.post("/", (req, res) => {
  res.status(201).json(createPublicationProject(req.body ?? {}));
});

router.get("/:id", (req, res) => {
  const project = getPublicationProject(String(req.params.id));
  if (!project) return res.status(404).json({ error: "Publication project not found." });
  res.json(project);
});

router.put("/:id", (req, res) => {
  const project = updatePublicationProject(String(req.params.id), req.body ?? {});
  if (!project) return res.status(404).json({ error: "Publication project not found." });
  res.json(project);
});

router.post("/:id/sources", (req, res) => {
  const source = addPublicationSource(String(req.params.id), req.body ?? {});
  if (!source) return res.status(404).json({ error: "Publication project not found." });
  res.status(201).json(source);
});

router.post("/:id/sources/upload", upload.single("file"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "A file is required." });
  const source = addPublicationFileSource(
    String(req.params.id),
    req.file,
    typeof req.body?.title === "string" ? req.body.title : undefined
  );
  if (!source) return res.status(404).json({ error: "Publication project not found." });
  res.status(201).json(source);
});

router.get("/:id/sources/:sourceId/file", (req, res) => {
  const result = getPublicationFile(String(req.params.id), String(req.params.sourceId));
  if (!result) return res.status(404).json({ error: "Publication file not found." });
  res.download(
    result.filePath,
    result.source.originalFileName ?? path.basename(result.filePath)
  );
});

router.post("/:id/model/prepare", (_req, res) => {
  if (!process.env.OPENAI_PUBLICATION_API_KEY) {
    return res.status(503).json({
      error: "Publisher AI is not configured yet.",
      setup: "Set OPENAI_PUBLICATION_API_KEY and OPENAI_PUBLICATION_MODEL on the server.",
    });
  }
  res.status(501).json({ error: "Publisher AI workflow is awaiting prompt approval." });
});

export default router;
