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
  PublicationModelOperation,
  PublicationModelRun,
  PublicationChapter,
  PublicationProject,
  PublicationProjectSummary,
  PublicationReviewNote,
  PublicationSource,
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
  const [selectedTeachingId, setSelectedTeachingId] = useState(
    teachings[0]?.id ?? ""
  );
  const [selectedChapterId, setSelectedChapterId] = useState<string | null>(
    null
  );
  const [selectedSectionId, setSelectedSectionId] = useState<string | null>(
    null
  );
  const [reviewText, setReviewText] = useState("");
  const [aiInstructions, setAiInstructions] = useState("");
  const [openSourceId, setOpenSourceId] = useState<string | null>(null);
  const [sourcePreview, setSourcePreview] = useState("");
  const [isLoadingSource, setIsLoadingSource] = useState(false);

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
    if (!selectedTeachingId && teachings[0]?.id)
      setSelectedTeachingId(teachings[0].id);
  }, [selectedTeachingId, teachings]);

  async function openProject(projectId: string) {
    setIsBusy(true);
    setMessage("");
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/publications/${projectId}`,
        {
          headers: authHeaders,
        }
      );
      if (!response.ok) throw new Error("Unable to open the project.");
      const nextProject = (await response.json()) as PublicationProject;
      setProject(nextProject);
      const firstChapter =
        nextProject.chapters.find((chapter) => chapter.partId) ??
        nextProject.chapters[0];
      setSelectedChapterId(firstChapter?.id ?? null);
      setSelectedSectionId(firstChapter?.sections[0]?.id ?? null);
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Unable to open project."
      );
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
      setMessage(
        error instanceof Error ? error.message : "Unable to create project."
      );
    } finally {
      setIsBusy(false);
    }
  }

  async function saveProject(nextProject = project) {
    if (!nextProject) return;
    setIsBusy(true);
    setMessage("");
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/publications/${nextProject.id}`,
        {
          method: "PUT",
          headers: authHeaders,
          body: JSON.stringify(nextProject),
        }
      );
      if (!response.ok) throw new Error("Unable to save the project.");
      setProject((await response.json()) as PublicationProject);
      setMessage("Project saved.");
      await loadProjects();
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Unable to save project."
      );
    } finally {
      setIsBusy(false);
    }
  }

  async function addSource(input: Record<string, unknown>) {
    if (!project) return;
    const response = await fetch(
      `${API_BASE_URL}/api/publications/${project.id}/sources`,
      {
        method: "POST",
        headers: authHeaders,
        body: JSON.stringify(input),
      }
    );
    if (!response.ok) throw new Error("Unable to add source material.");
    await openProject(project.id);
  }

  async function openSource(source: PublicationSource) {
    if (!project) return;
    setOpenSourceId(source.id);
    setIsLoadingSource(true);
    setSourcePreview("");
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/publications/${project.id}/sources/${source.id}/preview`,
        { headers: authHeaders }
      );
      const data = await response.json();
      if (!response.ok) throw new Error(data.error ?? "Unable to open source.");
      setSourcePreview(String(data.content ?? ""));
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Unable to open source."
      );
    } finally {
      setIsLoadingSource(false);
    }
  }

  async function openUploadedFile(source: PublicationSource) {
    if (!project || Platform.OS !== "web") return;
    const response = await fetch(
      `${API_BASE_URL}/api/publications/${project.id}/sources/${source.id}/file`,
      { headers: { Authorization: `Bearer ${adminToken}` } }
    );
    if (!response.ok) throw new Error("Unable to open the uploaded file.");
    const objectUrl = URL.createObjectURL(await response.blob());
    globalThis.open(objectUrl, "_blank", "noopener,noreferrer");
    setTimeout(() => URL.revokeObjectURL(objectUrl), 60_000);
  }

  async function downloadPdf() {
    if (!project || Platform.OS !== "web") return;
    await saveProject(project);
    setIsBusy(true);
    setMessage("Preparing PDF…");
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/publications/${project.id}/export/pdf`,
        { headers: { Authorization: `Bearer ${adminToken}` } }
      );
      if (!response.ok) throw new Error("Unable to generate the PDF.");
      const objectUrl = URL.createObjectURL(await response.blob());
      const anchor = document.createElement("a");
      anchor.href = objectUrl;
      anchor.download = `${
        project.title
          .replace(/[^a-z0-9]+/gi, "-")
          .replace(/^-|-$/g, "")
          .toLowerCase() || "publication"
      }.pdf`;
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      setTimeout(() => URL.revokeObjectURL(objectUrl), 60_000);
      setMessage("PDF downloaded.");
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Unable to generate the PDF."
      );
    } finally {
      setIsBusy(false);
    }
  }

  function addChapter() {
    if (!project) return;
    const chapter: PublicationChapter = {
      id: globalThis.crypto?.randomUUID?.() ?? `chapter-${Date.now()}`,
      title: `Chapter ${project.chapters.length + 1}`,
      summary: "",
      sourceIds: [],
      sections: [],
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
    setProject({
      ...project,
      chapters: chapters.map((item, sortOrder) => ({ ...item, sortOrder })),
    });
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

  function updateChapter(
    chapterId: string,
    patch: Partial<PublicationChapter>
  ) {
    if (!project) return;
    setProject({
      ...project,
      chapters: project.chapters.map((chapter) =>
        chapter.id === chapterId ? { ...chapter, ...patch } : chapter
      ),
    });
  }

  function updateSection(
    chapterId: string,
    sectionId: string,
    patch: Partial<PublicationChapter["sections"][number]>
  ) {
    const chapter = project?.chapters.find((item) => item.id === chapterId);
    if (!project || !chapter) return;
    updateChapter(chapterId, {
      sections: chapter.sections.map((section) =>
        section.id === sectionId ? { ...section, ...patch } : section
      ),
    });
  }

  async function uploadFile(file: File) {
    if (!project) return;
    const form = new FormData();
    form.append("file", file);
    const response = await fetch(
      `${API_BASE_URL}/api/publications/${project.id}/sources/upload`,
      {
        method: "POST",
        headers: { Authorization: `Bearer ${adminToken}` },
        body: form,
      }
    );
    if (!response.ok) throw new Error("Unable to upload publication file.");
    await openProject(project.id);
  }

  async function runAiOperation(operation: PublicationModelOperation) {
    if (!project) return;
    const activeChapterId = selectedChapter?.id;
    const activeSectionId = selectedSection?.id;
    setIsBusy(true);
    setMessage(`Running ${operation} proposal… This may take a few minutes.`);
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/publications/${project.id}/model/run`,
        {
          method: "POST",
          headers: authHeaders,
          body: JSON.stringify({
            operation,
            chapterId:
              operation === "draft" || operation === "verify"
                ? selectedChapter?.id
                : undefined,
            sectionId:
              operation === "draft" || operation === "verify"
                ? selectedSection?.id
                : undefined,
            sourceIds:
              operation === "draft" || operation === "verify"
                ? selectedSection?.sourceIds.length
                  ? selectedSection.sourceIds
                  : selectedChapter?.sourceIds
                : project.sources.map((source) => source.id),
            instructions: aiInstructions,
          }),
        }
      );
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.error ?? "The model operation failed.");
      await openProject(project.id);
      if (activeChapterId) setSelectedChapterId(activeChapterId);
      setSelectedSectionId(activeSectionId ?? null);
      setMessage("Proposal ready for review. Nothing has been applied yet.");
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "The model operation failed."
      );
    } finally {
      setIsBusy(false);
    }
  }

  async function reviewModelRun(
    runId: string,
    decision: "accepted" | "rejected"
  ) {
    if (!project) return;
    setIsBusy(true);
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/publications/${project.id}/model-runs/${runId}/review`,
        {
          method: "POST",
          headers: authHeaders,
          body: JSON.stringify({ decision }),
        }
      );
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.error ?? "Unable to review proposal.");
      setProject(data as PublicationProject);
      if (decision === "accepted") {
        const acceptedRun = project.modelRuns.find((item) => item.id === runId);
        if (acceptedRun?.operation === "outline") {
          const firstStructuredChapter = (
            data as PublicationProject
          ).chapters.find((chapter) => chapter.partId);
          setSelectedChapterId(firstStructuredChapter?.id ?? null);
          setSelectedSectionId(firstStructuredChapter?.sections[0]?.id ?? null);
          setTab("manuscript");
        }
      }
      setMessage(
        decision === "accepted"
          ? "Proposal accepted and applied."
          : "Proposal rejected."
      );
      await loadProjects();
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Unable to review proposal."
      );
    } finally {
      setIsBusy(false);
    }
  }

  function updateModelRun(
    runId: string,
    updater: (
      run: PublicationProject["modelRuns"][number]
    ) => PublicationProject["modelRuns"][number]
  ) {
    if (!project) return;
    setProject({
      ...project,
      modelRuns: (project.modelRuns ?? []).map((run) =>
        run.id === runId ? updater(run) : run
      ),
    });
  }

  async function saveModelProposal(
    run: PublicationProject["modelRuns"][number]
  ) {
    if (!project) return;
    setIsBusy(true);
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/publications/${project.id}/model-runs/${run.id}`,
        {
          method: "PUT",
          headers: authHeaders,
          body: JSON.stringify({
            proposedParts: run.proposedParts ?? [],
            editorCritique: run.editorCritique ?? "",
          }),
        }
      );
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.error ?? "Unable to save proposal edits.");
      setProject(data as PublicationProject);
      setMessage("Proposed structure and editor critique saved.");
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Unable to save proposal edits."
      );
    } finally {
      setIsBusy(false);
    }
  }

  if (!project) {
    return (
      <ScrollView contentContainerStyle={{ padding: 18, gap: 16 }}>
        <SectionTitle
          title="Publisher"
          subtitle="Build books from teachings, documents, images, and editorial notes."
        />
        <Panel>
          <Text style={labelStyle}>New book project</Text>
          <TextInput
            value={newTitle}
            onChangeText={setNewTitle}
            placeholder="Working title"
            style={inputStyle}
          />
          <TextInput
            value={newAuthor}
            onChangeText={setNewAuthor}
            placeholder="Author or editor"
            style={inputStyle}
          />
          <ActionButton
            label="Create project"
            icon="add"
            onPress={() => void createProject()}
            disabled={!newTitle.trim() || isBusy}
          />
        </Panel>
        <Panel>
          <Text style={labelStyle}>Book projects</Text>
          {projects.length === 0 ? (
            <Text style={mutedStyle}>No publication projects yet.</Text>
          ) : null}
          {projects.map((item) => (
            <Pressable
              key={item.id}
              onPress={() => void openProject(item.id)}
              style={rowStyle}
            >
              <View style={{ flex: 1 }}>
                <Text style={rowTitleStyle}>{item.title}</Text>
                <Text style={mutedStyle}>
                  {item.sourceCount} sources · {item.chapterCount} chapters ·{" "}
                  {item.status}
                </Text>
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
    project.chapters.find((chapter) => chapter.id === selectedChapterId) ??
    project.chapters.find((chapter) => chapter.partId) ??
    project.chapters[0];
  const selectedSection = selectedChapter?.sections.find(
    (section) => section.id === selectedSectionId
  );
  const pendingDrafts = (project.modelRuns ?? []).filter(
    (run) =>
      run.operation === "draft" &&
      run.status === "proposed" &&
      run.chapterId === selectedChapter?.id &&
      (run.sectionId ?? null) === (selectedSection?.id ?? null)
  );
  const pendingVerifications = (project.modelRuns ?? []).filter(
    (run) => run.operation === "verify" && run.status === "proposed"
  );
  const completedSectionCount = project.chapters.reduce(
    (total, chapter) =>
      total +
      chapter.sections.filter((section) => section.manuscript?.trim()).length,
    0
  );
  const hasExportableContent =
    completedSectionCount > 0 ||
    project.chapters.some((chapter) => chapter.manuscript.trim());

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          padding: 14,
          borderBottomWidth: 1,
          borderBottomColor: "#dbe4dc",
          gap: 10,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <Pressable onPress={() => setProject(null)}>
            <MaterialIcons name="arrow-back" size={24} color="#244f35" />
          </Pressable>
          <View style={{ flex: 1 }}>
            <TextInput
              value={project.title}
              onChangeText={(title) => setProject({ ...project, title })}
              style={{ fontSize: 21, fontWeight: "900", color: "#10231a" }}
            />
            <Text style={mutedStyle}>
              {project.sources.length} sources · {project.chapters.length}{" "}
              chapters
            </Text>
          </View>
          <ActionButton
            label={isBusy ? "Saving…" : "Save"}
            icon="save"
            onPress={() => void saveProject()}
            disabled={isBusy}
            compact
          />
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 7 }}
        >
          {(
            [
              { step: 1, tab: "sources", label: "Choose data" },
              { step: 2, tab: "ai", label: "Generate outline" },
              { step: 3, tab: "manuscript", label: "Build content" },
              { step: 4, tab: "review", label: "Review" },
            ] as Array<{ step: number; tab: WorkspaceTab; label: string }>
          ).map((item) => (
            <Pressable
              key={item.step}
              onPress={() => setTab(item.tab)}
              style={[tabStyle, tab === item.tab && activeTabStyle]}
            >
              <Text
                style={{
                  fontWeight: "900",
                  color: tab === item.tab ? "#ffffff" : "#365247",
                }}
              >
                {item.step}. {item.label}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      <ScrollView contentContainerStyle={{ padding: 16, gap: 14 }}>
        {tab === "sources" ? (
          <>
            <SectionTitle
              title="Source Library"
              subtitle="Open any collected source to read or copy it. Clean and Propose sections automatically read the collected sources for you."
            />
            <Panel>
              <Text style={labelStyle}>Add a teaching</Text>
              <ScrollView horizontal contentContainerStyle={{ gap: 8 }}>
                {teachings.slice(0, 100).map((teaching) => (
                  <Pressable
                    key={teaching.id}
                    onPress={() => setSelectedTeachingId(teaching.id)}
                    style={[
                      choiceStyle,
                      selectedTeachingId === teaching.id && selectedChoiceStyle,
                    ]}
                  >
                    <Text
                      numberOfLines={2}
                      style={{
                        width: 160,
                        fontWeight: "800",
                        color: "#1f2937",
                      }}
                    >
                      {teaching.title}
                    </Text>
                  </Pressable>
                ))}
              </ScrollView>
              <ActionButton
                label="Add selected teaching"
                icon="library-add"
                disabled={!selectedTeachingId}
                onPress={() => {
                  const teaching = teachings.find(
                    (item) => item.id === selectedTeachingId
                  );
                  if (teaching)
                    void addSource({
                      type: "teaching",
                      title: teaching.title,
                      recordingId: teaching.id,
                    });
                }}
              />
            </Panel>
            <Panel>
              <Text style={labelStyle}>Add notes or an outside link</Text>
              <TextInput
                value={noteTitle}
                onChangeText={setNoteTitle}
                placeholder="Source title"
                style={inputStyle}
              />
              <TextInput
                value={noteContent}
                onChangeText={setNoteContent}
                placeholder="Editorial notes or source text"
                multiline
                style={[inputStyle, { minHeight: 90 }]}
              />
              <TextInput
                value={linkUrl}
                onChangeText={setLinkUrl}
                placeholder="Optional URL"
                autoCapitalize="none"
                style={inputStyle}
              />
              <ActionButton
                label="Add source"
                icon="note-add"
                disabled={!noteTitle.trim()}
                onPress={() =>
                  void addSource({
                    type: linkUrl ? "url" : "note",
                    title: noteTitle,
                    content: noteContent,
                    url: linkUrl,
                  }).then(() => {
                    setNoteTitle("");
                    setNoteContent("");
                    setLinkUrl("");
                  })
                }
              />
            </Panel>
            {Platform.OS === "web" ? (
              <Panel>
                <Text style={labelStyle}>
                  Upload images, PDFs, or documents
                </Text>
                {createElement("input", {
                  type: "file",
                  accept: "image/*,.pdf,.doc,.docx,.txt,.md",
                  onChange: (event: any) => {
                    const file = event.target.files?.[0] as File | undefined;
                    if (file)
                      void uploadFile(file).catch((error) =>
                        setMessage(error.message)
                      );
                    event.target.value = "";
                  },
                })}
                <Text style={mutedStyle}>
                  Maximum file size: 30 MB. Files remain private to the admin
                  Publisher.
                </Text>
              </Panel>
            ) : null}
            <Panel>
              <View>
                <Text style={labelStyle}>Collected sources</Text>
                <Text style={mutedStyle}>
                  Use the book icon to open the source reader.
                </Text>
              </View>
              {project.sources.map((source, index) => (
                <View
                  key={source.id}
                  style={[
                    rowStyle,
                    openSourceId === source.id && {
                      backgroundColor: "#f0f7f1",
                    },
                  ]}
                >
                  <MaterialIcons
                    name={
                      source.type === "image"
                        ? "image"
                        : source.type === "teaching"
                          ? "record-voice-over"
                          : "description"
                    }
                    size={22}
                    color="#386641"
                  />
                  <View style={{ flex: 1 }}>
                    <Text style={rowTitleStyle}>{source.title}</Text>
                    <Text style={mutedStyle}>
                      {index + 1}. {source.type}
                    </Text>
                  </View>
                  <Pressable
                    accessibilityLabel={`Read ${source.title}`}
                    onPress={() => void openSource(source)}
                    style={{ padding: 6 }}
                  >
                    <MaterialIcons name="menu-book" size={21} color="#28523b" />
                  </Pressable>
                  <Pressable
                    accessibilityLabel={`Move ${source.title} earlier`}
                    onPress={() => moveSource(index, -1)}
                  >
                    <MaterialIcons
                      name="arrow-upward"
                      size={20}
                      color="#475569"
                    />
                  </Pressable>
                  <Pressable
                    accessibilityLabel={`Move ${source.title} later`}
                    onPress={() => moveSource(index, 1)}
                  >
                    <MaterialIcons
                      name="arrow-downward"
                      size={20}
                      color="#475569"
                    />
                  </Pressable>
                </View>
              ))}
              {openSourceId
                ? (() => {
                    const source = project.sources.find(
                      (item) => item.id === openSourceId
                    );
                    if (!source) return null;
                    return (
                      <View
                        style={{
                          padding: 14,
                          gap: 10,
                          borderRadius: 12,
                          backgroundColor: "#f8fafc",
                          borderWidth: 1,
                          borderColor: "#dbe4dc",
                        }}
                      >
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 8,
                          }}
                        >
                          <View style={{ flex: 1 }}>
                            <Text style={rowTitleStyle}>{source.title}</Text>
                            <Text style={mutedStyle}>Source text</Text>
                          </View>
                          <Pressable
                            accessibilityLabel="Close source reader"
                            onPress={() => {
                              setOpenSourceId(null);
                              setSourcePreview("");
                            }}
                          >
                            <MaterialIcons
                              name="close"
                              size={22}
                              color="#475569"
                            />
                          </Pressable>
                        </View>
                        {isLoadingSource ? (
                          <ActivityIndicator />
                        ) : sourcePreview ? (
                          <ScrollView
                            style={{ maxHeight: 460 }}
                            nestedScrollEnabled
                          >
                            <Text
                              selectable
                              style={{ color: "#1f2937", lineHeight: 22 }}
                            >
                              {sourcePreview}
                            </Text>
                          </ScrollView>
                        ) : (
                          <Text style={mutedStyle}>
                            {source.originalFileName
                              ? "This source is an uploaded file."
                              : "No text is stored for this source."}
                          </Text>
                        )}
                        {source.originalFileName ? (
                          <ActionButton
                            label="Open uploaded file"
                            icon="open-in-new"
                            onPress={() =>
                              void openUploadedFile(source).catch((error) =>
                                setMessage(error.message)
                              )
                            }
                          />
                        ) : null}
                      </View>
                    );
                  })()
                : null}
            </Panel>
            <Panel>
              <Text style={rowTitleStyle}>Ready for Step 2?</Text>
              <Text style={mutedStyle}>
                Optional cleanup removes greetings and conversational filler.
                The outline generator always reads every collected source.
              </Text>
              <ActionButton
                label={isBusy ? "Working…" : "Optional: Clean source material"}
                icon="auto-fix-high"
                disabled={isBusy || project.sources.length === 0}
                onPress={() => void runAiOperation("clean")}
              />
              <ActionButton
                label="Continue to Generate Outline"
                icon="arrow-forward"
                disabled={project.sources.length === 0}
                onPress={() => setTab("ai")}
              />
            </Panel>
          </>
        ) : null}

        {tab === "outline" ? (
          <>
            <SectionTitle
              title="Outline"
              subtitle="Arrange chapters and attach the sources each chapter may use."
            />
            <ActionButton label="Add chapter" icon="add" onPress={addChapter} />
            {project.chapters.map((chapter, index) => (
              <Panel key={chapter.id}>
                <View
                  style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
                >
                  <Text style={{ fontWeight: "900", color: "#64748b" }}>
                    {index + 1}
                  </Text>
                  <TextInput
                    value={chapter.title}
                    onChangeText={(title) =>
                      updateChapter(chapter.id, { title })
                    }
                    style={[inputStyle, { flex: 1 }]}
                  />
                  <Pressable onPress={() => moveChapter(index, -1)}>
                    <MaterialIcons
                      name="arrow-upward"
                      size={20}
                      color="#475569"
                    />
                  </Pressable>
                  <Pressable onPress={() => moveChapter(index, 1)}>
                    <MaterialIcons
                      name="arrow-downward"
                      size={20}
                      color="#475569"
                    />
                  </Pressable>
                </View>
                <TextInput
                  value={chapter.summary}
                  onChangeText={(summary) =>
                    updateChapter(chapter.id, { summary })
                  }
                  placeholder="Purpose and summary for this chapter"
                  multiline
                  style={[inputStyle, { minHeight: 70 }]}
                />
                <Text style={labelStyle}>Sources for this chapter</Text>
                <View
                  style={{ flexDirection: "row", flexWrap: "wrap", gap: 7 }}
                >
                  {project.sources.map((source) => {
                    const selected = chapter.sourceIds.includes(source.id);
                    return (
                      <Pressable
                        key={source.id}
                        onPress={() =>
                          updateChapter(chapter.id, {
                            sourceIds: selected
                              ? chapter.sourceIds.filter(
                                  (id) => id !== source.id
                                )
                              : [...chapter.sourceIds, source.id],
                          })
                        }
                        style={[choiceStyle, selected && selectedChoiceStyle]}
                      >
                        <Text style={{ fontWeight: "800" }}>
                          {source.title}
                        </Text>
                      </Pressable>
                    );
                  })}
                </View>
              </Panel>
            ))}
          </>
        ) : null}

        {tab === "manuscript" ? (
          <>
            <SectionTitle
              title="Step 3 · Build Chapter and Section Content"
              subtitle="Choose an approved chapter and section, generate its source-bound draft, then edit the result."
            />
            <ScrollView horizontal contentContainerStyle={{ gap: 7 }}>
              {[...project.chapters]
                .sort(
                  (a, b) =>
                    Number(Boolean(b.partId)) - Number(Boolean(a.partId))
                )
                .map((chapter) => (
                  <Pressable
                    key={chapter.id}
                    onPress={() => {
                      setSelectedChapterId(chapter.id);
                      setSelectedSectionId(chapter.sections[0]?.id ?? null);
                    }}
                    style={[
                      choiceStyle,
                      selectedChapter?.id === chapter.id && selectedChoiceStyle,
                    ]}
                  >
                    <Text style={{ fontWeight: "900" }}>{chapter.title}</Text>
                  </Pressable>
                ))}
            </ScrollView>
            {selectedChapter ? (
              <Panel>
                <Text style={labelStyle}>{selectedChapter.title}</Text>
                {selectedChapter.sections.length ? (
                  <View style={{ gap: 8 }}>
                    <Text style={mutedStyle}>
                      Choose a section to draft or edit:
                    </Text>
                    <View
                      style={{ flexDirection: "row", flexWrap: "wrap", gap: 7 }}
                    >
                      {selectedChapter.sections.map((section) => (
                        <Pressable
                          key={section.id}
                          onPress={() => setSelectedSectionId(section.id)}
                          style={[
                            choiceStyle,
                            selectedSection?.id === section.id &&
                              selectedChoiceStyle,
                          ]}
                        >
                          <Text style={{ fontWeight: "800" }}>
                            {section.title}
                          </Text>
                        </Pressable>
                      ))}
                    </View>
                  </View>
                ) : null}
                <Text style={rowTitleStyle}>
                  {selectedSection?.title ?? selectedChapter.title}
                </Text>
                <Text style={mutedStyle}>
                  {selectedSection?.summary ?? selectedChapter.summary}
                </Text>
                <ActionButton
                  label={
                    isBusy
                      ? "Generating…"
                      : `Generate ${selectedSection ? "section" : "chapter"} content`
                  }
                  icon="auto-awesome"
                  disabled={
                    isBusy ||
                    (selectedSection
                      ? selectedSection.sourceIds.length === 0
                      : selectedChapter.sourceIds.length === 0)
                  }
                  onPress={() => void runAiOperation("draft")}
                />
                {pendingDrafts.map((run) => (
                  <View
                    key={run.id}
                    style={{
                      padding: 12,
                      gap: 9,
                      borderRadius: 10,
                      backgroundColor: "#f8fafc",
                      borderWidth: 1,
                      borderColor: "#cbd5e1",
                    }}
                  >
                    <Text style={rowTitleStyle}>
                      Proposed content · Review before applying
                    </Text>
                    <ScrollView style={{ maxHeight: 360 }} nestedScrollEnabled>
                      <Text
                        selectable
                        style={{ color: "#1f2937", lineHeight: 22 }}
                      >
                        {run.proposedText}
                      </Text>
                    </ScrollView>
                    <View style={{ flexDirection: "row", gap: 8 }}>
                      <View style={{ flex: 1 }}>
                        <ActionButton
                          label="Apply to section"
                          icon="check"
                          disabled={isBusy}
                          onPress={() =>
                            void reviewModelRun(run.id, "accepted")
                          }
                        />
                      </View>
                      <View style={{ flex: 1 }}>
                        <ActionButton
                          label="Reject"
                          icon="close"
                          disabled={isBusy}
                          onPress={() =>
                            void reviewModelRun(run.id, "rejected")
                          }
                        />
                      </View>
                    </View>
                  </View>
                ))}
                <TextInput
                  value={
                    selectedSection?.manuscript ?? selectedChapter.manuscript
                  }
                  onChangeText={(manuscript) =>
                    selectedSection
                      ? updateSection(selectedChapter.id, selectedSection.id, {
                          manuscript,
                        })
                      : updateChapter(selectedChapter.id, { manuscript })
                  }
                  placeholder={`Draft or paste ${selectedSection ? "section" : "chapter"} text here…`}
                  multiline
                  textAlignVertical="top"
                  style={[inputStyle, { minHeight: 430, lineHeight: 23 }]}
                />
                <ActionButton
                  label="Save manuscript progress"
                  icon="save"
                  onPress={() => void saveProject()}
                  disabled={isBusy}
                />
                <ActionButton
                  label="Continue to Editorial Review"
                  icon="arrow-forward"
                  onPress={() => setTab("review")}
                />
              </Panel>
            ) : (
              <Text style={mutedStyle}>Add a chapter in Outline first.</Text>
            )}
          </>
        ) : null}

        {tab === "ai" ? (
          <>
            <SectionTitle
              title="AI Editorial Studio"
              subtitle="Run deliberate editorial stages against selected source material while preserving traceability."
            />
            <View
              style={{
                padding: 12,
                borderRadius: 10,
                backgroundColor: "#ecfdf5",
                borderWidth: 1,
                borderColor: "#86efac",
              }}
            >
              <Text style={{ color: "#166534", fontWeight: "900" }}>
                Source-bound editorial mode
              </Text>
              <Text style={{ color: "#166534", marginTop: 4, lineHeight: 19 }}>
                AI may only clean, organize, format, or compare the material you
                supplied. All supplied assertions are treated as authoritative
                fact, and factual wording may not be softened into hypothetical
                language. AI may not add outside knowledge, fact-check the
                teaching, or recommend external verification.
              </Text>
            </View>
            <Panel>
              <Text style={labelStyle}>Outline instructions</Text>
              <TextInput
                value={aiInstructions}
                onChangeText={setAiInstructions}
                placeholder="Optional organizational instructions"
                multiline
                style={[inputStyle, { minHeight: 76 }]}
              />
              <Text style={mutedStyle}>
                The outline generator uses every collected source and proposes
                parts, chapters, sections, and source assignments.
              </Text>
            </Panel>
            {[
              [
                "outline",
                "Generate proposed outline",
                "Organize the supplied material into an ordered part, chapter, and section structure.",
              ],
            ].map(([operation, title, description]) => (
              <Panel key={title}>
                <Text style={rowTitleStyle}>{title}</Text>
                <Text style={mutedStyle}>{description}</Text>
                <ActionButton
                  label={isBusy ? "Working…" : `Run ${title}`}
                  icon="auto-awesome"
                  disabled={
                    isBusy ||
                    project.sources.length === 0 ||
                    ((operation === "draft" || operation === "verify") &&
                      (!selectedChapter ||
                        selectedChapter.sourceIds.length === 0))
                  }
                  onPress={() =>
                    void runAiOperation(operation as PublicationModelOperation)
                  }
                />
              </Panel>
            ))}
            <SectionTitle
              title="Model Proposals"
              subtitle="Review the complete proposal before accepting or rejecting it."
            />
            {(project.modelRuns ?? []).filter(
              (run) => run.operation === "outline"
            ).length === 0 ? (
              <Text style={mutedStyle}>No model proposals yet.</Text>
            ) : null}
            {(project.modelRuns ?? [])
              .filter((run) => run.operation === "outline")
              .map((run) => (
                <Panel key={run.id}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      gap: 10,
                    }}
                  >
                    <View style={{ flex: 1 }}>
                      <Text style={rowTitleStyle}>{run.title}</Text>
                      <Text style={mutedStyle}>
                        {run.operation} · {run.model} · {run.status}
                      </Text>
                    </View>
                    <View
                      style={{
                        paddingHorizontal: 9,
                        paddingVertical: 4,
                        borderRadius: 99,
                        backgroundColor:
                          run.status === "proposed"
                            ? "#fef3c7"
                            : run.status === "accepted"
                              ? "#dcfce7"
                              : "#fee2e2",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 11,
                          fontWeight: "900",
                          textTransform: "uppercase",
                        }}
                      >
                        {run.status}
                      </Text>
                    </View>
                  </View>
                  <Text style={{ color: "#475569", lineHeight: 20 }}>
                    {run.summary}
                  </Text>
                  {run.proposedText ? (
                    <View
                      style={{
                        maxHeight: 320,
                        padding: 12,
                        borderRadius: 10,
                        backgroundColor: "#f8fafc",
                      }}
                    >
                      <ScrollView nestedScrollEnabled>
                        <Text
                          selectable
                          style={{ color: "#1f2937", lineHeight: 21 }}
                        >
                          {run.proposedText}
                        </Text>
                      </ScrollView>
                    </View>
                  ) : null}
                  <StructureProposalEditor
                    run={run}
                    project={project}
                    onChange={(nextRun) =>
                      updateModelRun(run.id, () => nextRun)
                    }
                  />
                  {run.warnings.length ? (
                    <View
                      style={{
                        padding: 10,
                        borderRadius: 9,
                        backgroundColor: "#fff7ed",
                      }}
                    >
                      {run.warnings.map((warning, index) => (
                        <Text
                          key={`${run.id}-warning-${index}`}
                          style={{ color: "#9a3412" }}
                        >
                          • {warning}
                        </Text>
                      ))}
                    </View>
                  ) : null}
                  {run.status === "proposed" ? (
                    <>
                      <TextInput
                        value={run.editorCritique ?? ""}
                        onChangeText={(editorCritique) =>
                          updateModelRun(run.id, (current) => ({
                            ...current,
                            editorCritique,
                          }))
                        }
                        placeholder="Editor critique, structural concerns, or recommendations for the next pass"
                        multiline
                        style={[inputStyle, { minHeight: 80 }]}
                      />
                      <ActionButton
                        label="Save structure edits and critique"
                        icon="save"
                        disabled={isBusy}
                        onPress={() => void saveModelProposal(run)}
                      />
                      <View style={{ flexDirection: "row", gap: 8 }}>
                        <View style={{ flex: 1 }}>
                          <ActionButton
                            label="Accept and apply"
                            icon="check"
                            disabled={isBusy}
                            onPress={() =>
                              void reviewModelRun(run.id, "accepted")
                            }
                          />
                        </View>
                        <View style={{ flex: 1 }}>
                          <ActionButton
                            label="Reject"
                            icon="close"
                            disabled={isBusy}
                            onPress={() =>
                              void reviewModelRun(run.id, "rejected")
                            }
                          />
                        </View>
                      </View>
                    </>
                  ) : null}
                </Panel>
              ))}
          </>
        ) : null}

        {tab === "review" ? (
          <>
            <SectionTitle
              title="Step 4 · Editorial Review"
              subtitle="Check source fidelity, record editor comments, and resolve every revision note."
            />
            <Panel>
              <Text style={rowTitleStyle}>Source-fidelity check</Text>
              <Text style={mutedStyle}>
                Compare the selected {selectedSection ? "section" : "chapter"}{" "}
                only to its assigned sources. This does not fact-check the
                teaching.
              </Text>
              <ActionButton
                label={
                  isBusy
                    ? "Checking…"
                    : "Check selected content against sources"
                }
                icon="fact-check"
                disabled={
                  isBusy ||
                  !selectedChapter ||
                  (selectedSection
                    ? !selectedSection.manuscript.trim() ||
                      selectedSection.sourceIds.length === 0
                    : !selectedChapter.manuscript.trim() ||
                      selectedChapter.sourceIds.length === 0)
                }
                onPress={() => void runAiOperation("verify")}
              />
            </Panel>
            {pendingVerifications.map((run) => (
              <Panel key={run.id}>
                <Text style={rowTitleStyle}>
                  Source-fidelity proposal ready for review
                </Text>
                <Text selectable style={{ color: "#334155", lineHeight: 21 }}>
                  {run.proposedText || "No narrative report was returned."}
                </Text>
                {run.warnings.length ? (
                  <View
                    style={{
                      padding: 10,
                      gap: 5,
                      borderRadius: 9,
                      backgroundColor: "#fff7ed",
                    }}
                  >
                    {run.warnings.map((warning, index) => (
                      <Text
                        key={`${run.id}-review-${index}`}
                        style={{ color: "#9a3412" }}
                      >
                        • {warning}
                      </Text>
                    ))}
                  </View>
                ) : (
                  <Text style={{ color: "#166534", fontWeight: "800" }}>
                    No source-fidelity concerns were returned.
                  </Text>
                )}
                <View style={{ flexDirection: "row", gap: 8 }}>
                  <View style={{ flex: 1 }}>
                    <ActionButton
                      label="Accept review"
                      icon="check"
                      disabled={isBusy}
                      onPress={() => void reviewModelRun(run.id, "accepted")}
                    />
                  </View>
                  <View style={{ flex: 1 }}>
                    <ActionButton
                      label="Reject"
                      icon="close"
                      disabled={isBusy}
                      onPress={() => void reviewModelRun(run.id, "rejected")}
                    />
                  </View>
                </View>
              </Panel>
            ))}
            <Panel>
              <TextInput
                value={reviewText}
                onChangeText={setReviewText}
                placeholder="Add a review note"
                multiline
                style={[inputStyle, { minHeight: 80 }]}
              />
              <ActionButton
                label="Add review note"
                icon="rate-review"
                disabled={!reviewText.trim()}
                onPress={() => {
                  const note: PublicationReviewNote = {
                    id:
                      globalThis.crypto?.randomUUID?.() ??
                      `review-${Date.now()}`,
                    chapterId: selectedChapterId ?? undefined,
                    sectionId: selectedSectionId ?? undefined,
                    text: reviewText.trim(),
                    resolved: false,
                    createdAt: new Date().toISOString(),
                  };
                  setProject({
                    ...project,
                    reviewNotes: [...project.reviewNotes, note],
                  });
                  setReviewText("");
                }}
              />
            </Panel>
            {project.reviewNotes.map((note) => (
              <Pressable
                key={note.id}
                onPress={() =>
                  setProject({
                    ...project,
                    reviewNotes: project.reviewNotes.map((item) =>
                      item.id === note.id
                        ? { ...item, resolved: !item.resolved }
                        : item
                    ),
                  })
                }
                style={rowStyle}
              >
                <MaterialIcons
                  name={
                    note.resolved ? "check-circle" : "radio-button-unchecked"
                  }
                  size={23}
                  color={note.resolved ? "#15803d" : "#b45309"}
                />
                <Text
                  style={[
                    { flex: 1, color: "#334155" },
                    note.resolved && { textDecorationLine: "line-through" },
                  ]}
                >
                  {note.text}
                </Text>
              </Pressable>
            ))}
            <ActionButton
              label="Export preparation"
              icon="arrow-forward"
              onPress={() => setTab("export")}
            />
          </>
        ) : null}

        {tab === "export" ? (
          <>
            <SectionTitle
              title="Export Preparation"
              subtitle="Review project readiness before producing Word, PDF, EPUB, or a web edition."
            />
            <Panel>
              <Text style={labelStyle}>Project details</Text>
              <TextInput
                value={project.author}
                onChangeText={(author) => setProject({ ...project, author })}
                placeholder="Author or editor"
                style={inputStyle}
              />
              <TextInput
                value={project.description}
                onChangeText={(description) =>
                  setProject({ ...project, description })
                }
                placeholder="Book description"
                multiline
                style={[inputStyle, { minHeight: 100 }]}
              />
              <Text style={mutedStyle}>
                {completedSectionCount} sections and{" "}
                {
                  project.chapters.filter((item) => item.manuscript.trim())
                    .length
                }{" "}
                chapter drafts contain manuscript text.
              </Text>
              <Text style={mutedStyle}>
                {project.reviewNotes.filter((item) => !item.resolved).length}{" "}
                unresolved review notes.
              </Text>
              <ActionButton
                label={isBusy ? "Preparing PDF…" : "Download PDF"}
                icon="picture-as-pdf"
                disabled={isBusy || !hasExportableContent}
                onPress={() => void downloadPdf()}
              />
              {!hasExportableContent ? (
                <Text style={mutedStyle}>
                  Add manuscript content to at least one chapter or section
                  before exporting.
                </Text>
              ) : null}
            </Panel>
          </>
        ) : null}
        {message ? <Text style={messageStyle}>{message}</Text> : null}
      </ScrollView>
    </View>
  );
}

function StructureProposalEditor({
  run,
  project,
  onChange,
}: {
  run: PublicationModelRun;
  project: PublicationProject;
  onChange: (run: PublicationModelRun) => void;
}) {
  const editable = run.status === "proposed";
  const parts = run.proposedParts ?? [];

  function updatePart(partIndex: number, patch: Record<string, unknown>) {
    onChange({
      ...run,
      proposedParts: parts.map((part, index) =>
        index === partIndex ? { ...part, ...patch } : part
      ),
    });
  }

  function updateChapter(
    partIndex: number,
    chapterIndex: number,
    patch: Record<string, unknown>
  ) {
    const part = parts[partIndex];
    updatePart(partIndex, {
      chapters: part.chapters.map((chapter, index) =>
        index === chapterIndex ? { ...chapter, ...patch } : chapter
      ),
    });
  }

  function updateSection(
    partIndex: number,
    chapterIndex: number,
    sectionIndex: number,
    patch: Record<string, unknown>
  ) {
    const chapter = parts[partIndex].chapters[chapterIndex];
    updateChapter(partIndex, chapterIndex, {
      sections: chapter.sections.map((section, index) =>
        index === sectionIndex ? { ...section, ...patch } : section
      ),
    });
  }

  if (parts.length === 0) {
    return run.proposedChapters.length ? (
      <View style={{ gap: 5 }}>
        {run.proposedChapters.map((chapter, index) => (
          <Text key={`${run.id}-${index}`} style={{ color: "#334155" }}>
            {index + 1}.{" "}
            <Text style={{ fontWeight: "900" }}>{chapter.title}</Text> —{" "}
            {chapter.summary}
          </Text>
        ))}
      </View>
    ) : null;
  }

  return (
    <View style={{ gap: 12 }}>
      {parts.map((part, partIndex) => (
        <View
          key={`${run.id}-part-${partIndex}`}
          style={{
            padding: 12,
            gap: 9,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: "#dbe4dc",
            backgroundColor: "#fbfdfb",
          }}
        >
          <Text style={{ fontSize: 11, fontWeight: "900", color: "#668c43" }}>
            PART {partIndex + 1}
          </Text>
          <TextInput
            editable={editable}
            value={part.title}
            onChangeText={(title) => updatePart(partIndex, { title })}
            style={[inputStyle, { fontSize: 17, fontWeight: "900" }]}
          />
          <TextInput
            editable={editable}
            value={part.summary}
            onChangeText={(summary) => updatePart(partIndex, { summary })}
            multiline
            style={inputStyle}
          />
          {part.chapters.map((chapter, chapterIndex) => (
            <View
              key={`${run.id}-${partIndex}-${chapterIndex}`}
              style={{
                marginLeft: 8,
                paddingLeft: 12,
                gap: 7,
                borderLeftWidth: 3,
                borderLeftColor: "#86a873",
              }}
            >
              <Text
                style={{ fontSize: 11, fontWeight: "900", color: "#64748b" }}
              >
                CHAPTER {chapterIndex + 1}
              </Text>
              <TextInput
                editable={editable}
                value={chapter.title}
                onChangeText={(title) =>
                  updateChapter(partIndex, chapterIndex, { title })
                }
                style={[inputStyle, { fontWeight: "900" }]}
              />
              <TextInput
                editable={editable}
                value={chapter.summary}
                onChangeText={(summary) =>
                  updateChapter(partIndex, chapterIndex, { summary })
                }
                multiline
                style={inputStyle}
              />
              <Text style={mutedStyle}>
                Sources:{" "}
                {chapter.sourceIds
                  .map(
                    (sourceId) =>
                      project.sources.find((source) => source.id === sourceId)
                        ?.title ?? sourceId
                  )
                  .join(" · ") || "None assigned"}
              </Text>
              {chapter.sections.map((section, sectionIndex) => (
                <View
                  key={`${run.id}-${partIndex}-${chapterIndex}-${sectionIndex}`}
                  style={{
                    marginLeft: 10,
                    padding: 9,
                    gap: 5,
                    borderRadius: 8,
                    backgroundColor: "#f1f5f9",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 10,
                      fontWeight: "900",
                      color: "#64748b",
                    }}
                  >
                    SECTION {sectionIndex + 1}
                  </Text>
                  <TextInput
                    editable={editable}
                    value={section.title}
                    onChangeText={(title) =>
                      updateSection(partIndex, chapterIndex, sectionIndex, {
                        title,
                      })
                    }
                    style={inputStyle}
                  />
                  <TextInput
                    editable={editable}
                    value={section.summary}
                    onChangeText={(summary) =>
                      updateSection(partIndex, chapterIndex, sectionIndex, {
                        summary,
                      })
                    }
                    multiline
                    style={inputStyle}
                  />
                </View>
              ))}
            </View>
          ))}
        </View>
      ))}
      {(run.editorialObservations ?? []).length ? (
        <View
          style={{
            padding: 10,
            gap: 4,
            borderRadius: 9,
            backgroundColor: "#eff6ff",
          }}
        >
          <Text style={{ fontWeight: "900", color: "#1e40af" }}>
            Editorial observations
          </Text>
          {run.editorialObservations.map((observation, index) => (
            <Text
              key={`${run.id}-observation-${index}`}
              style={{ color: "#1e40af" }}
            >
              • {observation}
            </Text>
          ))}
        </View>
      ) : null}
      {(run.unplacedSourceIds ?? []).length ? (
        <Text style={{ color: "#9a3412" }}>
          Unplaced material:{" "}
          {run.unplacedSourceIds
            .map(
              (sourceId) =>
                project.sources.find((source) => source.id === sourceId)
                  ?.title ?? sourceId
            )
            .join(" · ")}
        </Text>
      ) : null}
    </View>
  );
}

function SectionTitle({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <View>
      <Text style={{ fontSize: 24, fontWeight: "900", color: "#173a2a" }}>
        {title}
      </Text>
      <Text style={[mutedStyle, { marginTop: 4 }]}>{subtitle}</Text>
    </View>
  );
}
function Panel({ children }: { children: React.ReactNode }) {
  return (
    <View
      style={{
        padding: 14,
        gap: 10,
        borderWidth: 1,
        borderColor: "#dbe4dc",
        borderRadius: 14,
        backgroundColor: "#ffffff",
      }}
    >
      {children}
    </View>
  );
}
function ActionButton({
  label,
  icon,
  onPress,
  disabled,
  compact,
}: {
  label: string;
  icon: keyof typeof MaterialIcons.glyphMap;
  onPress: () => void;
  disabled?: boolean;
  compact?: boolean;
}) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => ({
        minHeight: compact ? 38 : 44,
        paddingHorizontal: 14,
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 7,
        backgroundColor: "#28523b",
        opacity: disabled ? 0.45 : pressed ? 0.78 : 1,
      })}
    >
      <MaterialIcons name={icon} size={18} color="#ffffff" />
      <Text style={{ color: "#ffffff", fontWeight: "900" }}>{label}</Text>
    </Pressable>
  );
}

const inputStyle = {
  minHeight: 44,
  paddingHorizontal: 12,
  paddingVertical: 9,
  borderWidth: 1,
  borderColor: "#cbd5e1",
  borderRadius: 10,
  backgroundColor: "#ffffff",
  color: "#1f2937",
} as const;
const labelStyle = {
  fontSize: 14,
  fontWeight: "900",
  color: "#334155",
} as const;
const mutedStyle = { fontSize: 12, lineHeight: 18, color: "#64748b" } as const;
const messageStyle = {
  padding: 10,
  color: "#28523b",
  fontWeight: "800",
} as const;
const rowStyle = {
  minHeight: 54,
  padding: 10,
  flexDirection: "row",
  alignItems: "center",
  gap: 10,
  borderBottomWidth: 1,
  borderBottomColor: "#edf2ef",
} as const;
const rowTitleStyle = {
  fontSize: 15,
  fontWeight: "900",
  color: "#1f2937",
} as const;
const tabStyle = {
  paddingHorizontal: 13,
  paddingVertical: 8,
  borderRadius: 999,
  backgroundColor: "#e8f1ea",
} as const;
const activeTabStyle = { backgroundColor: "#28523b" } as const;
const choiceStyle = {
  paddingHorizontal: 10,
  paddingVertical: 8,
  borderRadius: 9,
  borderWidth: 1,
  borderColor: "#cbd5e1",
  backgroundColor: "#ffffff",
} as const;
const selectedChoiceStyle = {
  borderColor: "#4d7c0f",
  backgroundColor: "#ecfccb",
} as const;
