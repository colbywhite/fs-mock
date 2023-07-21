import type { PathLike, PathOrFileDescriptor } from "fs";
import type { Mock } from "vitest";
import { vi } from "vitest";
import path from "path";

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

function isPath(val: unknown): val is PathLike {
  return (
    val !== undefined &&
    val !== null &&
    typeof val === "string" &&
    (path.isAbsolute(val) ||
      val.includes(path.sep) ||
      val.includes(".") ||
      val.includes(".."))
  );
}

function trimUndefinedValues<A = unknown>(...args: A[]) {
  return args.filter((a) => a !== undefined);
}

/**
 * Wraps a given function's path parameter based on the given config.
 */
export function wrap<F extends (...args: unknown[]) => R, R>(
  configs: { root: string; fixture: string }[],
  func: F
): Mock<Parameters<F>, ReturnType<F>> {
  // TODO throw error for unexpected function names
  if (typeof func !== "function") {
    throw new Error("wrap was not passed a function");
  }
  const implementation = (
    argOne: unknown,
    argTwo: unknown,
    ...extraArgs: unknown[]
  ) => {
    const newArgOne = isPath(argOne) ? swapRoots(configs, argOne) : argOne;
    const newArgTwo = isPath(argTwo) ? swapRoots(configs, argTwo) : argTwo;
    return func(...trimUndefinedValues(newArgOne, newArgTwo, ...extraArgs));
  };
  return vi.fn(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    implementation as any as (...args: Parameters<F>) => ReturnType<F>
  );
}
