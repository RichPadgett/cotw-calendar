/*
 * File: server/src/services/commandContributionStore.ts
 * Purpose: Stores community command-study contributions outside of the Prolog source catalog.
 */

import crypto from "crypto";
import fs from "fs";
import path from "path";

const CONTRIBUTION_GROUP_CODE = "church-of-the-word";
const CONTENT_ROOT = path.join(process.cwd(), "content", "groups");
const PROLOG_COMMANDS_ROOT = path.join(process.cwd(), "prolog", "commands");
const safeAtomPattern = /^[a-z][a-z0-9_]*$/;
const usernamePattern = /^[a-z0-9_-]{2,32}$/;
const contributionPath = path.join(
  CONTENT_ROOT,
  CONTRIBUTION_GROUP_CODE,
  "command-contributions.json"
);

export const commandContributionTypes = [
  "requirement",
  "study_note",
  "story_reference",
  "source_term",
  "translation_note",
  "clarification_note",
] as const;

export const commandContributionModes = [
  "add",
  "suggest_edit",
  "suggest_remove",
] as const;

export const commandContributionStatuses = [
  "pending",
  "approved",
  "rejected",
  "deleted",
] as const;

export type CommandContributionType = (typeof commandContributionTypes)[number];
export type CommandContributionMode = (typeof commandContributionModes)[number];
export type CommandContributionStatus =
  (typeof commandContributionStatuses)[number];

export type CommandContributionTarget = {
  source: "prolog" | "contribution";
  index?: number;
  currentText?: string;
  currentValue?: unknown;
};

export type CommandContribution = {
  id: string;
  groupCode: typeof CONTRIBUTION_GROUP_CODE;
  commandKey: string;
  mode: CommandContributionMode;
  type: CommandContributionType;
  text: string;
  suggestedText?: string;
  reason?: string;
  target?: CommandContributionTarget;
  status: CommandContributionStatus;
  createdAt: string;
  updatedAt: string;
  createdBy?: string;
  updatedBy?: string;
  approvedAt?: string;
  approvedBy?: string;
  promotedAt?: string;
  promotedBy?: string;
  prologFact?: string;
  prologFile?: string;
};

type ContributionFile = {
  contributions: CommandContribution[];
};

export function getContributionGroupCode() {
  return CONTRIBUTION_GROUP_CODE;
}

export function listCommandContributions(params: {
  commandKey?: string;
  status?: CommandContributionStatus | "all";
  includeDeleted?: boolean;
  promoted?: boolean;
} = {}) {
  if (params.commandKey) {
    assertSafeAtom(params.commandKey, "commandKey");
  }

  const status = params.status ?? "approved";

  return readContributionFile().contributions.filter((contribution) => {
    if (params.commandKey && contribution.commandKey !== params.commandKey) {
      return false;
    }

    if (!params.includeDeleted && contribution.status === "deleted") {
      return false;
    }

    if (status !== "all" && contribution.status !== status) {
      return false;
    }

    if (
      params.promoted !== undefined &&
      Boolean(contribution.promotedAt) !== params.promoted
    ) {
      return false;
    }

    return true;
  });
}

export function listApprovedCommandContributions(commandKey: string) {
  return listCommandContributions({
    commandKey,
    status: "approved",
    promoted: false,
  });
}

export function createCommandContribution(params: {
  commandKey: string;
  mode?: string;
  type: string;
  text: string;
  suggestedText?: string;
  reason?: string;
  target?: unknown;
  createdBy: string;
}) {
  const commandKey = normalizeCommandKey(params.commandKey);
  const mode = normalizeContributionMode(params.mode ?? "add");
  const type = normalizeContributionType(params.type);
  const text = normalizeContributionText(params.text);
  const suggestedText =
    params.suggestedText === undefined
      ? undefined
      : normalizeContributionText(params.suggestedText);
  const reason = normalizeOptionalText(params.reason);
  const target = normalizeContributionTarget(params.target);
  const createdBy = normalizeUsername(params.createdBy);

  if ((mode === "suggest_edit" || mode === "suggest_remove") && !target) {
    throw new Error("A target is required for edit and remove suggestions.");
  }

  const now = new Date().toISOString();
  const file = readContributionFile();

  const contribution: CommandContribution = {
    id: crypto.randomUUID(),
    groupCode: CONTRIBUTION_GROUP_CODE,
    commandKey,
    mode,
    type,
    text,
    suggestedText,
    reason,
    target,
    status: "pending",
    createdAt: now,
    updatedAt: now,
    createdBy,
  };

  file.contributions.push(contribution);
  writeContributionFile(file);

  return contribution;
}

