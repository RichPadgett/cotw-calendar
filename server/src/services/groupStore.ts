import crypto from "crypto";
import fs from "fs";
import path from "path";

const GROUPS_ROOT = path.join(process.cwd(), "content", "groups");

export type GroupRole = "member" | "admin";

export type GroupRecord = {
  groupCode: string;
  adminCodeHash: string;
  createdAt: string;
};

function normalizeGroupCode(value: string) {
  return value.trim().toLowerCase();
}

function hashAdminCode(adminCode: string) {
  return crypto.createHash("sha256").update(adminCode.trim()).digest("hex");
}

function getGroupFolder(groupCode: string) {
  return path.join(GROUPS_ROOT, groupCode);
}

function getGroupMetaPath(groupCode: string) {
  return path.join(getGroupFolder(groupCode), "group.json");
}

export function groupExists(groupCode: string) {
  const normalizedGroupCode = normalizeGroupCode(groupCode);

  return fs.existsSync(getGroupMetaPath(normalizedGroupCode));
}

export function getGroup(groupCode: string): GroupRecord | null {
  const normalizedGroupCode = normalizeGroupCode(groupCode);
  const groupPath = getGroupMetaPath(normalizedGroupCode);

  if (!fs.existsSync(groupPath)) {
    return null;
  }

  return JSON.parse(fs.readFileSync(groupPath, "utf-8"));
}

export function joinOrCreateGroup(params: {
  groupCode: string;
  adminCode?: string;
}): {
  groupCode: string;
  role: GroupRole;
  createdGroup: boolean;
} {
  const groupCode = normalizeGroupCode(params.groupCode);
  const adminCode = params.adminCode?.trim() ?? "";

  if (!groupCode) {
    throw new Error("Group code is required.");
  }

  const existingGroup = getGroup(groupCode);

  if (!existingGroup) {
    if (!adminCode) {
      return {
        groupCode,
        role: "member",
        createdGroup: false,
      };
    }

    const groupFolder = getGroupFolder(groupCode);

    fs.mkdirSync(groupFolder, { recursive: true });

    const newGroup: GroupRecord = {
      groupCode,
      adminCodeHash: hashAdminCode(adminCode),
      createdAt: new Date().toISOString(),
    };

    fs.writeFileSync(
      getGroupMetaPath(groupCode),
      JSON.stringify(newGroup, null, 2),
      "utf-8"
    );

    return {
      groupCode,
      role: "admin",
      createdGroup: true,
    };
  }

  if (!adminCode) {
    return {
      groupCode,
      role: "member",
      createdGroup: false,
    };
  }

  const adminCodeMatches =
    hashAdminCode(adminCode) === existingGroup.adminCodeHash;

  if (!adminCodeMatches) {
    throw new Error("Invalid admin code.");
  }

  return {
    groupCode,
    role: "admin",
    createdGroup: false,
  };
}
