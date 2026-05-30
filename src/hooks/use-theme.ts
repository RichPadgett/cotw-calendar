/*
 * File: src/hooks/use-theme.ts
 * Purpose: React hook for platform-aware theme or color-scheme behavior.
 * Author: rpadgett
 */

/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

/**
 * Returns the active theme color palette for the current color scheme.
 * This hook bridges system color-scheme state to app-level design tokens.
 */
export function useTheme() {
  const scheme = useColorScheme();
  const theme = scheme === "unspecified" ? "light" : scheme;

  return Colors[theme];
}
