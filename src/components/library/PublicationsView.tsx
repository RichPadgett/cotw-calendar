import { createElement, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { API_BASE_URL } from "../../config/api";
import type { PublishedPublicationSummary } from "../../types/publication";

export default function PublicationsView({
  height,
  memberToken,
}: {
  height: number;
  memberToken: string;
}) {
  const [items, setItems] = useState<PublishedPublicationSummary[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [pdfObjectUrl, setPdfObjectUrl] = useState<string | null>(null);
  const [isLoadingPdf, setIsLoadingPdf] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch(`${API_BASE_URL}/api/publications/published`, {
      headers: { "X-COTW-Session": memberToken },
      credentials: "include",
    })
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok)
          throw new Error(data.error ?? "Unable to load publications.");
        const releases = Array.isArray(data.items) ? data.items : [];
        setItems(releases);
        setSelectedId((current) => current ?? releases[0]?.id ?? null);
      })
      .catch((error) =>
        setMessage(
          error instanceof Error
            ? error.message
            : "Unable to load publications."
        )
      )
      .finally(() => setIsLoading(false));
  }, [memberToken]);

  const selected = items.find((item) => item.id === selectedId) ?? items[0];

  useEffect(() => {
    if (!selected || Platform.OS !== "web") return;
    let active = true;
    let nextObjectUrl: string | null = null;
    setIsLoadingPdf(true);
    setPdfObjectUrl(null);
    fetch(`${API_BASE_URL}/api/publications/published/${selected.id}/pdf`, {
      headers: { "X-COTW-Session": memberToken },
      credentials: "include",
    })
      .then(async (response) => {
        if (!response.ok) throw new Error("Unable to open this publication.");
        nextObjectUrl = URL.createObjectURL(
          new Blob([await response.arrayBuffer()], { type: "application/pdf" })
        );
        if (active) setPdfObjectUrl(nextObjectUrl);
      })
      .catch((error) => {
        if (active) {
          setMessage(
            error instanceof Error
              ? error.message
              : "Unable to open publication."
          );
        }
      })
      .finally(() => {
        if (active) setIsLoadingPdf(false);
      });
    return () => {
      active = false;
      if (nextObjectUrl) URL.revokeObjectURL(nextObjectUrl);
    };
  }, [memberToken, selected?.id]);

  async function downloadPublication() {
    if (!selected || Platform.OS !== "web") return;
    setMessage("Preparing download…");
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/publications/published/${selected.id}/pdf`,
        {
          headers: { "X-COTW-Session": memberToken },
          credentials: "include",
        }
      );
      if (!response.ok) throw new Error("Unable to download this publication.");
      const objectUrl = URL.createObjectURL(await response.blob());
      const anchor = document.createElement("a");
      anchor.href = objectUrl;
      anchor.download = `${selected.title
        .replace(/[^a-z0-9]+/gi, "-")
        .replace(/^-|-$/g, "")
        .toLowerCase()}-edition-${selected.edition}.pdf`;
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      setTimeout(() => URL.revokeObjectURL(objectUrl), 60_000);
      setMessage("PDF downloaded.");
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Unable to download publication."
      );
    }
  }

  if (isLoading) {
    return (
      <View
        style={{
          minHeight: 360,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ActivityIndicator color="#28523b" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={{ padding: 16, gap: 14 }}>
      <View>
        <Text style={{ fontSize: 26, fontWeight: "900", color: "#173a2a" }}>
          Publications
        </Text>
        <Text style={{ marginTop: 4, color: "#64748b", lineHeight: 20 }}>
          Read the current released editions from the Church of the Word
          library.
        </Text>
      </View>

      {items.length === 0 ? (
        <View style={panelStyle}>
          <Text style={{ color: "#64748b" }}>
            No books have been published yet.
          </Text>
        </View>
      ) : (
        <ScrollView horizontal contentContainerStyle={{ gap: 9 }}>
          {items.map((item) => (
            <Pressable
              key={item.id}
              onPress={() => setSelectedId(item.id)}
              style={[
                bookStyle,
                selected?.id === item.id && {
                  borderColor: "#4d7c0f",
                  backgroundColor: "#f0f7e8",
                },
              ]}
            >
              <MaterialIcons name="menu-book" size={28} color="#28523b" />
              <Text
                numberOfLines={2}
                style={{ fontWeight: "900", color: "#173a2a" }}
              >
                {item.title}
              </Text>
              <Text style={{ fontSize: 12, color: "#64748b" }}>
                Edition {item.edition} · {item.chapterCount} chapters
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      )}

      {selected ? (
        <View style={panelStyle}>
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 12 }}>
            <View style={{ flex: 1, minWidth: 220 }}>
              <Text
                style={{ fontSize: 22, fontWeight: "900", color: "#173a2a" }}
              >
                {selected.title}
              </Text>
              {selected.author ? (
                <Text
                  style={{ marginTop: 4, fontWeight: "700", color: "#475569" }}
                >
                  {selected.author}
                </Text>
              ) : null}
              <Text style={{ marginTop: 6, color: "#64748b", lineHeight: 20 }}>
                Edition {selected.edition} · Published{" "}
                {new Date(selected.publishedAt).toLocaleDateString()}
              </Text>
              {selected.description ? (
                <Text
                  style={{ marginTop: 8, color: "#334155", lineHeight: 21 }}
                >
                  {selected.description}
                </Text>
              ) : null}
            </View>
            <Pressable
              onPress={() => void downloadPublication()}
              style={{
                minHeight: 42,
                paddingHorizontal: 15,
                borderRadius: 10,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                gap: 7,
                backgroundColor: "#28523b",
              }}
            >
              <MaterialIcons name="download" size={19} color="#ffffff" />
              <Text style={{ color: "#ffffff", fontWeight: "900" }}>
                Download PDF
              </Text>
            </Pressable>
          </View>
          {isLoadingPdf ? (
            <View
              style={{
                minHeight: 280,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ActivityIndicator color="#28523b" />
              <Text style={{ marginTop: 10, color: "#64748b" }}>
                Loading book…
              </Text>
            </View>
          ) : Platform.OS === "web" && pdfObjectUrl ? (
            createElement("iframe" as any, {
              title: `${selected.title} PDF reader`,
              src: `${pdfObjectUrl}#view=FitH`,
              style: {
                display: "block",
                width: "100%",
                height: `${Math.max(620, height - 250)}px`,
                border: "1px solid #dbe4dc",
                borderRadius: "12px",
                background: "#f8fafc",
              },
            })
          ) : null}
        </View>
      ) : null}
      {message ? (
        <Text style={{ color: "#28523b", fontWeight: "800" }}>{message}</Text>
      ) : null}
    </ScrollView>
  );
}

const panelStyle = {
  padding: 14,
  gap: 12,
  borderWidth: 1,
  borderColor: "#dbe4dc",
  borderRadius: 14,
  backgroundColor: "#ffffff",
} as const;

const bookStyle = {
  width: 220,
  minHeight: 120,
  padding: 13,
  gap: 7,
  borderWidth: 1,
  borderColor: "#dbe4dc",
  borderRadius: 12,
  backgroundColor: "#ffffff",
} as const;
