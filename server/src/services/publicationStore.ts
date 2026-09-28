import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

import type {
  PublicationChapter,
  PublishedPublication,
  PublicationProject,
  PublicationModelRun,
  PublicationReviewNote,
  PublicationSource,
  PublicationSourceType,
} from "../types/publication";

const PUBLICATION_ROOT =
  process.env.COTW_PUBLICATION_ROOT ??
  path.join(process.cwd(), "content/groups/church-of-the-word/publications");

const RELEASE_ROOT = path.join(PUBLICATION_ROOT, "releases");

function ensureRoot() {
  fs.mkdirSync(PUBLICATION_ROOT, { recursive: true });
}

function projectPath(projectId: string) {
  if (!/^[a-f0-9-]{36}$/.test(projectId)) return null;
  return path.join(PUBLICATION_ROOT, `${projectId}.json`);
}

function normalizeText(value: unknown, fallback = "") {
  return typeof value === "string" ? value.trim() : fallback;
}

function writeProject(project: PublicationProject) {
  ensureRoot();
  const filePath = projectPath(project.id);
  if (!filePath) throw new Error("Invalid publication project id.");
  fs.writeFileSync(filePath, `${JSON.stringify(project, null, 2)}\n`, "utf8");
  return project;
}

function ensureReleaseRoot() {
  fs.mkdirSync(RELEASE_ROOT, { recursive: true });
}

function releasePath(releaseId: string) {
  if (!/^[a-f0-9-]{36}$/.test(releaseId)) return null;
  return path.join(RELEASE_ROOT, `${releaseId}.json`);
}

function readPublicationReleases() {
  ensureReleaseRoot();
  return fs
    .readdirSync(RELEASE_ROOT, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith(".json"))
    .flatMap((entry) => {
      try {
        return [
          JSON.parse(
            fs.readFileSync(path.join(RELEASE_ROOT, entry.name), "utf8")
          ) as PublishedPublication,
        ];
      } catch {
        return [];
      }
    });
}

export function listPublishedPublications() {
  const latestByProject = new Map<string, PublishedPublication>();
  for (const release of readPublicationReleases().sort((left, right) =>
    right.publishedAt.localeCompare(left.publishedAt)
  )) {
    if (!latestByProject.has(release.projectId)) {
      latestByProject.set(release.projectId, release);
    }
  }
  return [...latestByProject.values()].map((release) => ({
    id: release.id,
    projectId: release.projectId,
    title: release.title,
    description: release.description,
    author: release.author,
    edition: release.edition,
    publishedAt: release.publishedAt,
    chapterCount: release.chapters.length,
  }));
}

export function getPublishedPublication(releaseId: string) {
  const filePath = releasePath(releaseId);
  if (!filePath || !fs.existsSync(filePath)) return null;
  return JSON.parse(fs.readFileSync(filePath, "utf8")) as PublishedPublication;
}

export function publishPublicationProject(projectId: string) {
  const project = getPublicationProject(projectId);
  if (!project) return null;
  const priorEditions = readPublicationReleases().filter(
    (release) => release.projectId === projectId
  );
  const publishedAt = new Date().toISOString();
  const release: PublishedPublication = {
    ...JSON.parse(JSON.stringify(project)),
    id: crypto.randomUUID(),
    projectId,
    edition:
      priorEditions.reduce(
        (highest, item) => Math.max(highest, item.edition),
        0
      ) + 1,
    status: "published",
    publishedAt,
    updatedAt: publishedAt,
  };
  ensureReleaseRoot();
  const filePath = releasePath(release.id);
  if (!filePath) throw new Error("Invalid publication release id.");
  fs.writeFileSync(filePath, `${JSON.stringify(release, null, 2)}\n`, "utf8");
  project.status = "published";
  project.updatedAt = publishedAt;
  writeProject(project);
  return release;
}

export function listPublicationProjects() {
  ensureRoot();
  return fs
    .readdirSync(PUBLICATION_ROOT, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith(".json"))
    .flatMap((entry) => {
      try {
        return [
          JSON.parse(
            fs.readFileSync(path.join(PUBLICATION_ROOT, entry.name), "utf8")
          ) as PublicationProject,
        ];
      } catch {
        return [];
      }
    })
    .sort((left, right) => right.updatedAt.localeCompare(left.updatedAt))
    .map(
      ({
        sources,
        parts = [],
        chapters,
        reviewNotes,
        modelRuns = [],
        ...project
      }) => ({
        ...project,
        sourceCount: sources.length,
        chapterCount: chapters.length,
        partCount: parts.length,
        openReviewCount: reviewNotes.filter((note) => !note.resolved).length,
        proposedRunCount: modelRuns.filter((run) => run.status === "proposed")
          .length,
      })
    );
}

