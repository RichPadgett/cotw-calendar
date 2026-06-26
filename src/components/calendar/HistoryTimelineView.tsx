/*
 * File: src/components/calendar/HistoryTimelineView.tsx
 * Purpose: Swipeable biblical history timeline view for occurrence ranges and exact dates.
 */

import {
  Alert,
  Modal,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from "react-native";
import { createElement, useEffect, useMemo, useRef, useState } from "react";

import { MaterialIcons } from "@expo/vector-icons";

import {
  HistoricalDate,
  HISTORY_TIMELINE_OCCURRENCES,
  HISTORY_TIMELINE_RANGE,
  TimelineOccurrence,
} from "../../data/historyTimeline";
import { validateTimelineDate } from "../../engine/timelineValidation";
import { apiUrl } from "../../config/api";

const BASE_LANE_HEIGHT = 128;
const TIMELINE_LANE_COUNT = 11;
const MAX_TIMELINE_LANE = TIMELINE_LANE_COUNT - 1;
const TIMELINE_LANE_HEIGHTS = [96, 128, 160, 196, 236, 288];
const TRACK_TOP = 112;
const TRACK_HEIGHT = BASE_LANE_HEIGHT * TIMELINE_LANE_COUNT;
const TIMELINE_SIDE_GUTTER = 40;
const MIN_LABELED_BAR_WIDTH = 132;
const MIN_COMPACT_LABEL_BAR_WIDTH = 34;
const MIN_NOTES_BAR_WIDTH = 112;
const HOVER_PREVIEW_WIDTH = 320;
const TIMELINE_HOVER_TAB_WIDTH = 18;
const TIMELINE_LANE_OPTIONS = Array.from(
  { length: TIMELINE_LANE_COUNT },
  (_, index) => ({
    label: String(index),
    value: String(index),
  })
);
const ENOCH_YEAR_DAYS = 364;
const SABBATH_WEEK_DAYS = 7;
const SABBATH_WEEK_CYCLE_YEARS = 7;
const AVERAGE_ENOCH_YEAR_DAYS =
  ENOCH_YEAR_DAYS + SABBATH_WEEK_DAYS / SABBATH_WEEK_CYCLE_YEARS;
const COLOR_SWATCHES = [
  "#2563eb",
  "#0ea5e9",
  "#0f766e",
  "#14b8a6",
  "#7c3aed",
  "#a855f7",
  "#db2777",
  "#dc2626",
  "#f43f5e",
  "#ca8a04",
  "#eab308",
  "#16a34a",
  "#65a30d",
  "#ea580c",
  "#4f46e5",
  "#64748b",
  "#111827",
];
const TIMELINE_ZOOM_LEVELS = [
  {
    id: "years-10000",
    label: "10,000 Years",
    pixelsPerYear: 0.12,
    minViewportMultiplier: 1,
  },
  {
    id: "years-5000",
    label: "5,000 Years",
    pixelsPerYear: 0.22,
    minViewportMultiplier: 1.35,
  },
  {
    id: "millennia",
    label: "Millennia",
    pixelsPerYear: 0.35,
    minViewportMultiplier: 1.8,
  },
  {
    id: "years-500",
    label: "500 Years",
    pixelsPerYear: 0.72,
    minViewportMultiplier: 2.4,
  },
  {
    id: "years-250",
    label: "250 Years",
    pixelsPerYear: 1.45,
    minViewportMultiplier: 3.2,
  },
  {
    id: "half-years",
    label: "6 Months",
    pixelsPerYear: 72,
    minViewportMultiplier: 3.2,
  },
  {
    id: "months",
    label: "Months",
    pixelsPerYear: 180,
    minViewportMultiplier: 3.2,
  },
  {
    id: "days",
    label: "Days",
    pixelsPerYear: 546,
    minViewportMultiplier: 3.2,
  },
] as const;

type TimelineZoomId = (typeof TIMELINE_ZOOM_LEVELS)[number]["id"];
type TimelineAxisTick = {
  key: string;
  label: string;
  x: number;
  major: boolean;
};

type TimelineEntryFormState = {
  title: string;
  summary: string;
  notes: string;
  color: string;
  level: string;
  lanePart: "top" | "bottom" | "both";
  exactEnochYear: string;
  exactEnochMonth: string;
  exactEnochDay: string;
  exactGregorianYear: string;
  exactGregorianEra: "BC" | "AD";
  exactGregorianMonth: string;
  exactGregorianDay: string;
  rangeEnochYear: string;
  rangeEnochMonth: string;
  rangeEnochDay: string;
  rangeDurationDays: string;
};

const DEFAULT_FORM_STATE: TimelineEntryFormState = {
  title: "",
  summary: "",
  notes: "",
  color: "#2563eb",
  level: "0",
  lanePart: "both",
  exactEnochYear: "",
  exactEnochMonth: "",
  exactEnochDay: "",
  exactGregorianYear: "",
  exactGregorianEra: "AD",
  exactGregorianMonth: "",
  exactGregorianDay: "",
  rangeEnochYear: "",
  rangeEnochMonth: "",
  rangeEnochDay: "",
  rangeDurationDays: "",
};

function parseOptionalNumber(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return undefined;

  const parsed = Number(trimmed);
  return Number.isFinite(parsed) ? parsed : undefined;
}

function parseRequiredNumber(value: string) {
  const parsed = parseOptionalNumber(value);
  return typeof parsed === "number" ? parsed : null;
}

function getTimelineZoomConfig(zoomId: TimelineZoomId) {
  return (
    TIMELINE_ZOOM_LEVELS.find((zoomLevel) => zoomLevel.id === zoomId) ??
    TIMELINE_ZOOM_LEVELS[0]
  );
}

function getTimelineContentWidth(
  viewportWidth: number,
  zoomId: TimelineZoomId
) {
  const zoomConfig = getTimelineZoomConfig(zoomId);
  const trackYearSpan =
    HISTORY_TIMELINE_RANGE.endYear - HISTORY_TIMELINE_RANGE.startYear;

  return Math.max(
    viewportWidth,
    viewportWidth * zoomConfig.minViewportMultiplier,
    TIMELINE_SIDE_GUTTER * 2 + trackYearSpan * zoomConfig.pixelsPerYear
  );
}

function isSabbathWeekYear(enochYear: number) {
  return enochYear > 0 && enochYear % SABBATH_WEEK_CYCLE_YEARS === 0;
}

function getTimelineYearSpan(durationDays: number, enochYear?: number) {
  if (!enochYear) return durationDays / AVERAGE_ENOCH_YEAR_DAYS;

  let remainingDays = durationDays;
  let currentYear = enochYear;
  let yearSpan = 0;

  while (remainingDays > 0) {
    const currentYearDays =
      ENOCH_YEAR_DAYS +
      (isSabbathWeekYear(currentYear) ? SABBATH_WEEK_DAYS : 0);
    const consumedDays = Math.min(remainingDays, currentYearDays);

    yearSpan += consumedDays / currentYearDays;
    remainingDays -= consumedDays;
    currentYear += 1;
  }

  return yearSpan;
}

function getEnochDayOfYear(month: number, day: number) {
  const safeMonth = Math.max(1, Math.min(12, month));
  const safeDay = Math.max(1, Math.min(30, day));

  return (safeMonth - 1) * 30 + safeDay;
}

function getEnochTimelineValue(params: {
  enochYear: number;
  month?: number;
  day?: number;
}) {
  if (!params.month || !params.day) {
    return params.enochYear;
  }

  return (
    params.enochYear +
    (getEnochDayOfYear(params.month, params.day) - 1) / ENOCH_YEAR_DAYS
  );
}

function getTimelineValuePosition(value: number, width: number) {
  const trackWidth = Math.max(1, width - TIMELINE_SIDE_GUTTER * 2);
  const progress =
    (value - HISTORY_TIMELINE_RANGE.startYear) /
    (HISTORY_TIMELINE_RANGE.endYear - HISTORY_TIMELINE_RANGE.startYear);

  return (
    TIMELINE_SIDE_GUTTER +
    Math.max(0, Math.min(trackWidth, progress * trackWidth))
  );
}

function getTimelineValueFromPosition(x: number, width: number) {
  const trackWidth = Math.max(1, width - TIMELINE_SIDE_GUTTER * 2);
  const progress = Math.max(
    0,
    Math.min(1, (x - TIMELINE_SIDE_GUTTER) / trackWidth)
  );

  return (
    HISTORY_TIMELINE_RANGE.startYear +
    progress *
      (HISTORY_TIMELINE_RANGE.endYear - HISTORY_TIMELINE_RANGE.startYear)
  );
}

function getEnochYearPosition(
  params: { enochYear: number; month?: number; day?: number },
  width: number
) {
  return getTimelineValuePosition(getEnochTimelineValue(params), width);
}

function getAxisYearInterval(visibleYearSpan: number, zoomId?: TimelineZoomId) {
  if (zoomId === "years-10000") return 1000;
  if (zoomId === "years-5000") return 500;
  if (zoomId === "years-500") return 100;
  if (zoomId === "years-250") return 50;
  if (visibleYearSpan > 2500) return 1000;
  if (visibleYearSpan > 1000) return 500;
  if (visibleYearSpan > 250) return 100;
  if (visibleYearSpan > 100) return 50;
  if (visibleYearSpan > 30) return 10;

  return 1;
}

function getVisibleTimelineAxisTicks(params: {
  zoomId: TimelineZoomId;
  scrollX: number;
  viewportWidth: number;
  contentWidth: number;
}): TimelineAxisTick[] {
  const visibleStart = Math.max(
    HISTORY_TIMELINE_RANGE.startYear,
    getTimelineValueFromPosition(params.scrollX - 140, params.contentWidth)
  );
  const visibleEnd = Math.min(
    HISTORY_TIMELINE_RANGE.endYear,
    getTimelineValueFromPosition(
      params.scrollX + params.viewportWidth + 140,
      params.contentWidth
    )
  );
  const visibleYearSpan = Math.max(1, visibleEnd - visibleStart);
  const ticks: TimelineAxisTick[] = [];

  if (params.zoomId === "millennia") {
    const millennialTicks = [
      HISTORY_TIMELINE_RANGE.startYear,
      1000,
      2000,
      3000,
      4000,
      5000,
      6000,
      7000,
      HISTORY_TIMELINE_RANGE.endYear,
    ];

    millennialTicks.forEach((year) => {
      if (year >= visibleStart && year <= visibleEnd) {
        ticks.push({
          key: `year-${year}`,
          label: `Year ${year}`,
          x: getTimelineValuePosition(year, params.contentWidth),
          major: true,
        });
      }
    });

    return ticks;
  }

  if (
    params.zoomId === "years-10000" ||
    params.zoomId === "years-5000" ||
    params.zoomId === "years-500" ||
    params.zoomId === "years-250"
  ) {
    const interval = getAxisYearInterval(visibleYearSpan, params.zoomId);
    const firstYear = Math.max(
      HISTORY_TIMELINE_RANGE.startYear,
      Math.ceil(visibleStart / interval) * interval
    );

    for (
      let year = firstYear;
      year <= visibleEnd && ticks.length < 120;
      year += interval
    ) {
      ticks.push({
        key: `year-${year}`,
        label: `Year ${year}`,
        x: getTimelineValuePosition(year, params.contentWidth),
        major: true,
      });
    }

    return ticks;
  }

  const firstVisibleYear = Math.max(
    HISTORY_TIMELINE_RANGE.startYear,
    Math.floor(visibleStart)
  );
  const lastVisibleYear = Math.min(
    HISTORY_TIMELINE_RANGE.endYear,
    Math.ceil(visibleEnd)
  );

  for (
    let year = firstVisibleYear;
    year <= lastVisibleYear && ticks.length < 220;
    year += 1
  ) {
    ticks.push({
      key: `year-${year}`,
      label: `Year ${year}`,
      x: getTimelineValuePosition(year, params.contentWidth),
      major: true,
    });

    if (params.zoomId === "half-years") {
      ticks.push({
        key: `year-${year}-month-7`,
        label: "M7",
        x: getEnochYearPosition(
          { enochYear: year, month: 7, day: 1 },
          params.contentWidth
        ),
        major: false,
      });
    }

    if (params.zoomId === "months") {
      const monthStep = visibleYearSpan > 8 ? 3 : 1;

      for (let month = 1 + monthStep; month <= 12; month += monthStep) {
        ticks.push({
          key: `year-${year}-month-${month}`,
          label: `M${month}`,
          x: getEnochYearPosition(
            { enochYear: year, month, day: 1 },
            params.contentWidth
          ),
          major: false,
        });
      }
    }

    if (params.zoomId === "days") {
      const dayStep = visibleYearSpan > 1.5 ? 14 : 7;

      for (let month = 1; month <= 12 && ticks.length < 260; month += 1) {
        ticks.push({
          key: `year-${year}-month-${month}`,
          label: `M${month}`,
          x: getEnochYearPosition(
            { enochYear: year, month, day: 1 },
            params.contentWidth
          ),
          major: false,
        });

        for (let day = 1 + dayStep; day <= 30; day += dayStep) {
          ticks.push({
            key: `year-${year}-month-${month}-day-${day}`,
            label: `D${day}`,
            x: getEnochYearPosition(
              { enochYear: year, month, day },
              params.contentWidth
            ),
            major: false,
          });
        }
      }
    }
  }

  return ticks;
}

export function formatHistoricalDate(date: HistoricalDate) {
  const dateParts =
    date.month && date.day ? ` ${String(date.month)}/${String(date.day)}` : "";

  return date.era === "BC"
    ? `${date.year} BC${dateParts}`
    : `AD ${date.year}${dateParts}`;
}

function getResolvedRangeEnd(occurrence: TimelineOccurrence) {
  if (!occurrence.timeRange) return null;
  const { start } = occurrence.timeRange;
  const endYear =
    getEnochTimelineValue({
      enochYear: start.enochYear,
      month: start.enochMonth,
      day: start.enochDay,
    }) +
    getTimelineYearSpan(
      occurrence.timeRange.durationDays,
      occurrence.timeRange.start.enochYear
    );

  return Math.max(HISTORY_TIMELINE_RANGE.startYear, endYear);
}

export function getRangeLabel(occurrence: TimelineOccurrence) {
  if (!occurrence.timeRange) return "";
  if (occurrence.timeRange.label) return occurrence.timeRange.label;

  const { start, gregorianDate } = occurrence.timeRange;
  const end = getResolvedRangeEnd(occurrence);
  if (!end) return "";

  const startLabel = `Enoch Year ${start.enochYear}, Month ${start.enochMonth}, Day ${start.enochDay}`;
  const endLabel = `Year ${Math.round(end)}`;
  const gregorianLabel = gregorianDate
    ? ` (${formatHistoricalDate(gregorianDate)})`
    : "";

  return `${startLabel} - ${endLabel}${gregorianLabel}`;
}

function getTimelineOccurrencePreviewLabel(occurrence: TimelineOccurrence) {
  if (occurrence.timeRange) return getRangeLabel(occurrence);

  if (occurrence.exactDate) {
    const exactLabel =
      occurrence.exactDate.label ??
      `Enoch Year ${occurrence.exactDate.enochDate.enochYear}`;
    const gregorianLabel = occurrence.exactDate.gregorianDate
      ? ` (${formatHistoricalDate(occurrence.exactDate.gregorianDate)})`
      : "";

    return `${exactLabel}${gregorianLabel}`;
  }

  return occurrence.summary ?? "";
}

function getLaneFrame(
  occurrence: TimelineOccurrence,
  laneHeight = BASE_LANE_HEIGHT
) {
  const laneTop = TRACK_TOP + clampTimelineLane(occurrence.lane) * laneHeight;
  const lanePart = occurrence.lanePart ?? "both";
  const lanePadding = 10;
  const halfGap = 5;
  const fullHeight = laneHeight - lanePadding * 2 - 8;
  const halfHeight = (fullHeight - halfGap) / 2;

  if (lanePart === "top") {
    return {
      top: laneTop + lanePadding,
      height: halfHeight,
    };
  }

  if (lanePart === "bottom") {
    return {
      top: laneTop + lanePadding + halfHeight + halfGap,
      height: halfHeight,
    };
  }

  return {
    top: laneTop + lanePadding,
    height: fullHeight,
  };
}

function TimelineRangeBar({
  occurrence,
  left,
  width,
  laneHeight,
  onPress,
  onHoverIn,
  onHoverOut,
}: {
  occurrence: TimelineOccurrence;
  left: number;
  width: number;
  laneHeight: number;
  onPress: (occurrence: TimelineOccurrence) => void;
  onHoverIn?: (occurrence: TimelineOccurrence) => void;
  onHoverOut?: (occurrence: TimelineOccurrence) => void;
}) {
  if (!occurrence.timeRange) return null;

  const barWidth = Math.max(18, width);
  const laneFrame = getLaneFrame(occurrence, laneHeight);
  const canShowNotesButton =
    Boolean(occurrence.notes?.trim()) && barWidth >= MIN_NOTES_BAR_WIDTH;

  return (
    <Pressable
      accessibilityLabel={`Open ${occurrence.title}`}
      onHoverIn={() => onHoverIn?.(occurrence)}
      onHoverOut={() => onHoverOut?.(occurrence)}
      onPress={() => onPress(occurrence)}
      style={[
        styles.timelineVerticalBar,
        {
          top: laneFrame.top,
          left,
          width: barWidth,
          height: laneFrame.height,
          backgroundColor: occurrence.color,
          borderColor: occurrence.color,
        },
      ]}
    >
      {canShowNotesButton ? (
        <View style={styles.barNotesButton}>
          <MaterialIcons name="notes" size={12} color="#ffffff" />
          <Text style={styles.barNotesButtonText}>Notes</Text>
        </View>
      ) : null}
    </Pressable>
  );
}

function TimelineRangeLabelOverlay({
  occurrence,
  left,
  width,
  laneHeight,
  onPress,
  onHoverIn,
  onHoverOut,
}: {
  occurrence: TimelineOccurrence;
  left: number;
  width: number;
  laneHeight: number;
  onPress: (occurrence: TimelineOccurrence) => void;
  onHoverIn?: (occurrence: TimelineOccurrence) => void;
  onHoverOut?: (occurrence: TimelineOccurrence) => void;
}) {
  if (!occurrence.timeRange) return null;

  const barWidth = Math.max(18, width);
  const laneFrame = getLaneFrame(occurrence, laneHeight);
  const canShowFullLabel =
    barWidth >= MIN_LABELED_BAR_WIDTH && laneFrame.height >= 38;
  const canShowCompactLabel =
    !canShowFullLabel &&
    barWidth >= MIN_COMPACT_LABEL_BAR_WIDTH &&
    laneFrame.height >= 28;

  if (!canShowFullLabel && !canShowCompactLabel) return null;

  if (canShowCompactLabel) {
    return (
      <Pressable
        accessibilityLabel={`Open ${occurrence.title}`}
        onHoverIn={() => onHoverIn?.(occurrence)}
        onHoverOut={() => onHoverOut?.(occurrence)}
        onPress={() => onPress(occurrence)}
        style={[
          styles.timelineRangeCompactLabel,
          {
            top: laneFrame.top + Math.max(4, (laneFrame.height - 26) / 2),
            left,
            width: Math.min(barWidth, 46),
            borderColor: occurrence.color,
          },
        ]}
      >
        <Text numberOfLines={1} style={styles.compactRangeLabelText}>
          {occurrence.title}
        </Text>
      </Pressable>
    );
  }

  const labelWidth = Math.min(barWidth, 280);

  return (
    <Pressable
      accessibilityLabel={`Open ${occurrence.title}`}
      onHoverIn={() => onHoverIn?.(occurrence)}
      onHoverOut={() => onHoverOut?.(occurrence)}
      onPress={() => onPress(occurrence)}
      style={[
        styles.timelineRangeLabelOverlay,
        {
          top: laneFrame.top + 6,
          left,
          width: labelWidth,
          borderColor: occurrence.color,
        },
      ]}
    >
      <Text numberOfLines={2} style={styles.verticalBarTitle}>
        {occurrence.title}
      </Text>
      <Text numberOfLines={1} style={styles.verticalBarLabel}>
        {getRangeLabel(occurrence)}
      </Text>
    </Pressable>
  );
}

function TimelineExactCard({
  occurrence,
  x,
  compact,
  laneHeight,
  onPress,
  onHoverIn,
  onHoverOut,
}: {
  occurrence: TimelineOccurrence;
  x: number;
  compact?: boolean;
  laneHeight: number;
  onPress: (occurrence: TimelineOccurrence) => void;
  onHoverIn?: (occurrence: TimelineOccurrence) => void;
  onHoverOut?: (occurrence: TimelineOccurrence) => void;
}) {
  if (!occurrence.exactDate) return null;

  const laneFrame = getLaneFrame(occurrence, laneHeight);
  const enochDateLabel = occurrence.exactDate.enochDate?.label;
  const validation = occurrence.exactDate.gregorianDate
    ? validateTimelineDate(
        occurrence.exactDate.gregorianDate,
        occurrence.exactDate.enochDate
      )
    : null;

  if (compact) return null;

  return (
    <Pressable
      accessibilityLabel={`Open ${occurrence.title}`}
      onHoverIn={() => onHoverIn?.(occurrence)}
      onHoverOut={() => onHoverOut?.(occurrence)}
      onPress={() => onPress(occurrence)}
      style={[
        styles.timelineVerticalBar,
        {
          top: laneFrame.top,
          left: x - 21,
          width: 42,
          height: laneFrame.height,
          backgroundColor: occurrence.color,
          borderColor: occurrence.color,
        },
      ]}
    >
      <Text numberOfLines={1} style={styles.verticalBarTitle}>
        {occurrence.title}
      </Text>
      <Text numberOfLines={1} style={styles.verticalBarLabel}>
        {occurrence.exactDate.label ??
          `Enoch Year ${occurrence.exactDate.enochDate.enochYear}`}
      </Text>
      {enochDateLabel ? (
        <Text numberOfLines={1} style={styles.verticalBarLabel}>
          {enochDateLabel}
        </Text>
      ) : null}
      {occurrence.exactDate.gregorianDate ? (
        <Text numberOfLines={1} style={styles.verticalBarLabel}>
          {formatHistoricalDate(occurrence.exactDate.gregorianDate)}
        </Text>
      ) : null}
      {validation ? (
        <Text numberOfLines={2} style={styles.verticalBarValidation}>
          {validation.computed?.label ?? validation.message}
        </Text>
      ) : null}
    </Pressable>
  );
}

function TimelineHoverTab({
  occurrence,
  x,
  tabIndex,
  laneHeight,
  onPress,
  onHoverIn,
  onHoverOut,
}: {
  occurrence: TimelineOccurrence;
  x: number;
  tabIndex: number;
  laneHeight: number;
  onPress: (occurrence: TimelineOccurrence) => void;
  onHoverIn: (occurrence: TimelineOccurrence) => void;
  onHoverOut: (occurrence: TimelineOccurrence) => void;
}) {
  const laneFrame = getLaneFrame(occurrence, laneHeight);
  const staggerIndex = tabIndex % 4;

  return (
    <Pressable
      accessibilityLabel={`Preview ${occurrence.title}`}
      onHoverIn={() => onHoverIn(occurrence)}
      onHoverOut={() => onHoverOut(occurrence)}
      onPress={() => onPress(occurrence)}
      style={[
        styles.timelineHoverTab,
        {
          top: laneFrame.top - 7,
          left: x + staggerIndex * 6,
          borderColor: occurrence.color,
          backgroundColor: occurrence.color,
        },
      ]}
    />
  );
}

function EraToggle({
  value,
  onChange,
}: {
  value: "BC" | "AD";
  onChange: (value: "BC" | "AD") => void;
}) {
  return (
    <View style={styles.eraToggle}>
      {(["BC", "AD"] as const).map((era) => {
        const isActive = value === era;

        return (
          <Pressable
            key={era}
            onPress={() => onChange(era)}
            style={[styles.eraButton, isActive ? styles.eraButtonActive : null]}
          >
            <Text
              style={[
                styles.eraButtonText,
                isActive ? styles.eraButtonTextActive : null,
              ]}
            >
              {era}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

function SegmentedSelector<TValue extends string>({
  value,
  options,
  onChange,
  compact = false,
}: {
  value: TValue;
  options: { label: string; value: TValue }[];
  onChange: (value: TValue) => void;
  compact?: boolean;
}) {
  return (
    <View
      style={[
        styles.segmentedControl,
        compact ? styles.segmentedControlCompact : null,
      ]}
    >
      {options.map((option) => {
        const isActive = value === option.value;

        return (
          <Pressable
            key={option.value}
            onPress={() => onChange(option.value)}
            style={[
              styles.segmentButton,
              compact ? styles.segmentButtonCompact : null,
              isActive ? styles.segmentButtonActive : null,
            ]}
          >
            <Text
              style={[
                styles.segmentButtonText,
                compact ? styles.segmentButtonTextCompact : null,
                isActive ? styles.segmentButtonTextActive : null,
              ]}
            >
              {option.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

function FormField({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType,
  multiline,
}: {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  placeholder?: string;
  keyboardType?: "default" | "numeric";
  multiline?: boolean;
}) {
  const inputPlaceholder = placeholder ?? label;

  return (
    <View style={styles.formField}>
      <TextInput
        accessibilityLabel={label}
        value={value}
        onChangeText={onChangeText}
        placeholder={inputPlaceholder}
        placeholderTextColor="#6b7280"
        keyboardType={keyboardType}
        multiline={multiline}
        style={[styles.formInput, multiline ? styles.formTextArea : null]}
      />
    </View>
  );
}

function normalizeHexColor(value: string) {
  return /^#[0-9a-fA-F]{6}$/.test(value.trim()) ? value.trim() : "#2563eb";
}

function stringifyOptionalNumber(value?: number) {
  return typeof value === "number" ? String(value) : "";
}

function clampTimelineLane(lane: number) {
  if (!Number.isFinite(lane)) return 0;

  return Math.max(0, Math.min(MAX_TIMELINE_LANE, Math.round(lane)));
}

function ColorField({
  value,
  onChangeText,
}: {
  value: string;
  onChangeText: (value: string) => void;
}) {
  const colorValue = normalizeHexColor(value);

  return (
    <View style={styles.formField}>
      <View style={styles.colorPickerRow}>
        <View
          style={[
            styles.colorPreview,
            {
              backgroundColor: colorValue,
            },
          ]}
        />

        {Platform.OS === "web"
          ? createElement("input", {
              type: "color",
              value: colorValue,
              onChange: (event: any) => onChangeText(event.target.value),
              style: {
                width: 42,
                height: 42,
                padding: 0,
                border: "none",
                background: "transparent",
                cursor: "pointer",
              },
              "aria-label": "Choose timeline entry color",
            })
          : null}

        <TextInput
          accessibilityLabel="Timeline entry color"
          value={value}
          onChangeText={onChangeText}
          placeholder="Color #2563eb"
          placeholderTextColor="#6b7280"
          autoCapitalize="none"
          style={[styles.formInput, styles.colorHexInput]}
        />
      </View>

      <View style={styles.colorSwatchRow}>
        {COLOR_SWATCHES.map((swatch) => (
          <Pressable
            key={swatch}
            accessibilityLabel={`Use color ${swatch}`}
            onPress={() => onChangeText(swatch)}
            style={[
              styles.colorSwatch,
              {
                backgroundColor: swatch,
                borderColor: colorValue === swatch ? "#111827" : "#ffffff",
              },
            ]}
          />
        ))}
      </View>
    </View>
  );
}

function SectionToggle({
  label,
  value,
  onValueChange,
}: {
  label: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
}) {
  return (
    <View style={styles.sectionToggle}>
      <Text style={styles.sectionToggleText}>{label}</Text>
      <Switch value={value} onValueChange={onValueChange} />
    </View>
  );
}

type HistoryTimelineViewProps = {
  adminToken: string;
  groupCode: string;
  userRole: "member" | "admin";
  selectedOccurrence: TimelineOccurrence | null;
  isEditMode: boolean;
  addRequestId: number;
  editRequestId: number;
  onSelectedOccurrenceChange: (occurrence: TimelineOccurrence | null) => void;
  onSavingChange: (isSaving: boolean) => void;
};

/**
 * Creates a horizontally swipeable history chart.
 * This UX component renders timeline occurrences as range bars, exact-date cards, or both.
 */
export default function HistoryTimelineView({
  adminToken,
  groupCode,
  userRole,
  selectedOccurrence,
  isEditMode,
  addRequestId,
  editRequestId,
  onSelectedOccurrenceChange,
  onSavingChange,
}: HistoryTimelineViewProps) {
  const { width } = useWindowDimensions();
  const isCompactTimeline = width < 520;
  const [timelineZoom, setTimelineZoom] = useState<TimelineZoomId>("years-250");
  const [timelineScrollX, setTimelineScrollX] = useState(0);
  const [laneHeightIndex, setLaneHeightIndex] = useState(0);
  const [hoveredOccurrence, setHoveredOccurrence] =
    useState<TimelineOccurrence | null>(null);
  const contentWidth = getTimelineContentWidth(width, timelineZoom);
  const currentTimelineZoom = getTimelineZoomConfig(timelineZoom);
  const currentTimelineZoomIndex = Math.max(
    0,
    TIMELINE_ZOOM_LEVELS.findIndex((zoomLevel) => zoomLevel.id === timelineZoom)
  );
  const timelineLaneHeight =
    TIMELINE_LANE_HEIGHTS[laneHeightIndex] ?? BASE_LANE_HEIGHT;
  const timelineTrackHeight = timelineLaneHeight * TIMELINE_LANE_COUNT;
  const timelineAxisTop = TRACK_TOP + timelineTrackHeight + 8;
  const canShowHoverPreview = Platform.OS === "web" && !isCompactTimeline;
  const hoverPreviewLeft = Math.min(
    Math.max(TIMELINE_SIDE_GUTTER, timelineScrollX + TIMELINE_SIDE_GUTTER),
    Math.max(
      TIMELINE_SIDE_GUTTER,
      contentWidth - HOVER_PREVIEW_WIDTH - TIMELINE_SIDE_GUTTER
    )
  );
  const canDecreaseLaneHeight = laneHeightIndex > 0;
  const canIncreaseLaneHeight =
    laneHeightIndex < TIMELINE_LANE_HEIGHTS.length - 1;
  const timelineScrollRef = useRef<ScrollView>(null);
  const canManageTimeline =
    userRole === "admin" &&
    groupCode === "church-of-the-word" &&
    Boolean(adminToken);
  const [timelineOccurrences, setTimelineOccurrences] = useState(
    HISTORY_TIMELINE_OCCURRENCES
  );
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [editingOccurrence, setEditingOccurrence] =
    useState<TimelineOccurrence | null>(null);
  const [isSavingTimeline, setIsSavingTimeline] = useState(false);
  const [formState, setFormState] =
    useState<TimelineEntryFormState>(DEFAULT_FORM_STATE);
  const visibleOccurrences = timelineOccurrences.filter(
    (occurrence) => occurrence.showOnTimeline
  );
  const axisTicks = useMemo(
    () =>
      getVisibleTimelineAxisTicks({
        zoomId: timelineZoom,
        scrollX: timelineScrollX,
        viewportWidth: width,
        contentWidth,
      }),
    [contentWidth, timelineScrollX, timelineZoom, width]
  );

  useEffect(() => {
    let isMounted = true;

    async function loadTimelineOccurrences() {
      try {
        const response = await fetch(apiUrl("/timeline/occurrences"), {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Failed to load timeline occurrences.");
        }

        const occurrences = await response.json();

        if (isMounted && Array.isArray(occurrences)) {
          setTimelineOccurrences(occurrences);
        }
      } catch (error) {
        console.log("Failed to load timeline occurrences", error);
      }
    }

    loadTimelineOccurrences();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    onSavingChange(isSavingTimeline);
  }, [isSavingTimeline, onSavingChange]);

  useEffect(() => {
    if (!canShowHoverPreview) {
      setHoveredOccurrence(null);
    }
  }, [canShowHoverPreview]);

  useEffect(() => {
    if (addRequestId > 0) {
      handleAddTimelineEntry();
    }
  }, [addRequestId]);

  useEffect(() => {
    if (editRequestId > 0 && selectedOccurrence) {
      editTimelineEntry(selectedOccurrence);
    }
  }, [editRequestId]);

  async function saveTimelineOccurrences(
    nextOccurrences: TimelineOccurrence[]
  ) {
    if (!canManageTimeline) {
      Alert.alert(
        "Timeline Admin Required",
        "Only the church-of-the-word admin can change timeline entries."
      );
      return;
    }

    setIsSavingTimeline(true);

    try {
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${adminToken}`,
      };

      const response = await fetch(apiUrl("/timeline/occurrences"), {
        method: "POST",
        cache: "no-store",
        headers,
        body: JSON.stringify(nextOccurrences),
      });

      if (!response.ok) {
        throw new Error("Failed to save timeline occurrences.");
      }

      const savedOccurrences = await response.json();

      if (Array.isArray(savedOccurrences)) {
        setTimelineOccurrences(savedOccurrences);
      }
    } catch (error) {
      console.log("Failed to save timeline occurrences", error);
      Alert.alert(
        "Timeline Save Failed",
        "The timeline entry changed locally, but it could not be saved to the API."
      );
    } finally {
      setIsSavingTimeline(false);
    }
  }

  function updateForm(nextValues: Partial<TimelineEntryFormState>) {
    setFormState((current) => ({ ...current, ...nextValues }));
  }

  function getFormStateFromOccurrence(
    occurrence: TimelineOccurrence
  ): TimelineEntryFormState {
    return {
      ...DEFAULT_FORM_STATE,
      title: occurrence.title,
      summary: occurrence.summary ?? "",
      notes: occurrence.notes ?? "",
      color: occurrence.color,
      level: String(clampTimelineLane(occurrence.lane)),
      lanePart: occurrence.lanePart ?? "both",
      exactEnochYear: stringifyOptionalNumber(
        occurrence.exactDate?.enochDate.enochYear
      ),
      exactEnochMonth: stringifyOptionalNumber(
        occurrence.exactDate?.enochDate.month
      ),
      exactEnochDay: stringifyOptionalNumber(
        occurrence.exactDate?.enochDate.day
      ),
      exactGregorianYear: stringifyOptionalNumber(
        occurrence.exactDate?.gregorianDate?.year
      ),
      exactGregorianEra: occurrence.exactDate?.gregorianDate?.era ?? "AD",
      exactGregorianMonth: stringifyOptionalNumber(
        occurrence.exactDate?.gregorianDate?.month
      ),
      exactGregorianDay: stringifyOptionalNumber(
        occurrence.exactDate?.gregorianDate?.day
      ),
      rangeEnochYear: stringifyOptionalNumber(
        occurrence.timeRange?.start.enochYear
      ),
      rangeEnochMonth: stringifyOptionalNumber(
        occurrence.timeRange?.start.enochMonth
      ),
      rangeEnochDay: stringifyOptionalNumber(
        occurrence.timeRange?.start.enochDay
      ),
      rangeDurationDays: stringifyOptionalNumber(
        occurrence.timeRange?.durationDays
      ),
    };
  }

  function handleAddTimelineEntry() {
    if (!canManageTimeline) {
      Alert.alert(
        "Timeline Admin Required",
        "Only the church-of-the-word admin can add timeline entries."
      );
      return;
    }

    setEditingOccurrence(null);
    setFormState(DEFAULT_FORM_STATE);
    setIsAddModalVisible(true);
  }

  function closeAddModal() {
    setIsAddModalVisible(false);
    setEditingOccurrence(null);
    setFormState(DEFAULT_FORM_STATE);
  }

  function handleTimelineScroll(
    event: NativeSyntheticEvent<NativeScrollEvent>
  ) {
    setTimelineScrollX(event.nativeEvent.contentOffset.x);
  }

  function handleTimelineEntryHoverIn(occurrence: TimelineOccurrence) {
    if (!canShowHoverPreview) return;

    setHoveredOccurrence(occurrence);
  }

  function handleTimelineEntryHoverOut(occurrence: TimelineOccurrence) {
    if (!canShowHoverPreview) return;

    setHoveredOccurrence((currentOccurrence) =>
      currentOccurrence?.id === occurrence.id ? null : currentOccurrence
    );
  }

  function handleTimelineZoomChange(nextZoom: TimelineZoomId) {
    const currentCenterValue = getTimelineValueFromPosition(
      timelineScrollX + width / 2,
      contentWidth
    );
    const nextContentWidth = getTimelineContentWidth(width, nextZoom);
    const nextCenterX = getTimelineValuePosition(
      currentCenterValue,
      nextContentWidth
    );
    const nextScrollX = Math.max(0, nextCenterX - width / 2);

    setTimelineZoom(nextZoom);
    setTimelineScrollX(nextScrollX);

    setTimeout(() => {
      timelineScrollRef.current?.scrollTo({
        x: nextScrollX,
        animated: false,
      });
    }, 0);
  }

  function stepTimelineZoom(direction: -1 | 1) {
    const nextZoomIndex =
      (currentTimelineZoomIndex + direction + TIMELINE_ZOOM_LEVELS.length) %
      TIMELINE_ZOOM_LEVELS.length;

    handleTimelineZoomChange(TIMELINE_ZOOM_LEVELS[nextZoomIndex].id);
  }

  function stepLaneHeight(direction: -1 | 1) {
    setLaneHeightIndex((currentIndex) =>
      Math.max(
        0,
        Math.min(TIMELINE_LANE_HEIGHTS.length - 1, currentIndex + direction)
      )
    );
  }

  function handleSelectOccurrence(occurrence: TimelineOccurrence) {
    if (isEditMode && canManageTimeline) {
      onSelectedOccurrenceChange(null);
      setEditingOccurrence(occurrence);
      setFormState(getFormStateFromOccurrence(occurrence));
      setIsAddModalVisible(true);
      return;
    }

    onSelectedOccurrenceChange(occurrence);
  }

  function editTimelineEntry(occurrence: TimelineOccurrence) {
    if (!canManageTimeline) return;

    setEditingOccurrence(occurrence);
    setFormState(getFormStateFromOccurrence(occurrence));
    setIsAddModalVisible(true);
  }

  function getOccurrenceCenterX(occurrence: TimelineOccurrence) {
    if (occurrence.exactDate) {
      return getEnochYearPosition(
        {
          enochYear: occurrence.exactDate.enochDate.enochYear,
          month: occurrence.exactDate.enochDate.month,
          day: occurrence.exactDate.enochDate.day,
        },
        contentWidth
      );
    }

    if (occurrence.timeRange) {
      const { start } = occurrence.timeRange;
      const rangeEnd = getResolvedRangeEnd(occurrence);

      if (rangeEnd) {
        const left = getEnochYearPosition(
          {
            enochYear: start.enochYear,
            month: start.enochMonth,
            day: start.enochDay,
          },
          contentWidth
        );
        const right = getEnochYearPosition(
          { enochYear: rangeEnd },
          contentWidth
        );

        return left + (right - left) / 2;
      }
    }

    return null;
  }

  function centerTimelineOnOccurrence(occurrence: TimelineOccurrence) {
    const centerX = getOccurrenceCenterX(occurrence);
    if (centerX === null) return;

    const viewportWidth = Math.min(width, contentWidth);
    const maxScrollX = Math.max(0, contentWidth - viewportWidth);
    const nextScrollX = Math.max(
      0,
      Math.min(maxScrollX, centerX - viewportWidth / 2)
    );

    setTimeout(() => {
      timelineScrollRef.current?.scrollTo({
        x: nextScrollX,
        animated: true,
      });
    }, 120);
  }

  function deleteTimelineEntry(occurrenceId: string) {
    if (!canManageTimeline) {
      Alert.alert(
        "Timeline Admin Required",
        "Only the church-of-the-word admin can delete timeline entries."
      );
      return;
    }

    const nextOccurrences = timelineOccurrences.filter(
      (occurrence) => occurrence.id !== occurrenceId
    );

    setTimelineOccurrences(nextOccurrences);
    onSelectedOccurrenceChange(null);
    setEditingOccurrence(null);
    setIsAddModalVisible(false);
    void saveTimelineOccurrences(nextOccurrences);
  }

  function confirmDeleteTimelineEntry(occurrence: TimelineOccurrence) {
    if (typeof window !== "undefined" && typeof window.confirm === "function") {
      const confirmed = window.confirm(
        `Delete "${occurrence.title}" from the timeline?`
      );

      if (confirmed) {
        deleteTimelineEntry(occurrence.id);
      }

      return;
    }

    Alert.alert(
      "Delete Timeline Entry?",
      `Delete "${occurrence.title}" from the timeline?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => deleteTimelineEntry(occurrence.id),
        },
      ]
    );
  }

  function saveTimelineEntry() {
    if (!canManageTimeline) {
      Alert.alert(
        "Timeline Admin Required",
        "Only the church-of-the-word admin can add timeline entries."
      );
      return;
    }

    const title = formState.title.trim();

    if (!title) {
      Alert.alert("Title Required", "Add a title before saving this entry.");
      return;
    }

    const color = formState.color.trim() || "#2563eb";
    const hasExactDateInput = [
      formState.exactEnochYear,
      formState.exactEnochMonth,
      formState.exactEnochDay,
      formState.exactGregorianYear,
      formState.exactGregorianMonth,
      formState.exactGregorianDay,
    ].some((value) => value.trim());
    const hasRangeInput = [
      formState.rangeEnochYear,
      formState.rangeEnochMonth,
      formState.rangeEnochDay,
      formState.rangeDurationDays,
    ].some((value) => value.trim());

    if (!hasExactDateInput && !hasRangeInput) {
      Alert.alert(
        "Date Required",
        "Add an exact date, a time range, or both before saving this entry."
      );
      return;
    }

    const nextOccurrence: TimelineOccurrence = {
      ...(editingOccurrence ?? {}),
      id: editingOccurrence?.id ?? `timeline-${Date.now()}`,
      title,
      summary: formState.summary.trim() || undefined,
      notes: formState.notes.trim() || undefined,
      lane: clampTimelineLane(Number(formState.level)),
      lanePart: formState.lanePart,
      color,
      colorFeature: {
        primary: color,
      },
      showOnTimeline: true,
      showOnCalendar: false,
    };

    if (hasExactDateInput) {
      const exactEnochYear = parseRequiredNumber(formState.exactEnochYear);
      const exactEnochMonth = parseRequiredNumber(formState.exactEnochMonth);
      const exactEnochDay = parseRequiredNumber(formState.exactEnochDay);

      if (
        exactEnochYear === null ||
        exactEnochMonth === null ||
        exactEnochDay === null
      ) {
        Alert.alert(
          "Exact Enoch Date Required",
          "Add exact Enoch year, month, and day."
        );
        return;
      }

      const exactGregorianYear = parseOptionalNumber(
        formState.exactGregorianYear
      );
      const exactGregorianMonth = parseOptionalNumber(
        formState.exactGregorianMonth
      );
      const exactGregorianDay = parseOptionalNumber(
        formState.exactGregorianDay
      );

      nextOccurrence.exactDate = {
        precision: "traditional",
        enochDate: {
          enochYear: exactEnochYear,
          month: exactEnochMonth,
          day: exactEnochDay,
          label: `Enoch Year ${exactEnochYear}, Month ${exactEnochMonth}, Day ${exactEnochDay}`,
        },
        gregorianDate: exactGregorianYear
          ? {
              year: exactGregorianYear,
              era: formState.exactGregorianEra,
              month: exactGregorianMonth,
              day: exactGregorianDay,
            }
          : undefined,
      };
    }

    if (hasRangeInput) {
      const enochYear = parseRequiredNumber(formState.rangeEnochYear);
      const enochMonth = parseRequiredNumber(formState.rangeEnochMonth);
      const enochDay = parseRequiredNumber(formState.rangeEnochDay);
      const durationDays = parseRequiredNumber(formState.rangeDurationDays);

      if (
        enochYear === null ||
        enochMonth === null ||
        enochDay === null ||
        durationDays === null
      ) {
        Alert.alert(
          "Range Fields Required",
          "Add range Enoch year, start month/day, and duration days."
        );
        return;
      }

      nextOccurrence.timeRange = {
        start: {
          enochYear,
          enochMonth,
          enochDay,
        },
        durationDays,
        precision: "traditional",
      };
    }

    const nextOccurrences = editingOccurrence
      ? timelineOccurrences.map((occurrence) =>
          occurrence.id === editingOccurrence.id ? nextOccurrence : occurrence
        )
      : [...timelineOccurrences, nextOccurrence];

    setTimelineOccurrences(nextOccurrences);
    setFormState(DEFAULT_FORM_STATE);
    setEditingOccurrence(null);
    setIsAddModalVisible(false);
    centerTimelineOnOccurrence(nextOccurrence);
    void saveTimelineOccurrences(nextOccurrences);
  }

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.timelineToolbar,
          isCompactTimeline ? styles.timelineToolbarCompact : null,
        ]}
      >
        <Text style={styles.toolbarLabel}>Scale</Text>
        <View style={styles.scaleStepper}>
          <Pressable
            onPress={() => stepTimelineZoom(-1)}
            accessibilityRole="button"
            accessibilityLabel="Previous timeline scale"
            style={({ pressed }) => [
              styles.scaleStepperButton,
              pressed ? styles.scaleStepperButtonPressed : null,
            ]}
          >
            <MaterialIcons name="chevron-left" size={22} color="#334155" />
          </Pressable>

          <Text numberOfLines={1} style={styles.scaleStepperLabel}>
            {currentTimelineZoom.label}
          </Text>

          <Pressable
            onPress={() => stepTimelineZoom(1)}
            accessibilityRole="button"
            accessibilityLabel="Next timeline scale"
            style={({ pressed }) => [
              styles.scaleStepperButton,
              pressed ? styles.scaleStepperButtonPressed : null,
            ]}
          >
            <MaterialIcons name="chevron-right" size={22} color="#334155" />
          </Pressable>
        </View>

        <Text style={styles.toolbarLabel}>Height</Text>
        <View style={styles.heightStepper}>
          <Pressable
            onPress={() => stepLaneHeight(-1)}
            disabled={!canDecreaseLaneHeight}
            accessibilityRole="button"
            accessibilityLabel="Decrease timeline bar height"
            style={({ pressed }) => [
              styles.scaleStepperButton,
              !canDecreaseLaneHeight ? styles.stepperButtonDisabled : null,
              pressed && canDecreaseLaneHeight
                ? styles.scaleStepperButtonPressed
                : null,
            ]}
          >
            <MaterialIcons
              name="keyboard-arrow-down"
              size={22}
              color="#334155"
            />
          </Pressable>

          <Text numberOfLines={1} style={styles.heightStepperLabel}>
            {`${laneHeightIndex + 1}/${TIMELINE_LANE_HEIGHTS.length}`}
          </Text>

          <Pressable
            onPress={() => stepLaneHeight(1)}
            disabled={!canIncreaseLaneHeight}
            accessibilityRole="button"
            accessibilityLabel="Increase timeline bar height"
            style={({ pressed }) => [
              styles.scaleStepperButton,
              !canIncreaseLaneHeight ? styles.stepperButtonDisabled : null,
              pressed && canIncreaseLaneHeight
                ? styles.scaleStepperButtonPressed
                : null,
            ]}
          >
            <MaterialIcons name="keyboard-arrow-up" size={22} color="#334155" />
          </Pressable>
        </View>
      </View>

      <ScrollView
        ref={timelineScrollRef}
        horizontal
        showsHorizontalScrollIndicator
        scrollEventThrottle={32}
        onScroll={handleTimelineScroll}
        contentContainerStyle={styles.scrollContent}
      >
        <View
          style={[
            styles.timelineCanvas,
            {
              width: contentWidth,
              height: TRACK_TOP + timelineTrackHeight + 84,
            },
          ]}
        >
          <View style={[styles.axisLine, { top: timelineAxisTop }]} />

          {axisTicks.map((tick) => (
            <View
              key={tick.key}
              style={[
                styles.axisMarker,
                { left: tick.x, top: timelineAxisTop },
              ]}
            >
              <View
                style={[
                  styles.axisTick,
                  tick.major ? styles.axisTickMajor : styles.axisTickMinor,
                ]}
              />
              <Text
                numberOfLines={1}
                style={[
                  styles.axisLabel,
                  tick.major ? styles.axisLabelMajor : styles.axisLabelMinor,
                ]}
              >
                {tick.label}
              </Text>
            </View>
          ))}

          {visibleOccurrences.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateTitle}>
                No timeline entries yet
              </Text>
              <Text style={styles.emptyStateText}>
                Use the add button to begin building this history view.
              </Text>
            </View>
          ) : null}

          {visibleOccurrences.map((occurrence) => {
            if (!occurrence.timeRange) return null;

            const rangeEnd = getResolvedRangeEnd(occurrence);
            const { start } = occurrence.timeRange;
            if (!rangeEnd) return null;

            const left = getEnochYearPosition(
              {
                enochYear: start.enochYear,
                month: start.enochMonth,
                day: start.enochDay,
              },
              contentWidth
            );
            const right = getEnochYearPosition(
              { enochYear: rangeEnd },
              contentWidth
            );

            return (
              <TimelineRangeBar
                key={`${occurrence.id}-range`}
                occurrence={occurrence}
                left={left}
                width={right - left}
                laneHeight={timelineLaneHeight}
                onPress={handleSelectOccurrence}
                onHoverIn={handleTimelineEntryHoverIn}
                onHoverOut={handleTimelineEntryHoverOut}
              />
            );
          })}

          {visibleOccurrences.map((occurrence) => {
            if (!occurrence.exactDate) return null;

            return (
              <TimelineExactCard
                key={`${occurrence.id}-exact`}
                occurrence={occurrence}
                x={getEnochYearPosition(
                  {
                    enochYear: occurrence.exactDate.enochDate.enochYear,
                    month: occurrence.exactDate.enochDate.month,
                    day: occurrence.exactDate.enochDate.day,
                  },
                  contentWidth
                )}
                compact={Boolean(occurrence.timeRange)}
                laneHeight={timelineLaneHeight}
                onPress={handleSelectOccurrence}
                onHoverIn={handleTimelineEntryHoverIn}
                onHoverOut={handleTimelineEntryHoverOut}
              />
            );
          })}

          {visibleOccurrences.map((occurrence) => {
            if (!occurrence.timeRange) return null;

            const rangeEnd = getResolvedRangeEnd(occurrence);
            const { start } = occurrence.timeRange;
            if (!rangeEnd) return null;

            const left = getEnochYearPosition(
              {
                enochYear: start.enochYear,
                month: start.enochMonth,
                day: start.enochDay,
              },
              contentWidth
            );
            const right = getEnochYearPosition(
              { enochYear: rangeEnd },
              contentWidth
            );

            return (
              <TimelineRangeLabelOverlay
                key={`${occurrence.id}-range-label`}
                occurrence={occurrence}
                left={left}
                width={right - left}
                laneHeight={timelineLaneHeight}
                onPress={handleSelectOccurrence}
                onHoverIn={handleTimelineEntryHoverIn}
                onHoverOut={handleTimelineEntryHoverOut}
              />
            );
          })}

          {canShowHoverPreview
            ? visibleOccurrences.map((occurrence, index) => {
                let tabX: number | null = null;

                if (occurrence.timeRange) {
                  const { start } = occurrence.timeRange;
                  tabX = getEnochYearPosition(
                    {
                      enochYear: start.enochYear,
                      month: start.enochMonth,
                      day: start.enochDay,
                    },
                    contentWidth
                  );
                } else if (occurrence.exactDate) {
                  tabX =
                    getEnochYearPosition(
                      {
                        enochYear: occurrence.exactDate.enochDate.enochYear,
                        month: occurrence.exactDate.enochDate.month,
                        day: occurrence.exactDate.enochDate.day,
                      },
                      contentWidth
                    ) -
                    TIMELINE_HOVER_TAB_WIDTH / 2;
                }

                if (tabX === null) return null;

                return (
                  <TimelineHoverTab
                    key={`${occurrence.id}-hover-tab`}
                    occurrence={occurrence}
                    x={tabX}
                    tabIndex={index}
                    laneHeight={timelineLaneHeight}
                    onPress={handleSelectOccurrence}
                    onHoverIn={handleTimelineEntryHoverIn}
                    onHoverOut={handleTimelineEntryHoverOut}
                  />
                );
              })
            : null}

          {canShowHoverPreview && hoveredOccurrence ? (
            <View
              pointerEvents="none"
              style={[
                styles.timelineHoverPreview,
                {
                  left: hoverPreviewLeft,
                  borderColor: hoveredOccurrence.color,
                },
              ]}
            >
              <View
                style={[
                  styles.timelineHoverPreviewSwatch,
                  { backgroundColor: hoveredOccurrence.color },
                ]}
              />
              <View style={styles.timelineHoverPreviewText}>
                <Text numberOfLines={1} style={styles.timelineHoverTitle}>
                  {hoveredOccurrence.title}
                </Text>
                <Text numberOfLines={2} style={styles.timelineHoverLabel}>
                  {getTimelineOccurrencePreviewLabel(hoveredOccurrence)}
                </Text>
              </View>
            </View>
          ) : null}
        </View>
      </ScrollView>

      <Modal
        animationType="slide"
        transparent
        visible={isAddModalVisible}
        onRequestClose={closeAddModal}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalPanel}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {editingOccurrence
                  ? "Edit Timeline Entry"
                  : "Add Timeline Entry"}
              </Text>
              <Pressable
                accessibilityLabel="Close timeline entry form"
                onPress={closeAddModal}
                style={styles.modalIconButton}
              >
                <MaterialIcons name="close" size={22} color="#374151" />
              </Pressable>
            </View>

            <ScrollView contentContainerStyle={styles.modalContent}>
              <FormField
                label="Title"
                value={formState.title}
                onChangeText={(title) => updateForm({ title })}
                placeholder="Event name"
              />
              <FormField
                label="Summary"
                value={formState.summary}
                onChangeText={(summary) => updateForm({ summary })}
                placeholder="Short description"
              />
              <FormField
                label="Notes"
                value={formState.notes}
                onChangeText={(notes) => updateForm({ notes })}
                placeholder="Longer notes"
                multiline
              />
              <ColorField
                value={formState.color}
                onChangeText={(color) => updateForm({ color })}
              />

              <View style={styles.formField}>
                <Text style={styles.formLabel}>Row</Text>
                <SegmentedSelector
                  value={formState.level}
                  options={TIMELINE_LANE_OPTIONS}
                  onChange={(level) => updateForm({ level })}
                  compact
                />
              </View>

              <View style={styles.formField}>
                <Text style={styles.formLabel}>Row Area</Text>
                <SegmentedSelector
                  value={formState.lanePart}
                  options={[
                    { label: "Both", value: "both" },
                    { label: "Top Half", value: "top" },
                    { label: "Bottom Half", value: "bottom" },
                  ]}
                  onChange={(lanePart) => updateForm({ lanePart })}
                />
              </View>

              <View style={styles.formSection}>
                <Text style={styles.formSectionTitle}>Exact Date</Text>
                <View style={styles.formRow}>
                  <FormField
                    label="Exact Enoch Year"
                    value={formState.exactEnochYear}
                    onChangeText={(exactEnochYear) =>
                      updateForm({ exactEnochYear })
                    }
                    keyboardType="numeric"
                  />
                  <FormField
                    label="Exact Enoch Month"
                    value={formState.exactEnochMonth}
                    onChangeText={(exactEnochMonth) =>
                      updateForm({ exactEnochMonth })
                    }
                    keyboardType="numeric"
                  />
                </View>

                <View style={styles.formRow}>
                  <FormField
                    label="Exact Enoch Day"
                    value={formState.exactEnochDay}
                    onChangeText={(exactEnochDay) =>
                      updateForm({ exactEnochDay })
                    }
                    keyboardType="numeric"
                  />
                </View>

                <Text style={styles.formSubsectionTitle}>
                  Optional Gregorian Label
                </Text>

                <View style={styles.formRow}>
                  <FormField
                    label="Gregorian Year"
                    value={formState.exactGregorianYear}
                    onChangeText={(exactGregorianYear) =>
                      updateForm({ exactGregorianYear })
                    }
                    keyboardType="numeric"
                  />
                  <View style={styles.formField}>
                    <Text style={styles.formLabel}>Era</Text>
                    <EraToggle
                      value={formState.exactGregorianEra}
                      onChange={(exactGregorianEra) =>
                        updateForm({ exactGregorianEra })
                      }
                    />
                  </View>
                </View>

                <View style={styles.formRow}>
                  <FormField
                    label="Gregorian Month"
                    value={formState.exactGregorianMonth}
                    onChangeText={(exactGregorianMonth) =>
                      updateForm({ exactGregorianMonth })
                    }
                    keyboardType="numeric"
                  />
                  <FormField
                    label="Gregorian Day"
                    value={formState.exactGregorianDay}
                    onChangeText={(exactGregorianDay) =>
                      updateForm({ exactGregorianDay })
                    }
                    keyboardType="numeric"
                  />
                </View>
              </View>

              <View style={styles.formSection}>
                <Text style={styles.formSectionTitle}>Time Range</Text>
                <View style={styles.formRow}>
                  <FormField
                    label="Range Enoch Year"
                    value={formState.rangeEnochYear}
                    onChangeText={(rangeEnochYear) =>
                      updateForm({ rangeEnochYear })
                    }
                    keyboardType="numeric"
                  />
                  <FormField
                    label="Duration Days"
                    value={formState.rangeDurationDays}
                    onChangeText={(rangeDurationDays) =>
                      updateForm({ rangeDurationDays })
                    }
                    keyboardType="numeric"
                  />
                </View>

                <View style={styles.formRow}>
                  <FormField
                    label="Start Enoch Month"
                    value={formState.rangeEnochMonth}
                    onChangeText={(rangeEnochMonth) =>
                      updateForm({ rangeEnochMonth })
                    }
                    keyboardType="numeric"
                  />
                  <FormField
                    label="Start Enoch Day"
                    value={formState.rangeEnochDay}
                    onChangeText={(rangeEnochDay) =>
                      updateForm({ rangeEnochDay })
                    }
                    keyboardType="numeric"
                  />
                </View>
              </View>
            </ScrollView>

            <View style={styles.modalFooter}>
              {editingOccurrence ? (
                <Pressable
                  onPress={() => confirmDeleteTimelineEntry(editingOccurrence)}
                  style={styles.deleteEntryButton}
                >
                  <MaterialIcons
                    name="delete-outline"
                    size={18}
                    color="#991b1b"
                  />
                  <Text style={styles.deleteEntryButtonText}>Delete</Text>
                </Pressable>
              ) : null}
              <Pressable onPress={closeAddModal} style={styles.cancelButton}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </Pressable>
              <Pressable onPress={saveTimelineEntry} style={styles.saveButton}>
                <Text style={styles.saveButtonText}>
                  {editingOccurrence ? "Save Changes" : "Add Entry"}
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 4,
    marginBottom: 24,
    padding: 16,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 20,
    backgroundColor: "#f9fafb",
  },
  timelineToolbar: {
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 10,
  },
  timelineToolbarCompact: {
    justifyContent: "flex-start",
    flexWrap: "wrap",
  },
  toolbarLabel: {
    fontSize: 12,
    fontWeight: "900",
    color: "#4b5563",
    textTransform: "uppercase",
  },
  scaleStepper: {
    minHeight: 42,
    borderRadius: 8,
    backgroundColor: "#e5e7eb",
    flexDirection: "row",
    alignItems: "center",
    padding: 3,
  },
  scaleStepperButton: {
    width: 36,
    height: 36,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  scaleStepperButtonPressed: {
    backgroundColor: "#d1d5db",
  },
  scaleStepperLabel: {
    minWidth: 128,
    paddingHorizontal: 10,
    fontSize: 13,
    fontWeight: "900",
    color: "#081a33",
    textAlign: "center",
  },
  heightStepper: {
    minHeight: 42,
    borderRadius: 8,
    backgroundColor: "#e5e7eb",
    flexDirection: "row",
    alignItems: "center",
    padding: 3,
  },
  heightStepperLabel: {
    minWidth: 34,
    paddingHorizontal: 6,
    fontSize: 12,
    fontWeight: "900",
    color: "#081a33",
    textAlign: "center",
  },
  stepperButtonDisabled: {
    opacity: 0.38,
  },
  scrollContent: {
    paddingVertical: 4,
  },
  timelineCanvas: {
    height: TRACK_TOP + TRACK_HEIGHT + 84,
    position: "relative",
  },
  axisLine: {
    position: "absolute",
    left: TIMELINE_SIDE_GUTTER,
    right: TIMELINE_SIDE_GUTTER,
    top: TRACK_TOP + TRACK_HEIGHT + 8,
    height: 2,
    backgroundColor: "#111827",
  },
  axisMarker: {
    position: "absolute",
    top: TRACK_TOP + TRACK_HEIGHT + 8,
    alignItems: "center",
  },
  axisTick: {
    width: 2,
    backgroundColor: "#111827",
  },
  axisTickMajor: {
    height: 14,
  },
  axisTickMinor: {
    height: 8,
    backgroundColor: "#9ca3af",
  },
  axisLabel: {
    marginTop: 6,
    fontWeight: "800",
  },
  axisLabelMajor: {
    fontSize: 11,
    color: "#374151",
  },
  axisLabelMinor: {
    fontSize: 9,
    color: "#6b7280",
  },
  emptyState: {
    position: "absolute",
    top: TRACK_TOP + 82,
    left: TIMELINE_SIDE_GUTTER,
    width: 260,
    padding: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#d1d5db",
    backgroundColor: "#ffffff",
  },
  emptyStateTitle: {
    fontSize: 15,
    fontWeight: "900",
    color: "#111827",
  },
  emptyStateText: {
    marginTop: 4,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "600",
    color: "#4b5563",
  },
  rangeBar: {
    position: "absolute",
    minHeight: 38,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 8,
    borderWidth: 2,
    backgroundColor: "#ffffff",
    overflow: "hidden",
  },
  rangeFill: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    opacity: 0.14,
  },
  rangeTitle: {
    paddingRight: 24,
    fontSize: 12,
    fontWeight: "900",
    color: "#111827",
  },
  rangeLabel: {
    marginTop: 2,
    fontSize: 11,
    fontWeight: "800",
    color: "#4b5563",
  },
  timelineVerticalBar: {
    position: "absolute",
    minWidth: 18,
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    justifyContent: "flex-end",
    overflow: "hidden",
  },
  timelineRangeLabelOverlay: {
    position: "absolute",
    minHeight: 38,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    backgroundColor: "rgba(15, 23, 42, 0.88)",
    shadowColor: "#000000",
    shadowOpacity: 0.22,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    zIndex: 10,
  },
  timelineRangeCompactLabel: {
    position: "absolute",
    height: 26,
    paddingHorizontal: 5,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(15, 23, 42, 0.9)",
    zIndex: 10,
  },
  compactRangeLabelText: {
    fontSize: 9,
    lineHeight: 11,
    fontWeight: "900",
    color: "#ffffff",
  },
  timelineHoverPreview: {
    position: "absolute",
    top: 14,
    width: HOVER_PREVIEW_WIDTH,
    minHeight: 58,
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    backgroundColor: "rgba(255, 255, 255, 0.96)",
    shadowColor: "#000000",
    shadowOpacity: 0.18,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    flexDirection: "row",
    alignItems: "flex-start",
    zIndex: 20,
  },
  timelineHoverTab: {
    position: "absolute",
    width: TIMELINE_HOVER_TAB_WIDTH,
    height: 14,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 2,
    borderBottomRightRadius: 2,
    borderWidth: 1,
    shadowColor: "#000000",
    shadowOpacity: 0.14,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
    zIndex: 18,
  },
  timelineHoverPreviewSwatch: {
    width: 10,
    alignSelf: "stretch",
    minHeight: 38,
    borderRadius: 6,
    marginRight: 9,
  },
  timelineHoverPreviewText: {
    flex: 1,
    minWidth: 0,
  },
  timelineHoverTitle: {
    fontSize: 13,
    lineHeight: 17,
    fontWeight: "900",
    color: "#0f172a",
  },
  timelineHoverLabel: {
    marginTop: 2,
    fontSize: 11,
    lineHeight: 15,
    fontWeight: "700",
    color: "#475569",
  },
  exactPin: {
    position: "absolute",
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 3,
  },
  verticalBarTitle: {
    fontSize: 11,
    lineHeight: 13,
    fontWeight: "900",
    color: "#ffffff",
  },
  verticalBarLabel: {
    marginTop: 3,
    fontSize: 9,
    lineHeight: 11,
    fontWeight: "800",
    color: "rgba(255, 255, 255, 0.86)",
  },
  verticalBarValidation: {
    marginTop: 3,
    fontSize: 8,
    lineHeight: 10,
    fontWeight: "800",
    color: "rgba(255, 255, 255, 0.74)",
  },
  barNotesButton: {
    marginTop: 6,
    minHeight: 24,
    paddingHorizontal: 7,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.42)",
    backgroundColor: "rgba(17, 24, 39, 0.2)",
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  barNotesButtonText: {
    fontSize: 10,
    fontWeight: "900",
    color: "#ffffff",
  },
  eventCard: {
    position: "absolute",
    width: 164,
    minHeight: 96,
    padding: 10,
    borderRadius: 8,
    borderWidth: 2,
    backgroundColor: "#ffffff",
  },
  deleteButton: {
    position: "absolute",
    top: 6,
    right: 6,
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fee2e2",
    borderWidth: 1,
    borderColor: "#fecaca",
    zIndex: 2,
  },
  eventPin: {
    position: "absolute",
    left: 12,
    top: -9,
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#ffffff",
  },
  eventYear: {
    fontSize: 11,
    fontWeight: "900",
    color: "#6b7280",
  },
  eventTitle: {
    marginTop: 4,
    fontSize: 15,
    fontWeight: "900",
    color: "#111827",
  },
  eventSubtitle: {
    marginTop: 4,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "600",
    color: "#4b5563",
  },
  enochBadge: {
    marginTop: 8,
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: "#fffbeb",
    borderWidth: 1,
    borderColor: "#f59e0b",
  },
  enochBadgeText: {
    fontSize: 11,
    fontWeight: "900",
    color: "#92400e",
  },
  validationBadge: {
    marginTop: 6,
    alignSelf: "stretch",
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 8,
    borderWidth: 1,
  },
  validationBadgeGood: {
    backgroundColor: "#f0fdf4",
    borderColor: "#bbf7d0",
  },
  validationBadgeBad: {
    backgroundColor: "#fef2f2",
    borderColor: "#fecaca",
  },
  validationBadgeNeutral: {
    backgroundColor: "#f9fafb",
    borderColor: "#e5e7eb",
  },
  validationBadgeText: {
    fontSize: 10,
    lineHeight: 13,
    fontWeight: "800",
    color: "#374151",
  },
  notesBadge: {
    marginTop: 6,
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: "#eff6ff",
    borderWidth: 1,
    borderColor: "#bfdbfe",
  },
  notesBadgeText: {
    fontSize: 10,
    fontWeight: "900",
    color: "#1d4ed8",
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(17, 24, 39, 0.45)",
    justifyContent: "center",
    padding: 16,
  },
  modalPanel: {
    maxHeight: "92%",
    borderRadius: 12,
    backgroundColor: "#ffffff",
    overflow: "hidden",
  },
  modalHeader: {
    minHeight: 56,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "900",
    color: "#111827",
  },
  modalIconButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f3f4f6",
  },
  modalContent: {
    paddingHorizontal: 16,
    paddingTop: 18,
    paddingBottom: 24,
    gap: 18,
  },
  formSection: {
    gap: 16,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    backgroundColor: "#f9fafb",
  },
  formSectionTitle: {
    fontSize: 13,
    fontWeight: "900",
    color: "#111827",
  },
  formSubsectionTitle: {
    marginTop: 2,
    fontSize: 11,
    fontWeight: "900",
    color: "#6b7280",
    textTransform: "uppercase",
  },
  formRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 14,
  },
  formField: {
    flex: 1,
    minWidth: 148,
    gap: 9,
  },
  formLabel: {
    fontSize: 12,
    fontWeight: "900",
    color: "#374151",
  },
  formInput: {
    minHeight: 42,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#d1d5db",
    backgroundColor: "#ffffff",
    fontSize: 14,
    fontWeight: "700",
    color: "#111827",
  },
  formTextArea: {
    minHeight: 82,
    textAlignVertical: "top",
  },
  segmentedControl: {
    minHeight: 42,
    padding: 3,
    borderRadius: 8,
    backgroundColor: "#e5e7eb",
    flexDirection: "row",
  },
  segmentedControlCompact: {
    flexShrink: 1,
    flexWrap: "wrap",
  },
  segmentButton: {
    flex: 1,
    minWidth: 82,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 8,
  },
  segmentButtonCompact: {
    minWidth: 42,
    paddingHorizontal: 5,
  },
  segmentButtonActive: {
    backgroundColor: "#ffffff",
  },
  segmentButtonText: {
    fontSize: 13,
    fontWeight: "900",
    color: "#4b5563",
  },
  segmentButtonTextCompact: {
    fontSize: 11,
  },
  segmentButtonTextActive: {
    color: "#081a33",
  },
  colorPickerRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    alignSelf: "stretch",
    gap: 12,
    paddingTop: 2,
  },
  colorPreview: {
    width: 42,
    height: 42,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#d1d5db",
  },
  colorHexInput: {
    flexGrow: 1,
    flexShrink: 1,
    minWidth: 150,
  },
  colorSwatchRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignSelf: "stretch",
    gap: 8,
  },
  colorSwatch: {
    flexGrow: 1,
    flexBasis: 34,
    minWidth: 34,
    height: 30,
    borderRadius: 8,
    borderWidth: 3,
  },
  sectionToggle: {
    minHeight: 46,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    backgroundColor: "#ffffff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  sectionToggleText: {
    flex: 1,
    fontSize: 14,
    fontWeight: "900",
    color: "#111827",
  },
  eraToggle: {
    minHeight: 42,
    padding: 3,
    borderRadius: 8,
    backgroundColor: "#e5e7eb",
    flexDirection: "row",
  },
  eraButton: {
    flex: 1,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  eraButtonActive: {
    backgroundColor: "#ffffff",
  },
  eraButtonText: {
    fontSize: 13,
    fontWeight: "900",
    color: "#4b5563",
  },
  eraButtonTextActive: {
    color: "#081a33",
  },
  modalFooter: {
    paddingHorizontal: 16,
    paddingTop: 18,
    paddingBottom: 16,
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10,
  },
  cancelButton: {
    minHeight: 42,
    paddingHorizontal: 14,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f3f4f6",
  },
  cancelButtonText: {
    fontSize: 14,
    fontWeight: "900",
    color: "#374151",
  },
  saveButton: {
    minHeight: 42,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#081a33",
  },
  saveButtonText: {
    fontSize: 14,
    fontWeight: "900",
    color: "#ffffff",
  },
  deleteEntryButton: {
    minHeight: 42,
    paddingHorizontal: 14,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 6,
    backgroundColor: "#fee2e2",
    borderWidth: 1,
    borderColor: "#fecaca",
  },
  deleteEntryButtonText: {
    fontSize: 14,
    fontWeight: "900",
    color: "#991b1b",
  },
});
