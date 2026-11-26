import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import test from 'node:test'
import { fileURLToPath } from 'node:url'

const checker = fileURLToPath(
  new URL('./check-effect-prebundle.ts', import.meta.url),
)

const fixture = (distribution, run) => {
  const root = mkdtempSync(join(tmpdir(), 'foldkit-prebundle-'))
  try {
    const source = join(root, 'packages/foldkit/src')
    mkdirSync(source, { recursive: true })
    writeFileSync(
      join(source, 'implicit.vibe'),
      'export const module = Graph\n',
    )
    if (distribution !== undefined) {
      const dist = join(root, 'packages/foldkit/dist')
      mkdirSync(dist, { recursive: true })
      writeFileSync(join(dist, 'implicit.js'), distribution)
    }
    run(spawnSync(process.execPath, [checker], { cwd: root, encoding: 'utf8' }))
  } finally {
    rmSync(root, { recursive: true, force: true })
  }
}

test('checks implicit VibeLang imports in the built runtime', () => {
  fixture(
    'import * as Graph from "effect/Graph"; export const module = Graph;',
    result => {
      assert.equal(result.status, 1, result.stdout + result.stderr)
      assert.match(result.stderr, /effect\/Graph/)
    },
  )
})

test('accepts an already prebundled Effect runtime import', () => {
  fixture(
    'import { Effect as Fx } from "effect"; export const module = Fx;',
    result => {
      assert.equal(result.status, 0, result.stdout + result.stderr)
    },
  )
})

test('requires a built distribution rather than silently skipping native source', () => {
  fixture(undefined, result => {
    assert.equal(result.status, 1, result.stdout + result.stderr)
    assert.match(result.stderr, /build:packages/)
  })
})
