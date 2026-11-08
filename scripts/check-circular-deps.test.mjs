import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join, resolve } from 'node:path'
import { test } from 'node:test'
import { fileURLToPath } from 'node:url'

// The circular-dependency gate reads VibeLang modules: madge's dependency
// detective (precinct) parses .vibe and .vibex through the compiler and its
// resolver (filing-cabinet) follows imports of them, both by the patches in
// patches/. Without them a .vibe module is a node without edges, so a cycle
// through .vibe files passes the gate unseen.
const REPO_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')

const madge = directory => {
  const result = spawnSync(
    'pnpm',
    [
      'madge',
      '--json',
      '--circular',
      '--extensions',
      'ts,vibe,vibex',
      '--exclude',
      '\\.d\\.ts$|\\.d\\.vibe\\.ts$',
      directory,
    ],
    { cwd: REPO_ROOT, encoding: 'utf8' },
  )
  assert.equal(result.error, undefined)
  const json = result.stdout.slice(result.stdout.indexOf('['))
  return JSON.parse(json)
}

const seed = files => {
  const root = mkdtempSync(join(tmpdir(), 'check-circular-deps-'))
  for (const [name, source] of Object.entries(files)) {
    mkdirSync(dirname(join(root, name)), { recursive: true })
    writeFileSync(join(root, name), source)
  }
  return root
}

test('a cycle between two .vibe modules is reported', () => {
  const root = seed({
    'a.vibe':
      "import { b } from './b.vibe'\nexport const a = 1\nexport const useB = () => b\n",
    'b.vibe':
      "import { a } from './a.vibe'\nexport const b = 2\nexport const useA = () => a\n",
  })
  try {
    assert.deepEqual(madge(root), [['a.vibe', 'b.vibe']])
  } finally {
    rmSync(root, { recursive: true, force: true })
  }
})

test('a cycle through a .ts importer and a .vibe module is reported', () => {
  const root = seed({
    'entry.ts':
      "import { view } from './page/view.vibe'\nexport const entry = () => view\n",
    'page/view.vibe':
      "import { entry } from '../entry.ts'\nexport const view = () => entry\n",
    'page/model.vibe': 'export const model = 1\n',
  })
  try {
    assert.deepEqual(madge(root), [['entry.ts', 'page/view.vibe']])
  } finally {
    rmSync(root, { recursive: true, force: true })
  }
})

test('an acyclic .vibe graph passes', () => {
  const root = seed({
    'a.vibe': "import { b } from './b.vibe'\nexport const a = b\n",
    'b.vibe': 'export const b = 2\n',
  })
  try {
    assert.deepEqual(madge(root), [])
  } finally {
    rmSync(root, { recursive: true, force: true })
  }
})
