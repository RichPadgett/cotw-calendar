/*
 * File: src/components/activities/WebOnlyActivities.web.tsx
 * Purpose: Web-only activity links for the public calendar experience.
 */

import { Linking, Pressable, Text, View } from "react-native";

const EXODUS_URL = "https://enochscalendar.com/exodus/";

/**
 * Creates the web-only Activities panel shown on the calendar home screen.
 */
export default function WebOnlyActivities() {
  return (
    <View
      style={{
        marginBottom: 18,
        borderWidth: 1,
        borderColor: "#d8b45f",
        borderRadius: 12,
        backgroundColor: "#fff8e8",
        padding: 16,
      }}
    >
      <Text
        style={{
          marginBottom: 8,
          color: "#7c4a03",
          fontSize: 12,
          fontWeight: "900",
          letterSpacing: 0.8,
          textTransform: "uppercase",
        }}
      >
        Activities
      </Text>

      <Pressable
        accessibilityRole="link"
        accessibilityLabel="Open the Exodus game"
        onPress={() => {
          void Linking.openURL(EXODUS_URL);
        }}
        style={({ hovered, pressed }) => ({
          borderWidth: 1,
          borderColor: hovered || pressed ? "#b7791f" : "#ead7a6",
          borderRadius: 10,
          backgroundColor: hovered || pressed ? "#fff2cf" : "#ffffff",
          padding: 14,
        })}
      >
        <Text
          style={{
            color: "#1f2937",
            fontSize: 18,
            fontWeight: "900",
          }}
        >
          Exodus Game
        </Text>
        <Text
          style={{
            marginTop: 5,
            color: "#4b5563",
            fontSize: 14,
            lineHeight: 20,
          }}
        >
          Learn the artifacts, collect manna, answer Bible questions, and play
          through the Exodus adventure.
        </Text>
      </Pressable>
    </View>
  );
}
