/*
 * File: src/components/navigation/AppNavigationMenu.tsx
 * Purpose: Responsive primary navigation rail and mobile drawer.
 */

import { ReactNode, useState } from "react";
import {
  Modal,
  Pressable,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export type AppTab =
  | "calendar"
  | "shabbat"
  | "timeline"
  | "commands"
  | "hebrew"
  | "library";

type Props = {
  activeTab: AppTab;
  groupLabel: string;
  userRole: "member" | "admin";
  isTimelineVisible: boolean;
  isShabbatVisible: boolean;
  onChangeTab: (tab: AppTab) => void;
  onChangeGroup: () => void;
  onOpenLatestTeaching: () => void;
  onOpenCalendarSubscription: () => void;
  latestTeachingPlayer?: ReactNode;
};

const TAB_DEFINITIONS: {
  id: AppTab;
  label: string;
  icon: keyof typeof MaterialIcons.glyphMap;
}[] = [
  { id: "calendar", label: "Calendar", icon: "calendar-month" },
  { id: "shabbat", label: "Shabbat", icon: "groups" },
  { id: "timeline", label: "Timeline", icon: "timeline" },
  { id: "commands", label: "Commands", icon: "menu-book" },
  { id: "hebrew", label: "Language", icon: "translate" },
  { id: "library", label: "Library", icon: "video-library" },
];

export default function AppNavigationMenu(props: Props) {
  const { width } = useWindowDimensions();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const isDesktop = width >= 900;
  const isMenuExpanded = isExpanded || Boolean(props.latestTeachingPlayer);
  const tabs = TAB_DEFINITIONS.filter(
    (tab) =>
      (tab.id !== "timeline" || props.isTimelineVisible) &&
      (tab.id !== "shabbat" || props.isShabbatVisible)
  );

  function selectTab(tab: AppTab) {
    props.onChangeTab(tab);
    setIsDrawerOpen(false);
  }

  const menuItems = (
    <View style={{ gap: 6 }}>
      {tabs.map((tab) => {
        const isActive = props.activeTab === tab.id;
        return (
          <NavigationItem
            key={tab.id}
            icon={tab.icon}
            label={tab.label}
            isActive={isActive}
            showLabel={!isDesktop || isMenuExpanded}
            onPress={() => selectTab(tab.id)}
          />
        );
      })}
    </View>
  );

  const identityFooter = (
    <View style={{ gap: 8 }}>
      <NavigationItem
        icon="event-available"
        label="Calendar Subscription"
        showLabel={!isDesktop || isMenuExpanded}
        onPress={() => {
          props.onOpenCalendarSubscription();
          setIsDrawerOpen(false);
        }}
      />

      <NavigationItem
        icon="podcasts"
        label="Latest Teaching"
        showLabel={!isDesktop || isMenuExpanded}
        onPress={() => {
          props.onOpenLatestTeaching();
          setIsExpanded(true);
        }}
      />

      {props.latestTeachingPlayer ? (
        <View
          accessibilityLabel="Menu teaching player"
          style={{ width: "100%" }}
        >
          {props.latestTeachingPlayer}
        </View>
      ) : null}

      <View
        accessibilityLabel={`${props.groupLabel}, ${props.userRole}`}
        style={{
          minHeight: 44,
          paddingHorizontal: isDesktop && !isMenuExpanded ? 0 : 11,
          borderRadius: 12,
          alignItems: "center",
          justifyContent:
            isDesktop && !isMenuExpanded ? "center" : "flex-start",
          backgroundColor: "#eef2ff",
        }}
      >
        {isDesktop && !isMenuExpanded ? (
          <MaterialIcons
            name={props.userRole === "admin" ? "admin-panel-settings" : "group"}
            size={23}
            color="#3730a3"
          />
        ) : (
          <View style={{ paddingVertical: 8 }}>
            <Text
              numberOfLines={1}
              style={{ fontSize: 12, fontWeight: "900", color: "#312e81" }}
            >
              {props.groupLabel}
            </Text>
            <Text
              style={{
                marginTop: 2,
                fontSize: 11,
                color: "#6366f1",
                textTransform: "capitalize",
              }}
            >
              {props.userRole}
            </Text>
          </View>
        )}
      </View>

      <NavigationItem
        icon="logout"
        label="Change group"
        showLabel={!isDesktop || isMenuExpanded}
        onPress={props.onChangeGroup}
      />
    </View>
  );

  if (isDesktop) {
    return (
      <View
        style={{
          width: isMenuExpanded ? 320 : 64,
          paddingHorizontal: 8,
          paddingVertical: 14,
          borderRightWidth: 1,
          borderRightColor: "#e2e8f0",
          backgroundColor: "#f8fafc",
          justifyContent: "space-between",
        }}
      >
        <View style={{ gap: 14 }}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={
              isMenuExpanded ? "Collapse navigation" : "Expand navigation"
            }
            onPress={() => setIsExpanded((value) => !value)}
            style={({ pressed }) => ({
              minHeight: 44,
              borderRadius: 12,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: isMenuExpanded ? "flex-start" : "center",
              paddingHorizontal: isMenuExpanded ? 12 : 0,
              gap: 10,
              backgroundColor: "#163d2b",
              opacity: pressed ? 0.82 : 1,
            })}
          >
            <MaterialIcons name="menu" size={23} color="#ffffff" />
            {isMenuExpanded ? (
              <Text style={{ fontWeight: "900", color: "#ffffff" }}>
                Enoch&apos;s Calendar
              </Text>
            ) : null}
          </Pressable>
          {menuItems}
        </View>
        {identityFooter}
      </View>
    );
  }

  return (
    <>
      <View
        style={{
          minHeight: 52,
          paddingHorizontal: 12,
          borderBottomWidth: 1,
          borderBottomColor: "#e2e8f0",
          backgroundColor: "#ffffff",
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
        }}
      >
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Open navigation menu"
          onPress={() => setIsDrawerOpen(true)}
          style={({ pressed }) => ({
            width: 38,
            height: 38,
            borderRadius: 11,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#163d2b",
            opacity: pressed ? 0.82 : 1,
          })}
        >
          <MaterialIcons name="menu" size={23} color="#ffffff" />
        </Pressable>
        <Text
          style={{ flex: 1, fontSize: 15, fontWeight: "900", color: "#10231a" }}
        >
          {tabs.find((tab) => tab.id === props.activeTab)?.label ??
            "Enoch's Calendar"}
        </Text>
        <MaterialIcons
          name={props.userRole === "admin" ? "admin-panel-settings" : "group"}
          size={22}
          color="#4f6d3a"
        />
      </View>

      <Modal
        visible={isDrawerOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setIsDrawerOpen(false)}
      >
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Close navigation menu"
          onPress={() => setIsDrawerOpen(false)}
          style={{ flex: 1, backgroundColor: "rgba(15,23,42,0.42)" }}
        >
          <Pressable
            onPress={(event) => event.stopPropagation()}
            style={{
              width: "82%",
              maxWidth: 320,
              height: "100%",
              padding: 16,
              backgroundColor: "#f8fafc",
              justifyContent: "space-between",
            }}
          >
            <View style={{ gap: 16 }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{ fontSize: 18, fontWeight: "900", color: "#10231a" }}
                >
                  Enoch&apos;s Calendar
                </Text>
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel="Close navigation menu"
                  onPress={() => setIsDrawerOpen(false)}
                >
                  <MaterialIcons name="close" size={25} color="#475569" />
                </Pressable>
              </View>
              {menuItems}
            </View>
            {identityFooter}
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}

function NavigationItem({
  icon,
  label,
  isActive = false,
  showLabel,
  onPress,
}: {
  icon: keyof typeof MaterialIcons.glyphMap;
  label: string;
  isActive?: boolean;
  showLabel: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
      style={({ pressed }) => ({
        minHeight: 44,
        paddingHorizontal: showLabel ? 12 : 0,
        borderRadius: 12,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: showLabel ? "flex-start" : "center",
        gap: 11,
        backgroundColor: isActive ? "#dcfce7" : "transparent",
        opacity: pressed ? 0.72 : 1,
      })}
    >
      <MaterialIcons
        name={icon}
        size={22}
        color={isActive ? "#166534" : "#64748b"}
      />
      {showLabel ? (
        <Text
          style={{
            fontSize: 13,
            fontWeight: "900",
            color: isActive ? "#166534" : "#475569",
          }}
        >
          {label}
        </Text>
      ) : null}
    </Pressable>
  );
}