export function updateCommandContribution(
  id: string,
  params: {
    mode?: string;
    type?: string;
    text?: string;
    suggestedText?: string;
    reason?: string;
    target?: unknown;
    status?: string;
    updatedBy?: string;
  }
) {
  const file = readContributionFile();
  const contribution = findContribution(file, id);

  if (params.mode !== undefined) {
    contribution.mode = normalizeContributionMode(params.mode);
  }

  if (params.type !== undefined) {
    contribution.type = normalizeContributionType(params.type);
  }

  if (params.text !== undefined) {
    contribution.text = normalizeContributionText(params.text);
  }

  if (params.suggestedText !== undefined) {
    contribution.suggestedText = normalizeContributionText(
      params.suggestedText
    );
  }

  if (params.reason !== undefined) {
    contribution.reason = normalizeOptionalText(params.reason);
  }

  if (params.target !== undefined) {
    contribution.target = normalizeContributionTarget(params.target);
  }

  if (
    (contribution.mode === "suggest_edit" ||
      contribution.mode === "suggest_remove") &&
    !contribution.target
  ) {
    throw new Error("A target is required for edit and remove suggestions.");
  }

  if (params.status !== undefined) {
    contribution.status = normalizeContributionStatus(params.status);
  }

  contribution.updatedBy =
    params.updatedBy === undefined
      ? undefined
      : normalizeUsername(params.updatedBy);
  contribution.updatedAt = new Date().toISOString();

  writeContributionFile(file);

  return contribution;
}

export function approveCommandContribution(id: string, updatedBy?: string) {
  const file = readContributionFile();
  const contribution = findContribution(file, id);
  const username = updatedBy ? normalizeUsername(updatedBy) : undefined;
  const now = new Date().toISOString();

  contribution.status = "approved";
  contribution.updatedBy = username;
  contribution.approvedBy = username;
  contribution.approvedAt = now;
  contribution.updatedAt = now;

  writeContributionFile(file);

  return contribution;
}

export function rejectCommandContribution(id: string, updatedBy?: string) {
  return updateCommandContribution(id, {
    status: "rejected",
    updatedBy,
  });
}

export function deleteCommandContribution(id: string, updatedBy?: string) {
  return updateCommandContribution(id, {
    status: "deleted",
    updatedBy,
  });
}

export function withdrawCommandContribution(params: {
  id: string;
  commandKey: string;
  username: string;
}) {
  const commandKey = normalizeCommandKey(params.commandKey);
  const username = normalizeUsername(params.username);
  const file = readContributionFile();
  const contribution = findContribution(file, params.id);

  if (contribution.commandKey !== commandKey) {
    throw new Error("Contribution does not belong to this command.");
  }

  if (contribution.createdBy !== username) {
    throw new Error("Only the original contributor can withdraw this item.");
  }

  if (contribution.status !== "pending") {
    throw new Error("Only pending contributions can be withdrawn.");
  }

  contribution.status = "deleted";
  contribution.updatedBy = username;
  contribution.updatedAt = new Date().toISOString();

  writeContributionFile(file);

  return contribution;
}

export function promoteCommandContribution(params: {
  id: string;
  promotedBy: string;
  official: Record<string, unknown>;
}) {
  const promotedBy = normalizeUsername(params.promotedBy);
  const file = readContributionFile();
  const contribution = findContribution(file, params.id);

  if (contribution.status !== "approved") {
    throw new Error("Only approved contributions can be promoted.");
  }

  if (contribution.promotedAt) {
    throw new Error("Contribution has already been promoted.");
  }

  const prologFact =
    contribution.mode === "suggest_remove"
      ? buildRemovalPrologFact(contribution)
      : buildPrologFact(contribution, params.official);
  const prologFile =
    contribution.mode === "suggest_remove"
      ? removePrologFact(contribution.commandKey, prologFact)
      : appendPrologFact(contribution.commandKey, prologFact);
  const now = new Date().toISOString();

  contribution.promotedAt = now;
  contribution.promotedBy = promotedBy;
  contribution.prologFact = prologFact;
  contribution.prologFile = prologFile;
  contribution.updatedAt = now;
  contribution.updatedBy = promotedBy;

  writeContributionFile(file);

  return contribution;
}

function readContributionFile(): ContributionFile {
  if (!fs.existsSync(contributionPath)) {
    return { contributions: [] };
  }

  const parsed = JSON.parse(fs.readFileSync(contributionPath, "utf-8"));

  return {
    contributions: Array.isArray(parsed.contributions)
      ? parsed.contributions
      : [],
  };
}

function writeContributionFile(file: ContributionFile) {
  fs.mkdirSync(path.dirname(contributionPath), { recursive: true });
  fs.writeFileSync(contributionPath, JSON.stringify(file, null, 2), "utf-8");
}

