/*
 * File: src/utils/appDay.test.ts
 * Purpose: Automated test coverage for nearby app or engine behavior.
 */

import { formatGroupLabel, getAppDateId } from "./appDay";

describe("app day helpers", () => {
  it("keeps the previous local date before the 6 AM rollover", () => {
    const date = new Date(2026, 5, 6, 5, 59, 0);

    expect(getAppDateId(date)).toBe("2026-06-05");
  });

  it("uses the current local date at the 6 AM rollover", () => {
    const date = new Date(2026, 5, 6, 6, 0, 0);

    expect(getAppDateId(date)).toBe("2026-06-06");
  });

  it("formats group codes as readable labels", () => {
    expect(formatGroupLabel("church-of-the-word")).toBe("Church Of The Word");
    expect(formatGroupLabel("public")).toBe("Public");
  });
});
