// app/index.tsx

import { useEffect, useRef, useState } from "react";
import {
  Linking,
  Modal,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";

import AdminDayContentForm from "../src/components/admin/AdminDayContentForm";
import MonthHeader from "../src/components/calendar/MonthHeader";
import YearView from "../src/components/calendar/YearView";
import YearWheelView from "../src/components/calendar/YearWheelView";

import { buildEnochYear } from "../src/engine/buildEnochYear";
import { CalendarNode } from "../src/models/calendar";

import WelcomeScreen from "../src/components/onboarding/WelcomeScreen";

const BASE_ENOCH_YEAR = 2026;
const BASE_START_DATE = "2026-03-18";

const STICKY_HEADER_OFFSET = 220;
const YEAR_VIEW_TOP_OFFSET = 685;



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

function addDays(dateString: string, days: number): string {
  const [year, month, day] = dateString.split("-").map(Number);

  const date = new Date(Date.UTC(year, month - 1, day));
  date.setUTCDate(date.getUTCDate() + days);

  const nextYear = date.getUTCFullYear();
  const nextMonth = String(date.getUTCMonth() + 1).padStart(2, "0");
  const nextDay = String(date.getUTCDate()).padStart(2, "0");

  return `${nextYear}-${nextMonth}-${nextDay}`;
}

export default function HomeScreen() {
  const scrollViewRef = useRef<ScrollView>(null);
  const monthOffsetsRef = useRef<Record<number, number>>({});

  const [visibleEnochYear, setVisibleEnochYear] = useState(2026);
  const [activeMonthNumber, setActiveMonthNumber] = useState(1);
  const [isAdminMode, setIsAdminMode] = useState(false);

  const [hasEnteredApp, setHasEnteredApp] = useState(false);
  const [groupCode, setGroupCode] = useState("public");

  const [yearNotices, setYearNotices] = useState<any[]>([]);
  const [selectedNode, setSelectedNode] =
    useState<CalendarNode | null>(null);

  const [dayContent, setDayContent] =
    useState<DayContent | null>(null);

  const yearOffset = visibleEnochYear - BASE_ENOCH_YEAR;

  const config = {
    enochYear: visibleEnochYear,
    startsOnGregorianDate: getEnochYearStartDate(visibleEnochYear),
  };

  useEffect(() => {
    async function loadYearNotices() {
      try {
        const response = await fetch(
          `http://localhost:3001/api/calendar/${config.enochYear}/notices?groupCode=${groupCode}`
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

  const nodes = buildEnochYear(config);

  const currentMonth = nodes.find(
    (node) => node.enoch?.month?.number === activeMonthNumber
  )?.enoch?.month;

  if (!hasEnteredApp) {
  return (
    <WelcomeScreen
      groupCode={groupCode}
      setGroupCode={(value) =>
        setGroupCode(
          value.trim().toLowerCase() || "public"
        )
      }
      onContinue={() => setHasEnteredApp(true)}
    />
  );
}

  async function openDay(node: CalendarNode) {
    setSelectedNode(node);
    setDayContent(null);

    const year = node.enoch?.year;
    const month = node.enoch?.month?.number;
    const day = node.enoch?.day;

    if (!year || !month || !day) return;

    try {
      const response = await fetch(
        `http://localhost:3001/api/calendar/${year}/${month}/${day}`
      );

      if (!response.ok) return;

      const data: DayContent = await response.json();
      setDayContent(data);
    } catch (error) {
      console.log("Failed to load day content", error);
    }
  }

  function closeDay() {
    setSelectedNode(null);
    setDayContent(null);
  }

  function handleMonthLayout(monthNumber: number, y: number) {
    monthOffsetsRef.current[monthNumber] = y;
  }

  function handleScroll(event: any) {
    const scrollY = event.nativeEvent.contentOffset.y;

    const activeMonth = Object.entries(monthOffsetsRef.current)
      .filter(([, y]) => y <= scrollY + 180)
      .sort((a, b) => b[1] - a[1])[0];

    if (activeMonth) {
      setActiveMonthNumber(Number(activeMonth[0]));
    }
  }

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

  function goPreviousYear() {
    setVisibleEnochYear((year) => year - 1);
    setActiveMonthNumber(1);
    closeDay();
    scrollViewRef.current?.scrollTo({ y: 0, animated: true });
  }

  function goNextYear() {
    setVisibleEnochYear((year) => year + 1);
    setActiveMonthNumber(1);
    closeDay();
    scrollViewRef.current?.scrollTo({ y: 0, animated: true });
  }

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

  function openUrl(url?: string) {
    if (!url) return;
    Linking.openURL(url);
  }

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
          onMonthLayout={handleMonthLayout}
          onPressDay={openDay}
          notices={yearNotices}
        />
      </ScrollView>

      <Modal visible={Boolean(selectedNode)} animationType="slide" transparent>
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