/*
 * File: app/index.tsx
 * Purpose: Main Expo Router screen for the Enoch calendar experience.
 */

import { useEffect, useRef, useState } from "react";
import { Alert, Platform, ScrollView, Text, View } from "react-native";

import AppHeader from "../src/components/calendar/AppHeader";
import DayDetailModal from "../src/components/calendar/DayDetailModal";
import YearView from "../src/components/calendar/YearView";
import YearWheelView from "../src/components/calendar/YearWheelView";
import WelcomeScreen from "../src/components/onboarding/WelcomeScreen";

import { buildEnochYear } from "../src/engine/buildEnochYear";
import { getEnochYearStartDate } from "../src/engine/enochYear";
import { useGroupSession } from "../src/hooks/useGroupSession";
import { CalendarNode } from "../src/models/calendar";

import type { DayContent } from "../src/types/calendarContent";
import type { PerpetualMarker } from "../src/types/perpetualMarkers";
import { API_BASE_URL } from "../src/config/api";

const STICKY_HEADER_OFFSET = 220;
const YEAR_VIEW_TOP_OFFSET = 685;

export default function HomeScreen() {
  const scrollViewRef = useRef<ScrollView>(null);
  const monthOffsetsRef = useRef<Record<number, number>>({});

  const [visibleEnochYear, setVisibleEnochYear] = useState(2026);
  const [activeMonthNumber, setActiveMonthNumber] = useState(1);

  const [yearNotices, setYearNotices] = useState<any[]>([]);
  const [selectedNode, setSelectedNode] = useState<CalendarNode | null>(null);
  const [dayContent, setDayContent] = useState<DayContent | null>(null);

  const [perpetualMarkers, setPerpetualMarkers] = useState<PerpetualMarker[]>(
    []
  );
  const [perpetualMarkersChecksum, setPerpetualMarkersChecksum] = useState<
    string | null
  >(null);

  const [isAdminMode, setIsAdminMode] = useState(false);

  const {
    groupCode,
    setGroupCode,
    adminCode,
    setAdminCode,
    userRole,
    hasEnteredApp,
    hasLoadedGroupCode,
    welcomeError,
    joinGroup,
    changeGroup,
    adminToken,
  } = useGroupSession();

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

  /**
   * Saves the complete perpetual marker collection through the protected admin API.
   * The server endpoint overwrites the marker file, so callers must send the full next array.
   */
  async function savePerpetualMarkers(nextMarkers: PerpetualMarker[]) {
    const response = await fetch(
      `${API_BASE_URL}/api/calendar/perpetual-markers`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify(nextMarkers),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to save perpetual markers.");
    }

    const savedMarkers: PerpetualMarker[] = await response.json();

    setPerpetualMarkers(savedMarkers);
    setPerpetualMarkersChecksum(null);
  }

  function confirmChangeGroup() {
    if (Platform.OS === "web" && typeof window.confirm === "function") {
      const confirmed = window.confirm(
        "Change Group?\n\nYou will return to the welcome screen and choose a different group."
      );

      if (confirmed) {
        void changeGroup();
      }

      return;
    }

    Alert.alert(
      "Change Group?",
      "You will return to the welcome screen and choose a different group.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Change Group",
          style: "destructive",
          onPress: () => {
            void changeGroup();
          },
        },
      ]
    );
  }

  useEffect(() => {
    async function loadYearNotices() {
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/calendar/${
            config.enochYear
          }/notices?groupCode=${encodeURIComponent(groupCode)}`
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

    if (hasEnteredApp) {
      loadYearNotices();
    }
  }, [config.enochYear, groupCode, hasEnteredApp]);

  useEffect(() => {
    if (!hasEnteredApp) return;

    loadPerpetualMarkers();
  }, [hasEnteredApp, perpetualMarkersChecksum]);

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

  if (!hasLoadedGroupCode) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#ffffff",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: "800" }}>
          Loading Calendar...
        </Text>
      </View>
    );
  }

  if (!hasEnteredApp) {
    return (
      <WelcomeScreen
        groupCode={groupCode}
        setGroupCode={setGroupCode}
        adminCode={adminCode}
        setAdminCode={setAdminCode}
        welcomeError={welcomeError}
        onContinue={joinGroup}
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
        `${API_BASE_URL}/api/calendar/${year}/${month}/${day}?groupCode=${encodeURIComponent(
          groupCode
        )}`
      );

      if (!response.ok) return;

      const data: DayContent = await response.json();
      setDayContent(data);
    } catch (error) {
      console.log("Failed to load day content", error);
    }
  }

  function getSelectedDayParts() {
    const year = selectedNode?.enoch?.year;
    const month = selectedNode?.enoch?.month?.number;
    const day = selectedNode?.enoch?.day;

    if (!year || !month || !day) return null;

    return { year, month, day };
  }

  async function deleteDayNotes() {
    const selectedDay = getSelectedDayParts();

    if (!selectedDay) return;

    const response = await fetch(
      `${API_BASE_URL}/api/admin/calendar/${selectedDay.year}/${selectedDay.month}/${selectedDay.day}/notes?groupCode=${encodeURIComponent(
        groupCode
      )}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to delete day notes.");
    }

    const savedContent: DayContent = await response.json();
    setDayContent(savedContent);
  }

  async function deleteScriptureReading(index: number) {
    const selectedDay = getSelectedDayParts();

    if (!selectedDay) return;

    const response = await fetch(
      `${API_BASE_URL}/api/admin/calendar/${selectedDay.year}/${selectedDay.month}/${selectedDay.day}/scripture-readings/${index}?groupCode=${encodeURIComponent(
        groupCode
      )}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to delete scripture reading.");
    }

    const savedContent: DayContent = await response.json();
    setDayContent(savedContent);
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
      y: Math.max(0, y + YEAR_VIEW_TOP_OFFSET - STICKY_HEADER_OFFSET),
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

    const currentIndex = nodes.findIndex((node) => node.id === selectedNode.id);
    const previousNode = nodes[currentIndex - 1];

    if (previousNode) {
      openDay(previousNode);
    }
  }

  function goToNextDay() {
    if (!selectedNode) return;

    const currentIndex = nodes.findIndex((node) => node.id === selectedNode.id);
    const nextNode = nodes[currentIndex + 1];

    if (nextNode) {
      openDay(nextNode);
    }
  }

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
          <AppHeader
            month={currentMonth}
            todayNode={todayNode}
            gregorianLabel={`${config.enochYear} · Starts ${config.startsOnGregorianDate}`}
            onPreviousMonth={goPreviousYear}
            onNextMonth={goNextYear}
            onChangeGroup={confirmChangeGroup}
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

      <DayDetailModal
        visible={Boolean(selectedNode)}
        selectedNode={selectedNode}
        dayContent={dayContent}
        perpetualMarkers={perpetualMarkers}
        selectedDayMarkers={selectedDayMarkers}
        isAdminMode={isAdminMode}
        groupCode={groupCode}
        userRole={userRole}
        onClose={closeDay}
        onToggleAdminMode={() => setIsAdminMode((value) => !value)}
        onPreviousDay={goToPreviousDay}
        onNextDay={goToNextDay}
        onDeleteDayNotes={deleteDayNotes}
        onDeleteScriptureReading={deleteScriptureReading}
        onSavePerpetualMarkers={savePerpetualMarkers}
        adminToken={adminToken}
      />
    </>
  );
}
