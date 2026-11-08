import { Effect } from 'effect'
import fc from 'fast-check'
import { spawnSync } from 'node:child_process'
import { mkdtempSync, rmSync, symlinkSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { expect, test } from 'vitest'

import corpus from './fixtures/foldkit-playground-error-union.json'
import { installDependencies } from './playgroundWebContainer.vibe'
import source from './playgroundWebContainer.vibe?raw'

test('preserves spawn rejection causes in the expected error channel', async () => {
  await fc.assert(
    fc.asyncProperty(
      fc.oneof(fc.constantFrom(...corpus.failures), fc.jsonValue()),
      async cause => {
        const container = {
          spawn: () => Promise.reject(cause),
        }
        const failure = await Effect.runPromise(
          Effect.flip(installDependencies(container)),
        )

        expect(failure._tag).toBe('WebContainerError')
        expect(failure.message).toBe('npm install failed to start.')
        expect(failure.cause).toBe(cause)
      },
    ),
    { seed: 178072, numRuns: 250 },
  )
})

test('checks the actual timeout helper with its combined error channel', () => {
  const start = source.indexOf('effect function timeout<')
  const end = source.indexOf('const releaseLatePromiseResult', start)
  expect(start).toBeGreaterThanOrEqual(0)
  expect(end).toBeGreaterThan(start)
  const directory = mkdtempSync(join(tmpdir(), 'foldkit-error-union-'))

  try {
    symlinkSync(
      join(process.cwd(), 'node_modules'),
      join(directory, 'node_modules'),
    )
    writeFileSync(
      join(directory, 'timeout.vibe'),
      [
        'import { Effect } from "effect"',
        'error WebContainerError { message: string; cause?: unknown }',
        'export ' + source.slice(start, end),
      ].join('\n'),
    )
    writeFileSync(
      join(directory, 'tsconfig.json'),
      JSON.stringify({
        compilerOptions: {
          strict: true,
          noEmit: true,
          skipLibCheck: true,
          module: 'ESNext',
          moduleResolution: 'Bundler',
          target: 'ESNext',
          types: [],
        },
        files: ['timeout.vibe'],
      }),
    )
    const result = spawnSync(
      join(process.cwd(), 'node_modules', '.bin', 'vibelang'),
      [
        '--singleThreaded',
        '-p',
        join(directory, 'tsconfig.json'),
        '--pretty',
        'false',
      ],
      { encoding: 'utf8' },
    )

    expect(result.status, result.stdout + result.stderr).toBe(0)
  } finally {
    rmSync(directory, { recursive: true, force: true })
  }
})
