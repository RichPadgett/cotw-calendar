// src/components/calendar/YearWheelView.tsx

import { Pressable, Text, View } from "react-native";
import { CalendarNode } from "../../models/calendar";

type Props = {
  nodes: CalendarNode[];
  onPressMonth?: (monthNumber: number) => void;
  onPressDay?: (node: CalendarNode) => void;
};

const SIZE = 320;
const CENTER = SIZE / 2;

const OUTER_RING_SIZE = SIZE + 42;
const OUTER_CENTER = OUTER_RING_SIZE / 2;

const MONTH_RING_INNER_RADIUS = SIZE / 2 - 42;
const MONTH_LABEL_RADIUS = SIZE / 2 - 22;

const MARKER_COLORS = {
  sabbath: "#eab308",
  highSabbath: "#ef4444",
  feast: "#16a34a",
  fast: "#7e22ce",
  preparation: "#f59e0b",
};

const GATE_DOTS = [
  { label: "Spring Gate", angle: 0, color: "#84cc16" },
  { label: "Summer Gate", angle: -Math.PI / 2, color: "#facc15" },
  { label: "Fall Gate", angle: Math.PI, color: "#fb923c" },
  { label: "Winter Gate", angle: Math.PI / 2, color: "#38bdf8" },
];

function getAngleForDay(dayOfYear: number) {
  return -((dayOfYear - 1) / 364) * Math.PI * 2;
}

function getMarkerType(node: CalendarNode) {
  const events = node.enoch?.events ?? [];

  if (events.some((event) => event.type === "weekly-sabbath")) {
    return "sabbath";
  }

  if (events.some((event) => event.type === "high-sabbath")) {
    return "highSabbath";
  }

  if (events.some((event) => event.type === "feast")) {
    return "feast";
  }

  if (events.some((event) => event.type === "fast")) {
    return "fast";
  }

  if (events.some((event) => event.type === "preparation")) {
    return "preparation";
  }

  return null;
}

function getMarkerLength(markerType: string) {
  switch (markerType) {
    case "sabbath":
      return 92;
    case "feast":
      return 98;
    case "fast":
      return 88;
    case "highSabbath":
      return 106;
    case "preparation":
      return 84;
    default:
      return 70;
  }
}

function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
      <View
        style={{
          width: 18,
          height: 2,
          backgroundColor: color,
        }}
      />

      <Text style={{ fontSize: 12, color: "#374151", fontWeight: "600" }}>
        {label}
      </Text>
    </View>
  );
}

function LegendDot({ color, label }: { color: string; label: string }) {
  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
      <View
        style={{
          width: 8,
          height: 8,
          backgroundColor: color,
          borderRadius: 6,
        }}
      />

      <Text style={{ fontSize: 12, color: "#374151", fontWeight: "600" }}>
        {label}
      </Text>
    </View>
  );
}

