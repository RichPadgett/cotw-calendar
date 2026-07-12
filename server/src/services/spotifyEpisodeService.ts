/*
 * File: server/src/services/spotifyEpisodeService.ts
 * Purpose: Fetches Spotify episode metadata via the Spotify Web API and parses scripture
 * references out of the episode description, to speed up the weekly Shabbat-teaching upload.
 */

const TOKEN_URL = "https://accounts.spotify.com/api/token";
const EPISODE_URL_PREFIX = "https://api.spotify.com/v1/episodes";

export type SuggestedScriptureReading = {
  label: string;
  reference: string;
  url: string;
};

export type SpotifyEpisodeDetails = {
  title: string;
  url: string;
  description: string;
  suggestedReadings: SuggestedScriptureReading[];
};

type CachedToken = {
  accessToken: string;
  expiresAt: number;
};

let cachedToken: CachedToken | null = null;

export function extractSpotifyEpisodeId(input: string): string | null {
  const match = input.match(/open\.spotify\.com\/episode\/([a-zA-Z0-9]+)/);

  if (match?.[1]) {
    return match[1];
  }

  if (/^[a-zA-Z0-9]{10,30}$/.test(input.trim())) {
    return input.trim();
  }

  return null;
}

async function getAccessToken(): Promise<string> {
  if (cachedToken && cachedToken.expiresAt > Date.now() + 5000) {
    return cachedToken.accessToken;
  }

  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error(
      "Spotify API is not configured. Set SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET."
    );
  }

  const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString(
    "base64"
  );

  const response = await fetch(TOKEN_URL, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basicAuth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  if (!response.ok) {
    throw new Error(`Spotify token request failed: ${response.status}`);
  }

  const data = (await response.json()) as {
    access_token: string;
    expires_in: number;
  };

  cachedToken = {
    accessToken: data.access_token,
    expiresAt: Date.now() + data.expires_in * 1000,
  };

  return cachedToken.accessToken;
}

export async function getSpotifyEpisodeDetails(
  episodeIdOrUrl: string
): Promise<SpotifyEpisodeDetails> {
  const episodeId = extractSpotifyEpisodeId(episodeIdOrUrl);

  if (!episodeId) {
    throw new Error("Could not find a Spotify episode ID in that input.");
  }

  const accessToken = await getAccessToken();

  const response = await fetch(
    `${EPISODE_URL_PREFIX}/${episodeId}?market=US`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Spotify episode request failed: ${response.status}`);
  }

  const data = (await response.json()) as {
    name: string;
    description: string;
    external_urls?: { spotify?: string };
  };

  const description = data.description ?? "";

  return {
    title: data.name ?? "",
    url: data.external_urls?.spotify ?? `https://open.spotify.com/episode/${episodeId}`,
    description,
    suggestedReadings: extractScriptureReadings(description),
  };
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
  "Psalms",
  "Psalm",
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
];

const BOOK_PATTERN = BOOK_NAMES.map((name) =>
  name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
).join("|");

// Matches "Book 12:3-5" / "Book 12" possibly followed by more comma-separated verses/chapters.
const REFERENCE_REGEX = new RegExp(
  `\\b(${BOOK_PATTERN})\\s+(\\d+(?::\\d+(?:-\\d+)?)?(?:\\s*,\\s*\\d+(?::\\d+(?:-\\d+)?)?)*(?:-\\d+)?)`,
  "g"
);

export function extractScriptureReadings(
  description: string
): SuggestedScriptureReading[] {
  const seen = new Map<string, SuggestedScriptureReading>();
  const matches = description.matchAll(REFERENCE_REGEX);

  for (const match of matches) {
    const book = match[1];
    const rest = match[2];
    const reference = `${book} ${rest}`;

    if (!seen.has(reference)) {
      seen.set(reference, {
        label: reference,
        reference,
        url: "",
      });
    }
  }

  return Array.from(seen.values());
}
