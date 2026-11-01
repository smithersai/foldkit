// The os and process calls are platform code a .vibe module does not use directly (VIP-33).
// Effect has no service for the home or temporary directory, the platform name or a signal-0
// liveness probe, so the raw calls live here unchanged.

import { homedir, tmpdir } from 'node:os'

export const homeDirectory = (): string => homedir()

export const temporaryDirectory = (): string => tmpdir()

export const isWindows = (): boolean => process.platform === 'win32'

/** Whether a process with `pid` exists: a refused signal-0 probe still proves it does. */
export const isProcessAlive = (pid: number): boolean => {
  try {
    process.kill(pid, 0)
    return true
  } catch (error) {
    return error instanceof Error && 'code' in error && error.code === 'EPERM'
  }
}
