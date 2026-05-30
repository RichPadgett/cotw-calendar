/*
 * File: src/components/calendar/SabbathWeekRow.tsx
 * Purpose: Calendar UI component for rendering SabbathWeekRow behavior and presentation.
 * Author: rpadgett
 */

import { Pressable, Text, View } from "react-native";

import { CalendarNode } from "../../models/calendar";

type Props = {
  node: CalendarNode;
  onPressDay?: (node: CalendarNode) => void;
};

/**
 * Creates the full-width sabbath-week row shown before sabbath years.
 * This UX component lets the rest week appear as a selectable calendar period.
 */
export default function SabbathWeekRow({
  node,
  onPressDay,
}: Props) {
  const dateRange = node.enoch?.dateRange;

  return (
    <Pressable onPress={() => onPressDay?.(node)}>
      <View
        style={{
          marginTop: 8,
          marginBottom: 28,

          paddingVertical: 20,
          paddingHorizontal: 16,

          borderRadius: 20,

          borderWidth: 2,
          borderColor: "#2563eb",

          backgroundColor: "#eff6ff",

          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 28,
            fontWeight: "800",
            color: "#2563eb",
          }}
        >
          𐤔
        </Text>

        <Text
          style={{
            marginTop: 4,
            fontSize: 22,
            fontWeight: "800",
            color: "#1e3a8a",
          }}
        >
          Sabbath Week
        </Text>

        <Text
          style={{
            marginTop: 4,
            fontSize: 13,
            fontWeight: "700",
            color: "#6b7280",
          }}
        >
          Rest Year
        </Text>

        {dateRange && (
          <Text
            style={{
              marginTop: 10,
              fontSize: 13,
              color: "#374151",
            }}
          >
            {dateRange.start} – {dateRange.end}
          </Text>
        )}
      </View>
    </Pressable>
  );
}
