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

export type PublicationProject = {
  id: string;
  title: string;
  description: string;
  author: string;
  status: "draft" | "editing" | "review" | "published";
  sources: PublicationSource[];
  chapters: PublicationChapter[];
  reviewNotes: PublicationReviewNote[];
  createdAt: string;
  updatedAt: string;
};

