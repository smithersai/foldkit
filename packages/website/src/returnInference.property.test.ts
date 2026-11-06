// @vitest-environment node
import { spawnSync } from 'node:child_process'
import { mkdtempSync, rmSync, symlinkSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { expect, test } from 'vitest'

import corpus from './fixtures/foldkit-plain-return-inference.json'
import source from './page/home/demoTab.vibe?raw'

test('keeps plain return inference valid TypeScript with curried callbacks', () => {
  const directory = mkdtempSync(join(tmpdir(), 'foldkit-return-inference-'))
  try {
    symlinkSync(
      join(process.cwd(), 'node_modules'),
      join(directory, 'node_modules'),
    )
    const start = source.indexOf('export const isActive =')
    expect(start).toBeGreaterThanOrEqual(0)
    const declaration = source.slice(start)
    const context = 'type Tab = "Architecture" | "Note Player"\n'
    writeFileSync(join(directory, 'native.vibe'), context + declaration)
    writeFileSync(join(directory, 'twin.ts'), context + declaration)
    writeFileSync(join(directory, 'package.json'), '{"type":"module"}')
    const options = {
      strict: true,
      skipLibCheck: true,
      module: 'ESNext',
      moduleResolution: 'Bundler',
      target: 'ESNext',
      types: [],
      declaration: true,
      outDir: 'dist',
      rewriteRelativeImportExtensions: true,
    }
    writeFileSync(
      join(directory, 'tsconfig.json'),
      JSON.stringify({
        compilerOptions: options,
        files: ['native.vibe'],
      }),
    )
    const native = spawnSync(
      join(process.cwd(), 'node_modules/.bin/vibelang'),
      [
        '--singleThreaded',
        '-p',
        join(directory, 'tsconfig.json'),
        '--pretty',
        'false',
      ],
      { encoding: 'utf8', timeout: 30_000 },
    )
    expect(native.status, native.stdout + native.stderr).toBe(0)
    writeFileSync(
      join(directory, 'identity.ts'),
      `
import { isActive as native } from './dist/native.js'
import { isActive as twin } from './twin.js'
const toNative: typeof native = twin
const toTwin: typeof twin = native
export { toNative, toTwin }
`,
    )
    writeFileSync(
      join(directory, 'tsconfig.twin.json'),
      JSON.stringify({
        compilerOptions: { ...options, outDir: 'twin-dist' },
        files: ['twin.ts', 'identity.ts'],
      }),
    )
    const twin = spawnSync(
      join(process.cwd(), 'node_modules/.bin/tsc'),
      ['-p', join(directory, 'tsconfig.twin.json'), '--pretty', 'false'],
      { encoding: 'utf8', timeout: 30_000 },
    )
    expect(twin.status, twin.stdout + twin.stderr).toBe(0)
    writeFileSync(
      join(directory, 'run.mjs'),
      `
import assert from 'node:assert/strict'
import fc from 'fast-check'
import { isActive as native } from './dist/native.js'
import { isActive as twin } from './twin-dist/twin.js'
await fc.assert(fc.asyncProperty(fc.string(), fc.string(), async (selected, active) => {
  const nativeCallback = native(selected), twinCallback = twin(selected)
  for (let replay = 0; replay < 3; replay++) {
    assert.equal(nativeCallback(active), selected === active)
    assert.equal(nativeCallback(active), twinCallback(active))
  }
}), { seed: ${corpus.seed}, numRuns: ${corpus.runs} })
console.log('RETURN_INFERENCE_PROPERTY 200 generated pairs, 1200 callback comparisons')
`,
    )
    const executed = spawnSync(process.execPath, [join(directory, 'run.mjs')], {
      encoding: 'utf8',
      timeout: 20_000,
    })
    expect(executed.status, executed.stdout + executed.stderr).toBe(0)
  } finally {
    rmSync(directory, { recursive: true, force: true })
  }
})
