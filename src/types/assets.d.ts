/*
 * File: src/types/assets.d.ts
 * Purpose: TypeScript declarations for static image imports used by React Native components.
 * Author: rpadgett
 */

declare module "*.png" {
  import type { ImageSourcePropType } from "react-native";

  const source: ImageSourcePropType;

  export default source;
}
