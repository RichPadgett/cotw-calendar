/*
 * File: src/components/onboarding/WelcomeScreen.tsx
 * Purpose: Onboarding UI for entering the calendar group code before loading the main app.
 * Author: rpadgett
 */

import { useState } from "react";
import { ImageBackground, Image, Pressable, Text, TextInput, View } from "react-native";

console.log("WelcomeScreen loaded");
type Props = {
  groupCode: string;
  setGroupCode: (value: string) => void;
  adminCode: string;
  setAdminCode: (value: string) => void;
  welcomeError: string;
  onContinue: () => void;
};

/**
 * Creates the group-code welcome screen shown before the calendar loads.
 * This UX component collects the group code and hands control back to the main app entry flow.
 */
export default function WelcomeScreen({
  groupCode,
  setGroupCode,
  adminCode,
  setAdminCode,
  welcomeError,
  onContinue,
}: Props) {
  const [showIntro, setShowIntro] = useState(true);

  if (showIntro) {
    return (

      <Pressable
        onPress={() => setShowIntro(false)}
        style={{ flex: 1 }}
      >
        <ImageBackground
          source={require("../../../assets/welcome/welcome-logo.png")}
          style={{ flex: 1 }}
          resizeMode="cover"
        />

        <View
          style={{
            position: "absolute",
            bottom: 5,
            left: 0,
            right: 0,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              paddingHorizontal: 18,
              paddingVertical: 8,
              borderRadius: 999,
              backgroundColor: "rgba(255,255,255,0.72)",
              color: "#0b2345",
              fontSize: 14,
              fontWeight: "900",
            }}
          >
            Tap to continue
          </Text>
        </View>
      </Pressable>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        padding: 24,
        justifyContent: "center",
        backgroundColor: "#f9f2e9",
      }}
    >
      {/* <Text style={{ fontSize: 34, fontWeight: "900" }}>
        YHWH Perpetual Calendar
      </Text> */}

      <Image
        source={require("../../../assets/welcome/login-logo.png")}
        style={{
          width: "100%",
          height: 140,
          marginBottom: 24,
        }}
        resizeMode="contain"
      />

      {/* <Text style={{ marginTop: 12, fontSize: 16, color: "#6b7280" }}>
        Follow the appointed times, seasons, sabbaths, and community notices.
      </Text> */}

      <TextInput
        value={groupCode === "public" ? "" : groupCode}
        onChangeText={setGroupCode}
        placeholder="Group code (optional)"
        autoCapitalize="none"
        style={{
          marginTop: 28,
          borderWidth: 1,
          borderColor: "#d1d5db",
          borderRadius: 14,
          padding: 14,
          fontSize: 16,
        }}
      />
      <TextInput
        value={adminCode}
        onChangeText={setAdminCode}
        placeholder="Admin code (only required for group admins)"
        autoCapitalize="none"
        style={{
          marginTop: 28,
          borderWidth: 1,
          borderColor: "#d1d5db",
          borderRadius: 14,
          padding: 14,
          fontSize: 16,
        }}
      />

      <Text style={{ marginTop: 8, fontSize: 12, color: "#6b7280" }}>
        Public calendar available without a group code.
      </Text>

      {welcomeError ? (
        <Text
          style={{
            marginTop: 8,
            color: "#dc2626",
            fontSize: 14,
            fontWeight: "600",
          }}
        >
          {welcomeError}
        </Text>
      ) : null}

      <Pressable
        onPress={onContinue}
        style={{
          marginTop: 24,
          paddingVertical: 16,
          borderRadius: 16,
          backgroundColor: "#111827",
          alignItems: "center",
        }}
      >
        <Text style={{ color: "#ffffff", fontSize: 16, fontWeight: "900" }}>
          Enter Calendar
        </Text>
      </Pressable>
    </View>
  );
}
