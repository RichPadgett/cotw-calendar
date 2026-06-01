/*
 * File: server/src/types/perpetualMarkers.ts
 * Purpose: Shared app-side TypeScript type definitions.
 * Author: rpadgett
 */

export type PerpetualMarker = {
  id: string;

  title: string;
  shortName: string;
  color: string;

  description?: string;

  month?: number;
  day?: number;

  gateDay?: number;

  intercalaryWeek?: boolean;
  notes?: string;
};
