// src/components/calendar/DayCell.tsx

import { Image, Pressable, Text, View } from "react-native";

import { CalendarNode } from "../../models/calendar";

import ScrollIcon from "../../../assets/enoch/icons/scroll.png";

type Props = {
  node: CalendarNode;
  onPressDay?: (node: CalendarNode) => void;
};

function getTodayDateId(): string {
  const date = new Date();

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function DayCell({ node, onPressDay }: Props) {
  const DEV_TODAY_ID = getTodayDateId();

  const todayId = __DEV__
    ? DEV_TODAY_ID
    : new Date().toISOString().slice(0, 10);

  const isToday = node.gregorianDate === todayId;

  const enoch = node.enoch;

  const nonWeeklyEvents =
  enoch?.events?.filter(
    (event) => event.type !== "weekly-sabbath"
  ) ?? [];

const weeklyEvents =
  enoch?.events?.filter(
    (event) => event.type === "weekly-sabbath"
  ) ?? [];

const displayEvents =
  nonWeeklyEvents.length > 0
    ? nonWeeklyEvents
    : weeklyEvents;

const visibleEvents = displayEvents.slice(0, 2);

  const hasNotes = isToday;

  const sabbathEvent = enoch?.events?.find(
    (event) =>
      event.type === "weekly-sabbath" ||
      event.type === "high-sabbath"
  );

  const isHighSabbath = sabbathEvent?.type === "high-sabbath";

  const footerColor = enoch?.month?.themeColor ?? "#f3f4f6";

/*
  Parse safely as local calendar date
  to avoid timezone rollback.
*/
const [gYear, gMonth, gDay] =
  node.gregorianDate
    .split("-")
    .map(Number);

const gregorianDate = new Date(
  gYear,
  gMonth - 1,
  gDay
);

const gregorianDay =
  gregorianDate.toLocaleDateString(
    "en-US",
    {
      day: "numeric",
    }
  );

const gregorianMonth =
  gregorianDate.toLocaleDateString(
    "en-US",
    {
      month: "short",
    }
  );

  return (
    <Pressable onPress={() => onPressDay?.(node)}>
      <View
        style={{
          height: 120,
          borderRadius: 14,
          borderWidth: isToday ? 3 : 1.5,
          borderColor: isToday ? "#2563eb" : "#d1d5db",
          backgroundColor: "#f9fafb",
          overflow: "hidden",
        }}
      >
        <View
          style={{
            flex: 1,
            paddingHorizontal: 6,
            paddingVertical: 6,
          }}
        >
          {hasNotes && (
            <Image
              source={ScrollIcon}
              style={{
                position: "absolute",

                bottom: 0,
                left: 0,

                width: 18,
                height: 18,

                opacity: 0.95,

                zIndex: 30,
              }}
              resizeMode="contain"
            />
          )}

          <View
            style={{
              position: "absolute",
              top: 6,
              right: 6,
              zIndex: 10,
            }}
          >
            {enoch?.month?.symbolImage && (
              <Image
                source={enoch.month.symbolImage}
                style={{
                  width: 14,
                  height: 14,
                  opacity: 0.7,
                }}
                resizeMode="contain"
              />
            )}
          </View>

          {sabbathEvent && (
            <View
              style={{
                position: "absolute",
                top: 22,
                right: 6,
                zIndex: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "700",
                  color: isHighSabbath ? "#ca8a04" : "#2563eb",
                }}
              >
                𐤔
              </Text>
            </View>
          )}

          <Text
            numberOfLines={1}
            style={{
              fontSize: 18,
              lineHeight: 28,
              fontWeight: "800",
              color: "#000000",
            }}
          >
            {enoch?.day}
          </Text>

          <View
            style={{
              marginTop: 6,
              gap: 3,
            }}
          >
            {visibleEvents.map((event) => (
              <View
                key={event.id}
                style={{
                  alignSelf: "flex-start",
                  maxWidth: 52,
                  paddingHorizontal: 5,
                  paddingVertical: 2,
                  borderRadius: 999,
                  backgroundColor: event.color,
                }}
              >
                <Text
                  numberOfLines={1}
                  adjustsFontSizeToFit
                  minimumFontScale={0.7}
                  style={{
                    fontSize: 8,
                    fontWeight: "700",
                    color: "white",
                  }}
                >
                  {event.shortName ?? event.englishName}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <View style={{ height: 24 }}>
          <View
            style={{
              height: 3,
              backgroundColor: footerColor,
            }}
          />

          <View
            style={{
              height: 21,
              paddingHorizontal: 2,
              backgroundColor: "#f3f4f6",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              numberOfLines={1}
              style={{
                fontSize: 8,
                lineHeight: 10,
                fontWeight: "600",
                color: "#6b7280",
                textAlign: "center",
              }}
            >
              {gregorianDay} | {gregorianMonth}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}