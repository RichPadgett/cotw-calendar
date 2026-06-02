import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

import { API_BASE_URL } from "../config/api";

const GROUP_CODE_STORAGE_KEY = "groupCode";
const ROLE_STORAGE_KEY = "userRole";
const ADMIN_TOKEN_STORAGE_KEY = "adminToken";

export type UserRole = "member" | "admin";

export function useGroupSession() {
  const [hasEnteredApp, setHasEnteredApp] = useState(false);
  const [hasLoadedGroupCode, setHasLoadedGroupCode] = useState(false);

  const [groupCode, setGroupCode] = useState("public");
  const [adminCode, setAdminCode] = useState("");
  const [userRole, setUserRole] = useState<UserRole>("member");

  const [welcomeError, setWelcomeError] = useState("");
  const [adminToken, setAdminToken] = useState("");

  const deviceName =
    typeof window !== "undefined" ? "Web Browser" : "Mobile App";

  useEffect(() => {
    async function loadSavedSession() {
      try {
        const savedGroupCode = await AsyncStorage.getItem(
          GROUP_CODE_STORAGE_KEY
        );

        const savedRole = await AsyncStorage.getItem(ROLE_STORAGE_KEY);

        if (savedGroupCode) {
          setGroupCode(savedGroupCode);
          setHasEnteredApp(true);
        }

        if (savedRole === "admin") {
          setUserRole("admin");
        } else {
          setUserRole("member");
        }

        const savedAdminToken = await AsyncStorage.getItem(
          ADMIN_TOKEN_STORAGE_KEY
        );

        if (savedAdminToken) {
          setAdminToken(savedAdminToken);
        }

        console.log("saved session group", savedGroupCode);
        console.log("saved session role", savedRole);
      } finally {
        setHasLoadedGroupCode(true);
      }
    }

    loadSavedSession();
  }, []);

  async function joinGroup() {
    setWelcomeError("");

    const normalizedGroupCode = groupCode.trim().toLowerCase() || "public";

    const response = await fetch(`${API_BASE_URL}/api/groups/join`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        groupCode: normalizedGroupCode,
        adminCode: adminCode.trim(),
        deviceName,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      setWelcomeError(data.error ?? "Unable to join group.");
      return;
    }
    console.log(data);

    await AsyncStorage.setItem(GROUP_CODE_STORAGE_KEY, data.groupCode);

    await AsyncStorage.setItem(ROLE_STORAGE_KEY, data.role);

    /*
      Admin tokens are returned only after the server validates the admin code.
      Store the token locally so protected admin requests can reuse it later.
    */
    if (data.adminToken) {
      await AsyncStorage.setItem(ADMIN_TOKEN_STORAGE_KEY, data.adminToken);

      setAdminToken(data.adminToken);
    } else {
      await AsyncStorage.removeItem(ADMIN_TOKEN_STORAGE_KEY);

      setAdminToken("");
    }

    setGroupCode(data.groupCode);
    setUserRole(data.role);
    setAdminCode("");
    setHasEnteredApp(true);
    console.log("join group", data.groupCode);
    console.log("join role", data.role);
  }

  async function changeGroup() {
    // Clear the saved token when changing groups so admin access cannot leak between sessions.
    await AsyncStorage.removeItem(GROUP_CODE_STORAGE_KEY);
    await AsyncStorage.removeItem(ROLE_STORAGE_KEY);
    await AsyncStorage.removeItem(ADMIN_TOKEN_STORAGE_KEY);

    setGroupCode("public");
    setAdminCode("");
    setUserRole("member");
    setHasEnteredApp(false);
  }

  return {
    groupCode,
    setGroupCode,

    adminCode,
    setAdminCode,
    adminToken,
    userRole,
    hasEnteredApp,
    hasLoadedGroupCode,
    welcomeError,

    joinGroup,
    changeGroup,
  };
}
