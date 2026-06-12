/*
 * File: app/index.tsx
 * Purpose: Main Expo Router screen for the Enoch calendar experience.
 */

import { useEffect, useRef, useState } from "react";
import {
  Alert,
  Image,
  ImageSourcePropType,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from "react-native";

import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import AppHeader from "../src/components/calendar/AppHeader";
import DayDetailModal from "../src/components/calendar/DayDetailModal";
import HistoryTimelineView from "../src/components/calendar/HistoryTimelineView";
import YearView from "../src/components/calendar/YearView";
import YearWheelView from "../src/components/calendar/YearWheelView";
import CommandExplorerView, {
  type BibleVersion,
  type CommandHeaderCommand,
  type CommandNavigationState,
} from "../src/components/commands/CommandExplorerView";
import WelcomeScreen from "../src/components/onboarding/WelcomeScreen";

import { buildEnochYear } from "../src/engine/buildEnochYear";
import { getEnochYearStartDate } from "../src/engine/enochYear";
import { useGroupSession } from "../src/hooks/useGroupSession";
import { CalendarNode } from "../src/models/calendar";

import type { DayContent } from "../src/types/calendarContent";
import type { PerpetualMarker } from "../src/types/perpetualMarkers";
import { API_BASE_URL } from "../src/config/api";
import { formatGroupLabel, getAppDateId } from "../src/utils/appDay";

const DEFAULT_STICKY_HEADER_OFFSET = 220;
const DEFAULT_YEAR_VIEW_TOP_OFFSET = 685;
const MONTH_TITLE_BEHIND_HEADER_OFFSET = 32;
const COMMAND_CONTRIBUTOR_USERNAME_STORAGE_KEY =
  "commandContributorUsername";

type AppTab = "calendar" | "timeline" | "commands";
const BIBLE_VERSIONS: BibleVersion[] = [
  "KJV",
  "NKJV",
  "NLT",
  "NIV",
  "ESV",
  "CSB",
  "YLT",
  "BES",
];

export default function HomeScreen() {
  const { height: viewportHeight } = useWindowDimensions();
  const scrollViewRef = useRef<ScrollView>(null);
  const monthOffsetsRef = useRef<Record<number, number>>({});
  const currentScrollYRef = useRef(0);
  const headerHeightRef = useRef(DEFAULT_STICKY_HEADER_OFFSET);
  const yearViewTopOffsetRef = useRef(DEFAULT_YEAR_VIEW_TOP_OFFSET);

  const [visibleEnochYear, setVisibleEnochYear] = useState(2026);
  const [activeMonthNumber, setActiveMonthNumber] = useState<number | null>(
    null
  );
  const [todayDateId, setTodayDateId] = useState(getAppDateId);
  const [yearTransition, setYearTransition] = useState<{
    direction: "previous" | "next";
    id: number;
  } | null>(null);
  const [isWheelInteracting, setIsWheelInteracting] = useState(false);
  const [activeTab, setActiveTab] = useState<AppTab>("calendar");
  const [selectedCommandHeader, setSelectedCommandHeader] =
    useState<CommandHeaderCommand | null>(null);
  const [commandNavigation, setCommandNavigation] =
    useState<CommandNavigationState | null>(null);
  const [selectedBibleVersion, setSelectedBibleVersion] =
    useState<BibleVersion>("KJV");
  const [commandSearchText, setCommandSearchText] = useState("");
  const [commandContributorUsername, setCommandContributorUsername] =
    useState("");
  const [commandRandomRequestId, setCommandRandomRequestId] = useState(0);
  const [commandPendingRequestId, setCommandPendingRequestId] = useState(0);
  const [commandResourceStats, setCommandResourceStats] = useState({
    categoryCount: 0,
    commandCount: 0,
    isSelectingRandom: false,
    isSelectingPending: false,
  });

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
  const groupLabel = formatGroupLabel(groupCode);
  const todayNode = nodes.find((node) => {
    return node.gregorianDate === todayDateId;
  });
  const fallbackMonthNumber = todayNode?.enoch?.month?.number ?? 1;
  const currentMonthNumber = activeMonthNumber ?? fallbackMonthNumber;

  const currentMonth = nodes.find(
    (node) => node.enoch?.month?.number === currentMonthNumber
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

  /**
   * Loads the year-level notice index used by calendar badges.
   * This API helper keeps the grid badges in sync when day notices change.
   */
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

  useEffect(() => {
    if (hasEnteredApp) {
      loadYearNotices();
    }
  }, [config.enochYear, groupCode, hasEnteredApp]);

  useEffect(() => {
    async function loadSavedContributorUsername() {
      const savedUsername = await AsyncStorage.getItem(
        COMMAND_CONTRIBUTOR_USERNAME_STORAGE_KEY
      );

      if (savedUsername) {
        setCommandContributorUsername(normalizeContributorUsername(savedUsername));
      }
    }

    loadSavedContributorUsername();
  }, []);

  useEffect(() => {
    const normalizedUsername = normalizeContributorUsername(
      commandContributorUsername
    );

    if (normalizedUsername) {
      AsyncStorage.setItem(
        COMMAND_CONTRIBUTOR_USERNAME_STORAGE_KEY,
        normalizedUsername
      );
      return;
    }

    AsyncStorage.removeItem(COMMAND_CONTRIBUTOR_USERNAME_STORAGE_KEY);
  }, [commandContributorUsername]);

  useEffect(() => {
    if (!hasEnteredApp) return;

    loadPerpetualMarkers();
  }, [hasEnteredApp, perpetualMarkersChecksum]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTodayDateId(getAppDateId());
    }, 60_000);

    return () => clearInterval(intervalId);
  }, []);

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

  /**
   * Deletes one notice item from the selected day through the protected admin API.
   * Notice deletes are independent from notes and scripture readings, then the year badge index is reloaded.
   */
  async function deleteNotice(index: number) {
    const selectedDay = getSelectedDayParts();

    if (!selectedDay) return;

    const response = await fetch(
      `${API_BASE_URL}/api/admin/calendar/${selectedDay.year}/${selectedDay.month}/${selectedDay.day}/notices/${index}?groupCode=${encodeURIComponent(
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
      throw new Error("Failed to delete notice.");
    }

    const savedContent: DayContent = await response.json();
    setDayContent(savedContent);
    await loadYearNotices();
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

  function handleHeaderLayout(height: number) {
    headerHeightRef.current = height;
  }

  function handleYearViewLayout(y: number) {
    yearViewTopOffsetRef.current = y;
  }

  function getMonthHeaderScrollOffset() {
    return (
      yearViewTopOffsetRef.current -
      headerHeightRef.current +
      MONTH_TITLE_BEHIND_HEADER_OFFSET
    );
  }

  function handleScroll(event: any) {
    if (activeTab !== "calendar") return;

    const scrollY = event.nativeEvent.contentOffset.y;
    currentScrollYRef.current = scrollY;

    if (activeTab !== "calendar") return;

    const headerEdgeY = scrollY - getMonthHeaderScrollOffset();

    const activeMonth = Object.entries(monthOffsetsRef.current)
      .filter(([, y]) => y <= headerEdgeY)
      .sort((a, b) => b[1] - a[1])[0];

    if (activeMonth) {
      setActiveMonthNumber(Number(activeMonth[0]));
      return;
    }

    setActiveMonthNumber(null);
  }

  function scrollToMonth(monthNumber: number) {
    const y = monthOffsetsRef.current[monthNumber];

    if (typeof y !== "number") return;

    scrollViewRef.current?.scrollTo({
      y: Math.max(0, y + getMonthHeaderScrollOffset()),
      animated: true,
    });

    setActiveMonthNumber(monthNumber);
  }

  function centerMobileSelectedCommand({
    pageY,
    height,
  }: {
    pageY: number;
    height: number;
  }) {
    scrollViewRef.current?.scrollTo({
      y: Math.max(0, currentScrollYRef.current + pageY - viewportHeight / 2 + height / 2),
      animated: true,
    });
  }

  function handleCommandResourceStatsChange(stats: {
    categoryCount: number;
    commandCount: number;
    isSelectingRandom: boolean;
    isSelectingPending: boolean;
  }) {
    setCommandResourceStats((current) => {
      if (
        current.categoryCount === stats.categoryCount &&
        current.commandCount === stats.commandCount &&
        current.isSelectingRandom === stats.isSelectingRandom &&
        current.isSelectingPending === stats.isSelectingPending
      ) {
        return current;
      }

      return stats;
    });
  }

  function showCommandContributionHelp() {
    const message =
      "Command Study can be improved by Church of the Word contributors. You can add new study data, suggest edits to existing information, or suggest that an item be removed. Contributions are saved for review before they become part of the command study resources.\n\nRequirements describe what must be true, available, or in place to properly obey a command.\n\nStudy Notes add Torah context, cross-reference awareness, or practical framing without adding man-made rules.\n\nSource Terms capture original-language words and how they affect understanding.\n\nTranslation Notes explain wording differences, ambiguity, or translation choices.\n\nClarification helps prevent misunderstanding by naming a focused correction, boundary, or distinction.";

    if (Platform.OS === "web" && typeof window.alert === "function") {
      window.alert(message);
      return;
    }

    Alert.alert("Community Contributions", message);
  }

  function goPreviousYear() {
    setYearTransition({ direction: "previous", id: Date.now() });
    setVisibleEnochYear((year) => year - 1);
    setActiveMonthNumber(null);
    closeDay();
    scrollViewRef.current?.scrollTo({ y: 0, animated: true });
  }

  function goNextYear() {
    setYearTransition({ direction: "next", id: Date.now() });
    setVisibleEnochYear((year) => year + 1);
    setActiveMonthNumber(null);
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

  const upcomingShabbatNode =
    nodes.find((node) => {
      return (
        node.gregorianDate >= todayDateId &&
        node.enoch?.events?.some((event) => event.type === "weekly-sabbath")
      );
    }) ??
    nodes.find((node) =>
      node.enoch?.events?.some((event) => event.type === "weekly-sabbath")
    );

  return (
    <>
      <ScrollView
        ref={scrollViewRef}
        stickyHeaderIndices={[0]}
        scrollEnabled={!isWheelInteracting}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        style={{
          flex: 1,
          backgroundColor: "#ffffff",
        }}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingTop: 36,
          paddingBottom: 24,
        }}
      >
        <View
          onLayout={(event) => {
            handleHeaderLayout(event.nativeEvent.layout.height);
          }}
          style={{
            backgroundColor: "#ffffff",
            paddingBottom: 12,
          }}
        >
          <TabSelector activeTab={activeTab} onChangeTab={setActiveTab} />

          {activeTab === "calendar" && (
            <AppHeader
              month={currentMonth}
              todayNode={todayNode}
              upcomingShabbatNode={upcomingShabbatNode}
              gregorianLabel={`${config.enochYear} · Starts ${config.startsOnGregorianDate}`}
              groupLabel={groupLabel}
              userRole={userRole}
              yearTransition={yearTransition}
              onPreviousMonth={goPreviousYear}
              onNextMonth={goNextYear}
              onChangeGroup={confirmChangeGroup}
              onPressToday={() => {
                if (todayNode) {
                  openDay(todayNode);
                }
              }}
              onPressUpcomingShabbat={() => {
                if (upcomingShabbatNode) {
                  openDay(upcomingShabbatNode);
                }
              }}
            />
          )}

          {activeTab === "commands" && (
            <CommandStickyHeader
              command={selectedCommandHeader}
              navigation={commandNavigation}
              selectedBibleVersion={selectedBibleVersion}
              searchText={commandSearchText}
              contributorUsername={commandContributorUsername}
              categoryCount={commandResourceStats.categoryCount}
              commandCount={commandResourceStats.commandCount}
              isSelectingRandom={commandResourceStats.isSelectingRandom}
              isSelectingPending={commandResourceStats.isSelectingPending}
              onChangeBibleVersion={setSelectedBibleVersion}
              onChangeSearchText={setCommandSearchText}
              onChangeContributorUsername={setCommandContributorUsername}
              onShowContributionHelp={showCommandContributionHelp}
              onRequestRandom={() => {
                setCommandRandomRequestId((id) => id + 1);
              }}
              onRequestPending={() => {
                setCommandPendingRequestId((id) => id + 1);
              }}
            />
          )}
        </View>

        {activeTab === "calendar" && (
          <>
            <YearWheelView
              nodes={nodes}
              perpetualMarkers={perpetualMarkers}
              todayDateId={todayDateId}
              onPressMonth={scrollToMonth}
              onPressDay={openDay}
              onInteractionChange={setIsWheelInteracting}
            />

            <View
              onLayout={(event) => {
                handleYearViewLayout(event.nativeEvent.layout.y);
              }}
            >
              <YearView
                nodes={nodes}
                notices={yearNotices}
                perpetualMarkers={perpetualMarkers}
                todayDateId={todayDateId}
                onMonthLayout={handleMonthLayout}
                onPressDay={openDay}
              />
            </View>
          </>
        )}

        {activeTab === "timeline" && (
          <HistoryTimelineView
            adminToken={adminToken}
            groupCode={groupCode}
            userRole={userRole}
          />
        )}

        {activeTab === "commands" && (
          <CommandExplorerView
            bibleVersion={selectedBibleVersion}
            searchText={commandSearchText}
            randomRequestId={commandRandomRequestId}
            pendingRequestId={commandPendingRequestId}
            adminToken={adminToken}
            groupCode={groupCode}
            contributorUsername={commandContributorUsername}
            userRole={userRole}
            onSelectedCommandChange={setSelectedCommandHeader}
            onNavigationStateChange={setCommandNavigation}
            onResourceStatsChange={handleCommandResourceStatsChange}
            onMobileSelectedCommandLayout={centerMobileSelectedCommand}
          />
        )}
      </ScrollView>

      {activeTab === "calendar" && (
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
          onDeleteNotice={deleteNotice}
          onDeleteScriptureReading={deleteScriptureReading}
          onSavePerpetualMarkers={savePerpetualMarkers}
          adminToken={adminToken}
        />
      )}
    </>
  );
}

function TabSelector({
  activeTab,
  onChangeTab,
}: {
  activeTab: AppTab;
  onChangeTab: (tab: AppTab) => void;
}) {
  const tabs: { id: AppTab; label: string }[] = [
    { id: "calendar", label: "Calendar" },
    { id: "timeline", label: "Timeline" },
    { id: "commands", label: "Commands" },
  ];

  return (
    <View
      style={{
        marginBottom: 12,
        flexDirection: "row",
        gap: 6,
        padding: 4,
        borderRadius: 999,
        backgroundColor: "#e5e7eb",
      }}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;

        return (
          <Pressable
            key={tab.id}
            onPress={() => onChangeTab(tab.id)}
            style={{
              flex: 1,
              minHeight: 38,
              borderRadius: 999,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: isActive ? "#ffffff" : "transparent",
              borderWidth: isActive ? 1 : 0,
              borderColor: "#d1d5db",
            }}
          >
            <Text
              numberOfLines={1}
              adjustsFontSizeToFit
              minimumFontScale={0.78}
              style={{
                fontSize: 13,
                fontWeight: "900",
                color: isActive ? "#081a33" : "#4b5563",
              }}
            >
              {tab.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

function CommandStickyHeader({
  command,
  navigation,
  selectedBibleVersion,
  searchText,
  contributorUsername,
  categoryCount,
  commandCount,
  isSelectingRandom,
  isSelectingPending,
  onChangeBibleVersion,
  onChangeSearchText,
  onChangeContributorUsername,
  onShowContributionHelp,
  onRequestRandom,
  onRequestPending,
}: {
  command: CommandHeaderCommand | null;
  navigation: CommandNavigationState | null;
  selectedBibleVersion: BibleVersion;
  searchText: string;
  contributorUsername: string;
  categoryCount: number;
  commandCount: number;
  isSelectingRandom: boolean;
  isSelectingPending: boolean;
  onChangeBibleVersion: (version: BibleVersion) => void;
  onChangeSearchText: (text: string) => void;
  onChangeContributorUsername: (username: string) => void;
  onShowContributionHelp: () => void;
  onRequestRandom: () => void;
  onRequestPending: () => void;
}) {
  const { width } = useWindowDimensions();
  const [isVersionMenuOpen, setIsVersionMenuOpen] = useState(false);
  const isCompactHeader = width < 680;
  const commandCategory = command?.categories?.[0] ?? null;
  const categoryLabel = commandCategory
    ? formatCommandCategoryLabel(commandCategory)
    : null;
  const categoryIcon = getCommandCategoryIcon(commandCategory);
  const canContribute = isValidContributorUsername(contributorUsername);

  return (
    <View
      style={{
        padding: 16,
        borderRadius: 20,
        backgroundColor: "#f9fafb",
        borderWidth: 1,
        borderColor: "#e5e7eb",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View style={{ flex: 1 }}>
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
            TORAH
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
            Command Study
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            gap: 8,
            flexShrink: 0,
          }}
        >
          <Pressable
            onPress={onShowContributionHelp}
            style={({ pressed }) => [
              {
                width: 36,
                height: 36,
                borderRadius: 18,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#e0f2fe",
              },
              pressed && { opacity: 0.78 },
            ]}
          >
            <MaterialIcons name="help-outline" size={22} color="#075985" />
          </Pressable>

          <Pressable
            onPress={navigation?.goPrevious}
            disabled={!navigation?.canGoPrevious}
            style={({ pressed }) => [
              {
                width: 36,
                height: 36,
                borderRadius: 18,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#e5e7eb",
                opacity: navigation?.canGoPrevious ? 1 : 0.38,
              },
              pressed && { opacity: 0.78 },
            ]}
          >
            <MaterialIcons name="chevron-left" size={28} />
          </Pressable>

          <Pressable
            onPress={navigation?.goNext}
            disabled={!navigation?.canGoNext}
            style={({ pressed }) => [
              {
                width: 36,
                height: 36,
                borderRadius: 18,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#e5e7eb",
                opacity: navigation?.canGoNext ? 1 : 0.38,
              },
              pressed && { opacity: 0.78 },
            ]}
          >
            <MaterialIcons name="chevron-right" size={28} />
          </Pressable>
        </View>
      </View>

      <View
        style={{
          marginTop: 16,
          flexDirection: "row",
          alignItems: "center",
          gap: 12,
        }}
      >
        {categoryIcon ? (
          <Image
            source={categoryIcon}
            style={{
              width: 56,
              height: 56,
            }}
            resizeMode="contain"
          />
        ) : null}

        <View
          style={{
            flex: 1,
          }}
        >
          {categoryLabel ? (
            <Text
              numberOfLines={1}
              style={{
                fontSize: 18,
                lineHeight: 23,
                fontWeight: "900",
                color: "#081a33",
                textTransform: "capitalize",
              }}
            >
              {categoryLabel}
            </Text>
          ) : (
            <Text
              numberOfLines={1}
              style={{
                fontSize: 18,
                lineHeight: 23,
                fontWeight: "900",
                color: "#081a33",
              }}
            >
              Select a category
            </Text>
          )}
        </View>
      </View>

      <View
        style={{
          marginTop: 12,
          gap: 10,
        }}
      >
        <Text
          numberOfLines={1}
          style={{
            fontSize: 12,
            lineHeight: 16,
            color: "#64748b",
            fontWeight: "700",
          }}
        >
          {categoryCount} categories - {commandCount} commands
        </Text>

        <View
          style={{
            flexDirection: isCompactHeader ? "column" : "row",
            alignItems: isCompactHeader ? "stretch" : "center",
            gap: 8,
          }}
        >
          <View
            style={{
              flex: isCompactHeader ? undefined : 1,
              width: isCompactHeader ? "100%" : undefined,
              minWidth: isCompactHeader ? undefined : 240,
              minHeight: 42,
              paddingLeft: 12,
              paddingRight: 4,
              borderRadius: 999,
              backgroundColor: "#ffffff",
              borderWidth: 1,
              borderColor: "#cbd5e1",
              flexDirection: "row",
              alignItems: "center",
              gap: 8,
              overflow: "hidden",
            }}
          >
            <TextInput
              value={searchText}
              onChangeText={onChangeSearchText}
              placeholder="Search commands"
              placeholderTextColor="#94a3b8"
              autoCapitalize="none"
              autoCorrect={false}
              style={{
                flex: 1,
                minWidth: 0,
                minHeight: 40,
                color: "#0f172a",
                fontSize: 14,
                fontWeight: "700",
              }}
            />

            <View
              style={{
                width: isCompactHeader ? 122 : undefined,
                minHeight: 34,
                borderRadius: 999,
                overflow: "hidden",
                backgroundColor: "#0f766e",
                flexDirection: "row",
                alignItems: "stretch",
              }}
            >
              <Pressable
                onPress={onRequestRandom}
                disabled={isSelectingRandom}
                style={({ pressed }) => [
                  {
                    flex: 1,
                    paddingHorizontal: 11,
                    alignItems: "center",
                    justifyContent: "center",
                    opacity: isSelectingRandom ? 0.65 : 1,
                  },
                  pressed && { backgroundColor: "#115e59" },
                ]}
              >
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: "900",
                    color: "#ffffff",
                  }}
                >
                  {isSelectingRandom ? "..." : "Random"}
                </Text>
              </Pressable>

              <View
                style={{
                  width: 1,
                  backgroundColor: "rgba(255,255,255,0.35)",
                }}
              />

              <Pressable
                onPress={onRequestPending}
                disabled={isSelectingPending}
                style={({ pressed }) => [
                  {
                    flex: 1,
                    paddingHorizontal: 11,
                    alignItems: "center",
                    justifyContent: "center",
                    opacity: isSelectingPending ? 0.65 : 1,
                  },
                  pressed && { backgroundColor: "#115e59" },
                ]}
              >
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: "900",
                    color: "#ffffff",
                  }}
                >
                  {isSelectingPending ? "..." : "Pending"}
                </Text>
              </Pressable>
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 8,
              width: isCompactHeader ? "100%" : undefined,
              flexShrink: 0,
            }}
          >
            <View
              style={{
                flex: isCompactHeader ? 1 : undefined,
                minWidth: isCompactHeader ? 0 : 180,
                minHeight: 38,
                paddingLeft: 12,
                paddingRight: 10,
                borderRadius: 999,
                backgroundColor: "#ffffff",
                borderWidth: 1,
                borderColor: canContribute ? "#99f6e4" : "#cbd5e1",
                flexDirection: "row",
                alignItems: "center",
                gap: 6,
              }}
            >
              <MaterialIcons
                name={canContribute ? "lock-open" : "lock-outline"}
                size={18}
                color={canContribute ? "#0f766e" : "#64748b"}
              />

              <TextInput
                value={contributorUsername}
                onChangeText={(value) =>
                  onChangeContributorUsername(normalizeContributorUsername(value))
                }
                placeholder="username"
                placeholderTextColor="#94a3b8"
                autoCapitalize="none"
                autoCorrect={false}
                style={{
                  flex: 1,
                  minHeight: 36,
                  color: "#0f172a",
                  fontSize: 13,
                  fontWeight: "800",
                }}
              />

              <Text
                style={{
                  fontSize: 11,
                  fontWeight: "900",
                  color: canContribute ? "#0f766e" : "#64748b",
                  textTransform: "uppercase",
                }}
              >
                {canContribute ? "Unlocked" : "Locked"}
              </Text>
            </View>

            <Pressable
              onPress={() => setIsVersionMenuOpen((value) => !value)}
              style={({ pressed }) => [
                {
                  width: isCompactHeader ? 116 : undefined,
                  minHeight: 38,
                  paddingHorizontal: 12,
                  borderRadius: 999,
                  borderWidth: 1,
                  borderColor: "#cbd5e1",
                  backgroundColor: "#ffffff",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: isCompactHeader ? "space-between" : "center",
                  gap: 6,
                },
                pressed && { backgroundColor: "#f1f5f9" },
              ]}
            >
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: "900",
                  color: "#64748b",
                  textTransform: "uppercase",
                }}
              >
                Bible
              </Text>

              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "900",
                  color: "#081a33",
                }}
              >
                {selectedBibleVersion}
              </Text>

              <MaterialIcons
                name={isVersionMenuOpen ? "expand-less" : "expand-more"}
                size={20}
                color="#475569"
              />
            </Pressable>
          </View>
        </View>

        {isVersionMenuOpen ? (
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              gap: 6,
            }}
          >
            {BIBLE_VERSIONS.map((version) => {
              const isSelected = version === selectedBibleVersion;

              return (
                <Pressable
                  key={version}
                  onPress={() => {
                    onChangeBibleVersion(version);
                    setIsVersionMenuOpen(false);
                  }}
                  style={({ pressed }) => [
                    {
                      minHeight: 34,
                      paddingHorizontal: 10,
                      borderRadius: 999,
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: isSelected ? "#081a33" : "#ffffff",
                      borderWidth: 1,
                      borderColor: isSelected ? "#081a33" : "#cbd5e1",
                    },
                    pressed && { opacity: 0.8 },
                  ]}
                >
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: "900",
                      color: isSelected ? "#ffffff" : "#334155",
                    }}
                  >
                    {version}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        ) : null}
      </View>
    </View>
  );
}

const commandCategoryIcons: Record<string, ImageSourcePropType> = {
  animal_welfare: require("../assets/command/icons/animal_welfare.png"),
  appointed_times: require("../assets/command/icons/appointed_times.png"),
  atonement: require("../assets/command/icons/atonement.png"),
  clean_purity: require("../assets/command/icons/clean_purity.png"),
  command_remembrance: require("../assets/command/icons/command_remembrance.png"),
  community_care: require("../assets/command/icons/community_care.png"),
  family_household: require("../assets/command/icons/family_household.png"),
  firstfruits_omer: require("../assets/command/icons/firstfruits_omer.png"),
  justice_neighbor: require("../assets/command/icons/justice_neighbor.png"),
  leadership_warfare: require("../assets/command/icons/leadership_warfare.png"),
  marriage_household: require("../assets/command/icons/marriage_household.png"),
  mixed_kinds: require("../assets/command/icons/mixed_kinds.png"),
  name_vows_remembrance: require("../assets/command/icons/name_vows_remembrance.png"),
  offerings: require("../assets/command/icons/offerings.png"),
  passover_unleavened_bread: require("../assets/command/icons/passover_unleavened_bread.png"),
  priestly_holiness: require("../assets/command/icons/priestly_holiness.png"),
  property_economics_land: require("../assets/command/icons/property_economics_land.png"),
  refuge_court_procedure: require("../assets/command/icons/refuge_court_procedure.png"),
  sabbath: require("../assets/command/icons/sabbath.png"),
  sacred_assembly: require("../assets/command/icons/sacred_assembly.png"),
  servants_release: require("../assets/command/icons/servants_release.png"),
  tabernacles: require("../assets/command/icons/tabernacles.png"),
  torah_teaching: require("../assets/command/icons/torah_teaching.png"),
  vows_separation: require("../assets/command/icons/vows_separation.png"),
  worship_idolatry: require("../assets/command/icons/worship_idolatry.png"),
};

function getCommandCategoryIcon(category: string | null) {
  if (!category) return null;

  return commandCategoryIcons[category] ?? null;
}

function formatCommandCategoryLabel(category: string) {
  return category.replace(/_/g, " ");
}

function isValidContributorUsername(username: string) {
  return /^[a-z0-9_-]{2,32}$/.test(normalizeContributorUsername(username));
}

function normalizeContributorUsername(username: string) {
  return username.trim().toLowerCase().replace(/\s/g, "");
}

function TimelinePlaceholder() {
  return (
    <View
      style={{
        padding: 16,
        borderRadius: 20,
        backgroundColor: "#f9fafb",
        borderWidth: 1,
        borderColor: "#e5e7eb",
      }}
    >
      <Text
        style={{
          fontSize: 24,
          fontWeight: "900",
          color: "#081a33",
        }}
      >
        Timeline
      </Text>

      <Text
        style={{
          marginTop: 6,
          fontSize: 14,
          lineHeight: 20,
          color: "#4b5563",
        }}
      >
        Timeline will live here. This tab is in place so the app shell can be
        tested with Calendar, Timeline, and Commands areas.
      </Text>
    </View>
  );
}
