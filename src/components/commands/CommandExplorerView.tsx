/*
 * File: src/components/commands/CommandExplorerView.tsx
 * Purpose: Command study view backed by the Prolog command knowledge base.
 */

import { useEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import {
  Image,
  Linking,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from "react-native";
import type { ImageSourcePropType, StyleProp, ViewStyle } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialIcons } from "@expo/vector-icons";

import { apiUrl } from "../../config/api";

type CommandSummary = {
  key: string;
  title: string;
  categories?: string[];
  embodies?: string[];
  facts?: string[];
  hasRequirements?: "true" | "false";
  hasStudyNotes?: "true" | "false";
  hasSourceTerms?: "true" | "false";
  hasStoryReferences?: "true" | "false";
  hasNonCanonicalStoryReferences?: "true" | "false";
  hasTranslationNotes?: "true" | "false";
  hasClarificationNotes?: "true" | "false";
  hasTeaching?: "true" | "false";
};

type CommandFilterState = boolean | null;

type CommandFilterKey =
  | "lovesGod"
  | "lovesNeighbor"
  | "hasRequirements"
  | "hasStudyNotes"
  | "hasSourceTerms"
  | "hasStoryReferences"
  | "hasNonCanonicalStoryReferences"
  | "hasTeaching";

const COMMAND_FILTER_DEFINITIONS: {
  key: CommandFilterKey;
  label: string;
  test: (command: CommandSummary) => boolean;
}[] = [
  {
    key: "lovesGod",
    label: "Love YHWH",
    test: (command) => (command.embodies ?? []).includes("love_god"),
  },
  {
    key: "lovesNeighbor",
    label: "Love Neighbor",
    test: (command) => (command.embodies ?? []).includes("love_neighbor"),
  },
  {
    key: "hasRequirements",
    label: "Has Requirements",
    test: (command) => command.hasRequirements === "true",
  },
  {
    key: "hasStudyNotes",
    label: "Has Study Notes",
    test: (command) => command.hasStudyNotes === "true",
  },
  {
    key: "hasSourceTerms",
    label: "Has Source Terms",
    test: (command) => command.hasSourceTerms === "true",
  },
  {
    key: "hasStoryReferences",
    label: "Has Scripture Examples",
    test: (command) => command.hasStoryReferences === "true",
  },
  {
    key: "hasNonCanonicalStoryReferences",
    label: "Has Ancient Writings",
    test: (command) => command.hasNonCanonicalStoryReferences === "true",
  },
  {
    key: "hasTeaching",
    label: "Has Teaching",
    test: (command) => command.hasTeaching === "true",
  },
];

function createEmptyCommandFilters(): Record<CommandFilterKey, CommandFilterState> {
  return {
    lovesGod: null,
    lovesNeighbor: null,
    hasRequirements: null,
    hasStudyNotes: null,
    hasSourceTerms: null,
    hasStoryReferences: null,
    hasNonCanonicalStoryReferences: null,
    hasTeaching: null,
  };
}

function cycleCommandFilterState(
  current: CommandFilterState
): CommandFilterState {
  if (current === null) return true;
  if (current === true) return false;
  return null;
}

function commandPassesFilters(
  command: CommandSummary,
  filters: Record<CommandFilterKey, CommandFilterState>
): boolean {
  return COMMAND_FILTER_DEFINITIONS.every(({ key, test }) => {
    const desired = filters[key];

    if (desired === null) return true;

    return test(command) === desired;
  });
}

type CommandCategoryGroup = {
  key: string;
  commands: CommandSummary[];
};

type CommandResource = {
  key: string;
  title?: string;
  requirement?: string | null;
  requirements?: string[];
  reminderText?: string | null;
  categories?: string[];
  facts?: string[];
  appliesIf?: string[];
  embodies?: string[];
  scriptureReferences?: string[];
  storyReferences?: StoryReference[];
  nonCanonicalStoryReferences?: StoryReference[];
  relatedTeachings?: RelatedTeaching[];
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

export type BibleVersion =
  | "KJV"
  | "NKJV"
  | "NLT"
  | "NIV"
  | "ESV"
  | "CSB"
  | "YLT"
  | "BES";

type SourceTerm = {
  language: string;
  term: string;
  gloss: string;
};

type StoryReference = {
  reference: string;
  label: string;
};

type RelatedTeaching = {
  title: string;
  url: string;
  year?: number | null;
  month?: number | null;
  day?: number | null;
};

type CommandContributionType =
  | "requirement"
  | "study_note"
  | "story_reference"
  | "non_canonical_story_reference"
  | "source_term"
  | "translation_note"
  | "clarification_note";

type CommandContributionMode = "add" | "suggest_edit" | "suggest_remove";

type CommandContributionTarget = {
  source: "prolog" | "contribution";
  index?: number;
  currentText?: string;
  currentValue?: unknown;
};

type PendingContribution = {
  id: string;
  commandKey: string;
  mode: CommandContributionMode;
  type: CommandContributionType;
  text: string;
  suggestedText?: string;
  reason?: string;
  createdBy?: string;
  target?: CommandContributionTarget;
  status?: "pending" | "approved" | "rejected" | "deleted";
  promotedAt?: string;
  promotedBy?: string;
  prologFact?: string;
  prologFile?: string;
  votes?: CommandContributionVote[];
};

type CommandContributionVote = {
  id: string;
  type: "support" | "concern";
  reason?: string;
  createdAt: string;
  createdBy: string;
  resolvedAt?: string;
  resolvedBy?: string;
  resolutionNote?: string;
};

type ContributionDraft = {
  mode: CommandContributionMode;
  type: CommandContributionType;
  title: string;
  text: string;
  reason: string;
  target?: CommandContributionTarget;
};

type PromotionDraft = {
  language: string;
  term: string;
  gloss: string;
  reference: string;
  label: string;
  requirementText: string;
  studyNote: string;
  translationNote: string;
  clarificationNote: string;
};

type CommandListResponse = {
  commands: CommandSummary[];
};

type RandomCommandResponse = {
  command: CommandResource | null;
};

type ContributionsResponse = {
  contributions: PendingContribution[];
};

const CONTRIBUTION_GROUP_CODE = "church-of-the-word";
const SELECTED_COMMAND_STORAGE_KEY = "commandStudySelectedCommandKey";

type Props = {
  bibleVersion: BibleVersion;
  searchText: string;
  randomRequestId: number;
  pendingRequestId: number;
  adminToken?: string | null;
  groupCode?: string;
  contributorUsername: string;
  userRole?: string;
  onSelectedCommandChange?: (command: CommandHeaderCommand | null) => void;
  onNavigationStateChange?: (navigation: CommandNavigationState) => void;
  onResourceStatsChange?: (stats: {
    categoryCount: number;
    commandCount: number;
    isSelectingRandom: boolean;
    isSelectingPending: boolean;
    pendingContributionCount: number;
    pendingConcernCount: number;
  }) => void;
  onMobileSelectedCommandLayout?: (layout: {
    pageY: number;
    height: number;
  }) => void;
  onRequestContributorUsername?: () => void;
  onPlayTeaching?: (teaching: RelatedTeaching) => void;
};

export default function CommandExplorerView({
  bibleVersion,
  searchText,
  randomRequestId,
  pendingRequestId,
  adminToken,
  groupCode,
  contributorUsername,
  userRole,
  onSelectedCommandChange,
  onNavigationStateChange,
  onResourceStatsChange,
  onMobileSelectedCommandLayout,
  onRequestContributorUsername,
  onPlayTeaching,
}: Props) {
  const { height, width } = useWindowDimensions();
  const selectedCommandRef = useRef<any>(null);
  const shouldCenterSelectedCommandRef = useRef(false);
  const pendingBrowseIndexRef = useRef(0);
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
  const [isLoading, setIsLoading] = useState(true);
  const [isSelectingRandom, setIsSelectingRandom] = useState(false);
  const [isSelectingPending, setIsSelectingPending] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [contributionDraft, setContributionDraft] =
    useState<ContributionDraft | null>(null);
  const [pendingContributions, setPendingContributions] = useState<
    PendingContribution[]
  >([]);
  const [voteContributions, setVoteContributions] = useState<
    PendingContribution[]
  >([]);
  const [voteIndex, setVoteIndex] = useState(0);
  const [isVoteDockOpen, setIsVoteDockOpen] = useState(false);
  const [isReviewDockOpen, setIsReviewDockOpen] = useState(false);
  const [voteDraft, setVoteDraft] = useState<{
    contribution: PendingContribution;
    type: "support" | "concern";
    reason: string;
  } | null>(null);
  const [voteMessage, setVoteMessage] = useState<string | null>(null);
  const [isSubmittingVote, setIsSubmittingVote] = useState(false);
  const [reviewIndex, setReviewIndex] = useState(0);
  const [reviewMode, setReviewMode] = useState<"pending" | "approved">(
    "pending"
  );
  const [isSubmittingContribution, setIsSubmittingContribution] =
    useState(false);
  const [contributionMessage, setContributionMessage] = useState<string | null>(
    null
  );
  const canModerateContributions = userRole === "admin" && Boolean(adminToken);
  const canContribute = Boolean(
    normalizeContributorUsername(contributorUsername)
  );
  const requestUsername = normalizeContributorUsername(contributorUsername);

  function commandFetch(input: RequestInfo | URL, init: RequestInit = {}) {
    const headers = new Headers(init.headers);

    if (requestUsername) {
      headers.set("X-COTW-Username", requestUsername);
    }

    if (groupCode) {
      headers.set("X-COTW-Group-Code", groupCode);
    }

    return fetch(input, {
      ...init,
      headers,
    });
  }

  useEffect(() => {
    loadCommandGroups();
  }, []);

  useEffect(() => {
    if (!canModerateContributions) return;

    loadReviewContributions(reviewMode);
  }, [adminToken, userRole, reviewMode]);

  useEffect(() => {
    if (!canContribute) {
      setVoteContributions([]);
      return;
    }

    loadVoteContributions();
  }, [canContribute]);

  const normalizedSearch = searchText.trim().toLowerCase();
  const [isCommandFilterMenuOpen, setIsCommandFilterMenuOpen] = useState(false);
  const [commandFilters, setCommandFilters] = useState(
    createEmptyCommandFilters
  );
  const activeCommandFilterCount = Object.values(commandFilters).filter(
    (value) => value !== null
  ).length;

  const visibleGroups = useMemo(() => {
    return categoryGroups
      .map((group) => ({
        ...group,
        commands: group.commands
          .filter(
            (item) =>
              !normalizedSearch ||
              [item.title, item.key, group.key, ...(item.categories ?? [])]
                .join(" ")
                .toLowerCase()
                .includes(normalizedSearch)
          )
          .filter((item) => commandPassesFilters(item, commandFilters)),
      }))
      .filter((group) => group.commands.length > 0);
  }, [categoryGroups, normalizedSearch, commandFilters]);

  const commandCount = useMemo(
    () =>
      categoryGroups.reduce((total, group) => total + group.commands.length, 0),
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
    if (randomRequestId <= 0) return;

    selectRandomCommand();
  }, [randomRequestId]);

  useEffect(() => {
    if (pendingRequestId <= 0) return;

    setIsVoteDockOpen(true);
    selectPendingContributionCommand();
  }, [pendingRequestId]);

  useEffect(() => {
    setReviewIndex((current) =>
      Math.min(current, Math.max(0, pendingContributions.length - 1))
    );
  }, [pendingContributions.length]);

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

  useEffect(() => {
    const pendingConcernCount = voteContributions.reduce(
      (total, contribution) =>
        total + getContributionVoteCounts(contribution).concern,
      0
    );

    onResourceStatsChange?.({
      categoryCount: categoryGroups.length,
      commandCount,
      isSelectingRandom,
      isSelectingPending,
      pendingContributionCount: voteContributions.length,
      pendingConcernCount,
    });
  }, [
    categoryGroups.length,
    commandCount,
    isSelectingRandom,
    isSelectingPending,
    voteContributions,
    onResourceStatsChange,
  ]);

  async function loadCommandGroups() {
    try {
      setIsLoading(true);
      setErrorMessage(null);

      const groups = await loadGroupedCommands();
      const firstGroup = groups[0];
      const firstCommand = firstGroup?.commands[0];
      const savedCommandKey = await AsyncStorage.getItem(
        SELECTED_COMMAND_STORAGE_KEY
      );
      const savedCommandGroup = savedCommandKey
        ? groups.find((group) =>
            group.commands.some((item) => item.key === savedCommandKey)
          )
        : null;

      setCategoryGroups(groups);
      setExpandedCategories(
        savedCommandGroup
          ? { [savedCommandGroup.key]: true }
          : firstGroup
            ? { [firstGroup.key]: true }
            : {}
      );

      if (savedCommandKey && savedCommandGroup) {
        await selectCommand(savedCommandKey, savedCommandGroup.key);
        return;
      }

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
    const listResponse = await commandFetch(apiUrl("/command-resources"));

    if (!listResponse.ok) {
      throw new Error("Failed to load command resources.");
    }

    const data: CommandListResponse = await listResponse.json();
    return groupCommandsByCategory(data.commands);
  }

  async function loadReviewContributions(
    status: "pending" | "approved",
    commandKey?: string
  ) {
    if (!canModerateContributions) return;

    try {
      const query = new URLSearchParams({
        status,
        ...(commandKey ? { commandKey } : {}),
        ...(status === "approved" ? { promoted: "false" } : {}),
        _: String(Date.now()),
      });

      const response = await commandFetch(
        apiUrl(`/command-resources/contributions?${query.toString()}`),
        {
          cache: "no-store",
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to load command review contributions.");
      }

      const data: ContributionsResponse = await response.json();

      setPendingContributions((current) => {
        const otherContributions = commandKey
          ? current.filter((item) => item.commandKey !== commandKey)
          : [];

        return [...data.contributions, ...otherContributions];
      });
    } catch (error) {
      console.log("Failed to load command review contributions", error);
    }
  }

  async function loadVisiblePendingContributions(commandKey: string) {
    try {
      const query = new URLSearchParams({
        status: "pending",
      });

      const response = await commandFetch(
        apiUrl(
          `/command-resources/${commandKey}/contributions?${query.toString()}`
        )
      );

      if (!response.ok) {
        throw new Error("Failed to load command contributions under review.");
      }

      const data: ContributionsResponse = await response.json();

      setPendingContributions((current) => {
        const otherContributions = current.filter(
          (item) => item.commandKey !== commandKey
        );

        return [...data.contributions, ...otherContributions];
      });
    } catch (error) {
      console.log("Failed to load visible command contributions", error);
    }
  }

  async function loadVoteContributions() {
    try {
      const response = await commandFetch(
        apiUrl(`/command-resources/contributions/visible?_=${Date.now()}`),
        {
          cache: "no-store",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to load vote tasks.");
      }

      const data: ContributionsResponse = await response.json();
      const contributions = data.contributions.filter(
        (item) => item.status === "pending"
      );
      setVoteContributions(contributions);
      setVoteIndex((current) =>
        Math.min(current, Math.max(0, contributions.length - 1))
      );
    } catch (error) {
      console.log("Failed to load command vote tasks", error);
    }
  }

  function measureSelectedCommandSoon() {
    if (usesSplitPane) return;

    shouldCenterSelectedCommandRef.current = true;

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        measureSelectedCommand();
      });
    });
  }

  function measureSelectedCommand() {
    if (!shouldCenterSelectedCommandRef.current) return;

    shouldCenterSelectedCommandRef.current = false;
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
  }

  async function selectCommand(
    commandKey: string,
    categoryKey?: string,
    options: {
      centerOnMobile?: boolean;
      preloadedCommand?: CommandResource;
    } = {}
  ) {
    try {
      setSelectedCommandKey(commandKey);
      setCommand(null);
      setErrorMessage(null);
      setContributionDraft(null);
      setContributionMessage(null);
      AsyncStorage.setItem(SELECTED_COMMAND_STORAGE_KEY, commandKey);

      if (categoryKey) {
        setExpandedCategories((current) => ({
          ...current,
          [categoryKey]: true,
        }));
      }

      const data = options.preloadedCommand
        ? options.preloadedCommand
        : await (async () => {
            const response = await commandFetch(
              apiUrl(`/command-resources/${commandKey}`)
            );

            if (!response.ok) {
              throw new Error("Failed to load command resource.");
            }

            return (await response.json()) as CommandResource;
          })();
      setCommand(data);
      onSelectedCommandChange?.(data);
      await loadVisiblePendingContributions(commandKey);

      if (options.centerOnMobile) {
        measureSelectedCommandSoon();
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

      const hasActiveFilterOrSearch =
        activeCommandFilterCount > 0 || Boolean(normalizedSearch);

      if (hasActiveFilterOrSearch) {
        if (visibleCommands.length === 0) {
          setErrorMessage("No matching command resource was found.");
          return;
        }

        const randomIndex = Math.floor(Math.random() * visibleCommands.length);
        const randomCommand = visibleCommands[randomIndex];
        const firstCategory = randomCommand.categories?.[0];

        await selectCommand(randomCommand.key, firstCategory, {
          centerOnMobile: true,
        });
        return;
      }

      const response = await commandFetch(
        apiUrl(
          "/command-resources/random?facts=reminder_eligible,scripture_backed"
        )
      );

      if (!response.ok) {
        throw new Error("Failed to load random command resource.");
      }

      const data: RandomCommandResponse = await response.json();

      if (!data.command) {
        setErrorMessage("No matching command resource was found.");
        return;
      }

      const firstCategory = data.command.categories?.[0];
      await selectCommand(data.command.key, firstCategory, {
        centerOnMobile: true,
        preloadedCommand: data.command,
      });
    } catch (error) {
      console.log("Failed to select random command resource", error);
      setErrorMessage("A random command resource could not be loaded.");
    } finally {
      setIsSelectingRandom(false);
    }
  }

  async function selectPendingContributionCommand() {
    try {
      setIsSelectingPending(true);
      setErrorMessage(null);
      setContributionMessage(null);
      setReviewMode("pending");

      const response = await commandFetch(
        apiUrl("/command-resources/contributions/visible")
      );

      if (!response.ok) {
        throw new Error("Failed to load pending command contributions.");
      }

      const data: ContributionsResponse = await response.json();
      const contributions = data.contributions.filter(
        (item) => item.status === "pending"
      );

      if (!contributions.length) {
        setContributionMessage("There are no pending command suggestions.");
        return;
      }

      setPendingContributions(contributions);

      const nextPendingIndex =
        pendingBrowseIndexRef.current % contributions.length;
      const contribution = contributions[nextPendingIndex];
      pendingBrowseIndexRef.current += 1;
      setVoteContributions(contributions);
      setVoteIndex(nextPendingIndex);

      const categoryKey = categoryGroups.find((group) =>
        group.commands.some((item) => item.key === contribution.commandKey)
      )?.key;

      await selectCommand(contribution.commandKey, categoryKey, {
        centerOnMobile: true,
      });
    } catch (error) {
      console.log("Failed to browse pending command contributions", error);
      setErrorMessage("Pending command suggestions could not be loaded.");
    } finally {
      setIsSelectingPending(false);
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

    selectCommand(previousCommand.key, previousCommand.categories?.[0], {
      centerOnMobile: true,
    });
  }

  function selectNextCommand() {
    const nextCommand = visibleCommands[selectedCommandIndex + 1];
    if (!nextCommand) return;

    selectCommand(nextCommand.key, nextCommand.categories?.[0], {
      centerOnMobile: true,
    });
  }

  function collapseCommandSelection() {
    setSelectedCommandKey(null);
    setCommand(null);
    setContributionDraft(null);
    setContributionMessage(null);
    AsyncStorage.removeItem(SELECTED_COMMAND_STORAGE_KEY);
    onSelectedCommandChange?.(null);
  }

  function handleCommandListPress(item: CommandSummary, categoryKey: string) {
    if (!usesSplitPane && item.key === selectedCommandKey && command) {
      collapseCommandSelection();
      return;
    }

    selectCommand(item.key, categoryKey);
  }

  function handleListPaneLayout() {
    if (!shouldCenterSelectedCommandRef.current) return;

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        measureSelectedCommand();
      });
    });
  }

  function openContributionDraft(params: {
    mode: CommandContributionMode;
    type: CommandContributionType;
    title: string;
    currentText?: string;
    index?: number;
    currentValue?: unknown;
  }) {
    setContributionMessage(null);
    setContributionDraft({
      mode: params.mode,
      type: params.type,
      title: params.title,
      text: params.mode === "suggest_edit" ? (params.currentText ?? "") : "",
      reason: "",
      target:
        params.mode === "add"
          ? undefined
          : {
              source: "prolog",
              index: params.index,
              currentText: params.currentText,
              currentValue: params.currentValue,
            },
    });
  }

  async function submitContribution() {
    if (!command || !contributionDraft || !canContribute) return;

    const text = contributionDraft.text.trim();
    const reason = contributionDraft.reason.trim();
    const username = normalizeContributorUsername(contributorUsername);

    if (!username) {
      setContributionMessage(
        "Add a lowercase username with no spaces before submitting."
      );
      return;
    }

    if (!text && contributionDraft.mode !== "suggest_remove") {
      setContributionMessage("Add the suggested text before submitting.");
      return;
    }

    if (contributionDraft.mode === "suggest_remove" && !reason) {
      setContributionMessage("Add a short reason for the removal suggestion.");
      return;
    }

    try {
      setIsSubmittingContribution(true);
      setContributionMessage(null);

      const response = await commandFetch(
        apiUrl(
          `/command-resources/${command.key}/contributions?groupCode=${encodeURIComponent(
            CONTRIBUTION_GROUP_CODE
          )}`
        ),
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(adminToken ? { Authorization: `Bearer ${adminToken}` } : {}),
          },
          body: JSON.stringify({
            groupCode: CONTRIBUTION_GROUP_CODE,
            mode: contributionDraft.mode,
            type: contributionDraft.type,
            text:
              contributionDraft.mode === "suggest_remove"
                ? (contributionDraft.target?.currentText ?? "Suggested removal")
                : contributionDraft.mode === "suggest_edit"
                  ? (contributionDraft.target?.currentText ?? text)
                  : text,
            suggestedText:
              contributionDraft.mode === "suggest_edit" ? text : undefined,
            reason: reason || undefined,
            target: contributionDraft.target,
            createdBy: username,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Contribution could not be submitted.");
      }

      const data: { contribution: PendingContribution } = await response.json();
      setPendingContributions((current) => [data.contribution, ...current]);
      setVoteContributions((current) => [data.contribution, ...current]);
      setContributionDraft(null);
      setContributionMessage("Contribution saved for review.");
    } catch (error) {
      console.log("Failed to submit command contribution", error);
      setContributionMessage("Contribution could not be submitted.");
    } finally {
      setIsSubmittingContribution(false);
    }
  }

  async function withdrawContribution(contributionId: string) {
    if (!command || !canContribute) return;

    const username = normalizeContributorUsername(contributorUsername);

    if (!username) {
      setContributionMessage(
        "Enter the same lowercase username used for the contribution."
      );
      return;
    }

    try {
      setContributionMessage(null);

      const response = await commandFetch(
        apiUrl(
          `/command-resources/${command.key}/contributions/${contributionId}?groupCode=${encodeURIComponent(
            CONTRIBUTION_GROUP_CODE
          )}&username=${encodeURIComponent(username)}`
        ),
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            ...(adminToken ? { Authorization: `Bearer ${adminToken}` } : {}),
          },
          body: JSON.stringify({
            groupCode: CONTRIBUTION_GROUP_CODE,
            username,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Contribution could not be withdrawn.");
      }

      setPendingContributions((current) =>
        current.filter((item) => item.id !== contributionId)
      );
      setReviewIndex((current) =>
        Math.min(current, Math.max(0, pendingContributions.length - 2))
      );
      setVoteContributions((current) =>
        current.filter((item) => item.id !== contributionId)
      );
      setContributionMessage("Contribution withdrawn.");
    } catch (error) {
      console.log("Failed to withdraw command contribution", error);
      setContributionMessage("Contribution could not be withdrawn.");
    }
  }

  function updateContributionEverywhere(
    updatedContribution: PendingContribution
  ) {
    setPendingContributions((current) =>
      current.map((item) =>
        item.id === updatedContribution.id ? updatedContribution : item
      )
    );
    setVoteContributions((current) =>
      current.map((item) =>
        item.id === updatedContribution.id ? updatedContribution : item
      )
    );
  }

  async function submitContributionVote() {
    if (!voteDraft || !canContribute) return;

    const username = normalizeContributorUsername(contributorUsername);
    const reason = voteDraft.reason.trim();

    if (!username) {
      setVoteMessage("Add a lowercase username before voting.");
      return;
    }

    if (voteDraft.type === "concern" && !reason) {
      setVoteMessage("Add a short note for the concern.");
      return;
    }

    try {
      setIsSubmittingVote(true);
      setVoteMessage(null);

      const response = await commandFetch(
        apiUrl(
          `/command-resources/contributions/${voteDraft.contribution.id}/votes?groupCode=${encodeURIComponent(
            CONTRIBUTION_GROUP_CODE
          )}`
        ),
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(adminToken ? { Authorization: `Bearer ${adminToken}` } : {}),
          },
          body: JSON.stringify({
            groupCode: CONTRIBUTION_GROUP_CODE,
            type: voteDraft.type,
            reason: reason || undefined,
            createdBy: username,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Vote could not be submitted.");
      }

      const data: { contribution: PendingContribution } = await response.json();
      updateContributionEverywhere(data.contribution);
      setVoteDraft(null);
      setVoteMessage("Vote saved.");
    } catch (error) {
      console.log("Failed to submit command contribution vote", error);
      setVoteMessage("Vote could not be saved.");
    } finally {
      setIsSubmittingVote(false);
    }
  }

  async function resolveContributionConcern(
    contributionId: string,
    voteId: string
  ) {
    if (!canModerateContributions) return;

    try {
      setVoteMessage(null);

      const response = await commandFetch(
        apiUrl(
          `/command-resources/contributions/${contributionId}/votes/${voteId}/resolve`
        ),
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${adminToken}`,
          },
          body: JSON.stringify({
            resolvedBy:
              normalizeContributorUsername(contributorUsername) || "admin",
            resolutionNote: "Resolved by admin review.",
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Concern could not be resolved.");
      }

      const data: { contribution: PendingContribution } = await response.json();
      updateContributionEverywhere(data.contribution);
      setVoteMessage("Concern resolved.");
    } catch (error) {
      console.log("Failed to resolve command contribution concern", error);
      setVoteMessage("Concern could not be resolved.");
    }
  }

  async function moderateContribution(
    contributionId: string,
    action: "approve" | "reject"
  ) {
    if (!canModerateContributions) return;

    try {
      setContributionMessage(null);

      const response = await commandFetch(
        apiUrl(`/command-resources/contributions/${contributionId}/${action}`),
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${adminToken}`,
          },
          body: JSON.stringify({
            updatedBy:
              normalizeContributorUsername(contributorUsername) || "admin",
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Contribution review action failed.");
      }

      const moderatedContribution = pendingContributions.find(
        (item) => item.id === contributionId
      );

      setPendingContributions((current) =>
        current.filter((item) => item.id !== contributionId)
      );
      setVoteContributions((current) =>
        current.filter((item) => item.id !== contributionId)
      );

      setContributionMessage(
        action === "approve"
          ? "Contribution approved."
          : "Contribution rejected."
      );

      if (
        action === "approve" &&
        moderatedContribution?.commandKey &&
        moderatedContribution.commandKey === command?.key
      ) {
        await selectCommand(moderatedContribution.commandKey);
      }
    } catch (error) {
      console.log("Failed to moderate command contribution", error);
      setContributionMessage("Contribution review action failed.");
    }
  }

  async function promoteContribution(
    contributionId: string,
    official: PromotionDraft
  ) {
    if (!canModerateContributions) return;

    try {
      setContributionMessage(null);

      const response = await commandFetch(
        apiUrl(`/command-resources/contributions/${contributionId}/promote`),
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${adminToken}`,
          },
          body: JSON.stringify({
            promotedBy:
              normalizeContributorUsername(contributorUsername) || "admin",
            official,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Contribution promotion failed.");
      }

      const promotedContribution = pendingContributions.find(
        (item) => item.id === contributionId
      );

      setPendingContributions((current) =>
        current.filter((item) => item.id !== contributionId)
      );
      setContributionMessage("Contribution promoted to Prolog.");

      if (
        promotedContribution &&
        promotedContribution.commandKey === command?.key
      ) {
        await selectCommand(promotedContribution.commandKey);
      }
    } catch (error) {
      console.log("Failed to promote command contribution", error);
      setContributionMessage("Contribution promotion failed.");
    }
  }

  const desktopPaneHeight = Math.max(420, height - 285);
  const commandPendingContributions = command
    ? pendingContributions.filter((item) => item.commandKey === command.key)
    : [];
  const reviewContribution = canModerateContributions
    ? (pendingContributions[reviewIndex] ?? null)
    : null;
  const voteContribution = voteContributions[voteIndex] ?? null;
  const activeVoteConcernCount = voteContributions.reduce(
    (total, contribution) =>
      total + getContributionVoteCounts(contribution).concern,
    0
  );
  const renderVoteTools = () => {
    if (!canContribute) return null;

    return (
      <SectionDock
        title="Vote"
        icon="how-to-vote"
        subtitle="Optional community feedback for suggestions under review."
        isOpen={isVoteDockOpen}
        badgeCount={voteContributions.length}
        concernCount={activeVoteConcernCount}
        onToggle={() => setIsVoteDockOpen((value) => !value)}
      >
        <VoteTasksPanel
          contribution={voteContribution}
          currentIndex={voteIndex}
          totalCount={voteContributions.length}
          username={contributorUsername}
          canModerate={canModerateContributions}
          message={voteMessage}
          voteDraft={voteDraft}
          isSubmittingVote={isSubmittingVote}
          onPrevious={() =>
            setVoteIndex((current) => Math.max(0, current - 1))
          }
          onNext={() =>
            setVoteIndex((current) =>
              Math.min(voteContributions.length - 1, current + 1)
            )
          }
          onOpenCommand={(commandKey) => selectCommand(commandKey)}
          onOpenVote={(contribution, type) =>
            setVoteDraft({ contribution, type, reason: "" })
          }
          onChangeVoteDraft={setVoteDraft}
          onCloseVote={() => setVoteDraft(null)}
          onSubmitVote={submitContributionVote}
          onResolveConcern={resolveContributionConcern}
        />
      </SectionDock>
    );
  };

  const renderAdminReviewTools = () => {
    if (!canModerateContributions) return null;

    return (
      <SectionDock
        title="Review"
        icon="rate-review"
        subtitle="Pending community suggestions awaiting admin approval."
        isOpen={isReviewDockOpen}
        badgeCount={pendingContributions.length}
        onToggle={() => setIsReviewDockOpen((value) => !value)}
      >
        <AdminReviewPanel
          contribution={reviewContribution}
          reviewMode={reviewMode}
          currentIndex={reviewIndex}
          totalCount={pendingContributions.length}
          onChangeReviewMode={(mode) => {
            setReviewMode(mode);
            setReviewIndex(0);
          }}
          onPrevious={() =>
            setReviewIndex((current) => Math.max(0, current - 1))
          }
          onNext={() =>
            setReviewIndex((current) =>
              Math.min(pendingContributions.length - 1, current + 1)
            )
          }
          onOpenCommand={(commandKey) => selectCommand(commandKey)}
          onApprove={(contributionId) =>
            moderateContribution(contributionId, "approve")
          }
          onReject={(contributionId) =>
            moderateContribution(contributionId, "reject")
          }
          onPromote={promoteContribution}
          onResolveConcern={resolveContributionConcern}
        />
      </SectionDock>
    );
  };
  const renderCommandStudyContent = () => {
    if (!command) {
      return <Text style={styles.mutedText}>Select a command.</Text>;
    }

    return (
      <View style={{ gap: 16 }}>
        <CommandDetail
          command={command}
          bibleVersion={bibleVersion}
          canContribute={canContribute}
          contributionDraft={contributionDraft}
          contributionMessage={contributionMessage}
          contributorUsername={contributorUsername}
          isSubmittingContribution={isSubmittingContribution}
          pendingContributions={commandPendingContributions}
          onRequestContributorUsername={onRequestContributorUsername}
          onOpenContribution={openContributionDraft}
          onChangeContributionDraft={setContributionDraft}
          onCancelContribution={() => setContributionDraft(null)}
          onSubmitContribution={submitContribution}
          onWithdrawContribution={withdrawContribution}
          onPlayTeaching={onPlayTeaching}
        />
      </View>
    );
  };

  return (
    <View style={{ gap: 14 }}>
      <View style={{ gap: 8 }}>
        {renderVoteTools()}
        {renderAdminReviewTools()}
      </View>

      <View style={[styles.studyGrid, usesSplitPane && styles.studyGridSplit]}>
        {usesSplitPane ? (
          <View style={[styles.detailPanel, styles.detailPaneSplit]}>
            <PaneScroll
              enabled
              height={desktopPaneHeight}
              scrollStyle={styles.detailPaneScroll}
              contentContainerStyle={[
                styles.detailPaneContent,
                styles.detailPaneContentSplit,
              ]}
            >
              {renderCommandStudyContent()}
            </PaneScroll>
          </View>
        ) : null}

        {!usesSplitPane && !command ? (
          <Text style={styles.mutedText}>Select a command.</Text>
        ) : null}

        {!usesSplitPane && command ? (
          <Text style={styles.mobileInlineHint}>
            Tap the selected command again to collapse it.
          </Text>
        ) : null}

        <View
          onLayout={handleListPaneLayout}
          style={[styles.listPane, usesSplitPane && styles.listPaneSplit]}
        >
          <PaneScroll
            enabled={usesSplitPane}
            height={desktopPaneHeight}
            contentContainerStyle={styles.listPaneContent}
          >
            {errorMessage && (
              <View style={styles.errorPanel}>
                <Text style={styles.errorText}>{errorMessage}</Text>
              </View>
            )}

            <CommandFilterMenu
              isOpen={isCommandFilterMenuOpen}
              filters={commandFilters}
              activeCount={activeCommandFilterCount}
              matchCount={visibleCommands.length}
              totalCount={commandCount}
              onToggleOpen={() =>
                setIsCommandFilterMenuOpen((current) => !current)
              }
              onCycleFilter={(key) =>
                setCommandFilters((current) => ({
                  ...current,
                  [key]: cycleCommandFilterState(current[key]),
                }))
              }
              onClearFilters={() => setCommandFilters(createEmptyCommandFilters())}
            />

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
                      {getCategoryIcon(group.key) ? (
                        <Image
                          source={getCategoryIcon(group.key)!}
                          style={styles.categoryHeaderIcon}
                          resizeMode="contain"
                        />
                      ) : null}

                      <Text style={styles.categoryTitle}>
                        {formatKey(group.key)}
                      </Text>
                      <Text style={styles.categoryCount}>
                        {group.commands.length}
                      </Text>
                    </Pressable>

                    {isExpanded && (
                      <View style={styles.commandList}>
                        {group.commands.map((item) => (
                          <CommandListItem
                            key={`${group.key}-${item.key}`}
                            item={item}
                            categoryKey={group.key}
                            isSelected={item.key === selectedCommandKey}
                            inlineContent={
                              !usesSplitPane &&
                              item.key === selectedCommandKey &&
                              command
                                ? renderCommandStudyContent()
                                : null
                            }
                            itemRef={
                              item.key === selectedCommandKey
                                ? (node) => {
                                    selectedCommandRef.current = node;
                                  }
                                : undefined
                            }
                            onPress={() =>
                              handleCommandListPress(item, group.key)
                            }
                          />
                        ))}
                      </View>
                    )}
                  </View>
                );
              })
            )}
          </PaneScroll>
        </View>
      </View>
    </View>
  );
}

function PaneScroll({
  children,
  contentContainerStyle,
  enabled,
  height,
  scrollStyle,
}: {
  children: ReactNode;
  contentContainerStyle?: StyleProp<ViewStyle>;
  enabled: boolean;
  height: number;
  scrollStyle?: StyleProp<ViewStyle>;
}) {
  if (!enabled) {
    return <View style={contentContainerStyle}>{children}</View>;
  }

  return (
    <ScrollView
      nestedScrollEnabled
      showsVerticalScrollIndicator
      style={[{ maxHeight: height }, scrollStyle]}
      contentContainerStyle={contentContainerStyle}
    >
      {children}
    </ScrollView>
  );
}

function CommandFilterMenu({
  isOpen,
  filters,
  activeCount,
  matchCount,
  totalCount,
  onToggleOpen,
  onCycleFilter,
  onClearFilters,
}: {
  isOpen: boolean;
  filters: Record<CommandFilterKey, CommandFilterState>;
  activeCount: number;
  matchCount: number;
  totalCount: number;
  onToggleOpen: () => void;
  onCycleFilter: (key: CommandFilterKey) => void;
  onClearFilters: () => void;
}) {
  return (
    <View style={styles.filterMenuContainer}>
      <Pressable
        onPress={onToggleOpen}
        style={({ pressed }) => [
          styles.filterMenuToggle,
          pressed && { opacity: 0.8 },
        ]}
      >
        <Text style={styles.filterMenuToggleText}>
          Filters{activeCount > 0 ? ` (${activeCount})` : ""}
        </Text>

        {activeCount > 0 ? (
          <Text style={styles.filterMenuMatchCountText}>
            {matchCount} of {totalCount} match
          </Text>
        ) : null}

        <MaterialIcons
          name={isOpen ? "expand-less" : "expand-more"}
          size={18}
          color="#334155"
        />
      </Pressable>

      {isOpen ? (
        <View style={styles.filterMenuPanel}>
          <Text style={styles.filterMenuHelpText}>
            Tap a filter to require it (✓), tap again to exclude it (✗), tap
            again to ignore it. Use these to find commands that still need
            more study.
          </Text>

          <Text style={styles.filterMenuMatchCountInlineText}>
            {matchCount} of {totalCount} commands match
            {activeCount > 0 ? " the active filters" : ""}.
          </Text>

          <View style={styles.filterMenuChipRow}>
            {COMMAND_FILTER_DEFINITIONS.map(({ key, label }) => {
              const state = filters[key];
              const chipStyle =
                state === true
                  ? styles.filterChipOn
                  : state === false
                    ? styles.filterChipOff
                    : styles.filterChipNeutral;
              const marker = state === true ? "✓" : state === false ? "✗" : "";

              return (
                <Pressable
                  key={key}
                  onPress={() => onCycleFilter(key)}
                  style={({ pressed }) => [
                    styles.filterChip,
                    chipStyle,
                    pressed && { opacity: 0.8 },
                  ]}
                >
                  {marker ? (
                    <Text style={styles.filterChipMarker}>{marker}</Text>
                  ) : null}
                  <Text style={styles.filterChipLabel}>{label}</Text>
                </Pressable>
              );
            })}
          </View>

          {activeCount > 0 ? (
            <Pressable onPress={onClearFilters} style={styles.filterClearButton}>
              <Text style={styles.filterClearButtonText}>Clear filters</Text>
            </Pressable>
          ) : null}
        </View>
      ) : null}
    </View>
  );
}

const CATEGORY_ICONS: Record<string, ImageSourcePropType> = {
  animal_welfare: require("../../../assets/command/icons/animal_welfare.png"),
  appointed_times: require("../../../assets/command/icons/appointed_times.png"),
  atonement: require("../../../assets/command/icons/atonement.png"),
  clean_purity: require("../../../assets/command/icons/clean_purity.png"),
  command_remembrance: require("../../../assets/command/icons/command_remembrance.png"),
  community_care: require("../../../assets/command/icons/community_care.png"),
  family_household: require("../../../assets/command/icons/family_household.png"),
  firstfruits_omer: require("../../../assets/command/icons/firstfruits_omer.png"),
  justice_neighbor: require("../../../assets/command/icons/justice_neighbor.png"),
  leadership_warfare: require("../../../assets/command/icons/leadership_warfare.png"),
  marriage_household: require("../../../assets/command/icons/marriage_household.png"),
  mixed_kinds: require("../../../assets/command/icons/mixed_kinds.png"),
  name_vows_remembrance: require("../../../assets/command/icons/name_vows_remembrance.png"),
  offerings: require("../../../assets/command/icons/offerings.png"),
  passover_unleavened_bread: require("../../../assets/command/icons/passover_unleavened_bread.png"),
  priestly_holiness: require("../../../assets/command/icons/priestly_holiness.png"),
  property_economics_land: require("../../../assets/command/icons/property_economics_land.png"),
  refuge_court_procedure: require("../../../assets/command/icons/refuge_court_procedure.png"),
  sabbath: require("../../../assets/command/icons/sabbath.png"),
  sacred_assembly: require("../../../assets/command/icons/sacred_assembly.png"),
  servants_release: require("../../../assets/command/icons/servants_release.png"),
  tabernacles: require("../../../assets/command/icons/tabernacles.png"),
  torah_teaching: require("../../../assets/command/icons/torah_teaching.png"),
  vows_separation: require("../../../assets/command/icons/vows_separation.png"),
  worship_idolatry: require("../../../assets/command/icons/worship_idolatry.png"),
};

function getCategoryIcon(categoryKey?: string): ImageSourcePropType | null {
  return (categoryKey && CATEGORY_ICONS[categoryKey]) || null;
}

function CommandListItem({
  item,
  categoryKey,
  itemRef,
  isSelected,
  inlineContent,
  onPress,
}: {
  item: CommandSummary;
  categoryKey?: string;
  itemRef?: (node: any) => void;
  isSelected: boolean;
  inlineContent?: ReactNode;
  onPress: () => void;
}) {
  const { reference, description } = splitCommandTitle(item.title);

  return (
    <View
      style={[
        styles.commandItemShell,
        isSelected && styles.commandItemShellSelected,
      ]}
    >
      <Pressable
        ref={itemRef}
        onPress={onPress}
        style={({ pressed }) => [
          styles.commandItem,
          isSelected && styles.commandItemSelected,
          pressed && { opacity: 0.86 },
        ]}
      >
        <View style={styles.commandItemRow}>
          {getCategoryIcon(categoryKey) ? (
            <Image
              source={getCategoryIcon(categoryKey)!}
              style={styles.commandItemCategoryIcon}
              resizeMode="contain"
            />
          ) : null}

          <Text style={[styles.commandTitle, { flex: 1 }]}>
            {reference ? (
              <Text style={styles.commandTitleReference}>{reference} — </Text>
            ) : null}
            {description}
          </Text>
        </View>
      </Pressable>

      {inlineContent ? (
        <View style={styles.commandInlineDetail}>{inlineContent}</View>
      ) : null}
    </View>
  );
}

function CommandDetail({
  command,
  bibleVersion,
  canContribute,
  contributionDraft,
  contributionMessage,
  contributorUsername,
  isSubmittingContribution,
  pendingContributions,
  onRequestContributorUsername,
  onOpenContribution,
  onChangeContributionDraft,
  onCancelContribution,
  onSubmitContribution,
  onWithdrawContribution,
  onPlayTeaching,
}: {
  command: CommandResource;
  bibleVersion: BibleVersion;
  canContribute: boolean;
  contributionDraft: ContributionDraft | null;
  contributionMessage: string | null;
  contributorUsername: string;
  isSubmittingContribution: boolean;
  pendingContributions: PendingContribution[];
  onRequestContributorUsername?: () => void;
  onOpenContribution: (params: {
    mode: CommandContributionMode;
    type: CommandContributionType;
    title: string;
    currentText?: string;
    index?: number;
    currentValue?: unknown;
  }) => void;
  onChangeContributionDraft: (draft: ContributionDraft) => void;
  onCancelContribution: () => void;
  onSubmitContribution: () => void;
  onWithdrawContribution: (contributionId: string) => void;
  onPlayTeaching?: (teaching: RelatedTeaching) => void;
}) {
  const references = command.scriptureReferences ?? [];
  const commandTitle = command.title
    ? formatCommandTitle(command.title, references)
    : formatKey(command.key);
  const requirementItems = (command.requirements ?? []).filter(
    (item) => item.trim().toLowerCase() !== commandTitle.trim().toLowerCase()
  );
  const getPendingContributionsByType = (type: CommandContributionType) =>
    pendingContributions.filter((item) => item.type === type);

  return (
    <View style={{ gap: 16 }}>
      <View style={styles.commandSummaryBlock}>
        <View style={styles.commandSummaryTopRow}>
          <View style={styles.commandDotRow} aria-hidden>
            <View style={styles.commandDot} />
            <View style={styles.commandDot} />
            <View style={styles.commandDot} />
          </View>

          <Text
            style={styles.commandSummaryTitle}
            numberOfLines={3}
            adjustsFontSizeToFit
            minimumFontScale={0.78}
          >
            {commandTitle}
          </Text>
        </View>

        {references.length > 0 ? (
          <View style={styles.referenceWrap}>
            {references.map((reference) => (
              <ScriptureReferencePill
                key={reference}
                reference={reference}
                bibleVersion={bibleVersion}
              />
            ))}
          </View>
        ) : null}
      </View>

      {!canContribute ? (
        <View style={styles.contributionLoginCard}>
          <View style={{ flex: 1, minWidth: 0 }}>
            <Text style={styles.contributionLoginTitle}>
              Add a public comment
            </Text>
            <Text style={styles.contributionLoginText}>
              Choose a username to suggest notes, source words, references, or
              clarifications. Every suggestion stays under review until it is
              approved.
            </Text>
          </View>

          <Pressable
            onPress={onRequestContributorUsername}
            disabled={!onRequestContributorUsername}
            style={({ pressed }) => [
              styles.contributionLoginButton,
              pressed && { opacity: 0.82 },
              !onRequestContributorUsername && { opacity: 0.5 },
            ]}
          >
            <Text style={styles.contributionLoginButtonText}>
              Choose Username
            </Text>
          </Pressable>
        </View>
      ) : null}

      <DetailList
        title="Obedience Requirements"
        contributionType="requirement"
        helpText={getContributionTypeGuidance("requirement")}
        items={requirementItems}
        emptyText="No specific obedience requirements."
        canContribute={canContribute}
        contributionDraft={contributionDraft}
        contributionMessage={contributionMessage}
        pendingContributions={getPendingContributionsByType("requirement")}
        contributorUsername={contributorUsername}
        isSubmittingContribution={isSubmittingContribution}
        onOpenContribution={onOpenContribution}
        onChangeContributionDraft={onChangeContributionDraft}
        onCancelContribution={onCancelContribution}
        onSubmitContribution={onSubmitContribution}
        onWithdrawContribution={onWithdrawContribution}
      />

      <DetailList
        title="Study Notes"
        contributionType="study_note"
        helpText={getContributionTypeGuidance("study_note")}
        items={command.studyNotes ?? []}
        emptyText="No study notes."
        canContribute={canContribute}
        contributionDraft={contributionDraft}
        contributionMessage={contributionMessage}
        pendingContributions={getPendingContributionsByType("study_note")}
        contributorUsername={contributorUsername}
        isSubmittingContribution={isSubmittingContribution}
        onOpenContribution={onOpenContribution}
        onChangeContributionDraft={onChangeContributionDraft}
        onCancelContribution={onCancelContribution}
        onSubmitContribution={onSubmitContribution}
        onWithdrawContribution={onWithdrawContribution}
      />

      <StoryReferenceList
        items={command.storyReferences ?? []}
        bibleVersion={bibleVersion}
        canContribute={canContribute}
        contributionDraft={contributionDraft}
        contributionMessage={contributionMessage}
        pendingContributions={getPendingContributionsByType("story_reference")}
        contributorUsername={contributorUsername}
        isSubmittingContribution={isSubmittingContribution}
        onOpenContribution={onOpenContribution}
        onChangeContributionDraft={onChangeContributionDraft}
        onCancelContribution={onCancelContribution}
        onSubmitContribution={onSubmitContribution}
        onWithdrawContribution={onWithdrawContribution}
      />

      <NonCanonicalStoryReferenceList
        items={command.nonCanonicalStoryReferences ?? []}
        bibleVersion={bibleVersion}
        canContribute={canContribute}
        contributionDraft={contributionDraft}
        contributionMessage={contributionMessage}
        pendingContributions={getPendingContributionsByType(
          "non_canonical_story_reference"
        )}
        contributorUsername={contributorUsername}
        isSubmittingContribution={isSubmittingContribution}
        onOpenContribution={onOpenContribution}
        onChangeContributionDraft={onChangeContributionDraft}
        onCancelContribution={onCancelContribution}
        onSubmitContribution={onSubmitContribution}
        onWithdrawContribution={onWithdrawContribution}
      />

      <SourceTermList
        items={command.sourceTerms ?? []}
        canContribute={canContribute}
        contributionDraft={contributionDraft}
        contributionMessage={contributionMessage}
        pendingContributions={getPendingContributionsByType("source_term")}
        contributorUsername={contributorUsername}
        isSubmittingContribution={isSubmittingContribution}
        onOpenContribution={onOpenContribution}
        onChangeContributionDraft={onChangeContributionDraft}
        onCancelContribution={onCancelContribution}
        onSubmitContribution={onSubmitContribution}
        onWithdrawContribution={onWithdrawContribution}
      />

      <DetailList
        title="Translation Notes"
        contributionType="translation_note"
        helpText={getContributionTypeGuidance("translation_note")}
        items={command.translationNotes ?? []}
        emptyText="No translation notes."
        canContribute={canContribute}
        contributionDraft={contributionDraft}
        contributionMessage={contributionMessage}
        pendingContributions={getPendingContributionsByType("translation_note")}
        contributorUsername={contributorUsername}
        isSubmittingContribution={isSubmittingContribution}
        onOpenContribution={onOpenContribution}
        onChangeContributionDraft={onChangeContributionDraft}
        onCancelContribution={onCancelContribution}
        onSubmitContribution={onSubmitContribution}
        onWithdrawContribution={onWithdrawContribution}
      />

      <DetailList
        title="Clarification"
        contributionType="clarification_note"
        helpText={getContributionTypeGuidance("clarification_note")}
        items={command.clarificationNotes ?? []}
        emptyText="No clarification notes."
        canContribute={canContribute}
        contributionDraft={contributionDraft}
        contributionMessage={contributionMessage}
        pendingContributions={getPendingContributionsByType(
          "clarification_note"
        )}
        contributorUsername={contributorUsername}
        isSubmittingContribution={isSubmittingContribution}
        onOpenContribution={onOpenContribution}
        onChangeContributionDraft={onChangeContributionDraft}
        onCancelContribution={onCancelContribution}
        onSubmitContribution={onSubmitContribution}
        onWithdrawContribution={onWithdrawContribution}
      />

      <RelatedTeachingList
        items={command.relatedTeachings ?? []}
        onPlayTeaching={onPlayTeaching}
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

function ScriptureReferencePill({
  reference,
  bibleVersion,
}: {
  reference: string;
  bibleVersion: BibleVersion;
}) {
  const url = getBlueLetterBibleUrl(reference, bibleVersion);

  return (
    <Pressable
      disabled={!url}
      onPress={() => {
        if (url) {
          Linking.openURL(url);
        }
      }}
      style={({ pressed }) => [
        styles.referenceTag,
        pressed && { opacity: 0.78 },
        !url && { opacity: 0.68 },
      ]}
    >
      <Text style={styles.referenceTagText}>{reference}</Text>
    </Pressable>
  );
}

function SourceTermList({
  items,
  canContribute,
  contributionDraft,
  contributionMessage,
  pendingContributions,
  contributorUsername,
  isSubmittingContribution,
  onOpenContribution,
  onChangeContributionDraft,
  onCancelContribution,
  onSubmitContribution,
  onWithdrawContribution,
}: {
  items: SourceTerm[];
  canContribute: boolean;
  contributionDraft: ContributionDraft | null;
  contributionMessage: string | null;
  pendingContributions: PendingContribution[];
  contributorUsername: string;
  isSubmittingContribution: boolean;
  onOpenContribution: (params: {
    mode: CommandContributionMode;
    type: CommandContributionType;
    title: string;
    currentText?: string;
    index?: number;
    currentValue?: unknown;
  }) => void;
  onChangeContributionDraft: (draft: ContributionDraft) => void;
  onCancelContribution: () => void;
  onSubmitContribution: () => void;
  onWithdrawContribution: (contributionId: string) => void;
}) {
  const title = "Source Terms";
  const ownsDraft = contributionDraft?.type === "source_term";

  return (
    <View style={{ gap: 8 }}>
      <EditableSectionTitle
        title={title}
        helpText={getContributionTypeGuidance("source_term")}
        canContribute={canContribute}
        isOpen={ownsDraft}
        onToggle={() => {
          if (ownsDraft) {
            onCancelContribution();
            return;
          }

          onOpenContribution({
            mode: "add",
            type: "source_term",
            title,
          });
        }}
      />

      {items.length === 0 ? (
        <Text style={styles.mutedText}>No source terms.</Text>
      ) : null}

      {items.map((item, index) => (
        <View
          key={`${item.language}-${item.term}-${index}`}
          style={styles.termRow}
        >
          <Text style={styles.termTitle}>
            {formatKey(item.language)} - {item.term}
          </Text>

          <Text style={styles.termGloss}>{item.gloss}</Text>

          {canContribute ? (
            <ContributionActions
              onEdit={() =>
                onOpenContribution({
                  mode: "suggest_edit",
                  type: "source_term",
                  title,
                  index,
                  currentText: `${formatKey(item.language)} - ${item.term}: ${
                    item.gloss
                  }`,
                  currentValue: item,
                })
              }
              onRemove={() =>
                onOpenContribution({
                  mode: "suggest_remove",
                  type: "source_term",
                  title,
                  index,
                  currentText: `${formatKey(item.language)} - ${item.term}: ${
                    item.gloss
                  }`,
                  currentValue: item,
                })
              }
            />
          ) : null}
        </View>
      ))}

      {ownsDraft && contributionDraft ? (
        <ContributionForm
          draft={contributionDraft}
          isSubmitting={isSubmittingContribution}
          onChange={onChangeContributionDraft}
          onSubmit={onSubmitContribution}
        />
      ) : null}

      {ownsDraft && contributionMessage ? (
        <Text style={styles.contributionMessage}>{contributionMessage}</Text>
      ) : null}

      <PendingContributionList
        items={pendingContributions}
        username={contributorUsername}
        onWithdraw={onWithdrawContribution}
      />
    </View>
  );
}

function StoryReferenceList({
  items,
  bibleVersion,
  canContribute,
  contributionDraft,
  contributionMessage,
  pendingContributions,
  contributorUsername,
  isSubmittingContribution,
  onOpenContribution,
  onChangeContributionDraft,
  onCancelContribution,
  onSubmitContribution,
  onWithdrawContribution,
}: {
  items: StoryReference[];
  bibleVersion: BibleVersion;
  canContribute: boolean;
  contributionDraft: ContributionDraft | null;
  contributionMessage: string | null;
  pendingContributions: PendingContribution[];
  contributorUsername: string;
  isSubmittingContribution: boolean;
  onOpenContribution: (params: {
    mode: CommandContributionMode;
    type: CommandContributionType;
    title: string;
    currentText?: string;
    index?: number;
    currentValue?: unknown;
  }) => void;
  onChangeContributionDraft: (draft: ContributionDraft) => void;
  onCancelContribution: () => void;
  onSubmitContribution: () => void;
  onWithdrawContribution: (contributionId: string) => void;
}) {
  const title = "Seen In Scripture";
  const ownsDraft = contributionDraft?.type === "story_reference";

  return (
    <View style={{ gap: 8 }}>
      <EditableSectionTitle
        title={title}
        helpText="Biblical examples where this command is practiced, violated, enforced, or illustrated."
        canContribute={canContribute}
        isOpen={ownsDraft}
        onToggle={() => {
          if (ownsDraft) {
            onCancelContribution();
            return;
          }

          onOpenContribution({
            mode: "add",
            type: "story_reference",
            title,
          });
        }}
      />

      {items.length === 0 ? (
        <Text style={styles.mutedText}>No scripture examples.</Text>
      ) : null}

      {items.map((item, index) => (
        <View
          key={`${item.reference}-${index}`}
          style={styles.storyReferenceRow}
        >
          <ScriptureReferencePill
            reference={item.reference}
            bibleVersion={bibleVersion}
          />

          <Text style={styles.storyReferenceLabel}>{item.label}</Text>

          {canContribute ? (
            <ContributionActions
              onEdit={() =>
                onOpenContribution({
                  mode: "suggest_edit",
                  type: "story_reference",
                  title,
                  index,
                  currentText: `${item.reference}: ${item.label}`,
                  currentValue: item,
                })
              }
              onRemove={() =>
                onOpenContribution({
                  mode: "suggest_remove",
                  type: "story_reference",
                  title,
                  index,
                  currentText: `${item.reference}: ${item.label}`,
                  currentValue: item,
                })
              }
            />
          ) : null}
        </View>
      ))}

      {ownsDraft && contributionDraft ? (
        <ContributionForm
          draft={contributionDraft}
          isSubmitting={isSubmittingContribution}
          onChange={onChangeContributionDraft}
          onSubmit={onSubmitContribution}
        />
      ) : null}

      {ownsDraft && contributionMessage ? (
        <Text style={styles.contributionMessage}>{contributionMessage}</Text>
      ) : null}

      <PendingContributionList
        items={pendingContributions}
        username={contributorUsername}
        onWithdraw={onWithdrawContribution}
      />
    </View>
  );
}

function NonCanonicalStoryReferenceList({
  items,
  bibleVersion,
  canContribute,
  contributionDraft,
  contributionMessage,
  pendingContributions,
  contributorUsername,
  isSubmittingContribution,
  onOpenContribution,
  onChangeContributionDraft,
  onCancelContribution,
  onSubmitContribution,
  onWithdrawContribution,
}: {
  items: StoryReference[];
  bibleVersion: BibleVersion;
  canContribute: boolean;
  contributionDraft: ContributionDraft | null;
  contributionMessage: string | null;
  pendingContributions: PendingContribution[];
  contributorUsername: string;
  isSubmittingContribution: boolean;
  onOpenContribution: (params: {
    mode: CommandContributionMode;
    type: CommandContributionType;
    title: string;
    currentText?: string;
    index?: number;
    currentValue?: unknown;
  }) => void;
  onChangeContributionDraft: (draft: ContributionDraft) => void;
  onCancelContribution: () => void;
  onSubmitContribution: () => void;
  onWithdrawContribution: (contributionId: string) => void;
}) {
  const title = "Seen In Other Ancient Writings";
  const ownsDraft = contributionDraft?.type === "non_canonical_story_reference";

  return (
    <View style={{ gap: 8 }}>
      <EditableSectionTitle
        title={title}
        helpText="Examples from ancient writings outside the 66-book canon (such as Jubilees, Enoch, Meqabyan, or the wider deuterocanon) where this command is practiced, violated, enforced, or illustrated. These are historical and devotional references, not equal in authority to Torah and Tanakh."
        canContribute={canContribute}
        isOpen={ownsDraft}
        onToggle={() => {
          if (ownsDraft) {
            onCancelContribution();
            return;
          }

          onOpenContribution({
            mode: "add",
            type: "non_canonical_story_reference",
            title,
          });
        }}
      />

      {items.length === 0 ? (
        <Text style={styles.mutedText}>No extra-biblical references.</Text>
      ) : null}

      {items.map((item, index) => (
        <View
          key={`${item.reference}-${index}`}
          style={styles.storyReferenceRow}
        >
          <ScriptureReferencePill
            reference={item.reference}
            bibleVersion={bibleVersion}
          />

          <Text style={styles.storyReferenceLabel}>{item.label}</Text>

          {canContribute ? (
            <ContributionActions
              onEdit={() =>
                onOpenContribution({
                  mode: "suggest_edit",
                  type: "non_canonical_story_reference",
                  title,
                  index,
                  currentText: `${item.reference}: ${item.label}`,
                  currentValue: item,
                })
              }
              onRemove={() =>
                onOpenContribution({
                  mode: "suggest_remove",
                  type: "non_canonical_story_reference",
                  title,
                  index,
                  currentText: `${item.reference}: ${item.label}`,
                  currentValue: item,
                })
              }
            />
          ) : null}
        </View>
      ))}

      {ownsDraft && contributionDraft ? (
        <ContributionForm
          draft={contributionDraft}
          isSubmitting={isSubmittingContribution}
          onChange={onChangeContributionDraft}
          onSubmit={onSubmitContribution}
        />
      ) : null}

      {ownsDraft && contributionMessage ? (
        <Text style={styles.contributionMessage}>{contributionMessage}</Text>
      ) : null}

      <PendingContributionList
        items={pendingContributions}
        username={contributorUsername}
        onWithdraw={onWithdrawContribution}
      />
    </View>
  );
}

function RelatedTeachingList({
  items,
  onPlayTeaching,
}: {
  items: RelatedTeaching[];
  onPlayTeaching?: (teaching: RelatedTeaching) => void;
}) {
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const helpText =
    "Podcast episodes that cover the same scripture passages (or topic) as this command, matched automatically. Church of the Word covers the Bible on a yearly cycle, so more than one episode per command is expected. Tap a title to play it inline; use the arrow to open it in Spotify instead.";

  return (
    <View style={{ gap: 8 }}>
      <SectionTitle
        title="Church of the Word Teachings"
        helpText={helpText}
        isInfoOpen={isInfoOpen}
        onToggleInfo={() => setIsInfoOpen((value) => !value)}
      />

      {isInfoOpen ? (
        <Text style={styles.sectionHelpText}>{helpText}</Text>
      ) : null}

      {items.length === 0 ? (
        <Text style={styles.mutedText}>No matching teachings found yet.</Text>
      ) : (
        items.map((item) => (
          <View key={item.url} style={styles.teachingRow}>
            <MaterialIcons name="podcasts" size={16} color="#166534" />

            <Pressable
              onPress={() => onPlayTeaching?.(item)}
              disabled={!onPlayTeaching}
              style={({ pressed }) => [
                { flex: 1, gap: 2 },
                pressed && onPlayTeaching && { opacity: 0.78 },
              ]}
            >
              <Text style={styles.teachingLabel}>{item.title}</Text>
              {item.year && item.month && item.day ? (
                <Text style={styles.teachingUrl}>
                  Month {item.month}, Day {item.day} ({item.year})
                </Text>
              ) : null}
            </Pressable>

            <Pressable
              onPress={() => Linking.openURL(item.url)}
              accessibilityRole="button"
              accessibilityLabel="Open in Spotify"
              style={({ pressed }) => [
                styles.teachingExternalButton,
                pressed && { opacity: 0.78 },
              ]}
            >
              <MaterialIcons name="open-in-new" size={16} color="#166534" />
            </Pressable>
          </View>
        ))
      )}
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
  contributionType,
  helpText,
  items,
  emptyText,
  canContribute = false,
  contributionDraft,
  contributionMessage,
  pendingContributions = [],
  contributorUsername = "",
  isSubmittingContribution = false,
  onOpenContribution,
  onChangeContributionDraft,
  onCancelContribution,
  onSubmitContribution,
  onWithdrawContribution,
}: {
  title: string;
  contributionType?: CommandContributionType;
  helpText?: string;
  items: string[];
  emptyText: string;
  canContribute?: boolean;
  contributionDraft?: ContributionDraft | null;
  contributionMessage?: string | null;
  pendingContributions?: PendingContribution[];
  contributorUsername?: string;
  isSubmittingContribution?: boolean;
  onOpenContribution?: (params: {
    mode: CommandContributionMode;
    type: CommandContributionType;
    title: string;
    currentText?: string;
    index?: number;
  }) => void;
  onChangeContributionDraft?: (draft: ContributionDraft) => void;
  onCancelContribution?: () => void;
  onSubmitContribution?: () => void;
  onWithdrawContribution?: (contributionId: string) => void;
}) {
  const canEditSection =
    canContribute && Boolean(contributionType) && Boolean(onOpenContribution);
  const ownsDraft =
    Boolean(contributionType) && contributionDraft?.type === contributionType;
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  return (
    <View style={{ gap: 6 }}>
      {canEditSection ? (
        <EditableSectionTitle
          title={title}
          helpText={helpText}
          canContribute
          isOpen={ownsDraft}
          onToggle={() => {
            if (ownsDraft) {
              onCancelContribution?.();
              return;
            }

            onOpenContribution?.({
              mode: "add",
              type: contributionType!,
              title,
            });
          }}
        />
      ) : (
        <>
          <SectionTitle
            title={title}
            helpText={helpText}
            isInfoOpen={isInfoOpen}
            onToggleInfo={() => setIsInfoOpen((value) => !value)}
          />

          {isInfoOpen && helpText ? (
            <Text style={styles.sectionHelpText}>{helpText}</Text>
          ) : null}
        </>
      )}

      {items.length === 0 ? (
        <Text style={styles.mutedText}>{emptyText}</Text>
      ) : (
        items.map((item, index) => (
          <View key={`${title}-${index}`} style={styles.editableListItem}>
            <Text style={styles.listText}>
              {index + 1}. {formatKey(item)}
            </Text>

            {canEditSection ? (
              <ContributionActions
                onEdit={() =>
                  onOpenContribution?.({
                    mode: "suggest_edit",
                    type: contributionType!,
                    title,
                    index,
                    currentText: item,
                  })
                }
                onRemove={() =>
                  onOpenContribution?.({
                    mode: "suggest_remove",
                    type: contributionType!,
                    title,
                    index,
                    currentText: item,
                  })
                }
              />
            ) : null}
          </View>
        ))
      )}

      {ownsDraft &&
      contributionDraft &&
      onChangeContributionDraft &&
      onCancelContribution &&
      onSubmitContribution ? (
        <ContributionForm
          draft={contributionDraft}
          isSubmitting={isSubmittingContribution}
          onChange={onChangeContributionDraft}
          onSubmit={onSubmitContribution}
        />
      ) : null}

      {ownsDraft && contributionMessage ? (
        <Text style={styles.contributionMessage}>{contributionMessage}</Text>
      ) : null}

      {onWithdrawContribution ? (
        <PendingContributionList
          items={pendingContributions}
          username={contributorUsername}
          onWithdraw={onWithdrawContribution}
        />
      ) : null}
    </View>
  );
}

function SectionTitle({
  title,
  helpText,
  isInfoOpen,
  onToggleInfo,
}: {
  title: string;
  helpText?: string;
  isInfoOpen?: boolean;
  onToggleInfo?: () => void;
}) {
  return (
    <View style={styles.sectionTitleBlock}>
      <View style={styles.sectionTitleMarker} />
      <Text style={styles.sectionTitle}>{title}</Text>

      {helpText ? (
        <Pressable
          onPress={onToggleInfo}
          hitSlop={6}
          accessibilityRole="button"
          accessibilityLabel={isInfoOpen ? "Hide section info" : "Show section info"}
        >
          <MaterialIcons
            name="info-outline"
            size={16}
            color={isInfoOpen ? "#0f766e" : "#94a3b8"}
          />
        </Pressable>
      ) : null}
    </View>
  );
}

function SectionDock({
  title,
  icon,
  subtitle,
  isOpen,
  badgeCount,
  concernCount = 0,
  onToggle,
  children,
}: {
  title: string;
  icon: keyof typeof MaterialIcons.glyphMap;
  subtitle: string;
  isOpen: boolean;
  badgeCount: number;
  concernCount?: number;
  onToggle: () => void;
  children: ReactNode;
}) {
  return (
    <View style={styles.communityReviewDock}>
      <View style={styles.communityReviewDrawer}>
        <Pressable
          onPress={onToggle}
          accessibilityRole="button"
          accessibilityLabel={
            isOpen ? `Hide ${title.toLowerCase()} tools` : `Show ${title.toLowerCase()} tools`
          }
          style={({ pressed }) => [
            styles.communityReviewTab,
            isOpen && styles.communityReviewTabOpen,
            pressed && { opacity: 0.78 },
          ]}
        >
          <MaterialIcons
            name={isOpen ? "close" : icon}
            size={20}
            color={isOpen ? "#ffffff" : "#0f766e"}
          />
          <Text
            style={[
              styles.communityReviewTabText,
              isOpen && styles.communityReviewTabTextOpen,
            ]}
          >
            {title}
          </Text>
          {badgeCount > 0 ? (
            <Text
              style={[
                styles.communityReviewTabCount,
                isOpen && styles.communityReviewTabCountOpen,
              ]}
            >
              {Math.min(badgeCount, 99)}
            </Text>
          ) : null}
          {concernCount > 0 ? (
            <Text
              style={[
                styles.communityReviewTabCount,
                styles.communityReviewConcernPill,
                isOpen && styles.communityReviewTabCountOpen,
              ]}
            >
              !{Math.min(concernCount, 99)}
            </Text>
          ) : null}
          <MaterialIcons
            name={isOpen ? "keyboard-arrow-up" : "keyboard-arrow-down"}
            size={22}
            color={isOpen ? "#ffffff" : "#0f766e"}
          />
        </Pressable>

        {isOpen ? (
          <View style={styles.communityReviewSection}>
            <View style={styles.communityReviewTitleGroup}>
              <Text style={styles.communityReviewEyebrow}>{title}</Text>
              <Text style={styles.communityReviewTitle}>{subtitle}</Text>
            </View>

            <View style={styles.communityReviewBody}>{children}</View>
          </View>
        ) : null}
      </View>
    </View>
  );
}

function VoteTasksPanel({
  contribution,
  currentIndex,
  totalCount,
  username,
  canModerate,
  message,
  voteDraft,
  isSubmittingVote,
  onPrevious,
  onNext,
  onOpenCommand,
  onOpenVote,
  onChangeVoteDraft,
  onCloseVote,
  onSubmitVote,
  onResolveConcern,
}: {
  contribution: PendingContribution | null;
  currentIndex: number;
  totalCount: number;
  username: string;
  canModerate: boolean;
  message: string | null;
  voteDraft: {
    contribution: PendingContribution;
    type: "support" | "concern";
    reason: string;
  } | null;
  isSubmittingVote: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onOpenCommand: (commandKey: string) => void;
  onOpenVote: (
    contribution: PendingContribution,
    type: "support" | "concern"
  ) => void;
  onChangeVoteDraft: (
    draft: {
      contribution: PendingContribution;
      type: "support" | "concern";
      reason: string;
    } | null
  ) => void;
  onCloseVote: () => void;
  onSubmitVote: () => void;
  onResolveConcern: (contributionId: string, voteId: string) => void;
}) {
  const normalizedUsername = normalizeContributorUsername(username);
  const existingVote = contribution?.votes?.find(
    (vote) => vote.createdBy === normalizedUsername && !vote.resolvedAt
  );

  return (
    <View style={styles.voteTasksPanel}>
      <View style={styles.voteTasksBody}>
        {!contribution ? (
          <Text style={styles.mutedText}>
            No pending suggestions to vote on.
          </Text>
        ) : (
          <>
            <View style={styles.adminReviewHeader}>
              <Text style={styles.adminReviewMeta}>
                {currentIndex + 1} of {totalCount} -{" "}
                {formatKey(contribution.commandKey)}
              </Text>

              <View style={styles.adminReviewStepControls}>
                <Pressable
                  onPress={onPrevious}
                  disabled={currentIndex <= 0}
                  style={({ pressed }) => [
                    styles.adminReviewIconButton,
                    currentIndex <= 0 && { opacity: 0.38 },
                    pressed && { opacity: 0.78 },
                  ]}
                >
                  <Text style={styles.adminReviewIconText}>‹</Text>
                </Pressable>

                <Pressable
                  onPress={onNext}
                  disabled={currentIndex >= totalCount - 1}
                  style={({ pressed }) => [
                    styles.adminReviewIconButton,
                    currentIndex >= totalCount - 1 && { opacity: 0.38 },
                    pressed && { opacity: 0.78 },
                  ]}
                >
                  <Text style={styles.adminReviewIconText}>›</Text>
                </Pressable>
              </View>
            </View>

            <ContributionReviewCard contribution={contribution} />

            <VoteBreakdown
              contribution={contribution}
              canModerate={canModerate}
              onResolveConcern={onResolveConcern}
            />

            {existingVote ? (
              <Text style={styles.voteExistingText}>
                Your current vote:{" "}
                {existingVote.type === "support" ? "support" : "concern"}
              </Text>
            ) : null}

            <View style={styles.adminReviewActions}>
              <Pressable
                onPress={() => onOpenCommand(contribution.commandKey)}
                style={({ pressed }) => [
                  styles.adminReviewSecondaryButton,
                  pressed && { opacity: 0.78 },
                ]}
              >
                <Text style={styles.adminReviewSecondaryText}>
                  Open Command
                </Text>
              </Pressable>

              <Pressable
                onPress={() => onOpenVote(contribution, "concern")}
                style={({ pressed }) => [
                  styles.voteConcernButton,
                  pressed && { opacity: 0.78 },
                ]}
              >
                <Text style={styles.adminReviewActionText}>! Concern</Text>
              </Pressable>

              <Pressable
                onPress={() => onOpenVote(contribution, "support")}
                style={({ pressed }) => [
                  styles.adminReviewApproveButton,
                  pressed && { opacity: 0.78 },
                ]}
              >
                <Text style={styles.adminReviewActionText}>+ Support</Text>
              </Pressable>
            </View>
          </>
        )}

        {message ? (
          <Text style={styles.contributionMessage}>{message}</Text>
        ) : null}
      </View>

      <VoteModal
        draft={voteDraft}
        isSubmitting={isSubmittingVote}
        onChange={onChangeVoteDraft}
        onClose={onCloseVote}
        onSubmit={onSubmitVote}
      />
    </View>
  );
}

function AdminReviewPanel({
  contribution,
  reviewMode,
  currentIndex,
  totalCount,
  onChangeReviewMode,
  onPrevious,
  onNext,
  onOpenCommand,
  onApprove,
  onReject,
  onPromote,
  onResolveConcern,
}: {
  contribution: PendingContribution | null;
  reviewMode: "pending" | "approved";
  currentIndex: number;
  totalCount: number;
  onChangeReviewMode: (mode: "pending" | "approved") => void;
  onPrevious: () => void;
  onNext: () => void;
  onOpenCommand: (commandKey: string) => void;
  onApprove: (contributionId: string) => void;
  onReject: (contributionId: string) => void;
  onPromote: (contributionId: string, official: PromotionDraft) => void;
  onResolveConcern: (contributionId: string, voteId: string) => void;
}) {
  const [draft, setDraft] = useState<PromotionDraft>(
    createEmptyPromotionDraft()
  );
  const isRemovalSuggestion = contribution?.mode === "suggest_remove";
  const unresolvedConcernCount =
    getContributionVoteCounts(contribution).concern;

  useEffect(() => {
    setDraft(createPromotionDraft(contribution));
  }, [contribution?.id]);

  if (!contribution) {
    return (
      <View style={styles.adminReviewPanel}>
        <AdminReviewModeToggle
          reviewMode={reviewMode}
          onChangeReviewMode={onChangeReviewMode}
        />
        <Text style={styles.mutedText}>
          {reviewMode === "pending"
            ? "No pending command suggestions."
            : "No approved contributions waiting for promotion."}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.adminReviewPanel}>
      <View style={styles.adminReviewHeader}>
        <View style={{ flex: 1 }}>
          <AdminReviewModeToggle
            reviewMode={reviewMode}
            onChangeReviewMode={onChangeReviewMode}
          />
          <Text style={styles.adminReviewMeta}>
            {currentIndex + 1} of {totalCount} -{" "}
            {formatKey(contribution.commandKey)}
          </Text>
        </View>

        <View style={styles.adminReviewStepControls}>
          <Pressable
            onPress={onPrevious}
            disabled={currentIndex <= 0}
            style={({ pressed }) => [
              styles.adminReviewIconButton,
              currentIndex <= 0 && { opacity: 0.38 },
              pressed && { opacity: 0.78 },
            ]}
          >
            <Text style={styles.adminReviewIconText}>‹</Text>
          </Pressable>

          <Pressable
            onPress={onNext}
            disabled={currentIndex >= totalCount - 1}
            style={({ pressed }) => [
              styles.adminReviewIconButton,
              currentIndex >= totalCount - 1 && { opacity: 0.38 },
              pressed && { opacity: 0.78 },
            ]}
          >
            <Text style={styles.adminReviewIconText}>›</Text>
          </Pressable>
        </View>
      </View>

      <ContributionReviewCard contribution={contribution} />

      <VoteBreakdown
        contribution={contribution}
        canModerate
        onResolveConcern={onResolveConcern}
      />

      {reviewMode === "approved" && !isRemovalSuggestion ? (
        <PromotionForm
          contribution={contribution}
          draft={draft}
          onChange={setDraft}
          onPromote={() => onPromote(contribution.id, draft)}
        />
      ) : null}

      <View style={styles.adminReviewActions}>
        <Pressable
          onPress={() => onOpenCommand(contribution.commandKey)}
          style={({ pressed }) => [
            styles.adminReviewSecondaryButton,
            pressed && { opacity: 0.78 },
          ]}
        >
          <Text style={styles.adminReviewSecondaryText}>Open Command</Text>
        </Pressable>

        {reviewMode === "pending" ? (
          <>
            <Pressable
              onPress={() => onReject(contribution.id)}
              style={({ pressed }) => [
                styles.adminReviewRejectButton,
                pressed && { opacity: 0.78 },
              ]}
            >
              <Text style={styles.adminReviewActionText}>Reject</Text>
            </Pressable>

            <Pressable
              onPress={() => onApprove(contribution.id)}
              disabled={unresolvedConcernCount > 0}
              style={({ pressed }) => [
                styles.adminReviewApproveButton,
                unresolvedConcernCount > 0 && { opacity: 0.42 },
                pressed && { opacity: 0.78 },
              ]}
            >
              <Text style={styles.adminReviewActionText}>
                {isRemovalSuggestion ? "Approve Removal" : "Approve"}
              </Text>
            </Pressable>
          </>
        ) : (
          <Pressable
            onPress={() => onPromote(contribution.id, draft)}
            style={({ pressed }) => [
              styles.adminReviewApproveButton,
              pressed && { opacity: 0.78 },
            ]}
          >
            <Text style={styles.adminReviewActionText}>
              {isRemovalSuggestion ? "Confirm Removal" : "Promote"}
            </Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}

function AdminReviewModeToggle({
  reviewMode,
  onChangeReviewMode,
}: {
  reviewMode: "pending" | "approved";
  onChangeReviewMode: (mode: "pending" | "approved") => void;
}) {
  return (
    <View style={styles.adminReviewModeRow}>
      {(["pending", "approved"] as const).map((mode) => {
        const isActive = mode === reviewMode;

        return (
          <Pressable
            key={mode}
            onPress={() => onChangeReviewMode(mode)}
            style={({ pressed }) => [
              styles.adminReviewModeButton,
              isActive && styles.adminReviewModeButtonActive,
              pressed && { opacity: 0.78 },
            ]}
          >
            <Text
              style={[
                styles.adminReviewModeText,
                isActive && styles.adminReviewModeTextActive,
              ]}
            >
              {mode === "pending" ? "Review" : "Promote"}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

function ContributionReviewCard({
  contribution,
}: {
  contribution: PendingContribution;
}) {
  return (
    <View style={styles.adminReviewBody}>
      <Text style={styles.pendingContributionBadge}>Under review</Text>
      <Text style={styles.pendingContributionTitle}>
        {formatContributionMode(contribution.mode)} -{" "}
        {formatKey(contribution.type)}
      </Text>
      {contribution.createdBy ? (
        <Text style={styles.pendingContributionByline}>
          @{contribution.createdBy}
        </Text>
      ) : null}
      {contribution.target?.currentText ? (
        <View style={styles.contributionTargetBlock}>
          <Text style={styles.contributionTargetLabel}>Current</Text>
          <Text style={styles.contributionTargetText}>
            {contribution.target.currentText}
          </Text>
        </View>
      ) : null}
      <Text style={styles.pendingContributionText}>
        {contribution.suggestedText ?? contribution.text}
      </Text>
      {contribution.reason ? (
        <Text style={styles.pendingContributionReason}>
          {contribution.reason}
        </Text>
      ) : null}
    </View>
  );
}

function VoteBreakdown({
  contribution,
  canModerate,
  onResolveConcern,
}: {
  contribution: PendingContribution;
  canModerate: boolean;
  onResolveConcern: (contributionId: string, voteId: string) => void;
}) {
  const counts = getContributionVoteCounts(contribution);
  const concerns = (contribution.votes ?? []).filter(
    (vote) => vote.type === "concern" && !vote.resolvedAt
  );

  return (
    <View style={styles.voteBreakdown}>
      <View style={styles.voteSummaryRow}>
        <Text style={styles.voteSummaryText}>+{counts.support} support</Text>
        <Text style={styles.voteConcernText}>!{counts.concern} concern</Text>
      </View>

      {concerns.length > 0 ? (
        <View style={styles.voteConcernList}>
          {concerns.map((vote) => (
            <View key={vote.id} style={styles.voteConcernItem}>
              <Text style={styles.pendingContributionByline}>
                @{vote.createdBy}
              </Text>
              {vote.reason ? (
                <Text style={styles.pendingContributionReason}>
                  {vote.reason}
                </Text>
              ) : null}
              {canModerate ? (
                <Pressable
                  onPress={() => onResolveConcern(contribution.id, vote.id)}
                  style={({ pressed }) => [
                    styles.pendingContributionWithdrawButton,
                    pressed && { opacity: 0.78 },
                  ]}
                >
                  <Text style={styles.pendingContributionWithdrawText}>
                    Resolve Concern
                  </Text>
                </Pressable>
              ) : null}
            </View>
          ))}
        </View>
      ) : null}
    </View>
  );
}

function VoteModal({
  draft,
  isSubmitting,
  onChange,
  onClose,
  onSubmit,
}: {
  draft: {
    contribution: PendingContribution;
    type: "support" | "concern";
    reason: string;
  } | null;
  isSubmitting: boolean;
  onChange: (
    draft: {
      contribution: PendingContribution;
      type: "support" | "concern";
      reason: string;
    } | null
  ) => void;
  onClose: () => void;
  onSubmit: () => void;
}) {
  return (
    <Modal visible={Boolean(draft)} transparent animationType="fade">
      <View style={styles.voteModalBackdrop}>
        <View style={styles.voteModalCard}>
          <Text style={styles.voteModalTitle}>Community Review</Text>
          <Text style={styles.voteModalText}>
            Your vote helps the group decide whether this suggestion is ready.
          </Text>

          <View style={styles.voteModalChoiceRow}>
            <Pressable
              onPress={() =>
                draft && onChange({ ...draft, type: "support", reason: "" })
              }
              style={[
                styles.voteModalChoice,
                draft?.type === "support" && styles.voteModalChoiceActive,
              ]}
            >
              <Text style={styles.voteModalChoiceText}>+ Support</Text>
              <Text style={styles.voteModalChoiceHelp}>
                This looks helpful and ready.
              </Text>
            </Pressable>

            <Pressable
              onPress={() => draft && onChange({ ...draft, type: "concern" })}
              style={[
                styles.voteModalChoice,
                draft?.type === "concern" && styles.voteModalConcernActive,
              ]}
            >
              <Text style={styles.voteModalChoiceText}>! Concern</Text>
              <Text style={styles.voteModalChoiceHelp}>
                Something should be checked first.
              </Text>
            </Pressable>
          </View>

          {draft?.type === "concern" ? (
            <TextInput
              value={draft.reason}
              onChangeText={(reason) => onChange({ ...draft, reason })}
              placeholder="What should be checked?"
              placeholderTextColor="#94a3b8"
              multiline
              style={[styles.contributionInput, styles.contributionReasonInput]}
            />
          ) : null}

          <View style={styles.adminReviewActions}>
            <Pressable
              onPress={onClose}
              style={({ pressed }) => [
                styles.adminReviewSecondaryButton,
                pressed && { opacity: 0.78 },
              ]}
            >
              <Text style={styles.adminReviewSecondaryText}>Cancel</Text>
            </Pressable>

            <Pressable
              onPress={onSubmit}
              disabled={isSubmitting}
              style={({ pressed }) => [
                styles.adminReviewApproveButton,
                isSubmitting && { opacity: 0.65 },
                pressed && { opacity: 0.78 },
              ]}
            >
              <Text style={styles.adminReviewActionText}>
                {isSubmitting ? "Saving..." : "Submit Vote"}
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

function PromotionForm({
  contribution,
  draft,
  onChange,
  onPromote,
}: {
  contribution: PendingContribution;
  draft: PromotionDraft;
  onChange: (draft: PromotionDraft) => void;
  onPromote: () => void;
}) {
  if (contribution.type === "source_term") {
    return (
      <View style={styles.promotionForm}>
        <Text style={styles.promotionFormTitle}>Official Source Term</Text>
        <View style={styles.promotionFieldRow}>
          <TextInput
            value={draft.language}
            onChangeText={(language) =>
              onChange({ ...draft, language: language.toLowerCase() })
            }
            placeholder="language"
            placeholderTextColor="#94a3b8"
            autoCapitalize="none"
            style={styles.promotionInput}
          />
          <TextInput
            value={draft.term}
            onChangeText={(term) => onChange({ ...draft, term })}
            placeholder="term"
            placeholderTextColor="#94a3b8"
            autoCapitalize="none"
            style={styles.promotionInput}
          />
        </View>
        <TextInput
          value={draft.gloss}
          onChangeText={(gloss) => onChange({ ...draft, gloss })}
          placeholder="gloss"
          placeholderTextColor="#94a3b8"
          multiline
          style={[styles.promotionInput, styles.promotionTextArea]}
        />
      </View>
    );
  }

  if (
    contribution.type === "story_reference" ||
    contribution.type === "non_canonical_story_reference"
  ) {
    return (
      <View style={styles.promotionForm}>
        <Text style={styles.promotionFormTitle}>
          {contribution.type === "story_reference"
            ? "Official Scripture Example"
            : "Official Extra-Biblical Example"}
        </Text>
        <TextInput
          value={draft.reference}
          onChangeText={(reference) => onChange({ ...draft, reference })}
          placeholder="reference"
          placeholderTextColor="#94a3b8"
          autoCapitalize="none"
          style={styles.promotionInput}
        />
        <TextInput
          value={draft.label}
          onChangeText={(label) => onChange({ ...draft, label })}
          placeholder="short label"
          placeholderTextColor="#94a3b8"
          multiline
          style={[styles.promotionInput, styles.promotionTextArea]}
        />
      </View>
    );
  }

  const field = getPromotionTextField(contribution.type);

  return (
    <View style={styles.promotionForm}>
      <Text style={styles.promotionFormTitle}>Official Prolog Entry</Text>
      <TextInput
        value={draft[field]}
        onChangeText={(value) => onChange({ ...draft, [field]: value })}
        placeholder="official wording"
        placeholderTextColor="#94a3b8"
        multiline
        style={[styles.promotionInput, styles.promotionTextArea]}
      />
    </View>
  );
}

function EditableSectionTitle({
  title,
  helpText,
  canContribute,
  isOpen,
  onToggle,
}: {
  title: string;
  helpText?: string;
  canContribute: boolean;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  return (
    <View style={{ gap: 6 }}>
      <View style={styles.sectionTitleRow}>
        <SectionTitle
          title={title}
          helpText={helpText}
          isInfoOpen={isInfoOpen}
          onToggleInfo={() => setIsInfoOpen((value) => !value)}
        />

        {canContribute ? (
          <Pressable
            onPress={onToggle}
            style={({ pressed }) => [
              styles.contributionSmallButton,
              isOpen && styles.contributionSmallButtonOpen,
              pressed && { opacity: 0.78 },
            ]}
          >
            <Text style={styles.contributionSmallButtonText}>
              {isOpen ? "-" : "+"}
            </Text>
          </Pressable>
        ) : null}
      </View>

      {isInfoOpen && helpText ? (
        <Text style={styles.sectionHelpText}>{helpText}</Text>
      ) : null}
    </View>
  );
}

function ContributionActions({
  onEdit,
  onRemove,
}: {
  onEdit: () => void;
  onRemove: () => void;
}) {
  return (
    <View style={styles.contributionActions}>
      <Pressable
        onPress={onEdit}
        style={({ pressed }) => [
          styles.contributionActionButton,
          pressed && { opacity: 0.78 },
        ]}
      >
        <Text style={styles.contributionActionText}>Suggest edit</Text>
      </Pressable>

      <Pressable
        onPress={onRemove}
        style={({ pressed }) => [
          styles.contributionActionButton,
          pressed && { opacity: 0.78 },
        ]}
      >
        <Text style={styles.contributionActionText}>Suggest remove</Text>
      </Pressable>
    </View>
  );
}

function ContributionForm({
  draft,
  isSubmitting,
  onChange,
  onSubmit,
}: {
  draft: ContributionDraft;
  isSubmitting: boolean;
  onChange: (draft: ContributionDraft) => void;
  onSubmit: () => void;
}) {
  const label =
    draft.mode === "add"
      ? `Add ${draft.title}`
      : draft.mode === "suggest_edit"
        ? `Suggest Edit - ${draft.title}`
        : `Suggest Remove - ${draft.title}`;
  const guidance = getContributionTypeGuidance(draft.type);

  return (
    <View style={styles.contributionForm}>
      <Text style={styles.contributionFormTitle}>{label}</Text>
      <Text style={styles.contributionGuidance}>{guidance}</Text>

      {draft.target?.currentText ? (
        <View style={styles.contributionTargetBlock}>
          <Text style={styles.contributionTargetLabel}>Current</Text>
          <Text style={styles.contributionTargetText}>
            {draft.target.currentText}
          </Text>
        </View>
      ) : null}

      {draft.mode !== "suggest_remove" ? (
        <TextInput
          value={draft.text}
          onChangeText={(text) => onChange({ ...draft, text })}
          placeholder={
            draft.type === "story_reference" ||
            draft.type === "non_canonical_story_reference"
              ? "Reference: short label"
              : draft.mode === "add"
                ? "Add the new information"
                : "Enter the suggested wording"
          }
          placeholderTextColor="#94a3b8"
          multiline
          style={styles.contributionInput}
        />
      ) : null}

      <TextInput
        value={draft.reason}
        onChangeText={(reason) => onChange({ ...draft, reason })}
        placeholder="Reason or note for reviewers"
        placeholderTextColor="#94a3b8"
        multiline
        style={[styles.contributionInput, styles.contributionReasonInput]}
      />

      <View style={styles.contributionFormActions}>
        <Pressable
          onPress={onSubmit}
          disabled={isSubmitting}
          style={({ pressed }) => [
            styles.contributionSubmitButton,
            isSubmitting && { opacity: 0.65 },
            pressed && { opacity: 0.82 },
          ]}
        >
          <Text style={styles.contributionSubmitText}>
            {isSubmitting ? "Saving..." : "Submit"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

function PendingContributionList({
  items,
  username,
  onWithdraw,
}: {
  items: PendingContribution[];
  username: string;
  onWithdraw: (contributionId: string) => void;
}) {
  if (items.length === 0) return null;

  const normalizedUsername = normalizeContributorUsername(username);

  return (
    <View style={styles.pendingContributionBlock}>
      <SectionTitle title="Under Review" />

      {items.map((item) => (
        <View key={item.id} style={styles.pendingContributionItem}>
          <Text style={styles.pendingContributionBadge}>Under review</Text>
          <Text style={styles.pendingContributionTitle}>
            {formatContributionMode(item.mode)} - {formatKey(item.type)}
          </Text>
          {item.createdBy ? (
            <Text style={styles.pendingContributionByline}>
              @{item.createdBy}
            </Text>
          ) : null}
          <Text style={styles.pendingContributionText}>
            {item.suggestedText ?? item.text}
          </Text>
          {item.reason ? (
            <Text style={styles.pendingContributionReason}>{item.reason}</Text>
          ) : null}
          {item.createdBy === normalizedUsername ? (
            <Pressable
              onPress={() => onWithdraw(item.id)}
              style={({ pressed }) => [
                styles.pendingContributionWithdrawButton,
                pressed && { opacity: 0.78 },
              ]}
            >
              <Text style={styles.pendingContributionWithdrawText}>
                Withdraw
              </Text>
            </Pressable>
          ) : null}
        </View>
      ))}
    </View>
  );
}

function splitCommandTitle(title: string): {
  reference: string | null;
  description: string;
} {
  const match = title.match(
    /^((?:Gen|Exod|Exo|Lev|Num|Deut|Deu|Genesis|Exodus|Leviticus|Numbers|Deuteronomy)\.?\s+\d+(?::\d+(?:-\d+)?)?)\s*[-:]\s*(.+)$/i
  );

  if (match) {
    return { reference: match[1], description: match[2] };
  }

  return { reference: null, description: title };
}

function formatCommandTitle(title: string, references: string[]) {
  const matchingReference = references.find((reference) =>
    title.toLowerCase().startsWith(reference.toLowerCase())
  );

  if (matchingReference) {
    return title.slice(matchingReference.length).replace(/^\s*[-:]\s*/, "");
  }

  return title.replace(
    /^(Gen|Exod|Exo|Lev|Num|Deut|Deu|Genesis|Exodus|Leviticus|Numbers|Deuteronomy)\.?\s+\d+(?::\d+(?:-\d+)?)?\s*[-:]\s*/i,
    ""
  );
}

function getBlueLetterBibleUrl(reference: string, bibleVersion: BibleVersion) {
  const parsed = parseScriptureReference(reference);
  if (!parsed) return null;

  return `https://www.blueletterbible.org/${bibleVersion.toLowerCase()}/${parsed.book}/${parsed.chapter}/${parsed.verse}/`;
}

function parseScriptureReference(reference: string) {
  const normalizedReference = reference.trim().replace(/\s+/g, " ");
  const match = normalizedReference.match(/^(.+?)\s+(\d+)(?::(\d+))?/);
  if (!match) return null;

  const book = getBlueLetterBibleBookSlug(match[1]);
  if (!book) return null;

  return {
    book,
    chapter: match[2],
    verse: match[3] ?? "1",
  };
}

function getBlueLetterBibleBookSlug(book: string) {
  const key = book.toLowerCase().replace(/\./g, "").trim();

  const bookSlugs: Record<string, string> = {
    gen: "gen",
    genesis: "gen",
    ex: "exo",
    exod: "exo",
    exo: "exo",
    exodus: "exo",
    lev: "lev",
    leviticus: "lev",
    num: "num",
    numbers: "num",
    deut: "deu",
    deu: "deu",
    deuteronomy: "deu",
    jos: "jos",
    josh: "jos",
    joshua: "jos",
    jdg: "jdg",
    judg: "jdg",
    judges: "jdg",
    ruth: "rut",
    rut: "rut",
    "1 samuel": "1sa",
    "1 sam": "1sa",
    "1sa": "1sa",
    "2 samuel": "2sa",
    "2 sam": "2sa",
    "2sa": "2sa",
    "1 kings": "1ki",
    "1 kgs": "1ki",
    "1ki": "1ki",
    "2 kings": "2ki",
    "2 kgs": "2ki",
    "2ki": "2ki",
    "1 chronicles": "1ch",
    "1 chron": "1ch",
    "1 chr": "1ch",
    "1ch": "1ch",
    "2 chronicles": "2ch",
    "2 chron": "2ch",
    "2 chr": "2ch",
    "2ch": "2ch",
    ezra: "ezr",
    ezr: "ezr",
    nehemiah: "neh",
    neh: "neh",
    esther: "est",
    est: "est",
    job: "job",
    psalm: "psa",
    psalms: "psa",
    psa: "psa",
    proverb: "pro",
    proverbs: "pro",
    prov: "pro",
    pro: "pro",
    ecclesiastes: "ecc",
    eccles: "ecc",
    ecc: "ecc",
    "song of solomon": "sng",
    "song of songs": "sng",
    song: "sng",
    sng: "sng",
    isaiah: "isa",
    isa: "isa",
    jeremiah: "jer",
    jer: "jer",
    lamentations: "lam",
    lam: "lam",
    ezekiel: "eze",
    ezek: "eze",
    eze: "eze",
    daniel: "dan",
    dan: "dan",
    hosea: "hos",
    hos: "hos",
    joel: "joe",
    joe: "joe",
    amos: "amo",
    amo: "amo",
    obadiah: "oba",
    obad: "oba",
    oba: "oba",
    jonah: "jon",
    jon: "jon",
    micah: "mic",
    mic: "mic",
    nahum: "nah",
    nah: "nah",
    habakkuk: "hab",
    hab: "hab",
    zephaniah: "zep",
    zeph: "zep",
    zep: "zep",
    haggai: "hag",
    hag: "hag",
    zechariah: "zec",
    zech: "zec",
    zec: "zec",
    malachi: "mal",
    mal: "mal",
    matthew: "mat",
    matt: "mat",
    mat: "mat",
    mark: "mrk",
    mrk: "mrk",
    luke: "luk",
    luk: "luk",
    john: "jhn",
    jhn: "jhn",
    jn: "jhn",
    acts: "act",
    act: "act",
    romans: "rom",
    rom: "rom",
    "1 corinthians": "1co",
    "1 cor": "1co",
    "1co": "1co",
    "2 corinthians": "2co",
    "2 cor": "2co",
    "2co": "2co",
    galatians: "gal",
    gal: "gal",
    ephesians: "eph",
    eph: "eph",
    philippians: "php",
    phil: "php",
    php: "php",
    colossians: "col",
    col: "col",
    "1 thessalonians": "1th",
    "1 thess": "1th",
    "1th": "1th",
    "2 thessalonians": "2th",
    "2 thess": "2th",
    "2th": "2th",
    "1 timothy": "1ti",
    "1 tim": "1ti",
    "1ti": "1ti",
    "2 timothy": "2ti",
    "2 tim": "2ti",
    "2ti": "2ti",
    titus: "tit",
    tit: "tit",
    philemon: "phm",
    phm: "phm",
    hebrews: "heb",
    heb: "heb",
    james: "jas",
    jas: "jas",
    "1 peter": "1pe",
    "1 pet": "1pe",
    "1pe": "1pe",
    "2 peter": "2pe",
    "2 pet": "2pe",
    "2pe": "2pe",
    "1 john": "1jn",
    "1jn": "1jn",
    "2 john": "2jn",
    "2jn": "2jn",
    "3 john": "3jn",
    "3jn": "3jn",
    jude: "jud",
    jud: "jud",
    revelation: "rev",
    rev: "rev",
  };

  return bookSlugs[key] ?? null;
}

function formatKey(value: string) {
  return value.replace(/_/g, " ");
}

function formatContributionMode(mode: CommandContributionMode) {
  if (mode === "suggest_edit") return "Suggest edit";
  if (mode === "suggest_remove") return "Suggest remove";
  return "Add";
}

function getContributionTypeGuidance(type: CommandContributionType) {
  const guidance: Record<CommandContributionType, string> = {
    requirement:
      "Obedience requirements describe what must be true, available, or in place to properly obey this command.",
    study_note:
      "Study notes add Torah context, cross-reference awareness, or practical framing without adding man-made rules.",
    story_reference:
      "Seen in Scripture references point to places where the command is practiced, violated, enforced, or illustrated in the biblical text.",
    non_canonical_story_reference:
      "Seen in other ancient writings references point to places outside the 66-book canon (Jubilees, Enoch, Meqabyan, the wider deuterocanon, etc.) where the command is practiced, violated, enforced, or illustrated. These carry historical/devotional weight, not scriptural authority.",
    source_term:
      "Source terms capture original-language words, such as Hebrew, Aramaic, or Greek, and how they affect understanding.",
    translation_note:
      "Translation notes explain wording differences, ambiguity, or translation choices that affect how the passage is read.",
    clarification_note:
      "Clarification names a focused correction, boundary, or distinction that helps prevent misunderstanding.",
  };

  return guidance[type];
}

function createEmptyPromotionDraft(): PromotionDraft {
  return {
    language: "hebrew",
    term: "",
    gloss: "",
    reference: "",
    label: "",
    requirementText: "",
    studyNote: "",
    translationNote: "",
    clarificationNote: "",
  };
}

function createPromotionDraft(
  contribution: PendingContribution | null
): PromotionDraft {
  const draft = createEmptyPromotionDraft();

  if (!contribution) return draft;

  const text = contribution.suggestedText ?? contribution.text;

  if (contribution.type === "source_term") {
    const [term, ...glossParts] = text.split(/\s+-\s+/);

    return {
      ...draft,
      term: term?.trim() ?? "",
      gloss: glossParts.join(" - ").trim() || text,
    };
  }

  if (
    contribution.type === "story_reference" ||
    contribution.type === "non_canonical_story_reference"
  ) {
    const [reference, ...labelParts] = text.split(/\s*:\s+/);

    return {
      ...draft,
      reference: reference?.trim() ?? "",
      label: labelParts.join(": ").trim() || text,
    };
  }

  return {
    ...draft,
    [getPromotionTextField(contribution.type)]: text,
  };
}

function getPromotionTextField(
  type: Exclude<
    CommandContributionType,
    "source_term" | "story_reference" | "non_canonical_story_reference"
  >
) {
  const fields: Record<
    Exclude<
      CommandContributionType,
      "source_term" | "story_reference" | "non_canonical_story_reference"
    >,
    keyof PromotionDraft
  > = {
    requirement: "requirementText",
    study_note: "studyNote",
    translation_note: "translationNote",
    clarification_note: "clarificationNote",
  };

  return fields[type];
}

function getContributionVoteCounts(contribution: PendingContribution | null) {
  const activeVotes = (contribution?.votes ?? []).filter(
    (vote) => !vote.resolvedAt
  );

  return {
    support: activeVotes.filter((vote) => vote.type === "support").length,
    concern: activeVotes.filter((vote) => vote.type === "concern").length,
  };
}

function normalizeContributorUsername(username: string) {
  const normalized = username.trim().toLowerCase();

  if (!/^[a-z0-9_-]{2,32}$/.test(normalized)) {
    return "";
  }

  return normalized;
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
  listPaneContent: {
    gap: 10,
    paddingBottom: 10,
  },
  listPaneSplit: {
    flex: 0.42,
    minWidth: 250,
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  mobileInlineHint: {
    paddingHorizontal: 4,
    fontSize: 12,
    lineHeight: 17,
    fontWeight: "700" as const,
    color: "#64748b",
  },
  detailPanel: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: "#fffdf2",
    borderWidth: 1,
    borderColor: "#f3e6b3",
  },
  detailPaneContent: {
    paddingBottom: 4,
  },
  detailPaneContentSplit: {
    paddingRight: 14,
  },
  detailPaneScroll: {
    marginRight: -11,
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
  filterMenuContainer: {
    marginBottom: 10,
  },
  filterMenuToggle: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
    justifyContent: "center" as const,
    gap: 6,
    height: 38,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#cbd5e1",
    backgroundColor: "#f8fafc",
  },
  filterMenuToggleText: {
    fontSize: 13,
    fontWeight: "800" as const,
    color: "#334155",
  },
  filterMenuPanel: {
    marginTop: 8,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    backgroundColor: "#ffffff",
    gap: 8,
  },
  filterMenuHelpText: {
    fontSize: 12,
    color: "#64748b",
  },
  filterMenuMatchCountText: {
    fontSize: 12,
    fontWeight: "700" as const,
    color: "#075985",
  },
  filterMenuMatchCountInlineText: {
    fontSize: 12,
    fontWeight: "700" as const,
    color: "#075985",
  },
  filterMenuChipRow: {
    flexDirection: "row" as const,
    flexWrap: "wrap" as const,
    gap: 8,
  },
  filterChip: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
  },
  filterChipNeutral: {
    backgroundColor: "#f1f5f9",
    borderColor: "#cbd5e1",
  },
  filterChipOn: {
    backgroundColor: "#dcfce7",
    borderColor: "#16a34a",
  },
  filterChipOff: {
    backgroundColor: "#fee2e2",
    borderColor: "#dc2626",
  },
  filterChipMarker: {
    fontSize: 12,
    fontWeight: "900" as const,
    color: "#1e293b",
  },
  filterChipLabel: {
    fontSize: 12,
    fontWeight: "700" as const,
    color: "#1e293b",
  },
  filterClearButton: {
    alignSelf: "flex-start" as const,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  filterClearButtonText: {
    fontSize: 12,
    fontWeight: "700" as const,
    color: "#b91c1c",
    textDecorationLine: "underline" as const,
  },
  commandList: {
    padding: 8,
    gap: 8,
  },
  commandItemShell: {
    borderRadius: 8,
    overflow: "hidden" as const,
  },
  commandItemShellSelected: {
    backgroundColor: "#f0f9ff",
  },
  commandItem: {
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    backgroundColor: "#ffffff",
  },
  commandItemRow: {
    flexDirection: "row" as const,
    alignItems: "flex-start" as const,
    gap: 6,
  },
  commandItemCategoryIcon: {
    width: 16,
    height: 16,
    marginTop: 1,
  },
  categoryHeaderIcon: {
    width: 20,
    height: 20,
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
  commandTitleReference: {
    fontSize: 12,
    fontWeight: "600" as const,
    fontStyle: "italic" as const,
    color: "#0369a1",
  },
  commandInlineDetail: {
    marginTop: 8,
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#fffdf2",
    borderWidth: 1,
    borderColor: "#f3e6b3",
  },
  commandSummaryBlock: {
    gap: 10,
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#eef6ff",
    borderWidth: 1,
    borderColor: "#93c5fd",
    borderLeftWidth: 5,
    borderLeftColor: "#2563eb",
  },
  commandSummaryTopRow: {
    flexDirection: "row" as const,
    alignItems: "flex-start" as const,
    gap: 10,
  },
  commandDotRow: {
    width: 18,
    marginTop: 8,
    gap: 4,
    alignItems: "center" as const,
  },
  commandDot: {
    width: 5,
    height: 5,
    borderRadius: 999,
    backgroundColor: "#2563eb",
  },
  commandSummaryTitle: {
    flex: 1,
    fontSize: 21,
    lineHeight: 27,
    fontWeight: "800" as const,
    color: "#172554",
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
  },
  referenceTagText: {
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
  communityReviewDock: {
    gap: 0,
    borderRadius: 8,
    backgroundColor: "#f0fdfa",
    borderWidth: 1,
    borderColor: "#99f6e4",
    overflow: "hidden" as const,
  },
  communityReviewDrawer: {
    width: "100%" as const,
  },
  communityReviewTab: {
    minHeight: 42,
    paddingHorizontal: 12,
    paddingVertical: 8,
    flexDirection: "row" as const,
    alignItems: "center" as const,
    justifyContent: "flex-start" as const,
    gap: 8,
    backgroundColor: "#ffffff",
  },
  communityReviewTabOpen: {
    backgroundColor: "#0f766e",
  },
  communityReviewTabText: {
    flex: 1,
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "900" as const,
    color: "#0f766e",
  },
  communityReviewTabTextOpen: {
    color: "#ffffff",
  },
  communityReviewTabCount: {
    minWidth: 24,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 999,
    overflow: "hidden" as const,
    backgroundColor: "#ccfbf1",
    color: "#0f766e",
    fontSize: 11,
    lineHeight: 14,
    fontWeight: "900" as const,
    textAlign: "center" as const,
  },
  communityReviewTabCountOpen: {
    backgroundColor: "#ffffff",
    color: "#0f766e",
  },
  communityReviewSection: {
    borderTopWidth: 1,
    borderTopColor: "#99f6e4",
    backgroundColor: "#f8fafc",
  },
  communityReviewHeader: {
    minHeight: 58,
    paddingHorizontal: 12,
    paddingVertical: 10,
    flexDirection: "row" as const,
    alignItems: "center" as const,
    justifyContent: "space-between" as const,
    gap: 10,
    backgroundColor: "#eef2f7",
  },
  communityReviewTitleGroup: {
    flex: 1,
    minWidth: 0,
  },
  communityReviewEyebrow: {
    fontSize: 10,
    lineHeight: 13,
    fontWeight: "900" as const,
    color: "#64748b",
    textTransform: "uppercase" as const,
  },
  communityReviewTitle: {
    marginTop: 1,
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "900" as const,
    color: "#1e293b",
  },
  communityReviewSummary: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
    flexWrap: "wrap" as const,
    justifyContent: "flex-end" as const,
    gap: 6,
  },
  communityReviewSummaryPill: {
    minWidth: 44,
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 999,
    overflow: "hidden" as const,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#cbd5e1",
    fontSize: 11,
    lineHeight: 14,
    fontWeight: "900" as const,
    color: "#334155",
    textAlign: "center" as const,
  },
  communityReviewConcernPill: {
    borderColor: "#f59e0b",
    backgroundColor: "#fffbeb",
    color: "#b45309",
  },
  communityReviewToggle: {
    minWidth: 20,
    textAlign: "center" as const,
    fontSize: 18,
    lineHeight: 22,
    fontWeight: "900" as const,
    color: "#334155",
  },
  communityReviewBody: {
    gap: 12,
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: "#cbd5e1",
    backgroundColor: "#ffffff",
  },
  adminReviewPanel: {
    gap: 10,
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#f0fdfa",
    borderWidth: 1,
    borderColor: "#99f6e4",
  },
  voteTasksPanel: {
    gap: 0,
    borderRadius: 8,
    backgroundColor: "#f8fafc",
    borderWidth: 1,
    borderColor: "#cbd5e1",
    overflow: "hidden" as const,
  },
  voteTasksHeader: {
    minHeight: 52,
    paddingHorizontal: 12,
    paddingVertical: 10,
    flexDirection: "row" as const,
    alignItems: "center" as const,
    justifyContent: "space-between" as const,
    gap: 10,
    backgroundColor: "#ffffff",
  },
  voteTasksTitle: {
    fontSize: 14,
    lineHeight: 19,
    fontWeight: "900" as const,
    color: "#1e293b",
  },
  voteTasksSubtitle: {
    marginTop: 1,
    fontSize: 12,
    lineHeight: 16,
    color: "#64748b",
  },
  voteTasksToggle: {
    minWidth: 24,
    textAlign: "center" as const,
    fontSize: 18,
    lineHeight: 22,
    fontWeight: "900" as const,
    color: "#334155",
  },
  voteTasksBody: {
    gap: 10,
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: "#e2e8f0",
  },
  voteSummaryRow: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
    flexWrap: "wrap" as const,
    gap: 8,
  },
  voteSummaryText: {
    fontSize: 12,
    lineHeight: 17,
    fontWeight: "900" as const,
    color: "#0f766e",
  },
  voteConcernText: {
    fontSize: 12,
    lineHeight: 17,
    fontWeight: "900" as const,
    color: "#b45309",
  },
  voteExistingText: {
    fontSize: 12,
    lineHeight: 17,
    fontWeight: "800" as const,
    color: "#64748b",
  },
  voteConcernButton: {
    minHeight: 34,
    paddingHorizontal: 12,
    borderRadius: 999,
    alignItems: "center" as const,
    justifyContent: "center" as const,
    backgroundColor: "#b45309",
  },
  voteBreakdown: {
    gap: 8,
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#fffbeb",
    borderWidth: 1,
    borderColor: "#fde68a",
  },
  voteConcernList: {
    gap: 7,
  },
  voteConcernItem: {
    gap: 4,
    paddingTop: 7,
    borderTopWidth: 1,
    borderTopColor: "#fde68a",
  },
  voteModalBackdrop: {
    flex: 1,
    padding: 18,
    alignItems: "center" as const,
    justifyContent: "center" as const,
    backgroundColor: "rgba(15,23,42,0.38)",
  },
  voteModalCard: {
    width: "100%" as const,
    maxWidth: 520,
    gap: 12,
    padding: 16,
    borderRadius: 8,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  voteModalTitle: {
    fontSize: 18,
    lineHeight: 23,
    fontWeight: "900" as const,
    color: "#0f172a",
  },
  voteModalText: {
    fontSize: 13,
    lineHeight: 19,
    color: "#475569",
  },
  voteModalChoiceRow: {
    flexDirection: "row" as const,
    flexWrap: "wrap" as const,
    gap: 8,
  },
  voteModalChoice: {
    flex: 1,
    minWidth: 180,
    gap: 3,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#cbd5e1",
    backgroundColor: "#f8fafc",
  },
  voteModalChoiceActive: {
    borderColor: "#0f766e",
    backgroundColor: "#ecfdf5",
  },
  voteModalConcernActive: {
    borderColor: "#b45309",
    backgroundColor: "#fffbeb",
  },
  voteModalChoiceText: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "900" as const,
    color: "#1e293b",
  },
  voteModalChoiceHelp: {
    fontSize: 12,
    lineHeight: 17,
    color: "#64748b",
  },
  adminReviewHeader: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
    justifyContent: "space-between" as const,
    gap: 10,
  },
  adminReviewTitle: {
    fontSize: 14,
    lineHeight: 19,
    fontWeight: "900" as const,
    color: "#0f766e",
  },
  adminReviewModeRow: {
    flexDirection: "row" as const,
    flexWrap: "wrap" as const,
    gap: 6,
  },
  adminReviewModeButton: {
    minHeight: 30,
    paddingHorizontal: 10,
    borderRadius: 999,
    alignItems: "center" as const,
    justifyContent: "center" as const,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#99f6e4",
  },
  adminReviewModeButtonActive: {
    backgroundColor: "#0f766e",
    borderColor: "#0f766e",
  },
  adminReviewModeText: {
    fontSize: 12,
    fontWeight: "900" as const,
    color: "#0f766e",
  },
  adminReviewModeTextActive: {
    color: "#ffffff",
  },
  adminReviewMeta: {
    marginTop: 2,
    fontSize: 12,
    lineHeight: 17,
    color: "#475569",
  },
  adminReviewStepControls: {
    flexDirection: "row" as const,
    gap: 6,
  },
  adminReviewIconButton: {
    width: 30,
    minHeight: 30,
    borderRadius: 999,
    alignItems: "center" as const,
    justifyContent: "center" as const,
    backgroundColor: "#ccfbf1",
  },
  adminReviewIconText: {
    fontSize: 22,
    lineHeight: 24,
    fontWeight: "900" as const,
    color: "#0f766e",
  },
  adminReviewBody: {
    gap: 7,
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#ccfbf1",
  },
  adminReviewActions: {
    flexDirection: "row" as const,
    flexWrap: "wrap" as const,
    justifyContent: "flex-end" as const,
    gap: 8,
  },
  adminReviewSecondaryButton: {
    minHeight: 34,
    paddingHorizontal: 12,
    borderRadius: 999,
    alignItems: "center" as const,
    justifyContent: "center" as const,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#99f6e4",
  },
  adminReviewSecondaryText: {
    fontSize: 12,
    fontWeight: "900" as const,
    color: "#0f766e",
  },
  adminReviewRejectButton: {
    minHeight: 34,
    paddingHorizontal: 12,
    borderRadius: 999,
    alignItems: "center" as const,
    justifyContent: "center" as const,
    backgroundColor: "#b91c1c",
  },
  adminReviewApproveButton: {
    minHeight: 34,
    paddingHorizontal: 12,
    borderRadius: 999,
    alignItems: "center" as const,
    justifyContent: "center" as const,
    backgroundColor: "#0f766e",
  },
  adminReviewActionText: {
    fontSize: 12,
    fontWeight: "900" as const,
    color: "#ffffff",
  },
  promotionForm: {
    gap: 8,
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#ecfeff",
    borderWidth: 1,
    borderColor: "#a5f3fc",
  },
  promotionFormTitle: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "900" as const,
    color: "#155e75",
  },
  promotionFieldRow: {
    flexDirection: "row" as const,
    flexWrap: "wrap" as const,
    gap: 8,
  },
  promotionInput: {
    flex: 1,
    minWidth: 150,
    minHeight: 38,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#bae6fd",
    color: "#0f172a",
    fontSize: 13,
    lineHeight: 18,
  },
  promotionTextArea: {
    minHeight: 76,
    textAlignVertical: "top" as const,
  },
  sectionTitle: {
    flex: 1,
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "900" as const,
    color: "#0f172a",
    textTransform: "uppercase" as const,
  },
  sectionTitleBlock: {
    flex: 1,
    minHeight: 34,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 8,
    flexDirection: "row" as const,
    alignItems: "center" as const,
    gap: 8,
    backgroundColor: "#f1f5f9",
    borderWidth: 1,
    borderColor: "#cbd5e1",
  },
  sectionTitleMarker: {
    width: 7,
    height: 18,
    borderRadius: 999,
    backgroundColor: "#0f766e",
  },
  sectionTitleRow: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
    justifyContent: "space-between" as const,
    gap: 8,
  },
  listText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 21,
    color: "#475569",
  },
  editableListItem: {
    gap: 8,
    paddingBottom: 5,
  },
  mutedText: {
    fontSize: 14,
    lineHeight: 20,
    color: "#64748b",
  },
  sectionHelpText: {
    fontSize: 12,
    lineHeight: 17,
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
  contributionSmallButton: {
    width: 28,
    minHeight: 28,
    borderRadius: 999,
    alignItems: "center" as const,
    justifyContent: "center" as const,
    backgroundColor: "#0f766e",
  },
  contributionSmallButtonOpen: {
    backgroundColor: "#64748b",
  },
  contributionSmallButtonText: {
    fontSize: 18,
    lineHeight: 22,
    fontWeight: "900" as const,
    color: "#ffffff",
  },
  contributionActions: {
    flexDirection: "row" as const,
    flexWrap: "wrap" as const,
    gap: 6,
  },
  contributionActionButton: {
    minHeight: 26,
    paddingHorizontal: 8,
    borderRadius: 999,
    alignItems: "center" as const,
    justifyContent: "center" as const,
    backgroundColor: "#f8fafc",
    borderWidth: 1,
    borderColor: "#cbd5e1",
  },
  contributionActionText: {
    fontSize: 11,
    fontWeight: "800" as const,
    color: "#475569",
  },
  contributionLoginCard: {
    flexDirection: "row" as const,
    flexWrap: "wrap" as const,
    alignItems: "center" as const,
    gap: 12,
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#f0fdfa",
    borderWidth: 1,
    borderColor: "#99f6e4",
  },
  contributionLoginTitle: {
    fontSize: 14,
    lineHeight: 19,
    fontWeight: "900" as const,
    color: "#134e4a",
  },
  contributionLoginText: {
    marginTop: 3,
    fontSize: 12,
    lineHeight: 17,
    color: "#0f766e",
  },
  contributionLoginButton: {
    minHeight: 34,
    paddingHorizontal: 12,
    borderRadius: 999,
    alignItems: "center" as const,
    justifyContent: "center" as const,
    backgroundColor: "#0f766e",
  },
  contributionLoginButtonText: {
    fontSize: 12,
    fontWeight: "900" as const,
    color: "#ffffff",
  },
  contributionForm: {
    gap: 10,
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#f8fafc",
    borderWidth: 1,
    borderColor: "#bae6fd",
  },
  contributionFormTitle: {
    fontSize: 14,
    lineHeight: 19,
    fontWeight: "900" as const,
    color: "#075985",
  },
  contributionGuidance: {
    fontSize: 12,
    lineHeight: 17,
    color: "#475569",
  },
  contributionTargetBlock: {
    gap: 4,
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  contributionTargetLabel: {
    fontSize: 11,
    fontWeight: "900" as const,
    color: "#64748b",
    textTransform: "uppercase" as const,
  },
  contributionTargetText: {
    fontSize: 13,
    lineHeight: 18,
    color: "#475569",
  },
  contributionInput: {
    minHeight: 92,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#cbd5e1",
    color: "#0f172a",
    fontSize: 14,
    lineHeight: 19,
    textAlignVertical: "top" as const,
  },
  contributionReasonInput: {
    minHeight: 72,
  },
  contributionFormActions: {
    flexDirection: "row" as const,
    justifyContent: "flex-end" as const,
    gap: 8,
  },
  contributionSubmitButton: {
    minHeight: 34,
    paddingHorizontal: 14,
    borderRadius: 999,
    alignItems: "center" as const,
    justifyContent: "center" as const,
    backgroundColor: "#0f766e",
  },
  contributionSubmitText: {
    fontSize: 12,
    fontWeight: "900" as const,
    color: "#ffffff",
  },
  contributionMessage: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "800" as const,
    color: "#0f766e",
  },
  pendingContributionBlock: {
    gap: 8,
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#eff6ff",
    borderWidth: 1,
    borderColor: "#bfdbfe",
  },
  pendingContributionItem: {
    gap: 5,
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#dbeafe",
  },
  pendingContributionBadge: {
    alignSelf: "flex-start" as const,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 999,
    overflow: "hidden" as const,
    backgroundColor: "#dbeafe",
    color: "#1d4ed8",
    fontSize: 11,
    fontWeight: "900" as const,
    textTransform: "uppercase" as const,
  },
  pendingContributionTitle: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "900" as const,
    color: "#1e293b",
  },
  pendingContributionByline: {
    fontSize: 12,
    lineHeight: 17,
    fontWeight: "800" as const,
    color: "#0f766e",
  },
  pendingContributionText: {
    fontSize: 13,
    lineHeight: 18,
    color: "#475569",
  },
  pendingContributionReason: {
    fontSize: 12,
    lineHeight: 17,
    color: "#64748b",
    fontStyle: "italic" as const,
  },
  pendingContributionWithdrawButton: {
    alignSelf: "flex-start" as const,
    minHeight: 30,
    paddingHorizontal: 10,
    borderRadius: 999,
    alignItems: "center" as const,
    justifyContent: "center" as const,
    backgroundColor: "#fff7ed",
    borderWidth: 1,
    borderColor: "#fed7aa",
  },
  pendingContributionWithdrawText: {
    fontSize: 12,
    fontWeight: "900" as const,
    color: "#9a3412",
  },
  storyReferenceRow: {
    gap: 7,
    alignItems: "flex-start" as const,
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#f8fafc",
    borderWidth: 1,
    borderColor: "#dbeafe",
  },
  storyReferenceLabel: {
    fontSize: 13,
    lineHeight: 18,
    color: "#334155",
  },
  teachingRow: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
    gap: 8,
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#f0fdf4",
    borderWidth: 1,
    borderColor: "#bbf7d0",
  },
  teachingLabel: {
    fontSize: 13,
    lineHeight: 18,
    color: "#166534",
    fontWeight: "600" as const,
  },
  teachingExternalButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center" as const,
    justifyContent: "center" as const,
    backgroundColor: "#dcfce7",
  },
  teachingUrl: {
    fontSize: 11,
    lineHeight: 14,
    color: "#4d7c63",
  },
};
