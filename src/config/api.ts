/*
 * File: src/config/api.ts
 * Purpose: Central API configuration for all frontend requests.
 *
 * When running behind Nginx:
 *   Browser -> /api/*
 *   Nginx   -> localhost:3001/api/*
 *
 * This allows the same frontend code to work on:
 * - Local LAN deployments
 * - Public IP deployments
 * - Future domain/HTTPS deployments
 */

export const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_URL ?? "/api";

/**
 * Builds a full API URL from a relative path.
 *
 * Example:
 *   apiUrl("/calendar/perpetual-markers")
 *   => "/api/calendar/perpetual-markers"
 */

export function apiUrl(path: string): string {
  return `${API_BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
