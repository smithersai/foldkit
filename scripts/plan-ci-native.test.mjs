import fc from 'fast-check'
import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { test } from 'node:test'

const root = join(import.meta.dirname, '..')
const corpus = JSON.parse(
  readFileSync(
    join(root, 'scripts/fixtures/native-ci/foldkit-native-script-paths.json'),
    'utf8',
  ),
)
const select = files => {
  const result = spawnSync(
    process.execPath,
    ['scripts/plan-ci.mjs', 'base', 'head', ...files],
    { cwd: root, encoding: 'utf8' },
  )
  assert.equal(result.status, 0, result.stderr)
  return Object.fromEntries(
    result.stdout
      .trim()
      .split('\n')
      .map(line => line.split('=')),
  )
}
const expected = files => ({
  website: files.some(
    file =>
      file === 'scripts/build-examples.ts' ||
      file === 'scripts/build-examples.vibe',
  ),
  dom_state_parity: files.some(
    file =>
      file === 'scripts/check-dom-state-parity.mts' ||
      file === 'scripts/check-dom-state-parity.vibe',
  ),
})
const check = files => {
  const actual = select(files)
  for (const [scope, value] of Object.entries(expected(files)))
    assert.equal(actual[scope], String(value), JSON.stringify({ files, scope }))
}
test('legacy and native repository scripts select the same required CI jobs', () => {
  for (const files of corpus) check(files)
})
test('CI script selection preserves exact module names and ignores generated sidecars', () => {
  const file = fc
    .tuple(
      fc.constantFrom('build-examples', 'check-dom-state-parity', 'unrelated'),
      fc.constantFrom('ts', 'mts', 'vibe', 'd.vibe.ts'),
    )
    .map(([name, extension]) => 'scripts/' + name + '.' + extension)
  let build = 0
  let parity = 0
  fc.assert(
    fc.property(fc.array(file, { minLength: 1, maxLength: 8 }), files => {
      if (files.includes('scripts/build-examples.vibe')) build++
      if (files.includes('scripts/check-dom-state-parity.vibe')) parity++
      check(files)
    }),
    { seed: 413914, numRuns: 100 },
  )
  assert.ok(
    build > 0 && parity > 0,
    'the generated cases exercised both native entry points',
  )
})
