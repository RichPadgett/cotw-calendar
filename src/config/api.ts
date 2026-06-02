/*
 * File: src/config/api.ts
 * Purpose: Central API configuration for all frontend requests.
 *
 * EXPO_PUBLIC_API_URL should be an origin only, not an /api path.
 *
 * Local example:
 *   EXPO_PUBLIC_API_URL=http://localhost:3001
 *
 * Production behind Nginx:
 *   EXPO_PUBLIC_API_URL=
 *   Browser -> /api/*
 *   Nginx   -> localhost:3001/api/*
 *
 * This allows the same frontend code to work on:
 * - Local LAN deployments
 * - Public IP deployments
 * - Future domain/HTTPS deployments
 */

const API_ORIGIN = process.env.EXPO_PUBLIC_API_URL?.replace(/\/$/, "") ?? "";

export const API_BASE_URL = API_ORIGIN;

/**
 * Builds a full API URL from a relative path.
 *
 * Example:
 *   apiUrl("/calendar/perpetual-markers")
 *   => "/api/calendar/perpetual-markers"
 */

export function apiUrl(path: string): string {
  return `${API_BASE_URL}/api${path.startsWith("/") ? path : `/${path}`}`;
}