function appendPrologFact(commandKey: string, prologFact: string) {
  const commandFiles = fs
    .readdirSync(PROLOG_COMMANDS_ROOT)
    .filter((fileName) => fileName.endsWith(".pl"));

  for (const fileName of commandFiles) {
    const filePath = path.join(PROLOG_COMMANDS_ROOT, fileName);
    const content = fs.readFileSync(filePath, "utf-8");
    const lines = content.split(/\r?\n/);
    const commandIndexes = lines
      .map((line, index) => (line.includes(commandKey) ? index : -1))
      .filter((index) => index >= 0);

    if (commandIndexes.length === 0) {
      continue;
    }

    const insertIndex = commandIndexes[commandIndexes.length - 1] + 1;
    lines.splice(insertIndex, 0, prologFact);
    fs.writeFileSync(filePath, lines.join("\n"), "utf-8");

    return path.relative(process.cwd(), filePath);
  }

  throw new Error("Could not find the Prolog command file for this command.");
}

function removePrologFact(commandKey: string, prologFact: string) {
  const commandFiles = fs
    .readdirSync(PROLOG_COMMANDS_ROOT)
    .filter((fileName) => fileName.endsWith(".pl"));

  for (const fileName of commandFiles) {
    const filePath = path.join(PROLOG_COMMANDS_ROOT, fileName);
    const content = fs.readFileSync(filePath, "utf-8");

    if (!content.includes(commandKey)) {
      continue;
    }

    const lines = content.split(/\r?\n/);
    const targetIndex = lines.findIndex((line) => line.trim() === prologFact);

    if (targetIndex < 0) {
      continue;
    }

    lines.splice(targetIndex, 1);
    fs.writeFileSync(filePath, lines.join("\n"), "utf-8");

    return path.relative(process.cwd(), filePath);
  }

  throw new Error("Could not find the Prolog fact targeted for removal.");
}

function buildRemovalPrologFact(contribution: CommandContribution) {
  if (!contribution.target?.currentText) {
    throw new Error("Removal suggestions require a current target.");
  }

  switch (contribution.type) {
    case "requirement":
      return `normal_obedience(${contribution.commandKey}, ${toPrologString(
        contribution.target.currentText
      )}).`;
    case "study_note":
      return `study_note(${contribution.commandKey}, ${toPrologString(
        contribution.target.currentText
      )}).`;
    case "translation_note":
      return `translation_note(${contribution.commandKey}, ${toPrologString(
        contribution.target.currentText
      )}).`;
    case "clarification_note":
      return `clarification_note(${contribution.commandKey}, ${toPrologString(
        contribution.target.currentText
      )}).`;
    case "source_term":
      return buildSourceTermRemovalFact(contribution);
    case "story_reference":
      return buildStoryReferenceRemovalFact(contribution);
    default:
      throw new Error("Unsupported contribution type.");
  }
}

function buildSourceTermRemovalFact(contribution: CommandContribution) {
  const sourceTerm =
    typeof contribution.target?.currentValue === "object" &&
    contribution.target.currentValue !== null
      ? (contribution.target.currentValue as Record<string, unknown>)
      : null;

  if (
    !sourceTerm ||
    typeof sourceTerm.language !== "string" ||
    typeof sourceTerm.term !== "string" ||
    typeof sourceTerm.gloss !== "string"
  ) {
    throw new Error("Source-term removal requires the current source term.");
  }

  return `source_term(${contribution.commandKey}, ${normalizeSourceLanguage(
    sourceTerm.language
  )}, ${toPrologAtomOrString(sourceTerm.term.trim())}, ${toPrologString(
    sourceTerm.gloss.trim()
  )}).`;
}

function buildStoryReferenceRemovalFact(contribution: CommandContribution) {
  const storyReference =
    typeof contribution.target?.currentValue === "object" &&
    contribution.target.currentValue !== null
      ? (contribution.target.currentValue as Record<string, unknown>)
      : null;

  if (
    !storyReference ||
    typeof storyReference.reference !== "string" ||
    typeof storyReference.label !== "string"
  ) {
    throw new Error("Story-reference removal requires the current reference.");
  }

  return `story_reference(${contribution.commandKey}, ${toPrologString(
    storyReference.reference.trim()
  )}, ${toPrologString(storyReference.label.trim())}).`;
}

