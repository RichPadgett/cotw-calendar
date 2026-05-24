// src/engine/buildMonth.test.ts

import { buildMonth } from "./buildMonth";

describe("buildMonth", () => {
  it("builds all days for a 31-day month", () => {
    const nodes = buildMonth(2026, 5);

    expect(nodes).toHaveLength(31);
    expect(nodes[0].gregorianDate).toBe("2026-05-01");
    expect(nodes[30].gregorianDate).toBe("2026-05-31");
  });

  it("builds all days for a 30-day month", () => {
    const nodes = buildMonth(2026, 4);

    expect(nodes).toHaveLength(30);
    expect(nodes[0].gregorianDate).toBe("2026-04-01");
    expect(nodes[29].gregorianDate).toBe("2026-04-30");
  });

  it("handles February in a non-leap year", () => {
    const nodes = buildMonth(2026, 2);

    expect(nodes).toHaveLength(28);
    expect(nodes[0].gregorianDate).toBe("2026-02-01");
    expect(nodes[27].gregorianDate).toBe("2026-02-28");
  });

  it("handles February in a leap year", () => {
    const nodes = buildMonth(2028, 2);

    expect(nodes).toHaveLength(29);
    expect(nodes[0].gregorianDate).toBe("2028-02-01");
    expect(nodes[28].gregorianDate).toBe("2028-02-29");
  });
});
