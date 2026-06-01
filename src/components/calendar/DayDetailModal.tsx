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
  Text,
  TextInput,
  View,
} from "react-native";

import AdminDayContentForm from "../admin/AdminDayContentForm";

import { CalendarNode } from "../../models/calendar";
import type { DayContent } from "../../types/calendarContent";
import type { PerpetualMarker } from "../../types/perpetualMarkers";

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

  /**
   * Opens a linked scripture, source note, media item, or external content URL.
   * This link helper delegates to React Native Linking so native and web targets can handle URLs consistently.
   */
  function openUrl(url?: string) {
    if (!url) return;
    Linking.openURL(url);
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
      color: markerColor.trim() || "#2563eb",
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

  return (
    <>
      <Modal visible={visible} animationType="slide" transparent>
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.35)",
            justifyContent: "flex-end",
          }}
        >
          <View
            style={{
              backgroundColor: "#ffffff",
              borderTopLeftRadius: 24,
              borderTopRightRadius: 24,
              height: "85%",
              overflow: "hidden",
            }}
          >
            <ScrollView
              style={{ flex: 1 }}
              contentContainerStyle={{
                padding: 24,
                paddingBottom: 24,
              }}
            >
              <Pressable
                onPress={closeModal}
                style={{ alignSelf: "flex-end", padding: 12 }}
              >
                <Text style={{ fontSize: 18, fontWeight: "700" }}>Close</Text>
              </Pressable>

              {userRole === "admin" && (
                <Pressable
                  onPress={onToggleAdminMode}
                  style={{ alignSelf: "flex-end", padding: 12 }}
                >
                  <Text
                    style={{
                      fontSize: 13,
                      fontWeight: "800",
                      color: "#2563eb",
                    }}
                  >
                    {isAdminMode ? "Exit Admin" : "Admin Mode"}
                  </Text>
                </Pressable>
              )}

              {canEditPerpetualMarkers && (
                <View
                  style={{
                    marginTop: 8,
                    padding: 14,
                    borderRadius: 12,
                    borderWidth: 1,
                    borderColor: "#bfdbfe",
                    backgroundColor: "#eff6ff",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "900",
                      color: "#111827",
                    }}
                  >
                    Perpetual Marker
                  </Text>

                  <TextInput
                    value={markerTitle}
                    onChangeText={setMarkerTitle}
                    placeholder="Title"
                    style={{
                      marginTop: 10,
                      borderWidth: 1,
                      borderColor: "#d1d5db",
                      borderRadius: 10,
                      padding: 10,
                      backgroundColor: "#ffffff",
                    }}
                  />

                  <TextInput
                    value={markerShortName}
                    onChangeText={setMarkerShortName}
                    placeholder="Short name"
                    style={{
                      marginTop: 8,
                      borderWidth: 1,
                      borderColor: "#d1d5db",
                      borderRadius: 10,
                      padding: 10,
                      backgroundColor: "#ffffff",
                    }}
                  />

                  <TextInput
                    value={markerColor}
                    onChangeText={setMarkerColor}
                    placeholder="#2563eb"
                    autoCapitalize="none"
                    style={{
                      marginTop: 8,
                      borderWidth: 1,
                      borderColor: "#d1d5db",
                      borderRadius: 10,
                      padding: 10,
                      backgroundColor: "#ffffff",
                    }}
                  />

                  <TextInput
                    value={markerNotes}
                    onChangeText={setMarkerNotes}
                    placeholder="Notes"
                    multiline
                    style={{
                      marginTop: 8,
                      minHeight: 72,
                      borderWidth: 1,
                      borderColor: "#d1d5db",
                      borderRadius: 10,
                      padding: 10,
                      backgroundColor: "#ffffff",
                      textAlignVertical: "top",
                    }}
                  />

                  <TextInput
                    value={markerSourceLabel}
                    onChangeText={setMarkerSourceLabel}
                    placeholder="Source label"
                    style={{
                      marginTop: 8,
                      borderWidth: 1,
                      borderColor: "#d1d5db",
                      borderRadius: 10,
                      padding: 10,
                      backgroundColor: "#ffffff",
                    }}
                  />

                  <TextInput
                    value={markerSourceUrl}
                    onChangeText={setMarkerSourceUrl}
                    placeholder="Source URL"
                    autoCapitalize="none"
                    style={{
                      marginTop: 8,
                      borderWidth: 1,
                      borderColor: "#d1d5db",
                      borderRadius: 10,
                      padding: 10,
                      backgroundColor: "#ffffff",
                    }}
                  />

                  <Pressable
                    onPress={addPerpetualMarker}
                    disabled={isSavingMarker}
                    style={{
                      marginTop: 12,
                      paddingVertical: 12,
                      borderRadius: 10,
                      alignItems: "center",
                      backgroundColor: isSavingMarker ? "#93c5fd" : "#2563eb",
                    }}
                  >
                    <Text
                      style={{
                        color: "#ffffff",
                        fontWeight: "900",
                      }}
                    >
                      {isSavingMarker ? "Saving..." : "Add Marker"}
                    </Text>
                  </Pressable>

                  {markerSaveMessage ? (
                    <Text
                      style={{
                        marginTop: 8,
                        fontSize: 12,
                        fontWeight: "700",
                        color: "#1f2937",
                      }}
                    >
                      {markerSaveMessage}
                    </Text>
                  ) : null}
                </View>
              )}

              <Text style={{ fontSize: 32, fontWeight: "800" }}>
                {modalTitle}
              </Text>

              <Text
                style={{
                  marginTop: 8,
                  fontSize: 18,
                  color: "#6b7280",
                }}
              >
                {modalDateLabel}
              </Text>

              {selectedNode?.enoch?.events?.map((event) => (
                <View
                  key={event.id}
                  style={{
                    marginTop: 12,
                    padding: 10,
                    borderRadius: 12,
                    backgroundColor: event.color ?? "#2563eb",
                  }}
                >
                  <Text style={{ color: "white", fontWeight: "800" }}>
                    {event.englishName}
                  </Text>
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

                return (
                  <Pressable
                    key={marker.id}
                    onPress={() =>
                      hasDetails ? setSelectedMarker(marker) : undefined
                    }
                    style={{
                      marginTop: 12,
                      padding: 10,
                      borderRadius: 12,
                      backgroundColor: marker.color,
                    }}
                  >
                    <Text style={{ color: "white", fontWeight: "800" }}>
                      {marker.title}
                    </Text>

                    {hasDetails ? (
                      <Text
                        style={{
                          marginTop: 4,
                          color: "white",
                          fontSize: 11,
                          fontWeight: "700",
                          opacity: 0.9,
                        }}
                      >
                        Tap for notes
                      </Text>
                    ) : null}

                    {canEditPerpetualMarkers ? (
                      <Pressable
                        onPress={() => deletePerpetualMarker(marker.id)}
                        disabled={isSavingMarker}
                        style={{
                          marginTop: 8,
                          alignSelf: "flex-start",
                          paddingVertical: 6,
                          paddingHorizontal: 10,
                          borderRadius: 8,
                          backgroundColor: "rgba(255,255,255,0.22)",
                        }}
                      >
                        <Text
                          style={{
                            color: "white",
                            fontSize: 11,
                            fontWeight: "900",
                          }}
                        >
                          Delete
                        </Text>
                      </Pressable>
                    ) : null}
                  </Pressable>
                );
              })}

              {selectedNode?.enoch?.month?.number &&
                selectedNode?.enoch?.day && (
                  <View
                    style={{
                      marginTop: 24,
                      paddingTop: 20,
                      borderTopWidth: 1,
                      borderTopColor: "#e5e7eb",
                    }}
                  >
                    {userRole === "admin" && isAdminMode && (
                      <AdminDayContentForm
                        enochYear={selectedNode.enoch.year}
                        month={selectedNode.enoch.month.number}
                        day={selectedNode.enoch.day}
                        groupCode={groupCode}
                        adminToken={adminToken}
                      />
                    )}
                  </View>
                )}

              {dayContent?.notes ? (
                <View
                  style={{
                    marginTop: 24,
                    padding: 14,
                    borderRadius: 14,
                    backgroundColor: "#f3f4f6",
                  }}
                >
                  <Text style={{ fontWeight: "800", marginBottom: 6 }}>
                    Notes
                  </Text>

                  <Text style={{ fontSize: 14, color: "#374151" }}>
                    {String(dayContent.notes)}
                  </Text>
                </View>
              ) : null}

              {Array.isArray(dayContent?.scriptureReadings) &&
              dayContent.scriptureReadings.length > 0 ? (
                <Text
                  style={{
                    marginTop: 24,
                    marginBottom: 10,
                    fontSize: 20,
                    fontWeight: "800",
                  }}
                >
                  Scripture Readings
                </Text>
              ) : null}

              {Array.isArray(dayContent?.scriptureReadings) &&
                dayContent.scriptureReadings.map((reading, index) => (
                  <View
                    key={`reading-${index}`}
                    style={{
                      backgroundColor: "white",
                      borderRadius: 12,
                      padding: 12,
                      marginBottom: 10,
                      borderLeftWidth: 4,
                      borderLeftColor: "#2563eb",
                      borderWidth: 1,
                      borderColor: "#e5e7eb",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "700",
                        color: "#111827",
                      }}
                    >
                      {String(reading.label ?? "Scripture")}
                    </Text>

                    <Text
                      style={{
                        marginTop: 2,
                        fontSize: 13,
                        color: "#6b7280",
                      }}
                    >
                      {String(reading.reference ?? "")}
                    </Text>

                    {reading.url ? (
                      <Pressable
                        onPress={() => openUrl(reading.url)}
                        style={{ marginTop: 8 }}
                      >
                        <Text
                          style={{
                            fontSize: 12,
                            fontWeight: "700",
                            color: "#2563eb",
                          }}
                        >
                          Open Scripture
                        </Text>
                      </Pressable>
                    ) : null}
                  </View>
                ))}

              {Array.isArray(dayContent?.sections) &&
                dayContent.sections.map((section, sectionIndex) => (
                  <View key={`section-${sectionIndex}`}>
                    <Text
                      style={{
                        marginTop: 24,
                        marginBottom: 10,
                        fontSize: 20,
                        fontWeight: "800",
                      }}
                    >
                      {String(section.title ?? "Section")}
                    </Text>

                    {Array.isArray(section.items) &&
                      section.items.map((item, itemIndex) => {
                        const isNotice = section.displayStyle === "notice";

                        return (
                          <View
                            key={`item-${sectionIndex}-${itemIndex}`}
                            style={{
                              backgroundColor: isNotice ? "#fffbeb" : "#f9fafb",
                              borderRadius: 12,
                              padding: 12,
                              marginBottom: 10,
                              borderWidth: 1,
                              borderColor: isNotice ? "#f59e0b" : "#e5e7eb",
                            }}
                          >
                            {isNotice ? (
                              <Text
                                style={{
                                  marginBottom: 6,
                                  fontSize: 11,
                                  fontWeight: "900",
                                  color: "#92400e",
                                  textTransform: "uppercase",
                                }}
                              >
                                Notice
                              </Text>
                            ) : null}

                            <Text style={{ fontSize: 15, fontWeight: "800" }}>
                              {String(item.label ?? "Untitled")}
                            </Text>

                            <Text
                              style={{
                                marginTop: 4,
                                fontSize: 12,
                                color: "#6b7280",
                                textTransform: "uppercase",
                              }}
                            >
                              {String(
                                `${item.type ?? "link"} • ${
                                  item.access ?? "public"
                                }`
                              )}
                            </Text>

                            {item.url ? (
                              <Pressable
                                onPress={() => openUrl(item.url)}
                                style={{ marginTop: 10 }}
                              >
                                <Text
                                  style={{
                                    fontSize: 12,
                                    fontWeight: "700",
                                    color: "#2563eb",
                                  }}
                                >
                                  Open
                                </Text>
                              </Pressable>
                            ) : null}
                          </View>
                        );
                      })}
                  </View>
                ))}
            </ScrollView>

            <View
              style={{
                paddingVertical: 14,
                paddingHorizontal: 24,
                borderTopWidth: 1,
                borderTopColor: "#e5e7eb",
                flexDirection: "row",
                justifyContent: "space-between",
                backgroundColor: "#ffffff",
              }}
            >
              <Pressable onPress={onPreviousDay}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "700",
                    color: "#2563eb",
                  }}
                >
                  Previous
                </Text>
              </Pressable>

              <Pressable onPress={onNextDay}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "700",
                    color: "#2563eb",
                  }}
                >
                  Next
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      <Modal visible={Boolean(selectedMarker)} animationType="fade" transparent>
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.45)",
            alignItems: "center",
            justifyContent: "center",
            padding: 24,
          }}
        >
          <View
            style={{
              width: "100%",
              maxWidth: 440,
              borderRadius: 24,
              backgroundColor: "#ffffff",
              padding: 20,
            }}
          >
            <Text
              style={{
                fontSize: 24,
                fontWeight: "900",
                color: "#111827",
              }}
            >
              {selectedMarker?.title}
            </Text>

            {selectedMarker?.notes ? (
              <Text
                style={{
                  marginTop: 12,
                  fontSize: 15,
                  lineHeight: 22,
                  color: "#374151",
                }}
              >
                {selectedMarker.notes}
              </Text>
            ) : null}

            {selectedMarker?.sourceLabel ? (
              <Text
                style={{
                  marginTop: 16,
                  fontSize: 13,
                  fontWeight: "900",
                  color: "#6b7280",
                  textTransform: "uppercase",
                }}
              >
                {selectedMarker.sourceLabel}
              </Text>
            ) : null}

            {selectedMarker?.sourceUrl ? (
              <Pressable
                onPress={() => openUrl(selectedMarker.sourceUrl)}
                style={{ marginTop: 10 }}
              >
                <Text
                  style={{
                    color: "#2563eb",
                    fontSize: 14,
                    fontWeight: "800",
                  }}
                >
                  Open Source
                </Text>
              </Pressable>
            ) : null}

            <Pressable
              onPress={() => setSelectedMarker(null)}
              style={{
                marginTop: 24,
                paddingVertical: 14,
                borderRadius: 14,
                backgroundColor: "#111827",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: "#ffffff",
                  fontSize: 15,
                  fontWeight: "900",
                }}
              >
                Close
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </>
  );
}
