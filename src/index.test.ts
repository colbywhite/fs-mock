import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import * as path from "path";

import buildMockFSFactory from "./index";

describe("fsFactory", () => {
  const PROJECT_DIR = path.join(__dirname, "..");
  const SRC_DIR = path.join(PROJECT_DIR, "src");
  const FIXTURES = path.join(PROJECT_DIR, "fixtures");
  const EXISTING_DIR = path.join(SRC_DIR, "existent");

  beforeEach(async () => {
    const mockedFs = await buildMockFSFactory([
      { root: SRC_DIR, fixture: FIXTURES },
    ]);
    vi.doMock("fs", mockedFs);
  });

  afterEach(() => {
    vi.doUnmock("fs");
  });

  describe("existsSync", () => {
    it("should return true when dir exists in fixture dir", async () => {
      const fs = await import("fs");
      expect(fs.existsSync(EXISTING_DIR)).toBe(true);
    });

    it("should return false when dir does not exist in fixture dir", async () => {
      const missingDir = path.join(SRC_DIR, "missing");
      const fs = await import("fs");
      expect(fs.existsSync(missingDir)).toBe(false);
    });
  });

  describe("readdirSync", () => {
    it("should return results from the fixture dir", async () => {
      const fs = await import("fs");
      expect(fs.readdirSync(EXISTING_DIR)).toEqual([".gitignore"]);
    });
  });
});
