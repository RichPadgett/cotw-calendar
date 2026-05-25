// src/components/calendar/YearView.tsx

import { Text, View } from "react-native";

import { CalendarNode } from "../../models/calendar";
import { DayCell } from "./DayCell";
import IntercalaryRow from "./IntercalaryRow";

type Props = {
  nodes: CalendarNode[];
  onMonthLayout?: (monthNumber: number, y: number) => void;
  onPressDay?: (node: CalendarNode) => void;
};

const WEEKDAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sab"];

const ENOCH_WEEK_OFFSET = 3;

function groupByEnochMonth(nodes: CalendarNode[]) {
  const groups: Record<number, CalendarNode[]> = {};

  for (const node of nodes) {
    const monthNumber = node.enoch?.month?.number;

    if (!monthNumber) continue;

    if (!groups[monthNumber]) {
      groups[monthNumber] = [];
    }

    groups[monthNumber].push(node);
  }

  return groups;
}

export default function YearView({ nodes, onMonthLayout, onPressDay }: Props) {
  const monthGroups = groupByEnochMonth(nodes);

  return (
    <View>
      {Object.entries(monthGroups).map(([monthNumber, monthNodes]) => {
        const numericMonth = Number(monthNumber);
        const firstNode = monthNodes[0];
        const month = firstNode.enoch?.month;

        const firstSabbathIndex = monthNodes.findIndex((node) =>
          node.enoch?.events?.some(
            (event) => event.type === "weekly-sabbath"
          )
        );

        const leadingOffset =
          firstSabbathIndex >= 0
            ? (6 - firstSabbathIndex) % 7
            : ENOCH_WEEK_OFFSET;

        const leadingBlanks = Array.from({
          length: leadingOffset,
        });

        const intercalaryNode =
          numericMonth % 3 === 0
            ? nodes.find(
                (node) =>
                  node.enoch?.isIntercalary &&
                  node.enoch?.quarter === numericMonth / 3
              )
            : undefined;

        return (
          <View
            key={monthNumber}
            onLayout={(event) => {
              onMonthLayout?.(numericMonth, event.nativeEvent.layout.y);
            }}
            style={{
              marginBottom: 24,
            }}
          >
            {/* Month section title */}
            <Text
              style={{
                marginBottom: 8,
                fontSize: 20,
                fontWeight: "800",
              }}
            >
              Month {month?.number}
            </Text>

            {/* Season label */}
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

            {/* Weekday header row */}
            <View
              style={{
                flexDirection: "row",
                marginBottom: 6,
              }}
            >
              {WEEKDAY_LABELS.map((label) => (
                <View
                  key={label}
                  style={{
                    width: "14.2857%",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 10,
                      fontWeight: "700",
                      color: "#6b7280",
                    }}
                  >
                    {label}
                  </Text>
                </View>
              ))}
            </View>

            {/* 7-column day grid */}
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
              }}
            >
              {/* Leading blank cells */}
              {leadingBlanks.map((_, index) => (
                <View
                  key={`blank-${monthNumber}-${index}`}
                  style={{
                    width: "14.2857%",
                    padding: 2,
                  }}
                />
              ))}

              {/* Month day cells */}
              {monthNodes.map((node) => (
                <View
                  key={node.id}
                  style={{
                    width: "14.2857%",
                    padding: 2,
                  }}
                >
                  <DayCell
                    node={node}
                    onPressDay={onPressDay}
                  />
                </View>
              ))}
            </View>

            {/* Intercalary / gate day after months 3, 6, 9, 12 */}
            {intercalaryNode && (
              <IntercalaryRow node={intercalaryNode} />
            )}
          </View>
        );
      })}
    </View>
  );
}