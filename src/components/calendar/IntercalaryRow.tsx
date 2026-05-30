/*
 * File: src/components/calendar/IntercalaryRow.tsx
 * Purpose: Calendar UI component for rendering IntercalaryRow behavior and presentation.
 * Author: rpadgett
 */

import { Pressable, Text, View } from "react-native";
import { CalendarNode } from "../../models/calendar";

type Props = {
  node: CalendarNode;
  onPressDay?: (node: CalendarNode) => void;
};

/**
 * Creates the row used for intercalary gate days after each quarter.
 * This UX component gives special calendar days their own full-width presentation.
 */
export default function IntercalaryRow({ node, onPressDay }: Props) {
  const season = node.enoch?.season ?? "spring";

  const color =
    season === "spring"
      ? "#16a34a"
      : season === "summer"
        ? "#ca8a04"
        : season === "fall"
          ? "#ea580c"
          : "#2563eb";

  const [year, month, day] = node.gregorianDate.split("-").map(Number);

  const gregorianLabel = new Date(year, month - 1, day).toLocaleDateString(
    "en-US",
    {
      month: "long",
      day: "numeric",
      year: "numeric",
    }
  );

  return (
    <Pressable onPress={() => onPressDay?.(node)}>
      <View
        style={{
          width: "100%",

          marginTop: 20,
          marginBottom: 28,

          paddingVertical: 18,
          paddingHorizontal: 16,

          borderRadius: 20,

          borderWidth: 2,
          borderColor: color,

          backgroundColor: "#f9fafb",

          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 24,
            fontWeight: "800",
            color,
            textAlign: "center",
          }}
        >
          {node.enoch?.label}
        </Text>

        <Text
          style={{
            marginTop: 8,
            fontSize: 22,
            color,
          }}
        >
          ☉
        </Text>

        <Text
          style={{
            marginTop: 10,
            fontSize: 13,
            color: "#6b7280",
            textAlign: "center",
          }}
        >
          {gregorianLabel}
        </Text>
      </View>
    </Pressable>
  );
}
