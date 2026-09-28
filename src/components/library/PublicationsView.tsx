import { useEffect, useState } from "react";
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
import type {
  PublishedPublicationReader,
  PublishedPublicationSummary,
} from "../../types/publication";

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
  const [book, setBook] = useState<PublishedPublicationReader | null>(null);
  const [isLoadingBook, setIsLoadingBook] = useState(false);

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
    if (!selected) return;
    let active = true;
    setIsLoadingBook(true);
    setBook(null);
    fetch(`${API_BASE_URL}/api/publications/published/${selected.id}`, {
      headers: { "X-COTW-Session": memberToken },
      credentials: "include",
    })
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok)
          throw new Error(data.error ?? "Unable to open this publication.");
        if (active) setBook(data as PublishedPublicationReader);
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
        if (active) setIsLoadingBook(false);
      });
    return () => {
      active = false;
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
          {isLoadingBook ? (
            <View
              style={{
                minHeight: 280,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ActivityIndicator color="#28523b" />
              <Text style={{ marginTop: 10, color: "#64748b" }}>
                Opening book…
              </Text>
            </View>
          ) : book ? (
            <BookReader book={book} minHeight={Math.max(620, height - 250)} />
          ) : null}
        </View>
      ) : null}
      {message ? (
        <Text style={{ color: "#28523b", fontWeight: "800" }}>{message}</Text>
      ) : null}
    </ScrollView>
  );
}

function BookReader({
  book,
  minHeight,
}: {
  book: PublishedPublicationReader;
  minHeight: number;
}) {
  const parts = [...book.parts].sort(
    (left, right) => left.sortOrder - right.sortOrder
  );
  const unassigned = book.chapters
    .filter((chapter) => !chapter.partId)
    .sort((left, right) => left.sortOrder - right.sortOrder);
  return (
    <View
      style={{
        minHeight,
        paddingVertical: 18,
        borderRadius: 12,
        backgroundColor: "#e8ece9",
      }}
    >
      <View style={pageStyle}>
        <Text style={coverTitleStyle}>{book.title}</Text>
        {book.author ? (
          <Text style={coverAuthorStyle}>{book.author}</Text>
        ) : null}
        {book.description ? (
          <Text style={coverDescriptionStyle}>{book.description}</Text>
        ) : null}
        <Text style={editionStyle}>Edition {book.edition}</Text>
      </View>
      {parts.map((part) => {
        const chapters = book.chapters
          .filter((chapter) => chapter.partId === part.id)
          .sort((left, right) => left.sortOrder - right.sortOrder);
        if (!chapters.some(chapterHasText)) return null;
        return (
          <View key={part.id}>
            <View style={pageStyle}>
              <Text style={partLabelStyle}>PART</Text>
              <Text style={partTitleStyle}>{part.title}</Text>
              {part.summary ? (
                <Text style={summaryStyle}>{part.summary}</Text>
              ) : null}
            </View>
            {chapters.filter(chapterHasText).map((chapter) => (
              <ChapterReader key={chapter.id} chapter={chapter} />
            ))}
          </View>
        );
      })}
      {unassigned.filter(chapterHasText).map((chapter) => (
        <ChapterReader key={chapter.id} chapter={chapter} />
      ))}
    </View>
  );
}

function ChapterReader({
  chapter,
}: {
  chapter: PublishedPublicationReader["chapters"][number];
}) {
  return (
    <View style={pageStyle}>
      <Text style={chapterTitleStyle}>{chapter.title}</Text>
      {chapter.summary ? (
        <Text style={summaryStyle}>{chapter.summary}</Text>
      ) : null}
      {chapter.manuscript.trim() ? (
        <ManuscriptText value={chapter.manuscript} />
      ) : null}
      {chapter.sections.map((section) =>
        section.manuscript.trim() ? (
          <View key={section.id} style={{ marginTop: 22 }}>
            <Text style={sectionTitleStyle}>{section.title}</Text>
            {section.summary ? (
              <Text style={summaryStyle}>{section.summary}</Text>
            ) : null}
            <ManuscriptText value={section.manuscript} />
          </View>
        ) : null
      )}
    </View>
  );
}

