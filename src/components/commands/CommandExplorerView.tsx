/*
 * File: src/components/commands/CommandExplorerView.tsx
 * Purpose: Command study view backed by the Prolog command knowledge base.
 */

import { useEffect, useMemo, useRef, useState } from "react";
import {
  Platform,
  Pressable,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from "react-native";

import { apiUrl } from "../../config/api";

type CommandSummary = {
  key: string;
  title: string;
  categories?: string[];
};

type CommandCategoryGroup = {
  key: string;
  commands: CommandSummary[];
};

type CommandResource = {
  key: string;
  title?: string;
  requirement?: string | null;
  reminderText?: string | null;
  categories?: string[];
  facts?: string[];
  appliesIf?: string[];
  embodies?: string[];
  scriptureReferences?: string[];
  studyNotes?: string[];
  sourceTerms?: SourceTerm[];
  translationNotes?: string[];
  clarificationNotes?: string[];
};

export type CommandHeaderCommand = Pick<
  CommandResource,
  "key" | "title" | "requirement" | "scriptureReferences" | "categories"
>;

export type CommandNavigationState = {
  canGoPrevious: boolean;
  canGoNext: boolean;
  goPrevious: () => void;
  goNext: () => void;
};

type SourceTerm = {
  language: string;
  term: string;
  gloss: string;
};

type CommandListResponse = {
  commands: CommandSummary[];
};

type RandomCommandResponse = {
  command: CommandResource | null;
};

type Props = {
  onSelectedCommandChange?: (command: CommandHeaderCommand | null) => void;
  onNavigationStateChange?: (navigation: CommandNavigationState) => void;
  onMobileSelectedCommandLayout?: (layout: {
    pageY: number;
    height: number;
  }) => void;
};

export default function CommandExplorerView({
  onSelectedCommandChange,
  onNavigationStateChange,
  onMobileSelectedCommandLayout,
}: Props) {
  const { width } = useWindowDimensions();
  const selectedCommandRef = useRef<any>(null);
  const shouldCenterSelectedCommandRef = useRef(false);
  const [categoryGroups, setCategoryGroups] = useState<CommandCategoryGroup[]>(
    []
  );
  const [expandedCategories, setExpandedCategories] = useState<
    Record<string, boolean>
  >({});
  const [selectedCommandKey, setSelectedCommandKey] = useState<string | null>(
    null
  );
  const [command, setCommand] = useState<CommandResource | null>(null);
  const [searchText, setSearchText] = useState("");
  const [isMobileListOpen, setIsMobileListOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isSelectingRandom, setIsSelectingRandom] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    loadCommandGroups();
  }, []);

  const normalizedSearch = searchText.trim().toLowerCase();

  const visibleGroups = useMemo(() => {
    if (!normalizedSearch) return categoryGroups;

    return categoryGroups
      .map((group) => ({
        ...group,
        commands: group.commands.filter((item) =>
          [item.title, item.key, group.key, ...(item.categories ?? [])]
            .join(" ")
            .toLowerCase()
            .includes(normalizedSearch)
        ),
      }))
      .filter((group) => group.commands.length > 0);
  }, [categoryGroups, normalizedSearch]);

  const commandCount = useMemo(
    () => categoryGroups.reduce((total, group) => total + group.commands.length, 0),
    [categoryGroups]
  );
  const usesSplitPane = width >= 680;
  const visibleCommands = useMemo(
    () => visibleGroups.flatMap((group) => group.commands),
    [visibleGroups]
  );
  const selectedCommandIndex = selectedCommandKey
    ? visibleCommands.findIndex((item) => item.key === selectedCommandKey)
    : -1;

  useEffect(() => {
    onNavigationStateChange?.({
      canGoPrevious: selectedCommandIndex > 0,
      canGoNext:
        selectedCommandIndex >= 0 &&
        selectedCommandIndex < visibleCommands.length - 1,
      goPrevious: selectPreviousCommand,
      goNext: selectNextCommand,
    });
  }, [onNavigationStateChange, selectedCommandIndex, visibleCommands]);

  async function loadCommandGroups() {
    try {
      setIsLoading(true);
      setErrorMessage(null);

      const groups = await loadGroupedCommands();
      const firstGroup = groups[0];
      const firstCommand = firstGroup?.commands[0];

      setCategoryGroups(groups);
      setExpandedCategories(firstGroup ? { [firstGroup.key]: true } : {});

      if (firstCommand) {
        await selectCommand(firstCommand.key, firstGroup.key);
      }
    } catch (error) {
      console.log("Failed to load command groups", error);
      setErrorMessage("Command resources could not be loaded.");
    } finally {
      setIsLoading(false);
    }
  }

  async function loadGroupedCommands() {
    const listResponse = await fetch(apiUrl("/command-resources"));

    if (!listResponse.ok) {
      throw new Error("Failed to load command resources.");
    }

    const data: CommandListResponse = await listResponse.json();
    return groupCommandsByCategory(data.commands);
  }

  async function selectCommand(commandKey: string, categoryKey?: string) {
    try {
      setSelectedCommandKey(commandKey);
      setCommand(null);
      setErrorMessage(null);

      if (categoryKey) {
        setExpandedCategories((current) => ({
          ...current,
          [categoryKey]: true,
        }));
      }

      const response = await fetch(apiUrl(`/command-resources/${commandKey}`));

      if (!response.ok) {
        throw new Error("Failed to load command resource.");
      }

      const data: CommandResource = await response.json();
      setCommand(data);
      onSelectedCommandChange?.(data);

      if (!usesSplitPane) {
        collapseMobileList();
      }
    } catch (error) {
      console.log("Failed to select command resource", error);
      setErrorMessage("This command resource could not be loaded.");
    }
  }

  async function selectRandomCommand() {
    try {
      setIsSelectingRandom(true);
      setErrorMessage(null);

      const response = await fetch(
        apiUrl("/command-resources/random?facts=reminder_eligible,scripture_backed")
      );

      if (!response.ok) {
        throw new Error("Failed to load random command resource.");
      }

      const data: RandomCommandResponse = await response.json();

      if (!data.command) {
        setErrorMessage("No matching command resource was found.");
        return;
      }

      setCommand(data.command);
      setSelectedCommandKey(data.command.key);
      onSelectedCommandChange?.(data.command);

      if (!usesSplitPane) {
        collapseMobileList();
      }

      const firstCategory = data.command.categories?.[0];
      if (firstCategory) {
        setExpandedCategories((current) => ({
          ...current,
          [firstCategory]: true,
        }));
      }
    } catch (error) {
      console.log("Failed to select random command resource", error);
      setErrorMessage("A random command resource could not be loaded.");
    } finally {
      setIsSelectingRandom(false);
    }
  }

  function toggleCategory(categoryKey: string) {
    setExpandedCategories((current) => ({
      ...current,
      [categoryKey]: !current[categoryKey],
    }));
  }

  function selectPreviousCommand() {
    const previousCommand = visibleCommands[selectedCommandIndex - 1];
    if (!previousCommand) return;

    selectCommand(previousCommand.key, previousCommand.categories?.[0]);
  }

  function selectNextCommand() {
    const nextCommand = visibleCommands[selectedCommandIndex + 1];
    if (!nextCommand) return;

    selectCommand(nextCommand.key, nextCommand.categories?.[0]);
  }

  function collapseMobileList() {
    if (!isMobileListOpen) return;

    setIsMobileListOpen(false);
  }

  function toggleMobileList() {
    if (isMobileListOpen) {
      collapseMobileList();
      return;
    }

    shouldCenterSelectedCommandRef.current = true;
    setIsMobileListOpen(true);
  }

  function handleListPaneLayout() {
    if (!shouldCenterSelectedCommandRef.current) return;

    shouldCenterSelectedCommandRef.current = false;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        selectedCommandRef.current?.measure?.(
          (
            _x: number,
            _y: number,
            _width: number,
            height: number,
            _pageX: number,
            pageY: number
          ) => {
            if (typeof pageY !== "number" || typeof height !== "number") return;

            onMobileSelectedCommandLayout?.({ pageY, height });
          }
        );
      });
    });
  }

  const shouldShowMobileListToggle = !usesSplitPane && Boolean(command);
  const shouldShowListPane = usesSplitPane || !command || isMobileListOpen;

  return (
    <View style={{ gap: 14 }}>
      <View style={[styles.studyGrid, usesSplitPane && styles.studyGridSplit]}>
        <View style={[styles.detailPanel, usesSplitPane && styles.detailPaneSplit]}>
          {command ? (
            <CommandDetail command={command} />
          ) : (
            <Text style={styles.mutedText}>Select a command.</Text>
          )}
        </View>

        {shouldShowMobileListToggle && (
          <Pressable
            onPress={toggleMobileList}
            style={({ pressed }) => [
              styles.mobileListToggle,
              pressed && { backgroundColor: "#e2e8f0" },
            ]}
          >
            <View style={{ flex: 1 }}>
              <Text style={styles.mobileListToggleTitle}>
                {isMobileListOpen ? "Hide command list" : "Browse commands"}
              </Text>
              <Text style={styles.mobileListToggleMeta}>
                {categoryGroups.length} categories - {commandCount} entries
              </Text>
            </View>

            <Text style={styles.mobileListToggleIcon}>
              {isMobileListOpen ? "-" : "+"}
            </Text>
          </Pressable>
        )}

        {shouldShowListPane && (
          <View
            onLayout={handleListPaneLayout}
            style={[styles.listPane, usesSplitPane && styles.listPaneSplit]}
          >
            <View style={styles.commandControls}>
              <View style={{ flex: 1, minWidth: 210 }}>
                <Text style={styles.countText}>
                  {categoryGroups.length} categories - {commandCount} grouped entries
                </Text>

                <TextInput
                  value={searchText}
                  onChangeText={setSearchText}
                  placeholder="Search commands"
                  placeholderTextColor="#94a3b8"
                  autoCapitalize="none"
                  autoCorrect={false}
                  style={styles.searchInput}
                />
              </View>

              <Pressable
                onPress={selectRandomCommand}
                disabled={isSelectingRandom}
                style={({ pressed }) => [
                  styles.randomButton,
                  pressed && { opacity: 0.82 },
                  isSelectingRandom && { opacity: 0.65 },
                ]}
              >
                <Text style={styles.randomButtonText}>
                  {isSelectingRandom ? "Loading..." : "Random"}
                </Text>
              </Pressable>
            </View>

            {errorMessage && (
              <View style={styles.errorPanel}>
                <Text style={styles.errorText}>{errorMessage}</Text>
              </View>
            )}

            {isLoading ? (
              <Text style={styles.mutedText}>Loading commands...</Text>
            ) : visibleGroups.length === 0 ? (
              <Text style={styles.mutedText}>No commands found.</Text>
            ) : (
              visibleGroups.map((group) => {
                const isExpanded =
                  Boolean(expandedCategories[group.key]) ||
                  Boolean(normalizedSearch);

                return (
                  <View key={group.key} style={styles.categorySection}>
                    <Pressable
                      onPress={() => toggleCategory(group.key)}
                      style={({ pressed }) => [
                        styles.categoryHeader,
                        pressed && { backgroundColor: "#eef2f7" },
                      ]}
                    >
                      <Text style={styles.categoryTitle}>{formatKey(group.key)}</Text>
                      <Text style={styles.categoryCount}>{group.commands.length}</Text>
                    </Pressable>

                    {isExpanded && (
                      <View style={styles.commandList}>
                        {group.commands.map((item) => (
                          <CommandListItem
                            key={`${group.key}-${item.key}`}
                            item={item}
                            isSelected={item.key === selectedCommandKey}
                            itemRef={
                              item.key === selectedCommandKey
                                ? (node) => {
                                    selectedCommandRef.current = node;
                                  }
                                : undefined
                            }
                            onPress={() => selectCommand(item.key, group.key)}
                          />
                        ))}
                      </View>
                    )}
                  </View>
                );
              })
            )}
          </View>
        )}

      </View>
    </View>
  );
}

