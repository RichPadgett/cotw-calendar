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

export type PublicationProjectSummary = Omit<
  PublicationProject,
  "sources" | "chapters" | "reviewNotes"
> & {
  sourceCount: number;
  chapterCount: number;
  openReviewCount: number;
};

