import { spawn } from 'node:child_process'

export const startCommand = (
  command: string,
  args: ReadonlyArray<string>,
  cwd: string,
  isWindows: boolean,
  onError: (error: Error) => void,
  onExit: (code: number | null) => void,
): (() => void) => {
  const child = spawn(command, [...args], {
    cwd,
    shell: isWindows,
    stdio: 'inherit',
  })

  child.on('error', onError)
  child.on('exit', onExit)

  return () => {
    if (child.exitCode === null && !child.killed) {
      child.kill()
    }
  }
}