export function getPublicationProject(projectId: string) {
  const filePath = projectPath(projectId);
  if (!filePath || !fs.existsSync(filePath)) return null;
  const project = JSON.parse(
    fs.readFileSync(filePath, "utf8")
  ) as PublicationProject;
  project.modelRuns ??= [];
  project.parts ??= [];
  project.chapters = project.chapters.map((chapter) => ({
    ...chapter,
    sections: (chapter.sections ?? []).map((section) => ({
      ...section,
      manuscript: section.manuscript ?? "",
    })),
  }));
  return project;
}

export function createPublicationProject(input: Record<string, unknown>) {
  const now = new Date().toISOString();
  return writeProject({
    id: crypto.randomUUID(),
    title: normalizeText(input.title, "Untitled book project"),
    description: normalizeText(input.description),
    author: normalizeText(input.author),
    status: "draft",
    sources: [],
    parts: [],
    chapters: [],
    reviewNotes: [],
    modelRuns: [],
    createdAt: now,
    updatedAt: now,
  });
}

export function updatePublicationProject(
  projectId: string,
  input: Record<string, unknown>
) {
  const current = getPublicationProject(projectId);
  if (!current) return null;
  const allowedStatuses = new Set(["draft", "editing", "review", "published"]);
  const status = normalizeText(input.status, current.status);
  const next: PublicationProject = {
    ...current,
    title: normalizeText(input.title, current.title),
    description:
      typeof input.description === "string"
        ? input.description.trim()
        : current.description,
    author:
      typeof input.author === "string" ? input.author.trim() : current.author,
    status: allowedStatuses.has(status)
      ? (status as PublicationProject["status"])
      : current.status,
    sources: Array.isArray(input.sources)
      ? normalizeSources(input.sources)
      : current.sources,
    parts: current.parts ?? [],
    chapters: Array.isArray(input.chapters)
      ? normalizeChapters(input.chapters)
      : current.chapters,
    reviewNotes: Array.isArray(input.reviewNotes)
      ? normalizeReviewNotes(input.reviewNotes)
      : current.reviewNotes,
    modelRuns: current.modelRuns ?? [],
    updatedAt: new Date().toISOString(),
  };
  return writeProject(next);
}

export function deletePublicationProject(
  projectId: string,
  confirmTitle: string
) {
  const project = getPublicationProject(projectId);
  const filePath = projectPath(projectId);
  if (!project || !filePath) return { status: "not-found" as const };
  if (confirmTitle !== project.title)
    return { status: "title-mismatch" as const };

  fs.unlinkSync(filePath);
  const uploadFolder = path.join(PUBLICATION_ROOT, "files", projectId);
  if (fs.existsSync(uploadFolder)) {
    fs.rmSync(uploadFolder, { recursive: true, force: true });
  }
  return { status: "deleted" as const, title: project.title };
}

export function addPublicationModelRun(
  projectId: string,
  run: PublicationModelRun
) {
  const project = getPublicationProject(projectId);
  if (!project) return null;
  project.modelRuns = [run, ...(project.modelRuns ?? [])];
  project.updatedAt = new Date().toISOString();
  writeProject(project);
  return run;
}

