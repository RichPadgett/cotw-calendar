import { Linking, Pressable, Text, View } from "react-native";

const STUDYBOX_URL = "https://studybox.enochscalendar.com";

export default function ShabbatView() {
  return (
    <View style={{ width: "100%", maxWidth: 760, alignSelf: "center" }}>
      <View
        style={{
          padding: 22,
          borderRadius: 20,
          backgroundColor: "#0b2345",
        }}
      >
        <Text style={{ color: "#ffffff", fontSize: 27, fontWeight: "900" }}>
          Shabbat Gathering
        </Text>
        <Text
          style={{
            marginTop: 8,
            color: "#dbeafe",
            fontSize: 15,
            lineHeight: 22,
          }}
        >
          StudyBox is currently offline. Open it in a new window to check again.
        </Text>
        <Pressable
          accessibilityRole="link"
          onPress={() => void Linking.openURL(STUDYBOX_URL)}
          style={({ pressed }) => ({
            marginTop: 18,
            minHeight: 48,
            paddingHorizontal: 18,
            borderRadius: 14,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: pressed ? "#d6a936" : "#f4c95d",
          })}
        >
          <Text style={{ color: "#172033", fontSize: 16, fontWeight: "900" }}>
            Check StudyBox
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
