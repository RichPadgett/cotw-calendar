/*
 * File: src/utils/appDay.ts
 * Purpose: Shared local app-day helpers for the calendar's 6 AM day boundary.
 */

export const APP_DAY_ROLLOVER_HOUR = 6;

export function formatLocalDateId(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function getAppDateId(now = new Date()): string {
  const appDate = new Date(now);

  if (appDate.getHours() < APP_DAY_ROLLOVER_HOUR) {
    appDate.setDate(appDate.getDate() - 1);
  }

  return formatLocalDateId(appDate);
}

export function formatGroupLabel(groupCode: string): string {
  const normalizedGroupCode = groupCode.trim();

  if (!normalizedGroupCode || normalizedGroupCode === "public") {
    return "Public";
  }

  return normalizedGroupCode
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}
