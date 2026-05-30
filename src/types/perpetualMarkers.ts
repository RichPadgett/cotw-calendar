/*
 * File: src/types/perpetualMarkers.ts
 * Purpose: Source file for the COTW calendar application.
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
};
