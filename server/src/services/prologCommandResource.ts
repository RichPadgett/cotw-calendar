/*
 * File: server/src/services/prologCommandResource.ts
 * Purpose: Runs the Prolog command-resource engine and returns JSON for API routes.
 */

import { execFile } from "node:child_process";
import path from "node:path";
import { promisify } from "node:util";

import { listApprovedCommandContributions } from "./commandContributionStore";
import { getRelatedTeachings, hasRelatedTeaching } from "./teachingIndexService";

const execFileAsync = promisify(execFile);

const serverRoot = path.resolve(__dirname, "../..");
const prologEntry = path.join(serverRoot, "prolog", "api.pl");
const safeAtomPattern = /^[a-z][a-z0-9_]*$/;

export type CommandResourceFilters = {
  category?: string;
  fact?: string;
  facts?: string[];
  appliesIf?: string;
};

type CommandResourceDetail = {
  key: string;
  requirement?: string | null;
  requirements?: string[];
  scriptureReferences?: string[];
  relatedTeachings?: {
    title: string;
    url: string;
  }[];
  studyNotes?: string[];
  storyReferences?: {
    reference: string;
    label: string;
  }[];
  nonCanonicalStoryReferences?: {
    reference: string;
    label: string;
  }[];
  sourceTerms?: {
    language: string;
    term: string;
    gloss: string;
  }[];
  translationNotes?: string[];
  clarificationNotes?: string[];
};

type RandomCommandResourceResponse = {
  command: CommandResourceDetail | null;
};

type CommandSummaryEntry = {
  key: string;
  title?: string;
  scriptureReferences?: string[];
  hasTeaching?: "true" | "false";
  [extra: string]: unknown;
};

type CommandSummaryListResponse = {
  commands: CommandSummaryEntry[];
};

function attachHasTeaching(entry: CommandSummaryEntry): CommandSummaryEntry {
  return {
    ...entry,
    hasTeaching: hasRelatedTeaching(entry.scriptureReferences ?? [])
      ? "true"
      : "false",
  };
}

async function runPrologJsonWithTeachingFlags(goal: string) {
  const response = await runPrologJson<CommandSummaryListResponse>(goal);

  return {
    ...response,
    commands: response.commands.map(attachHasTeaching),
  };
}

export function assertSafeAtom(value: string, fieldName: string): void {
  if (!safeAtomPattern.test(value)) {
    throw new Error(`${fieldName} must be a lowercase Prolog atom key.`);
  }
}

export async function listCommandResources(
  filters: CommandResourceFilters = {}
) {
  if (filters.category) {
    assertSafeAtom(filters.category, "category");
    return runPrologJsonWithTeachingFlags(
      `api_commands_by_category_json(${filters.category})`
    );
  }

  if (filters.fact) {
    assertSafeAtom(filters.fact, "fact");
    return runPrologJsonWithTeachingFlags(
      `api_commands_by_fact_json(${filters.fact})`
    );
  }

  if (filters.facts?.length) {
    filters.facts.forEach((fact) => assertSafeAtom(fact, "facts"));
    return runPrologJsonWithTeachingFlags(
      `api_commands_by_facts_json(${toPrologList(filters.facts)})`
    );
  }

  if (filters.appliesIf) {
    assertSafeAtom(filters.appliesIf, "appliesIf");
    return runPrologJsonWithTeachingFlags(
      `api_commands_by_applicability_json(${filters.appliesIf})`
    );
  }

  return runPrologJsonWithTeachingFlags("api_commands_json");
}

export async function getCommandResource(commandKey: string) {
  assertSafeAtom(commandKey, "commandKey");

  const command = await runPrologJson<CommandResourceDetail>(
    `api_command_json(${commandKey})`
  );

  return mergeApprovedContributions(command);
}

export async function getCommandResourceCategories() {
  return runPrologJson("api_command_categories_json");
}

export async function getCommandResourcesGroupedByCategory() {
  return runPrologJson("api_commands_grouped_by_category_json");
}

export async function getRandomCommandResourceCategory() {
  return runPrologJson("api_random_category_json");
}

export async function getRandomCommandResourceInRandomCategory() {
  return runPrologJson("api_random_command_in_random_category_json");
}

