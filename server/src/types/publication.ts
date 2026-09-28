export type PublicationSourceType =
  | "teaching"
  | "pdf"
  | "image"
  | "document"
  | "note"
  | "url";

export type PublicationSource = {
  id: string;
  type: PublicationSourceType;
  title: string;
  recordingId?: string;
  url?: string;
  storedFileName?: string;
  originalFileName?: string;
  mimeType?: string;
  content?: string;
  notes?: string;
  sortOrder: number;
  createdAt: string;
};

export type PublicationChapter = {
  id: string;
  partId?: string;
  title: string;
  summary: string;
  sourceIds: string[];
  sections: Array<{
    id: string;
    title: string;
    summary: string;
    sourceIds: string[];
    manuscript: string;
  }>;
  manuscript: string;
  sortOrder: number;
};

export type PublicationPart = {
  id: string;
  title: string;
  summary: string;
  sortOrder: number;
};

export type PublicationReviewNote = {
  id: string;
  chapterId?: string;
  sectionId?: string;
  text: string;
  resolved: boolean;
  createdAt: string;
};

export type PublicationModelOperation =
  | "clean"
  | "outline"
  | "draft"
  | "verify";

export type PublicationModelRun = {
  id: string;
  operation: PublicationModelOperation;
  chapterId?: string;
  sectionId?: string;
  sourceIds: string[];
  instructions?: string;
  model: string;
  status: "proposed" | "accepted" | "rejected";
  title: string;
  summary: string;
  proposedText: string;
  proposedChapters: Array<{
    title: string;
    summary: string;
    sourceIds: string[];
  }>;
  proposedParts: Array<{
    title: string;
    summary: string;
    chapters: Array<{
      title: string;
      summary: string;
      sourceIds: string[];
      sections: Array<{
        title: string;
        summary: string;
        sourceIds: string[];
      }>;
    }>;
  }>;
  editorialObservations: string[];
  unplacedSourceIds: string[];
  editorCritique?: string;
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
  parts: PublicationPart[];
  chapters: PublicationChapter[];
  reviewNotes: PublicationReviewNote[];
  modelRuns: PublicationModelRun[];
  createdAt: string;
  updatedAt: string;
};

export type PublishedPublication = PublicationProject & {
  projectId: string;
  edition: number;
  publishedAt: string;
};