function CommandListItem({
  item,
  itemRef,
  isSelected,
  onPress,
}: {
  item: CommandSummary;
  itemRef?: (node: any) => void;
  isSelected: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      ref={itemRef}
      onPress={onPress}
      style={({ pressed }) => [
        styles.commandItem,
        isSelected && styles.commandItemSelected,
        pressed && { opacity: 0.86 },
      ]}
    >
      <Text style={styles.commandTitle}>{item.title}</Text>
    </Pressable>
  );
}

function CommandDetail({ command }: { command: CommandResource }) {
  const references = command.scriptureReferences ?? [];
  const commandTitle = command.title
    ? formatCommandTitle(command.title, references)
    : formatKey(command.key);
  const requirementText = command.requirement;
  const shouldShowRequirement =
    Boolean(requirementText) &&
    requirementText?.trim().toLowerCase() !== commandTitle.trim().toLowerCase();

  return (
    <View style={{ gap: 16 }}>
      <View style={styles.commandSummaryBlock}>
        <Text
          style={styles.commandSummaryTitle}
          numberOfLines={3}
          adjustsFontSizeToFit
          minimumFontScale={0.78}
        >
          {commandTitle}
        </Text>

        {shouldShowRequirement ? (
          <Text style={styles.commandSummaryRequirement}>{requirementText}</Text>
        ) : null}

        {references.length > 0 ? (
          <View style={styles.referenceWrap}>
            {references.map((reference) => (
              <Text key={reference} style={styles.referenceTag}>
                {reference}
              </Text>
            ))}
          </View>
        ) : null}
      </View>

      <DetailList
        title="Study Notes"
        items={command.studyNotes ?? []}
        emptyText="No study notes."
      />

      <SourceTermList items={command.sourceTerms ?? []} />

      <DetailList
        title="Translation Notes"
        items={command.translationNotes ?? []}
        emptyText="No translation notes."
      />

      <DetailList
        title="Clarification"
        items={command.clarificationNotes ?? []}
        emptyText="No clarification notes."
      />

      <DetailTags
        title="Categories"
        items={command.categories ?? []}
        emptyText="No categories."
      />

      <DetailTags
        title="Embodies"
        items={command.embodies ?? []}
        emptyText="No embodiment tags."
      />

      <DetailTags
        title="Facts"
        items={command.facts ?? []}
        emptyText="No facts."
      />
    </View>
  );
}