export function reviewPublicationModelRun(
  projectId: string,
  runId: string,
  decision: "accepted" | "rejected"
) {
  const project = getPublicationProject(projectId);
  const run = project?.modelRuns?.find((item) => item.id === runId);
  if (!project || !run || run.status !== "proposed") return null;

  run.status = decision;
  run.reviewedAt = new Date().toISOString();

  if (decision === "accepted") {
    if (run.operation === "outline") {
      const proposedParts = run.proposedParts ?? [];
      if (proposedParts.length > 0) {
        for (const proposedPart of proposedParts) {
          const partId = crypto.randomUUID();
          project.parts.push({
            id: partId,
            title: proposedPart.title,
            summary: proposedPart.summary,
            sortOrder: project.parts.length,
          });
          for (const proposedChapter of proposedPart.chapters) {
            project.chapters.push({
              id: crypto.randomUUID(),
              partId,
              title: proposedChapter.title,
              summary: proposedChapter.summary,
              sourceIds: validSourceIds(project, proposedChapter.sourceIds),
              sections: proposedChapter.sections.map((section) => ({
                id: crypto.randomUUID(),
                title: section.title,
                summary: section.summary,
                sourceIds: validSourceIds(project, section.sourceIds),
                manuscript: "",
              })),
              manuscript: "",
              sortOrder: project.chapters.length,
            });
          }
        }
      } else {
        project.chapters.push(
          ...run.proposedChapters.map((chapter) => ({
            id: crypto.randomUUID(),
            title: chapter.title,
            summary: chapter.summary,
            sourceIds: validSourceIds(project, chapter.sourceIds),
            sections: [],
            manuscript: "",
            sortOrder: project.chapters.length,
          }))
        );
      }
    } else if (run.operation === "clean") {
      project.sources.push({
        id: crypto.randomUUID(),
        type: "note",
        title: run.title || "Cleaned source material",
        content: run.proposedText,
        notes: `AI-prepared from ${run.sourceIds.length} source(s).`,
        sortOrder: project.sources.length,
        createdAt: new Date().toISOString(),
      });
    } else if (run.operation === "draft" && run.chapterId) {
      const chapter = project.chapters.find(
        (item) => item.id === run.chapterId
      );
      const section = chapter?.sections.find(
        (item) => item.id === run.sectionId
      );
      if (section) section.manuscript = run.proposedText;
      else if (chapter) chapter.manuscript = run.proposedText;
    } else if (run.operation === "verify") {
      for (const warning of run.warnings) {
        project.reviewNotes.push({
          id: crypto.randomUUID(),
          chapterId: run.chapterId,
          sectionId: run.sectionId,
          text: warning,
          resolved: false,
          createdAt: new Date().toISOString(),
        });
      }
    }
  }

  project.updatedAt = new Date().toISOString();
  writeProject(project);
  return project;
}

export function updatePublicationModelProposal(
  projectId: string,
  runId: string,
  input: { proposedParts?: unknown; editorCritique?: unknown }
) {
  const project = getPublicationProject(projectId);
  const run = project?.modelRuns?.find((item) => item.id === runId);
  if (!project || !run || run.status !== "proposed") return null;
  if (Array.isArray(input.proposedParts)) {
    run.proposedParts = normalizeProposedParts(input.proposedParts);
  }
  if (typeof input.editorCritique === "string") {
    run.editorCritique = input.editorCritique.trim();
  }
  project.updatedAt = new Date().toISOString();
  writeProject(project);
  return project;
}

function normalizeProposedParts(value: unknown[]) {
  return value
    .filter((part): part is Record<string, unknown> =>
      Boolean(part && typeof part === "object")
    )
    .map((part) => ({
      title: normalizeText(part.title, "Untitled part"),
      summary: normalizeText(part.summary),
      chapters: Array.isArray(part.chapters)
        ? part.chapters
            .filter((chapter): chapter is Record<string, unknown> =>
              Boolean(chapter && typeof chapter === "object")
            )
            .map((chapter) => ({
              title: normalizeText(chapter.title, "Untitled chapter"),
              summary: normalizeText(chapter.summary),
              sourceIds: Array.isArray(chapter.sourceIds)
                ? chapter.sourceIds.filter(
                    (id): id is string => typeof id === "string"
                  )
                : [],
              sections: Array.isArray(chapter.sections)
                ? chapter.sections
                    .filter((section): section is Record<string, unknown> =>
                      Boolean(section && typeof section === "object")
                    )
                    .map((section) => ({
                      title: normalizeText(section.title, "Untitled section"),
                      summary: normalizeText(section.summary),
                      sourceIds: Array.isArray(section.sourceIds)
                        ? section.sourceIds.filter(
                            (id): id is string => typeof id === "string"
                          )
                        : [],
                    }))
                : [],
            }))
        : [],
    }));
}

