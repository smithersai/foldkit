// The file-system, path, os and process calls are platform code a .vibe module does not use
// directly (VIP-33). Effect's FileSystem has no lstat (symbolic links must not be followed
// here) and no process identity, so the raw calls live here unchanged; the .vibe module reaches
// them through hatches.

import { lstat, realpath } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { dirname, win32 } from 'node:path'

/** The fields of an `lstat` entry the trust inspection reads. */
export type DirectoryEntry = Readonly<{
  isSymbolicLink: boolean
  isDirectory: boolean
  mode: bigint
  uid: bigint
  dev: bigint
  ino: bigint
}>

export const readDirectoryEntry = async (
  path: string,
): Promise<DirectoryEntry> => {
  const entry = await lstat(path, { bigint: true })
  return {
    isSymbolicLink: entry.isSymbolicLink(),
    isDirectory: entry.isDirectory(),
    mode: entry.mode,
    uid: entry.uid,
    dev: entry.dev,
    ino: entry.ino,
  }
}

export const realPath = (path: string): Promise<string> => realpath(path)

export const realTemporaryDirectory = (): Promise<string> => realpath(tmpdir())

export const currentUid = (): number | undefined => process.getuid?.()

export const platformName = (): string => process.platform

export const systemRoot = (): string | undefined => process.env['SystemRoot']

export const parentDirectory = (path: string): string => dirname(path)

export const windowsParentDirectory = (path: string): string =>
  win32.dirname(path)

export const windowsJoin = (...segments: ReadonlyArray<string>): string =>
  win32.join(...segments)

export const windowsRelative = (from: string, to: string): string =>
  win32.relative(from, to)