function SourceTermList({ items }: { items: SourceTerm[] }) {
  if (items.length === 0) return null;

  return (
    <View style={{ gap: 8 }}>
      <SectionTitle title="Source Terms" />

      {items.map((item, index) => (
        <View key={`${item.language}-${item.term}-${index}`} style={styles.termRow}>
          <Text style={styles.termTitle}>
            {formatKey(item.language)} - {item.term}
          </Text>

          <Text style={styles.termGloss}>{item.gloss}</Text>
        </View>
      ))}
    </View>
  );
}

function DetailTags({
  title,
  items,
  emptyText,
}: {
  title: string;
  items: string[];
  emptyText: string;
}) {
  return (
    <View style={{ gap: 8 }}>
      <SectionTitle title={title} />

      {items.length === 0 ? (
        <Text style={styles.mutedText}>{emptyText}</Text>
      ) : (
        <View style={styles.tagWrap}>
          {items.map((item) => (
            <Text key={`${title}-${item}`} style={styles.tag}>
              {formatKey(item)}
            </Text>
          ))}
        </View>
      )}
    </View>
  );
}

function DetailList({
  title,
  items,
  emptyText,
}: {
  title: string;
  items: string[];
  emptyText: string;
}) {
  return (
    <View style={{ gap: 6 }}>
      <SectionTitle title={title} />

      {items.length === 0 ? (
        <Text style={styles.mutedText}>{emptyText}</Text>
      ) : (
        items.map((item, index) => (
          <Text key={`${title}-${index}`} style={styles.listText}>
            {index + 1}. {formatKey(item)}
          </Text>
        ))
      )}
    </View>
  );
}

