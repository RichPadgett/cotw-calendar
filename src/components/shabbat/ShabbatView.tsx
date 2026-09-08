import { useCallback, useEffect, useState } from "react";
import { Linking, Pressable, Text, View } from "react-native";

import { API_BASE_URL } from "../../config/api";

const STUDYBOX_URL = "https://studybox.enochscalendar.com";

type RecordingFile = {
  name: string;
  size: number;
  kind: "audio" | "video";
};

type Recording = {
  id: string;
  title: string;
  recordedAt: string;
  files: RecordingFile[];
};

function formatFileSize(bytes: number) {
  if (bytes >= 1024 * 1024 * 1024) {
    return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB`;
  }

  if (bytes >= 1024 * 1024) {
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  return `${Math.max(1, Math.round(bytes / 1024))} KB`;
}

export default function ShabbatView({ memberToken }: { memberToken: string }) {
  const [recordings, setRecordings] = useState<Recording[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [downloadingFile, setDownloadingFile] = useState("");

  const loadRecordings = useCallback(async () => {
    if (!memberToken) return;

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_BASE_URL}/api/shabbat/recordings`, {
        headers: { "X-COTW-Session": memberToken },
      });

      if (!response.ok) throw new Error("Unable to load recordings.");

      setRecordings(await response.json());
    } catch (loadError) {
      setError(
        loadError instanceof Error
          ? loadError.message
          : "Unable to load recordings."
      );
    } finally {
      setIsLoading(false);
    }
  }, [memberToken]);

  useEffect(() => {
    void loadRecordings();
  }, [loadRecordings]);

  async function downloadRecording(recordingId: string, fileName: string) {
    const downloadId = `${recordingId}/${fileName}`;
    setDownloadingFile(downloadId);
    setError("");

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/shabbat/recordings/${encodeURIComponent(
          recordingId
        )}/files/${encodeURIComponent(fileName)}/ticket`,
        {
          method: "POST",
          headers: { "X-COTW-Session": memberToken },
        }
      );

      if (!response.ok) throw new Error("Unable to prepare the download.");

      const data = await response.json();
      await Linking.openURL(`${API_BASE_URL}${data.downloadPath}`);
    } catch (downloadError) {
      setError(
        downloadError instanceof Error
          ? downloadError.message
          : "Unable to download the recording."
      );
    } finally {
      setDownloadingFile("");
    }
  }

  return (
    <View
      style={{ width: "100%", maxWidth: 760, alignSelf: "center", gap: 18 }}
    >
      <View
        style={{
          padding: 22,
          borderRadius: 20,
          backgroundColor: "#0b2345",
        }}
      >
        <Text style={{ color: "#ffffff", fontSize: 27, fontWeight: "900" }}>
          Shabbat Gathering
        </Text>
        <Text
          style={{
            marginTop: 8,
            color: "#dbeafe",
            fontSize: 15,
            lineHeight: 22,
          }}
        >
          Join the live Church of the Word gathering through StudyBox.
        </Text>
        <Pressable
          accessibilityRole="link"
          onPress={() => void Linking.openURL(STUDYBOX_URL)}
          style={({ pressed }) => ({
            marginTop: 18,
            minHeight: 48,
            paddingHorizontal: 18,
            borderRadius: 14,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: pressed ? "#d6a936" : "#f4c95d",
          })}
        >
          <Text style={{ color: "#172033", fontSize: 16, fontWeight: "900" }}>
            Open Shabbat Zoom
          </Text>
        </Pressable>
      </View>

      <View
        style={{
          padding: 18,
          borderWidth: 1,
          borderColor: "#d8dee9",
          borderRadius: 18,
          backgroundColor: "#f8fafc",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
          }}
        >
          <View style={{ flex: 1 }}>
            <Text style={{ color: "#081a33", fontSize: 22, fontWeight: "900" }}>
              Previous recordings
            </Text>
            <Text style={{ marginTop: 4, color: "#64748b", fontSize: 13 }}>
              Recent meetings are retained for approximately one month.
            </Text>
          </View>
          <Pressable onPress={() => void loadRecordings()}>
            <Text style={{ color: "#0f766e", fontWeight: "900" }}>Refresh</Text>
          </Pressable>
        </View>

        {isLoading ? (
          <Text style={{ marginTop: 18, color: "#64748b" }}>
            Loading recordings…
          </Text>
        ) : null}

        {error ? (
          <Text style={{ marginTop: 16, color: "#b91c1c", fontWeight: "700" }}>
            {error}
          </Text>
        ) : null}

        {!isLoading && !error && recordings.length === 0 ? (
          <Text style={{ marginTop: 18, color: "#64748b" }}>
            No recordings are available yet.
          </Text>
        ) : null}

        <View style={{ marginTop: recordings.length ? 16 : 0, gap: 12 }}>
          {recordings.map((recording) => (
            <View
              key={recording.id}
              style={{
                padding: 15,
                borderWidth: 1,
                borderColor: "#e2e8f0",
                borderRadius: 14,
                backgroundColor: "#ffffff",
              }}
            >
              <Text
                style={{ color: "#172033", fontSize: 16, fontWeight: "900" }}
              >
                {recording.title}
              </Text>
              <Text style={{ marginTop: 4, color: "#64748b", fontSize: 13 }}>
                {new Date(recording.recordedAt).toLocaleString()}
              </Text>
              <View style={{ marginTop: 12, gap: 8 }}>
                {recording.files.map((file) => {
                  const downloadId = `${recording.id}/${file.name}`;
                  const isDownloading = downloadingFile === downloadId;

                  return (
                    <Pressable
                      key={file.name}
                      disabled={isDownloading}
                      onPress={() =>
                        void downloadRecording(recording.id, file.name)
                      }
                      style={({ pressed }) => ({
                        minHeight: 44,
                        paddingHorizontal: 14,
                        borderRadius: 12,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 12,
                        backgroundColor: pressed ? "#dbeafe" : "#eff6ff",
                      })}
                    >
                      <Text
                        numberOfLines={1}
                        style={{ flex: 1, color: "#1e3a5f", fontWeight: "800" }}
                      >
                        {file.kind === "video" ? "Video" : "Audio"} ·{" "}
                        {file.name}
                      </Text>
                      <Text style={{ color: "#1d4ed8", fontWeight: "900" }}>
                        {isDownloading
                          ? "Opening…"
                          : `Download · ${formatFileSize(file.size)}`}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}
