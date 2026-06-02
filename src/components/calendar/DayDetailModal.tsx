/*
 * File: src/components/calendar/DayDetailModal.tsx
 * Purpose: Calendar day detail modal for events, perpetual marker notes, saved day content, and admin editing controls.
 * Author: rpadgett
 */

import { useState } from "react";
import {
  Linking,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import AdminDayContentForm from "../admin/AdminDayContentForm";

import { API_BASE_URL } from "../../config/api";
import { CalendarNode } from "../../models/calendar";
import type { DayContent, DayContentItem } from "../../types/calendarContent";
import type { PerpetualMarker } from "../../types/perpetualMarkers";

const DEFAULT_MARKER_COLOR = "#2563eb";

type Props = {
  visible: boolean;
  selectedNode: CalendarNode | null;
  dayContent: DayContent | null;
  perpetualMarkers: PerpetualMarker[];
  selectedDayMarkers: PerpetualMarker[];
  isAdminMode: boolean;
  groupCode: string;
  userRole: "member" | "admin";
  adminToken: string;

  onClose: () => void;
  onToggleAdminMode: () => void;
  onPreviousDay: () => void;
  onNextDay: () => void;
  onDeleteDayNotes: () => Promise<void>;
  onDeleteNotice: (index: number) => Promise<void>;
  onDeleteScriptureReading: (index: number) => Promise<void>;
  onSavePerpetualMarkers: (markers: PerpetualMarker[]) => Promise<void>;
};

/**
 * Creates the slide-up detail view for a selected calendar day.
 * This UX component coordinates marker details, external links, day navigation, and the admin editor surface.
 */
export default function DayDetailModal({
  visible,
  selectedNode,
  dayContent,
  perpetualMarkers,
  selectedDayMarkers,
  isAdminMode,
  groupCode,
  userRole,
  adminToken,
  onClose,
  onToggleAdminMode,
  onPreviousDay,
  onNextDay,
  onDeleteDayNotes,
  onDeleteNotice,
  onDeleteScriptureReading,
  onSavePerpetualMarkers,
}: Props) {
  const [selectedMarker, setSelectedMarker] = useState<PerpetualMarker | null>(
    null
  );
  const [markerTitle, setMarkerTitle] = useState("");
  const [markerShortName, setMarkerShortName] = useState("");
  const [markerColor, setMarkerColor] = useState("#2563eb");
  const [markerNotes, setMarkerNotes] = useState("");
  const [markerSourceLabel, setMarkerSourceLabel] = useState("");
  const [markerSourceUrl, setMarkerSourceUrl] = useState("");
  const [markerSaveMessage, setMarkerSaveMessage] = useState("");
  const [isSavingMarker, setIsSavingMarker] = useState(false);
  const [contentDeleteMessage, setContentDeleteMessage] = useState("");
  const [isDeletingContent, setIsDeletingContent] = useState(false);

  const modalTitle =
    dayContent?.title ??
    selectedNode?.enoch?.label ??
    `Day ${selectedNode?.enoch?.day ?? ""}`;

  const modalDateLabel = selectedNode?.enoch?.month?.number
    ? `Month ${selectedNode.enoch.month.number} • ${
        selectedNode.gregorianDate ?? ""
      }`
    : (selectedNode?.gregorianDate ?? "");

  const canEditPerpetualMarkers =
    userRole === "admin" && groupCode === "church-of-the-word" && isAdminMode;
  const canEditDayContent = userRole === "admin" && isAdminMode;
  const noticeItems = (dayContent?.sections ?? [])
    .filter((section) => section.displayStyle === "notice")
    .flatMap(
      (section) =>
        section.items?.map((item) => ({
          item,
        })) ?? []
    );
  const regularSections = (dayContent?.sections ?? []).filter(
    (section) => section.displayStyle !== "notice"
  );

  /**
   * Opens a linked scripture, source note, media item, or external content URL.
   * This link helper delegates to React Native Linking so native and web targets can handle URLs consistently.
   */
  function openUrl(url?: string) {
    if (!url) return;
    Linking.openURL(getOpenUrl(url));
  }

  function isUrl(value?: string): boolean {
    return /^https?:\/\//i.test(value?.trim() ?? "");
  }

  function isOpenableUrl(value?: string): boolean {
    const trimmedValue = value?.trim() ?? "";

    return (
      isUrl(trimmedValue) ||
      trimmedValue.startsWith("/api/") ||
      trimmedValue.startsWith("groups/")
    );
  }

  function getOpenUrl(url: string): string {
    const trimmedUrl = url.trim();

    if (isUrl(trimmedUrl)) {
      return trimmedUrl;
    }

    if (trimmedUrl.startsWith("/api/")) {
      return `${API_BASE_URL}${trimmedUrl}`;
    }

    if (trimmedUrl.startsWith("groups/")) {
      return `${API_BASE_URL}/api/files/${trimmedUrl}`;
    }

    return trimmedUrl;
  }

  function getNoticeDetails(item: DayContentItem): string {
    if (item.details?.trim()) {
      return item.details.trim();
    }

    return isOpenableUrl(item.url) ? "" : (item.url?.trim() ?? "");
  }

  function getNoticeUrl(item: DayContentItem): string | undefined {
    return isOpenableUrl(item.url) ? item.url : undefined;
  }

  /**
   * Closes the day modal and clears any nested marker detail state.
   * This prevents marker notes from staying selected when the user opens another day.
   */
  function closeModal() {
    setSelectedMarker(null);
    onClose();
  }

  function resetMarkerForm() {
    setMarkerTitle("");
    setMarkerShortName("");
    setMarkerColor("#2563eb");
    setMarkerNotes("");
    setMarkerSourceLabel("");
    setMarkerSourceUrl("");
  }

  function createMarkerId(title: string) {
    const slug = title
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    return `${slug || "marker"}-${Date.now()}`;
  }

  /**
   * Returns a valid marker color or the app default.
   * This keeps bad admin-entered hex values from breaking marker rendering.
   */
  function getMarkerColor(color?: string) {
    const trimmedColor = color?.trim() ?? "";
    const isHexColor = /^#(?:[0-9a-fA-F]{3}){1,2}$/.test(trimmedColor);

    return isHexColor ? trimmedColor : DEFAULT_MARKER_COLOR;
  }

  /**
   * Builds a new perpetual marker for the selected day placement.
   * Month days, gate days, and intercalary weeks use different fields in the marker file.
   */
  function buildMarkerForSelectedDay(): PerpetualMarker | null {
    const enoch = selectedNode?.enoch;

    if (!enoch) return null;

    const title = markerTitle.trim();
    const shortName = markerShortName.trim();

    if (!title || !shortName) return null;

    const marker: PerpetualMarker = {
      id: createMarkerId(title),
      title,
      shortName,
      color: getMarkerColor(markerColor),
    };

    if (markerNotes.trim()) marker.notes = markerNotes.trim();
    if (markerSourceLabel.trim()) marker.sourceLabel = markerSourceLabel.trim();
    if (markerSourceUrl.trim()) marker.sourceUrl = markerSourceUrl.trim();

    if (enoch.isSabbathWeek) {
      marker.intercalaryWeek = true;
    } else if (enoch.isIntercalary) {
      marker.gateDay = enoch.quarter;
    } else if (enoch.month?.number && enoch.day) {
      marker.month = enoch.month.number;
      marker.day = enoch.day;
    } else {
      return null;
    }

    return marker;
  }

  async function addPerpetualMarker() {
    const marker = buildMarkerForSelectedDay();

    if (!marker) {
      setMarkerSaveMessage("Title and short name are required.");
      return;
    }

    try {
      setIsSavingMarker(true);
      setMarkerSaveMessage("");

      await onSavePerpetualMarkers([...perpetualMarkers, marker]);
      resetMarkerForm();
      setMarkerSaveMessage("Perpetual marker saved.");
    } catch (error) {
      console.log("Failed to save perpetual marker", error);
      setMarkerSaveMessage("Unable to save marker.");
    } finally {
      setIsSavingMarker(false);
    }
  }

  async function deletePerpetualMarker(markerId: string) {
    try {
      setIsSavingMarker(true);
      setMarkerSaveMessage("");

      await onSavePerpetualMarkers(
        perpetualMarkers.filter((marker) => marker.id !== markerId)
      );

      if (selectedMarker?.id === markerId) {
        setSelectedMarker(null);
      }

      setMarkerSaveMessage("Perpetual marker deleted.");
    } catch (error) {
      console.log("Failed to delete perpetual marker", error);
      setMarkerSaveMessage("Unable to delete marker.");
    } finally {
      setIsSavingMarker(false);
    }
  }

  async function deleteDayNotes() {
    try {
      setIsDeletingContent(true);
      setContentDeleteMessage("");

      await onDeleteDayNotes();
      setContentDeleteMessage("Notes deleted.");
    } catch (error) {
      console.log("Failed to delete day notes", error);
      setContentDeleteMessage("Unable to delete notes.");
    } finally {
      setIsDeletingContent(false);
    }
  }

  /**
   * Deletes one notice item from the selected day content.
   * This admin action leaves notes and scripture readings unchanged.
   */
  async function deleteNotice(index: number) {
    try {
      setIsDeletingContent(true);
      setContentDeleteMessage("");

      await onDeleteNotice(index);
      setContentDeleteMessage("Notice deleted.");
    } catch (error) {
      console.log("Failed to delete notice", error);
      setContentDeleteMessage("Unable to delete notice.");
    } finally {
      setIsDeletingContent(false);
    }
  }

  async function deleteScriptureReading(index: number) {
    try {
      setIsDeletingContent(true);
      setContentDeleteMessage("");

      await onDeleteScriptureReading(index);
      setContentDeleteMessage("Scripture reading deleted.");
    } catch (error) {
      console.log("Failed to delete scripture reading", error);
      setContentDeleteMessage("Unable to delete scripture reading.");
    } finally {
      setIsDeletingContent(false);
    }
  }

  return (
    <>
      <Modal visible={visible} animationType="slide" transparent>
        <View style={styles.backdrop}>
          <View style={styles.sheet}>
            <View style={styles.header}>
              <View style={styles.headerTextGroup}>
                <Text style={styles.title}>{modalTitle}</Text>
                <Text style={styles.dateLabel}>{modalDateLabel}</Text>
              </View>

              <View style={styles.headerActions}>
                {userRole === "admin" && (
                  <Pressable
                    onPress={onToggleAdminMode}
                    style={[
                      styles.headerButton,
                      isAdminMode && styles.adminActiveButton,
                    ]}
                  >
                    <Text
                      style={[
                        styles.headerButtonText,
                        isAdminMode && styles.adminActiveButtonText,
                      ]}
                    >
                      {isAdminMode ? "Exit Admin" : "Admin"}
                    </Text>
                  </Pressable>
                )}

                <Pressable onPress={closeModal} style={styles.headerButton}>
                  <Text style={styles.headerButtonText}>Close</Text>
                </Pressable>
              </View>
            </View>

            <ScrollView
              style={styles.scroll}
              contentContainerStyle={styles.scrollContent}
            >
              {canEditPerpetualMarkers && (
                <View style={[styles.card, styles.adminCard]}>
                  <Text style={styles.cardTitle}>Perpetual Marker</Text>

                  <TextInput
                    value={markerTitle}
                    onChangeText={setMarkerTitle}
                    placeholder="Title"
                    style={styles.input}
                  />

                  <TextInput
                    value={markerShortName}
                    onChangeText={setMarkerShortName}
                    placeholder="Short name"
                    style={styles.input}
                  />

                  <TextInput
                    value={markerColor}
                    onChangeText={setMarkerColor}
                    placeholder="#2563eb"
                    autoCapitalize="none"
                    style={styles.input}
                  />

                  <TextInput
                    value={markerNotes}
                    onChangeText={setMarkerNotes}
                    placeholder="Notes"
                    multiline
                    style={[styles.input, styles.textArea]}
                  />

                  <TextInput
                    value={markerSourceLabel}
                    onChangeText={setMarkerSourceLabel}
                    placeholder="Source label"
                    style={styles.input}
                  />

                  <TextInput
                    value={markerSourceUrl}
                    onChangeText={setMarkerSourceUrl}
                    placeholder="Source URL"
                    autoCapitalize="none"
                    style={styles.input}
                  />

                  <Pressable
                    onPress={addPerpetualMarker}
                    disabled={isSavingMarker}
                    style={[
                      styles.primaryButton,
                      isSavingMarker && styles.disabledButton,
                    ]}
                  >
                    <Text style={styles.primaryButtonText}>
                      {isSavingMarker ? "Saving..." : "Add Marker"}
                    </Text>
                  </Pressable>

                  {markerSaveMessage ? (
                    <Text style={styles.statusMessage}>
                      {markerSaveMessage}
                    </Text>
                  ) : null}
                </View>
              )}

              {selectedNode?.enoch?.events?.map((event) => (
                <View
                  key={event.id}
                  style={[
                    styles.eventChip,
                    { backgroundColor: event.color ?? "#2563eb" },
                  ]}
                >
                  <Text style={styles.inverseTitle}>{event.englishName}</Text>
                </View>
              ))}

              {selectedDayMarkers.map((marker) => {
                /*
                  Marker detail links are optional metadata, so only markers with notes
                  or source fields become tappable cards.
                */
                const hasDetails =
                  Boolean(marker.notes) ||
                  Boolean(marker.sourceLabel) ||
                  Boolean(marker.sourceUrl);
                const isShowingDetails = selectedMarker?.id === marker.id;

                return (
                  <View
                    key={marker.id}
                    style={[
                      styles.markerCard,
                      { backgroundColor: getMarkerColor(marker.color) },
                    ]}
                  >
                    <Text style={styles.inverseTitle}>{marker.title}</Text>

                    {hasDetails ? (
                      <Pressable
                        onPress={() =>
                          setSelectedMarker(isShowingDetails ? null : marker)
                        }
                        style={styles.inversePillButton}
                      >
                        <Text style={styles.inversePillButtonText}>
                          {isShowingDetails ? "Hide notes" : "Tap for notes"}
                        </Text>
                      </Pressable>
                    ) : null}

                    {isShowingDetails ? (
                      <View style={styles.markerDetailCard}>
                        {marker.notes ? (
                          <Text style={styles.bodyText}>{marker.notes}</Text>
                        ) : null}

                        {marker.sourceLabel ? (
                          <Text style={styles.metaLabel}>
                            {marker.sourceLabel}
                          </Text>
                        ) : null}

                        {marker.sourceUrl ? (
                          <Pressable
                            onPress={() => openUrl(marker.sourceUrl)}
                            style={styles.linkButton}
                          >
                            <Text style={styles.linkButtonText}>
                              Open Source
                            </Text>
                          </Pressable>
                        ) : null}
                      </View>
                    ) : null}

                    {canEditPerpetualMarkers ? (
                      <Pressable
                        onPress={() => deletePerpetualMarker(marker.id)}
                        disabled={isSavingMarker}
                        style={styles.inversePillButton}
                      >
                        <Text style={styles.inversePillButtonText}>Delete</Text>
                      </Pressable>
                    ) : null}
                  </View>
                );
              })}

              {selectedNode?.enoch?.month?.number &&
                selectedNode?.enoch?.day &&
                userRole === "admin" &&
                isAdminMode && (
                  <View style={styles.adminPanel}>
                    <AdminDayContentForm
                      enochYear={selectedNode.enoch.year}
                      month={selectedNode.enoch.month.number}
                      day={selectedNode.enoch.day}
                      groupCode={groupCode}
                      adminToken={adminToken}
                      currentContent={dayContent}
                    />
                  </View>
                )}

              {noticeItems.length > 0 ? (
                <View style={[styles.card, styles.noticeCard]}>
                  <Text style={[styles.sectionTitle, styles.noticeTitle]}>
                    Notices
                  </Text>

                  {noticeItems.map(({ item }, noticeIndex) => (
                    <View
                      key={`notice-${noticeIndex}`}
                      style={[
                        styles.stackedItem,
                        noticeIndex > 0 && styles.stackedItemDivider,
                      ]}
                    >
                      <Text style={styles.itemTitle}>
                        {String(item.label ?? "Untitled")}
                      </Text>

                      {getNoticeDetails(item) ? (
                        <Text style={styles.noticeDetailsText}>
                          {getNoticeDetails(item)}
                        </Text>
                      ) : null}

                      {getNoticeUrl(item) ? (
                        <Pressable
                          onPress={() => openUrl(getNoticeUrl(item))}
                          style={styles.linkButton}
                        >
                          <Text style={styles.linkButtonText}>Open</Text>
                        </Pressable>
                      ) : null}

                      {canEditDayContent ? (
                        <Pressable
                          onPress={() => deleteNotice(noticeIndex)}
                          disabled={isDeletingContent}
                          style={styles.destructiveButton}
                        >
                          <Text style={styles.destructiveButtonText}>
                            Delete Notice
                          </Text>
                        </Pressable>
                      ) : null}
                    </View>
                  ))}
                </View>
              ) : null}

              {dayContent?.notes ? (
                <View style={styles.card}>
                  <Text style={styles.sectionTitle}>Notes</Text>

                  <Text style={styles.bodyText}>
                    {String(dayContent.notes)}
                  </Text>

                  {canEditDayContent ? (
                    <Pressable
                      onPress={deleteDayNotes}
                      disabled={isDeletingContent}
                      style={styles.destructiveButton}
                    >
                      <Text style={styles.destructiveButtonText}>
                        Delete Notes
                      </Text>
                    </Pressable>
                  ) : null}
                </View>
              ) : null}

              {contentDeleteMessage ? (
                <Text style={styles.statusMessage}>{contentDeleteMessage}</Text>
              ) : null}

              {Array.isArray(dayContent?.scriptureReadings) &&
              dayContent.scriptureReadings.length > 0 ? (
                <Text style={styles.sectionHeading}>Scripture Readings</Text>
              ) : null}

              {Array.isArray(dayContent?.scriptureReadings) &&
                dayContent.scriptureReadings.map((reading, index) => (
                  <View
                    key={`reading-${index}`}
                    style={[styles.card, styles.readingCard]}
                  >
                    <Text style={styles.itemTitle}>
                      {String(reading.label ?? "Scripture")}
                    </Text>

                    <Text style={styles.bodyTextMuted}>
                      {String(reading.reference ?? "")}
                    </Text>

                    {reading.url ? (
                      <Pressable
                        onPress={() => openUrl(reading.url)}
                        style={styles.linkButton}
                      >
                        <Text style={styles.linkButtonText}>
                          Open Scripture
                        </Text>
                      </Pressable>
                    ) : null}

                    {canEditDayContent ? (
                      <Pressable
                        onPress={() => deleteScriptureReading(index)}
                        disabled={isDeletingContent}
                        style={styles.destructiveButton}
                      >
                        <Text style={styles.destructiveButtonText}>
                          Delete Reading
                        </Text>
                      </Pressable>
                    ) : null}
                  </View>
                ))}

              {regularSections.map((section, sectionIndex) => (
                <View key={`section-${sectionIndex}`}>
                  <Text style={styles.sectionHeading}>
                    {String(section.title ?? "Section")}
                  </Text>

                  {Array.isArray(section.items) &&
                    section.items.map((item, itemIndex) => {
                      return (
                        <View
                          key={`item-${sectionIndex}-${itemIndex}`}
                          style={styles.card}
                        >
                          <Text style={styles.itemTitle}>
                            {String(item.label ?? "Untitled")}
                          </Text>

                          <Text style={styles.metaText}>
                            {String(
                              `${item.type ?? "link"} • ${
                                item.access ?? "public"
                              }`
                            )}
                          </Text>

                          {item.url ? (
                            <Pressable
                              onPress={() => openUrl(item.url)}
                              style={styles.linkButton}
                            >
                              <Text style={styles.linkButtonText}>Open</Text>
                            </Pressable>
                          ) : null}
                        </View>
                      );
                    })}
                </View>
              ))}
            </ScrollView>

            <View style={styles.footerNav}>
              <Pressable onPress={onPreviousDay} style={styles.footerButton}>
                <Text style={styles.footerButtonText}>Previous</Text>
              </Pressable>

              <Pressable onPress={onNextDay} style={styles.footerButton}>
                <Text style={styles.footerButtonText}>Next</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(17,24,39,0.42)",
    justifyContent: "flex-end",
  },

  sheet: {
    height: "86%",
    overflow: "hidden",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    backgroundColor: "#ffffff",
  },

  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 16,
    paddingHorizontal: 24,
    paddingTop: 22,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    backgroundColor: "#ffffff",
  },

  headerTextGroup: {
    flex: 1,
    minWidth: 0,
  },

  title: {
    fontSize: 26,
    fontWeight: "900",
    color: "#111827",
  },

  dateLabel: {
    marginTop: 6,
    fontSize: 14,
    fontWeight: "700",
    color: "#6b7280",
  },

  headerActions: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-end",
    gap: 8,
  },

  headerButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#d1d5db",
    backgroundColor: "#ffffff",
  },

  headerButtonText: {
    fontSize: 12,
    fontWeight: "900",
    color: "#374151",
  },

  adminActiveButton: {
    borderColor: "#bfdbfe",
    backgroundColor: "#eff6ff",
  },

  adminActiveButtonText: {
    color: "#1d4ed8",
  },

  scroll: {
    flex: 1,
    backgroundColor: "#ffffff",
  },

  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 18,
    paddingBottom: 40,
  },

  card: {
    marginTop: 14,
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    backgroundColor: "#f9fafb",
  },

  adminCard: {
    gap: 8,
    borderColor: "#bfdbfe",
    backgroundColor: "#eff6ff",
  },

  noticeCard: {
    borderColor: "#f59e0b",
    backgroundColor: "#fffbeb",
  },

  readingCard: {
    borderLeftWidth: 4,
    borderLeftColor: "#2563eb",
    backgroundColor: "#ffffff",
  },

  markerCard: {
    marginTop: 12,
    padding: 12,
    borderRadius: 14,
  },

  markerDetailCard: {
    marginTop: 10,
    padding: 12,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.92)",
  },

  eventChip: {
    marginTop: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
  },

  adminPanel: {
    marginTop: 24,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
  },

  sectionHeading: {
    marginTop: 24,
    marginBottom: 10,
    fontSize: 20,
    fontWeight: "900",
    color: "#111827",
  },

  sectionTitle: {
    marginBottom: 8,
    fontSize: 18,
    fontWeight: "900",
    color: "#111827",
  },

  noticeTitle: {
    color: "#92400e",
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: "900",
    color: "#111827",
  },

  itemTitle: {
    fontSize: 15,
    fontWeight: "900",
    color: "#111827",
  },

  inverseTitle: {
    color: "#ffffff",
    fontWeight: "900",
  },

  bodyText: {
    fontSize: 14,
    lineHeight: 20,
    color: "#374151",
  },

  bodyTextMuted: {
    marginTop: 3,
    fontSize: 13,
    color: "#6b7280",
  },

  metaLabel: {
    marginTop: 10,
    fontSize: 12,
    fontWeight: "900",
    color: "#6b7280",
    textTransform: "uppercase",
  },

  metaText: {
    marginTop: 4,
    fontSize: 12,
    color: "#6b7280",
    textTransform: "uppercase",
  },

  noticeMetaText: {
    color: "#92400e",
  },

  noticeDetailsText: {
    marginTop: 8,
    fontSize: 14,
    lineHeight: 20,
    color: "#374151",
  },

  statusMessage: {
    marginTop: 10,
    fontSize: 12,
    fontWeight: "800",
    color: "#374151",
  },

  stackedItem: {
    paddingTop: 0,
  },

  stackedItemDivider: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#fde68a",
  },

  input: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#ffffff",
  },

  textArea: {
    minHeight: 72,
    textAlignVertical: "top",
  },

  primaryButton: {
    marginTop: 4,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    backgroundColor: "#2563eb",
  },

  primaryButtonText: {
    color: "#ffffff",
    fontWeight: "900",
  },

  destructiveButton: {
    alignSelf: "flex-start",
    marginTop: 10,
    paddingHorizontal: 11,
    paddingVertical: 7,
    borderRadius: 8,
    backgroundColor: "#fee2e2",
  },

  destructiveButtonText: {
    color: "#991b1b",
    fontSize: 12,
    fontWeight: "900",
  },

  linkButton: {
    alignSelf: "flex-start",
    marginTop: 10,
    paddingVertical: 4,
  },

  linkButtonText: {
    fontSize: 12,
    fontWeight: "900",
    color: "#2563eb",
  },

  inversePillButton: {
    alignSelf: "flex-start",
    marginTop: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: "rgba(255,255,255,0.22)",
  },

  inversePillButtonText: {
    color: "#ffffff",
    fontSize: 11,
    fontWeight: "900",
  },

  disabledButton: {
    opacity: 0.6,
  },

  footerNav: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    backgroundColor: "#ffffff",
  },

  footerButton: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: "#eff6ff",
  },

  footerButtonText: {
    fontSize: 15,
    fontWeight: "900",
    color: "#2563eb",
  },
});
