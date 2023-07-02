import type { Mock } from "vitest";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import * as path from "path";
import type * as fsModule from "fs";

import buildMockFSFactory from "./index";

describe("buildMockFSFactory", () => {
  const PROJECT_DIR = path.join(__dirname, "..");
  const SRC_DIR = path.join(PROJECT_DIR, "src");
  const FIXTURES = path.join(PROJECT_DIR, "fixtures");
  let fs: typeof fsModule;

  beforeEach(async () => {
    const mockedFs = await buildMockFSFactory([
      { root: SRC_DIR, fixture: FIXTURES },
    ]);
    vi.doMock("fs", mockedFs);
    fs = await import("fs");
  });

  afterEach(() => {
    vi.doUnmock("fs");
  });

  [
    "access",
    "accessSync",
    "chown",
    "chownSync",
    "chmod",
    "chmodSync",
    "cp",
    "cpSync",
    "createReadStream",
    "createWriteStream",
    "exists",
    "existsSync",
    "lchown",
    "lchownSync",
    "lchmod",
    "lchmodSync",
    "lstat",
    "lstatSync",
    "lutimes",
    "lutimesSync",
    "mkdir",
    "mkdirSync",
    "open",
    "openSync",
    "opendir",
    "opendirSync",
    "readdir",
    "readdirSync",
    "readlink",
    "readlinkSync",
    "realpath",
    "realpathSync",
    "rm",
    "rmSync",
    "rmdir",
    "rmdirSync",
    "stat",
    "statfs",
    "statSync",
    "statfsSync",
    "truncate",
    "truncateSync",
    "unwatchFile",
    "unlink",
    "unlinkSync",
    "utimes",
    "utimesSync",
    "watch",
    "watchFile",
  ].map((name) => {
    it(`${name} should be mocked`, () => {
      expect(isMock(fs[name]), `is fs.${name} a mock`).toBe(true);
    });
  });
});

function isMock(f: unknown): f is Mock {
  const context = (f as Mock).mock;
  return context !== undefined && typeof context === "object";
}
