import { spawnSync } from 'node:child_process'
const { marker } = await import(new URL('./marker.vibe', import.meta.url).href)
const mode = process.env.FOLDKIT_LAUNCHER_CHILD_MODE
const childCode =
  'process.stdout.write(JSON.stringify({ nodeOptions: process.env.NODE_OPTIONS ?? "", execArgv: process.execArgv }))'
const child = spawnSync(
  mode === 'npm' ? 'npm' : process.execPath,
  mode === 'npm' ? ['--version'] : ['--input-type=module', '-e', childCode],
  {
    cwd: process.env.FOLDKIT_LAUNCHER_EMPTY_CHILD,
    encoding: 'utf8',
    timeout: 30000,
    maxBuffer: 1024 * 1024,
  },
)
const observation = {
  marker,
  mode,
  parentNodeOptions: process.env.NODE_OPTIONS ?? '',
  parentExecArgv: process.execArgv,
  childStatus: child.status,
  childStdout: child.stdout,
  childStderr: child.stderr,
  childError: child.error?.message,
}
process.stdout.write(
  'PLAYGROUND_LAUNCHER_OBSERVATION ' + JSON.stringify(observation) + '\n',
)
process.exitCode = child.status ?? 1
