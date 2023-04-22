import fsFactory from "./index";
import { beforeEach, describe, expect, it } from "vitest";
import * as path from "path";
import type * as fs from "fs";

describe("fsFactory", () => {
  const PROJECT_DIR = path.join(__dirname, "..");
  const SRC_DIR = path.join(PROJECT_DIR, "src");
  const FIXTURES = path.join(PROJECT_DIR, "fixtures");
  const EXISTING_DIR = path.join(SRC_DIR, "existent");

  let mockedFs: typeof fs;

  beforeEach(async () => {
    const factory = fsFactory([{ root: SRC_DIR, fixture: FIXTURES }]);
    mockedFs = await factory(() => import("fs"));
  });

  describe("existsSync", () => {
    it("should return true when dir exists in fixture dir", async () => {
      expect(mockedFs.existsSync(EXISTING_DIR)).toBe(true);
    });

    it("should return false when dir does not exist in fixture dir", async () => {
      const missingDir = path.join(SRC_DIR, "missing");
      expect(mockedFs.existsSync(missingDir)).toBe(false);
    });
  });

  describe("readdirSync", () => {
    it("should return results from the fixture dir", async () => {
      expect(mockedFs.readdirSync(EXISTING_DIR)).toEqual([".gitignore"]);
    });
  });
});