function SectionTitle({ title }: { title: string }) {
  return <Text style={styles.sectionTitle}>{title}</Text>;
}

function formatCommandTitle(title: string, references: string[]) {
  const matchingReference = references.find((reference) =>
    title.toLowerCase().startsWith(reference.toLowerCase())
  );

  if (matchingReference) {
    return title.slice(matchingReference.length).replace(/^\s*[-:]\s*/, "");
  }

  return title.replace(
    /^(Gen|Exod|Exo|Lev|Num|Deut|Deu|Genesis|Exodus|Leviticus|Numbers|Deuteronomy)\.?\s+\d+:\d+(?:-\d+)?\s*[-:]\s*/i,
    ""
  );
}

function formatKey(value: string) {
  return value.replace(/_/g, " ");
}

function groupCommandsByCategory(commands: CommandSummary[]) {
  const groupsByKey = new Map<string, CommandSummary[]>();

  commands.forEach((command) => {
    const categories = command.categories?.length
      ? command.categories
      : ["uncategorized"];

    categories.forEach((category) => {
      const currentCommands = groupsByKey.get(category) ?? [];
      currentCommands.push(command);
      groupsByKey.set(category, currentCommands);
    });
  });

  return Array.from(groupsByKey.entries())
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([key, categoryCommands]) => ({
      key,
      commands: categoryCommands,
    }));
}

