/*
 * File: src/components/calendar/AppHeader.tsx
 * Purpose: Calendar UI component for rendering AppHeader behavior and presentation.
 * Author: rpadgett
 */

import {
  Animated,
  Easing,
  Image,
  Pressable,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { useEffect, useRef, useState } from "react";

import { MaterialIcons } from "@expo/vector-icons";
import { CalendarNode, EnochMonth } from "../../models/calendar";

type Props = {
  // Currently active Enoch month
  month?: EnochMonth;
  todayNode?: CalendarNode;
  upcomingShabbatNode?: CalendarNode;

  // Top secondary label
  // Example:
  // "Enoch Year 2026"
  gregorianLabel: string;
  groupLabel: string;
  userRole?: "member" | "admin";
  yearTransition?: {
    direction: "previous" | "next";
    id: number;
  } | null;
  onChangeGroup: () => void;

  // Optional navigation actions
  onPressToday?: () => void;
  onPressUpcomingShabbat?: () => void;
  onPreviousMonth?: () => void;
  onNextMonth?: () => void;
};

/**
 * Creates the sticky app header above the calendar.
 * This UX component shows the active month context, today reference, and previous/next year controls.
 */
export default function AppHeader({
  month,
  gregorianLabel,
  groupLabel,
  userRole = "member",
  yearTransition,
  onChangeGroup,
  onPressToday,
  onPressUpcomingShabbat,
  onPreviousMonth,
  onNextMonth,
  todayNode,
  upcomingShabbatNode,
}: Props) {
  const { width } = useWindowDimensions();
  const yearTransitionProgress = useRef(new Animated.Value(0)).current;
  const [isMobileHeaderExpanded, setIsMobileHeaderExpanded] = useState(false);
  const [isDesktopHeaderCollapsed, setIsDesktopHeaderCollapsed] =
    useState(false);
  const isCompactHeader = width < 680;
  const isCompactCalendarMode = isCompactHeader && !isMobileHeaderExpanded;
  const isDesktopCollapsedMode = !isCompactHeader && isDesktopHeaderCollapsed;
  const isHeaderCollapsed = isCompactCalendarMode || isDesktopCollapsedMode;

  useEffect(() => {
    if (!yearTransition) return;

    yearTransitionProgress.setValue(0);

    Animated.timing(yearTransitionProgress, {
      toValue: 1,
      duration: 520,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, [yearTransition?.id, yearTransitionProgress]);

  const transitionTranslateX = yearTransitionProgress.interpolate({
    inputRange: [0, 1],
    outputRange: [yearTransition?.direction === "next" ? 24 : -24, 0],
  });

  const transitionOpacity = yearTransitionProgress.interpolate({
    inputRange: [0, 0.25, 1],
    outputRange: [0, 1, 1],
  });

  return (
    <View
      style={{
        /*
          Main sticky header card
        */
        marginBottom: 0,

        padding: 16,

        borderRadius: 20,

        backgroundColor: "#f9fafb",

        borderWidth: 1,
        borderColor: "#e5e7eb",
      }}
    >
      {/* ====================================================
          TOP ROW
          Title + Navigation Buttons
      ==================================================== */}

      <View
        style={{
          flexDirection: "row",

          justifyContent: "space-between",
          alignItems: isHeaderCollapsed ? "flex-start" : "center",
          gap: 10,
        }}
      >
        {/* Calendar Title */}

        <View
          style={{
            flex: 1,
            minWidth: 0,
            flexDirection: isHeaderCollapsed ? "row" : "column",
            alignItems: isHeaderCollapsed ? "center" : "stretch",
            gap: isHeaderCollapsed ? 8 : 0,
          }}
        >
          {isHeaderCollapsed ? (
            <>
              {month?.symbolImage ? (
                <Image
                  source={month.symbolImage}
                  style={{
                    width: 32,
                    height: 32,
                    flexShrink: 0,
                  }}
                  resizeMode="contain"
                />
              ) : null}

              <View style={{ flex: 1, minWidth: 0 }}>
                <Text
                  numberOfLines={1}
                  style={{
                    fontSize: 16,
                    lineHeight: 21,
                    fontWeight: "900",
                    color: "#081a33",
                  }}
                >
                  {month ? `Month ${month.number}` : "YHWH Calendar"}
                </Text>

                <Text
                  numberOfLines={2}
                  style={{
                    marginTop: 2,
                    fontSize: 12,
                    lineHeight: 16,
                    fontWeight: "700",
                    color: "#64748b",
                    textTransform: month ? "capitalize" : "none",
                  }}
                >
                  {month
                    ? `${month.season} - ${gregorianLabel}`
                    : gregorianLabel}
                </Text>
              </View>
            </>
          ) : (
            <>
              <Text
                numberOfLines={1}
                adjustsFontSizeToFit
                minimumFontScale={0.72}
                style={{
                  fontSize: 34,
                  fontWeight: "900",
                  color: "#081a33",
                  letterSpacing: 4.5,
                }}
              >
                YHWH
              </Text>

              <Text
                numberOfLines={1}
                adjustsFontSizeToFit
                minimumFontScale={0.75}
                style={{
                  marginTop: -2,
                  fontSize: 18,
                  fontWeight: "800",
                  color: "#081a33",
                  letterSpacing: 2.5,
                  textTransform: "uppercase",
                }}
              >
                Perpetual Calendar
              </Text>
            </>
          )}
        </View>

        {/* Navigation יהוה Buttons */}

        <View
          style={{
            alignItems: "center",
            flexShrink: 0,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              gap: 8,
            }}
          >
            {!isCompactHeader ? (
              <Pressable
                onPress={() => setIsDesktopHeaderCollapsed((value) => !value)}
                accessibilityRole="button"
                accessibilityLabel={
                  isDesktopHeaderCollapsed
                    ? "Expand calendar header"
                    : "Collapse calendar header"
                }
                style={({ pressed }) => [
                  {
                    width: 36,
                    height: 36,
                    borderRadius: 18,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#f1f5f9",
                  },
                  pressed && { opacity: 0.78 },
                ]}
              >
                <MaterialIcons
                  name={
                    isDesktopHeaderCollapsed ? "unfold-more" : "unfold-less"
                  }
                  size={22}
                  color="#334155"
                />
              </Pressable>
            ) : null}

            {isHeaderCollapsed ? (
              <Pressable
                onPress={onChangeGroup}
                accessibilityRole="button"
                accessibilityLabel="Change calendar group"
                style={({ pressed }) => [
                  {
                    width: 36,
                    height: 36,
                    borderRadius: 18,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#f8fafc",
                  },
                  pressed && { opacity: 0.78 },
                ]}
              >
                <MaterialIcons name="logout" size={22} color="#64748b" />
              </Pressable>
            ) : null}

            {/* Previous Month */}

            <Pressable
              onPress={onPreviousMonth}
              style={{
                width: 36,
                height: 36,

                borderRadius: 18,

                backgroundColor: "#e5e7eb",

                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <MaterialIcons name="chevron-left" size={28} />
            </Pressable>

            {/* Next Month */}

            <Pressable
              onPress={onNextMonth}
              style={{
                width: 36,
                height: 36,

                borderRadius: 18,

                backgroundColor: "#e5e7eb",

                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <MaterialIcons name="chevron-right" size={28} />
            </Pressable>
          </View>

          {yearTransition ? (
            <Animated.View
              style={{
                marginTop: 5,
                minWidth: 78,
                paddingHorizontal: 8,
                paddingVertical: 4,
                borderRadius: 999,
                backgroundColor: "#ecfeff",
                borderWidth: 1,
                borderColor: "#a5f3fc",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                gap: 4,
                opacity: transitionOpacity,
                transform: [{ translateX: transitionTranslateX }],
              }}
            >
              <MaterialIcons
                name={
                  yearTransition.direction === "next"
                    ? "arrow-forward"
                    : "arrow-back"
                }
                size={12}
                color="#0e7490"
              />
              <Text
                style={{
                  fontSize: 10,
                  fontWeight: "900",
                  color: "#155e75",
                }}
              >
                Year
              </Text>
            </Animated.View>
          ) : null}
        </View>
      </View>

      {/* ====================================================
          SECONDARY LABEL
      ==================================================== */}

      {!isHeaderCollapsed ? (
        <>
          <Text
            style={{
              marginTop: 4,

              fontSize: 16,

              color: "#6b7280",
            }}
          >
            {gregorianLabel}
          </Text>

          <View
            style={{
              marginTop: 10,
              flexDirection: "row",
              flexWrap: "wrap",
              alignItems: "center",
              gap: 8,
            }}
          >
            <Text
              style={{
                paddingHorizontal: 10,
                paddingVertical: 6,
                borderRadius: 999,
                backgroundColor: "#eef2ff",
                borderWidth: 1,
                borderColor: "#c7d2fe",
                fontSize: 12,
                fontWeight: "900",
                color: "#312e81",
              }}
            >
              {groupLabel}
            </Text>

            <Text
              style={{
                paddingHorizontal: 10,
                paddingVertical: 6,
                borderRadius: 999,
                backgroundColor: userRole === "admin" ? "#ecfdf5" : "#f8fafc",
                borderWidth: 1,
                borderColor: userRole === "admin" ? "#bbf7d0" : "#e2e8f0",
                fontSize: 12,
                fontWeight: "900",
                color: userRole === "admin" ? "#166534" : "#475569",
                textTransform: "capitalize",
              }}
            >
              {userRole}
            </Text>
          </View>
        </>
      ) : null}

      {/* ====================================================
          ACTIVE MONTH INFORMATION
      ==================================================== */}

      {month && !isHeaderCollapsed ? (
        <View
          style={{
            marginTop: 16,

            flexDirection: "row",

            alignItems: "center",

            gap: 12,
          }}
        >
          {/* Month Symbol/Icon */}

          {month.symbolImage && (
            <Image
              source={month.symbolImage}
              style={{
                width: 56,
                height: 56,
              }}
              resizeMode="contain"
            />
          )}

          {/* Month Metadata */}

          <View>
            {/* Primary Month Label */}

            <Text
              style={{
                fontSize: 22,
                fontWeight: "800",
              }}
            >
              Month {month.number}
            </Text>

            {/* Season Label */}

            <Text
              style={{
                marginTop: 2,

                fontSize: 14,

                color: "#6b7280",

                textTransform: "capitalize",
              }}
            >
              {month.season}
            </Text>

            <View
              style={{
                marginTop: 8,

                flexDirection: "row",
                flexWrap: "wrap",

                gap: 6,
              }}
            >
              {todayNode ? (
                <Pressable
                  onPress={onPressToday}
                  style={{
                    paddingHorizontal: 10,
                    paddingVertical: 6,

                    borderRadius: 999,

                    backgroundColor: todayNode.enoch?.events?.[0]
                      ? "#eff6ff"
                      : "#ffffff",

                    borderWidth: 1,
                    borderColor: todayNode.enoch?.events?.[0]
                      ? "#bfdbfe"
                      : "#e5e7eb",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 11,
                      fontWeight: "800",
                      color: "#374151",
                    }}
                  >
                    {`Today • M${todayNode.enoch?.month?.number ?? ""} D${
                      todayNode.enoch?.day ?? ""
                    }`}
                  </Text>

                  {todayNode.enoch?.events?.[0] ? (
                    <Text
                      style={{
                        marginTop: 2,

                        fontSize: 10,
                        fontWeight: "700",

                        color: todayNode.enoch.events[0].color ?? "#2563eb",
                      }}
                    >
                      {todayNode.enoch.events[0].englishName}
                    </Text>
                  ) : null}
                </Pressable>
              ) : null}

              {upcomingShabbatNode ? (
                <Pressable
                  onPress={onPressUpcomingShabbat}
                  style={{
                    paddingHorizontal: 10,
                    paddingVertical: 6,

                    borderRadius: 999,

                    backgroundColor: "#eef2ff",

                    borderWidth: 1,
                    borderColor: "#c7d2fe",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 11,
                      fontWeight: "800",
                      color: "#312e81",
                    }}
                  >
                    {`Shabbat • M${
                      upcomingShabbatNode.enoch?.month?.number ?? ""
                    } D${upcomingShabbatNode.enoch?.day ?? ""}`}
                  </Text>
                </Pressable>
              ) : null}
            </View>

            {/* Future Optional Metadata
                Hebrew / Paleo Hebrew / Babylonian names
            */}

            {/*
            <Text>{month.hebrew}</Text>
            <Text>{month.paleoHebrew}</Text>
            */}
          </View>
          <Pressable
            onPress={onChangeGroup}
            style={{
              position: "absolute",
              right: 24,
              bottom: 24,

              width: 42,
              height: 42,
              borderRadius: 21,

              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <MaterialIcons name="logout" size={28} color="#6b7280" />
          </Pressable>
        </View>
      ) : null}

      {isHeaderCollapsed && (todayNode || upcomingShabbatNode) ? (
        <View
          style={{
            marginTop: 10,
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 6,
          }}
        >
          {todayNode ? (
            <Pressable
              onPress={onPressToday}
              style={({ pressed }) => [
                {
                  paddingHorizontal: 9,
                  paddingVertical: 5,
                  borderRadius: 999,
                  backgroundColor: todayNode.enoch?.events?.[0]
                    ? "#eff6ff"
                    : "#ffffff",
                  borderWidth: 1,
                  borderColor: todayNode.enoch?.events?.[0]
                    ? "#bfdbfe"
                    : "#e5e7eb",
                },
                pressed && { opacity: 0.78 },
              ]}
            >
              <Text
                numberOfLines={1}
                style={{
                  fontSize: 11,
                  fontWeight: "800",
                  color: "#374151",
                }}
              >
                {`Today - M${todayNode.enoch?.month?.number ?? ""} D${
                  todayNode.enoch?.day ?? ""
                }`}
              </Text>
            </Pressable>
          ) : null}

          {upcomingShabbatNode ? (
            <Pressable
              onPress={onPressUpcomingShabbat}
              style={({ pressed }) => [
                {
                  paddingHorizontal: 9,
                  paddingVertical: 5,
                  borderRadius: 999,
                  backgroundColor: "#eef2ff",
                  borderWidth: 1,
                  borderColor: "#c7d2fe",
                },
                pressed && { opacity: 0.78 },
              ]}
            >
              <Text
                numberOfLines={1}
                style={{
                  fontSize: 11,
                  fontWeight: "800",
                  color: "#312e81",
                }}
              >
                {`Shabbat - M${
                  upcomingShabbatNode.enoch?.month?.number ?? ""
                } D${upcomingShabbatNode.enoch?.day ?? ""}`}
              </Text>
            </Pressable>
          ) : null}
        </View>
      ) : null}

      {isCompactHeader ? (
        <Pressable
          onPress={() => setIsMobileHeaderExpanded((value) => !value)}
          accessibilityRole="button"
          accessibilityLabel={
            isMobileHeaderExpanded
              ? "Collapse calendar header"
              : "Show full calendar header"
          }
          style={({ pressed }) => [
            {
              marginTop: 8,
              minHeight: 14,
              borderTopWidth: 1,
              borderTopColor: "#e2e8f0",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 3,
            },
            pressed && { opacity: 0.72 },
          ]}
        >
          <View
            style={{
              width: 34,
              height: 3,
              borderRadius: 999,
              backgroundColor: "#cbd5e1",
            }}
          />

          <MaterialIcons
            name={isMobileHeaderExpanded ? "expand-less" : "expand-more"}
            size={13}
            color="#94a3b8"
          />
        </Pressable>
      ) : null}
    </View>
  );
}
