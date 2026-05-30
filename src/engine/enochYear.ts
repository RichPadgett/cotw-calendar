// Calendar baseline and app configuration
const BASE_ENOCH_YEAR = 2026;
const BASE_START_DATE = "2026-03-18";

// Date helpers
/**
 * Calculates the Gregorian start date for a requested Enoch year.
 * This date helper advances from the configured base year and accounts for sabbath-week year offsets.
 */
export function getEnochYearStartDate(targetYear: number): string {
  let currentStartDate = BASE_START_DATE;

  for (let year = BASE_ENOCH_YEAR; year < targetYear; year++) {
    const completedYearNumber = year - BASE_ENOCH_YEAR + 1;
    const hasSabbathWeekAfterYear = completedYearNumber % 6 === 0;

    currentStartDate = addDays(
      currentStartDate,
      hasSabbathWeekAfterYear ? 371 : 364
    );
  }

  return currentStartDate;
}

/**
 * Adds calendar days to a YYYY-MM-DD string using UTC date math.
 * This keeps year-start calculations stable across local timezone boundaries.
 */
function addDays(dateString: string, days: number): string {
  const [year, month, day] = dateString.split("-").map(Number);

  const date = new Date(Date.UTC(year, month - 1, day));
  date.setUTCDate(date.getUTCDate() + days);

  const nextYear = date.getUTCFullYear();
  const nextMonth = String(date.getUTCMonth() + 1).padStart(2, "0");
  const nextDay = String(date.getUTCDate()).padStart(2, "0");

  return `${nextYear}-${nextMonth}-${nextDay}`;
}