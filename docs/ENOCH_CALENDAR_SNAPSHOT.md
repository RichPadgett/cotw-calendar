# Enoch Calendar Platform — Full Conversation Export

## Overview

This document captures the full design conversation for a React Native + Web + API calendar platform that implements:

- Gregorian calendar (base system)
- Enoch calendar overlay system
- 4 intercalary days per year (quarter transitions)
- Scripture study integration
- Themed UI system controlled by API
- Web component embedding
- Admin web UI

---

# 🧭 Core Vision

This is NOT a traditional calendar app.

It is a:

> Timeline-based calendar + overlay engine + scripture study platform

It must support:
- multiple calendar systems
- non-month-based days (intercalary days)
- dynamic overlays (themes, scripture, holy days)
- embeddable web components
- API-driven configuration

---

# 🧱 Architecture

## High-Level Stack

- React Native (Expo)
- FlashList (UI rendering)
- Reanimated + Gesture Handler
- Zustand (state)
- TanStack Query (data)
- NestJS (API)
- Prisma + PostgreSQL (DB)
- Next.js (admin UI)
- StencilJS (web components)
- Turborepo (monorepo)
- TypeScript everywhere

---

# 🧠 Core Design Principle

## Gregorian is canonical

- Used for storage
- Used for APIs
- Used for synchronization

## Enoch is overlay

- Derived from Gregorian
- Used for display logic
- Used for theological structure

---

# 📅 Core Data Model

## Calendar Node System

Instead of traditional months/weeks:

```ts
type CalendarNode =
  | MonthDayNode
  | IntercalaryNode



