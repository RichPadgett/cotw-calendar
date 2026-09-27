/*
 * Persists expert-drawn Hebrew letterforms as normalized vector strokes.
 * Each group owns its own catalog so unfinished or alternate alphabets do not
 * affect another community.
 */

import fs from "node:fs";
import path from "node:path";

export type LetterScript = "modern" | "paleo";
export type LetterBrush = "ink" | "broad";

export type LetterPoint = {
  x: number;
  y: number;
};

export type LetterStroke = {
  points: LetterPoint[];
};

export type HebrewLetterShape = {
  script: LetterScript;
  order: number;
  brush: LetterBrush;
  strokes: LetterStroke[];
  updatedAt: string;
};

const SERVER_ROOT = path.resolve(__dirname, "../..");
const GROUPS_ROOT = path.join(SERVER_ROOT, "content", "groups");
const VIEW_BOX_SIZE = 320;

function normalizeGroupCode(value: string) {
  const groupCode = value.trim().toLowerCase();

  if (!/^[a-z0-9][a-z0-9-]{0,63}$/.test(groupCode)) {
    throw new Error("Invalid group code.");
  }

  return groupCode;
}

function normalizeScript(value: string): LetterScript {
  if (value !== "modern" && value !== "paleo") {
    throw new Error("Letter script must be modern or paleo.");
  }

  return value;
}

function normalizeOrder(value: number) {
  if (!Number.isInteger(value) || value < 1 || value > 22) {
    throw new Error("Letter order must be between 1 and 22.");
  }

  return value;
}

function getShapePath(groupCode: string) {
  return path.join(
    GROUPS_ROOT,
    normalizeGroupCode(groupCode),
    "hebrew-letter-shapes.json"
  );
}

export function listHebrewLetterShapes(groupCode: string) {
  const filePath = getShapePath(groupCode);

  if (!fs.existsSync(filePath)) {
    return [] as HebrewLetterShape[];
  }

  const value = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  return Array.isArray(value) ? (value as HebrewLetterShape[]) : [];
}

export function saveHebrewLetterShape(params: {
  groupCode: string;
  script: string;
  order: number;
  strokes: unknown;
  brush?: unknown;
}) {
  const script = normalizeScript(params.script);
  const order = normalizeOrder(params.order);
  const strokes = normalizeStrokes(params.strokes);
  const brush = normalizeBrush(params.brush);
  const current = listHebrewLetterShapes(params.groupCode);
  const shape: HebrewLetterShape = {
    script,
    order,
    brush,
    strokes,
    updatedAt: new Date().toISOString(),
  };
  const next = [
    ...current.filter(
      (item) => item.script !== shape.script || item.order !== shape.order
    ),
    shape,
  ].sort((a, b) => a.script.localeCompare(b.script) || a.order - b.order);
  const filePath = getShapePath(params.groupCode);
  const temporaryPath = `${filePath}.tmp`;

  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(
    temporaryPath,
    `${JSON.stringify(next, null, 2)}\n`,
    "utf-8"
  );
  fs.renameSync(temporaryPath, filePath);

  return shape;
}

function normalizeBrush(value: unknown): LetterBrush {
  if (value === undefined || value === null || value === "broad")
    return "broad";
  if (value === "ink") return "ink";
  throw new Error("Letter brush must be ink or broad.");
}

function normalizeStrokes(value: unknown): LetterStroke[] {
  if (!Array.isArray(value) || value.length > 100) {
    throw new Error("A letter must contain no more than 100 strokes.");
  }

  let pointCount = 0;
  const strokes = value.map((candidate) => {
    const points =
      candidate &&
      typeof candidate === "object" &&
      "points" in candidate &&
      Array.isArray(candidate.points)
        ? candidate.points
        : null;

    if (!points || points.length === 0) {
      throw new Error("Every stroke must contain at least one point.");
    }

    pointCount += points.length;
    if (pointCount > 5000) {
      throw new Error("A letter must contain no more than 5,000 points.");
    }

    return {
      points: points.map((point: unknown) => {
        if (
          !point ||
          typeof point !== "object" ||
          !("x" in point) ||
          !("y" in point) ||
          typeof point.x !== "number" ||
          typeof point.y !== "number" ||
          !Number.isFinite(point.x) ||
          !Number.isFinite(point.y)
        ) {
          throw new Error(
            "Every vector point must contain numeric x and y coordinates."
          );
        }

        return {
          x: Math.max(
            0,
            Math.min(VIEW_BOX_SIZE, Math.round(point.x * 10) / 10)
          ),
          y: Math.max(
            0,
            Math.min(VIEW_BOX_SIZE, Math.round(point.y * 10) / 10)
          ),
        };
      }),
    };
  });

  return strokes;
}
