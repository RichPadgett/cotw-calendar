/*
 * File: src/components/calendar/YearWheelView.tsx
 * Purpose: Calendar UI component for rendering YearWheelView behavior and presentation.
 * Author: rpadgett
 */

// Dependencies
import { useEffect, useMemo, useRef, useState } from "react";
import {
  GestureResponderEvent,
  Image,
  Pressable,
  Text,
  View,
} from "react-native";
import ScrollIcon from "../../../assets/enoch/icons/scroll.png";
import { CalendarNode } from "../../models/calendar";
import type { PerpetualMarker } from "../../types/perpetualMarkers";
import { getAppDateId } from "../../utils/appDay";

// Types
type Props = {
  nodes: CalendarNode[];
  perpetualMarkers?: PerpetualMarker[];
  onPressMonth?: (monthNumber: number) => void;
  onPressDay?: (node: CalendarNode) => void;
  onInteractionChange?: (isInteracting: boolean) => void;
  todayDateId?: string;
};

// Constants
const SIZE = 320;
const CENTER = SIZE / 2;

const OUTER_RING_SIZE = SIZE + 42;
const OUTER_CENTER = OUTER_RING_SIZE / 2;

const MONTH_RING_INNER_RADIUS = SIZE / 2 - 42;
const MONTH_LABEL_RADIUS = SIZE / 2 - 22;
const CENTER_BADGE_SIZE = 104;
const MARKER_INNER_RADIUS = CENTER_BADGE_SIZE / 2;
const MARKER_OUTER_RADIUS = SIZE / 2 - 4;
const TODAY_TICK_LENGTH = 18;
const DAY_SHADE_HEIGHT = 1;
const GATE_SHADE_HEIGHT = 3;

const MARKER_COLORS = {
  sabbath: "#d6a406",
  highSabbath: "#dc2626",
  feast: "#15803d",
  fast: "#7c3aed",
  preparation: "#ea580c",
  gate: "#0284c7",
  perpetual: "#0f766e",
};

const DAY_SHADE_COLORS = {
  standard: "#cbd5e1",
  gate: "#0ea5e9",
};

const GATE_DOTS = [
  { label: "Spring Gate", angle: 0, color: "#84cc16" },
  { label: "Summer Gate", angle: -Math.PI / 2, color: "#facc15" },
  { label: "Fall Gate", angle: Math.PI, color: "#fb923c" },
  { label: "Winter Gate", angle: Math.PI / 2, color: "#38bdf8" },
];

const FRACTIONAL_MARKER_SPACING = (Math.PI * 2 * 0.34) / 364;
const WHEEL_DRAG_THRESHOLD = 8;
const VERTICAL_SCROLL_BIAS = 1.18;

type WheelMarkerEntry = {
  id: string;
  node: CalendarNode;
  angle: number;
  color: string;
  label: string;
  shortLabel: string;
  markerType: keyof typeof MARKER_COLORS;
};

// Helpers
/**
 * Converts an Enoch day-of-year into a wheel rotation angle.
 * This geometry helper positions day and gate markers around the circular year view.
 */
function getAngleForDay(dayOfYear: number) {
  return -((dayOfYear - 1) / 364) * Math.PI * 2;
}

function getPerpetualMarkersForNode(
  node: CalendarNode,
  perpetualMarkers: PerpetualMarker[]
) {
  return perpetualMarkers.filter((marker) => {
    const matchesMonthDay =
      typeof marker.month === "number" &&
      typeof marker.day === "number" &&
      marker.month === node.enoch?.month?.number &&
      marker.day === node.enoch?.day;

    const matchesGateDay =
      typeof marker.gateDay === "number" &&
      node.enoch?.isIntercalary === true &&
      node.enoch?.isSabbathWeek !== true &&
      marker.gateDay === node.enoch?.quarter;

    const matchesIntercalaryWeek =
      marker.intercalaryWeek === true && node.enoch?.isSabbathWeek === true;

    return matchesMonthDay || matchesGateDay || matchesIntercalaryWeek;
  });
}

