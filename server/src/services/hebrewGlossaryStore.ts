/*
 * File: server/src/services/hebrewGlossaryStore.ts
 * Purpose: Admin-only add/edit/delete of Hebrew glossary terms, persisted
 * directly as Prolog facts in prolog/hebrew/glossary.pl.
 */

import { execFileSync } from "child_process";
import fs from "fs";
import path from "path";

const SERVER_ROOT = path.resolve(__dirname, "../..");
const PROLOG_ROOT = path.join(SERVER_ROOT, "prolog");
const GLOSSARY_FILE = path.join(PROLOG_ROOT, "hebrew", "glossary.pl");
const HEBREW_API_ENTRY = path.join(PROLOG_ROOT, "hebrew", "api.pl");
const safeAtomPattern = /^[a-z][a-z0-9_]*$/;

export type GlossaryTermInput = {
  key: string;
  language: string;
  word: string;
  transliteration: string;
  pronunciation: string;
  definition: string;
  note?: string;
};

export function addGlossaryTerm(input: GlossaryTermInput) {
  const key = normalizeKey(input.key);
  const content = fs.readFileSync(GLOSSARY_FILE, "utf-8");

  if (content.includes(`glossary_term(${key},`)) {
    throw new Error(`A glossary term with key "${key}" already exists.`);
  }

  const fact = buildFact(key, input);
  const nextContent = `${content.trimEnd()}\n\n${fact}\n`;

  writeValidatedGlossaryFile(content, nextContent);

  return { key, fact };
}

export function updateGlossaryTerm(key: string, input: GlossaryTermInput) {
  const normalizedKey = normalizeKey(key);
  const content = fs.readFileSync(GLOSSARY_FILE, "utf-8");
  const lines = content.split(/\r?\n/);
  const targetIndex = lines.findIndex((line) =>
    line.trim().startsWith(`glossary_term(${normalizedKey},`)
  );

  if (targetIndex < 0) {
    throw new Error(`No glossary term found with key "${normalizedKey}".`);
  }

  const fact = buildFact(normalizedKey, input);
  lines[targetIndex] = fact;

  writeValidatedGlossaryFile(content, lines.join("\n"));

  return { key: normalizedKey, fact };
}

export function deleteGlossaryTerm(key: string) {
  const normalizedKey = normalizeKey(key);
  const content = fs.readFileSync(GLOSSARY_FILE, "utf-8");
  const lines = content.split(/\r?\n/);
  const targetIndex = lines.findIndex((line) =>
    line.trim().startsWith(`glossary_term(${normalizedKey},`)
  );

  if (targetIndex < 0) {
    throw new Error(`No glossary term found with key "${normalizedKey}".`);
  }

  lines.splice(targetIndex, 1);

  writeValidatedGlossaryFile(content, lines.join("\n"));

  return { key: normalizedKey };
}

function buildFact(key: string, input: GlossaryTermInput) {
  const language = normalizeLanguage(input.language);

  return `glossary_term(${key}, ${language}, ${toPrologString(
    input.word
  )}, ${toPrologString(input.transliteration)}, ${toPrologString(
    input.pronunciation
  )}, ${toPrologString(input.definition)}, ${toPrologString(
    input.note ?? ""
  )}).`;
}

function normalizeLanguage(value: string) {
  const language = value.trim().toLowerCase();

  if (!["hebrew", "greek", "aramaic"].includes(language)) {
    throw new Error('Language must be "hebrew", "greek", or "aramaic".');
  }

  return language;
}

function normalizeKey(value: string) {
  const key = value.trim().toLowerCase();

  if (!safeAtomPattern.test(key)) {
    throw new Error(
      "Glossary key must be a lowercase Prolog atom (letters, numbers, underscores, starting with a letter)."
    );
  }

  return key;
}

function toPrologString(value: string) {
  return `'${value.replace(/\s+/g, " ").trim().replace(/'/g, "''")}'`;
}

function writeValidatedGlossaryFile(
  previousContent: string,
  nextContent: string
) {
  fs.writeFileSync(GLOSSARY_FILE, nextContent, "utf-8");

  try {
    validateHebrewCatalog();
  } catch (error) {
    fs.writeFileSync(GLOSSARY_FILE, previousContent, "utf-8");
    throw error;
  }
}

function validateHebrewCatalog() {
  try {
    execFileSync(
      "swipl",
      ["-q", "-s", HEBREW_API_ENTRY, "-g", "api_hebrew_glossary_json,halt."],
      {
        cwd: path.join(PROLOG_ROOT, "hebrew"),
        encoding: "utf-8",
        stdio: ["ignore", "pipe", "pipe"],
        timeout: 10000,
      }
    );
  } catch (error) {
    const message =
      error instanceof Error && "stderr" in error
        ? String(
            (error as Error & { stderr?: unknown }).stderr || error.message
          )
        : error instanceof Error
          ? error.message
          : "Unknown Prolog validation error.";

    throw new Error(`Glossary change failed validation: ${message.trim()}`);
  }
}
