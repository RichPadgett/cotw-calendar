/*
 * File: src/components/calendar/CalendarStripView.tsx
 * Purpose: Unwraps the Enoch year wheel into a continuously zoomable day strip.
 */

import { ReactNode, useEffect, useMemo, useRef, useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import ScrollIcon from "../../../assets/enoch/icons/scroll.png";
import type { CalendarNode, EnochDayEvent } from "../../models/calendar";
import type { PerpetualMarker } from "../../types/perpetualMarkers";

type CalendarDaySummary = {
  year: number;
  month: number;
  day: number;
  notice: unknown | null;
  hasContent: boolean;
};

type Props = {
  nodes: CalendarNode[];
  notices?: CalendarDaySummary[];
  perpetualMarkers?: PerpetualMarker[];
  todayDateId?: string;
  onPressDay?: (node: CalendarNode) => void;
  onInteractionChange?: (isInteracting: boolean) => void;
};

const ZOOM_LEVELS = [
  { label: "Year", width: 26 },
  { label: "Months", width: 44 },
  { label: "Days", width: 78 },
  { label: "Close", width: 150 },
  { label: "Detail", width: 300 },
] as const;

const DEFAULT_ZOOM_INDEX = 2;
const STRIP_ZOOM_STORAGE_KEY = "calendarStripZoomIndex";
const STRIP_HEIGHT = 430;

function eventColor(event: EnochDayEvent) {
  if (event.color) return event.color;
  if (event.type === "weekly-sabbath") return "#d6a406";
  if (event.type === "high-sabbath") return "#dc2626";
  if (event.type === "fast") return "#7c3aed";
  if (event.type === "preparation") return "#ea580c";
  return "#15803d";
}

function markersForNode(
  node: CalendarNode,
  perpetualMarkers: PerpetualMarker[]
) {
  return perpetualMarkers.filter((marker) => {
    const matchesMonthDay =
      marker.month === node.enoch?.month?.number &&
      marker.day === node.enoch?.day;
    const matchesGate =
      Boolean(marker.gateDay) &&
      node.enoch?.isIntercalary &&
      marker.gateDay === node.enoch?.quarter;
    const matchesIntercalaryWeek =
      marker.intercalaryWeek === true && node.enoch?.isSabbathWeek === true;

    return matchesMonthDay || matchesGate || matchesIntercalaryWeek;
  });
}

function getNodeLabel(node: CalendarNode) {
  if (node.enoch?.isIntercalary) {
    return node.enoch.label ?? `Quarter ${node.enoch.quarter} Gate Day`;
  }

  return `Day ${node.enoch?.day}`;
}

function getCompactNodeLabel(node: CalendarNode) {
  if (node.enoch?.isIntercalary) {
    return `G${node.enoch.quarter}`;
  }

  return `D${node.enoch?.day}`;
}

export default function CalendarStripView({
  nodes,
  notices = [],
  perpetualMarkers = [],
  todayDateId,
  onPressDay,
  onInteractionChange,
}: Props) {
  const { width: viewportWidth } = useWindowDimensions();
  const scrollRef = useRef<ScrollView>(null);
  const [zoomIndex, setZoomIndex] = useState(DEFAULT_ZOOM_INDEX);
  const [hasLoadedStripZoom, setHasLoadedStripZoom] = useState(false);
  const initialIndex = Math.max(
    0,
    nodes.findIndex((node) => node.gregorianDate === todayDateId)
  );
  const centeredIndexRef = useRef(initialIndex);
  const hasPositionedRef = useRef(false);
  const dayWidth = ZOOM_LEVELS[zoomIndex].width;
  const viewportContentWidth = Math.max(280, viewportWidth - 96);

  const summariesByDay = useMemo(() => {
    const result = new Map<string, CalendarDaySummary>();

    for (const summary of notices) {
      result.set(`${summary.year}-${summary.month}-${summary.day}`, summary);
    }

    return result;
  }, [notices]);

  useEffect(() => {
    let isMounted = true;

    AsyncStorage.getItem(STRIP_ZOOM_STORAGE_KEY)
      .then((savedZoomIndex) => {
        const parsedZoomIndex = Number(savedZoomIndex);

        if (
          isMounted &&
          savedZoomIndex !== null &&
          Number.isInteger(parsedZoomIndex) &&
          parsedZoomIndex >= 0 &&
          parsedZoomIndex < ZOOM_LEVELS.length
        ) {
          setZoomIndex(parsedZoomIndex);
        }
      })
      .finally(() => {
        if (isMounted) setHasLoadedStripZoom(true);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!hasLoadedStripZoom) return;

    void AsyncStorage.setItem(STRIP_ZOOM_STORAGE_KEY, String(zoomIndex));
  }, [hasLoadedStripZoom, zoomIndex]);

  function scrollToIndex(index: number, animated: boolean) {
    const safeIndex = Math.max(0, Math.min(nodes.length - 1, index));
    centeredIndexRef.current = safeIndex;
    scrollRef.current?.scrollTo({
      x: Math.max(0, safeIndex * dayWidth - viewportContentWidth / 2),
      animated,
    });
  }

  useEffect(() => {
    if (hasPositionedRef.current || nodes.length === 0) return;

    const frameId = requestAnimationFrame(() => {
      scrollToIndex(initialIndex, false);
      hasPositionedRef.current = true;
    });

    return () => cancelAnimationFrame(frameId);
  }, [initialIndex, nodes.length]);

  useEffect(() => {
    if (!hasPositionedRef.current) return;

    const frameId = requestAnimationFrame(() => {
      scrollToIndex(centeredIndexRef.current, false);
    });

    return () => cancelAnimationFrame(frameId);
  }, [dayWidth]);

  function changeZoom(direction: -1 | 1) {
    setZoomIndex((current) =>
      Math.max(0, Math.min(ZOOM_LEVELS.length - 1, current + direction))
    );
  }

  return (
    <View style={{ gap: 10 }}>
      <View
        style={{
          padding: 10,
          borderRadius: 14,
          borderWidth: 1,
          borderColor: "#dbe4dc",
          backgroundColor: "#f8faf8",
          flexDirection: "row",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 8,
        }}
      >
        <View style={{ flex: 1, minWidth: 190 }}>
          <Text style={{ fontSize: 14, fontWeight: "900", color: "#163d2b" }}>
            Unwrapped year · {ZOOM_LEVELS[zoomIndex].label}
          </Text>
          <Text style={{ marginTop: 2, fontSize: 11, color: "#64748b" }}>
            Scroll through every day from sunrise to night.
          </Text>
        </View>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Show today in strip"
          onPress={() => scrollToIndex(initialIndex, true)}
          style={({ pressed }) => ({
            minHeight: 38,
            paddingHorizontal: 12,
            borderRadius: 10,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: pressed ? "#dbe9df" : "#e8f1ea",
          })}
        >
          <Text style={{ fontSize: 12, fontWeight: "900", color: "#28523b" }}>
            Today
          </Text>
        </Pressable>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            borderRadius: 10,
            overflow: "hidden",
            borderWidth: 1,
            borderColor: "#cbd5e1",
            backgroundColor: "#ffffff",
          }}
        >
          <ZoomButton
            icon="remove"
            label="Zoom strip out"
            disabled={zoomIndex === 0}
            onPress={() => changeZoom(-1)}
          />
          <Text
            style={{
              minWidth: 58,
              textAlign: "center",
              fontSize: 12,
              fontWeight: "900",
              color: "#334155",
            }}
          >
            {zoomIndex + 1} / {ZOOM_LEVELS.length}
          </Text>
          <ZoomButton
            icon="add"
            label="Zoom strip in"
            disabled={zoomIndex === ZOOM_LEVELS.length - 1}
            onPress={() => changeZoom(1)}
          />
        </View>
      </View>

      <ScrollView
        ref={scrollRef}
        horizontal
        nestedScrollEnabled
        showsHorizontalScrollIndicator
        scrollEventThrottle={16}
        onScroll={(event) => {
          centeredIndexRef.current = Math.max(
            0,
            Math.min(
              nodes.length - 1,
              Math.round(
                (event.nativeEvent.contentOffset.x + viewportContentWidth / 2) /
                  dayWidth
              )
            )
          );
        }}
        onScrollBeginDrag={() => onInteractionChange?.(true)}
        onScrollEndDrag={() => onInteractionChange?.(false)}
        onMomentumScrollEnd={() => onInteractionChange?.(false)}
        style={{
          borderRadius: 16,
          borderWidth: 1,
          borderColor: "#cbd5e1",
          backgroundColor: "#f1f5f9",
        }}
        contentContainerStyle={{ minHeight: STRIP_HEIGHT }}
      >
        {nodes.map((node, index) => {
          const events = node.enoch?.events ?? [];
          const eveningEvents = events.filter(
            (event) => event.id === "atonement-affliction-begins"
          );
          const daytimeEvents = events.filter(
            (event) => event.id !== "atonement-affliction-begins"
          );
          const afflictionContinuesThroughEvening = events.some(
            (event) => event.id === "day-of-atonement"
          );
          const markers = markersForNode(node, perpetualMarkers);
          const summary =
            node.enoch?.month?.number && node.enoch?.day
              ? summariesByDay.get(
                  `${node.enoch.year}-${node.enoch.month.number}-${node.enoch.day}`
                )
              : undefined;
          const isToday = node.gregorianDate === todayDateId;
          const isMonthStart = node.enoch?.day === 1;
          const isGateDay = node.enoch?.isIntercalary === true;
          const dayLabel = getNodeLabel(node);
          const compactDayLabel = getCompactNodeLabel(node);
          const showBasicText = dayWidth >= 44;
          const showDayParts = dayWidth >= 78;
          const showDetails = dayWidth >= 150;
          const showFullDetails = dayWidth >= 300;
          const primaryColor =
            events[0]?.color ?? markers[0]?.color ?? "#94a3b8";
          const restEvent =
            events.find((event) => event.type === "high-sabbath") ??
            events.find((event) => event.type === "weekly-sabbath");
          const isHighRest = restEvent?.type === "high-sabbath";
          const hasNotice = Boolean(summary?.notice);
          const hasContent = Boolean(summary?.hasContent);
          const accessibilityDetails = [
            isHighRest ? "high rest" : restEvent ? "weekly rest" : "",
            hasNotice ? "notice" : "",
            hasContent ? "content available" : "",
          ]
            .filter(Boolean)
            .join(", ");

          return (
            <Pressable
              key={node.id}
              accessibilityRole="button"
              accessibilityLabel={
                isGateDay
                  ? `${dayLabel}, ${node.gregorianDate}${accessibilityDetails ? `, ${accessibilityDetails}` : ""}`
                  : `Month ${node.enoch?.month?.number}, ${dayLabel}, ${node.gregorianDate}${accessibilityDetails ? `, ${accessibilityDetails}` : ""}`
              }
              onPress={() => onPressDay?.(node)}
              style={({ pressed }) => ({
                width: dayWidth,
                minHeight: STRIP_HEIGHT,
                borderLeftWidth: isMonthStart || isGateDay ? 4 : 1,
                borderLeftColor: isGateDay
                  ? "#0284c7"
                  : isMonthStart
                    ? "#163d2b"
                    : "#cbd5e1",
                borderRightWidth: isToday ? 3 : 0,
                borderRightColor: "#2563eb",
                backgroundColor: pressed
                  ? "#e2e8f0"
                  : isToday
                    ? "#eff6ff"
                    : "#ffffff",
              })}
            >
              <View
                style={{
                  minHeight: showDetails ? 78 : 58,
                  paddingHorizontal: showDetails ? 10 : 3,
                  paddingVertical: 7,
                  alignItems: showDetails ? "flex-start" : "center",
                  justifyContent: "center",
                  borderBottomWidth: 1,
                  borderBottomColor: "#dbe4dc",
                }}
              >
                {isMonthStart && showDetails ? (
                  <Text
                    numberOfLines={1}
                    style={{
                      fontSize: 10,
                      fontWeight: "900",
                      color: "#668c43",
                    }}
                  >
                    {node.enoch?.month?.name ??
                      `MONTH ${node.enoch?.month?.number}`}
                  </Text>
                ) : null}
                <Text
                  numberOfLines={1}
                  style={{
                    fontSize: showDetails ? 18 : showBasicText ? 11 : 8,
                    fontWeight: "900",
                    color: "#10231a",
                  }}
                >
                  {showDetails
                    ? isGateDay
                      ? dayLabel
                      : `Month ${node.enoch?.month?.number} · ${dayLabel}`
                    : showBasicText
                      ? isGateDay
                        ? "GATE"
                        : `M${node.enoch?.month?.number}`
                      : isGateDay
                        ? "G"
                        : node.enoch?.month?.number}
                </Text>
                {!showDetails ? (
                  <Text
                    style={{
                      marginTop: 2,
                      fontSize: showBasicText ? 13 : 8,
                      fontWeight: "900",
                      color: "#475569",
                    }}
                  >
                    {showBasicText
                      ? compactDayLabel
                      : isGateDay
                        ? node.enoch?.quarter
                        : node.enoch?.day}
                  </Text>
                ) : (
                  <Text
                    style={{ marginTop: 3, fontSize: 11, color: "#64748b" }}
                  >
                    {new Date(
                      `${node.gregorianDate}T12:00:00`
                    ).toLocaleDateString("en-US", {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                    })}
                  </Text>
                )}
              </View>

              <View style={{ flex: 1 }}>
                <DayPart
                  label="Morning"
                  detail={`${dayLabel} begins · sunrise`}
                  color="#fef3c7"
                  showLabel={showDayParts}
                  expanded={showFullDetails}
                />
                <View
                  style={{
                    flex: 1.35,
                    padding: showDetails ? 8 : 2,
                    borderTopWidth: 1,
                    borderBottomWidth: 1,
                    borderColor: "#dbe4dc",
                    backgroundColor: "#f8faf8",
                  }}
                >
                  {showDayParts ? (
                    <Text
                      style={{
                        fontSize: showDetails ? 11 : 9,
                        fontWeight: "900",
                        color: "#64748b",
                        textTransform: "uppercase",
                      }}
                    >
                      Day
                    </Text>
                  ) : null}

                  {showDetails ? (
                    <View style={{ marginTop: 6, gap: 5 }}>
                      {daytimeEvents.map((event) => (
                        <View
                          key={event.id}
                          style={{
                            paddingHorizontal: 7,
                            paddingVertical: 5,
                            borderRadius: 7,
                            borderLeftWidth: 4,
                            borderLeftColor: eventColor(event),
                            backgroundColor: "#ffffff",
                          }}
                        >
                          <Text
                            numberOfLines={showFullDetails ? 3 : 1}
                            style={{
                              fontSize: showFullDetails ? 12 : 10,
                              fontWeight: "900",
                              color: "#1f2937",
                            }}
                          >
                            {event.englishName ?? event.shortName}
                          </Text>
                        </View>
                      ))}
                      {markers.map((marker) => (
                        <View
                          key={marker.id}
                          style={{
                            paddingHorizontal: 7,
                            paddingVertical: 5,
                            borderRadius: 7,
                            borderLeftWidth: 4,
                            borderLeftColor: marker.color || "#0f766e",
                            backgroundColor: "#ffffff",
                          }}
                        >
                          <Text
                            numberOfLines={showFullDetails ? 3 : 1}
                            style={{
                              fontSize: showFullDetails ? 12 : 10,
                              fontWeight: "900",
                              color: "#1f2937",
                            }}
                          >
                            {marker.title || marker.shortName}
                          </Text>
                          {showFullDetails && marker.description ? (
                            <Text
                              numberOfLines={4}
                              style={{
                                marginTop: 3,
                                fontSize: 10,
                                color: "#64748b",
                              }}
                            >
                              {marker.description}
                            </Text>
                          ) : null}
                        </View>
                      ))}
                      {daytimeEvents.length === 0 &&
                      markers.length === 0 &&
                      eveningEvents.length === 0 ? (
                        <Text style={{ fontSize: 10, color: "#94a3b8" }}>
                          {isGateDay ? "Gate day" : "Regular day"}
                        </Text>
                      ) : null}
                    </View>
                  ) : (
                    <View
                      style={{
                        marginTop: showDayParts ? 8 : 16,
                        alignSelf: "center",
                        width: Math.max(6, dayWidth - 12),
                        height: events.length || markers.length ? 8 : 2,
                        borderRadius: 4,
                        backgroundColor: primaryColor,
                        opacity: events.length || markers.length ? 1 : 0.3,
                      }}
                    />
                  )}

                  {showDetails && (summary?.notice || summary?.hasContent) ? (
                    <View
                      style={{
                        marginTop: 6,
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 4,
                      }}
                    >
                      <MaterialIcons
                        name="description"
                        size={13}
                        color="#2563eb"
                      />
                      <Text
                        style={{
                          fontSize: 10,
                          fontWeight: "800",
                          color: "#2563eb",
                        }}
                      >
                        {summary.notice ? "Notice" : "Details available"}
                      </Text>
                    </View>
                  ) : null}
                </View>
                <DayPart
                  label="Evening"
                  detail={`Evening of ${dayLabel} · before night`}
                  color="#dbeafe"
                  showLabel={showDayParts}
                  expanded={showFullDetails}
                >
                  {showDetails
                    ? eveningEvents.map((event) => (
                        <View
                          key={event.id}
                          style={{
                            marginTop: 5,
                            paddingHorizontal: 7,
                            paddingVertical: 5,
                            borderRadius: 7,
                            borderLeftWidth: 4,
                            borderLeftColor: eventColor(event),
                            backgroundColor: "rgba(255,255,255,0.82)",
                          }}
                        >
                          <Text
                            numberOfLines={showFullDetails ? 3 : 1}
                            style={{
                              fontSize: showFullDetails ? 11 : 9,
                              fontWeight: "900",
                              color: "#1f2937",
                            }}
                          >
                            {event.englishName}
                          </Text>
                        </View>
                      ))
                    : null}
                  {showDetails && afflictionContinuesThroughEvening ? (
                    <Text
                      style={{
                        marginTop: 5,
                        fontSize: showFullDetails ? 11 : 9,
                        fontWeight: "900",
                        color: "#475569",
                      }}
                    >
                      Affliction continues through this evening
                    </Text>
                  ) : null}
                </DayPart>
              </View>

              {isToday ? (
                <View
                  style={{
                    position: "absolute",
                    top: 3,
                    right: 3,
                    width: 7,
                    height: 7,
                    borderRadius: 4,
                    backgroundColor: "#2563eb",
                  }}
                />
              ) : null}

              <DayIndicators
                restType={isHighRest ? "high" : restEvent ? "weekly" : null}
                hasNotice={hasNotice}
                hasContent={hasContent}
                showLabels={showDetails}
              />
            </Pressable>
          );
        })}
      </ScrollView>

      <View
        accessibilityLabel="Strip symbols"
        style={{
          paddingHorizontal: 10,
          flexDirection: "row",
          flexWrap: "wrap",
          gap: 12,
          alignItems: "center",
        }}
      >
        <StripLegendRest color="#ca8a04" label="High Rest" />
        <StripLegendRest color="#2563eb" label="Weekly Rest" />
        <StripLegendBadge text="!" color="#f97316" label="Day Notice" />
        <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
          <Image source={ScrollIcon} style={{ width: 16, height: 16 }} />
          <Text style={{ fontSize: 11, color: "#64748b" }}>
            Content Available
          </Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
          <View style={{ width: 4, height: 16, backgroundColor: "#0284c7" }} />
          <Text style={{ fontSize: 11, color: "#64748b" }}>Gate Day</Text>
        </View>
      </View>
    </View>
  );
}