function getEventMarkerColor(eventType: string) {
  switch (eventType) {
    case "weekly-sabbath":
      return MARKER_COLORS.sabbath;
    case "high-sabbath":
      return MARKER_COLORS.highSabbath;
    case "feast":
      return MARKER_COLORS.feast;
    case "fast":
      return MARKER_COLORS.fast;
    case "preparation":
      return MARKER_COLORS.preparation;
    default:
      return MARKER_COLORS.perpetual;
  }
}

function getEventMarkerType(eventType: string): WheelMarkerEntry["markerType"] {
  switch (eventType) {
    case "weekly-sabbath":
      return "sabbath";
    case "high-sabbath":
      return "highSabbath";
    case "feast":
      return "feast";
    case "fast":
      return "fast";
    case "preparation":
      return "preparation";
    default:
      return "perpetual";
  }
}

function buildWheelMarkerEntries(
  nodes: CalendarNode[],
  perpetualMarkers: PerpetualMarker[]
) {
  return nodes.flatMap((node) => {
    const dayOfYear = node.enoch?.dayOfYear;

    if (!dayOfYear) return [];

    const entries: Omit<WheelMarkerEntry, "angle">[] = [];

    for (const event of node.enoch?.events ?? []) {
      const markerType = getEventMarkerType(event.type);

      entries.push({
        id: `${node.id}:event:${event.id}`,
        node,
        color: getEventMarkerColor(event.type),
        label:
          event.englishName ??
          event.hebrewName ??
          event.shortName ??
          "Calendar Event",
        shortLabel:
          event.shortName ?? event.englishName ?? event.hebrewName ?? "Event",
        markerType,
      });
    }

    if (node.enoch?.isIntercalary && entries.length === 0) {
      entries.push({
        id: `${node.id}:gate`,
        node,
        color: MARKER_COLORS.gate,
        label: node.enoch.label ?? "Gate Day",
        shortLabel: node.enoch.label ?? "Gate",
        markerType: "gate",
      });
    }

    for (const marker of getPerpetualMarkersForNode(node, perpetualMarkers)) {
      entries.push({
        id: `${node.id}:perpetual:${marker.id}`,
        node,
        color: marker.color || MARKER_COLORS.perpetual,
        label: marker.title || marker.shortName || "Perpetual Marker",
        shortLabel: marker.shortName || marker.title || "Marker",
        markerType: "perpetual",
      });
    }

    const baseAngle = getAngleForDay(dayOfYear);
    const offsetStart = -((entries.length - 1) / 2);

    return entries.map((entry, index) => ({
      ...entry,
      angle: baseAngle + (offsetStart + index) * FRACTIONAL_MARKER_SPACING,
    }));
  });
}

/**
 * Measures the shortest angle between two wheel positions.
 * This keeps sliding selection smooth around the 0/364 day boundary.
 */
function getAngularDistance(firstAngle: number, secondAngle: number) {
  return Math.abs(
    Math.atan2(
      Math.sin(firstAngle - secondAngle),
      Math.cos(firstAngle - secondAngle)
    )
  );
}

function getCirclePoint(
  centerX: number,
  centerY: number,
  radius: number,
  angle: number
) {
  return {
    x: centerX + Math.cos(angle) * radius,
    y: centerY + Math.sin(angle) * radius,
  };
}

function getCircleSegment(
  centerX: number,
  centerY: number,
  innerRadius: number,
  outerRadius: number,
  angle: number
) {
  const start = getCirclePoint(centerX, centerY, innerRadius, angle);
  const end = getCirclePoint(centerX, centerY, outerRadius, angle);
  const deltaX = end.x - start.x;
  const deltaY = end.y - start.y;

  return {
    centerX: (start.x + end.x) / 2,
    centerY: (start.y + end.y) / 2,
    length: Math.hypot(deltaX, deltaY),
    rotation: Math.atan2(deltaY, deltaX),
  };
}

/**
 * Creates a legend row for a filled wheel marker color.
 * This small UX component explains feast and marker color meanings.
 */
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

