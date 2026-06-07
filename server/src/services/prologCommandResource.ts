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

export type CommandAnswer = {
  question: string;
  answer: "yes" | "no";
};

type EvaluateBody = {
  answers?: CommandAnswer[];
};

export function assertSafeAtom(value: string, fieldName: string): void {
  if (!safeAtomPattern.test(value)) {
    throw new Error(`${fieldName} must be a lowercase Prolog atom key.`);
  }
}

export async function listCommandResources() {
  return runPrologJson("api_commands_json");
}

export async function getCommandResource(commandKey: string) {
  assertSafeAtom(commandKey, "commandKey");

  return runPrologJson(`api_command_json(${commandKey})`);
}

export async function evaluateCommandResource(commandKey: string, body: unknown) {
  assertSafeAtom(commandKey, "commandKey");

  const answers = normalizeAnswers(body);
  const prologAnswers = `[${answers
    .map(({ question, answer }) => `answer(${question}, ${answer})`)
    .join(",")}]`;

  return runPrologJson(
    `api_evaluate_command_json(${commandKey}, ${prologAnswers})`
  );
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

function normalizeAnswers(body: unknown): CommandAnswer[] {
  const parsedBody = body as EvaluateBody;
  const answers = parsedBody.answers ?? [];

  if (!Array.isArray(answers)) {
    throw new Error("answers must be an array.");
  }

  return answers.map((answer) => {
    assertSafeAtom(answer.question, "question");

    if (answer.answer !== "yes" && answer.answer !== "no") {
      throw new Error("answer must be yes or no.");
    }

    return answer;
  });
}