export async function getCommandResourceFacts() {
  return runPrologJson("api_command_facts_json");
}

export async function getCommandResourceApplicability() {
  return runPrologJson("api_command_applicability_json");
}

export async function getRandomCommandResource(
  filters: CommandResourceFilters = {}
) {
  if (filters.category) {
    assertSafeAtom(filters.category, "category");
    return mergeRandomCommandResponse(
      await runPrologJson<RandomCommandResourceResponse>(
        `api_random_command_by_category_json(${filters.category})`
      )
    );
  }

  if (filters.fact) {
    assertSafeAtom(filters.fact, "fact");
    return mergeRandomCommandResponse(
      await runPrologJson<RandomCommandResourceResponse>(
        `api_random_command_by_fact_json(${filters.fact})`
      )
    );
  }

  if (filters.facts?.length) {
    filters.facts.forEach((fact) => assertSafeAtom(fact, "facts"));
    return mergeRandomCommandResponse(
      await runPrologJson<RandomCommandResourceResponse>(
        `api_random_command_by_facts_json(${toPrologList(filters.facts)})`
      )
    );
  }

  if (filters.appliesIf) {
    assertSafeAtom(filters.appliesIf, "appliesIf");
    return mergeRandomCommandResponse(
      await runPrologJson<RandomCommandResourceResponse>(
        `api_random_command_by_applicability_json(${filters.appliesIf})`
      )
    );
  }

  return mergeRandomCommandResponse(
    await runPrologJson<RandomCommandResourceResponse>("api_random_command_json")
  );
}

function mergeRandomCommandResponse(response: RandomCommandResourceResponse) {
  if (!response.command) {
    return response;
  }

  return {
    ...response,
    command: mergeApprovedContributions(response.command),
  };
}

function mergeApprovedContributions(command: CommandResourceDetail) {
  const contributions = listApprovedCommandContributions(command.key);
  const requirementContributions = contributions
    .filter((contribution) => contribution.type === "requirement")
    .map((contribution) => contribution.text);

  return {
    ...command,
    requirements: [
      ...(command.requirements ?? []),
      ...requirementContributions,
    ],
    relatedTeachings: getRelatedTeachings(
      command.scriptureReferences ?? [],
      command.requirement ?? ""
    ),
    studyNotes: [
      ...(command.studyNotes ?? []),
      ...contributions
        .filter((contribution) => contribution.type === "study_note")
        .map((contribution) => contribution.text),
    ],
    storyReferences: [
      ...(command.storyReferences ?? []),
      ...contributions
        .filter((contribution) => contribution.type === "story_reference")
        .map((contribution) =>
          parseCommunityStoryReference(contribution.text)
        ),
    ],
    nonCanonicalStoryReferences: [
      ...(command.nonCanonicalStoryReferences ?? []),
      ...contributions
        .filter(
          (contribution) =>
            contribution.type === "non_canonical_story_reference"
        )
        .map((contribution) =>
          parseCommunityStoryReference(contribution.text)
        ),
    ],
    sourceTerms: [
      ...(command.sourceTerms ?? []),
      ...contributions
        .filter((contribution) => contribution.type === "source_term")
        .map((contribution) => ({
          language: "community",
          term: "suggested term",
          gloss: contribution.text,
        })),
    ],
    translationNotes: [
      ...(command.translationNotes ?? []),
      ...contributions
        .filter((contribution) => contribution.type === "translation_note")
        .map((contribution) => contribution.text),
    ],
    clarificationNotes: [
      ...(command.clarificationNotes ?? []),
      ...contributions
        .filter((contribution) => contribution.type === "clarification_note")
        .map((contribution) => contribution.text),
    ],
  };
}

function parseCommunityStoryReference(text: string) {
  const [reference, ...labelParts] = text.split(/\s*:\s+/);
  const label = labelParts.join(": ").trim();

  return {
    reference: reference?.trim() || text,
    label: label || text,
  };
}

function toPrologList(values: string[]) {
  return `[${values.join(",")}]`;
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
    console.warn(`[prolog] ${stderr.trim()}`);
  }

  return JSON.parse(stdout) as T;
}
