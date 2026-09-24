/*
 * File: src/components/library/StudyBoxLibraryView.tsx
 * Purpose: Keeps the StudyBox library inside the calendar application shell.
 */

import { createElement } from "react";
import { Linking, Platform, Pressable, Text, View } from "react-native";

export default function StudyBoxLibraryView({ height }: { height: number }) {
  if (Platform.OS === "web") {
    return createElement("iframe" as any, {
      title: "StudyBox Teaching Library",
      src: "/library",
      style: {
        display: "block",
        width: "100%",
        height: `${Math.max(680, height)}px`,
        border: "1px solid #dfe5db",
        borderRadius: "14px",
        background: "#ffffff",
      },
    });
  }

  return (
    <View
      style={{
        padding: 20,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: "#dfe5db",
        backgroundColor: "#ffffff",
      }}
    >
      <Text style={{ fontSize: 20, fontWeight: "900", color: "#10231a" }}>
        StudyBox Teaching Library
      </Text>
      <Text style={{ marginTop: 8, lineHeight: 20, color: "#64748b" }}>
        Browse archived teachings, transcripts, recordings, and calendar files.
      </Text>
      <Pressable
        onPress={() =>
          void Linking.openURL("https://enochscalendar.com/library")
        }
        style={({ pressed }) => ({
          marginTop: 16,
          minHeight: 44,
          paddingHorizontal: 16,
          borderRadius: 12,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#244f35",
          opacity: pressed ? 0.8 : 1,
        })}
      >
        <Text style={{ fontWeight: "900", color: "#ffffff" }}>
          Open Library
        </Text>
      </Pressable>
    </View>
  );
}
