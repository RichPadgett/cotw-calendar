import { ScrollView } from "react-native";

import { buildEnochYear } from "../src/engine/buildEnochYear";
import YearView from "../src/components/calendar/YearView";
import MonthHeader from "../src/components/calendar/MonthHeader";

export default function HomeScreen() {
  const config = {
    enochYear: 2026,
    startsOnGregorianDate: "2026-03-18",
  };

  const nodes = buildEnochYear(config);

  const currentMonth = nodes.find(
    (node) => !node.enoch?.isIntercalary && node.enoch?.month
  )?.enoch?.month;

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "#ffffff",
      }}
      contentContainerStyle={{
        paddingHorizontal: 16,
        paddingTop: 56,
        paddingBottom: 24,
      }}
    >
      <MonthHeader
        month={currentMonth}
        gregorianLabel={`Enoch Year ${config.enochYear}`}
      />

      <YearView nodes={nodes} />
    </ScrollView>
  );
}