function DayIndicators({
  restType,
  hasNotice,
  hasContent,
  showLabels,
}: {
  restType: "weekly" | "high" | null;
  hasNotice: boolean;
  hasContent: boolean;
  showLabels: boolean;
}) {
  if (!restType && !hasNotice && !hasContent) return null;

  return (
    <View
      pointerEvents="none"
      style={{
        position: "absolute",
        top: 84,
        right: 4,
        zIndex: 30,
        gap: 4,
        alignItems: "flex-end",
      }}
    >
      {restType ? (
        <View
          style={{
            minWidth: 18,
            height: 20,
            paddingHorizontal: 4,
            borderRadius: 6,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 4,
            backgroundColor: "rgba(255,255,255,0.94)",
          }}
        >
          <Text
            style={{
              fontSize: 14,
              lineHeight: 18,
              fontWeight: "900",
              color: restType === "high" ? "#ca8a04" : "#2563eb",
            }}
          >
            𐤔
          </Text>
          {showLabels ? (
            <Text
              style={{
                fontSize: 9,
                fontWeight: "900",
                color: restType === "high" ? "#8a5d00" : "#1d4ed8",
              }}
            >
              {restType === "high" ? "HIGH REST" : "REST"}
            </Text>
          ) : null}
        </View>
      ) : null}

      {hasNotice ? (
        <View
          style={{
            minWidth: 18,
            height: 18,
            paddingHorizontal: showLabels ? 5 : 0,
            borderRadius: 9,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 4,
            backgroundColor: "#f97316",
          }}
        >
          <Text style={{ fontSize: 11, fontWeight: "900", color: "#ffffff" }}>
            !
          </Text>
          {showLabels ? (
            <Text style={{ fontSize: 9, fontWeight: "900", color: "#ffffff" }}>
              NOTICE
            </Text>
          ) : null}
        </View>
      ) : null}

      {hasContent ? (
        <View
          style={{
            minWidth: 20,
            height: 20,
            paddingHorizontal: showLabels ? 4 : 1,
            borderRadius: 6,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 3,
            backgroundColor: "rgba(255,255,255,0.94)",
          }}
        >
          <Image source={ScrollIcon} style={{ width: 16, height: 16 }} />
          {showLabels ? (
            <Text style={{ fontSize: 9, fontWeight: "900", color: "#334155" }}>
              CONTENT
            </Text>
          ) : null}
        </View>
      ) : null}
    </View>
  );
}

