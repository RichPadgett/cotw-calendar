/*
 * File: src/constants/theme.ts
 * Purpose: Shared design constants for colors, spacing, typography, and layout values.
 * Author: rpadgett
 */

/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import "@/global.css";

import { Platform } from "react-native";

/**
 * Defines the app's light and dark color tokens.
 * These design constants are used by themed UI helpers and reusable components.
 */
export const Colors = {
  light: {
    text: "#000000",
    background: "#ffffff",
    backgroundElement: "#F0F0F3",
    backgroundSelected: "#E0E1E6",
    textSecondary: "#60646C",
  },
  dark: {
    text: "#ffffff",
    background: "#000000",
    backgroundElement: "#212225",
    backgroundSelected: "#2E3135",
    textSecondary: "#B0B4BA",
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

/**
 * Selects the font stack for each supported platform.
 * These style constants keep typography choices centralized across native and web UI.
 */
export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: "system-ui",
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: "ui-serif",
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: "ui-rounded",
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: "ui-monospace",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
  web: {
    sans: "var(--font-display)",
    serif: "var(--font-serif)",
    rounded: "var(--font-rounded)",
    mono: "var(--font-mono)",
  },
});

/**
 * Defines shared spacing tokens for layout, padding, gaps, and component sizing.
 * These style constants keep repeated measurements consistent across the app.
 */
export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

/**
 * Defines the platform-specific bottom inset used around tabbed navigation.
 * This layout constant reserves space for native tab bars and safe interaction zones.
 */
export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
/**
 * Defines the maximum readable width for constrained web content.
 * This layout constant keeps broad browser surfaces from stretching too far.
 */
export const MaxContentWidth = 800;
