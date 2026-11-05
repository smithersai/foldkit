import { spawnSync } from 'node:child_process'
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { expect, it } from 'vitest'

it('typechecks dialog acquisition and failure handlers', () => {
  const root = process.cwd()
  const require = createRequire(join(root, 'package.json'))
  const compiler = join(
    dirname(require.resolve('vibelang/package.json')),
    'bin',
    'vibelang',
  )
  const directory = mkdtempSync(join(tmpdir(), 'dialog-contract-'))
  try {
    const config = join(directory, 'tsconfig.json')
    writeFileSync(
      config,
      JSON.stringify({
        extends: join(root, 'tsconfig.json'),
        compilerOptions: {
          noEmit: true,
          composite: false,
          incremental: false,
        },
        include: [],
        files: [join(root, 'src/dialog/index.vibe')],
      }),
    )
    const result = spawnSync(
      process.execPath,
      [compiler, '--singleThreaded', '--pretty', 'false', '-p', config],
      { cwd: root, encoding: 'utf8', maxBuffer: 16 * 1024 * 1024 },
    )
    expect(result.status, result.stdout + result.stderr).toBe(0)
  } finally {
    rmSync(directory, { recursive: true, force: true })
  }
}, 30_000)