function ManuscriptText({ value }: { value: string }) {
  return (
    <View style={{ marginTop: 12, gap: 12 }}>
      {value
        .split(/\n\s*\n/)
        .map((block) => block.trim())
        .filter(Boolean)
        .flatMap((block, blockIndex) =>
          block.split("\n").map((line, lineIndex) => {
            const heading = line.trim().match(/^(#{1,4})\s+(.+)$/);
            if (heading) {
              const level = heading[1].length;
              return (
                <Text
                  key={`${blockIndex}-${lineIndex}`}
                  style={
                    level <= 2
                      ? manuscriptHeadingStyle
                      : manuscriptSubheadingStyle
                  }
                >
                  {heading[2]}
                </Text>
              );
            }
            return (
              <Text
                key={`${blockIndex}-${lineIndex}`}
                selectable
                style={bodyStyle}
              >
                {line.trim()}
              </Text>
            );
          })
        )}
    </View>
  );
}

function chapterHasText(
  chapter: PublishedPublicationReader["chapters"][number]
) {
  return Boolean(
    chapter.manuscript.trim() ||
    chapter.sections.some((section) => section.manuscript.trim())
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

const pageStyle = {
  width: "94%",
  maxWidth: 820,
  minHeight: 520,
  alignSelf: "center",
  marginVertical: 10,
  paddingHorizontal: 34,
  paddingVertical: 42,
  borderRadius: 4,
  backgroundColor: "#ffffff",
  shadowColor: "#0f172a",
  shadowOpacity: 0.12,
  shadowRadius: 10,
  shadowOffset: { width: 0, height: 4 },
} as const;
const coverTitleStyle = {
  marginTop: 70,
  textAlign: "center",
  fontSize: 36,
  lineHeight: 44,
  fontWeight: "900",
  color: "#28523b",
} as const;
const coverAuthorStyle = {
  marginTop: 30,
  textAlign: "center",
  fontSize: 17,
  color: "#1f2937",
} as const;
const coverDescriptionStyle = {
  marginTop: 32,
  textAlign: "center",
  fontSize: 15,
  lineHeight: 24,
  color: "#64748b",
} as const;
const editionStyle = {
  marginTop: 70,
  textAlign: "center",
  fontSize: 12,
  letterSpacing: 1.2,
  color: "#64748b",
} as const;
const partLabelStyle = {
  marginTop: 45,
  fontSize: 13,
  letterSpacing: 1.4,
  fontWeight: "900",
  color: "#28523b",
} as const;
const partTitleStyle = {
  marginTop: 10,
  fontSize: 31,
  lineHeight: 38,
  fontWeight: "900",
  color: "#28523b",
} as const;
const chapterTitleStyle = {
  fontSize: 27,
  lineHeight: 34,
  fontWeight: "900",
  color: "#28523b",
} as const;
const sectionTitleStyle = {
  fontSize: 19,
  lineHeight: 25,
  fontWeight: "900",
  color: "#28523b",
} as const;
const manuscriptHeadingStyle = {
  marginTop: 9,
  fontSize: 17,
  lineHeight: 23,
  fontWeight: "900",
  color: "#28523b",
} as const;
const manuscriptSubheadingStyle = {
  marginTop: 6,
  fontSize: 15,
  lineHeight: 21,
  fontWeight: "900",
  color: "#365247",
} as const;
const summaryStyle = {
  marginTop: 8,
  fontSize: 14,
  lineHeight: 21,
  fontStyle: "italic",
  color: "#64748b",
} as const;
const bodyStyle = {
  fontFamily: "Georgia, serif",
  fontSize: 16,
  lineHeight: 27,
  color: "#1f2937",
} as const;
