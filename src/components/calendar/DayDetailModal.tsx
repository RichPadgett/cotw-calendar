/*
 * File: src/components/calendar/DayDetailModal.tsx
 * Purpose: Calendar day detail modal for viewing events, perpetual markers, saved day content, and admin editing controls.
 * Author: rpadgett
 */

// Dependencies
import {
  Linking,
  Modal,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";

// Models and shared app types
import { CalendarNode } from "../../models/calendar";
import type { DayContent } from "../../types/calendarContent";
import type { PerpetualMarker } from "../../types/perpetualMarkers";

// App components
import AdminDayContentForm from "../admin/AdminDayContentForm";

// Types
type Props = {
  visible: boolean;
  selectedNode: CalendarNode | null;
  dayContent: DayContent | null;
  selectedDayMarkers: PerpetualMarker[];
  isAdminMode: boolean;
  groupCode: string;

  onClose: () => void;
  onToggleAdminMode: () => void;
  onChangeGroup: () => void;
  onPreviousDay: () => void;
  onNextDay: () => void;
};

// Component
/**
 * Creates the slide-up day detail modal for one selected calendar node.
 * This UX component displays Enoch events, perpetual markers, day notes, scripture readings, section content, and admin editing controls.
 */
export default function DayDetailModal({
  visible,
  selectedNode,
  dayContent,
  selectedDayMarkers,
  isAdminMode,
  groupCode,
  onClose,
  onToggleAdminMode,
  onChangeGroup,
  onPreviousDay,
  onNextDay,
}: Props) {
  const modalTitle =
    dayContent?.title ??
    selectedNode?.enoch?.label ??
    `Day ${selectedNode?.enoch?.day ?? ""}`;

  const modalDateLabel = selectedNode?.enoch?.month?.number
    ? `Month ${selectedNode.enoch.month.number} • ${
        selectedNode.gregorianDate ?? ""
      }`
    : (selectedNode?.gregorianDate ?? "");

  /**
   * Opens a linked scripture, media item, or external content URL.
   * This link helper delegates to React Native Linking so native and web targets can handle URLs consistently.
   */
  function openUrl(url?: string) {
    if (!url) return;

    Linking.openURL(url);
  }

  return (
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
              onPress={onClose}
              style={{
                alignSelf: "flex-end",
                padding: 12,
              }}
            >
              <Text style={{ fontSize: 18, fontWeight: "700" }}>Close</Text>
            </Pressable>

            <Pressable
              onPress={onToggleAdminMode}
              style={{
                alignSelf: "flex-end",
                padding: 12,
              }}
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

            <Pressable
              onPress={onChangeGroup}
              style={{
                alignSelf: "flex-end",
                padding: 12,
              }}
            >
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: "800",
                  color: "#dc2626",
                }}
              >
                Change Group
              </Text>
            </Pressable>

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

            {selectedDayMarkers.map((marker) => (
              <View
                key={marker.id}
                style={{
                  marginTop: 12,
                  padding: 10,
                  borderRadius: 12,
                  backgroundColor: marker.color,
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontWeight: "800",
                  }}
                >
                  {marker.title}
                </Text>
              </View>
            ))}

            {selectedNode?.enoch?.month?.number && selectedNode?.enoch?.day && (
              <View
                style={{
                  marginTop: 24,
                  paddingTop: 20,
                  borderTopWidth: 1,
                  borderTopColor: "#e5e7eb",
                }}
              >
                {isAdminMode && (
                  <AdminDayContentForm
                    enochYear={selectedNode.enoch.year}
                    month={selectedNode.enoch.month.number}
                    day={selectedNode.enoch.day}
                    groupCode={groupCode}
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

                          <Text
                            style={{
                              fontSize: 15,
                              fontWeight: "800",
                            }}
                          >
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
  );
}
