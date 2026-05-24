function formatDateOnly(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function addDays(dateString: string, days: number): string {
  const date = new Date(`${dateString}T00:00:00`);
  date.setDate(date.getDate() + days);

  return formatDateOnly(date);
}

describe("Enoch year cycle with Sabbath-week reset", () => {
  it("adds a 7-day Sabbath week reset every 6th year", () => {
    const startYear = 2026;
    const startDate = "2026-03-18";

    const results = [];

    let currentStartDate = startDate;

    for (let index = 0; index < 15; index++) {
      const enochYear = startYear + index;

      results.push({
        enochYear,
        abib1GregorianDate: currentStartDate,
      });

      const shouldAddSabbathWeek =
        (index + 1) % 6 === 0;

      currentStartDate = addDays(
        currentStartDate,
        shouldAddSabbathWeek ? 371 : 364
      );
    }

    console.table(results);

    expect(results).toEqual([
      { enochYear: 2026, abib1GregorianDate: "2026-03-18" },
      { enochYear: 2027, abib1GregorianDate: "2027-03-17" },
      { enochYear: 2028, abib1GregorianDate: "2028-03-15" },
      { enochYear: 2029, abib1GregorianDate: "2029-03-14" },
      { enochYear: 2030, abib1GregorianDate: "2030-03-13" },
      { enochYear: 2031, abib1GregorianDate: "2031-03-12" },

      // Sabbath week reset after 2031 cycle
      { enochYear: 2032, abib1GregorianDate: "2032-03-17" },

      { enochYear: 2033, abib1GregorianDate: "2033-03-16" },
      { enochYear: 2034, abib1GregorianDate: "2034-03-15" },
      { enochYear: 2035, abib1GregorianDate: "2035-03-14" },
      { enochYear: 2036, abib1GregorianDate: "2036-03-12" },
      { enochYear: 2037, abib1GregorianDate: "2037-03-11" },

      // Sabbath week reset after 2037 cycle
      { enochYear: 2038, abib1GregorianDate: "2038-03-17" },

      { enochYear: 2039, abib1GregorianDate: "2039-03-16" },
      { enochYear: 2040, abib1GregorianDate: "2040-03-14" },
    ]);
  });
});