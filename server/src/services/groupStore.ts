/*
 * File: server/src/services/groupStore.ts
 * Purpose: Server-side storage, persistence, or integration service.
 */

import crypto from "crypto";
import fs from "fs";
import path from "path";

const SERVER_ROOT = path.resolve(__dirname, "../..");
const GROUPS_ROOT = path.join(SERVER_ROOT, "content", "groups");

export type GroupRole = "member" | "admin";

export type AdminSession = {
  tokenHash: string;
  createdAt: string;
  deviceName?: string;
};

export type GroupRecord = {
  groupCode: string;
  adminCodeHash: string;
  createdAt: string;
  adminSessions?: AdminSession[];
};

export type JoinOrCreateGroupResult = {
  groupCode: string;
  role: GroupRole;
  createdGroup: boolean;
  adminToken?: string;
};

/** normalize group code. */
function normalizeGroupCode(value: string) {
  return value.trim().toLowerCase();
}

/** check whether h value. */
function hashValue(value: string) {
  return crypto.createHash("sha256").update(value.trim()).digest("hex");
}

/** check whether h admin code. */
function hashAdminCode(adminCode: string) {
  return hashValue(adminCode);
}

/** check whether h token. */
function hashToken(token: string) {
  return hashValue(token);
}

/** create admin token. */
function createAdminToken() {
  return crypto.randomBytes(32).toString("hex");
}

/** get group folder. */
function getGroupFolder(groupCode: string) {
  return path.join(GROUPS_ROOT, groupCode);
}

/** get group meta path. */
function getGroupMetaPath(groupCode: string) {
  return path.join(getGroupFolder(groupCode), "group.json");
}

/** save group. */
function saveGroup(group: GroupRecord) {
  const groupFolder = getGroupFolder(group.groupCode);

  fs.mkdirSync(groupFolder, { recursive: true });

  fs.writeFileSync(
    getGroupMetaPath(group.groupCode),
    JSON.stringify(group, null, 2),
    "utf-8"
  );
}

/** check whether sue admin token. */
function issueAdminToken(group: GroupRecord, deviceName?: string) {
  const adminToken = createAdminToken();

  group.adminSessions = [
    ...(group.adminSessions ?? []),
    {
      tokenHash: hashToken(adminToken),
      createdAt: new Date().toISOString(),
      deviceName,
    },
  ];

  saveGroup(group);

  return adminToken;
}

/** group exists. */
export function groupExists(groupCode: string) {
  const normalizedGroupCode = normalizeGroupCode(groupCode);

  return fs.existsSync(getGroupMetaPath(normalizedGroupCode));
}

/** get group. */
export function getGroup(groupCode: string): GroupRecord | null {
  const normalizedGroupCode = normalizeGroupCode(groupCode);
  const groupPath = getGroupMetaPath(normalizedGroupCode);

  if (!fs.existsSync(groupPath)) {
    return null;
  }

  return JSON.parse(fs.readFileSync(groupPath, "utf-8"));
}

/** join or create group. */
export function joinOrCreateGroup(params: {
  groupCode: string;
  adminCode?: string;
  deviceName?: string;
}): JoinOrCreateGroupResult {
  const groupCode = normalizeGroupCode(params.groupCode);
  const adminCode = params.adminCode?.trim() ?? "";

  if (!groupCode) {
    throw new Error("Group code is required.");
  }

  const existingGroup = getGroup(groupCode);
  const deviceName = params.deviceName?.trim() || "Unknown Device";
  /*
    Existing group:
    - no admin code = member
    - correct admin code = admin + token
    - wrong admin code = error
  */
  if (existingGroup) {
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

    const adminToken = issueAdminToken(existingGroup, deviceName);

    return {
      groupCode,
      role: "admin",
      createdGroup: false,
      adminToken,
    };
  }

  /*
    New group:
    - public without existing group = allowed as member fallback
    - any other missing group requires admin code to create
  */
  if (groupCode === "public" && !adminCode) {
    return {
      groupCode,
      role: "member",
      createdGroup: false,
    };
  }

  if (!adminCode) {
    throw new Error(
      "This group does not exist. Ask your group admin for the correct group code, or enter an admin code to create it."
    );
  }

  const newGroup: GroupRecord = {
    groupCode,
    adminCodeHash: hashAdminCode(adminCode),
    createdAt: new Date().toISOString(),
    adminSessions: [],
  };

  const adminToken = issueAdminToken(newGroup, deviceName);

  return {
    groupCode,
    role: "admin",
    createdGroup: true,
    adminToken,
  };
}

/** verify admin token. */
export function verifyAdminToken(params: {
  groupCode: string;
  token?: string;
}) {
  const groupCode = normalizeGroupCode(params.groupCode);
  const token = params.token?.trim() ?? "";

  if (!groupCode || !token) {
    return false;
  }

  const group = getGroup(groupCode);

  if (!group) {
    return false;
  }

  const tokenHash = hashToken(token);

  return Boolean(
    group.adminSessions?.some((session) => session.tokenHash === tokenHash)
  );
}
