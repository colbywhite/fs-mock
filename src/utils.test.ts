import { wrap } from "./utils";
import { beforeEach, describe, expect, it, vi } from "vitest";
import * as path from "path";

type Func<A extends unknown[] = unknown[], R = unknown> = (...args: A) => R;

export function itShouldWrapFunction<F extends Func>({
  config,
  returnValue,
  args,
  expectedArgs,
  numPathArgs = 1,
}: {
  config: Array<{ root: string; fixture: string }>;
  returnValue: ReturnType<F>;
  args: Parameters<F>;
  expectedArgs: Parameters<F>;
  numPathArgs?: number;
}) {
  let funcToWrap: (...args: Parameters<F>) => ReturnType<F>;

  beforeEach(() => {
    funcToWrap = vi.fn((...args) => returnValue);
  });

  it("should swap paths and return results", () => {
    const wrapped = wrap(config, funcToWrap as Func);
    const result = wrapped(...args);

    expect(result).toEqual(returnValue);
    expect(funcToWrap).toBeCalledTimes(1);
    expect(funcToWrap).lastCalledWith(...expectedArgs);
  });

  Array.from({ length: numPathArgs }, (_, index) => index).forEach((i) => {
    it(`should not swap paths when argument ${i} is a URL`, () => {
      const wrapped = wrap(config, funcToWrap as Func);
      const url = new URL("https://examp.le");
      const newArgs = [...args];
      const newExpectedArgs = [...expectedArgs];
      newArgs[i] = url;
      newExpectedArgs[i] = url;

      const result = wrapped(...newArgs);
      expect(funcToWrap).toBeCalledTimes(1);
      expect(funcToWrap).lastCalledWith(...newExpectedArgs);
      expect(result).toEqual(returnValue);
    });

    it(`should not swap paths when argument ${i} is a Buffer`, () => {
      const wrapped = wrap(config, funcToWrap as Func);
      const buffer = Buffer.from("buffer");
      const newArgs = [...args];
      const newExpectedArgs = [...expectedArgs];
      newArgs[i] = buffer;
      newExpectedArgs[i] = buffer;

      const result = wrapped(...newArgs);
      expect(funcToWrap).toBeCalledTimes(1);
      expect(funcToWrap).lastCalledWith(...newExpectedArgs);
      expect(result).toEqual(returnValue);
    });

    it(`should not swap paths when argument ${i} is a file descriptor`, () => {
      const wrapped = wrap(config, funcToWrap as Func);
      const fd = 0;
      const newArgs = [...args];
      const newExpectedArgs = [...expectedArgs];
      newArgs[i] = fd;
      newExpectedArgs[i] = fd;

      const result = wrapped(...newArgs);
      expect(funcToWrap).toBeCalledTimes(1);
      expect(funcToWrap).lastCalledWith(...newExpectedArgs);
      expect(result).toEqual(returnValue);
    });
  });
}

describe("wrap", () => {
  const PROJECT_DIR = path.join(__dirname, "..");
  const SRC_DIR = path.join(PROJECT_DIR, "src");
  const FIXTURE_DIR = path.join(PROJECT_DIR, "fixtures");
  const UNKNOWN_VALUE_TYPE: unknown = new Date()

  const SRC_PATH = path.join(SRC_DIR, "foo");
  const SECOND_SRC_PATH = path.join(SRC_DIR, "bar");
  const FIXTURE_PATH = path.join(FIXTURE_DIR, "foo");
  const SECOND_FIXTURE_PATH = path.join(FIXTURE_DIR, "bar");

  describe("when function's signature is (KnownPathString) => number", () => {
    itShouldWrapFunction({
      config: [{ root: SRC_DIR, fixture: FIXTURE_DIR }],
      returnValue: 100,
      args: [SRC_PATH],
      expectedArgs: [FIXTURE_PATH],
    });
  });

  describe("when function's signature is (UnknownPathString) => number", () => {
    const unknownPath = path.join("/", "home", path.basename(SRC_PATH));
    itShouldWrapFunction({
      config: [{ root: SRC_DIR, fixture: FIXTURE_DIR }],
      returnValue: 100,
      args: [unknownPath],
      expectedArgs: [unknownPath],
    });
  });

  describe("when function's signature is (NonPathString) => number", () => {
    itShouldWrapFunction({
      config: [{ root: SRC_DIR, fixture: FIXTURE_DIR }],
      returnValue: 100,
      args: ["foo"],
      expectedArgs: ["foo"],
    });
  });

  describe("when function's signature is (unknown) => number", () => {
    itShouldWrapFunction({
      config: [{ root: SRC_DIR, fixture: FIXTURE_DIR }],
      returnValue: 100,
      args: [UNKNOWN_VALUE_TYPE],
      expectedArgs: [UNKNOWN_VALUE_TYPE],
    });
  });

  describe("when function's signature is (KnownPathString, KnownPathString) => number", () => {
    itShouldWrapFunction({
      config: [{ root: SRC_DIR, fixture: FIXTURE_DIR }],
      returnValue: 100,
      args: [SRC_PATH, SECOND_SRC_PATH],
      expectedArgs: [FIXTURE_PATH, SECOND_FIXTURE_PATH],
      numPathArgs: 2,
    });
  });

  describe("when function's signature is (KnownPathString, UnknownPathString) => number", () => {
    const unknownPath = path.join("/", "home", path.basename(SRC_PATH));
    itShouldWrapFunction({
      config: [{ root: SRC_DIR, fixture: FIXTURE_DIR }],
      returnValue: 100,
      args: [SRC_PATH, unknownPath],
      expectedArgs: [FIXTURE_PATH, unknownPath],
      numPathArgs: 2,
    });
  });

  describe("when function's signature is (UnknownPathString, KnownPathString) => number", () => {
    const unknownPath = path.join("/", "home", path.basename(SRC_PATH));
    itShouldWrapFunction({
      config: [{ root: SRC_DIR, fixture: FIXTURE_DIR }],
      returnValue: 100,
      args: [unknownPath, SRC_PATH],
      expectedArgs: [unknownPath, FIXTURE_PATH],
      numPathArgs: 2,
    });
  });

  describe("when function's signature is (KnownPathString, NonPathString) => number", () => {
    itShouldWrapFunction({
      config: [{ root: SRC_DIR, fixture: FIXTURE_DIR }],
      returnValue: 100,
      args: [SRC_PATH, "foo"],
      expectedArgs: [FIXTURE_PATH, "foo"],
      numPathArgs: 2,
    });
  });

  describe("when function's signature is (KnownPathString, unknown) => number", () => {
    const date = new Date();
    itShouldWrapFunction({
      config: [{ root: SRC_DIR, fixture: FIXTURE_DIR }],
      returnValue: 100,
      args: [SRC_PATH, date],
      expectedArgs: [FIXTURE_PATH, date],
    });
  });

  describe("when function's signature is (Path, Path, unknown) => number", () => {
    const date = new Date();
    itShouldWrapFunction({
      config: [{ root: SRC_DIR, fixture: FIXTURE_DIR }],
      returnValue: 100,
      args: [SRC_PATH, SECOND_SRC_PATH, date],
      expectedArgs: [FIXTURE_PATH, SECOND_FIXTURE_PATH, date],
      numPathArgs: 2,
    });
  });
});
