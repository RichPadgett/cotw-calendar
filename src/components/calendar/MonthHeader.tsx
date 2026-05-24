// src/components/calendar/MonthHeader.tsx

import {
  Image,
  Pressable,
  Text,
  View,
} from "react-native";

import { EnochMonth } from "../../models/calendar";

type Props = {
  // Currently active Enoch month
  month?: EnochMonth;

  // Top secondary label
  // Example:
  // "Enoch Year 2026"
  gregorianLabel: string;

  // Optional navigation actions
  onPreviousMonth?: () => void;
  onNextMonth?: () => void;
};

export default function MonthHeader({
  month,
  gregorianLabel,
  onPreviousMonth,
  onNextMonth,
}: Props) {
  return (
    <View
      style={{
        /*
          Main sticky header card
        */
        marginBottom: 16,

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

        <Text
          style={{
            fontSize: 28,
            fontWeight: "800",
          }}
        >
          Enoch Calendar
        </Text>

        {/* Navigation Buttons */}

        <View
          style={{
            flexDirection: "row",
            gap: 8,
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
            <Text
              style={{
                fontSize: 18,
                fontWeight: "700",
              }}
            >
              ‹
            </Text>
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
            <Text
              style={{
                fontSize: 18,
                fontWeight: "700",
              }}
            >
              ›
            </Text>
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

            {/* Future Optional Metadata
                Hebrew / Paleo Hebrew / Babylonian names
            */}

            {/*
            <Text>{month.hebrew}</Text>
            <Text>{month.paleoHebrew}</Text>
            */}
          </View>
        </View>
      )}
    </View>
  );
}