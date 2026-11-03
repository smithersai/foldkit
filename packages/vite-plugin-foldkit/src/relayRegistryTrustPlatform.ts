import { Array, Option } from 'effect'
import { tmpdir } from 'node:os'
import { win32 } from 'node:path'

export const currentUid = () => process.getuid?.()
export const temporaryDirectory = () => tmpdir()

export const directoryChain = (
  directory: string,
  parentOf: (path: string) => string,
): ReadonlyArray<string> => {
  const directories: Array<string> = []
  let current = directory

  while (true) {
    directories.push(current)
    const parent = parentOf(current)

    if (parent === current) {
      return Array.reverse(directories)
    }

    current = parent
  }
}

export const powershellPath = (systemRoot: string): string =>
  win32.join(
    systemRoot,
    'System32',
    'WindowsPowerShell',
    'v1.0',
    'powershell.exe',
  )

export const windowsTempRootRefusal = (
  directory: string,
  tempRoot: string,
): Option.Option<string> =>
  win32.relative(tempRoot, win32.dirname(directory)) === ''
    ? Option.none()
    : Option.some('is outside the Windows user temporary directory')

export const windowsDirectoryChain = (directory: string) =>
  directoryChain(directory, win32.dirname)
