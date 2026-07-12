/*
 * File: server/src/services/teachingIndexService.ts
 * Purpose: Matches Torah commands to Church of the Word podcast episodes by shared book/chapter references.
 */

import { churchOfTheWordEpisodes } from "../data/churchOfTheWordEpisodes";

export type RelatedTeaching = {
  title: string;
  url: string;
};

type EpisodeRecord = {
  title: string;
  url: string;
  bookChapters: string[];
};

type IndexedEpisode = EpisodeRecord & {
  titleKeywords: Set<string>;
};

// Words too common across this podcast's titles (or English generally) to signal a real topic match.
const KEYWORD_STOPWORDS = new Set([
  "the",
  "and",
  "for",
  "from",
  "with",
  "unto",
  "into",
  "your",
  "yeshua",
  "yahweh",
  "yahuwah",
  "yahua",
  "yah",
  "elohim",
  "messiah",
  "gospel",
  "gospels",
  "accounts",
  "account",
  "part",
  "story",
  "stories",
  "book",
  "letter",
  "letters",
  "church",
  "churches",
  "revelation",
  "understanding",
  "living",
  "life",
  "true",
  "timing",
  "timeline",
  "final",
  "eternal",
  "divine",
  "power",
  "role",
  "call",
  "calling",
]);

function extractKeywords(text: string): Set<string> {
  const words = text
    .toLowerCase()
    .replace(/['’]/g, "")
    .split(/[^a-z0-9]+/)
    .filter((word) => word.length >= 4 && !KEYWORD_STOPWORDS.has(word));

  return new Set(words);
}

const BOOK_NAMES = [
  "1 Samuel",
  "2 Samuel",
  "1 Kings",
  "2 Kings",
  "1 Chronicles",
  "2 Chronicles",
  "Song of Solomon",
  "1 Corinthians",
  "2 Corinthians",
  "1 Thessalonians",
  "2 Thessalonians",
  "1 Timothy",
  "2 Timothy",
  "1 Peter",
  "2 Peter",
  "1 John",
  "2 John",
  "3 John",
  "Genesis",
  "Exodus",
  "Leviticus",
  "Numbers",
  "Deuteronomy",
  "Joshua",
  "Judges",
  "Ruth",
  "Ezra",
  "Nehemiah",
  "Esther",
  "Job",
  "Psalm",
  "Psalms",
  "Proverbs",
  "Ecclesiastes",
  "Isaiah",
  "Jeremiah",
  "Lamentations",
  "Ezekiel",
  "Daniel",
  "Hosea",
  "Joel",
  "Amos",
  "Obadiah",
  "Jonah",
  "Micah",
  "Nahum",
  "Habakkuk",
  "Zephaniah",
  "Haggai",
  "Zechariah",
  "Malachi",
  "Matthew",
  "Mark",
  "Luke",
  "John",
  "Acts",
  "Romans",
  "Galatians",
  "Ephesians",
  "Philippians",
  "Colossians",
  "Titus",
  "Philemon",
  "Hebrews",
  "James",
  "Jude",
  "Revelation",
].sort((a, b) => b.length - a.length);

type TeachingIndex = {
  byBookChapter: Map<string, IndexedEpisode[]>;
  episodes: IndexedEpisode[];
};

let cachedIndex: TeachingIndex | null = null;

function normalizeBook(book: string): string {
  return book === "Psalm" ? "Psalms" : book;
}

function loadEpisodes(): Record<string, EpisodeRecord> {
  return churchOfTheWordEpisodes;
}

function buildIndex(): TeachingIndex {
  const episodes = loadEpisodes();
  const byBookChapter = new Map<string, IndexedEpisode[]>();
  const indexedEpisodes: IndexedEpisode[] = [];

  for (const episode of Object.values(episodes)) {
    const indexed: IndexedEpisode = {
      ...episode,
      titleKeywords: extractKeywords(episode.title),
    };

    indexedEpisodes.push(indexed);

    for (const bookChapter of indexed.bookChapters) {
      const list = byBookChapter.get(bookChapter) ?? [];
      list.push(indexed);
      byBookChapter.set(bookChapter, list);
    }
  }

  return { byBookChapter, episodes: indexedEpisodes };
}

function getIndex(): TeachingIndex {
  if (!cachedIndex) {
    cachedIndex = buildIndex();
  }

  return cachedIndex;
}

/** Extracts "Book Chapter" tokens (e.g. "Leviticus 19") from a scripture reference string. */
export function extractBookChapters(reference: string): string[] {
  const trimmed = reference.trim();
  const book = BOOK_NAMES.find(
    (name) =>
      trimmed.toLowerCase().startsWith(`${name.toLowerCase()} `) ||
      trimmed.toLowerCase() === name.toLowerCase()
  );

  if (!book) {
    return [];
  }

  const rest = trimmed.slice(book.length).trim();
  const normalized = normalizeBook(book);
  const chapters = new Set<number>();

  for (const part of rest.split(",")) {
    const match = part.trim().match(/^(\d+)(?:-(\d+))?/);

    if (!match) {
      continue;
    }

    const start = Number(match[1]);
    const end = match[2] && !part.includes(":") ? Number(match[2]) : undefined;

    if (end !== undefined && end - start <= 20) {
      for (let chapter = start; chapter <= end; chapter += 1) {
        chapters.add(chapter);
      }
    } else {
      chapters.add(start);
    }
  }

  return Array.from(chapters).map((chapter) => `${normalized} ${chapter}`);
}

export function getRelatedTeachings(
  scriptureReferences: string[],
  commandText = "",
  limit = 12
): RelatedTeaching[] {
  const index = getIndex();
  const seen = new Map<string, RelatedTeaching>();

  for (const reference of scriptureReferences) {
    for (const bookChapter of extractBookChapters(reference)) {
      const matches = index.byBookChapter.get(bookChapter);

      if (!matches) {
        continue;
      }

      for (const match of matches) {
        if (!seen.has(match.url)) {
          seen.set(match.url, { title: match.title, url: match.url });
        }
      }
    }
  }

  // Fall back to title-keyword overlap to fill remaining slots — useful for
  // episodes whose Spotify page never listed a usable scripture breakdown.
  if (seen.size < limit && commandText.trim()) {
    const commandKeywords = extractKeywords(commandText);

    if (commandKeywords.size > 0) {
      const keywordMatches = index.episodes
        .filter((episode) => !seen.has(episode.url))
        .map((episode) => ({
          episode,
          overlap: Array.from(episode.titleKeywords).filter((word) =>
            commandKeywords.has(word)
          ).length,
        }))
        .filter((entry) => entry.overlap > 0)
        .sort((a, b) => b.overlap - a.overlap);

      for (const { episode } of keywordMatches) {
        if (seen.size >= limit) break;
        seen.set(episode.url, { title: episode.title, url: episode.url });
      }
    }
  }

  return Array.from(seen.values()).slice(0, limit);
}

/**
 * Strict presence check used for the "Has Teaching" audit filter — scripture
 * book/chapter matches only. Deliberately excludes the title-keyword
 * fallback, which is loose enough (common words like "priest" or "offering")
 * that nearly every command would otherwise register as having a match,
 * making the flag useless for finding genuine gaps.
 */
export function hasRelatedTeaching(scriptureReferences: string[]): boolean {
  const index = getIndex();

  return scriptureReferences.some((reference) =>
    extractBookChapters(reference).some((bookChapter) =>
      index.byBookChapter.has(bookChapter)
    )
  );
}
