import type * as fs from "fs";

export const SINGLE_PATH_FUNCTIONS = [
  /**
   * export function unlinkSync(path: PathLike): void;
   * @typedef { import('fs').unlinkSync } unlinkSync
   */
  "unlinkSync",
  /**
   * export function existsSync(path: PathLike): boolean;
   * @typedef { import('fs').existsSync } existsSync
   */
  "existsSync",
] as const;

export const TWO_PATH_FUNCTIONS = [
  /**
   * export function renameSync(oldPath: PathLike, newPath: PathLike): void;
   * @typedef { import('fs').renameSync } renameSync
   */
  "renameSync",
  /**
   * export function linkSync(existingPath: PathLike, newPath: PathLike): void;
   * @typedef { import('fs').linkSync } linkSync
   */
  "linkSync",
] as const;

export const SINGLE_PATH_FUNCTIONS_WITH_EXTRA_ARGUMENTS = [
  /**
   * export function truncate(path: PathLike, len: number | undefined | null, callback: NoParamCallback): void;
   * export function truncate(path: PathLike, callback: NoParamCallback): void;
   * @typedef { import('fs').truncate } truncate
   */
  "truncate",
  /**
   * export function truncateSync(path: PathLike, len?: number | null): void;
   * @typedef { import('fs').truncateSync } truncateSync
   */
  "truncateSync",
  /**
   * export function chown(path: PathLike, uid: number, gid: number, callback: NoParamCallback): void;
   * @typedef { import('fs').chown } chown
   */
  "chown",
  /**
   * export function chownSync(path: PathLike, uid: number, gid: number): void;
   * @typedef { import('fs').chownSync } chownSync
   */
  "chownSync",
  /**
   * export function lchown(path: PathLike, uid: number, gid: number, callback: NoParamCallback): void;
   */
  "lchown",
  /**
   * export function lchownSync(path: PathLike, uid: number, gid: number): void;
   */
  "lchownSync",
  /**
   * export function lutimes(path: PathLike, atime: TimeLike, mtime: TimeLike, callback: NoParamCallback): void;
   */
  "lutimes",
  /**
   * export function lutimesSync(path: PathLike, atime: TimeLike, mtime: TimeLike): void;
   */
  "lutimesSync",
  /**
   * export function chmod(path: PathLike, mode: Mode, callback: NoParamCallback): void;
   */
  "chmod",
  /**
   * export function chmodSync(path: PathLike, mode: Mode): void;
   */
  "chmodSync",
  /**
   * export function lchmod(path: PathLike, mode: Mode, callback: NoParamCallback): void;
   */
  "lchmod",

  /**
   * export function lchmodSync(path: PathLike, mode: Mode): void;
   */
  "lchmodSync",
  /**
   * export function stat(path: PathLike, callback: (err: NodeJS.ErrnoException | null, stats: Stats) => void): void;
   * export function stat(
   *     path: PathLike,
   *     options:
   *         | (StatOptions & {
   *               bigint?: false | undefined;
   *           })
   *         | undefined,
   *     callback: (err: NodeJS.ErrnoException | null, stats: Stats) => void
   * ): void;
   * export function stat(
   *     path: PathLike,
   *     options: StatOptions & {
   *         bigint: true;
   *     },
   *     callback: (err: NodeJS.ErrnoException | null, stats: BigIntStats) => void
   * ): void;
   * export function stat(path: PathLike, options: StatOptions | undefined, callback: (err: NodeJS.ErrnoException | null, stats: Stats | BigIntStats) => void): void;
   */
  "stat",
  /**
   * export interface StatSyncFn extends Function {
   *     (path: PathLike, options?: undefined): Stats;
   *     (
   *         path: PathLike,
   *         options?: StatSyncOptions & {
   *             bigint?: false | undefined;
   *             throwIfNoEntry: false;
   *         }
   *     ): Stats | undefined;
   *     (
   *         path: PathLike,
   *         options: StatSyncOptions & {
   *             bigint: true;
   *             throwIfNoEntry: false;
   *         }
   *     ): BigIntStats | undefined;
   *     (
   *         path: PathLike,
   *         options?: StatSyncOptions & {
   *             bigint?: false | undefined;
   *         }
   *     ): Stats;
   *     (
   *         path: PathLike,
   *         options: StatSyncOptions & {
   *             bigint: true;
   *         }
   *     ): BigIntStats;
   *     (
   *         path: PathLike,
   *         options: StatSyncOptions & {
   *             bigint: boolean;
   *             throwIfNoEntry?: false | undefined;
   *         }
   *     ): Stats | BigIntStats;
   *     (path: PathLike, options?: StatSyncOptions): Stats | BigIntStats | undefined;
   * }
   */
  "statSync",
  "lstatSync",
  /**
   * export function lstat(path: PathLike, callback: (err: NodeJS.ErrnoException | null, stats: Stats) => void): void;
   * export function lstat(
   *     path: PathLike,
   *     options:
   *         | (StatOptions & {
   *       bigint?: false | undefined;
   *     })
   *         | undefined,
   *     callback: (err: NodeJS.ErrnoException | null, stats: Stats) => void
   * ): void;
   * export function lstat(
   *     path: PathLike,
   *     options: StatOptions & {
   *       bigint: true;
   *     },
   *     callback: (err: NodeJS.ErrnoException | null, stats: BigIntStats) => void
   * ): void;
   * export function lstat(path: PathLike, options: StatOptions | undefined, callback: (err: NodeJS.ErrnoException | null, stats: Stats | BigIntStats) => void): void;
   */
  "lstat",
  /**
   * export function statfs(path: PathLike, callback: (err: NodeJS.ErrnoException | null, stats: StatsFs) => void): void;
   * export function statfs(
   *     path: PathLike,
   *     options:
   *         | (StatFsOptions & {
   *               bigint?: false | undefined;
   *           })
   *         | undefined,
   *     callback: (err: NodeJS.ErrnoException | null, stats: StatsFs) => void
   * ): void;
   * export function statfs(
   *     path: PathLike,
   *     options: StatFsOptions & {
   *         bigint: true;
   *     },
   *     callback: (err: NodeJS.ErrnoException | null, stats: BigIntStatsFs) => void
   * ): void;
   * export function statfs(path: PathLike, options: StatFsOptions | undefined, callback: (err: NodeJS.ErrnoException | null, stats: StatsFs | BigIntStatsFs) => void): void;
   */
  "statfs",

  /**
   * export function statfsSync(
   *     path: PathLike,
   *     options?: StatFsOptions & {
   *         bigint?: false | undefined;
   *     }
   * ): StatsFs;
   * export function statfsSync(
   *     path: PathLike,
   *     options: StatFsOptions & {
   *         bigint: true;
   *     }
   * ): BigIntStatsFs;
   *
   * export function statfsSync(path: PathLike, options?: StatFsOptions): StatsFs | BigIntStatsFs;
   */
  "statfsSync",
  /**
   * export function readlink(path: PathLike, options: EncodingOption, callback: (err: NodeJS.ErrnoException | null, linkString: string) => void): void;
   * export function readlink(path: PathLike, options: BufferEncodingOption, callback: (err: NodeJS.ErrnoException | null, linkString: Buffer) => void): void;
   * export function readlink(path: PathLike, options: EncodingOption, callback: (err: NodeJS.ErrnoException | null, linkString: string | Buffer) => void): void;
   * export function readlink(path: PathLike, callback: (err: NodeJS.ErrnoException | null, linkString: string) => void): void;
   */
  "readlink",
  /**
   * export function readlinkSync(path: PathLike, options?: EncodingOption): string;
   * export function readlinkSync(path: PathLike, options: BufferEncodingOption): Buffer;
   * export function readlinkSync(path: PathLike, options?: EncodingOption): string | Buffer;
   */
  "readlinkSync",
  /**
   * export function realpath(path: PathLike, options: EncodingOption, callback: (err: NodeJS.ErrnoException | null, resolvedPath: string) => void): void;
   * export function realpath(path: PathLike, options: BufferEncodingOption, callback: (err: NodeJS.ErrnoException | null, resolvedPath: Buffer) => void): void;
   * export function realpath(path: PathLike, options: EncodingOption, callback: (err: NodeJS.ErrnoException | null, resolvedPath: string | Buffer) => void): void;
   * export function realpath(path: PathLike, callback: (err: NodeJS.ErrnoException | null, resolvedPath: string) => void): void;
   */
  "realpath",
  /**
   * export function realpathSync(path: PathLike, options?: EncodingOption): string;
   * export function realpathSync(path: PathLike, options: BufferEncodingOption): Buffer;
   * export function realpathSync(path: PathLike, options?: EncodingOption): string | Buffer;
   */
  "realpathSync",
  /**
   * export function unlink(path: PathLike, callback: NoParamCallback): void;
   */
  "unlink",
  /**
   * export function rmdir(path: PathLike, callback: NoParamCallback): void;
   * export function rmdir(path: PathLike, options: RmDirOptions, callback: NoParamCallback): void;
   */
  "rmdir",

  /**
   * export function rmdirSync(path: PathLike, options?: RmDirOptions): void;
   */
  "rmdirSync",
  /**
   * export function rm(path: PathLike, callback: NoParamCallback): void;
   * export function rm(path: PathLike, options: RmOptions, callback: NoParamCallback): void;
   */
  "rm",

  /**
   * export function rmSync(path: PathLike, options?: RmOptions): void;
   */
  "rmSync",
  /**
   * export function mkdir(
   *     path: PathLike,
   *     options: MakeDirectoryOptions & {
   *       recursive: true;
   *     },
   *     callback: (err: NodeJS.ErrnoException | null, path?: string) => void
   * ): void;
   * export function mkdir(
   *     path: PathLike,
   *     options:
   *         | Mode
   *         | (MakeDirectoryOptions & {
   *       recursive?: false | undefined;
   *     })
   *         | null
   *         | undefined,
   *     callback: NoParamCallback
   * ): void;
   * export function mkdir(path: PathLike, options: Mode | MakeDirectoryOptions | null | undefined, callback: (err: NodeJS.ErrnoException | null, path?: string) => void): void;
   * export function mkdir(path: PathLike, callback: NoParamCallback): void;
   */
  "mkdir",

  /**
   * export function mkdirSync(
   *     path: PathLike,
   *     options: MakeDirectoryOptions & {
   *       recursive: true;
   *     }
   * ): string | undefined;
   * export function mkdirSync(
   *     path: PathLike,
   *     options?:
   *         | Mode
   *         | (MakeDirectoryOptions & {
   *       recursive?: false | undefined;
   *     })
   *         | null
   * ): void;
   * export function mkdirSync(path: PathLike, options?: Mode | MakeDirectoryOptions | null): string | undefined;
   */
  "mkdirSync",
  /**
   * export function readdir(
   *     path: PathLike,
   *     options:
   *         | {
   *       encoding: BufferEncoding | null;
   *       withFileTypes?: false | undefined;
   *     }
   *         | BufferEncoding
   *         | undefined
   *         | null,
   *     callback: (err: NodeJS.ErrnoException | null, files: string[]) => void
   * ): void;
   * export function readdir(
   *     path: PathLike,
   *     options:
   *         | {
   *       encoding: 'buffer';
   *       withFileTypes?: false | undefined;
   *     }
   *         | 'buffer',
   *     callback: (err: NodeJS.ErrnoException | null, files: Buffer[]) => void
   * ): void;
   * export function readdir(
   *     path: PathLike,
   *     options:
   *         | (ObjectEncodingOptions & {
   *       withFileTypes?: false | undefined;
   *     })
   *         | BufferEncoding
   *         | undefined
   *         | null,
   *     callback: (err: NodeJS.ErrnoException | null, files: string[] | Buffer[]) => void
   * ): void;
   * export function readdir(path: PathLike, callback: (err: NodeJS.ErrnoException | null, files: string[]) => void): void;
   * export function readdir(
   *     path: PathLike,
   *     options: ObjectEncodingOptions & {
   *       withFileTypes: true;
   *     },
   *     callback: (err: NodeJS.ErrnoException | null, files: Dirent[]) => void
   * ): void;
   */
  "readdir",

  /**
   * export function readdirSync(
   *     path: PathLike,
   *     options?:
   *         | {
   *       encoding: BufferEncoding | null;
   *       withFileTypes?: false | undefined;
   *     }
   *         | BufferEncoding
   *         | null
   * ): string[];
   * export function readdirSync(
   *     path: PathLike,
   *     options:
   *         | {
   *       encoding: 'buffer';
   *       withFileTypes?: false | undefined;
   *     }
   *         | 'buffer'
   * ): Buffer[];
   * export function readdirSync(
   *     path: PathLike,
   *     options?:
   *         | (ObjectEncodingOptions & {
   *       withFileTypes?: false | undefined;
   *     })
   *         | BufferEncoding
   *         | null
   * ): string[] | Buffer[];
   * export function readdirSync(
   *     path: PathLike,
   *     options: ObjectEncodingOptions & {
   *       withFileTypes: true;
   *     }
   * ): Dirent[];
   */
  "readdirSync",
  /**
   * export function open(path: PathLike, flags: OpenMode | undefined, mode: Mode | undefined | null, callback: (err: NodeJS.ErrnoException | null, fd: number) => void): void;
   * export function open(path: PathLike, flags: OpenMode | undefined, callback: (err: NodeJS.ErrnoException | null, fd: number) => void): void;
   * export function open(path: PathLike, callback: (err: NodeJS.ErrnoException | null, fd: number) => void): void;
   */
  "open",

  /**
   * export function openSync(path: PathLike, flags: OpenMode, mode?: Mode | null): number;
   */
  "openSync",
  /**
   * export function utimesSync(path: PathLike, atime: TimeLike, mtime: TimeLike): void;
   */
  "utimesSync",
  /**
   * export function utimes(path: PathLike, atime: TimeLike, mtime: TimeLike, callback: NoParamCallback): void;
   */
  "utimes",
  /**
   * export function readFile(
   *     path: PathOrFileDescriptor,
   *     options:
   *         | ({
   *               encoding?: null | undefined;
   *               flag?: string | undefined;
   *           } & Abortable)
   *         | undefined
   *         | null,
   *     callback: (err: NodeJS.ErrnoException | null, data: Buffer) => void
   * ): void;
   * export function readFile(
   *     path: PathOrFileDescriptor,
   *     options:
   *         | ({
   *               encoding: BufferEncoding;
   *               flag?: string | undefined;
   *           } & Abortable)
   *         | BufferEncoding,
   *     callback: (err: NodeJS.ErrnoException | null, data: string) => void
   * ): void;
   * export function readFile(
   *     path: PathOrFileDescriptor,
   *     options:
   *         | (ObjectEncodingOptions & {
   *               flag?: string | undefined;
   *           } & Abortable)
   *         | BufferEncoding
   *         | undefined
   *         | null,
   *     callback: (err: NodeJS.ErrnoException | null, data: string | Buffer) => void
   * ): void;
   * export function readFile(path: PathOrFileDescriptor, callback: (err: NodeJS.ErrnoException | null, data: Buffer) => void): void;
   */
  "readFile",

  /**
   * export function readFileSync(
   *     path: PathOrFileDescriptor,
   *     options?: {
   *         encoding?: null | undefined;
   *         flag?: string | undefined;
   *     } | null
   * ): Buffer;
   * export function readFileSync(
   *     path: PathOrFileDescriptor,
   *     options:
   *         | {
   *               encoding: BufferEncoding;
   *               flag?: string | undefined;
   *           }
   *         | BufferEncoding
   * ): string;
   * export function readFileSync(
   *     path: PathOrFileDescriptor,
   *     options?:
   *         | (ObjectEncodingOptions & {
   *               flag?: string | undefined;
   *           })
   *         | BufferEncoding
   *         | null
   * ): string | Buffer;
   */
  "readFileSync",
  /**
   * export function writeFile(file: PathOrFileDescriptor, data: string | NodeJS.ArrayBufferView, options: WriteFileOptions, callback: NoParamCallback): void;
   * export function writeFile(path: PathOrFileDescriptor, data: string | NodeJS.ArrayBufferView, callback: NoParamCallback): void;
   */
  "writeFile",

  /**
   * export function writeFileSync(file: PathOrFileDescriptor, data: string | NodeJS.ArrayBufferView, options?: WriteFileOptions): void;
   */
  "writeFileSync",
  /**
   * export function appendFile(path: PathOrFileDescriptor, data: string | Uint8Array, options: WriteFileOptions, callback: NoParamCallback): void;
   * export function appendFile(file: PathOrFileDescriptor, data: string | Uint8Array, callback: NoParamCallback): void;
   */
  "appendFile",

  /**
   * export function appendFileSync(path: PathOrFileDescriptor, data: string | Uint8Array, options?: WriteFileOptions): void;
   */
  "appendFileSync",

  /**
   * export function watchFile(
   *     filename: PathLike,
   *     options:
   *         | (WatchFileOptions & {
   *               bigint?: false | undefined;
   *           })
   *         | undefined,
   *     listener: (curr: Stats, prev: Stats) => void
   * ): StatWatcher;
   * export function watchFile(
   *     filename: PathLike,
   *     options:
   *         | (WatchFileOptions & {
   *               bigint: true;
   *           })
   *         | undefined,
   *     listener: (curr: BigIntStats, prev: BigIntStats) => void
   * ): StatWatcher;
   * export function watchFile(filename: PathLike, listener: (curr: Stats, prev: Stats) => void): StatWatcher;
   */
  "watchFile",
  /**
   * export function unwatchFile(filename: PathLike, listener?: (curr: Stats, prev: Stats) => void): void;
   */
  "unwatchFile",

  /**
   * export function watch(
   *     filename: PathLike,
   *     options:
   *         | (WatchOptions & {
   *               encoding: 'buffer';
   *           })
   *         | 'buffer',
   *     listener?: WatchListener<Buffer>
   * ): FSWatcher;
   * export function watch(filename: PathLike, options?: WatchOptions | BufferEncoding | null, listener?: WatchListener<string>): FSWatcher;
   * export function watch(filename: PathLike, options: WatchOptions | string, listener?: WatchListener<string | Buffer>): FSWatcher;
   * export function watch(filename: PathLike, listener?: WatchListener<string>): FSWatcher;
   */
  "watch",
  /**
   * export function exists(path: PathLike, callback: (exists: boolean) => void): void;
   */
  "exists",
  /**
   * export function access(path: PathLike, mode: number | undefined, callback: NoParamCallback): void;
   * export function access(path: PathLike, callback: NoParamCallback): void;
   */
  "access",

  /**
   * export function accessSync(path: PathLike, mode?: number): void;
   */
  "accessSync",
  /**
   * export function createReadStream(path: PathLike, options?: BufferEncoding | ReadStreamOptions): ReadStream;
   */
  "createReadStream",

  /**
   * export function createWriteStream(path: PathLike, options?: BufferEncoding | StreamOptions): WriteStream;
   */
  "createWriteStream",
  /**
   * export function opendir(path: PathLike, cb: (err: NodeJS.ErrnoException | null, dir: Dir) => void): void;
   * export function opendir(path: PathLike, options: OpenDirOptions, cb: (err: NodeJS.ErrnoException | null, dir: Dir) => void): void;
   */
  "opendir",

  /**
   * export function opendirSync(path: PathLike, options?: OpenDirOptions): Dir;
   */
  "opendirSync",
] as const;

