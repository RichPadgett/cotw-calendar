/*
 * File: app/_layout.tsx
 * Purpose: Root Expo Router layout that provides the top-level navigation slot for the app.
 * Author: rpadgett
 */

import { Stack } from "expo-router";

/**
 * Creates the root Expo Router layout component that renders the active route slot.
 * This component is the app shell for navigation-driven screens.
 */
export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: "#111827" },
      }}
    />
  );
}
