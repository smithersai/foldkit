// Native home lookup without HOME and a side-effect-free temporary-directory
// query have no faithful service equivalent yet (foldkit-151, foldkit-153).
export { homedir, tmpdir } from 'node:os'

// Node's pid-zero query is not Process.isRunning's positive-id query
// (foldkit-152). This unchanged legacy body is called only for zero.
export const isLegacyProcessAlive = (pid: number): boolean => {
  try {
    process.kill(pid, 0)
    return true
  } catch (error) {
    return error instanceof Error && 'code' in error && error.code === 'EPERM'
  }
}
