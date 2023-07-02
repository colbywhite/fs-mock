import type { PathOrFileDescriptor } from "fs";
import { vi } from "vitest";

function swapRoots(
  configs: { root: string; fixture: string }[],
  path: PathOrFileDescriptor
) {
  if (typeof path === "string") {
    const config = configs.find(({ root }) => path.startsWith(root));
    if (config) {
      return path.replace(config.root, config.fixture);
    }
  }
  return path;
}

type PathFunctionWithArguments<R = void, A = unknown> = (
  path: PathOrFileDescriptor,
  ...args: A[]
) => R;
type PathFunctionWithoutArguments<R = void> = (path: PathOrFileDescriptor) => R;
export type PathFunction<R = void, A = unknown> =
  | PathFunctionWithArguments<R, A>
  | PathFunctionWithoutArguments<R>;

/**
 * Wraps a given function's path parameter based on the given config.
 */
export function wrap<R, A = unknown>(
  configs: { root: string; fixture: string }[],
  func: PathFunction<R, A>
) {
  return func.length === 1
    ? vi
        .fn()
        .mockImplementation((oldPath: PathOrFileDescriptor) =>
          func(swapRoots(configs, oldPath))
        )
    : vi
        .fn()
        .mockImplementation((oldPath: PathOrFileDescriptor, ...args: A[]) =>
          func(swapRoots(configs, oldPath), ...args)
        );
}
