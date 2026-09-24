/*
 * File: src/components/calendar/CalendarDayView.tsx
 * Purpose: Presents one focused calendar day as an agenda-style view.
 */

import { Text, View } from "react-native";

import type { CalendarNode } from "../../models/calendar";
import type { PerpetualMarker } from "../../types/perpetualMarkers";

type Props = {
  node: CalendarNode;
  markers?: PerpetualMarker[];
};

export default function CalendarDayView({ node, markers = [] }: Props) {
  const date = new Date(`${node.gregorianDate}T12:00:00`);
  const events = node.enoch?.events ?? [];

  return (
    <View
      style={{
        padding: 20,
        borderRadius: 18,
        borderWidth: 1,
        borderColor: "#dbe4dc",
        backgroundColor: "#ffffff",
      }}
    >
      <Text style={{ fontSize: 13, fontWeight: "900", color: "#668c43" }}>
        {date.toLocaleDateString("en-US", { weekday: "long" })}
      </Text>
      <Text
        style={{
          marginTop: 5,
          fontSize: 28,
          fontWeight: "900",
          color: "#10231a",
        }}
      >
        {date.toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })}
      </Text>
      <Text style={{ marginTop: 5, fontSize: 15, color: "#64748b" }}>
        Enoch Year {node.enoch?.year} · Month {node.enoch?.month?.number}, Day{" "}
        {node.enoch?.day}
      </Text>

      <View style={{ marginTop: 20, gap: 10 }}>
        {events.map((event) => (
          <View
            key={event.id}
            style={{
              padding: 14,
              borderRadius: 12,
              borderLeftWidth: 5,
              borderLeftColor: event.color ?? "#668c43",
              backgroundColor: "#f8faf8",
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "900", color: "#1f2937" }}>
              {event.englishName ?? event.shortName}
            </Text>
          </View>
        ))}

        {markers.map((marker) => (
          <View
            key={marker.id}
            style={{
              padding: 14,
              borderRadius: 12,
              borderLeftWidth: 5,
              borderLeftColor: marker.color || "#0f766e",
              backgroundColor: "#f8faf8",
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "900", color: "#1f2937" }}>
              {marker.title || marker.shortName}
            </Text>
            {marker.notes ? (
              <Text style={{ marginTop: 5, lineHeight: 20, color: "#64748b" }}>
                {marker.notes}
              </Text>
            ) : null}
          </View>
        ))}

        {events.length === 0 && markers.length === 0 ? (
          <Text style={{ paddingVertical: 18, color: "#64748b" }}>
            No appointed times or perpetual markers are listed for this day.
          </Text>
        ) : null}
      </View>
    </View>
  );
}
