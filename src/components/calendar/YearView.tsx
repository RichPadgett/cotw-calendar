/*
 * File: src/components/calendar/YearView.tsx
 * Purpose: Calendar UI component for rendering YearView behavior and presentation.
 * Author: rpadgett
 */

// Dependencies
import { Text, View } from "react-native";

import { hasSabbathWeekBeforeEnochYear } from "../../engine/enochYear";
import { CalendarNode } from "../../models/calendar";
import { PerpetualMarker } from "../../types/perpetualMarkers";
import { DayCell } from "./DayCell";
import IntercalaryRow from "./IntercalaryRow";
import SabbathWeekRow from "./SabbathWeekRow";

// Types
type Props = {
  nodes: CalendarNode[];
  onMonthLayout?: (monthNumber: number, y: number) => void;
  onPressDay?: (node: CalendarNode) => void;
  notices: CalendarDaySummary[];
  perpetualMarkers: PerpetualMarker[];
};

type CalendarDaySummary = {
  year: number;
  month: number;
  day: number;
  notice: unknown | null;
  hasContent: boolean;
};

// Constants
const WEEKDAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sab"];
const ENOCH_WEEK_OFFSET = 3;

// Helpers
/**
 * Groups generated calendar nodes by Enoch month number.
 * This data-shaping helper prepares the year grid for month-by-month rendering.
 */
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

/**
 * Adds local calendar days to a YYYY-MM-DD string.
 * This date helper builds the displayed sabbath-week date range.
 */
function addDays(dateString: string, days: number): string {
  const [year, month, day] = dateString.split("-").map(Number);

  const date = new Date(year, month - 1, day);
  date.setHours(12, 0, 0, 0);
  date.setDate(date.getDate() + days);

  const nextYear = date.getFullYear();
  const nextMonth = String(date.getMonth() + 1).padStart(2, "0");
  const nextDay = String(date.getDate()).padStart(2, "0");

  return `${nextYear}-${nextMonth}-${nextDay}`;
}

// Component
/**
 * Creates the full year grid view grouped by Enoch month.
 * This UX component combines day cells, month headers, notices, content badges, perpetual markers, and intercalary rows.
 */
export default function YearView({
  nodes,
  notices,
  perpetualMarkers = [],
  onMonthLayout,
  onPressDay,
}: Props) {
  const monthGroups = groupByEnochMonth(nodes);
  const firstNode = nodes[0];
  const visibleEnochYear = firstNode?.enoch?.year;

  const isSabbathYear =
    typeof visibleEnochYear === "number" &&
    hasSabbathWeekBeforeEnochYear(visibleEnochYear);

  const sabbathWeekNode: CalendarNode | undefined =
    isSabbathYear && firstNode
      ? {
          id: `${firstNode.enoch?.year}-sabbath-week`,
          type: "sabbath-week",
          gregorianDate: firstNode.gregorianDate,
          gregorian: firstNode.gregorian,
          enoch: {
            year: firstNode.enoch?.year ?? 0,
            dayOfYear: 0,
            quarter: 0,
            isIntercalary: false,
            isSabbathWeek: true,
            label: "Sabbath Week",
            dateRange: {
              start: addDays(firstNode.gregorianDate, -7),
              end: addDays(firstNode.gregorianDate, -1),
            },
            events: [
              {
                id: "sabbath-week",
                englishName: "Sabbath Week",
                shortName: "Rest",
                type: "high-sabbath",
                icon: "sabbath",
                color: "#2563eb",
                isHighSabbath: true,
              },
            ],
          },
        }
      : undefined;

  return (
    <View>
      {sabbathWeekNode && (
        <SabbathWeekRow node={sabbathWeekNode} onPressDay={onPressDay} />
      )}

      {Object.entries(monthGroups).map(([monthNumber, monthNodes]) => {
        const numericMonth = Number(monthNumber);
        const firstMonthNode = monthNodes[0];
        const month = firstMonthNode.enoch?.month;

        const leadingOffset =
          ((firstMonthNode.enoch?.dayOfYear ?? 1) - 1 + ENOCH_WEEK_OFFSET) % 7;

        const leadingBlanks = Array.from({ length: leadingOffset });

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
            style={{ marginBottom: 24 }}
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

            <View style={{ flexDirection: "row", marginBottom: 6 }}>
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

            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              {leadingBlanks.map((_, index) => (
                <View
                  key={`blank-${monthNumber}-${index}`}
                  style={{ width: "14.2857%", padding: 2 }}
                />
              ))}

              {monthNodes.map((node) => {
                const dayContent = notices.find(
                  (item) =>
                    item.year === node.enoch?.year &&
                    item.month === node.enoch?.month?.number &&
                    item.day === node.enoch?.day
                );

                const hasNotice = Boolean(dayContent?.notice);
                const hasContent = Boolean(dayContent?.hasContent);

                const markersForDay = perpetualMarkers.filter((marker) => {
                  const matchesMonthDay =
                    marker.month === node.enoch?.month?.number &&
                    marker.day === node.enoch?.day;

                  const matchesGateDay =
                    Boolean(marker.gateDay) &&
                    node.enoch?.isIntercalary &&
                    marker.gateDay === node.enoch?.quarter;

                  const matchesIntercalaryWeek =
                    marker.intercalaryWeek === true &&
                    node.enoch?.isSabbathWeek === true;

                  return (
                    matchesMonthDay || matchesGateDay || matchesIntercalaryWeek
                  );
                });

                return (
                  <View key={node.id} style={{ width: "14.2857%", padding: 2 }}>
                    <DayCell
                      node={node}
                      hasNotice={hasNotice}
                      hasContent={hasContent}
                      perpetualMarkers={markersForDay}
                      onPressDay={onPressDay}
                    />
                  </View>
                );
              })}
            </View>

            {intercalaryNode && (
              <IntercalaryRow node={intercalaryNode} onPressDay={onPressDay} />
            )}
          </View>
        );
      })}
    </View>
  );
}
