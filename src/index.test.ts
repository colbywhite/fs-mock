import { doWork } from "./index";
import { describe, it, expect } from "vitest";

describe("doWork", () => {
  it("should return nothing when nothing is given", async () => {
    const x = await doWork();
    expect(x).toBeUndefined();
  });
  it("should return what is given", async () => {
    const x = await doWork(3);
    expect(x).toEqual(3);
  });
});
