import { spawnSync } from 'node:child_process'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const packageRoot = join(here, '..')

// Resolve the compiler from this package so Knip sees the dependency too.
const compilerRoot = dirname(
  fileURLToPath(import.meta.resolve('@typescript/native/package.json')),
)

const result = spawnSync(
  process.execPath,
  [
    join(compilerRoot, 'bin', 'tsc'),
    '--project',
    join(packageRoot, 'tsconfig.real-oxlint-fixtures.json'),
  ],
  { stdio: 'inherit' },
)

if (result.error !== undefined) {
  throw result.error
}

process.exitCode = result.status ?? 1
