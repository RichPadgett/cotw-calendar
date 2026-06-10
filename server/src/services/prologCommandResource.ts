/*
 * File: server/src/services/prologCommandResource.ts
 * Purpose: Runs the Prolog command-resource engine and returns JSON for API routes.
 */

import { execFile } from "node:child_process";
import path from "node:path";
import { promisify } from "node:util";

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
    return runPrologJson(`api_commands_by_category_json(${filters.category})`);
  }

  if (filters.fact) {
    assertSafeAtom(filters.fact, "fact");
    return runPrologJson(`api_commands_by_fact_json(${filters.fact})`);
  }

  if (filters.facts?.length) {
    filters.facts.forEach((fact) => assertSafeAtom(fact, "facts"));
    return runPrologJson(
      `api_commands_by_facts_json(${toPrologList(filters.facts)})`
    );
  }

  if (filters.appliesIf) {
    assertSafeAtom(filters.appliesIf, "appliesIf");
    return runPrologJson(
      `api_commands_by_applicability_json(${filters.appliesIf})`
    );
  }

  return runPrologJson("api_commands_json");
}

export async function getCommandResource(commandKey: string) {
  assertSafeAtom(commandKey, "commandKey");

  return runPrologJson(`api_command_json(${commandKey})`);
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
    return runPrologJson(
      `api_random_command_by_category_json(${filters.category})`
    );
  }

  if (filters.fact) {
    assertSafeAtom(filters.fact, "fact");
    return runPrologJson(`api_random_command_by_fact_json(${filters.fact})`);
  }

  if (filters.facts?.length) {
    filters.facts.forEach((fact) => assertSafeAtom(fact, "facts"));
    return runPrologJson(
      `api_random_command_by_facts_json(${toPrologList(filters.facts)})`
    );
  }

  if (filters.appliesIf) {
    assertSafeAtom(filters.appliesIf, "appliesIf");
    return runPrologJson(
      `api_random_command_by_applicability_json(${filters.appliesIf})`
    );
  }

  return runPrologJson("api_random_command_json");
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
