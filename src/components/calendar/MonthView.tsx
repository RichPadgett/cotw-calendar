/*
 * File: src/components/calendar/MonthView.tsx
 * Purpose: Calendar UI component for rendering MonthView behavior and presentation.
 * Author: rpadgett
 */

import { View } from "react-native";
import { Dimensions } from "react-native";
import { DayCell } from "./DayCell";
import IntercalaryRow from "./IntercalaryRow";

import { CalendarNode } from "../../models/calendar";

type Props = {
  nodes: CalendarNode[];
};

const SCREEN_WIDTH = Dimensions.get("window").width;

const CELL_WIDTH = (SCREEN_WIDTH - 32 - 12) / 7;

/**
 * Creates a compact month grid from calendar nodes.
 * This legacy or focused UX component renders day cells in a seven-column layout.
 */
export default function MonthView({ nodes }: Props) {
  return (
    <View
      style={{
        flexDirection: "row",
        flexWrap: "wrap",
      }}
    >
      {nodes.map((item) => {
        if (item.type === "intercalary") {
          return <IntercalaryRow key={item.gregorianDate} node={item} />;
        }

        return (
          <View
            key={item.gregorianDate}
            style={{
              width: CELL_WIDTH,
              padding: 2,
            }}
          >
            <DayCell node={item} />
          </View>
        );
      })}
    </View>
  );
}
