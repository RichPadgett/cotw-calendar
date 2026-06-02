/*
 * File: server/src/types/perpetualMarkers.ts
 * Purpose: Server-side type definitions for recurring perpetual calendar markers.
 * Author: rpadgett
 */

export type PerpetualMarker = {
  id: string;
  title: string;
  shortName: string;
  color?: string;
  description?: string;
  month?: number;
  day?: number;
  gateDay?: number;
  intercalaryWeek?: boolean;
  notes?: string;
  sourceLabel?: string;
  sourceUrl?: string;
};
