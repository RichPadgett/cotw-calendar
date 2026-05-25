// app/index.tsx

import { useRef, useState } from "react";
import { Modal, Pressable, ScrollView, Text, View } from "react-native";

import MonthHeader from "../src/components/calendar/MonthHeader";
import YearView from "../src/components/calendar/YearView";
import YearWheelView from "../src/components/calendar/YearWheelView";

import { buildEnochYear } from "../src/engine/buildEnochYear";
import { CalendarNode } from "../src/models/calendar";

const BASE_ENOCH_YEAR = 2026;
const BASE_START_DATE = "2026-03-18";

const STICKY_HEADER_OFFSET = 220;
const YEAR_VIEW_TOP_OFFSET = 685;

function addDays(dateString: string, days: number): string {
  const date = new Date(`${dateString}T00:00:00`);
  date.setDate(date.getDate() + days);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export default function HomeScreen() {
  const scrollViewRef = useRef<ScrollView>(null);
  const monthOffsetsRef = useRef<Record<number, number>>({});

  const [visibleEnochYear, setVisibleEnochYear] = useState(2026);
  const [activeMonthNumber, setActiveMonthNumber] = useState(1);
  const [selectedNode, setSelectedNode] = useState<CalendarNode | null>(null);
  const [dayContent, setDayContent] = useState<any>(null);

  const yearOffset = visibleEnochYear - BASE_ENOCH_YEAR;

  const config = {
    enochYear: visibleEnochYear,
    startsOnGregorianDate: addDays(BASE_START_DATE, yearOffset * 364),
  };

  const nodes = buildEnochYear(config);

  const currentMonth = nodes.find(
    (node) => node.enoch?.month?.number === activeMonthNumber
  )?.enoch?.month;

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

      const data = await response.json();
      setDayContent(data);
    } catch (error) {
      console.log("Failed to load day content", error);
    }
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
      y: Math.max(0, y + YEAR_VIEW_TOP_OFFSET - STICKY_HEADER_OFFSET),
      animated: true,
    });

    setActiveMonthNumber(monthNumber);
  }

  function goPreviousYear() {
    setVisibleEnochYear((year) => year - 1);
    setActiveMonthNumber(1);
    setSelectedNode(null);
    setDayContent(null);
    scrollViewRef.current?.scrollTo({ y: 0, animated: true });
  }

  function goNextYear() {
    setVisibleEnochYear((year) => year + 1);
    setActiveMonthNumber(1);
    setSelectedNode(null);
    setDayContent(null);
    scrollViewRef.current?.scrollTo({ y: 0, animated: true });
  }

  function closeDay() {
    setSelectedNode(null);
    setDayContent(null);
  }

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
            gregorianLabel={`Enoch Year ${config.enochYear} · Starts ${config.startsOnGregorianDate}`}
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
        />
      </ScrollView>

      <Modal
        visible={Boolean(selectedNode)}
        animationType="slide"
        transparent={true}
      >
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
              padding: 24,
              borderTopLeftRadius: 24,
              borderTopRightRadius: 24,
              minHeight: "70%",
            }}
          >
            <Pressable
              onPress={closeDay}
              style={{
                alignSelf: "flex-end",
                padding: 12,
              }}
            >
              <Text style={{ fontSize: 18, fontWeight: "700" }}>Close</Text>
            </Pressable>

            <Text style={{ fontSize: 32, fontWeight: "800" }}>
              Day {selectedNode?.enoch?.day}
            </Text>

            <Text
              style={{
                marginTop: 8,
                fontSize: 18,
                color: "#6b7280",
              }}
            >
              Month {selectedNode?.enoch?.month?.number}
            </Text>

            <Text
              style={{
                marginTop: 8,
                fontSize: 16,
                color: "#6b7280",
              }}
            >
              {selectedNode?.gregorianDate}
            </Text>

            {selectedNode?.enoch?.events?.map((event) => (
              <View
                key={event.id}
                style={{
                  marginTop: 16,
                  padding: 12,
                  borderRadius: 12,
                  backgroundColor: event.color,
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontWeight: "800",
                  }}
                >
                  {event.englishName}
                </Text>
              </View>
            ))}

            {dayContent?.scriptureReadings?.map((reading: any) => (
              <View
                key={reading.reference}
                style={{
                  marginTop: 16,
                  padding: 12,
                  borderRadius: 12,
                  backgroundColor: "#f3f4f6",
                }}
              >
                <Text style={{ fontWeight: "800" }}>{reading.label}</Text>
                <Text style={{ marginTop: 4, color: "#4b5563" }}>
                  {reading.reference}
                </Text>
              </View>
            ))}

            {dayContent?.notes && (
              <Text
                style={{
                  marginTop: 16,
                  fontSize: 14,
                  color: "#374151",
                }}
              >
                {dayContent.notes}
              </Text>
            )}
          </View>
        </View>
      </Modal>
    </>
  );
}