// The platform code of relayRegistry.vibe, which a .vibe file does not import
// as a value (EK4402). The pinned runtime's Experimental.Process has no home
// or temporary directory yet, so these raw calls live here unchanged.

import { homedir, tmpdir } from 'node:os'
import { trusted } from 'vibelang-runtime'

// None of these throws: a failed signal is caught and answered, and the
// host facts are plain reads, so VibeLang calls them without a hatch.
export const platform = trusted((): NodeJS.Platform => process.platform, [])

export const homeDirectory = trusted((): string => homedir(), [])

export const temporaryDirectory = trusted((): string => tmpdir(), [])

export const isProcessAlive = trusted((pid: number): boolean => {
  try {
    process.kill(pid, 0)
    return true
  } catch (error) {
    return error instanceof Error && 'code' in error && error.code === 'EPERM'
  }
}, [])
