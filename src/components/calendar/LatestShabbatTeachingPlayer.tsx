/*
 * File: src/components/calendar/LatestShabbatTeachingPlayer.tsx
 * Purpose: Collapsible latest Shabbat teaching player shared across app tabs.
 * Author: rpadgett
 */

import {
  Linking,
  Platform,
  Pressable,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { createElement, useEffect, useMemo, useState } from "react";

import { MaterialIcons } from "@expo/vector-icons";
import { apiUrl } from "../../config/api";

type LatestShabbatTeaching = {
  enochYear: number;
  month: number;
  day: number;
  gregorianDate: string;
  title: string;
  url: string;
  provider: "spotify";
};

type Props = {
  groupCode: string;
  collapseRequestId?: number;
};

function getSpotifyEmbedUrl(url: string): string | null {
  const match = url.match(/open\.spotify\.com\/episode\/([^?]+)/);

  if (!match?.[1]) {
    return null;
  }

  return `https://open.spotify.com/embed/episode/${match[1]}?utm_source=generator`;
}

export default function LatestShabbatTeachingPlayer({
  groupCode,
  collapseRequestId = 0,
}: Props) {
  const { width } = useWindowDimensions();
  const [latestTeaching, setLatestTeaching] =
    useState<LatestShabbatTeaching | null>(null);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const isWidePlayer = width >= 820;
  const isCompactCollapsed = isCollapsed;

  useEffect(() => {
    let isMounted = true;

    fetch(
      apiUrl(
        `/calendar/latest-shabbat-teaching?groupCode=${encodeURIComponent(
          groupCode
        )}`
      )
    )
      .then((response) => (response.ok ? response.json() : null))
      .then((teaching: LatestShabbatTeaching | null) => {
        if (isMounted) {
          setLatestTeaching(teaching);
        }
      })
      .catch(() => {
        if (isMounted) {
          setLatestTeaching(null);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [groupCode]);

  useEffect(() => {
    if (collapseRequestId > 0) {
      setIsCollapsed(true);
    }
  }, [collapseRequestId]);

  const latestTeachingEmbedUrl = useMemo(() => {
    if (!latestTeaching?.url) {
      return null;
    }

    return getSpotifyEmbedUrl(latestTeaching.url);
  }, [latestTeaching?.url]);

  const latestTeachingEmbed =
    Platform.OS === "web" && latestTeachingEmbedUrl
      ? createElement("iframe" as any, {
          title: latestTeaching?.title ?? "Latest Shabbat teaching",
          src: latestTeachingEmbedUrl,
          width: "100%",
          height: isWidePlayer ? "352" : "152",
          frameBorder: "0",
          allowFullScreen: true,
          allow:
            "autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture",
          loading: "lazy",
          style: {
            border: "0",
            borderRadius: 12,
            display: "block",
            width: "100%",
          },
        })
      : null;

  const openLatestTeaching = () => {
    if (latestTeaching?.url) {
      void Linking.openURL(latestTeaching.url);
    }
  };

  if (!latestTeaching) {
    return null;
  }

  return (
    <View
      style={{
        marginTop: 0,
        marginBottom: isCompactCollapsed ? 8 : 12,
        borderRadius: isCompactCollapsed ? 10 : 14,
        overflow: "hidden",
        backgroundColor: "#111827",
        borderWidth: latestTeachingEmbed ? 0 : 1,
        borderColor: "#1f2937",
      }}
    >
      <Pressable
        onPress={() => setIsCollapsed((value) => !value)}
        style={{
          minHeight: isCompactCollapsed ? 26 : 44,
          paddingHorizontal: isCompactCollapsed ? 10 : 12,
          paddingVertical: isCompactCollapsed ? 4 : 9,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 10,
          backgroundColor: "#0f172a",
        }}
      >
        <View style={{ flex: 1 }}>
          <Text
            numberOfLines={1}
            style={{
              fontSize: isCompactCollapsed ? 10 : 11,
              fontWeight: "900",
              color: "#86efac",
              textTransform: "uppercase",
            }}
          >
            {isCompactCollapsed ? "Latest Teaching" : "Latest Shabbat Teaching"}
          </Text>

          {!isCompactCollapsed ? (
            <Text
              numberOfLines={1}
              style={{
                marginTop: 2,
                fontSize: 13,
                fontWeight: "900",
                color: "#ffffff",
              }}
            >
              {latestTeaching.title}
            </Text>
          ) : null}
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
          }}
        >
          <MaterialIcons
            name={isCollapsed ? "expand-more" : "expand-less"}
            size={isCompactCollapsed ? 18 : 24}
            color="#e5e7eb"
          />
        </View>
      </Pressable>

      <View
        style={{
          height: isCollapsed ? 0 : undefined,
          overflow: "hidden",
        }}
      >
        {latestTeachingEmbed ?? (
          <Pressable
            onPress={openLatestTeaching}
            style={{
              minHeight: 78,
              paddingHorizontal: 14,
              paddingVertical: 12,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 12,
            }}
          >
            <Text
              style={{
                flex: 1,
                fontSize: 11,
                fontWeight: "700",
                color: "#d1d5db",
              }}
            >
              {`M${latestTeaching.month} D${latestTeaching.day} · ${latestTeaching.gregorianDate}`}
            </Text>

            <MaterialIcons name="play-circle" size={34} color="#22c55e" />
          </Pressable>
        )}
      </View>
    </View>
  );
}
