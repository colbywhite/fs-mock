import { describe, expect, it, vi } from "vitest";
import * as path from "path";
import { wrap } from "./utils";

describe("wrap", () => {
  const PROJECT_DIR = path.join(__dirname, "..");
  const SRC_DIR = path.join(PROJECT_DIR, "src");
  const FIXTURES = path.join(PROJECT_DIR, "fixtures");
  const config = [{ root: SRC_DIR, fixture: FIXTURES }];
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const NO_OP = () => {};

  it("should swap paths when there's only one argument", () => {
    const toWrap = vi.fn().mockImplementation(NO_OP);
    const wrapped = wrap(config, toWrap);
    wrapped(path.join(SRC_DIR, "foo"));
    expect(toWrap).toBeCalledTimes(1);
    expect(toWrap).lastCalledWith(path.join(FIXTURES, "foo"));
  });

  it("should return results when there's only one argument", () => {
    const toWrap = vi.fn().mockImplementation(() => 100);
    const wrapped = wrap(config, toWrap);
    const result = wrapped(path.join(SRC_DIR, "foo"));
    expect(toWrap).toBeCalledTimes(1);
    expect(toWrap).lastCalledWith(path.join(FIXTURES, "foo"));
    expect(result).toEqual(100);
  });

  it("should swap paths when there's multiple arguments", () => {
    const toWrap = vi.fn().mockImplementation(NO_OP);
    const wrapped = wrap(config, toWrap);
    const extraArgs = { foo: true, bar: 8 };
    wrapped(path.join(SRC_DIR, "foo"), extraArgs);
    expect(toWrap).toBeCalledTimes(1);
    expect(toWrap).lastCalledWith(path.join(FIXTURES, "foo"), extraArgs);
  });

  it("should return results when there's multiple arguments", () => {
    const toWrap = vi.fn().mockImplementation(() => 100);
    const wrapped = wrap(config, toWrap);
    const extraArgs = { foo: true, bar: 8 };
    const result = wrapped(path.join(SRC_DIR, "foo"), extraArgs);
    expect(toWrap).toBeCalledTimes(1);
    expect(toWrap).lastCalledWith(path.join(FIXTURES, "foo"), extraArgs);
    expect(result).toEqual(100);
  });

  it("should ignore swapping when the path is a URL", () => {
    const toWrap = vi.fn().mockImplementation(NO_OP);
    const wrapped = wrap(config, toWrap);
    const url = new URL("https://examp.le");
    wrapped(url);
    expect(toWrap).toBeCalledTimes(1);
    expect(toWrap).lastCalledWith(url);
  });

  it("should ignore swapping when the path is a Buffer", () => {
    const toWrap = vi.fn().mockImplementation(NO_OP);
    const wrapped = wrap(config, toWrap);
    const buffer = new Buffer("foo");
    wrapped(buffer);
    expect(toWrap).toBeCalledTimes(1);
    expect(toWrap).lastCalledWith(buffer);
  });
});
