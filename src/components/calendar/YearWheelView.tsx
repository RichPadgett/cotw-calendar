// src/components/calendar/YearWheelView.tsx

import { Pressable, Text, View } from "react-native";
import { CalendarNode } from "../../models/calendar";

type Props = {
  nodes: CalendarNode[];
  onPressMonth?: (monthNumber: number) => void;
};

const SIZE = 320;
const CENTER = SIZE / 2;
const RADIUS = 135;

function pointOnCircle(index: number, total: number) {
  const angle =
  -(index / total) * Math.PI * 2;

  return {
    x: CENTER + Math.cos(angle) * RADIUS,
    y: CENTER + Math.sin(angle) * RADIUS,
  };
}

export default function YearWheelView({ nodes, onPressMonth }: Props) {
  const months = Array.from({ length: 12 }, (_, index) => index + 1);

  return (
    <View
      style={{
        alignItems: "center",
        marginVertical: 24,
      }}
    >
      <Text
        style={{
          marginBottom: 16,
          fontSize: 22,
          fontWeight: "800",
        }}
      >
        Year Wheel
      </Text>

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
        {months.map((monthNumber, index) => {
          const point = pointOnCircle(index, 12);

          const month = nodes.find(
            (node) => node.enoch?.month?.number === monthNumber
          )?.enoch?.month;

          return (
            <Pressable
              key={monthNumber}
              onPress={() => onPressMonth?.(monthNumber)}
              style={{
                position: "absolute",
                left: point.x - 18,
                top: point.y - 18,
                width: 36,
                height: 36,
                borderRadius: 18,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: month?.themeColor ?? "#e5e7eb",
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

        {/* Center marker */}
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
