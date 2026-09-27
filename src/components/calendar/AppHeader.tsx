/* Compact calendar context toolbar. */

import { MaterialIcons } from "@expo/vector-icons";
import { Image, Pressable, Text, View } from "react-native";
import { CalendarNode, EnochMonth } from "../../models/calendar";

type Props = {
  month?: EnochMonth;
  todayNode?: CalendarNode;
  upcomingShabbatNode?: CalendarNode;
  gregorianLabel: string;
  groupLabel: string;
  userRole?: "member" | "admin";
  showIdentity?: boolean;
  yearTransition?: { direction: "previous" | "next"; id: number } | null;
  onChangeGroup: () => void;
  onPressToday?: () => void;
  onPressUpcomingShabbat?: () => void;
  onPreviousMonth?: () => void;
  onNextMonth?: () => void;
};

export default function AppHeader({
  month,
  todayNode,
  upcomingShabbatNode,
  gregorianLabel,
  yearTransition,
  onPressToday,
  onPressUpcomingShabbat,
  onPreviousMonth,
  onNextMonth,
}: Props) {
  return (
    <View style={styles.shell}>
      <View style={styles.mainRow}>
        <View style={styles.titleArea}>
          {month?.symbolImage ? (
            <Image
              source={month.symbolImage}
              style={styles.monthIcon}
              resizeMode="contain"
            />
          ) : (
            <View style={styles.fallbackIcon}>
              <MaterialIcons name="calendar-month" size={22} color="#0f766e" />
            </View>
          )}
          <View style={{ flex: 1, minWidth: 0 }}>
            <Text style={styles.eyebrow}>ENOCH CALENDAR</Text>
            <Text numberOfLines={1} style={styles.title}>
              {month ? `Month ${month.number}` : "Calendar"}
            </Text>
            <Text numberOfLines={1} style={styles.subtitle}>
              {month ? `${month.season} · ${gregorianLabel}` : gregorianLabel}
            </Text>
          </View>
        </View>
        <View style={styles.pagingRow}>
          {yearTransition ? (
            <MaterialIcons
              name={
                yearTransition.direction === "next"
                  ? "arrow-forward"
                  : "arrow-back"
              }
              size={14}
              color="#0e7490"
            />
          ) : null}
          <IconButton
            label="Previous calendar period"
            icon="chevron-left"
            onPress={onPreviousMonth}
          />
          <IconButton
            label="Next calendar period"
            icon="chevron-right"
            onPress={onNextMonth}
          />
        </View>
      </View>
      <View style={styles.quickRow}>
        {todayNode ? (
          <QuickButton
            label={`Today · M${todayNode.enoch?.month?.number ?? ""} D${todayNode.enoch?.day ?? ""}`}
            icon="today"
            onPress={onPressToday}
          />
        ) : null}
        {upcomingShabbatNode ? (
          <QuickButton
            label={`Shabbat · M${upcomingShabbatNode.enoch?.month?.number ?? ""} D${upcomingShabbatNode.enoch?.day ?? ""}`}
            icon="brightness-3"
            onPress={onPressUpcomingShabbat}
          />
        ) : null}
      </View>
    </View>
  );
}

function IconButton({
  label,
  icon,
  onPress,
}: {
  label: string;
  icon: keyof typeof MaterialIcons.glyphMap;
  onPress?: () => void;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
      style={({ pressed }) => [styles.iconButton, pressed && { opacity: 0.72 }]}
    >
      <MaterialIcons name={icon} size={25} color="#334155" />
    </Pressable>
  );
}

function QuickButton({
  label,
  icon,
  onPress,
}: {
  label: string;
  icon: keyof typeof MaterialIcons.glyphMap;
  onPress?: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.quickButton,
        pressed && { opacity: 0.72 },
      ]}
    >
      <MaterialIcons name={icon} size={14} color="#0f766e" />
      <Text style={styles.quickText}>{label}</Text>
    </Pressable>
  );
}

const styles = {
  shell: {
    gap: 8,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
  },
  mainRow: {
    minHeight: 54,
    flexDirection: "row" as const,
    alignItems: "center" as const,
    justifyContent: "space-between" as const,
    gap: 10,
  },
  titleArea: {
    flex: 1,
    minWidth: 0,
    flexDirection: "row" as const,
    alignItems: "center" as const,
    gap: 10,
  },
  monthIcon: { width: 38, height: 38, flexShrink: 0 },
  fallbackIcon: {
    width: 38,
    height: 38,
    borderRadius: 11,
    alignItems: "center" as const,
    justifyContent: "center" as const,
    backgroundColor: "#ccfbf1",
  },
  eyebrow: {
    fontSize: 9,
    lineHeight: 11,
    fontWeight: "900" as const,
    letterSpacing: 1.1,
    color: "#0f766e",
  },
  title: {
    fontSize: 19,
    lineHeight: 23,
    fontWeight: "900" as const,
    color: "#0f172a",
  },
  subtitle: {
    fontSize: 11,
    lineHeight: 14,
    fontWeight: "600" as const,
    color: "#64748b",
    textTransform: "capitalize" as const,
  },
  pagingRow: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
    gap: 6,
  },
  iconButton: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: "center" as const,
    justifyContent: "center" as const,
    backgroundColor: "#f1f5f9",
  },
  quickRow: {
    flexDirection: "row" as const,
    flexWrap: "wrap" as const,
    gap: 6,
  },
  quickButton: {
    minHeight: 28,
    paddingHorizontal: 9,
    borderRadius: 999,
    flexDirection: "row" as const,
    alignItems: "center" as const,
    gap: 5,
    borderWidth: 1,
    borderColor: "#ccfbf1",
    backgroundColor: "#f0fdfa",
  },
  quickText: { fontSize: 11, fontWeight: "800" as const, color: "#115e59" },
};
