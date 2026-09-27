import { MaterialIcons } from "@expo/vector-icons";
import { Image, ScrollView, Text, View } from "react-native";

import ScrollIcon from "../../../assets/enoch/icons/scroll.png";

const COLOR_ITEMS = [
  { label: "High Sabbath", color: "#dc2626" },
  { label: "Weekly Sabbath", color: "#d6a406" },
  { label: "Feast", color: "#15803d" },
  { label: "Fast", color: "#7c3aed" },
  { label: "Preparation", color: "#ea580c" },
  { label: "Perpetual marker", color: "#0f766e" },
] as const;

const GATE_ITEMS = [
  { label: "Spring gate", color: "#84cc16" },
  { label: "Summer gate", color: "#facc15" },
  { label: "Fall gate", color: "#fb923c" },
  { label: "Winter gate", color: "#38bdf8" },
] as const;

export default function CalendarLegend() {
  return (
    <View
      accessibilityLabel="Calendar legend"
      style={{
        minHeight: 42,
        marginBottom: 8,
        borderWidth: 1,
        borderColor: "#e2e8f0",
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#f8fafc",
        overflow: "hidden",
      }}
    >
      <View
        style={{
          alignSelf: "stretch",
          paddingHorizontal: 10,
          borderRightWidth: 1,
          borderRightColor: "#e2e8f0",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f1f5f9",
        }}
      >
        <Text style={{ fontSize: 10, fontWeight: "900", color: "#334155" }}>
          LEGEND
        </Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          minHeight: 40,
          paddingHorizontal: 10,
          flexDirection: "row",
          alignItems: "center",
          gap: 14,
        }}
      >
        {COLOR_ITEMS.map((item) => (
          <LegendItem key={item.label} label={item.label}>
            <View
              style={{
                width: 18,
                height: 4,
                borderRadius: 2,
                backgroundColor: item.color,
              }}
            />
          </LegendItem>
        ))}

        <LegendItem label="High rest">
          <Text style={{ fontSize: 15, fontWeight: "900", color: "#ca8a04" }}>
            𐤔
          </Text>
        </LegendItem>
        <LegendItem label="Weekly rest">
          <Text style={{ fontSize: 15, fontWeight: "900", color: "#2563eb" }}>
            𐤔
          </Text>
        </LegendItem>

        {GATE_ITEMS.map((item) => (
          <LegendItem key={item.label} label={item.label}>
            <View
              style={{
                width: 9,
                height: 9,
                borderRadius: 5,
                backgroundColor: item.color,
              }}
            />
          </LegendItem>
        ))}

        <LegendItem label="Gate day">
          <View style={{ width: 4, height: 17, backgroundColor: "#0284c7" }} />
        </LegendItem>
        <LegendItem label="Day notice">
          <View
            style={{
              width: 15,
              height: 15,
              borderRadius: 8,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#f97316",
            }}
          >
            <Text style={{ fontSize: 10, fontWeight: "900", color: "#fff" }}>
              !
            </Text>
          </View>
        </LegendItem>
        <LegendItem label="Content available">
          <Image source={ScrollIcon} style={{ width: 17, height: 17 }} />
        </LegendItem>
        <LegendItem label="Library teaching">
          <MaterialIcons name="video-library" size={17} color="#0369a1" />
        </LegendItem>
      </ScrollView>
    </View>
  );
}

function LegendItem({
  children,
  label,
}: {
  children: React.ReactNode;
  label: string;
}) {
  return (
    <View
      accessibilityLabel={label}
      style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
    >
      {children}
      <Text
        numberOfLines={1}
        style={{ fontSize: 11, fontWeight: "700", color: "#475569" }}
      >
        {label}
      </Text>
    </View>
  );
}
