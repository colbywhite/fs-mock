import type * as fs from "fs";
import { wrap } from "./utils";

export default async function buildMockFSFactory(
  configs: { root: string; fixture: string }[] = []
): Promise<() => typeof fs> {
  const original = await import("fs");
  return () => ({
    ...original,
    existsSync: wrap(configs, original.existsSync),
    readdirSync: wrap(configs, original.readdirSync),
  });
}
