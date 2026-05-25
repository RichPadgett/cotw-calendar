// src/components/calendar/YearWheelView.tsx

import { Pressable, Text, View } from "react-native";

import { CalendarNode } from "../../models/calendar";

type Props = {
  nodes: CalendarNode[];

  /*
    Called when a month circle is pressed.

    Used to scroll the year view
    to the selected month section.
  */
  onPressMonth?: (monthNumber: number) => void;
  onPressDay?: (node: CalendarNode) => void;
};

/*
  ============================================================
  WHEEL GEOMETRY
  ============================================================
*/

const SIZE = 320;
const CENTER = SIZE / 2;

/*
  Outer month marker radius
*/
const RADIUS = 135;

/*
  Inner gate label radius

  This places the seasonal labels
  inside the wheel instead of
  on the outer edge.
*/
const GATE_LABEL_RADIUS = 92;

const MAJOR_EVENT_IDS = [
  "passover",
  "firstfruits",
  "shavuot",
  "feast-of-trumpets",
  "day-of-atonement",
  "sukkot-day-1",
  "eighth-day",
];

/*
  ============================================================
  MONTH POSITIONING
  ============================================================

  Sacred wheel orientation:

    Month 1 = 3 o'clock
    Counter-clockwise flow
*/

function pointOnCircle(index: number, total: number) {
  const angle =
    -(index / total) * Math.PI * 2;

  return {
    x: CENTER + Math.cos(angle) * RADIUS,
    y: CENTER + Math.sin(angle) * RADIUS,
  };
}

/*
  ============================================================
  GATE LABEL POSITIONING
  ============================================================
*/

function pointOnGate(angle: number) {
  return {
    x:
      CENTER +
      Math.cos(angle) * GATE_LABEL_RADIUS,

    y:
      CENTER +
      Math.sin(angle) * GATE_LABEL_RADIUS,
  };
}

export default function YearWheelView({
  nodes,
  onPressMonth,
  onPressDay,
}: Props) {
  /*
    ============================================================
    MONTH LIST
    ============================================================
  */

  const months = Array.from(
    { length: 12 },
    (_, index) => index + 1
  );

  /*
    ============================================================
    RENDER
    ============================================================
  */

  return (
    <View
      style={{
        alignItems: "center",
        marginVertical: 24,
      }}
    >
      {/* ======================================================
          TITLE
      ====================================================== */}

      <Text
        style={{
          marginBottom: 16,
          fontSize: 22,
          fontWeight: "800",
        }}
      >
        Year Wheel
      </Text>

      {/* ======================================================
          MAIN WHEEL
      ====================================================== */}

      <View
        style={{
          width: SIZE,
          height: SIZE,

          borderRadius: SIZE / 2,

          borderWidth: 2,
          borderColor: "#111827",

          position: "relative",

          backgroundColor: "#f9fafb",
        }}
      >
        {/* ==================================================
            MONTH CIRCLES
        ================================================== */}

        {months.map((monthNumber, index) => {
          const point = pointOnCircle(index, 12);

          const month = nodes.find(
            (node) =>
              node.enoch?.month?.number === monthNumber
          )?.enoch?.month;

          return (
            <Pressable
              key={monthNumber}
              onPress={() =>
                onPressMonth?.(monthNumber)
              }
              style={{
                position: "absolute",

                left: point.x - 18,
                top: point.y - 18,

                width: 36,
                height: 36,

                borderRadius: 18,

                alignItems: "center",
                justifyContent: "center",

                backgroundColor:
                  month?.themeColor ?? "#e5e7eb",
              }}
            >
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: "800",

                  color: "#111827",
                }}
              >
                {monthNumber}
              </Text>
            </Pressable>
          );
        })}
        {/* ==================================================
          Feast / High Sabbath markers
        ================================================== */}

      {nodes
  .filter((node) =>
    node.enoch?.events?.some((event) =>
      MAJOR_EVENT_IDS.includes(event.id)
    )
  )
  .map((node) => {
    const event = node.enoch?.events?.find((event) =>
      MAJOR_EVENT_IDS.includes(event.id)
    );

    if (!event) return null;

    const dayOfYear = node.enoch?.dayOfYear ?? 1;
    const angle = -((dayOfYear - 1) / 364) * Math.PI * 2;

    const lineStartRadius = 48;
    const lineEndRadius = 108;
    const labelRadius = 118;

    const startX = CENTER + Math.cos(angle) * lineStartRadius;
    const startY = CENTER + Math.sin(angle) * lineStartRadius;

    const endX = CENTER + Math.cos(angle) * lineEndRadius;
    const endY = CENTER + Math.sin(angle) * lineEndRadius;

    const labelX = CENTER + Math.cos(angle) * labelRadius;
    const labelY = CENTER + Math.sin(angle) * labelRadius;

    const length = lineEndRadius - lineStartRadius;
    const angleDegrees = `${angle}rad`;

    return (
      <View key={`callout-${node.id}`}>
        <View
          style={{
            position: "absolute",
            left: startX,
            top: startY,
            width: length,
            height: 1.5,
            backgroundColor: event.color,
            transform: [
              { rotate: angleDegrees },
            ],
            transformOrigin: "left center",
          }}
        />

        <Pressable
          onPress={() => onPressDay?.(node)}
          style={{
            position: "absolute",
            left: labelX - 34,
            top: labelY - 10,
            width: 68,
          }}
        >
          <Text
            numberOfLines={2}
            style={{
              fontSize: 8,
              fontWeight: "800",
              color: event.color,
              textAlign: "center",
            }}
          >
            {event.shortName ?? event.englishName}
          </Text>
        </Pressable>
      </View>
    );
  })}

        {/* ==================================================
            GATE LABELS
        ==================================================

            Spring  = Right
            Summer  = Top
            Fall    = Left
            Winter  = Bottom
        */}

        {[
          {
            label: "Spring",
            angle: 0,
          },

          {
            label: "Summer",
            angle: -Math.PI / 2,
          },

          {
            label: "Fall",
            angle: Math.PI,
          },

          {
            label: "Winter",
            angle: Math.PI / 2,
          },
        ].map((gate) => {
          const point = pointOnGate(gate.angle);

          return (
            <Text
              key={gate.label}
              style={{
                position: "absolute",

                left: point.x - 28,
                top: point.y - 8,

                width: 56,

                fontSize: 10,
                fontWeight: "800",

                color: "#6b7280",

                textAlign: "center",
              }}
            >
              {gate.label}
            </Text>
          );
        })}

        {/* ==================================================
            CENTER MARKER
        ================================================== */}

        <View
          style={{
            position: "absolute",

            left: CENTER - 36,
            top: CENTER - 36,

            width: 72,
            height: 72,

            borderRadius: 36,

            borderWidth: 2,
            borderColor: "#2563eb",

            alignItems: "center",
            justifyContent: "center",

            backgroundColor: "#ffffff",
          }}
        >
          <Text
            style={{
              fontSize: 12,
              fontWeight: "800",

              color: "#2563eb",
            }}
          >
            364
          </Text>
        </View>
      </View>
    </View>
  );
}