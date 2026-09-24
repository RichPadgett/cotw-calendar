/*
 * File: src/components/calendar/CalendarViewSwitcher.tsx
 * Purpose: Switches between familiar calendar viewing modes.
 */

import { Pressable, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export type CalendarViewMode = "month" | "year" | "day" | "wheel" | "strip";

type Props = {
  value: CalendarViewMode;
  onChange: (mode: CalendarViewMode) => void;
};

const MODES: {
  id: CalendarViewMode;
  label: string;
  icon: keyof typeof MaterialIcons.glyphMap;
}[] = [
  { id: "month", label: "Month", icon: "calendar-view-month" },
  { id: "year", label: "Year", icon: "view-module" },
  { id: "day", label: "Day", icon: "today" },
  { id: "wheel", label: "Wheel", icon: "donut-large" },
  { id: "strip", label: "Strip", icon: "view-week" },
];

export default function CalendarViewSwitcher({ value, onChange }: Props) {
  return (
    <View
      accessibilityRole="tablist"
      style={{
        marginBottom: 12,
        padding: 4,
        borderRadius: 14,
        flexDirection: "row",
        gap: 4,
        backgroundColor: "#eef2f7",
      }}
    >
      {MODES.map((mode) => {
        const isActive = mode.id === value;

        return (
          <Pressable
            key={mode.id}
            accessibilityRole="tab"
            accessibilityState={{ selected: isActive }}
            accessibilityLabel={`${mode.label} calendar view`}
            onPress={() => onChange(mode.id)}
            style={({ pressed }) => ({
              flex: 1,
              minHeight: 42,
              paddingHorizontal: 6,
              borderRadius: 11,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 5,
              backgroundColor: isActive ? "#ffffff" : "transparent",
              borderWidth: isActive ? 1 : 0,
              borderColor: "#d7dee8",
              opacity: pressed ? 0.72 : 1,
            })}
          >
            <MaterialIcons
              name={mode.icon}
              size={17}
              color={isActive ? "#0f3b2b" : "#64748b"}
            />
            <Text
              numberOfLines={1}
              style={{
                fontSize: 12,
                fontWeight: "900",
                color: isActive ? "#0f3b2b" : "#64748b",
              }}
            >
              {mode.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
