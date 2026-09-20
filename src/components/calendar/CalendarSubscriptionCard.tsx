/*
 * File: src/components/calendar/CalendarSubscriptionCard.tsx
 * Purpose: Subscription controls for the public Enoch appointed-times calendar feed.
 */

import { MaterialIcons } from "@expo/vector-icons";
import { useMemo, useState } from "react";
import {
  Linking,
  Platform,
  Pressable,
  Share,
  Text,
  View,
} from "react-native";

import { API_BASE_URL } from "../../config/api";

function getCalendarOrigin() {
  if (API_BASE_URL) return API_BASE_URL;

  if (Platform.OS === "web" && typeof window !== "undefined") {
    return window.location.origin;
  }

  return "https://enochscalendar.com";
}

export default function CalendarSubscriptionCard() {
  const [copied, setCopied] = useState(false);
  const feedUrl = useMemo(
    () => `${getCalendarOrigin()}/api/calendar/subscriptions/appointed-times.ics`,
    []
  );
  const downloadUrl = `${feedUrl}?download=1`;
  const webcalUrl = feedUrl.replace(/^https?:\/\//, "webcal://");

  async function copyOrShareFeed() {
    if (
      Platform.OS === "web" &&
      typeof navigator !== "undefined" &&
      navigator.clipboard
    ) {
      await navigator.clipboard.writeText(feedUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
      return;
    }

    await Share.share({
      message: feedUrl,
      title: "Enoch's Calendar — Appointed Times",
    });
  }

  return (
    <View
      style={{
        marginBottom: 16,
        padding: 16,
        gap: 12,
        borderWidth: 1,
        borderColor: "#bbf7d0",
        borderRadius: 18,
        backgroundColor: "#f0fdf4",
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
        <View
          style={{
            width: 38,
            height: 38,
            borderRadius: 19,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#dcfce7",
          }}
        >
          <MaterialIcons name="event-available" size={21} color="#166534" />
        </View>
        <View style={{ flex: 1, gap: 2 }}>
          <Text style={{ fontSize: 16, fontWeight: "900", color: "#14532d" }}>
            Add appointed times to your calendar
          </Text>
          <Text style={{ fontSize: 12, lineHeight: 17, color: "#3f6212" }}>
            Subscribe once to receive Passover, Shavuot, Trumpets, Atonement,
            Sukkot, and future date updates on their Gregorian dates.
          </Text>
        </View>
      </View>

      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
        <SubscriptionButton
          icon="calendar-month"
          label="Calendar app"
          onPress={() => Linking.openURL(webcalUrl)}
        />
        <SubscriptionButton
          icon={copied ? "check" : "content-copy"}
          label={copied ? "Link copied" : Platform.OS === "web" ? "Copy link" : "Share link"}
          onPress={copyOrShareFeed}
        />
        <SubscriptionButton
          icon="download"
          label="Download .ics"
          onPress={() => Linking.openURL(downloadUrl)}
        />
      </View>

      <Text selectable style={{ fontSize: 11, color: "#4d7c0f" }}>
        Google Calendar: copy the link, then use Other calendars → From URL on
        the Google Calendar website.
      </Text>
    </View>
  );
}

function SubscriptionButton({
  icon,
  label,
  onPress,
}: {
  icon: keyof typeof MaterialIcons.glyphMap;
  label: string;
  onPress: () => void | Promise<void>;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
      style={({ pressed }) => [
        {
          minHeight: 38,
          paddingHorizontal: 12,
          flexDirection: "row",
          alignItems: "center",
          gap: 6,
          borderRadius: 999,
          backgroundColor: "#166534",
        },
        pressed && { opacity: 0.78 },
      ]}
    >
      <MaterialIcons name={icon} size={17} color="#ffffff" />
      <Text style={{ fontSize: 12, fontWeight: "800", color: "#ffffff" }}>
        {label}
      </Text>
    </Pressable>
  );
}

