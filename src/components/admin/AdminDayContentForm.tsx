/*
 * File: src/components/admin/AdminDayContentForm.tsx
 * Purpose: Admin editor UI for creating and saving calendar day content.
 * Author: rpadgett
 */

// Dependencies
import * as DocumentPicker from "expo-document-picker";
import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { API_BASE_URL } from "../../config/api";

// Types
type Props = {
  enochYear: number;
  month: number;
  day: number;
  groupCode: string;
  adminToken: string;
};

type AccessLevel = "public" | "members" | "code-required";

type ScriptureRow = {
  label: string;
  reference: string;
  url: string;
};

type ContentRow = {
  label: string;
  type: "external-link" | "internal-link" | "pdf" | "video-link" | "note";
  url: string;
  access: AccessLevel;
};

const emptyScriptureRow: ScriptureRow = {
  label: "",
  reference: "",
  url: "",
};

const emptyNoticeRow: ContentRow = {
  label: "",
  type: "note",
  url: "",
  access: "public",
};

const emptyMediaRow: ContentRow = {
  label: "",
  type: "external-link",
  url: "",
  access: "public",
};

// Component
/**
 * Creates the admin content editor component for one Enoch calendar day.
 * This UX component manages form state for notes, scripture readings, notices, media links, uploads, and save actions.
 */
