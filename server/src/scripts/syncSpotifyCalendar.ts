import "dotenv/config";

import { publishSpotifyEpisodeToCalendar } from "../services/calendarContentStore";
import { getSpotifyShowEpisodes } from "../services/spotifyEpisodeService";

const START_DATE = process.env.SPOTIFY_CALENDAR_START_DATE ?? "2021-01-01";

async function main() {
  const dryRun = process.argv.includes("--dry-run");
  const episodes = await getSpotifyShowEpisodes();
  let changed = 0;
  let unchanged = 0;
  let skipped = 0;

  for (const episode of episodes) {
    if (
      episode.releaseDatePrecision !== "day" ||
      episode.releaseDate < START_DATE
    ) {
      skipped++;
      continue;
    }

    const result = publishSpotifyEpisodeToCalendar(
      {
        episodeId: episode.id,
        title: episode.name,
        url: episode.url,
        releaseDate: episode.releaseDate,
      },
      { dryRun }
    );

    if (!result) {
      skipped++;
      continue;
    }

    if (result.changed) {
      changed++;
      console.log(
        `${dryRun ? "Would link" : "Linked"}: ${episode.releaseDate} -> ${result.enochDate} | ${episode.name}`
      );
    } else {
      unchanged++;
    }
  }

  console.log(
    JSON.stringify({
      dryRun,
      fetched: episodes.length,
      changed,
      unchanged,
      skipped,
      startDate: START_DATE,
    })
  );
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
