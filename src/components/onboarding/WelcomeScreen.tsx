/*
 * File: src/components/onboarding/WelcomeScreen.tsx
 * Purpose: Onboarding UI for entering the calendar group code before loading the main app.
 * Author: rpadgett
 */

import { Pressable, Text, TextInput, View } from "react-native";

console.log("WelcomeScreen loaded");
type Props = {
  groupCode: string;
  setGroupCode: (value: string) => void;
  onContinue: () => void;
};

/**
 * Creates the group-code welcome screen shown before the calendar loads.
 * This UX component collects the group code and hands control back to the main app entry flow.
 */
export default function WelcomeScreen({
  groupCode,
  setGroupCode,
  onContinue,
}: Props) {
  return (
    <View
      style={{
        flex: 1,
        padding: 24,
        justifyContent: "center",
        backgroundColor: "#ffffff",
      }}
    >
      <Text style={{ fontSize: 34, fontWeight: "900" }}>
        YHWH Perpetual Calendar
      </Text>

      <Text style={{ marginTop: 12, fontSize: 16, color: "#6b7280" }}>
        Follow the appointed times, seasons, sabbaths, and community notices.
      </Text>

      <TextInput
        value={groupCode === "public" ? "" : groupCode}
        onChangeText={setGroupCode}
        placeholder="Group code optional"
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
        Leave blank to use the public calendar.
      </Text>

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