export default function YearWheelView({
  nodes,
  onPressMonth,
}: Props) {
  const months = Array.from({ length: 12 }, (_, index) => index + 1);

  const todayNode = nodes.find((node) => {
    const today = new Date();

    const todayId = `${today.getFullYear()}-${String(
      today.getMonth() + 1
    ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

    return node.gregorianDate === todayId;
  });

  return (
    <View style={{
      alignItems: "center", marginTop: 0,
      marginBottom: 24
    }}>
      <Text
        style={{
          marginBottom: 16,
          fontSize: 22,
          fontWeight: "800",
        }}
      >
        Enochs Wheel
      </Text>

      <View
        style={{
          width: OUTER_RING_SIZE,
          height: OUTER_RING_SIZE,
          borderRadius: OUTER_RING_SIZE / 2,
          borderWidth: 2,
          borderColor: "#cbd5e1",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          backgroundColor: "#ffffff",
          overflow: "visible",
        }}
      >
        {GATE_DOTS.map((gate) => {
          const radius = OUTER_RING_SIZE / 2 - 4;

          const x = OUTER_CENTER + Math.cos(gate.angle) * radius;
          const y = OUTER_CENTER + Math.sin(gate.angle) * radius;

          return (
            <View
              key={gate.label}
              style={{
                position: "absolute",
                left: x - 6,
                top: y - 6,
                width: 12,
                height: 12,
                borderRadius: 6,
                backgroundColor: gate.color,
                borderWidth: 2,
                borderColor: "#ffffff",
                zIndex: 30,
              }}
            />
          );
        })}

        {todayNode?.enoch?.dayOfYear
          ? (() => {
            const angle = getAngleForDay(todayNode.enoch.dayOfYear);
            const radius = OUTER_RING_SIZE / 2 + 4;

            const x = OUTER_CENTER + Math.cos(angle) * radius;
            const y = OUTER_CENTER + Math.sin(angle) * radius;

            return (
              <View
  style={{
    position: "absolute",

    left: x - 14,
    top: y - 10,

    alignItems: "center",

    zIndex: 40,
  }}
>
  
  <Text
    style={{
      fontSize: 20,
      fontWeight: "900",

      color: "#dc2626",

      transform: [
        {
          rotate: `${angle}rad`,
        },
      ],
    }}
  >
    ◀
  </Text>
  <Text
    style={{
      marginTop: -2,
      marginRight: 6,

      fontSize: 10,

      fontWeight: "900",

      color: "#991b1b",
    }}
  >
    {todayNode.enoch.day}
  </Text>

</View>

              // <Text
              //   style={{
              //     position: "absolute",

              //     left: x - 8,
              //     top: y - 10,

              //     fontSize: 20,
              //     fontWeight: "900",

              //     color: "#dc2626",

              //     transform: [
              //       {
              //         rotate: `${angle}rad`,
              //       },
              //     ],

              //     zIndex: 40,
              //   }}
              // >
              //   ◀
              // </Text>
            );
          })()
          : null}

        <View
          style={{
            width: SIZE,
            height: SIZE,
            borderRadius: SIZE / 2,
            borderWidth: 2,
            borderColor: "#111827",
            position: "relative",
            backgroundColor: "#f9fafb",
            overflow: "hidden",
          }}
        >
          <View
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: SIZE / 2,
              backgroundColor: "#fef3c7",
              opacity: 0.65,
            }}
          />

          <View
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: SIZE / 2,
              backgroundColor: "#dbeafe",
              opacity: 0.75,
            }}
          />

          {nodes.map((node) => {
            const markerType = getMarkerType(node);

            if (!markerType) return null;

            const dayOfYear = node.enoch?.dayOfYear;

            if (!dayOfYear) return null;

            const angle = getAngleForDay(dayOfYear);
            const innerRadius = 35;
            const length = getMarkerLength(markerType);

            const startX = CENTER + Math.cos(angle) * innerRadius;
            const startY = CENTER + Math.sin(angle) * innerRadius;

            return (
              <View
                key={`marker-${node.id}`}
                style={{
                  position: "absolute",
                  left: startX,
                  top: startY,
                  width: length,
                  height: 2,
                  backgroundColor:
                    MARKER_COLORS[markerType as keyof typeof MARKER_COLORS],
                  transform: [{ rotate: `${angle}rad` }],
                  transformOrigin: "left center" as any,
                  borderRadius: 999,
                  opacity: markerType === "sabbath" ? 0.65 : 1,
                  zIndex: 1,
                }}
              />
            );
          })}

          <View
            style={{
              position: "absolute",
              left: CENTER - MONTH_RING_INNER_RADIUS,
              top: CENTER - MONTH_RING_INNER_RADIUS,
              width: MONTH_RING_INNER_RADIUS * 2,
              height: MONTH_RING_INNER_RADIUS * 2,
              borderRadius: MONTH_RING_INNER_RADIUS,
              borderWidth: 2,
              borderColor: "#111827",
              opacity: 0.25,
              zIndex: 3,
            }}
          />

          {months.map((_, index) => {
            const angle = -(index / 12) * Math.PI * 2;

            const startX =
              CENTER + Math.cos(angle) * MONTH_RING_INNER_RADIUS;

            const startY =
              CENTER + Math.sin(angle) * MONTH_RING_INNER_RADIUS;

            const length = SIZE / 2 - MONTH_RING_INNER_RADIUS;

            return (
              <View
                key={`month-separator-${index}`}
                style={{
                  position: "absolute",
                  left: startX,
                  top: startY,
                  width: length,
                  height: 2,
                  backgroundColor: "#111827",
                  opacity: 0.25,
                  transform: [{ rotate: `${angle}rad` }],
                  transformOrigin: "left center" as any,
                  zIndex: 4,
                }}
              />
            );
          })}

          {months.map((monthNumber, index) => {
            const angle = -(index / 12) * Math.PI * 2;

            const labelPoint = {
              x: CENTER + Math.cos(angle) * MONTH_LABEL_RADIUS,
              y: CENTER + Math.sin(angle) * MONTH_LABEL_RADIUS,
            };

            return (
              <Pressable
                key={monthNumber}
                onPress={() => onPressMonth?.(monthNumber)}
                style={{
                  position: "absolute",
                  left: labelPoint.x - 16,
                  top: labelPoint.y - 16,
                  width: 32,
                  height: 32,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#ffffff",
                  borderRadius: 999,
                  borderWidth: 1,
                  borderColor: "#e5e7eb",
                  zIndex: 10,
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "900",
                    color: "#111827",
                  }}
                >
                  {monthNumber}
                </Text>
              </Pressable>
            );
          })}

          {[
            { label: "Spring", angle: 0 },
            { label: "Summer", angle: -Math.PI / 2 },
            { label: "Fall", angle: Math.PI },
            { label: "Winter", angle: Math.PI / 2 },
          ].map((season) => {
            const radius = 95;
            const x = CENTER + Math.cos(season.angle) * radius;
            const y = CENTER + Math.sin(season.angle) * radius;

            return (
              <View
                key={season.label}
                style={{
                  position: "absolute",
                  left: x - 38,
                  top: y - 13,
                  width: 76,
                  height: 20,
                  borderRadius: 13,
                  // backgroundColor: "#ffffff",
                  borderWidth: 0,
                  borderColor: "#e5e7eb",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 12,
                }}
              >
                <Text
                  style={{
                    fontSize: 13,
                    fontWeight: "800",
                    color: "#596a85",
                  }}
                >
                  {/* {season.label} */}
                </Text>
              </View>
            );
          })}

          <View
            style={{
              position: "absolute",
              left: CENTER - 36,
              top: CENTER - 36,
              width: 72,
              height: 72,
              borderRadius: 36,
              borderWidth: 3,
              borderColor: "#2563eb",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#ffffff",
              zIndex: 20,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "900",
                color: "#2563eb",
              }}
            >
              364
            </Text>

            <Text
              style={{
                fontSize: 9,
                fontWeight: "800",
                color: "#64748b",
              }}
            >
              Days
            </Text>
          </View>
        </View>
      </View>

      <View
        style={{
          marginTop: 18,
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 18,
        }}
      >
        <LegendItem color="#ef4444" label="High Sabbaths" />
        <LegendItem color="#eab308" label="Weekly Sabbaths" />
        <LegendItem color="#16a34a" label="Feasts" />
        <LegendItem color="#7e22ce" label="Fasts" />
        <LegendDot color="#84cc16" label="Spring Gate" />
        <LegendDot color="#facc15" label="Summer Gate" />
        <LegendDot color="#fb923c" label="Fall Gate" />
        <LegendDot color="#38bdf8" label="Winter Gate" />
      </View>
    </View>
  );
}