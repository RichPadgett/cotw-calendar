// src/components/calendar/MonthHeader.tsx

import {
  Image,
  Pressable,
  Text,
  View,
} from "react-native";

import { CalendarNode, EnochMonth } from "../../models/calendar";

type Props = {
  // Currently active Enoch month
  month?: EnochMonth;
  todayNode?: CalendarNode;

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

        <Text
          style={{
            fontSize: 28,
            fontWeight: "800",
          }}
        >
          YHWH Perpetual Calendar
        </Text>
        

        {/* Navigation יהוה Buttons */}

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

            {todayNode ? (
              <View
                style={{
                  marginTop: 8,

                  paddingHorizontal: 10,
                  paddingVertical: 6,

                  borderRadius: 999,

                  backgroundColor:
                    todayNode.enoch?.events?.[0]
                      ? "#eff6ff"
                      : "#ffffff",

                  borderWidth: 1,
                  borderColor:
                    todayNode.enoch?.events?.[0]
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
                  {`Today • M${todayNode.enoch?.month?.number ?? ""} D${todayNode.enoch?.day ?? ""
                    }`}
                </Text>

                {todayNode.enoch?.events?.[0] ? (
                  <Text
                    style={{
                      marginTop: 2,

                      fontSize: 10,
                      fontWeight: "700",

                      color:
                        todayNode.enoch.events[0].color ??
                        "#2563eb",
                    }}
                  >
                    {todayNode.enoch.events[0].englishName}
                  </Text>
                ) : null}
              </View>
            ) : null}

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