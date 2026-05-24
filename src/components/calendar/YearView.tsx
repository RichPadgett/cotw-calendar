// src/components/calendar/YearView.tsx

import { Text, View } from "react-native";

import { CalendarNode } from "../../models/calendar";
import { DayCell } from "./DayCell";

type Props = {
  nodes: CalendarNode[];
};

function groupByEnochMonth(nodes: CalendarNode[]) {
  const groups: Record<number, CalendarNode[]> = {};

  for (const node of nodes) {
    const monthNumber = node.enoch?.month?.number;

    if (!monthNumber) {
      continue;
    }

    if (!groups[monthNumber]) {
      groups[monthNumber] = [];
    }

    groups[monthNumber].push(node);
  }

  return groups;
}

export default function YearView({ nodes }: Props) {
  const monthGroups = groupByEnochMonth(nodes);

  return (
    <View>
      {Object.entries(monthGroups).map(([monthNumber, monthNodes]) => {
        const firstNode = monthNodes[0];
        const month = firstNode.enoch?.month;

        return (
          <View
            key={monthNumber}
            style={{
              marginBottom: 24,
            }}
          >
            <Text
              style={{
                marginBottom: 8,
                fontSize: 20,
                fontWeight: "800",
              }}
            >
              Month {month?.number}
            </Text>

            <Text
              style={{
                marginBottom: 12,
                fontSize: 13,
                color: "#6b7280",
                textTransform: "capitalize",
              }}
            >
              {month?.season}
            </Text>

            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
              }}
            >
              {monthNodes.map((node) => (
                <View
                  key={node.id}
                  style={{
                    width: "14.2857%",
                    padding: 2,
                  }}
                >
                  <DayCell node={node} />
                </View>
              ))}
            </View>
          </View>
        );
      })}
    </View>
  );
}
