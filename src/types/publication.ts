export type PublicationSource = {
  id: string;
  type: "teaching" | "pdf" | "image" | "document" | "note" | "url";
  title: string;
  recordingId?: string;
  url?: string;
  originalFileName?: string;
  content?: string;
  notes?: string;
  sortOrder: number;
  createdAt: string;
};

export type PublicationChapter = {
  id: string;
  title: string;
  summary: string;
  sourceIds: string[];
  manuscript: string;
  sortOrder: number;
};

export type PublicationReviewNote = {
  id: string;
  chapterId?: string;
  text: string;
  resolved: boolean;
  createdAt: string;
};

export type PublicationModelOperation = "clean" | "outline" | "draft" | "verify";

export type PublicationModelRun = {
  id: string;
  operation: PublicationModelOperation;
  chapterId?: string;
  sourceIds: string[];
  instructions?: string;
  model: string;
  status: "proposed" | "accepted" | "rejected";
  title: string;
  summary: string;
  proposedText: string;
  proposedChapters: Array<{ title: string; summary: string; sourceIds: string[] }>;
  warnings: string[];
  citations: Array<{ sourceId: string; note: string }>;
  responseId?: string;
  createdAt: string;
  reviewedAt?: string;
};

export type PublicationProject = {
  id: string;
  title: string;
  description: string;
  author: string;
  status: "draft" | "editing" | "review" | "published";
  sources: PublicationSource[];
  chapters: PublicationChapter[];
  reviewNotes: PublicationReviewNote[];
  modelRuns: PublicationModelRun[];
  createdAt: string;
  updatedAt: string;
};

export type PublicationProjectSummary = Omit<
  PublicationProject,
  "sources" | "chapters" | "reviewNotes"
> & {
  sourceCount: number;
  chapterCount: number;
  openReviewCount: number;
};
