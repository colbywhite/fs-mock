import type * as fs from "fs";
import { vi } from "vitest";

/**
 * A version of vitest's MockFactoryWithHelper type, but with better generics and return type.
 */
type MockFactoryWithHelper<T = unknown> = (
  importOriginal: () => Promise<T>
) => Promise<T>;
type FsModule = typeof fs;

export default function fsFactory(
  configs: { root: string; fixture: string }[] = []
): MockFactoryWithHelper<FsModule> {
  function swapRoots(dir: string) {
    const config = configs.find(({ root }) => dir.startsWith(root));
    if (config) {
      return dir.replace(config.root, config.fixture);
    }
    return dir;
  }

  return async (originalFs: () => Promise<FsModule>) => {
    const original = await originalFs();
    const existsSync: FsModule["existsSync"] = vi
      .fn()
      .mockImplementation((path: string) => {
        const newPath = swapRoots(path);
        return original.existsSync(newPath);
      });
    const readdirSync: FsModule["readdirSync"] = vi
      .fn()
      .mockImplementation(
        (path: string, options: Parameters<FsModule["readdirSync"]>[1]) => {
          const newPath = swapRoots(path);
          return original.readdirSync(newPath, options);
        }
      );
    return {
      ...original,
      existsSync,
      readdirSync,
    } as FsModule;
  };
}
