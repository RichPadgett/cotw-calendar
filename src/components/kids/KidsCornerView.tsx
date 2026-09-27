/*
 * Kids' Corner content hub. Sections are intentionally stable even when they
 * do not yet have content, so future activities can be added without another
 * navigation redesign.
 */

import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";

import WebOnlyActivities from "../activities/WebOnlyActivities";
import HebrewStudyView from "../hebrew/HebrewStudyView";

type KidsSection =
  | "lessons"
  | "games"
  | "quizzes"
  | "aleph-bet"
  | "words"
  | "stories"
  | "printables";

const SECTIONS: {
  id: KidsSection;
  label: string;
  description: string;
  icon: keyof typeof MaterialIcons.glyphMap;
}[] = [
  {
    id: "lessons",
    label: "Shabbat Lessons",
    description: "Weekly lessons and past studies to revisit.",
    icon: "auto-stories",
  },
  {
    id: "games",
    label: "Games",
    description: "Bible-story adventures and learning games.",
    icon: "sports-esports",
  },
  {
    id: "quizzes",
    label: "Quizzes",
    description: "Questions and review activities by story.",
    icon: "quiz",
  },
  {
    id: "aleph-bet",
    label: "Aleph-Bet",
    description: "Hebrew and Paleo Hebrew letters with drawing practice.",
    icon: "draw",
  },
  {
    id: "words",
    label: "Bible Words",
    description: "Hebrew, Greek, and Aramaic words and meanings.",
    icon: "translate",
  },
  {
    id: "stories",
    label: "Stories",
    description: "Read-along Bible stories for younger children.",
    icon: "menu-book",
  },
  {
    id: "printables",
    label: "Printables",
    description: "Coloring pages and worksheets for home.",
    icon: "print",
  },
];

export default function KidsCornerView({
  adminToken,
  groupCode,
  userRole,
}: {
  adminToken: string;
  groupCode: string;
  userRole: string;
}) {
  const [section, setSection] = useState<KidsSection>("aleph-bet");
  const current = SECTIONS.find((item) => item.id === section) ?? SECTIONS[0];

  return (
    <View style={styles.shell}>
      <View style={styles.headingBlock}>
        <Text style={styles.eyebrow}>LEARN · PLAY · GROW</Text>
        <Text style={styles.title}>Kids&apos; Corner</Text>
        <Text style={styles.subtitle}>
          Bible learning, language study, activities, and resources in one
          place.
        </Text>
      </View>

      <View style={styles.tabList} accessibilityRole="tablist">
        {SECTIONS.map((item) => {
          const active = item.id === section;
          return (
            <Pressable
              key={item.id}
              accessibilityRole="tab"
              accessibilityState={{ selected: active }}
              onPress={() => setSection(item.id)}
              style={({ pressed }) => [
                styles.tab,
                active && styles.tabActive,
                pressed && { opacity: 0.8 },
              ]}
            >
              <MaterialIcons
                name={item.icon}
                size={18}
                color={active ? "#ffffff" : "#475569"}
              />
              <Text style={[styles.tabText, active && styles.tabTextActive]}>
                {item.label}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <View style={styles.sectionHeading}>
        <View style={styles.sectionIcon}>
          <MaterialIcons name={current.icon} size={24} color="#0f766e" />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.sectionTitle}>{current.label}</Text>
          <Text style={styles.sectionDescription}>{current.description}</Text>
        </View>
      </View>

      {section === "games" ? <WebOnlyActivities activity="game" /> : null}
      {section === "quizzes" ? <WebOnlyActivities activity="quiz" /> : null}
      {section === "aleph-bet" ? (
        <HebrewStudyView
          adminToken={adminToken}
          groupCode={groupCode}
          userRole={userRole}
          mode="alphabet"
        />
      ) : null}
      {section === "words" ? (
        <HebrewStudyView
          adminToken={adminToken}
          groupCode={groupCode}
          userRole={userRole}
          mode="glossary"
        />
      ) : null}
      {section === "lessons" ||
      section === "stories" ||
      section === "printables" ? (
        <EmptySection title={current.label} icon={current.icon} />
      ) : null}
    </View>
  );
}

function EmptySection({
  title,
  icon,
}: {
  title: string;
  icon: keyof typeof MaterialIcons.glyphMap;
}) {
  return (
    <View style={styles.emptyState}>
      <View style={styles.emptyIcon}>
        <MaterialIcons name={icon} size={34} color="#94a3b8" />
      </View>
      <Text style={styles.emptyTitle}>{title}</Text>
      <Text style={styles.emptyText}>
        This area is ready for future content.
      </Text>
    </View>
  );
}

const styles = {
  shell: { gap: 18 },
  headingBlock: { gap: 4 },
  eyebrow: {
    fontSize: 11,
    fontWeight: "900" as const,
    letterSpacing: 1.3,
    color: "#0f766e",
  },
  title: { fontSize: 30, fontWeight: "900" as const, color: "#0f172a" },
  subtitle: { fontSize: 15, lineHeight: 21, color: "#64748b" },
  tabList: {
    flexDirection: "row" as const,
    flexWrap: "wrap" as const,
    gap: 8,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
  },
  tab: {
    minHeight: 42,
    flexDirection: "row" as const,
    alignItems: "center" as const,
    gap: 6,
    paddingHorizontal: 13,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    backgroundColor: "#ffffff",
  },
  tabActive: { borderColor: "#0f766e", backgroundColor: "#0f766e" },
  tabText: { fontSize: 13, fontWeight: "800" as const, color: "#475569" },
  tabTextActive: { color: "#ffffff" },
  sectionHeading: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
    gap: 12,
  },
  sectionIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: "center" as const,
    justifyContent: "center" as const,
    backgroundColor: "#ccfbf1",
  },
  sectionTitle: { fontSize: 22, fontWeight: "900" as const, color: "#0f172a" },
  sectionDescription: { marginTop: 2, fontSize: 14, color: "#64748b" },
  emptyState: {
    minHeight: 260,
    padding: 28,
    borderWidth: 1,
    borderStyle: "dashed" as const,
    borderColor: "#cbd5e1",
    borderRadius: 16,
    alignItems: "center" as const,
    justifyContent: "center" as const,
    backgroundColor: "#f8fafc",
  },
  emptyIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: "center" as const,
    justifyContent: "center" as const,
    backgroundColor: "#ffffff",
    marginBottom: 10,
  },
  emptyTitle: { fontSize: 18, fontWeight: "900" as const, color: "#334155" },
  emptyText: { marginTop: 4, fontSize: 13, color: "#94a3b8" },
};
