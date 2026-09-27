import path from "node:path";
import { Router } from "express";
import multer from "multer";

import { requireAdminTokenForGroup } from "../middleware/requireAdminToken";
import {
  addPublicationFileSource,
  addPublicationModelRun,
  addPublicationSource,
  createPublicationProject,
  getPublicationFile,
  getPublicationProject,
  getPublicationUploadFolder,
  listPublicationProjects,
  reviewPublicationModelRun,
  updatePublicationModelProposal,
  updatePublicationProject,
} from "../services/publicationStore";
import {
  getTeachingTranscript,
  runPublicationModel,
} from "../services/publicationAiService";
import type { PublicationModelOperation } from "../types/publication";

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
      callback(
        null,
        `${Date.now()}-${Math.random().toString(36).slice(2)}${extension}`
      );
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
  if (!project)
    return res.status(404).json({ error: "Publication project not found." });
  res.json(project);
});

router.put("/:id", (req, res) => {
  const project = updatePublicationProject(
    String(req.params.id),
    req.body ?? {}
  );
  if (!project)
    return res.status(404).json({ error: "Publication project not found." });
  res.json(project);
});

router.post("/:id/sources", (req, res) => {
  const source = addPublicationSource(String(req.params.id), req.body ?? {});
  if (!source)
    return res.status(404).json({ error: "Publication project not found." });
  res.status(201).json(source);
});

router.post("/:id/sources/upload", upload.single("file"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "A file is required." });
  const source = addPublicationFileSource(
    String(req.params.id),
    req.file,
    typeof req.body?.title === "string" ? req.body.title : undefined
  );
  if (!source)
    return res.status(404).json({ error: "Publication project not found." });
  res.status(201).json(source);
});

router.get("/:id/sources/:sourceId/preview", async (req, res, next) => {
  try {
    const project = getPublicationProject(String(req.params.id));
    if (!project)
      return res.status(404).json({ error: "Publication project not found." });
    const source = project.sources.find(
      (item) => item.id === String(req.params.sourceId)
    );
    if (!source)
      return res.status(404).json({ error: "Publication source not found." });

    const content =
      source.type === "teaching" && source.recordingId
        ? await getTeachingTranscript(source.recordingId)
        : (source.content ?? source.notes ?? source.url ?? "");

    res.json({ source, content, hasFile: Boolean(source.storedFileName) });
  } catch (error) {
    next(error);
  }
});

router.get("/:id/sources/:sourceId/file", (req, res) => {
  const result = getPublicationFile(
    String(req.params.id),
    String(req.params.sourceId)
  );
  if (!result)
    return res.status(404).json({ error: "Publication file not found." });
  res.download(
    result.filePath,
    result.source.originalFileName ?? path.basename(result.filePath)
  );
});

router.post("/:id/model/run", async (req, res) => {
  try {
    const allowedOperations = new Set<PublicationModelOperation>([
      "clean",
      "outline",
      "draft",
      "verify",
    ]);
    const operation = String(
      req.body?.operation ?? ""
    ) as PublicationModelOperation;
    if (!allowedOperations.has(operation)) {
      return res.status(400).json({ error: "Unknown Publisher AI operation." });
    }
    const run = await runPublicationModel({
      projectId: String(req.params.id),
      operation,
      chapterId:
        typeof req.body?.chapterId === "string"
          ? req.body.chapterId
          : undefined,
      sectionId:
        typeof req.body?.sectionId === "string"
          ? req.body.sectionId
          : undefined,
      sourceIds: Array.isArray(req.body?.sourceIds)
        ? req.body.sourceIds.filter(
            (id: unknown): id is string => typeof id === "string"
          )
        : undefined,
      instructions:
        typeof req.body?.instructions === "string"
          ? req.body.instructions
          : undefined,
    });
    addPublicationModelRun(String(req.params.id), run);
    res.status(201).json(run);
  } catch (error) {
    console.error("Publisher AI run failed", error);
    res.status(502).json({
      error:
        error instanceof Error ? error.message : "Publisher AI run failed.",
    });
  }
});

router.post("/:id/model-runs/:runId/review", (req, res) => {
  const decision = req.body?.decision;
  if (decision !== "accepted" && decision !== "rejected") {
    return res
      .status(400)
      .json({ error: "Decision must be accepted or rejected." });
  }
  const project = reviewPublicationModelRun(
    String(req.params.id),
    String(req.params.runId),
    decision
  );
  if (!project) {
    return res.status(404).json({ error: "Pending model proposal not found." });
  }
  res.json(project);
});

router.put("/:id/model-runs/:runId", (req, res) => {
  const project = updatePublicationModelProposal(
    String(req.params.id),
    String(req.params.runId),
    {
      proposedParts: req.body?.proposedParts,
      editorCritique: req.body?.editorCritique,
    }
  );
  if (!project) {
    return res.status(404).json({ error: "Pending model proposal not found." });
  }
  res.json(project);
});

export default router;