/**
 * Creates a legend row for a small seasonal gate dot.
 * This small UX component explains gate marker colors in the wheel legend.
 */
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

function LegendNotice({ label }: { label: string }) {
  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
      <View
        style={{
          width: 14,
          height: 14,
          borderRadius: 7,
          backgroundColor: "#f97316",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            fontSize: 10,
            lineHeight: 12,
            fontWeight: "900",
            color: "#ffffff",
          }}
        >
          !
        </Text>
      </View>

      <Text style={{ fontSize: 12, color: "#374151", fontWeight: "600" }}>
        {label}
      </Text>
    </View>
  );
}

function LegendScroll({ label }: { label: string }) {
  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
      <Image
        source={ScrollIcon}
        style={{
          width: 16,
          height: 16,
        }}
        resizeMode="contain"
      />

      <Text style={{ fontSize: 12, color: "#374151", fontWeight: "600" }}>
        {label}
      </Text>
    </View>
  );
}

/**
 * Creates a legend row for sabbath rest symbols.
 * This small UX component explains weekly and high-sabbath markers in the wheel legend.
 */
function LegendRest({ color, label }: { color: string; label: string }) {
  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
      <Text
        style={{
          fontSize: 14,
          fontWeight: "700",
          color: color,
        }}
      >
        𐤔
      </Text>
      <Text style={{ fontSize: 12, color: "#374151", fontWeight: "600" }}>
        {label}
      </Text>
    </View>
  );
}

// Component
/**
 * Creates the circular Enoch year wheel view.
 * This UX component renders months, day markers, seasonal gates, sabbath markers, and month/day press targets.
 */
