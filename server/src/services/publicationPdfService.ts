import PDFDocument from "pdfkit";

import type {
  PublicationChapter,
  PublicationProject,
} from "../types/publication";

const COLORS = {
  ink: "#1f2937",
  muted: "#64748b",
  green: "#28523b",
  lightGreen: "#e8f1ea",
};

export function generatePublicationPdf(
  project: PublicationProject
): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const document = new PDFDocument({
      size: "LETTER",
      margins: { top: 68, right: 64, bottom: 68, left: 64 },
      bufferPages: true,
      info: {
        Title: project.title,
        Author: project.author || "Church of the Word",
        Subject: project.description || "Publication manuscript",
      },
    });
    const chunks: Buffer[] = [];
    document.on("data", (chunk: Buffer) => chunks.push(chunk));
    document.on("error", reject);
    document.on("end", () => resolve(Buffer.concat(chunks)));

    addTitlePage(document, project);

    const parts = [...(project.parts ?? [])].sort(
      (a, b) => a.sortOrder - b.sortOrder
    );
    for (const part of parts) {
      const chapters = project.chapters
        .filter((chapter) => chapter.partId === part.id)
        .sort((a, b) => a.sortOrder - b.sortOrder);
      if (!chapters.some(chapterHasContent)) continue;
      document.addPage();
      document.y = 92;
      document
        .fillColor(COLORS.green)
        .font("Helvetica-Bold")
        .fontSize(13)
        .text("PART");
      document
        .moveDown(0.35)
        .font("Helvetica-Bold")
        .fontSize(26)
        .text(part.title);
      if (part.summary) {
        document
          .moveDown(0.7)
          .fillColor(COLORS.muted)
          .font("Helvetica-Oblique")
          .fontSize(11)
          .text(part.summary, { lineGap: 3 });
      }
      for (const chapter of chapters) addChapter(document, chapter);
    }

    const unassigned = project.chapters
      .filter((chapter) => !chapter.partId && chapterHasContent(chapter))
      .sort((a, b) => a.sortOrder - b.sortOrder);
    if (unassigned.length) {
      document.addPage();
      document
        .fillColor(COLORS.green)
        .font("Helvetica-Bold")
        .fontSize(22)
        .text(parts.length ? "Supplemental Drafts" : "Manuscript");
      for (const chapter of unassigned) addChapter(document, chapter);
    }

    const range = document.bufferedPageRange();
    for (
      let index = range.start;
      index < range.start + range.count;
      index += 1
    ) {
      document.switchToPage(index);
      document.fillColor(COLORS.muted).font("Helvetica").fontSize(9);
      document.text(project.title, 64, 742, { width: 390, ellipsis: true });
      document.text(String(index + 1), 490, 742, { width: 55, align: "right" });
    }
    document.end();
  });
}

function addTitlePage(
  document: PDFKit.PDFDocument,
  project: PublicationProject
) {
  document.moveDown(5);
  document
    .fillColor(COLORS.green)
    .font("Helvetica-Bold")
    .fontSize(32)
    .text(project.title, { align: "center" });
  if (project.author) {
    document
      .moveDown(1.1)
      .fillColor(COLORS.ink)
      .font("Helvetica")
      .fontSize(15)
      .text(project.author, { align: "center" });
  }
  if (project.description) {
    document
      .moveDown(2)
      .fillColor(COLORS.muted)
      .font("Helvetica")
      .fontSize(11)
      .text(project.description, { align: "center", lineGap: 4 });
  }
  document
    .moveDown(4)
    .fillColor(COLORS.green)
    .font("Helvetica-Bold")
    .fontSize(11)
    .text("CHURCH OF THE WORD", { align: "center", characterSpacing: 1.4 });
}

function addChapter(document: PDFKit.PDFDocument, chapter: PublicationChapter) {
  document.addPage();
  document
    .fillColor(COLORS.green)
    .font("Helvetica-Bold")
    .fontSize(22)
    .text(chapter.title);
  if (chapter.summary) {
    document
      .moveDown(0.45)
      .fillColor(COLORS.muted)
      .font("Helvetica-Oblique")
      .fontSize(10.5)
      .text(chapter.summary, { lineGap: 3 });
  }
  if (chapter.manuscript.trim()) addBody(document, chapter.manuscript);
  for (const section of chapter.sections) {
    if (!section.manuscript?.trim()) continue;
    document
      .moveDown(1.15)
      .fillColor(COLORS.green)
      .font("Helvetica-Bold")
      .fontSize(15)
      .text(section.title);
    addBody(document, section.manuscript);
  }
}

function addBody(document: PDFKit.PDFDocument, value: string) {
  const paragraphs = value
    .split(/\n\s*\n/)
    .map((item) => item.trim())
    .filter(Boolean);
  for (const paragraph of paragraphs) {
    document
      .moveDown(0.75)
      .fillColor(COLORS.ink)
      .font("Times-Roman")
      .fontSize(11.5)
      .text(paragraph, { align: "justify", lineGap: 3 });
  }
}

function chapterHasContent(chapter: PublicationChapter) {
  return Boolean(
    chapter.manuscript.trim() ||
    chapter.sections.some((section) => section.manuscript?.trim())
  );
}
