// src/components/calendar/DayCell.tsx

import { Image, Text, View } from "react-native";

import { CalendarNode } from "../../models/calendar";

type Props = {
  node: CalendarNode;
};

export function DayCell({ node }: Props) {
  /*
    ============================================================
    DEVELOPMENT TODAY OVERRIDE
    ============================================================

    Lets us visually test the "today" styling
    while browsing historical/future months.
  */

  const DEV_TODAY_ID = "2026-05-17";

  const todayId = __DEV__
    ? DEV_TODAY_ID
    : new Date().toISOString().slice(0, 10);

  const isToday = node.gregorianDate === todayId;

  /*
    ============================================================
    ENOCH DATA
    ============================================================
  */

  const enoch = node.enoch;

  const primaryEvent = enoch?.events?.[0];

  /*
    ============================================================
    SEASON / MONTH COLOR
    ============================================================

    Used for the small footer season strip.
  */

  const footerColor =
    enoch?.month?.themeColor ?? "#f3f4f6";

  /*
    ============================================================
    GREGORIAN FOOTER DATE
    ============================================================
  */

  const gregorianDay = new Date(
    node.gregorianDate
  ).toLocaleDateString("en-US", {
    day: "numeric",
  });

  const gregorianMonth = new Date(
    node.gregorianDate
  ).toLocaleDateString("en-US", {
    month: "short",
  });

  /*
    ============================================================
    RENDER
    ============================================================
  */

  return (
    <View
      style={{
        /*
          Main cell dimensions
        */
        height: 120,

        /*
          Rounded card appearance
        */
        borderRadius: 14,

        /*
          Today highlighting
        */
        borderWidth: isToday ? 3 : 1.5,

        borderColor: isToday
          ? "#2563eb"
          : "#d1d5db",

        /*
          Neutral main background
        */
        backgroundColor: "#f9fafb",

        /*
          Prevent child overflow
        */
        overflow: "hidden",
      }}
    >
      {/* ======================================================
          MAIN CONTENT AREA
      ====================================================== */}

      <View
        style={{
          flex: 1,

          paddingHorizontal: 6,
          paddingVertical: 6,
        }}
      >
        {/* ==================================================
            MINI MONTH ICON
        ================================================== */}

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

        {/* ==================================================
            ENOCH DAY NUMBER
        ================================================== */}

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

        {/* ==================================================
            PRIMARY EVENT BADGE
        ================================================== */}

        {primaryEvent && (
          <View
            style={{
              marginTop: 6,

              paddingHorizontal: 5,
              paddingVertical: 2,

              borderRadius: 999,

              backgroundColor:
                primaryEvent.color,
            }}
          >
            <Text
              numberOfLines={1}
              style={{
                fontSize: 8,
                fontWeight: "700",

                color: "white",
              }}
            >
              {primaryEvent.englishName}
            </Text>
          </View>
        )}
      </View>

      {/* ======================================================
          FOOTER AREA
      ====================================================== */}

      <View
        style={{
          height: 24,
        }}
      >
        {/* ==================================================
            SEASON / MONTH COLOR STRIP
        ================================================== */}

        <View
          style={{
            height: 3,

            backgroundColor: footerColor,
          }}
        />

        {/* ==================================================
            GREGORIAN DATE FOOTER
        ================================================== */}

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
  );
}