export default function YearWheelView({
  nodes,
  perpetualMarkers = [],
  onPressMonth,
  onPressDay,
  onInteractionChange,
  todayDateId,
}: Props) {
  const [selectedWheelMarkerId, setSelectedWheelMarkerId] = useState<
    string | null
  >(null);
  const [isWheelInteracting, setIsWheelInteracting] = useState(false);
  const interactionTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );
  const wheelTouchStartRef = useRef<{ x: number; y: number } | null>(null);
  const months = Array.from({ length: 12 }, (_, index) => index + 1);
  const activeTodayDateId = todayDateId ?? getAppDateId();

  const todayNode = nodes.find((node) => {
    return node.gregorianDate === activeTodayDateId;
  });
  const wheelMarkerEntries = useMemo(() => {
    return buildWheelMarkerEntries(nodes, perpetualMarkers);
  }, [nodes, perpetualMarkers]);
  const todayMarkerEntry = wheelMarkerEntries.find(
    (entry) => entry.node.id === todayNode?.id
  );
  const selectedWheelEntry = wheelMarkerEntries.find(
    (entry) => entry.id === selectedWheelMarkerId
  );
  const selectedWheelEntryIndex = selectedWheelEntry
    ? wheelMarkerEntries.findIndex(
        (entry) => entry.id === selectedWheelEntry.id
      )
    : -1;
  const magnifierEntries =
    selectedWheelEntry && selectedWheelEntryIndex >= 0
      ? (() => {
          const markerWindow = [-2, -1, 0, 1, 2]
            .map((offset) => {
              const index =
                (selectedWheelEntryIndex + offset + wheelMarkerEntries.length) %
                wheelMarkerEntries.length;
              const entry = wheelMarkerEntries[index];

              return {
                entry,
                offset,
                xDelta:
                  Math.cos(entry.angle) - Math.cos(selectedWheelEntry.angle),
              };
            })
            .filter(
              (
                item
              ): item is {
                entry: WheelMarkerEntry;
                offset: number;
                xDelta: number;
              } => Boolean(item.entry)
            );

          const selectedItem = markerWindow.find((item) => item.offset === 0);
          const leftItems = markerWindow
            .filter((item) => item.xDelta < -0.001)
            .sort((leftItem, rightItem) => leftItem.xDelta - rightItem.xDelta)
            .slice(-2);
          const rightItems = markerWindow
            .filter((item) => item.xDelta > 0.001)
            .sort((leftItem, rightItem) => leftItem.xDelta - rightItem.xDelta)
            .slice(0, 2);

          if (
            selectedItem &&
            leftItems.length === 2 &&
            rightItems.length === 2
          ) {
            return [...leftItems, selectedItem, ...rightItems].map(
              (item) => item.entry
            );
          }

          const fallbackOffsets =
            Math.sin(selectedWheelEntry.angle) < 0
              ? [2, 1, 0, -1, -2]
              : [-2, -1, 0, 1, 2];

          return fallbackOffsets
            .map((offset) => {
              return markerWindow.find((item) => item.offset === offset)?.entry;
            })
            .filter((entry): entry is WheelMarkerEntry => Boolean(entry));
        })()
      : [];
  const selectedWheelNode = selectedWheelEntry?.node;
  const selectedWheelColor = selectedWheelEntry?.color ?? "#3157a8";
  const selectedWheelLabel = selectedWheelEntry?.label;

  useEffect(() => {
    setSelectedWheelMarkerId((currentMarkerId) => {
      if (
        currentMarkerId &&
        wheelMarkerEntries.some((entry) => entry.id === currentMarkerId)
      ) {
        return currentMarkerId;
      }

      return todayMarkerEntry?.id ?? null;
    });
  }, [todayMarkerEntry?.id, wheelMarkerEntries]);

  function selectNearestWheelMarker(event: GestureResponderEvent) {
    if (wheelMarkerEntries.length === 0) return;

    const touchX = event.nativeEvent.locationX;
    const touchY = event.nativeEvent.locationY;
    const distanceFromCenter = Math.hypot(touchX - CENTER, touchY - CENTER);

    if (distanceFromCenter < CENTER_BADGE_SIZE / 2) return;

    const touchAngle = Math.atan2(touchY - CENTER, touchX - CENTER);
    const nearestEntry = wheelMarkerEntries
      .map((entry) => {
        return {
          entry,
          distance: getAngularDistance(touchAngle, entry.angle),
        };
      })
      .sort((a, b) => a.distance - b.distance)[0]?.entry;

    if (nearestEntry) {
      setSelectedWheelMarkerId(nearestEntry.id);
    }
  }

  function showWheelMagnifier(event: GestureResponderEvent) {
    if (interactionTimeoutRef.current) {
      clearTimeout(interactionTimeoutRef.current);
    }

    setIsWheelInteracting(true);
    onInteractionChange?.(true);
    selectNearestWheelMarker(event);
  }

  function rememberWheelTouchStart(event: GestureResponderEvent) {
    wheelTouchStartRef.current = {
      x: event.nativeEvent.pageX,
      y: event.nativeEvent.pageY,
    };
  }

  function shouldUseWheelGesture(event: GestureResponderEvent) {
    const start = wheelTouchStartRef.current;

    if (!start) {
      return false;
    }

    const deltaX = event.nativeEvent.pageX - start.x;
    const deltaY = event.nativeEvent.pageY - start.y;
    const absX = Math.abs(deltaX);
    const absY = Math.abs(deltaY);

    if (absX < WHEEL_DRAG_THRESHOLD && absY < WHEEL_DRAG_THRESHOLD) {
      return false;
    }

    return absY <= absX * VERTICAL_SCROLL_BIAS;
  }

  function handleWheelTouchEnd(event: GestureResponderEvent) {
    const start = wheelTouchStartRef.current;
    wheelTouchStartRef.current = null;

    if (!start) {
      hideWheelMagnifierSoon();
      return;
    }

    const deltaX = event.nativeEvent.pageX - start.x;
    const deltaY = event.nativeEvent.pageY - start.y;
    const movedDistance = Math.hypot(deltaX, deltaY);

    if (movedDistance < WHEEL_DRAG_THRESHOLD) {
      showWheelMagnifier(event);
    }

    hideWheelMagnifierSoon();
  }

  function cancelWheelTouch() {
    wheelTouchStartRef.current = null;
    hideWheelMagnifierSoon();
  }

  function hideWheelMagnifierSoon() {
    if (interactionTimeoutRef.current) {
      clearTimeout(interactionTimeoutRef.current);
    }

    interactionTimeoutRef.current = setTimeout(() => {
      setIsWheelInteracting(false);
      onInteractionChange?.(false);
    }, 900);
  }

  useEffect(() => {
    return () => {
      if (interactionTimeoutRef.current) {
        clearTimeout(interactionTimeoutRef.current);
      }
      onInteractionChange?.(false);
    };
  }, [onInteractionChange]);

  return (
    <View
      style={[
        {
          alignItems: "center",
          marginTop: 18,
          marginBottom: 24,
        },
        {
          userSelect: "none",
          WebkitUserSelect: "none",
          WebkitTouchCallout: "none",
          touchAction: "pan-y",
        } as any,
      ]}
    >
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
          const point = getCirclePoint(
            OUTER_CENTER,
            OUTER_CENTER,
            radius,
            gate.angle
          );

          return (
            <View
              key={gate.label}
              style={{
                position: "absolute",
                left: point.x - 6,
                top: point.y - 6,
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
              const labelRadius = OUTER_RING_SIZE / 2 - 12;
              const tick = getCircleSegment(
                OUTER_CENTER,
                OUTER_CENTER,
                OUTER_RING_SIZE / 2,
                OUTER_RING_SIZE / 2 + TODAY_TICK_LENGTH,
                angle
              );
              const labelPoint = getCirclePoint(
                OUTER_CENTER,
                OUTER_CENTER,
                labelRadius,
                angle
              );

              return (
                <>
                  <View
                    style={{
                      position: "absolute",
                      left: tick.centerX - tick.length / 2,
                      top: tick.centerY - 2,
                      width: tick.length,
                      height: 4,
                      borderRadius: 999,
                      backgroundColor: "#dc2626",
                      transform: [{ rotate: `${tick.rotation}rad` }],
                      transformOrigin: "center center" as any,
                      zIndex: 40,
                    }}
                  />
                  <Text
                    style={{
                      position: "absolute",
                      left: labelPoint.x - 10,
                      top: labelPoint.y - 10,
                      width: 20,
                      height: 20,
                      borderRadius: 10,
                      backgroundColor: "#fffafa",
                      borderWidth: 1,
                      borderColor: "#fecaca",
                      fontSize: 10,
                      lineHeight: 20,
                      fontWeight: "900",
                      color: "#991b1b",
                      textAlign: "center",
                      zIndex: 40,
                      shadowColor: "#dc2626",
                      shadowOpacity: 0.18,
                      shadowRadius: 3,
                      shadowOffset: { width: 0, height: 1 },
                    }}
                  >
                    {todayNode.enoch.day}
                  </Text>
                </>
              );
            })()
          : null}

        <View
          style={{
            width: SIZE,
            height: SIZE,
            borderRadius: SIZE / 2,
            borderWidth: 2,
            borderColor: "#345190",
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
              backgroundColor: "#bcd3f1",
              opacity: 0.75,
            }}
          />

          <View
            onTouchStart={rememberWheelTouchStart}
            onTouchEnd={handleWheelTouchEnd}
            onTouchCancel={cancelWheelTouch}
            onStartShouldSetResponder={() => false}
            onMoveShouldSetResponder={shouldUseWheelGesture}
            onResponderGrant={showWheelMagnifier}
            onResponderMove={showWheelMagnifier}
            onResponderRelease={handleWheelTouchEnd}
            onResponderTerminate={hideWheelMagnifierSoon}
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: SIZE,
              height: SIZE,
              borderRadius: SIZE / 2,
              zIndex: 7,
            }}
          />

          {nodes.map((node) => {
            const dayOfYear = node.enoch?.dayOfYear;

            if (!dayOfYear) return null;

            const angle = getAngleForDay(dayOfYear);
            const isGateDay = node.enoch?.isIntercalary === true;
            const shadeHeight = isGateDay
              ? GATE_SHADE_HEIGHT
              : DAY_SHADE_HEIGHT;
            const shadeSegment = getCircleSegment(
              CENTER,
              CENTER,
              MARKER_INNER_RADIUS,
              MARKER_OUTER_RADIUS,
              angle
            );

            return (
              <View
                key={`day-shade-${node.id}`}
                pointerEvents="none"
                style={{
                  position: "absolute",
                  left: shadeSegment.centerX - shadeSegment.length / 2,
                  top: shadeSegment.centerY - shadeHeight / 2,
                  width: shadeSegment.length,
                  height: shadeHeight,
                  transform: [{ rotate: `${shadeSegment.rotation}rad` }],
                  transformOrigin: "center center" as any,
                  backgroundColor: isGateDay
                    ? DAY_SHADE_COLORS.gate
                    : DAY_SHADE_COLORS.standard,
                  borderRadius: 999,
                  opacity: isGateDay ? 0.55 : 0.28,
                  zIndex: 2,
                }}
              />
            );
          })}

          {wheelMarkerEntries.map((entry) => {
            const isSelected = selectedWheelMarkerId === entry.id;
            const markerHeight = isSelected ? 6 : 2;
            const markerSegment = getCircleSegment(
              CENTER,
              CENTER,
              MARKER_INNER_RADIUS,
              MARKER_OUTER_RADIUS,
              entry.angle
            );

            return (
              <View
                key={`marker-${entry.id}`}
                pointerEvents="none"
                style={{
                  position: "absolute",
                  left: markerSegment.centerX - markerSegment.length / 2,
                  top: markerSegment.centerY - markerHeight / 2,
                  width: markerSegment.length,
                  height: markerHeight,
                  transform: [{ rotate: `${markerSegment.rotation}rad` }],
                  transformOrigin: "center center" as any,
                  backgroundColor: entry.color,
                  borderRadius: 999,
                  opacity: entry.markerType === "sabbath" ? 0.65 : 1,
                  zIndex: isSelected ? 15 : 8,
                  shadowColor: entry.color,
                  shadowOpacity: isSelected ? 0.35 : 0,
                  shadowRadius: isSelected ? 4 : 0,
                  shadowOffset: { width: 0, height: 0 },
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
            const separatorSegment = getCircleSegment(
              CENTER,
              CENTER,
              MONTH_RING_INNER_RADIUS,
              SIZE / 2,
              angle
            );

            return (
              <View
                key={`month-separator-${index}`}
                style={{
                  position: "absolute",
                  left: separatorSegment.centerX - separatorSegment.length / 2,
                  top: separatorSegment.centerY - 1,
                  width: separatorSegment.length,
                  height: 2,
                  backgroundColor: "#285a2c",
                  opacity: 0.25,
                  transform: [{ rotate: `${separatorSegment.rotation}rad` }],
                  transformOrigin: "center center" as any,
                  zIndex: 4,
                }}
              />
            );
          })}

          {months.map((monthNumber, index) => {
            const angle = -(index / 12) * Math.PI * 2;
            const labelPoint = getCirclePoint(
              CENTER,
              CENTER,
              MONTH_LABEL_RADIUS,
              angle
            );

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
                  backgroundColor: "#fffdf7",
                  borderRadius: 999,
                  borderWidth: 1,
                  borderColor: "#d8cfae",
                  zIndex: 10,
                  shadowColor: "#111827",
                  shadowOpacity: 0.08,
                  shadowRadius: 3,
                  shadowOffset: { width: 0, height: 1 },
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
            const point = getCirclePoint(CENTER, CENTER, radius, season.angle);

            return (
              <View
                key={season.label}
                style={{
                  position: "absolute",
                  left: point.x - 38,
                  top: point.y - 13,
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

          <Pressable
            onPress={() => {
              if (selectedWheelNode) {
                onPressDay?.(selectedWheelNode);
              }
            }}
            style={{
              position: "absolute",
              left: CENTER - CENTER_BADGE_SIZE / 2,
              top: CENTER - CENTER_BADGE_SIZE / 2,
              width: CENTER_BADGE_SIZE,
              height: CENTER_BADGE_SIZE,
              paddingHorizontal: 8,
              borderRadius: CENTER_BADGE_SIZE / 2,
              borderWidth: 3,
              borderColor: selectedWheelNode ? selectedWheelColor : "#87a1d9",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#ffffff",
              zIndex: 20,
            }}
          >
            <Text
              numberOfLines={selectedWheelNode ? 3 : 1}
              adjustsFontSizeToFit
              minimumFontScale={0.58}
              style={{
                width: CENTER_BADGE_SIZE - 18,
                fontSize: selectedWheelNode ? 12 : 18,
                lineHeight: selectedWheelNode ? 14 : 20,
                fontWeight: "900",
                color: selectedWheelNode ? selectedWheelColor : "#3157a8",
                textAlign: "center",
              }}
            >
              {selectedWheelNode ? (selectedWheelLabel ?? "Selected") : 364}
            </Text>

            <Text
              numberOfLines={1}
              style={{
                marginTop: selectedWheelNode ? 4 : 0,
                fontSize: selectedWheelNode ? 8 : 9,
                fontWeight: "800",
                color: "#64748b",
                textAlign: "center",
              }}
            >
              {selectedWheelNode
                ? `M${selectedWheelNode.enoch?.month?.number ?? "-"} D${
                    selectedWheelNode.enoch?.day ?? "-"
                  }`
                : "Days"}
            </Text>
          </Pressable>

          {isWheelInteracting && magnifierEntries.length > 0 ? (
            <View
              pointerEvents="none"
              style={{
                position: "absolute",
                left: 28,
                right: 28,
                bottom: 14,
                minHeight: 50,
                borderRadius: 12,
                borderWidth: 1,
                borderColor: "#d1d5db",
                backgroundColor: "#ffffffee",
                paddingHorizontal: 10,
                paddingVertical: 8,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                zIndex: 35,
                shadowColor: "#111827",
                shadowOpacity: 0.16,
                shadowRadius: 8,
                shadowOffset: { width: 0, height: 3 },
              }}
            >
              {magnifierEntries.map((entry) => {
                const isSelected = entry.id === selectedWheelMarkerId;

                return (
                  <View
                    key={`magnifier-${entry.id}`}
                    style={{
                      width: isSelected ? 46 : 34,
                      alignItems: "center",
                      gap: 5,
                    }}
                  >
                    <View
                      style={{
                        width: isSelected ? 38 : 26,
                        height: isSelected ? 8 : 5,
                        borderRadius: 999,
                        backgroundColor: entry.color,
                        opacity: isSelected ? 1 : 0.55,
                      }}
                    />
                    <Text
                      numberOfLines={1}
                      adjustsFontSizeToFit
                      minimumFontScale={0.62}
                      style={{
                        width: isSelected ? 46 : 34,
                        fontSize: isSelected ? 9 : 7,
                        fontWeight: isSelected ? "900" : "800",
                        color: isSelected ? entry.color : "#64748b",
                        textAlign: "center",
                      }}
                    >
                      {entry.shortLabel}
                    </Text>
                  </View>
                );
              })}
            </View>
          ) : null}
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
        <LegendItem color={MARKER_COLORS.highSabbath} label="High Sabbaths" />
        <LegendItem color={MARKER_COLORS.sabbath} label="Weekly Sabbaths" />
        <LegendItem color={MARKER_COLORS.feast} label="Feasts" />
        <LegendItem color={MARKER_COLORS.fast} label="Fasts" />
        <LegendItem color={MARKER_COLORS.preparation} label="Preparation" />
        <LegendItem color={MARKER_COLORS.perpetual} label="Perpetual Markers" />
        <LegendDot color="#84cc16" label="Spring Gate" />
        <LegendDot color="#facc15" label="Summer Gate" />
        <LegendDot color="#fb923c" label="Fall Gate" />
        <LegendDot color="#38bdf8" label="Winter Gate" />
        <LegendRest color="#ca8a04" label="High Sabbath" />
        <LegendRest color="#2563eb" label="Sabbath" />
        <LegendNotice label="Day Notice" />
        <LegendScroll label="Content Available" />
      </View>
    </View>
  );
}
