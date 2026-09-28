/*
 * File: src/components/library/StudyBoxLibraryView.tsx
 * Purpose: Keeps the StudyBox library inside the calendar application shell.
 */

import { createElement, useState } from "react";
import { Linking, Platform, Pressable, Text, View } from "react-native";
import type { LibraryTeaching } from "../../types/library";
import PublisherWorkspace from "./PublisherWorkspace";
import PublicationsView from "./PublicationsView";

export default function StudyBoxLibraryView({
  height,
  teachingId,
  adminToken,
  memberToken,
  username,
  teachings = [],
}: {
  height: number;
  teachingId?: string | null;
  adminToken?: string | null;
  memberToken: string;
  username: string;
  teachings?: LibraryTeaching[];
}) {
  const [section, setSection] = useState<
    "library" | "publications" | "publisher"
  >("library");

  if (Platform.OS === "web") {
    const query = teachingId
      ? `?teaching=${encodeURIComponent(teachingId)}`
      : "";

    const libraryFrame = createElement("iframe" as any, {
      title: "StudyBox Teaching Library",
      src: `/library${query}`,
      style: {
        display: "block",
        width: "100%",
        height: `${Math.max(680, height)}px`,
        border: "1px solid #dfe5db",
        borderRadius: "14px",
        background: "#ffffff",
      },
    });

    const canPublish =
      Boolean(adminToken) || username.trim().toLowerCase() === "tanner";
    const availableSections = canPublish
      ? (["library", "publications", "publisher"] as const)
      : (["library", "publications"] as const);

    return (
      <View style={{ minHeight: Math.max(680, height), gap: 10 }}>
        <View style={{ flexDirection: "row", gap: 8 }}>
          {availableSections.map((item) => (
            <Pressable
              key={item}
              onPress={() => setSection(item)}
              style={{
                paddingHorizontal: 16,
                paddingVertical: 10,
                borderRadius: 10,
                backgroundColor: section === item ? "#28523b" : "#e8f1ea",
              }}
            >
              <Text
                style={{
                  fontWeight: "900",
                  color: section === item ? "#ffffff" : "#28523b",
                  textTransform: "capitalize",
                }}
              >
                {item}
              </Text>
            </Pressable>
          ))}
        </View>
        {section === "library" ? (
          libraryFrame
        ) : section === "publications" ? (
          <View
            style={{
              minHeight: Math.max(680, height),
              borderWidth: 1,
              borderColor: "#dfe5db",
              borderRadius: 14,
              overflow: "hidden",
              backgroundColor: "#f8faf8",
            }}
          >
            <PublicationsView height={height} memberToken={memberToken} />
          </View>
        ) : (
          <View
            style={{
              height: Math.max(680, height),
              borderWidth: 1,
              borderColor: "#dfe5db",
              borderRadius: 14,
              overflow: "hidden",
              backgroundColor: "#f8faf8",
            }}
          >
            <PublisherWorkspace
              adminToken={adminToken}
              memberToken={memberToken}
              username={username}
              teachings={teachings}
            />
          </View>
        )}
      </View>
    );
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
