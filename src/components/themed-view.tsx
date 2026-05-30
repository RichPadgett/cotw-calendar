/*
 * File: src/components/themed-view.tsx
 * Purpose: Reusable interface component used by the React Native app.
 * Author: rpadgett
 */

import { View, type ViewProps } from "react-native";

import { ThemeColor } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  type?: ThemeColor;
};

/**
 * Creates a themed view using app background color tokens.
 * This style component centralizes light/dark surface colors for reusable layouts.
 */
export function ThemedView({
  style,
  lightColor,
  darkColor,
  type,
  ...otherProps
}: ThemedViewProps) {
  const theme = useTheme();

  return (
    <View
      style={[{ backgroundColor: theme[type ?? "background"] }, style]}
      {...otherProps}
    />
  );
}
