/*
 * File: src/components/calendar/AppHeader.tsx
 * Purpose: Calendar UI component for rendering AppHeader behavior and presentation.
 * Author: rpadgett
 */

import { Image, Pressable, Text, View } from "react-native";

import { MaterialIcons } from "@expo/vector-icons";
import { CalendarNode, EnochMonth } from "../../models/calendar";

type Props = {
  // Currently active Enoch month
  month?: EnochMonth;
  todayNode?: CalendarNode;

  // Top secondary label
  // Example:
  // "Enoch Year 2026"
  gregorianLabel: string;
  onChangeGroup: () => void;

  // Optional navigation actions
  onPressToday?: () => void;
  onPreviousMonth?: () => void;
  onNextMonth?: () => void;
};

/**
 * Creates the sticky app header above the calendar.
 * This UX component shows the active month context, today reference, and previous/next year controls.
 */
export default function AppHeader({
  month,
  gregorianLabel,
  onChangeGroup,
  onPressToday,
  onPreviousMonth,
  onNextMonth,
  todayNode,
}: Props) {
  return (
    <View
      style={{
        /*
          Main sticky header card
        */
        marginBottom: 0,

        padding: 16,

        borderRadius: 20,

        backgroundColor: "#f9fafb",

        borderWidth: 1,
        borderColor: "#e5e7eb",
      }}
    >
      {/* ====================================================
          TOP ROW
          Title + Navigation Buttons
      ==================================================== */}

      <View
        style={{
          flexDirection: "row",

          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Calendar Title */}

        <View style={{ flex: 1 }}>
          <Text
            numberOfLines={1}
            adjustsFontSizeToFit
            minimumFontScale={0.72}
            style={{
              fontSize: 34,
              fontWeight: "900",
              color: "#081a33",
              letterSpacing: 4.5,
            }}
          >
            YHWH
          </Text>

          <Text
            numberOfLines={1}
            adjustsFontSizeToFit
            minimumFontScale={0.75}
            style={{
              marginTop: -2,
              fontSize: 18,
              fontWeight: "800",
              color: "#081a33",
              letterSpacing: 2.5,
              textTransform: "uppercase",
            }}
          >
            Perpetual Calendar
          </Text>
        </View>

        {/* Navigation יהוה Buttons */}

        <View
          style={{
            flexDirection: "row",
            gap: 8,
            flexShrink: 0,
          }}
        >
          {/* Previous Month */}

          <Pressable
            onPress={onPreviousMonth}
            style={{
              width: 36,
              height: 36,

              borderRadius: 18,

              backgroundColor: "#e5e7eb",

              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <MaterialIcons name="chevron-left" size={28} />
          </Pressable>

          {/* Next Month */}

          <Pressable
            onPress={onNextMonth}
            style={{
              width: 36,
              height: 36,

              borderRadius: 18,

              backgroundColor: "#e5e7eb",

              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <MaterialIcons name="chevron-right" size={28} />
          </Pressable>
        </View>
      </View>

      {/* ====================================================
          SECONDARY LABEL
      ==================================================== */}

      <Text
        style={{
          marginTop: 4,

          fontSize: 16,

          color: "#6b7280",
        }}
      >
        {gregorianLabel}
      </Text>

      {/* ====================================================
          ACTIVE MONTH INFORMATION
      ==================================================== */}

      {month && (
        <View
          style={{
            marginTop: 16,

            flexDirection: "row",

            alignItems: "center",

            gap: 12,
          }}
        >
          {/* Month Symbol/Icon */}

          {month.symbolImage && (
            <Image
              source={month.symbolImage}
              style={{
                width: 56,
                height: 56,
              }}
              resizeMode="contain"
            />
          )}

          {/* Month Metadata */}

          <View>
            {/* Primary Month Label */}

            <Text
              style={{
                fontSize: 22,
                fontWeight: "800",
              }}
            >
              Month {month.number}
            </Text>

            {/* Season Label */}

            <Text
              style={{
                marginTop: 2,

                fontSize: 14,

                color: "#6b7280",

                textTransform: "capitalize",
              }}
            >
              {month.season}
            </Text>

            {todayNode ? (
              <Pressable
                onPress={onPressToday}
                style={{
                  marginTop: 8,

                  paddingHorizontal: 10,
                  paddingVertical: 6,

                  borderRadius: 999,

                  backgroundColor: todayNode.enoch?.events?.[0]
                    ? "#eff6ff"
                    : "#ffffff",

                  borderWidth: 1,
                  borderColor: todayNode.enoch?.events?.[0]
                    ? "#bfdbfe"
                    : "#e5e7eb",

                  alignSelf: "flex-start",
                }}
              >
                <Text
                  style={{
                    fontSize: 11,
                    fontWeight: "800",
                    color: "#374151",
                  }}
                >
                  {`Today • M${todayNode.enoch?.month?.number ?? ""} D${
                    todayNode.enoch?.day ?? ""
                  }`}
                </Text>

                {todayNode.enoch?.events?.[0] ? (
                  <Text
                    style={{
                      marginTop: 2,

                      fontSize: 10,
                      fontWeight: "700",

                      color: todayNode.enoch.events[0].color ?? "#2563eb",
                    }}
                  >
                    {todayNode.enoch.events[0].englishName}
                  </Text>
                ) : null}
              </Pressable>
            ) : null}

            {/* Future Optional Metadata
                Hebrew / Paleo Hebrew / Babylonian names
            */}

            {/*
            <Text>{month.hebrew}</Text>
            <Text>{month.paleoHebrew}</Text>
            */}
          </View>
          <Pressable
            onPress={onChangeGroup}
            style={{
              position: "absolute",
              right: 24,
              bottom: 24,

              width: 42,
              height: 42,
              borderRadius: 21,

              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <MaterialIcons name="logout" size={28} color="#6b7280" />
          </Pressable>
        </View>
      )}
    </View>
  );
}