function StripLegendRest({ color, label }: { color: string; label: string }) {
  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
      <Text style={{ fontSize: 15, fontWeight: "900", color }}>𐤔</Text>
      <Text style={{ fontSize: 11, color: "#64748b" }}>{label}</Text>
    </View>
  );
}

function StripLegendBadge({
  text,
  color,
  label,
}: {
  text: string;
  color: string;
  label: string;
}) {
  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
      <View
        style={{
          width: 16,
          height: 16,
          borderRadius: 8,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: color,
        }}
      >
        <Text style={{ fontSize: 10, fontWeight: "900", color: "#ffffff" }}>
          {text}
        </Text>
      </View>
      <Text style={{ fontSize: 11, color: "#64748b" }}>{label}</Text>
    </View>
  );
}

function DayPart({
  label,
  detail,
  color,
  showLabel,
  expanded,
  children,
}: {
  label: string;
  detail: string;
  color: string;
  showLabel: boolean;
  expanded: boolean;
  children?: ReactNode;
}) {
  return (
    <View
      style={{
        flex: 0.7,
        minHeight: 58,
        paddingHorizontal: expanded ? 10 : 3,
        paddingVertical: 7,
        justifyContent: "center",
        alignItems: expanded ? "flex-start" : "center",
        backgroundColor: color,
      }}
    >
      {showLabel ? (
        <>
          <Text
            numberOfLines={1}
            style={{
              fontSize: expanded ? 12 : 9,
              fontWeight: "900",
              color: "#475569",
            }}
          >
            {label}
          </Text>
          {expanded ? (
            <Text style={{ marginTop: 2, fontSize: 10, color: "#64748b" }}>
              {detail}
            </Text>
          ) : null}
          {children}
        </>
      ) : null}
    </View>
  );
}

function ZoomButton({
  icon,
  label,
  disabled,
  onPress,
}: {
  icon: "add" | "remove";
  label: string;
  disabled: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => ({
        width: 38,
        height: 38,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: pressed ? "#e2e8f0" : "#ffffff",
        opacity: disabled ? 0.35 : 1,
      })}
    >
      <MaterialIcons name={icon} size={20} color="#334155" />
    </Pressable>
  );
}
