/*
 * File: server/src/services/hebrewStudyService.ts
 * Purpose: Runs the Hebrew Letter Study Prolog engine (alphabet + glossary) and
 * returns JSON for API routes. Independent of the command-resource catalog.
 */

import { execFile } from "node:child_process";
import path from "node:path";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);

const serverRoot = path.resolve(__dirname, "../..");
const prologEntry = path.join(serverRoot, "prolog", "hebrew", "api.pl");

export type HebrewLetter = {
  order: number;
  name: string;
  letter: string;
  transliteration: string;
  sound: string;
  meaning: string;
};

export type GlossaryLanguage = "hebrew" | "greek" | "aramaic";

export type GlossaryTerm = {
  key: string;
  language: GlossaryLanguage;
  word: string;
  transliteration: string;
  pronunciation: string;
  definition: string;
  note: string;
};

export async function listHebrewAlphabet(): Promise<{
  letters: HebrewLetter[];
}> {
  return runPrologJson("api_hebrew_alphabet_json");
}

export async function listGlossaryTerms(
  search?: string,
  language?: string
): Promise<{ terms: GlossaryTerm[] }> {
  const normalizedLanguage =
    language && ["hebrew", "greek", "aramaic"].includes(language)
      ? language
      : "";

  if (search?.trim() || normalizedLanguage) {
    return runPrologJson(
      `api_hebrew_glossary_search_json(${toPrologString(
        search?.trim() ?? ""
      )}, ${normalizedLanguage || "''"})`
    );
  }

  return runPrologJson("api_hebrew_glossary_json");
}

async function runPrologJson<T>(goal: string): Promise<T> {
  const { stdout, stderr } = await execFileAsync("swipl", [
    "-q",
    "-s",
    prologEntry,
    "-g",
    `${goal},halt.`,
  ]);

  if (stderr.trim()) {
    console.warn(`[prolog:hebrew] ${stderr.trim()}`);
  }

  return JSON.parse(stdout) as T;
}

function toPrologString(value: string) {
  return `'${value.replace(/'/g, "''")}'`;
}