export default function AdminDayContentForm({
  enochYear,
  month,
  day,
  groupCode,
  adminToken,
}: Props) {
  const [notes, setNotes] = useState("");

  const [scriptureReadings, setScriptureReadings] = useState<ScriptureRow[]>([
    emptyScriptureRow,
  ]);

  const [noticeItems, setNoticeItems] = useState<ContentRow[]>([
    emptyNoticeRow,
  ]);

  const [mediaItems, setMediaItems] = useState<ContentRow[]>([emptyMediaRow]);

  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  /**
   * Opens the document picker and uploads a selected file to the admin file endpoint.
   * This action helper appends the uploaded file as a media row for the current day.
   */
  async function uploadFile() {
    const result = await DocumentPicker.getDocumentAsync({
      copyToCacheDirectory: true,
    });

    if (result.canceled) return;

    const file = result.assets[0];
    const formData = new FormData();

    if (file.uri.startsWith("blob:")) {
      const blob = await fetch(file.uri).then((res) => res.blob());

      formData.append(
        "file",
        new File([blob], file.name, {
          type: file.mimeType ?? blob.type ?? "application/octet-stream",
        })
      );
    } else {
      formData.append("file", {
        uri: file.uri,
        name: file.name,
        type: file.mimeType ?? "application/octet-stream",
      } as any);
    }

    /*
      Uploads use FormData, so only the bearer token is set manually.
      The browser/native fetch implementation supplies the multipart boundary.
    */
    const response = await fetch(
      `${API_BASE_URL}/api/admin/calendar/${enochYear}/${month}/${day}/files?groupCode=${encodeURIComponent(groupCode)}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
        body: formData,
      }
    );

    if (!response.ok) {
      console.log("Upload failed", response.status);
      return;
    }

    const data = await response.json();

    setMediaItems((rows) => [
      ...rows,
      {
        label: file.name,
        type: "pdf",
        url: data.url,
        access: "public",
      },
    ]);
  }

  /**
   * Builds the day-content payload and saves it through the admin calendar API.
   * This API action persists notes, readings, notices, and media items for the selected day.
   */
  async function saveContent() {
    try {
      setIsSaving(true);
      setSaveMessage("");

      const body = {
        enochYear,
        month,
        day,
        title: `Month ${month} Day ${day}`,
        notes,

        scriptureReadings: scriptureReadings.filter(
          (row) => row.label || row.reference || row.url
        ),

        sections: [
          {
            title: "Notices",
            displayStyle: "notice",
            items: noticeItems.filter((row) => row.label || row.url),
          },
          {
            title: "Files / Links / Media",
            displayStyle: "default",
            items: mediaItems.filter((row) => row.label || row.url),
          },
        ],
      };

      const response = await fetch(
        `${API_BASE_URL}/api/admin/calendar/${enochYear}/${month}/${day}?groupCode=${encodeURIComponent(groupCode)}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${adminToken}`,
          },
          body: JSON.stringify(body),
        }
      );

      if (!response.ok) {
        setSaveMessage("Save failed");
        return;
      }

      setSaveMessage("Saved successfully");

      setTimeout(() => {
        setSaveMessage("");
      }, 2500);
    } catch (error) {
      console.log(error);
      setSaveMessage("Unexpected error");
    } finally {
      setIsSaving(false);
    }
  }

  /**
   * Updates one scripture-reading row in form state.
   * This form-state helper keeps scripture labels, references, and links editable independently.
   */
  function updateScriptureRow(
    index: number,
    field: keyof ScriptureRow,
    value: string
  ) {
    setScriptureReadings((rows) => {
      const next = [...rows];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  }

  /**
   * Updates one notice row in form state.
   * This form-state helper supports editing notice titles, details, type, and access data.
   */
  function updateNoticeRow(
    index: number,
    field: keyof ContentRow,
    value: string
  ) {
    setNoticeItems((rows) => {
      const next = [...rows];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  }

  /**
   * Updates one media row in form state.
   * This form-state helper supports editing uploaded files, external links, and related access data.
   */
  function updateMediaRow(
    index: number,
    field: keyof ContentRow,
    value: string
  ) {
    setMediaItems((rows) => {
      const next = [...rows];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  }

  return (
    <View style={styles.container}>
      <Text
        style={{
          marginBottom: 12,
          fontSize: 22,
          fontWeight: "800",
        }}
      >
        Admin Content
      </Text>

      <View style={styles.formStack}>
        {/* Notes */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Notes</Text>
          <Text style={styles.sectionHelp}>
            General notes for this calendar day.
          </Text>

          <TextInput
            value={notes}
            onChangeText={setNotes}
            placeholder="Add notes for this day..."
            multiline
            style={[styles.input, styles.textArea]}
          />
        </View>

        {/* Scripture */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Scripture Readings</Text>
          <Text style={styles.sectionHelp}>
            Add passages, readings, or external scripture links.
          </Text>

          {scriptureReadings.map((row, index) => (
            <View key={`scripture-${index}`} style={styles.rowCard}>
              <TextInput
                value={row.label}
                onChangeText={(value) =>
                  updateScriptureRow(index, "label", value)
                }
                placeholder="Label, e.g. Creation Week"
                style={styles.input}
              />

              <TextInput
                value={row.reference}
                onChangeText={(value) =>
                  updateScriptureRow(index, "reference", value)
                }
                placeholder="Reference, e.g. Genesis 1"
                style={styles.input}
              />

              <TextInput
                value={row.url}
                onChangeText={(value) =>
                  updateScriptureRow(index, "url", value)
                }
                placeholder="Optional URL"
                style={styles.input}
              />

              <Pressable
                onPress={() =>
                  setScriptureReadings((rows) =>
                    rows.filter((_, rowIndex) => rowIndex !== index)
                  )
                }
              >
                <Text style={styles.removeText}>Remove Scripture</Text>
              </Pressable>
            </View>
          ))}

          <Pressable
            onPress={() =>
              setScriptureReadings((rows) => [...rows, emptyScriptureRow])
            }
          >
            <Text style={styles.addLinkText}>+ Add Scripture</Text>
          </Pressable>
        </View>

        {/* Notices */}
        <View style={[styles.sectionCard, styles.noticeSectionCard]}>
          <Text style={styles.sectionTitle}>Notices</Text>
          <Text style={styles.sectionHelp}>
            Temporary announcements, hosting notes, reminders, or private
            logistics.
          </Text>

          {noticeItems.map((row, index) => (
            <View key={`notice-${index}`} style={styles.noticeRowCard}>
              <TextInput
                value={row.label}
                onChangeText={(value) => updateNoticeRow(index, "label", value)}
                placeholder="Notice title"
                style={styles.input}
              />

              <TextInput
                value={row.url}
                onChangeText={(value) => updateNoticeRow(index, "url", value)}
                placeholder="Notice details"
                multiline
                style={[styles.input, styles.textArea]}
              />

              <Pressable
                onPress={() =>
                  setNoticeItems((rows) =>
                    rows.filter((_, rowIndex) => rowIndex !== index)
                  )
                }
              >
                <Text style={styles.removeText}>Remove Notice</Text>
              </Pressable>
            </View>
          ))}

          <Pressable
            onPress={() => setNoticeItems((rows) => [...rows, emptyNoticeRow])}
          >
            <Text style={styles.addLinkText}>+ Add Notice</Text>
          </Pressable>
        </View>

        {/* Files / Links / Media */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Files / Links / Media</Text>
          <Text style={styles.sectionHelp}>
            Add PDFs, images, videos, uploaded files, or outside study links.
          </Text>

          {mediaItems.map((row, index) => (
            <View key={`media-${index}`} style={styles.rowCard}>
              <TextInput
                value={row.label}
                onChangeText={(value) => updateMediaRow(index, "label", value)}
                placeholder="Label"
                style={styles.input}
              />

              <TextInput
                value={row.url}
                onChangeText={(value) => updateMediaRow(index, "url", value)}
                placeholder="URL or uploaded file path"
                style={styles.input}
              />

              <Pressable
                onPress={() =>
                  setMediaItems((rows) =>
                    rows.filter((_, rowIndex) => rowIndex !== index)
                  )
                }
              >
                <Text style={styles.removeText}>Remove Media</Text>
              </Pressable>
            </View>
          ))}

          <View style={styles.mediaActionRow}>
            <Pressable onPress={uploadFile}>
              <Text style={styles.uploadText}>Upload File</Text>
            </Pressable>

            <Pressable
              onPress={() => setMediaItems((rows) => [...rows, emptyMediaRow])}
            >
              <Text style={styles.addLinkText}>+ Add Media</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.saveArea}>
          {saveMessage ? (
            <Text style={styles.saveMessage}>{saveMessage}</Text>
          ) : null}

          <Pressable
            onPress={saveContent}
            disabled={isSaving}
            style={[styles.saveButton, isSaving && styles.disabledButton]}
          >
            <Text style={styles.saveButtonText}>
              {isSaving ? "Saving..." : "Save Content"}
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    gap: 16,
  },

  formStack: {
    gap: 18,
  },

  sectionCard: {
    padding: 16,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    backgroundColor: "#f9fafb",
    gap: 12,
  },

  noticeSectionCard: {
    backgroundColor: "#fffbeb",
    borderColor: "#fde68a",
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "900",
    color: "#111827",
  },

  sectionHelp: {
    fontSize: 13,
    color: "#6b7280",
    lineHeight: 18,
  },

  rowCard: {
    gap: 10,
    padding: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    backgroundColor: "#ffffff",
  },

  noticeRowCard: {
    gap: 10,
    padding: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#fde68a",
    backgroundColor: "#ffffff",
  },

  input: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 12,
    padding: 12,
    backgroundColor: "#ffffff",
  },

  textArea: {
    minHeight: 90,
    textAlignVertical: "top",
  },

  removeText: {
    color: "#dc2626",
    fontWeight: "800",
  },

  addLinkText: {
    color: "#2563eb",
    fontWeight: "900",
  },

  uploadText: {
    color: "#7c3aed",
    fontWeight: "900",
  },

  mediaActionRow: {
    flexDirection: "row",
    gap: 18,
    flexWrap: "wrap",
  },

  saveArea: {
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    paddingTop: 18,
    marginTop: 18,
    backgroundColor: "#ffffff",
  },

  saveMessage: {
    marginBottom: 10,
    color: "#16a34a",
    fontWeight: "800",
    textAlign: "center",
  },

  saveButton: {
    width: "100%",
    backgroundColor: "#2563eb",
    paddingVertical: 18,
    borderRadius: 14,
    alignItems: "center",
  },

  disabledButton: {
    opacity: 0.6,
  },

  saveButtonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "900",
  },
});
