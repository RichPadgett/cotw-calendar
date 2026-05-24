// app/index.tsx

import { useRef, useState } from "react";

import { ScrollView, View } from "react-native";

import MonthHeader from "../src/components/calendar/MonthHeader";
import YearView from "../src/components/calendar/YearView";

import { buildEnochYear } from "../src/engine/buildEnochYear";

export default function HomeScreen() {
  /*
    ============================================================
    ENOCH YEAR CONFIGURATION
    ============================================================

    Defines:
    - which Enoch year is being rendered
    - the Gregorian start date for Day 1
  */

  const config = {
    enochYear: 2026,
    startsOnGregorianDate: "2026-03-18",
  };

  /*
    ============================================================
    FULL ENOCH YEAR NODE GENERATION
    ============================================================
  */

  const nodes = buildEnochYear(config);

  /*
    ============================================================
    SCROLL + ACTIVE MONTH STATE
    ============================================================

    scrollViewRef
      Allows programmatic scrolling.

    activeMonthNumber
      Tracks which Enoch month is currently visible.

    monthOffsetsRef
      Stores vertical Y positions for each month section.
  */

  const scrollViewRef = useRef<ScrollView>(null);

  const [activeMonthNumber, setActiveMonthNumber] =
    useState(1);

  const monthOffsetsRef = useRef<
    Record<number, number>
  >({});

  /*
    ============================================================
    CURRENT ACTIVE MONTH
    ============================================================

    Used by the sticky MonthHeader.
  */

  const currentMonth = nodes.find(
    (node) =>
      node.enoch?.month?.number ===
      activeMonthNumber
  )?.enoch?.month;

  /*
    ============================================================
    MONTH LAYOUT TRACKING
    ============================================================

    YearView reports each month section's Y offset
    so we can scroll directly to it later.
  */

  function handleMonthLayout(
    monthNumber: number,
    y: number
  ) {
    monthOffsetsRef.current[monthNumber] = y;
  }

  /*
    ============================================================
    PROGRAMMATIC MONTH SCROLLING
    ============================================================

    Used by the header navigation buttons.
  */

  function scrollToMonth(monthNumber: number) {
    const y =
      monthOffsetsRef.current[monthNumber];

    if (y === undefined) {
      return;
    }

    scrollViewRef.current?.scrollTo({
      y,
      animated: true,
    });

    setActiveMonthNumber(monthNumber);
  }

  /*
    ============================================================
    HEADER NAVIGATION
    ============================================================
  */

  function goPreviousMonth() {
    scrollToMonth(
      Math.max(1, activeMonthNumber - 1)
    );
  }

  function goNextMonth() {
    scrollToMonth(
      Math.min(12, activeMonthNumber + 1)
    );
  }

  /*
    ============================================================
    SCROLL TRACKING
    ============================================================

    Detects which month section is currently
    near the top of the screen and updates
    the sticky header.
  */

  function handleScroll(event: any) {
    const scrollY =
      event.nativeEvent.contentOffset.y;

    const activeMonth = Object.entries(
      monthOffsetsRef.current
    )
      .filter(([, y]) => y <= scrollY + 180)
      .sort((a, b) => b[1] - a[1])[0];

    if (activeMonth) {
      setActiveMonthNumber(
        Number(activeMonth[0])
      );
    }
  }

  /*
    ============================================================
    RENDER
    ============================================================
  */

  return (
    <ScrollView
      /*
        Enables programmatic scrolling
      */
      ref={scrollViewRef}

      /*
        Sticky MonthHeader
      */
      stickyHeaderIndices={[0]}

      /*
        Active month tracking
      */
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
      {/* ======================================================
          STICKY MONTH HEADER
      ====================================================== */}

      <View
        style={{
          backgroundColor: "#ffffff",

          paddingBottom: 12,
        }}
      >
        <MonthHeader
          month={currentMonth}
          gregorianLabel={`Enoch Year ${config.enochYear}`}
          onPreviousMonth={goPreviousMonth}
          onNextMonth={goNextMonth}
        />
      </View>

      {/* ======================================================
          FULL ENOCH YEAR VIEW
      ====================================================== */}

      <YearView
        nodes={nodes}
        onMonthLayout={handleMonthLayout}
      />
    </ScrollView>
  );
}