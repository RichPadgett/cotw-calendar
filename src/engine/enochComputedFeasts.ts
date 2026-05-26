import { CalendarNode } from "../models/calendar";

export type ComputedFeasts = {
  firstfruitsDayOfYear: number;
  omerSabbathDaysOfYear: number[];
  shavuotDayOfYear: number;
};

export function computeEnochFeasts(
  nodes: CalendarNode[]
): ComputedFeasts {
  const lambSelectionNode = nodes.find(
    (node) =>
      node.enoch?.month?.number === 1 &&
      node.enoch?.day === 10
  );

  if (!lambSelectionNode?.enoch) {
    throw new Error("Could not find Passover lamb selection day.");
  }

  const firstSabbathAfterLambSelection = nodes.find(
    (node) =>
      (node.enoch?.dayOfYear ?? 0) >
        lambSelectionNode.enoch!.dayOfYear &&
      node.enoch?.events?.some(
        (event) => event.type === "weekly-sabbath"
      )
  );

  if (!firstSabbathAfterLambSelection?.enoch) {
    throw new Error("Could not find Sabbath after lamb selection.");
  }

  const firstfruitsDayOfYear =
    firstSabbathAfterLambSelection.enoch.dayOfYear + 1;

  const omerSabbathDaysOfYear = nodes
    .filter(
      (node) =>
        (node.enoch?.dayOfYear ?? 0) >
          firstfruitsDayOfYear &&
        node.enoch?.events?.some(
          (event) => event.type === "weekly-sabbath"
        )
    )
    .slice(0, 7)
    .map((node) => node.enoch!.dayOfYear);

  if (omerSabbathDaysOfYear.length !== 7) {
    throw new Error("Could not find seven Omer Sabbaths.");
  }

  const shavuotDayOfYear =
    omerSabbathDaysOfYear[6] + 1;

  return {
    firstfruitsDayOfYear,
    omerSabbathDaysOfYear,
    shavuotDayOfYear,
  };
}