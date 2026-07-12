/*
 * File: server/scripts/buildEpisodeDates.ts
 * Purpose: One-off scan of church-of-the-word day content JSON files to recover
 * the Enoch calendar date each Spotify episode was uploaded on, and emit
 * podcast_episode_date/3 Prolog facts for facts/podcast_episodes.pl.
 */

import fs from "fs";
import path from "path";

const DAYS_ROOT = path.join(
  __dirname,
  "..",
  "content",
  "groups",
  "church-of-the-word",
  "days"
);

function extractEpisodeId(url: string): string | null {
  const match = url.match(/open\.spotify\.com\/episode\/([a-zA-Z0-9]+)/);
  return match?.[1] ?? null;
}

function walk(dir: string, files: string[] = []): string[] {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath, files);
    } else if (entry.isFile() && entry.name.endsWith(".json")) {
      files.push(fullPath);
    }
  }
  return files;
}

function main() {
  const files = walk(DAYS_ROOT);
  const episodeDates = new Map<string, { year: number; month: number; day: number }>();

  for (const file of files) {
    const data = JSON.parse(fs.readFileSync(file, "utf8"));
    const year = data.enochYear;
    const month = data.month;
    const day = data.day;

    if (typeof year !== "number" || typeof month !== "number" || typeof day !== "number") {
      continue;
    }

    const sections = Array.isArray(data.sections) ? data.sections : [];
    for (const section of sections) {
      const items = Array.isArray(section.items) ? section.items : [];
      for (const item of items) {
        if (item?.type !== "external-link" || typeof item.url !== "string") continue;
        const episodeId = extractEpisodeId(item.url);
        if (!episodeId) continue;

        if (!episodeDates.has(episodeId)) {
          episodeDates.set(episodeId, { year, month, day });
        }
      }
    }
  }

  const lines = Array.from(episodeDates.entries())
    .sort((a, b) => a[1].year - b[1].year || a[1].month - b[1].month || a[1].day - b[1].day)
    .map(
      ([id, { year, month, day }]) =>
        `podcast_episode_date('${id}', ${year}, ${month}, ${day}).`
    );

  console.log(lines.join("\n"));
  console.error(`\nMatched ${episodeDates.size} episodes with a calendar date.`);
}

main();
