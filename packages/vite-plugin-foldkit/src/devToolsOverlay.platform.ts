// The platform code of devToolsOverlay.vibe, which a .vibe file does not
// import as a value (EK4402). Vite calls the plugin's configuration hooks
// synchronously, so the raw file-system, path and process calls live here
// unchanged, and the Option logic stays in the module.

import { existsSync, readFileSync, realpathSync } from 'node:fs'
import { dirname, join, resolve, sep } from 'node:path'

/** The parsed JSON of the file at `path`, or `undefined` when it cannot be read or parsed. */
export const readJsonFile = (path: string): unknown => {
  try {
    return JSON.parse(readFileSync(path, 'utf8'))
  } catch {
    return undefined
  }
}

export const fileExists = (path: string): boolean => existsSync(path)

export const parentDirectory = (directory: string): string => dirname(directory)

export const joinPath = (...segments: ReadonlyArray<string>): string =>
  join(...segments)

export const resolvePath = (path: string): string => resolve(path)

/** The real path of the directory holding `path`, or `undefined` when it cannot be resolved. */
export const realParentDirectory = (path: string): string | undefined => {
  try {
    return realpathSync(dirname(path))
  } catch {
    return undefined
  }
}

export const pathSegments = (path: string): ReadonlyArray<string> =>
  path.split(sep)

export const currentWorkingDirectory = (): string => process.cwd()