const styles = {
  commandControls: {
    flexDirection: "row" as const,
    flexWrap: "wrap" as const,
    alignItems: "center" as const,
    gap: 12,
    padding: 16,
    borderRadius: 8,
    backgroundColor: "#f8fafc",
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  countText: {
    marginBottom: 8,
    fontSize: 13,
    lineHeight: 18,
    color: "#64748b",
  },
  randomButton: {
    minHeight: 40,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center" as const,
    justifyContent: "center" as const,
    backgroundColor: "#0f766e",
  },
  randomButtonText: {
    fontSize: 13,
    fontWeight: "900" as const,
    color: "#ffffff",
  },
  searchInput: {
    minHeight: 44,
    paddingHorizontal: 14,
    borderRadius: 8,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#cbd5e1",
    color: "#0f172a",
    fontSize: 15,
  },
  errorPanel: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#fef2f2",
    borderWidth: 1,
    borderColor: "#fecaca",
  },
  errorText: {
    color: "#991b1b",
    fontWeight: "800" as const,
  },
  studyGrid: {
    gap: 12,
  },
  studyGridSplit: {
    flexDirection: "row" as const,
    alignItems: "flex-start" as const,
  },
  listPane: {
    gap: 10,
  },
  listPaneSplit: {
    flex: 0.42,
    minWidth: 250,
  },
  mobileListToggle: {
    minHeight: 56,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#cbd5e1",
    backgroundColor: "#f8fafc",
    flexDirection: "row" as const,
    alignItems: "center" as const,
    justifyContent: "space-between" as const,
    gap: 12,
  },
  mobileListToggleTitle: {
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "900" as const,
    color: "#0f172a",
  },
  mobileListToggleMeta: {
    marginTop: 2,
    fontSize: 12,
    lineHeight: 16,
    color: "#64748b",
  },
  mobileListToggleIcon: {
    minWidth: 48,
    textAlign: "right" as const,
    fontSize: 12,
    fontWeight: "900" as const,
    color: "#0f766e",
    textTransform: "uppercase" as const,
  },
  detailPanel: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  detailPaneSplit: {
    flex: 0.58,
    minWidth: 300,
    ...(Platform.OS === "web"
      ? {
          position: "sticky" as const,
          top: 260,
        }
      : {}),
  },
  categorySection: {
    borderRadius: 8,
    overflow: "hidden" as const,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  categoryHeader: {
    minHeight: 46,
    paddingHorizontal: 12,
    paddingVertical: 10,
    flexDirection: "row" as const,
    alignItems: "center" as const,
    justifyContent: "space-between" as const,
    gap: 10,
    backgroundColor: "#f8fafc",
  },
  categoryTitle: {
    flex: 1,
    fontSize: 14,
    fontWeight: "900" as const,
    color: "#1e293b",
    textTransform: "capitalize" as const,
  },
  categoryCount: {
    minWidth: 34,
    textAlign: "center" as const,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 999,
    overflow: "hidden" as const,
    backgroundColor: "#e0f2fe",
    color: "#075985",
    fontSize: 12,
    fontWeight: "900" as const,
  },
  commandList: {
    padding: 8,
    gap: 8,
  },
  commandItem: {
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    backgroundColor: "#ffffff",
  },
  commandItemSelected: {
    borderColor: "#38bdf8",
    backgroundColor: "#f0f9ff",
  },
  commandTitle: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "900" as const,
    color: "#111827",
  },
  commandSummaryBlock: {
    gap: 8,
  },
  commandSummaryTitle: {
    fontSize: 21,
    lineHeight: 27,
    fontWeight: "500" as const,
    color: "#111827",
  },
  commandSummaryRequirement: {
    fontSize: 14,
    lineHeight: 20,
    color: "#6b7280",
  },
  referenceWrap: {
    flexDirection: "row" as const,
    flexWrap: "wrap" as const,
    gap: 6,
  },
  referenceTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
    overflow: "hidden" as const,
    backgroundColor: "#ecfeff",
    borderWidth: 1,
    borderColor: "#a5f3fc",
    color: "#155e75",
    fontSize: 12,
    fontWeight: "900" as const,
  },
  commandKey: {
    marginTop: 2,
    fontSize: 11,
    lineHeight: 16,
    color: "#64748b",
  },
  reviewBlock: {
    gap: 14,
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#fefce8",
    borderWidth: 1,
    borderColor: "#fde68a",
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: "900" as const,
    color: "#334155",
    textTransform: "uppercase" as const,
  },
  listText: {
    fontSize: 14,
    lineHeight: 21,
    color: "#475569",
  },
  mutedText: {
    fontSize: 14,
    lineHeight: 20,
    color: "#64748b",
  },
  tagRow: {
    marginTop: 8,
    flexDirection: "row" as const,
    flexWrap: "wrap" as const,
    gap: 6,
  },
  tagWrap: {
    flexDirection: "row" as const,
    flexWrap: "wrap" as const,
    gap: 6,
  },
  smallTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
    overflow: "hidden" as const,
    backgroundColor: "#f1f5f9",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    fontSize: 11,
    fontWeight: "800" as const,
    color: "#475569",
  },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 999,
    overflow: "hidden" as const,
    backgroundColor: "#f8fafc",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    fontSize: 12,
    fontWeight: "800" as const,
    color: "#475569",
  },
  termRow: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#facc15",
  },
  termTitle: {
    fontSize: 14,
    fontWeight: "900" as const,
    color: "#713f12",
  },
  termGloss: {
    marginTop: 2,
    fontSize: 13,
    lineHeight: 18,
    color: "#854d0e",
  },
};
