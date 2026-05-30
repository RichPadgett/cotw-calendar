/*
 * File: app/index.tsx
 * Purpose: Main Expo Router screen for the Enoch calendar experience, including group entry, year navigation, day details, and admin access.
 * Author: rpadgett
 */

// External dependencies
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useRef, useState } from "react";
import {
  Linking,
  Modal,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";

// App components
import AdminDayContentForm from "../src/components/admin/AdminDayContentForm";
import MonthHeader from "../src/components/calendar/MonthHeader";
import YearView from "../src/components/calendar/YearView";
import YearWheelView from "../src/components/calendar/YearWheelView";
import WelcomeScreen from "../src/components/onboarding/WelcomeScreen";

// Calendar engine and models
import { buildEnochYear } from "../src/engine/buildEnochYear";
import { CalendarNode } from "../src/models/calendar";

// Shared app types
import type { PerpetualMarker } from "../src/types/perpetualMarkers";

// Calendar baseline and app configuration
const BASE_ENOCH_YEAR = 2026;
const BASE_START_DATE = "2026-03-18";

const STICKY_HEADER_OFFSET = 220;
const YEAR_VIEW_TOP_OFFSET = 685;
const GROUP_CODE_STORAGE_KEY = "groupCode";

const API_BASE_URL = "http://localhost:3001";

// API response shapes consumed by the day detail modal
type ScriptureReading = {
  label?: string;
  reference?: string;
  url?: string;
};

type DayContentItem = {
  label?: string;
  type?: string;
  url?: string;
  access?: string;
};

type DayContentSection = {
  title?: string;
  items?: DayContentItem[];
};

type DayContent = {
  title?: string;
  notes?: string;
  scriptureReadings?: ScriptureReading[];
  sections?: DayContentSection[];
};

// Date helpers
/**
 * Calculates the Gregorian start date for a requested Enoch year.
 * This date helper advances from the configured base year and accounts for sabbath-week year offsets.
 */
function getEnochYearStartDate(targetYear: number): string {
  let currentStartDate = BASE_START_DATE;

  for (let year = BASE_ENOCH_YEAR; year < targetYear; year++) {
    const completedYearNumber = year - BASE_ENOCH_YEAR + 1;
    const hasSabbathWeekAfterYear = completedYearNumber % 6 === 0;

    currentStartDate = addDays(
      currentStartDate,
      hasSabbathWeekAfterYear ? 371 : 364
    );
  }

  return currentStartDate;
}

/**
 * Adds calendar days to a YYYY-MM-DD string using UTC date math.
 * This keeps year-start calculations stable across local timezone boundaries.
 */
function addDays(dateString: string, days: number): string {
  const [year, month, day] = dateString.split("-").map(Number);

  const date = new Date(Date.UTC(year, month - 1, day));
  date.setUTCDate(date.getUTCDate() + days);

  const nextYear = date.getUTCFullYear();
  const nextMonth = String(date.getUTCMonth() + 1).padStart(2, "0");
  const nextDay = String(date.getUTCDate()).padStart(2, "0");

  return `${nextYear}-${nextMonth}-${nextDay}`;
}

/**
 * Creates the main calendar UX screen.
 * It coordinates group-code entry, year navigation, calendar rendering, day detail modals, and admin editing access.
 */
export default function HomeScreen() {
  // Scroll refs and layout measurements
  const scrollViewRef = useRef<ScrollView>(null);
  const monthOffsetsRef = useRef<Record<number, number>>({});

  // Calendar view state
  const [visibleEnochYear, setVisibleEnochYear] = useState(2026);
  const [activeMonthNumber, setActiveMonthNumber] = useState(1);
  const [isAdminMode, setIsAdminMode] = useState(false);

  // Group entry and group-specific content state
  const [hasEnteredApp, setHasEnteredApp] = useState(false);
  const [groupCode, setGroupCode] = useState("public");

  const [yearNotices, setYearNotices] = useState<any[]>([]);
  const [selectedNode, setSelectedNode] =
    useState<CalendarNode | null>(null);

  const [dayContent, setDayContent] =
    useState<DayContent | null>(null);

  // Global marker state
  const [perpetualMarkers, setPerpetualMarkers] = useState<PerpetualMarker[]>([]);
  const [perpetualMarkersChecksum, setPerpetualMarkersChecksum] =
    useState<string | null>(null);

  // Derived calendar data
  const config = {
    enochYear: visibleEnochYear,
    startsOnGregorianDate: getEnochYearStartDate(visibleEnochYear),
  };

  const nodes = buildEnochYear(config);

  const currentMonth = nodes.find(
    (node) => node.enoch?.month?.number === activeMonthNumber
  )?.enoch?.month;

  const selectedDayMarkers = selectedNode
    ? perpetualMarkers.filter((marker) => {
        const matchesMonthDay =
          typeof marker.month === "number" &&
          typeof marker.day === "number" &&
          marker.month === selectedNode.enoch?.month?.number &&
          marker.day === selectedNode.enoch?.day;

        const matchesGateDay =
          typeof marker.gateDay === "number" &&
          selectedNode.enoch?.isIntercalary === true &&
          selectedNode.enoch?.isSabbathWeek !== true &&
          marker.gateDay === selectedNode.enoch?.quarter;

        const matchesIntercalaryWeek =
          marker.intercalaryWeek === true &&
          selectedNode.enoch?.isSabbathWeek === true;

        return matchesMonthDay || matchesGateDay || matchesIntercalaryWeek;
      })
    : [];

  // Initial app entry state
  useEffect(() => {
    /**
     * Loads the last-used group code from device storage.
     * This entry helper skips the welcome screen when a saved group is available.
     */
    async function loadSavedGroupCode() {
      const savedGroupCode = await AsyncStorage.getItem(GROUP_CODE_STORAGE_KEY);

      if (savedGroupCode) {
        setGroupCode(savedGroupCode);
        setHasEnteredApp(true);
      }
    }

    loadSavedGroupCode();
  }, []);

  // Keep year badges in sync with the selected group.
  useEffect(() => {
    /**
     * Fetches the notice/content summary for the visible Enoch year.
     * This API loader powers day badges in the year grid for the active group.
     */
    async function loadYearNotices() {
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/calendar/${config.enochYear}/notices?groupCode=${encodeURIComponent(groupCode)}`
        );

        if (!response.ok) {
          setYearNotices([]);
          return;
        }

        const data = await response.json();
        setYearNotices(data);
      } catch (error) {
        console.log("Failed to load year notices", error);
        setYearNotices([]);
      }
    }

    loadYearNotices();
  }, [config.enochYear, groupCode]);

  // Perpetual markers are global calendar overlays; the checksum avoids reloading unchanged data.
  useEffect(() => {
    if (!hasEnteredApp) return;

    loadPerpetualMarkers();
  }, [hasEnteredApp, perpetualMarkersChecksum]);

  // Data loaders
  /**
   * Fetches global perpetual markers from the API when their checksum changes.
   * This data loader supports recurring marker overlays without repeatedly downloading unchanged data.
   */
  async function loadPerpetualMarkers() {
    try {
      const checksumResponse = await fetch(
        `${API_BASE_URL}/api/calendar/perpetual-markers/checksum`
      );

      if (!checksumResponse.ok) {
        throw new Error("Failed to fetch perpetual markers checksum");
      }

      const checksumData = await checksumResponse.json();
      const serverChecksum = checksumData.checksum;

      if (serverChecksum === perpetualMarkersChecksum) {
        return;
      }

      const markersResponse = await fetch(
        `${API_BASE_URL}/api/calendar/perpetual-markers`
      );

      if (!markersResponse.ok) {
        throw new Error("Failed to fetch perpetual markers");
      }

      const markers = await markersResponse.json();

      setPerpetualMarkers(markers);
      setPerpetualMarkersChecksum(serverChecksum);
    } catch (error) {
      console.log("Failed to load perpetual markers", error);
    }
  }

  // Onboarding gate
  if (!hasEnteredApp) {
    return (
      <WelcomeScreen
        groupCode={groupCode}
        setGroupCode={(value) =>
          setGroupCode(
            value.trim().toLowerCase() || "public"
          )
        }
        onContinue={async () => {
          const normalizedGroupCode =
            groupCode.trim().toLowerCase() || "public";

          await AsyncStorage.setItem(
            GROUP_CODE_STORAGE_KEY,
            normalizedGroupCode
          );

          setGroupCode(normalizedGroupCode);
          setHasEnteredApp(true);
        }}
      />
    );
  }

  // Day modal handlers
  /**
   * Opens the day detail modal and loads group-specific content for the selected calendar node.
   * This interaction handler connects calendar cell presses to the detail UX.
   */
  async function openDay(node: CalendarNode) {
    setSelectedNode(node);
    setDayContent(null);

    const year = node.enoch?.year;
    const month = node.enoch?.month?.number;
    const day = node.enoch?.day;

    if (!year || !month || !day) return;

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/calendar/${year}/${month}/${day}?groupCode=${encodeURIComponent(groupCode)}`
      );

      if (!response.ok) return;

      const data: DayContent = await response.json();
      setDayContent(data);
    } catch (error) {
      console.log("Failed to load day content", error);
    }
  }

  /**
   * Closes the day detail modal and clears its loaded content.
   * This interaction handler resets modal state after a user exits a day.
   */
  function closeDay() {
    setSelectedNode(null);
    setDayContent(null);
  }

  /**
   * Stores each rendered month's vertical offset inside the scroll view.
   * These layout measurements let wheel/month navigation scroll to the correct section.
   */
  function handleMonthLayout(monthNumber: number, y: number) {
    monthOffsetsRef.current[monthNumber] = y;
  }

  /**
   * Tracks scroll position and derives the currently active month.
   * This scroll handler keeps the sticky header aligned with the month in view.
   */
  function handleScroll(event: any) {
    const scrollY = event.nativeEvent.contentOffset.y;

    const activeMonth = Object.entries(monthOffsetsRef.current)
      .filter(([, y]) => y <= scrollY + 180)
      .sort((a, b) => b[1] - a[1])[0];

    if (activeMonth) {
      setActiveMonthNumber(Number(activeMonth[0]));
    }
  }

  /**
   * Scrolls the year view to a selected Enoch month.
   * This navigation helper is used by the wheel view to jump into the linear calendar.
   */
  function scrollToMonth(monthNumber: number) {
    const y = monthOffsetsRef.current[monthNumber];

    if (typeof y !== "number") return;

    scrollViewRef.current?.scrollTo({
      y: Math.max(
        0,
        y + YEAR_VIEW_TOP_OFFSET - STICKY_HEADER_OFFSET
      ),
      animated: true,
    });

    setActiveMonthNumber(monthNumber);
  }

  /**
   * Moves the calendar to the previous Enoch year and resets scroll/modal state.
   * This year navigation handler is triggered from the month header controls.
   */
  function goPreviousYear() {
    setVisibleEnochYear((year) => year - 1);
    setActiveMonthNumber(1);
    closeDay();
    scrollViewRef.current?.scrollTo({ y: 0, animated: true });
  }

  /**
   * Moves the calendar to the next Enoch year and resets scroll/modal state.
   * This year navigation handler is triggered from the month header controls.
   */
  function goNextYear() {
    setVisibleEnochYear((year) => year + 1);
    setActiveMonthNumber(1);
    closeDay();
    scrollViewRef.current?.scrollTo({ y: 0, animated: true });
  }

  /**
   * Opens the previous day while staying inside the day detail modal.
   * This modal navigation handler walks backward through the generated year nodes.
   */
  function goToPreviousDay() {
    if (!selectedNode) return;

    const currentIndex = nodes.findIndex(
      (node) => node.id === selectedNode.id
    );

    const previousNode = nodes[currentIndex - 1];

    if (previousNode) {
      openDay(previousNode);
    }
  }

  /**
   * Opens the next day while staying inside the day detail modal.
   * This modal navigation handler walks forward through the generated year nodes.
   */
  function goToNextDay() {
    if (!selectedNode) return;

    const currentIndex = nodes.findIndex(
      (node) => node.id === selectedNode.id
    );

    const nextNode = nodes[currentIndex + 1];

    if (nextNode) {
      openDay(nextNode);
    }
  }

  /**
   * Opens an external URL from scripture readings or section items.
   * This link helper delegates to React Native Linking for platform-specific handling.
   */
  function openUrl(url?: string) {
    if (!url) return;
    Linking.openURL(url);
  }

  // Modal display labels
  const modalTitle =
    dayContent?.title ??
    selectedNode?.enoch?.label ??
    `Day ${selectedNode?.enoch?.day ?? ""}`;

  const modalDateLabel = selectedNode?.enoch?.month?.number
    ? `Month ${selectedNode.enoch.month.number} • ${selectedNode.gregorianDate ?? ""
    }`
    : selectedNode?.gregorianDate ?? "";

  const todayNode = nodes.find((node) => {
    const today = new Date();

    const todayId = `${today.getFullYear()}-${String(
      today.getMonth() + 1
    ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

    return node.gregorianDate === todayId;
  });

  // Main calendar and day detail modal
  return (
    <>
      <ScrollView
        ref={scrollViewRef}
        stickyHeaderIndices={[0]}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        style={{
          flex: 1,
          backgroundColor: "#ffffff",
        }}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingTop: 56,
          paddingBottom: 24,
        }}
      >
        <View
          style={{
            backgroundColor: "#ffffff",
            paddingBottom: 12,
          }}
        >
          <MonthHeader
            month={currentMonth}
            todayNode={todayNode}
            gregorianLabel={`${config.enochYear} · Starts ${config.startsOnGregorianDate}`}
            onPreviousMonth={goPreviousYear}
            onNextMonth={goNextYear}
          />

        </View>

        <YearWheelView
          nodes={nodes}
          onPressMonth={scrollToMonth}
          onPressDay={openDay}
        />

        <YearView
          nodes={nodes}
          notices={yearNotices}
          perpetualMarkers={perpetualMarkers}
          onMonthLayout={handleMonthLayout}
          onPressDay={openDay}
        />
      </ScrollView>

      <Modal
        visible={Boolean(selectedNode)} animationType="slide" transparent>
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.35)",
            justifyContent: "flex-end",
          }}
        >
          <View
            style={{
              backgroundColor: "#ffffff",
              borderTopLeftRadius: 24,
              borderTopRightRadius: 24,
              height: "85%",
              overflow: "hidden",
            }}
          >
            <ScrollView
              style={{ flex: 1 }}
              contentContainerStyle={{
                padding: 24,
                paddingBottom: 24,
              }}
            >
              <Pressable
                onPress={closeDay}
                style={{
                  alignSelf: "flex-end",
                  padding: 12,
                }}
              >
                <Text style={{ fontSize: 18, fontWeight: "700" }}>
                  Close
                </Text>
              </Pressable>
              <Pressable
                onPress={() => setIsAdminMode((value) => !value)}
                style={{
                  alignSelf: "flex-end",
                  padding: 12,
                }}>
                <Text style={{ fontSize: 13, fontWeight: "800", color: "#2563eb" }}>
                  {isAdminMode ? "Exit Admin" : "Admin Mode"}
                </Text>
              </Pressable>

              <Text style={{ fontSize: 32, fontWeight: "800" }}>
                {modalTitle}
              </Text>

              <Text
                style={{
                  marginTop: 8,
                  fontSize: 18,
                  color: "#6b7280",
                }}
              >
                {modalDateLabel}
              </Text>

              {selectedNode?.enoch?.events?.map((event) => (
                <View
                  key={event.id}
                  style={{
                    marginTop: 12,
                    padding: 10,
                    borderRadius: 12,
                    backgroundColor: event.color ?? "#2563eb",
                  }}
                >
                  <Text style={{ color: "white", fontWeight: "800" }}>
                    {event.englishName}
                  </Text>
                </View>
              ))}
              {selectedDayMarkers.map((marker) => (
                <View
                  key={marker.id}
                  style={{
                    marginTop: 12,
                    padding: 10,
                    borderRadius: 12,
                    backgroundColor: marker.color,
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontWeight: "800",
                    }}
                  >
                    {marker.title}
                  </Text>
                </View>
              ))}

              {selectedNode?.enoch?.month?.number &&
                selectedNode?.enoch?.day && (
                  <View
                    style={{
                      marginTop: 24,
                      paddingTop: 20,
                      borderTopWidth: 1,
                      borderTopColor: "#e5e7eb",
                    }}
                  >

                    {isAdminMode &&
                      selectedNode?.enoch?.month?.number &&
                      selectedNode?.enoch?.day && (
                        <AdminDayContentForm
                          enochYear={selectedNode.enoch.year}
                          month={selectedNode.enoch.month.number}
                          day={selectedNode.enoch.day}
                        />)}

                  </View>
                )}

              {dayContent?.notes ? (
                <View
                  style={{
                    marginTop: 24,
                    padding: 14,
                    borderRadius: 14,
                    backgroundColor: "#f3f4f6",
                  }}
                >

                  <Text style={{ fontWeight: "800", marginBottom: 6 }}>
                    Notes
                  </Text>

                  <Text style={{ fontSize: 14, color: "#374151" }}>
                    {String(dayContent.notes)}
                  </Text>
                </View>
              ) : null}

              {Array.isArray(dayContent?.scriptureReadings) &&
                dayContent.scriptureReadings.length > 0 ? (
                <Text
                  style={{
                    marginTop: 24,
                    marginBottom: 10,
                    fontSize: 20,
                    fontWeight: "800",
                  }}
                >
                  Scripture Readings
                </Text>
              ) : null}

              {Array.isArray(dayContent?.scriptureReadings) &&
                dayContent.scriptureReadings.map((reading, index) => (
                  <View
                    key={`reading-${index}`}
                    style={{
                      backgroundColor: "white",
                      borderRadius: 12,
                      padding: 12,
                      marginBottom: 10,
                      borderLeftWidth: 4,
                      borderLeftColor: "#2563eb",
                      borderWidth: 1,
                      borderColor: "#e5e7eb",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "700",
                        color: "#111827",
                      }}
                    >
                      {String(reading.label ?? "Scripture")}
                    </Text>

                    <Text
                      style={{
                        marginTop: 2,
                        fontSize: 13,
                        color: "#6b7280",
                      }}
                    >
                      {String(reading.reference ?? "")}
                    </Text>

                    {reading.url ? (
                      <Pressable
                        onPress={() => openUrl(reading.url)}
                        style={{ marginTop: 8 }}
                      >
                        <Text
                          style={{
                            fontSize: 12,
                            fontWeight: "700",
                            color: "#2563eb",
                          }}
                        >
                          Open Scripture
                        </Text>
                      </Pressable>
                    ) : null}
                  </View>
                ))}

              {Array.isArray(dayContent?.sections) &&
                dayContent.sections.map((section, sectionIndex) => (
                  <View key={`section-${sectionIndex}`}>
                    <Text
                      style={{
                        marginTop: 24,
                        marginBottom: 10,
                        fontSize: 20,
                        fontWeight: "800",
                      }}
                    >
                      {String(section.title ?? "Section")}
                    </Text>

                    {Array.isArray(section.items) &&
                      section.items.map((item, itemIndex) => (
                        <View
                          key={`item-${sectionIndex}-${itemIndex}`}
                          style={{
                            backgroundColor: "#f9fafb",
                            borderRadius: 12,
                            padding: 12,
                            marginBottom: 10,
                            borderWidth: 1,
                            borderColor: "#e5e7eb",
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 15,
                              fontWeight: "800",
                            }}
                          >
                            {String(item.label ?? "Untitled")}
                          </Text>

                          <Text
                            style={{
                              marginTop: 4,
                              fontSize: 12,
                              color: "#6b7280",
                              textTransform: "uppercase",
                            }}
                          >
                            {String(
                              `${item.type ?? "link"} • ${item.access ?? "public"
                              }`
                            )}
                          </Text>

                          {item.url ? (
                            <Pressable
                              onPress={() => openUrl(item.url)}
                              style={{ marginTop: 10 }}
                            >
                              <Text
                                style={{
                                  fontSize: 12,
                                  fontWeight: "700",
                                  color: "#2563eb",
                                }}
                              >
                                Open
                              </Text>
                            </Pressable>
                          ) : null}
                        </View>
                      ))}
                  </View>
                ))}
            </ScrollView>

            <View
              style={{
                paddingVertical: 14,
                paddingHorizontal: 24,
                borderTopWidth: 1,
                borderTopColor: "#e5e7eb",
                flexDirection: "row",
                justifyContent: "space-between",
                backgroundColor: "#ffffff",
              }}
            >
              <Pressable onPress={goToPreviousDay}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "700",
                    color: "#2563eb",
                  }}
                >
                  Previous
                </Text>
              </Pressable>

              <Pressable onPress={goToNextDay}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "700",
                    color: "#2563eb",
                  }}
                >
                  Next
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}