export function addPublicationSource(
  projectId: string,
  input: Record<string, unknown>
) {
  const project = getPublicationProject(projectId);
  if (!project) return null;
  const allowedTypes = new Set<PublicationSourceType>([
    "teaching",
    "pdf",
    "image",
    "document",
    "note",
    "url",
  ]);
  const requestedType = normalizeText(input.type) as PublicationSourceType;
  const source: PublicationSource = {
    id: crypto.randomUUID(),
    type: allowedTypes.has(requestedType) ? requestedType : "note",
    title: normalizeText(input.title, "Untitled source"),
    recordingId: normalizeText(input.recordingId) || undefined,
    url: normalizeText(input.url) || undefined,
    content: normalizeText(input.content) || undefined,
    notes: normalizeText(input.notes) || undefined,
    sortOrder: project.sources.length,
    createdAt: new Date().toISOString(),
  };
  project.sources.push(source);
  project.updatedAt = new Date().toISOString();
  writeProject(project);
  return source;
}

export function addPublicationFileSource(
  projectId: string,
  file: Express.Multer.File,
  title?: string
) {
  const project = getPublicationProject(projectId);
  if (!project) return null;
  const type: PublicationSourceType = file.mimetype.startsWith("image/")
    ? "image"
    : file.mimetype === "application/pdf"
      ? "pdf"
      : "document";
  const source: PublicationSource = {
    id: crypto.randomUUID(),
    type,
    title: normalizeText(title, file.originalname),
    storedFileName: file.filename,
    originalFileName: file.originalname,
    mimeType: file.mimetype,
    sortOrder: project.sources.length,
    createdAt: new Date().toISOString(),
  };
  project.sources.push(source);
  project.updatedAt = new Date().toISOString();
  writeProject(project);
  return source;
}

export function getPublicationFile(projectId: string, sourceId: string) {
  const project = getPublicationProject(projectId);
  const source = project?.sources.find((item) => item.id === sourceId);
  if (
    !source?.storedFileName ||
    path.basename(source.storedFileName) !== source.storedFileName
  ) {
    return null;
  }
  const filePath = path.join(
    PUBLICATION_ROOT,
    "files",
    projectId,
    source.storedFileName
  );
  return fs.existsSync(filePath) ? { filePath, source } : null;
}

export function getPublicationUploadFolder(projectId: string) {
  if (!projectPath(projectId))
    throw new Error("Invalid publication project id.");
  const folder = path.join(PUBLICATION_ROOT, "files", projectId);
  fs.mkdirSync(folder, { recursive: true });
  return folder;
}

function normalizeSources(value: unknown[]): PublicationSource[] {
  return value
    .filter((item): item is PublicationSource =>
      Boolean(item && typeof item === "object")
    )
    .map((item, index) => ({ ...item, sortOrder: index }));
}

function normalizeChapters(value: unknown[]): PublicationChapter[] {
  return value
    .filter((item): item is PublicationChapter =>
      Boolean(item && typeof item === "object")
    )
    .map((item, index) => ({
      id: normalizeText(item.id) || crypto.randomUUID(),
      title: normalizeText(item.title, `Chapter ${index + 1}`),
      summary: normalizeText(item.summary),
      sourceIds: Array.isArray(item.sourceIds)
        ? item.sourceIds.filter((id): id is string => typeof id === "string")
        : [],
      manuscript: typeof item.manuscript === "string" ? item.manuscript : "",
      partId: normalizeText(item.partId) || undefined,
      sections: Array.isArray(item.sections)
        ? item.sections.map((section) => ({
            id: normalizeText(section?.id) || crypto.randomUUID(),
            title: normalizeText(section?.title, "Untitled section"),
            summary: normalizeText(section?.summary),
            sourceIds: Array.isArray(section?.sourceIds)
              ? section.sourceIds.filter(
                  (id): id is string => typeof id === "string"
                )
              : [],
            manuscript:
              typeof section?.manuscript === "string" ? section.manuscript : "",
          }))
        : [],
      sortOrder: index,
    }));
}

function validSourceIds(project: PublicationProject, sourceIds: string[]) {
  return sourceIds.filter((sourceId) =>
    project.sources.some((source) => source.id === sourceId)
  );
}

function normalizeReviewNotes(value: unknown[]): PublicationReviewNote[] {
  return value
    .filter((item): item is PublicationReviewNote =>
      Boolean(item && typeof item === "object")
    )
    .map((item) => ({
      id: normalizeText(item.id) || crypto.randomUUID(),
      chapterId: normalizeText(item.chapterId) || undefined,
      sectionId: normalizeText(item.sectionId) || undefined,
      text: normalizeText(item.text),
      resolved: item.resolved === true,
      createdAt: normalizeText(item.createdAt) || new Date().toISOString(),
    }))
    .filter((item) => item.text);
}
