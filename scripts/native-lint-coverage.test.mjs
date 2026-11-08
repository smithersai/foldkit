import fc from 'fast-check'
import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import {
  mkdtempSync,
  mkdirSync,
  rmSync,
  symlinkSync,
  writeFileSync,
} from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join, resolve } from 'node:path'
import { test } from 'node:test'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const runner = join(root, 'scripts/run-vibe-effect-lint.mjs')
const config = join(root, '.oxlintrc.effect.json')

const fixture = () => {
  const directory = mkdtempSync(join(tmpdir(), 'foldkit-native-lint-'))
  mkdirSync(join(directory, 'src'))
  writeFileSync(join(directory, 'package.json'), '{"type":"module"}\n')
  writeFileSync(
    join(directory, 'tsconfig.json'),
    JSON.stringify({
      compilerOptions: {
        target: 'ESNext',
        module: 'NodeNext',
        moduleResolution: 'NodeNext',
        strict: true,
        skipLibCheck: true,
        noEmit: true,
      },
      files: ['src/main.vibe'],
    }),
  )
  writeFileSync(join(directory, 'src/main.vibe'), 'export const value = 1\n')
  symlinkSync(
    join(root, 'packages/foldkit/node_modules'),
    join(directory, 'node_modules'),
    'dir',
  )
  return directory
}

const lint = directory => {
  const result = spawnSync(
    process.execPath,
    [
      runner,
      '--config',
      config,
      '--project',
      join(directory, 'tsconfig.json'),
      '--path',
      '.',
    ],
    {
      cwd: directory,
      env: { ...process.env, GOMAXPROCS: '1' },
      encoding: 'utf8',
    },
  )
  assert.ifError(result.error)
  return { status: result.status, output: result.stdout + result.stderr }
}

test('native lint excludes generated templates after a package build', () => {
  const directory = fixture()
  try {
    const output = join(directory, 'dist/templates/example/main.vibe')
    mkdirSync(dirname(output), { recursive: true })
    writeFileSync(output, 'export const generated = 1\n')
    const result = lint(directory)
    assert.equal(result.status, 0, result.output)
    assert.doesNotMatch(result.output, /not linted/)
    assert.match(result.output, /checked 1 \.vibe file/)
  } finally {
    rmSync(directory, { recursive: true, force: true })
  }
})

test('generated native output is excluded across nested and Unicode module paths', () => {
  const directory = fixture()
  try {
    fc.assert(
      fc.property(
        fc.array(fc.constantFrom('native', 'a b', 'é', '部件', 'nested', '0'), {
          minLength: 0,
          maxLength: 4,
        }),
        segments => {
          rmSync(join(directory, 'dist'), { recursive: true, force: true })
          const output = join(
            directory,
            'dist/templates',
            ...segments,
            'main.vibe',
          )
          mkdirSync(dirname(output), { recursive: true })
          writeFileSync(output, 'export const generated = 1\n')
          const result = lint(directory)
          assert.equal(result.status, 0, result.output)
          assert.doesNotMatch(result.output, /not linted/)
          assert.match(result.output, /checked 1 \.vibe file/)
        },
      ),
      { seed: 53132, numRuns: 30 },
    )
  } finally {
    rmSync(directory, { recursive: true, force: true })
  }
})

test('native source outside its project still fails lint coverage', () => {
  const directory = fixture()
  try {
    mkdirSync(join(directory, 'unlisted'))
    writeFileSync(
      join(directory, 'unlisted/live.vibe'),
      'export const live = 1\n',
    )
    const result = lint(directory)
    assert.equal(result.status, 1, result.output)
    assert.match(result.output, /unlisted[/\\]live\.vibe.*not linted/)
  } finally {
    rmSync(directory, { recursive: true, force: true })
  }
})
