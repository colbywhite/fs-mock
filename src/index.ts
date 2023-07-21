import type * as fs from "fs";
import type { PathFunction } from "./utils";
import { wrap } from "./utils";
import { FS_PATH_FUNCTIONS_TO_MOCK } from "./constants";
import type { Mock } from "vitest";

export default async function buildMockFSFactory(
  configs: { root: string; fixture: string }[] = []
) {
  const original = await import("fs");
  const mockedFs: Partial<Record<(typeof FS_PATH_FUNCTIONS_TO_MOCK)[number], Mock>> =
    {};
  for (const key of FS_PATH_FUNCTIONS_TO_MOCK) {
    if (typeof original[key] === "function" && original[key].length >= 1) {
      mockedFs[key] = wrap(configs, original[key] as PathFunction);
    }
  }

  return () =>
    ({
      ...original,
      ...mockedFs,
    } as typeof fs);
}
