/*
 * File: src/components/hebrew/HebrewStudyView.tsx
 * Purpose: Hebrew Letter Study tab - the 22-letter alphabet reference plus a
 * searchable, admin-editable glossary of Hebrew/Aramaic words and names.
 */

import { useEffect, useMemo, useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { apiUrl } from "../../config/api";

type HebrewLetter = {
  order: number;
  name: string;
  letter: string;
  transliteration: string;
  sound: string;
  meaning: string;
};

type GlossaryTerm = {
  key: string;
  word: string;
  transliteration: string;
  pronunciation: string;
  definition: string;
  note: string;
};

type GlossaryDraft = {
  key: string;
  word: string;
  transliteration: string;
  pronunciation: string;
  definition: string;
  note: string;
};

const EMPTY_DRAFT: GlossaryDraft = {
  key: "",
  word: "",
  transliteration: "",
  pronunciation: "",
  definition: "",
  note: "",
};

export default function HebrewStudyView({
  adminToken,
  groupCode,
  userRole,
}: {
  adminToken: string;
  groupCode: string;
  userRole: string;
}) {
  const isAdmin = userRole === "admin" && Boolean(adminToken);

  const [subTab, setSubTab] = useState<"alphabet" | "glossary">("alphabet");
  const [letters, setLetters] = useState<HebrewLetter[]>([]);
  const [terms, setTerms] = useState<GlossaryTerm[]>([]);
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [draft, setDraft] = useState<GlossaryDraft | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    let isCancelled = false;

    (async () => {
      try {
        const response = await fetch(apiUrl("/hebrew/alphabet"));
        const data = await response.json();

        if (!isCancelled) {
          setLetters(data.letters ?? []);
        }
      } catch {
        // Alphabet is static reference data; a failed load just leaves the grid empty.
      }
    })();

    return () => {
      isCancelled = true;
    };
  }, []);

  useEffect(() => {
    let isCancelled = false;
    setIsLoading(true);

    const timeoutId = setTimeout(async () => {
      try {
        const query = searchText.trim()
          ? `?search=${encodeURIComponent(searchText.trim())}`
          : "";
        const response = await fetch(apiUrl(`/hebrew/glossary${query}`));
        const data = await response.json();

        if (!isCancelled) {
          setTerms(data.terms ?? []);
        }
      } catch {
        if (!isCancelled) {
          setTerms([]);
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    }, 200);

    return () => {
      isCancelled = true;
      clearTimeout(timeoutId);
    };
  }, [searchText]);

  async function refreshGlossary() {
    try {
      const query = searchText.trim()
        ? `?search=${encodeURIComponent(searchText.trim())}`
        : "";
      const response = await fetch(apiUrl(`/hebrew/glossary${query}`));
      const data = await response.json();
      setTerms(data.terms ?? []);
    } catch {
      // keep the previous list if the refresh fails
    }
  }

  async function submitDraft() {
    if (!draft) return;

    setIsSubmitting(true);
    setMessage(null);

    try {
      const isEditing = terms.some((term) => term.key === draft.key);
      const url = isEditing
        ? apiUrl(
            `/hebrew/glossary/${encodeURIComponent(draft.key)}?groupCode=${encodeURIComponent(groupCode)}`
          )
        : apiUrl(`/hebrew/glossary?groupCode=${encodeURIComponent(groupCode)}`);

      const response = await fetch(url, {
        method: isEditing ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify(draft),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data?.error ?? "Failed to save glossary term.");
        return;
      }

      setDraft(null);
      setMessage("Glossary term saved.");
      await refreshGlossary();
    } catch {
      setMessage("Failed to save glossary term.");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function deleteTerm(key: string) {
    setMessage(null);

    try {
      const response = await fetch(
        apiUrl(
          `/hebrew/glossary/${encodeURIComponent(key)}?groupCode=${encodeURIComponent(groupCode)}`
        ),
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(data?.error ?? "Failed to delete glossary term.");
        return;
      }

      setMessage("Glossary term deleted.");
      await refreshGlossary();
    } catch {
      setMessage("Failed to delete glossary term.");
    }
  }

  const sortedLetters = useMemo(
    () => [...letters].sort((a, b) => a.order - b.order),
    [letters]
  );

  return (
    <View style={{ gap: 14 }}>
      <View style={styles.subTabRow}>
        <Pressable
          onPress={() => setSubTab("alphabet")}
          style={[
            styles.subTabButton,
            subTab === "alphabet" && styles.subTabButtonActive,
          ]}
        >
          <Text
            style={[
              styles.subTabText,
              subTab === "alphabet" && styles.subTabTextActive,
            ]}
          >
            Alphabet
          </Text>
        </Pressable>

        <Pressable
          onPress={() => setSubTab("glossary")}
          style={[
            styles.subTabButton,
            subTab === "glossary" && styles.subTabButtonActive,
          ]}
        >
          <Text
            style={[
              styles.subTabText,
              subTab === "glossary" && styles.subTabTextActive,
            ]}
          >
            Glossary
          </Text>
        </Pressable>
      </View>

      {subTab === "alphabet" ? (
        <View style={styles.letterGrid}>
          {sortedLetters.map((letter) => (
            <View key={letter.order} style={styles.letterCard}>
              <Text style={styles.letterGlyph}>{letter.letter}</Text>
              <Text style={styles.letterName}>{letter.name}</Text>
              <Text style={styles.letterTransliteration}>
                {letter.transliteration}
              </Text>
              <Text style={styles.letterSound}>{letter.sound}</Text>
              <Text style={styles.letterMeaning}>{letter.meaning}</Text>
            </View>
          ))}
        </View>
      ) : (
        <View style={{ gap: 12 }}>
          <View style={styles.searchRow}>
            <MaterialIcons name="search" size={18} color="#64748b" />
            <TextInput
              value={searchText}
              onChangeText={setSearchText}
              placeholder="Search the glossary (e.g. Holy Spirit, Peter, Shalom)"
              placeholderTextColor="#94a3b8"
              style={styles.searchInput}
            />
          </View>

          {isAdmin ? (
            <Pressable
              onPress={() =>
                setDraft(draft ? null : { ...EMPTY_DRAFT })
              }
              style={styles.addButton}
            >
              <MaterialIcons
                name={draft ? "close" : "add"}
                size={16}
                color="#ffffff"
              />
              <Text style={styles.addButtonText}>
                {draft ? "Cancel" : "Add Term"}
              </Text>
            </Pressable>
          ) : null}

          {draft ? (
            <View style={styles.draftForm}>
              <TextInput
                value={draft.key}
                onChangeText={(value) =>
                  setDraft((current) => (current ? { ...current, key: value } : current))
                }
                placeholder="key (lowercase, e.g. holy_spirit)"
                placeholderTextColor="#94a3b8"
                style={styles.draftInput}
                editable={!terms.some((term) => term.key === draft.key)}
              />
              <TextInput
                value={draft.word}
                onChangeText={(value) =>
                  setDraft((current) => (current ? { ...current, word: value } : current))
                }
                placeholder="Hebrew word (e.g. שָׁלוֹם)"
                placeholderTextColor="#94a3b8"
                style={styles.draftInput}
              />
              <TextInput
                value={draft.transliteration}
                onChangeText={(value) =>
                  setDraft((current) =>
                    current ? { ...current, transliteration: value } : current
                  )
                }
                placeholder="Transliteration (e.g. Shalom)"
                placeholderTextColor="#94a3b8"
                style={styles.draftInput}
              />
              <TextInput
                value={draft.pronunciation}
                onChangeText={(value) =>
                  setDraft((current) =>
                    current ? { ...current, pronunciation: value } : current
                  )
                }
                placeholder="Pronunciation (e.g. shah-LOHM)"
                placeholderTextColor="#94a3b8"
                style={styles.draftInput}
              />
              <TextInput
                value={draft.definition}
                onChangeText={(value) =>
                  setDraft((current) =>
                    current ? { ...current, definition: value } : current
                  )
                }
                placeholder="Definition"
                placeholderTextColor="#94a3b8"
                style={[styles.draftInput, styles.draftInputMultiline]}
                multiline
              />
              <TextInput
                value={draft.note}
                onChangeText={(value) =>
                  setDraft((current) => (current ? { ...current, note: value } : current))
                }
                placeholder="Optional note / fun fact"
                placeholderTextColor="#94a3b8"
                style={[styles.draftInput, styles.draftInputMultiline]}
                multiline
              />

              <Pressable
                onPress={submitDraft}
                disabled={isSubmitting}
                style={[styles.saveButton, isSubmitting && { opacity: 0.6 }]}
              >
                <Text style={styles.saveButtonText}>
                  {isSubmitting ? "Saving..." : "Save Term"}
                </Text>
              </Pressable>
            </View>
          ) : null}

          {message ? <Text style={styles.message}>{message}</Text> : null}

          {isLoading ? (
            <Text style={styles.mutedText}>Loading...</Text>
          ) : terms.length === 0 ? (
            <Text style={styles.mutedText}>No glossary terms found.</Text>
          ) : (
            terms.map((term) => (
              <View key={term.key} style={styles.termCard}>
                <View style={styles.termHeaderRow}>
                  <Text style={styles.termWord}>{term.word}</Text>
                  <Text style={styles.termTransliteration}>
                    {term.transliteration}
                  </Text>
                </View>

                <Text style={styles.termPronunciation}>
                  {term.pronunciation}
                </Text>
                <Text style={styles.termDefinition}>{term.definition}</Text>

                {term.note ? (
                  <Text style={styles.termNote}>{term.note}</Text>
                ) : null}

                {isAdmin ? (
                  <View style={styles.termActionsRow}>
                    <Pressable
                      onPress={() =>
                        setDraft({
                          key: term.key,
                          word: term.word,
                          transliteration: term.transliteration,
                          pronunciation: term.pronunciation,
                          definition: term.definition,
                          note: term.note,
                        })
                      }
                    >
                      <MaterialIcons name="edit" size={16} color="#0f766e" />
                    </Pressable>

                    <Pressable onPress={() => deleteTerm(term.key)}>
                      <MaterialIcons
                        name="delete-outline"
                        size={16}
                        color="#b91c1c"
                      />
                    </Pressable>
                  </View>
                ) : null}
              </View>
            ))
          )}
        </View>
      )}
    </View>
  );
}

const styles = {
  subTabRow: {
    flexDirection: "row" as const,
    gap: 8,
  },
  subTabButton: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: "#f1f5f9",
  },
  subTabButtonActive: {
    backgroundColor: "#0f766e",
  },
  subTabText: {
    fontSize: 13,
    fontWeight: "700" as const,
    color: "#334155",
  },
  subTabTextActive: {
    color: "#ffffff",
  },
  letterGrid: {
    flexDirection: "row" as const,
    flexWrap: "wrap" as const,
    gap: 10,
  },
  letterCard: {
    width: 150,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    backgroundColor: "#ffffff",
    gap: 2,
  },
  letterGlyph: {
    fontSize: 30,
    textAlign: "center" as const,
    color: "#0f172a",
  },
  letterName: {
    fontSize: 13,
    fontWeight: "800" as const,
    color: "#0f172a",
    textAlign: "center" as const,
  },
  letterTransliteration: {
    fontSize: 11,
    color: "#0f766e",
    textAlign: "center" as const,
  },
  letterSound: {
    fontSize: 11,
    color: "#475569",
    textAlign: "center" as const,
  },
  letterMeaning: {
    fontSize: 11,
    color: "#64748b",
    textAlign: "center" as const,
    marginTop: 2,
  },
  searchRow: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
    gap: 8,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: "#ffffff",
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: "#0f172a",
  },
  addButton: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
    alignSelf: "flex-start" as const,
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: "#0f766e",
  },
  addButtonText: {
    color: "#ffffff",
    fontSize: 13,
    fontWeight: "700" as const,
  },
  draftForm: {
    gap: 8,
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#bae6fd",
    backgroundColor: "#f0f9ff",
  },
  draftInput: {
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 13,
    color: "#0f172a",
    backgroundColor: "#ffffff",
  },
  draftInputMultiline: {
    minHeight: 60,
    textAlignVertical: "top" as const,
  },
  saveButton: {
    alignSelf: "flex-start" as const,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: "#0f766e",
  },
  saveButtonText: {
    color: "#ffffff",
    fontSize: 13,
    fontWeight: "700" as const,
  },
  message: {
    fontSize: 12,
    color: "#0f766e",
  },
  mutedText: {
    fontSize: 13,
    color: "#94a3b8",
  },
  termCard: {
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    backgroundColor: "#ffffff",
    gap: 4,
  },
  termHeaderRow: {
    flexDirection: "row" as const,
    alignItems: "baseline" as const,
    gap: 10,
  },
  termWord: {
    fontSize: 20,
    color: "#0f172a",
  },
  termTransliteration: {
    fontSize: 14,
    fontWeight: "800" as const,
    color: "#0f766e",
  },
  termPronunciation: {
    fontSize: 12,
    fontStyle: "italic" as const,
    color: "#64748b",
  },
  termDefinition: {
    fontSize: 13,
    color: "#334155",
  },
  termNote: {
    fontSize: 12,
    color: "#64748b",
    marginTop: 2,
  },
  termActionsRow: {
    flexDirection: "row" as const,
    gap: 14,
    marginTop: 4,
  },
};
