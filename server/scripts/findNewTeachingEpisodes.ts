/*
 * File: server/scripts/findNewTeachingEpisodes.ts
 * Purpose: Detects Church of the Word Spotify episodes referenced in calendar day
 * content that are not yet present in the teachings index, so they can be
 * looked up and appended without re-scraping everything.
 *
 * Usage: npx ts-node scripts/findNewTeachingEpisodes.ts   (run from server/)
 */

import fs from "fs";
import path from "path";

const DAYS_ROOT = path.join(
  process.cwd(),
  "content",
  "groups",
  "church-of-the-word",
  "days"
);
const TEACHINGS_FILE = path.join(
  process.cwd(),
  "content",
  "teachings",
  "church_of_the_word_episodes.json"
);

type DayContentItem = {
  label?: string;
  type?: string;
  url?: string;
};

type DayContent = {
  sections?: { items?: DayContentItem[] }[];
};

type EpisodeRecord = {
  title: string;
  url: string;
  bookChapters: string[];
};

function listDayFiles(): string[] {
  const files: string[] = [];

  function walk(dir: string) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        walk(fullPath);
      } else if (entry.name.endsWith(".json")) {
        files.push(fullPath);
      }
    }
  }

  if (fs.existsSync(DAYS_ROOT)) {
    walk(DAYS_ROOT);
  }

  return files;
}

function extractEpisodesFromDayFiles(): Map<string, string> {
  const found = new Map<string, string>(); // episodeId -> label

  for (const file of listDayFiles()) {
    const data: DayContent = JSON.parse(fs.readFileSync(file, "utf-8"));

    for (const section of data.sections ?? []) {
      for (const item of section.items ?? []) {
        if (!item.url?.includes("open.spotify.com/episode/")) {
          continue;
        }

        const episodeId = item.url.split("/episode/")[1]?.split("?")[0];

        if (!episodeId) {
          continue;
        }

        const label = (item.label ?? "").replace(/\s*Spotify\s*$/i, "").trim();
        found.set(episodeId, label || episodeId);
      }
    }
  }

  return found;
}

function loadIndexedEpisodes(): Record<string, EpisodeRecord> {
  if (!fs.existsSync(TEACHINGS_FILE)) {
    return {};
  }

  return JSON.parse(fs.readFileSync(TEACHINGS_FILE, "utf-8"));
}

function main() {
  const dayEpisodes = extractEpisodesFromDayFiles();
  const indexed = loadIndexedEpisodes();

  const newEpisodes = Array.from(dayEpisodes.entries()).filter(
    ([episodeId]) => !(episodeId in indexed)
  );

  if (newEpisodes.length === 0) {
    console.log("No new episodes found. Teachings index is up to date.");
    return;
  }

  console.log(`Found ${newEpisodes.length} episode(s) not yet in the teachings index:\n`);

  for (const [episodeId, title] of newEpisodes) {
    console.log(`- ${title}`);
    console.log(`  https://open.spotify.com/episode/${episodeId}`);
  }
}

main();