export const TWO_PATH_FUNCTIONS_WITH_EXTRA_ARGUMENTS = [
  /**
   *  export function rename(oldPath: PathLike, newPath: PathLike, callback: NoParamCallback)
   * @typedef { import('fs').rename } rename
   */
  "rename",
  /**
   * export function link(existingPath: PathLike, newPath: PathLike, callback: NoParamCallback): void;
   * @typedef { import('fs').link } link
   */
  "link",
  /**
   * export function symlink(target: PathLike, path: PathLike, type: symlink.Type | undefined | null, callback: NoParamCallback): void;
   * export function symlink(target: PathLike, path: PathLike, callback: NoParamCallback): void;
   * @typedef { import('fs').symlink } symlink
   */
  "symlink",
  /**
   * export function symlinkSync(target: PathLike, path: PathLike, type?: symlink.Type | null): void;
   * @typedef { import('fs').symlinkSync } symlinkSync
   */
  "symlinkSync",
  /**
   * export function copyFile(src: PathLike, dest: PathLike, callback: NoParamCallback): void;
   * export function copyFile(src: PathLike, dest: PathLike, mode: number, callback: NoParamCallback): void;
   * @typedef { import('fs').copyFile } copyFile
   */
  "copyFile",
  /**
   *   export function copyFileSync(src: PathLike, dest: PathLike, mode?: number)
   * @typedef { import('fs').copyFileSync } copyFileSync
   */
  "copyFileSync",
  /**
   * export function cp(source: string | url, destination: string | url, callback: (err: nodejs.errnoexception | null) => void): void;
   * export function cp(source: string | url, destination: string | url, opts: copyoptions, callback: (err: nodejs.errnoexception | null) => void): void;
   */
  "cp",
  /**
   * export function cpSync(source: string | URL, destination: string | URL, opts?: CopySyncOptions): void;
   */
  "cpSync",
] as const;

export const FS_PATH_FUNCTIONS_TO_MOCK = [
    ...SINGLE_PATH_FUNCTIONS,
    ...TWO_PATH_FUNCTIONS,
    ...SINGLE_PATH_FUNCTIONS_WITH_EXTRA_ARGUMENTS,
    ...TWO_PATH_FUNCTIONS_WITH_EXTRA_ARGUMENTS
] as const;

type FSPathFunctionNames = (typeof FS_PATH_FUNCTIONS_TO_MOCK)[number];
type FSModule = typeof fs;
export type FSPathFunction = FSModule[Extract<
  keyof FSModule,
  FSPathFunctionNames
>] extends never
  ? never
  : FSModule[Extract<keyof FSModule, FSPathFunctionNames>];
