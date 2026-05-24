// src/components/calendar/MonthHeader.tsx

import { Image, Text, View } from "react-native";
import { EnochMonth } from "../../models/calendar";
import { Pressable } from "react-native";

type Props = {
  month?: EnochMonth;

  gregorianLabel: string;

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
        marginBottom: 16,
        padding: 16,
        borderRadius: 20,
        backgroundColor: "#f9fafb",
        borderWidth: 1,
        borderColor: "#e5e7eb",
      }}
    >
    <View
    style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    }}
    >
    <Text
        style={{
        fontSize: 28,
        fontWeight: "800",
        }}
    >
        Enoch Calendar
    </Text>

    <View
        style={{
        flexDirection: "row",
        gap: 8,
        }}
    >
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

      <Text
        style={{
          marginTop: 4,
          fontSize: 16,
          color: "#6b7280",
        }}
      >
        {gregorianLabel}
      </Text>

      {month && (
        <View
          style={{
            marginTop: 16,
            flexDirection: "row",
            alignItems: "center",
            gap: 12,
          }}
        >
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

          <View>
            <Text
              style={{
                fontSize: 22,
                fontWeight: "800",
              }}
            >
              {month.name}
            </Text>

            <Text
              style={{
                fontSize: 16,
                color: "#374151",
              }}
            >
              {month.hebrew}
            </Text>

            <Text
              style={{
                fontSize: 18,
              }}
            >
              {month.paleoHebrew}
            </Text>

            <Text
              style={{
                marginTop: 2,
                fontSize: 12,
                color: "#6b7280",
                textTransform: "capitalize",
              }}
            >
              Month {month.number} · {month.season}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
}