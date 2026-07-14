/*
 * File: src/components/activities/WebOnlyActivities.web.tsx
 * Purpose: Web-only activity links for the public calendar experience.
 */

import { Linking, Pressable, Text, View } from "react-native";

const EXODUS_URL = "https://enochscalendar.com/exodus/";
const EXODUS_QUIZZES_URL = "https://enochscalendar.com/exodus/#quizzes";

const activities = [
  {
    title: "Exodus Game",
    description:
      "Learn the artifacts, collect manna, answer Bible questions, and play through the Exodus adventure.",
    url: EXODUS_URL,
    accessibilityLabel: "Open the Exodus game",
  },
  {
    title: "Exodus Quizzes",
    description:
      "Practice the Bible questions from the Exodus game without starting the DOS player.",
    url: EXODUS_QUIZZES_URL,
    accessibilityLabel: "Open the Exodus quizzes",
  },
];

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

      <View style={{ gap: 10 }}>
        {activities.map((activity) => (
          <Pressable
            key={activity.title}
            accessibilityRole="link"
            accessibilityLabel={activity.accessibilityLabel}
            onPress={() => {
              void Linking.openURL(activity.url);
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
              {activity.title}
            </Text>
            <Text
              style={{
                marginTop: 5,
                color: "#4b5563",
                fontSize: 14,
                lineHeight: 20,
              }}
            >
              {activity.description}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}
