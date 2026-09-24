import { useCallback, useEffect, useState } from "react";
import { Linking, Pressable, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { API_BASE_URL } from "../../config/api";

const STUDYBOX_URL = "https://studybox.enochscalendar.com";
const STATUS_REFRESH_MS = 30_000;

export default function ShabbatView() {
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);

  const checkAvailability = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/shabbat/status`, {
        cache: "no-store",
      });
      const result = await response.json();
      setIsAvailable(response.ok && result.available === true);
    } catch {
      setIsAvailable(false);
    }
  }, []);

  useEffect(() => {
    void checkAvailability();
    const intervalId = window.setInterval(checkAvailability, STATUS_REFRESH_MS);

    return () => window.clearInterval(intervalId);
  }, [checkAvailability]);

  if (isAvailable) {
    return (
      <View
        style={
          {
            // The app ScrollView has 16px content padding. Break out of it so
            // the desktop embed can use the full browser width.
            width: "calc(100% + 32px)",
            maxWidth: "none",
            minHeight: 720,
            alignSelf: "stretch",
            marginLeft: -16,
            overflow: "hidden",
            borderRadius: 20,
            backgroundColor: "#ffffff",
          } as any
        }
      >
        <Pressable
          accessibilityRole="link"
          accessibilityLabel="Open the StudyBox teaching library"
          onPress={() =>
            void Linking.openURL("https://enochscalendar.com/library")
          }
          style={({ pressed }) => ({
            minHeight: 64,
            paddingHorizontal: 18,
            flexDirection: "row",
            alignItems: "center",
            gap: 12,
            borderWidth: 1,
            borderColor: "#365314",
            borderRadius: 16,
            backgroundColor: pressed ? "#1f351d" : "#17251b",
            opacity: pressed ? 0.84 : 1,
          })}
        >
          <MaterialIcons name="menu-book" size={25} color="#86efac" />
          <View style={{ flex: 1 }}>
            <Text style={{ color: "#f0fdf4", fontSize: 16, fontWeight: "900" }}>
              StudyBox Teaching Library
            </Text>
            <Text
              style={{
                marginTop: 2,
                color: "#a7f3d0",
                fontSize: 12,
                fontWeight: "700",
              }}
            >
              Browse recordings, transcripts, and study archives
            </Text>
          </View>
          <MaterialIcons name="arrow-forward-ios" size={16} color="#86efac" />
        </Pressable>
        <iframe
          src={STUDYBOX_URL}
          title="Church of the Word StudyBox"
          allow="camera; microphone; fullscreen; display-capture"
          allowFullScreen
          style={{ width: "100%", minHeight: 720, border: 0 }}
        />
      </View>
    );
  }

  return (
    <View style={{ width: "100%", maxWidth: 760, alignSelf: "center" }}>
      <View
        style={{
          padding: 22,
          borderRadius: 20,
          backgroundColor: "#0b2345",
        }}
      >
        <Text style={{ color: "#ffffff", fontSize: 27, fontWeight: "900" }}>
          {isAvailable === null ? "Checking StudyBox…" : "StudyBox is offline"}
        </Text>
        <Text
          style={{
            marginTop: 8,
            color: "#dbeafe",
            fontSize: 15,
            lineHeight: 22,
          }}
        >
          {isAvailable === null
            ? "Checking whether the Shabbat gathering is live."
            : "The gathering site is not available right now. You can retry here or check it in a new window."}
        </Text>
        <View style={{ marginTop: 18, flexDirection: "row", gap: 10 }}>
          <Pressable
            onPress={() => void checkAvailability()}
            style={({ pressed }) => ({
              flex: 1,
              minHeight: 48,
              paddingHorizontal: 14,
              borderRadius: 14,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: pressed ? "#d6a936" : "#f4c95d",
            })}
          >
            <Text style={{ color: "#172033", fontSize: 15, fontWeight: "900" }}>
              Retry
            </Text>
          </Pressable>
          <Pressable
            accessibilityRole="link"
            onPress={() => void Linking.openURL(STUDYBOX_URL)}
            style={({ pressed }) => ({
              flex: 1,
              minHeight: 48,
              paddingHorizontal: 14,
              borderRadius: 14,
              borderWidth: 1,
              borderColor: "#93c5fd",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: pressed ? "#172554" : "transparent",
            })}
          >
            <Text style={{ color: "#ffffff", fontSize: 15, fontWeight: "900" }}>
              Open separately
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
