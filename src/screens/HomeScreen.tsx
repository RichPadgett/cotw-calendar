/*
 * File: src/screens/HomeScreen.tsx
 * Purpose: Legacy or standalone screen component retained for app experimentation.
 * Author: rpadgett
 */

import { SafeAreaView, StyleSheet } from "react-native";

import MonthView from "../components/calendar/MonthView";

import { buildMonth } from "../engine/buildMonth";

/**
 * Creates the legacy month-screen experiment.
 * This screen component renders a simple month view and is separate from the current Expo Router home screen.
 */
export default function HomeScreen() {
  const nodes = buildMonth(2026, 3);

  return (
    <SafeAreaView style={styles.container}>
      <MonthView nodes={nodes} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111827",
    paddingTop: 24,
  },
});
