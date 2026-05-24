Good — do that. That block is your **project snapshot**, and it’s the right thing to preserve before you start building real features.

If you want an even cleaner version for long-term use (less noise, more engineering-focused), here’s a tightened “drop-in” doc you can paste instead:

---

## 📘 Cow Calendar — Project Snapshot (Stable State)

### 🧭 Purpose

React Native calendar app with:

* Gregorian calendar base
* Enoch calendar overlay system
* 4 intercalary days (quarter separators)
* scripture + study linking per day
* future REST API + web admin UI

---

## 🧱 Tech Stack

* Expo SDK 56
* Expo Router (file-based routing)
* React Native 0.85
* TypeScript
* React Native Web enabled

---

## 📁 Current Architecture

```txt id="arch1"
cow-calendar/
  app/
    _layout.tsx
    index.tsx   ← ACTIVE SCREEN

  src/
    engine/
    components/
    models/

  assets/
  app.json
  package.json
```

---

## 🚀 Routing Model

* Uses Expo Router
* Entry:

```json id="router1"
"main": "expo-router/entry"
```

* Layout:

```tsx id="layout1"
<Stack screenOptions={{ headerShown: false }} />
```

* Navigation style: Stack (no tabs yet)

---

## 🧠 Domain Model (Planned)

### Core Concepts

* Day
* Month
* Year (Gregorian base)
* Enoch overlay layer
* Intercalary day insertion system

### Features

* Scripture links per day
* Study notes per day
* Visual calendar overlays (multi-layer calendar view)

---

## 📅 Calendar Engine Goals

* Build Gregorian month generator
* Overlay Enoch calendar rules
* Insert 4 intercalary days at quarter boundaries
* Support dual-calendar rendering (color overlays)
* Prepare data model for API/web control layer

---

## 🧭 Key Design Decisions

* Expo Router for navigation
* `app/` = UI routes
* `src/` = logic only
* No tabs (clean Stack navigation)
* Calendar engine is fully decoupled from UI

---

## 🧪 Current Status

* App boots successfully
* Expo Router working
* Clean UI baseline (“ENOCH CALENDAR READY” confirmed previously)
* Stable project structure achieved

---

## 🚀 Next Build Phase

### Calendar Engine v1

We will implement:

* `buildMonth()`
* `enochRules.ts`
* `intercalary.ts`
* `MonthView.tsx`
* `DayCell.tsx`

---

If you want, next step we can start building the **actual calendar engine (not setup anymore)** and turn this into a real dual-calendar system.