function buildPrologFact(
  contribution: CommandContribution,
  official: Record<string, unknown>
) {
  switch (contribution.type) {
    case "requirement":
      return `normal_obedience(${contribution.commandKey}, ${toPrologString(
        getOfficialText(official, "requirementText")
      )}).`;
    case "study_note":
      return `study_note(${contribution.commandKey}, ${toPrologString(
        getOfficialText(official, "studyNote")
      )}).`;
    case "translation_note":
      return `translation_note(${contribution.commandKey}, ${toPrologString(
        getOfficialText(official, "translationNote")
      )}).`;
    case "clarification_note":
      return `clarification_note(${contribution.commandKey}, ${toPrologString(
        getOfficialText(official, "clarificationNote")
      )}).`;
    case "story_reference":
      return `story_reference(${contribution.commandKey}, ${toPrologString(
        getOfficialText(official, "reference")
      )}, ${toPrologString(getOfficialText(official, "label"))}).`;
    case "source_term":
      return `source_term(${contribution.commandKey}, ${normalizeSourceLanguage(
        official.language
      )}, ${toPrologAtomOrString(
        getOfficialText(official, "term")
      )}, ${toPrologString(getOfficialText(official, "gloss"))}).`;
    default:
      throw new Error("Unsupported contribution type.");
  }
}

function getOfficialText(official: Record<string, unknown>, fieldName: string) {
  const value = official[fieldName];

  if (typeof value !== "string" || !value.trim()) {
    throw new Error(`${fieldName} is required.`);
  }

  return value.trim();
}

function normalizeSourceLanguage(value: unknown) {
  if (typeof value !== "string") {
    throw new Error("language is required.");
  }

  const language = value.trim().toLowerCase();

  if (!["hebrew", "aramaic", "greek"].includes(language)) {
    throw new Error("language must be hebrew, aramaic, or greek.");
  }

  return language;
}

function toPrologAtomOrString(value: string) {
  return safeAtomPattern.test(value) ? value : toPrologString(value);
}

function toPrologString(value: string) {
  return `'${value.replace(/'/g, "''")}'`;
}

function findContribution(file: ContributionFile, id: string) {
  const contribution = file.contributions.find((item) => item.id === id);

  if (!contribution) {
    throw new Error("Contribution not found.");
  }

  return contribution;
}

function normalizeCommandKey(value: string) {
  const commandKey = value.trim();
  assertSafeAtom(commandKey, "commandKey");
  return commandKey;
}

function assertSafeAtom(value: string, fieldName: string): void {
  if (!safeAtomPattern.test(value)) {
    throw new Error(`${fieldName} must be a lowercase Prolog atom key.`);
  }
}

function normalizeContributionType(value: string): CommandContributionType {
  const type = value.trim() as CommandContributionType;

  if (!commandContributionTypes.includes(type)) {
    throw new Error(
      `Contribution type must be one of: ${commandContributionTypes.join(", ")}.`
    );
  }

  return type;
}

function normalizeContributionMode(value: string): CommandContributionMode {
  const mode = value.trim() as CommandContributionMode;

  if (!commandContributionModes.includes(mode)) {
    throw new Error(
      `Contribution mode must be one of: ${commandContributionModes.join(", ")}.`
    );
  }

  return mode;
}

function normalizeContributionStatus(value: string): CommandContributionStatus {
  const status = value.trim() as CommandContributionStatus;

  if (!commandContributionStatuses.includes(status)) {
    throw new Error(
      `Contribution status must be one of: ${commandContributionStatuses.join(", ")}.`
    );
  }

  return status;
}

function normalizeContributionTarget(
  value: unknown
): CommandContributionTarget | undefined {
  if (value === undefined || value === null) {
    return undefined;
  }

  if (typeof value !== "object" || Array.isArray(value)) {
    throw new Error("Contribution target must be an object.");
  }

  const target = value as Record<string, unknown>;
  const source = target.source;

  if (source !== "prolog" && source !== "contribution") {
    throw new Error("Contribution target source must be prolog or contribution.");
  }

  return {
    source,
    index: typeof target.index === "number" ? target.index : undefined,
    currentText:
      typeof target.currentText === "string" ? target.currentText : undefined,
    currentValue: target.currentValue,
  };
}

function normalizeContributionText(value: string) {
  const text = value.trim();

  if (!text) {
    throw new Error("Contribution text is required.");
  }

  if (text.length > 2500) {
    throw new Error("Contribution text must be 2500 characters or fewer.");
  }

  return text;
}

function normalizeOptionalText(value?: string) {
  const text = value?.trim();

  return text || undefined;
}

function normalizeUsername(value?: string) {
  const username = value?.trim() ?? "";

  if (!username) {
    throw new Error("Contributor username is required.");
  }

  if (username !== username.toLowerCase() || !usernamePattern.test(username)) {
    throw new Error(
      "Contributor username must be lowercase, contain no spaces, and use 2-32 letters, numbers, underscores, or hyphens."
    );
  }

  return username;
}
