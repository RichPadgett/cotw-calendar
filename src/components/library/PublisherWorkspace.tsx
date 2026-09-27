import { createElement, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { API_BASE_URL } from "../../config/api";
import type { LibraryTeaching } from "../../types/library";
import type {
  PublicationChapter,
  PublicationProject,
  PublicationProjectSummary,
  PublicationReviewNote,
} from "../../types/publication";

type WorkspaceTab =
  | "sources"
  | "outline"
  | "manuscript"
  | "ai"
  | "review"
  | "export";

export default function PublisherWorkspace({
  adminToken,
  teachings,
}: {
  adminToken: string;
  teachings: LibraryTeaching[];
}) {
  const [projects, setProjects] = useState<PublicationProjectSummary[]>([]);
  const [project, setProject] = useState<PublicationProject | null>(null);
  const [tab, setTab] = useState<WorkspaceTab>("sources");
  const [message, setMessage] = useState("");
  const [isBusy, setIsBusy] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [selectedTeachingId, setSelectedTeachingId] = useState(teachings[0]?.id ?? "");
  const [selectedChapterId, setSelectedChapterId] = useState<string | null>(null);
  const [reviewText, setReviewText] = useState("");

  const authHeaders = {
    Authorization: `Bearer ${adminToken}`,
    "Content-Type": "application/json",
  };

  async function loadProjects() {
    const response = await fetch(`${API_BASE_URL}/api/publications`, {
      headers: authHeaders,
    });
    if (!response.ok) throw new Error("Unable to load publication projects.");
    const data = await response.json();
    setProjects(Array.isArray(data.items) ? data.items : []);
  }

  useEffect(() => {
    void loadProjects().catch((error) => setMessage(error.message));
  }, [adminToken]);

  useEffect(() => {
    if (!selectedTeachingId && teachings[0]?.id) setSelectedTeachingId(teachings[0].id);
  }, [selectedTeachingId, teachings]);

  async function openProject(projectId: string) {
    setIsBusy(true);
    setMessage("");
    try {
      const response = await fetch(`${API_BASE_URL}/api/publications/${projectId}`, {
        headers: authHeaders,
      });
      if (!response.ok) throw new Error("Unable to open the project.");
      const nextProject = (await response.json()) as PublicationProject;
      setProject(nextProject);
      setSelectedChapterId(nextProject.chapters[0]?.id ?? null);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to open project.");
    } finally {
      setIsBusy(false);
    }
  }

  async function createProject() {
    if (!newTitle.trim()) return;
    setIsBusy(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/publications`, {
        method: "POST",
        headers: authHeaders,
        body: JSON.stringify({ title: newTitle, author: newAuthor }),
      });
      if (!response.ok) throw new Error("Unable to create the project.");
      const nextProject = (await response.json()) as PublicationProject;
      setProject(nextProject);
      setNewTitle("");
      setNewAuthor("");
      await loadProjects();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to create project.");
    } finally {
      setIsBusy(false);
    }
  }

  async function saveProject(nextProject = project) {
    if (!nextProject) return;
    setIsBusy(true);
    setMessage("");
    try {
      const response = await fetch(`${API_BASE_URL}/api/publications/${nextProject.id}`, {
        method: "PUT",
        headers: authHeaders,
        body: JSON.stringify(nextProject),
      });
      if (!response.ok) throw new Error("Unable to save the project.");
      setProject((await response.json()) as PublicationProject);
      setMessage("Project saved.");
      await loadProjects();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to save project.");
    } finally {
      setIsBusy(false);
    }
  }

  async function addSource(input: Record<string, unknown>) {
    if (!project) return;
    const response = await fetch(`${API_BASE_URL}/api/publications/${project.id}/sources`, {
      method: "POST",
      headers: authHeaders,
      body: JSON.stringify(input),
    });
    if (!response.ok) throw new Error("Unable to add source material.");
    await openProject(project.id);
  }

  function addChapter() {
    if (!project) return;
    const chapter: PublicationChapter = {
      id: globalThis.crypto?.randomUUID?.() ?? `chapter-${Date.now()}`,
      title: `Chapter ${project.chapters.length + 1}`,
      summary: "",
      sourceIds: [],
      manuscript: "",
      sortOrder: project.chapters.length,
    };
    setProject({ ...project, chapters: [...project.chapters, chapter] });
    setSelectedChapterId(chapter.id);
  }

  function moveChapter(index: number, direction: -1 | 1) {
    if (!project) return;
    const target = index + direction;
    if (target < 0 || target >= project.chapters.length) return;
    const chapters = [...project.chapters];
    [chapters[index], chapters[target]] = [chapters[target], chapters[index]];
    setProject({ ...project, chapters: chapters.map((item, sortOrder) => ({ ...item, sortOrder })) });
  }

  function moveSource(index: number, direction: -1 | 1) {
    if (!project) return;
    const target = index + direction;
    if (target < 0 || target >= project.sources.length) return;
    const sources = [...project.sources];
    [sources[index], sources[target]] = [sources[target], sources[index]];
    setProject({
      ...project,
      sources: sources.map((item, sortOrder) => ({ ...item, sortOrder })),
    });
  }

  function updateChapter(chapterId: string, patch: Partial<PublicationChapter>) {
    if (!project) return;
    setProject({
      ...project,
      chapters: project.chapters.map((chapter) =>
        chapter.id === chapterId ? { ...chapter, ...patch } : chapter
      ),
    });
  }

  async function uploadFile(file: File) {
    if (!project) return;
    const form = new FormData();
    form.append("file", file);
    const response = await fetch(
      `${API_BASE_URL}/api/publications/${project.id}/sources/upload`,
      { method: "POST", headers: { Authorization: `Bearer ${adminToken}` }, body: form }
    );
    if (!response.ok) throw new Error("Unable to upload publication file.");
    await openProject(project.id);
  }

  if (!project) {
    return (
      <ScrollView contentContainerStyle={{ padding: 18, gap: 16 }}>
        <SectionTitle title="Publisher" subtitle="Build books from teachings, documents, images, and editorial notes." />
        <Panel>
          <Text style={labelStyle}>New book project</Text>
          <TextInput value={newTitle} onChangeText={setNewTitle} placeholder="Working title" style={inputStyle} />
          <TextInput value={newAuthor} onChangeText={setNewAuthor} placeholder="Author or editor" style={inputStyle} />
          <ActionButton label="Create project" icon="add" onPress={() => void createProject()} disabled={!newTitle.trim() || isBusy} />
        </Panel>
        <Panel>
          <Text style={labelStyle}>Book projects</Text>
          {projects.length === 0 ? <Text style={mutedStyle}>No publication projects yet.</Text> : null}
          {projects.map((item) => (
            <Pressable key={item.id} onPress={() => void openProject(item.id)} style={rowStyle}>
              <View style={{ flex: 1 }}>
                <Text style={rowTitleStyle}>{item.title}</Text>
                <Text style={mutedStyle}>{item.sourceCount} sources · {item.chapterCount} chapters · {item.status}</Text>
              </View>
              <MaterialIcons name="chevron-right" size={22} color="#64748b" />
            </Pressable>
          ))}
        </Panel>
        {isBusy ? <ActivityIndicator /> : null}
        {message ? <Text style={messageStyle}>{message}</Text> : null}
      </ScrollView>
    );
  }

  const selectedChapter =
    project.chapters.find((chapter) => chapter.id === selectedChapterId) ?? project.chapters[0];

  return (
    <View style={{ flex: 1 }}>
      <View style={{ padding: 14, borderBottomWidth: 1, borderBottomColor: "#dbe4dc", gap: 10 }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <Pressable onPress={() => setProject(null)}><MaterialIcons name="arrow-back" size={24} color="#244f35" /></Pressable>
          <View style={{ flex: 1 }}>
            <TextInput value={project.title} onChangeText={(title) => setProject({ ...project, title })} style={{ fontSize: 21, fontWeight: "900", color: "#10231a" }} />
            <Text style={mutedStyle}>{project.sources.length} sources · {project.chapters.length} chapters</Text>
          </View>
          <ActionButton label={isBusy ? "Saving…" : "Save"} icon="save" onPress={() => void saveProject()} disabled={isBusy} compact />
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 7 }}>
          {(["sources", "outline", "manuscript", "ai", "review", "export"] as WorkspaceTab[]).map((item) => (
            <Pressable key={item} onPress={() => setTab(item)} style={[tabStyle, tab === item && activeTabStyle]}>
              <Text style={{ fontWeight: "900", color: tab === item ? "#ffffff" : "#365247", textTransform: "capitalize" }}>{item}</Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      <ScrollView contentContainerStyle={{ padding: 16, gap: 14 }}>
        {tab === "sources" ? (
          <>
            <SectionTitle title="Source Library" subtitle="Original material remains separate from the manuscript and traceable to every chapter." />
            <Panel>
              <Text style={labelStyle}>Add a teaching</Text>
              <ScrollView horizontal contentContainerStyle={{ gap: 8 }}>
                {teachings.slice(0, 100).map((teaching) => (
                  <Pressable key={teaching.id} onPress={() => setSelectedTeachingId(teaching.id)} style={[choiceStyle, selectedTeachingId === teaching.id && selectedChoiceStyle]}>
                    <Text numberOfLines={2} style={{ width: 160, fontWeight: "800", color: "#1f2937" }}>{teaching.title}</Text>
                  </Pressable>
                ))}
              </ScrollView>
              <ActionButton label="Add selected teaching" icon="library-add" disabled={!selectedTeachingId} onPress={() => {
                const teaching = teachings.find((item) => item.id === selectedTeachingId);
                if (teaching) void addSource({ type: "teaching", title: teaching.title, recordingId: teaching.id });
              }} />
            </Panel>
            <Panel>
              <Text style={labelStyle}>Add notes or an outside link</Text>
              <TextInput value={noteTitle} onChangeText={setNoteTitle} placeholder="Source title" style={inputStyle} />
              <TextInput value={noteContent} onChangeText={setNoteContent} placeholder="Editorial notes or source text" multiline style={[inputStyle, { minHeight: 90 }]} />
              <TextInput value={linkUrl} onChangeText={setLinkUrl} placeholder="Optional URL" autoCapitalize="none" style={inputStyle} />
              <ActionButton label="Add source" icon="note-add" disabled={!noteTitle.trim()} onPress={() => void addSource({ type: linkUrl ? "url" : "note", title: noteTitle, content: noteContent, url: linkUrl }).then(() => { setNoteTitle(""); setNoteContent(""); setLinkUrl(""); })} />
            </Panel>
            {Platform.OS === "web" ? (
              <Panel>
                <Text style={labelStyle}>Upload images, PDFs, or documents</Text>
                {createElement("input", {
                  type: "file",
                  accept: "image/*,.pdf,.doc,.docx,.txt,.md",
                  onChange: (event: any) => {
                    const file = event.target.files?.[0] as File | undefined;
                    if (file) void uploadFile(file).catch((error) => setMessage(error.message));
                    event.target.value = "";
                  },
                })}
                <Text style={mutedStyle}>Maximum file size: 30 MB. Files remain private to the admin Publisher.</Text>
              </Panel>
            ) : null}
            <Panel>
              <Text style={labelStyle}>Collected sources</Text>
              {project.sources.map((source, index) => (
                <View key={source.id} style={rowStyle}>
                  <MaterialIcons name={source.type === "image" ? "image" : source.type === "teaching" ? "record-voice-over" : "description"} size={22} color="#386641" />
                  <View style={{ flex: 1 }}><Text style={rowTitleStyle}>{source.title}</Text><Text style={mutedStyle}>{index + 1}. {source.type}</Text></View>
                  <Pressable accessibilityLabel={`Move ${source.title} earlier`} onPress={() => moveSource(index, -1)}><MaterialIcons name="arrow-upward" size={20} color="#475569" /></Pressable>
                  <Pressable accessibilityLabel={`Move ${source.title} later`} onPress={() => moveSource(index, 1)}><MaterialIcons name="arrow-downward" size={20} color="#475569" /></Pressable>
                </View>
              ))}
            </Panel>
          </>
        ) : null}

        {tab === "outline" ? (
          <>
            <SectionTitle title="Outline" subtitle="Arrange chapters and attach the sources each chapter may use." />
            <ActionButton label="Add chapter" icon="add" onPress={addChapter} />
            {project.chapters.map((chapter, index) => (
              <Panel key={chapter.id}>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                  <Text style={{ fontWeight: "900", color: "#64748b" }}>{index + 1}</Text>
                  <TextInput value={chapter.title} onChangeText={(title) => updateChapter(chapter.id, { title })} style={[inputStyle, { flex: 1 }]} />
                  <Pressable onPress={() => moveChapter(index, -1)}><MaterialIcons name="arrow-upward" size={20} color="#475569" /></Pressable>
                  <Pressable onPress={() => moveChapter(index, 1)}><MaterialIcons name="arrow-downward" size={20} color="#475569" /></Pressable>
                </View>
                <TextInput value={chapter.summary} onChangeText={(summary) => updateChapter(chapter.id, { summary })} placeholder="Purpose and summary for this chapter" multiline style={[inputStyle, { minHeight: 70 }]} />
                <Text style={labelStyle}>Sources for this chapter</Text>
                <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 7 }}>
                  {project.sources.map((source) => {
                    const selected = chapter.sourceIds.includes(source.id);
                    return <Pressable key={source.id} onPress={() => updateChapter(chapter.id, { sourceIds: selected ? chapter.sourceIds.filter((id) => id !== source.id) : [...chapter.sourceIds, source.id] })} style={[choiceStyle, selected && selectedChoiceStyle]}><Text style={{ fontWeight: "800" }}>{source.title}</Text></Pressable>;
                  })}
                </View>
              </Panel>
            ))}
          </>
        ) : null}

        {tab === "manuscript" ? (
          <>
            <SectionTitle title="Manuscript" subtitle="Edit one chapter at a time while retaining its source assignments." />
            <ScrollView horizontal contentContainerStyle={{ gap: 7 }}>
              {project.chapters.map((chapter) => <Pressable key={chapter.id} onPress={() => setSelectedChapterId(chapter.id)} style={[choiceStyle, selectedChapter?.id === chapter.id && selectedChoiceStyle]}><Text style={{ fontWeight: "900" }}>{chapter.title}</Text></Pressable>)}
            </ScrollView>
            {selectedChapter ? (
              <Panel>
                <Text style={labelStyle}>{selectedChapter.title}</Text>
                <TextInput value={selectedChapter.manuscript} onChangeText={(manuscript) => updateChapter(selectedChapter.id, { manuscript })} placeholder="Draft or paste chapter text here…" multiline textAlignVertical="top" style={[inputStyle, { minHeight: 430, lineHeight: 23 }]} />
                <View style={{ padding: 12, borderRadius: 10, backgroundColor: "#fff7ed" }}><Text style={{ color: "#9a3412", fontWeight: "800" }}>AI cleanup and chapter drafting will be enabled after the OpenAI project key and editorial prompt are approved.</Text></View>
              </Panel>
            ) : <Text style={mutedStyle}>Add a chapter in Outline first.</Text>}
          </>
        ) : null}

        {tab === "ai" ? (
          <>
            <SectionTitle title="AI Editorial Studio" subtitle="Run deliberate editorial stages against selected source material while preserving traceability." />
            {[
              ["Clean source material", "Remove greetings, technical discussion, and conversational repetition without changing the teaching."],
              ["Propose sections", "Identify themes and propose an ordered chapter-and-section structure."],
              ["Draft selected chapter", "Turn the assigned sources into readable prose using the approved outline."],
              ["Verify against sources", "Flag unsupported claims, changed meaning, missing qualifications, and scripture references needing review."],
            ].map(([title, description]) => (
              <Panel key={title}>
                <Text style={rowTitleStyle}>{title}</Text>
                <Text style={mutedStyle}>{description}</Text>
                <ActionButton label="OpenAI setup required" icon="auto-awesome" disabled onPress={() => undefined} />
              </Panel>
            ))}
            <View style={{ padding: 14, borderRadius: 12, backgroundColor: "#fff7ed", borderWidth: 1, borderColor: "#fed7aa" }}>
              <Text style={{ color: "#9a3412", fontWeight: "900" }}>The editorial controls are intentionally disabled until the dedicated OpenAI project key, model, prompts, and approval rules are configured on Hetzner.</Text>
            </View>
          </>
        ) : null}

        {tab === "review" ? (
          <>
            <SectionTitle title="Editorial Review" subtitle="Track theological, factual, scripture, and source-verification questions." />
            <Panel>
              <TextInput value={reviewText} onChangeText={setReviewText} placeholder="Add a review note" multiline style={[inputStyle, { minHeight: 80 }]} />
              <ActionButton label="Add review note" icon="rate-review" disabled={!reviewText.trim()} onPress={() => {
                const note: PublicationReviewNote = { id: globalThis.crypto?.randomUUID?.() ?? `review-${Date.now()}`, chapterId: selectedChapterId ?? undefined, text: reviewText.trim(), resolved: false, createdAt: new Date().toISOString() };
                setProject({ ...project, reviewNotes: [...project.reviewNotes, note] }); setReviewText("");
              }} />
            </Panel>
            {project.reviewNotes.map((note) => <Pressable key={note.id} onPress={() => setProject({ ...project, reviewNotes: project.reviewNotes.map((item) => item.id === note.id ? { ...item, resolved: !item.resolved } : item) })} style={rowStyle}><MaterialIcons name={note.resolved ? "check-circle" : "radio-button-unchecked"} size={23} color={note.resolved ? "#15803d" : "#b45309"} /><Text style={[{ flex: 1, color: "#334155" }, note.resolved && { textDecorationLine: "line-through" }]}>{note.text}</Text></Pressable>)}
          </>
        ) : null}

        {tab === "export" ? (
          <>
            <SectionTitle title="Export Preparation" subtitle="Review project readiness before producing Word, PDF, EPUB, or a web edition." />
            <Panel>
              <Text style={labelStyle}>Project details</Text>
              <TextInput value={project.author} onChangeText={(author) => setProject({ ...project, author })} placeholder="Author or editor" style={inputStyle} />
              <TextInput value={project.description} onChangeText={(description) => setProject({ ...project, description })} placeholder="Book description" multiline style={[inputStyle, { minHeight: 100 }]} />
              <Text style={mutedStyle}>{project.chapters.filter((item) => item.manuscript.trim()).length} of {project.chapters.length} chapters contain manuscript text.</Text>
              <Text style={mutedStyle}>{project.reviewNotes.filter((item) => !item.resolved).length} unresolved review notes.</Text>
              <View style={{ padding: 12, borderRadius: 10, backgroundColor: "#eff6ff" }}><Text style={{ color: "#1e40af", fontWeight: "800" }}>Document export will be the next phase. The complete structured project is already retained for that workflow.</Text></View>
            </Panel>
          </>
        ) : null}
        {message ? <Text style={messageStyle}>{message}</Text> : null}
      </ScrollView>
    </View>
  );
}

function SectionTitle({ title, subtitle }: { title: string; subtitle: string }) { return <View><Text style={{ fontSize: 24, fontWeight: "900", color: "#173a2a" }}>{title}</Text><Text style={[mutedStyle, { marginTop: 4 }]}>{subtitle}</Text></View>; }
function Panel({ children }: { children: React.ReactNode }) { return <View style={{ padding: 14, gap: 10, borderWidth: 1, borderColor: "#dbe4dc", borderRadius: 14, backgroundColor: "#ffffff" }}>{children}</View>; }
function ActionButton({ label, icon, onPress, disabled, compact }: { label: string; icon: keyof typeof MaterialIcons.glyphMap; onPress: () => void; disabled?: boolean; compact?: boolean }) { return <Pressable onPress={onPress} disabled={disabled} style={({ pressed }) => ({ minHeight: compact ? 38 : 44, paddingHorizontal: 14, borderRadius: 10, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 7, backgroundColor: "#28523b", opacity: disabled ? 0.45 : pressed ? 0.78 : 1 })}><MaterialIcons name={icon} size={18} color="#ffffff" /><Text style={{ color: "#ffffff", fontWeight: "900" }}>{label}</Text></Pressable>; }

const inputStyle = { minHeight: 44, paddingHorizontal: 12, paddingVertical: 9, borderWidth: 1, borderColor: "#cbd5e1", borderRadius: 10, backgroundColor: "#ffffff", color: "#1f2937" } as const;
const labelStyle = { fontSize: 14, fontWeight: "900", color: "#334155" } as const;
const mutedStyle = { fontSize: 12, lineHeight: 18, color: "#64748b" } as const;
const messageStyle = { padding: 10, color: "#28523b", fontWeight: "800" } as const;
const rowStyle = { minHeight: 54, padding: 10, flexDirection: "row", alignItems: "center", gap: 10, borderBottomWidth: 1, borderBottomColor: "#edf2ef" } as const;
const rowTitleStyle = { fontSize: 15, fontWeight: "900", color: "#1f2937" } as const;
const tabStyle = { paddingHorizontal: 13, paddingVertical: 8, borderRadius: 999, backgroundColor: "#e8f1ea" } as const;
const activeTabStyle = { backgroundColor: "#28523b" } as const;
const choiceStyle = { paddingHorizontal: 10, paddingVertical: 8, borderRadius: 9, borderWidth: 1, borderColor: "#cbd5e1", backgroundColor: "#ffffff" } as const;
const selectedChoiceStyle = { borderColor: "#4d7c0f", backgroundColor: "#ecfccb" } as const;
