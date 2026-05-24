import { applyEnochOverlay } from "./enochRules";
import { CalendarNode } from "../models/calendar";

function makeNode(date: string): CalendarNode {
  const [year, month, day] = date.split("-").map(Number);

  return {
    id: date,
    type: "month-day",
    gregorianDate: date,
    gregorian: {
      year,
      month,
      day,
    },
  };
}

const config = {
  enochYear: 2026,
  startsOnGregorianDate: "2026-03-18",
};

describe("applyEnochOverlay", () => {
  it("maps the Enoch new year start date to day 1", () => {
    const [node] = applyEnochOverlay(
      [makeNode("2026-03-18")],
      config
    );

    expect(node.enoch).toMatchObject({
      year: 2026,
      dayOfYear: 1,

      month: {
        number: 1,
        name: "Abib",
      },

      day: 1,
      quarter: 1,
      isIntercalary: false,
    });
  });

  it("maps day 30 to month 1 day 30", () => {
    const [node] = applyEnochOverlay(
      [makeNode("2026-04-16")],
      config
    );

    expect(node.enoch).toMatchObject({
      dayOfYear: 30,

      month: {
        number: 1,
        name: "Abib",
      },

      day: 30,
      quarter: 1,
      isIntercalary: false,
    });
  });

  it("maps day 31 to month 2 day 1", () => {
    const [node] = applyEnochOverlay(
      [makeNode("2026-04-17")],
      config
    );

    expect(node.enoch).toMatchObject({
      dayOfYear: 31,

      month: {
        number: 2,
        name: "Ziv",
      },

      day: 1,
      quarter: 1,
      isIntercalary: false,
    });
  });

  it("maps day 91 to the spring intercalary day", () => {
    const [node] = applyEnochOverlay(
      [makeNode("2026-06-16")],
      config
    );

    expect(node.enoch).toMatchObject({
      dayOfYear: 91,
      quarter: 1,
      isIntercalary: true,
      season: "spring",
      label: "Spring Intercalary Day",
    });

    expect(node.enoch?.month).toBeUndefined();
    expect(node.enoch?.day).toBeUndefined();
  });

  it("maps day 92 to month 4 day 1", () => {
    const [node] = applyEnochOverlay(
      [makeNode("2026-06-17")],
      config
    );

    expect(node.enoch).toMatchObject({
      dayOfYear: 92,

      month: {
        number: 4,
        name: "Tammuz",
      },

      day: 1,
      quarter: 2,
      isIntercalary: false,
    });
  });

  it("throws when date is before the configured Enoch year", () => {
    expect(() =>
      applyEnochOverlay(
        [makeNode("2026-03-17")],
        config
      )
    ).toThrow("Invalid Enoch dayOfYear");
  });
});applyEnochOverlay

it("adds Passover on the 14th day of month 1", () => {
  const [node] = applyEnochOverlay(
    [makeNode("2026-03-31")],
    config
  );

  expect(node.enoch?.events).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        englishName: "Passover",
        hebrewName: "Pesach",
        type: "feast",
      }),
    ])
  );
});

it("adds Unleavened Bread high sabbath on month 1 day 15", () => {
  const [node] = applyEnochOverlay(
    [makeNode("2026-04-01")],
    config
  );

  expect(node.enoch?.events).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        englishName: "First Day of Unleavened Bread",
        isHighSabbath: true,
      }),
    ])
  );
});

it("adds Feast of Trumpets on month 7 day 1", () => {
  const [node] = applyEnochOverlay(
    [makeNode("2026-09-16")],
    config
  );

  expect(node.enoch?.events).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        englishName: "Feast of Trumpets",
        hebrewName: "Yom Teruah",
      }),
    ])
  );
});

it("adds Day of Atonement on month 7 day 10", () => {
  const [node] = applyEnochOverlay(
    [makeNode("2026-09-25")],
    config
  );

  expect(node.enoch?.events).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        englishName: "Day of Atonement",
        hebrewName: "Yom Kippur",
      }),
    ])
  );
});

describe("364-day cycle", () => {
  it("completes after 364 days", () => {
    const start = new Date("2026-03-18");

    const next = new Date(start);

    next.setDate(next.getDate() + 364);

    console.log(next.toISOString());

    expect(next.toISOString().startsWith("2027-03-17"))
      .toBe(true);
  });
});