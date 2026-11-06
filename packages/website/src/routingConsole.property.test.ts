// @vitest-environment node
import { spawnSync } from 'node:child_process'
import { mkdtempSync, rmSync, symlinkSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { expect, test } from 'vitest'

import corpus from './fixtures/foldkit-routing-console-service.json'
import source from './snippet/routingQueryParams.vibe?raw'

test('the routing excerpt logs its URL once through Effect Console', () => {
  const directory = mkdtempSync(join(tmpdir(), 'foldkit-routing-console-'))
  try {
    symlinkSync(
      join(process.cwd(), 'node_modules'),
      join(directory, 'node_modules'),
    )
    const expression = source.match(
      /^(?:console\.log|Effect\.runSync)\([^\n]+$/m,
    )?.[0]
    expect(expression).toBeDefined()
    writeFileSync(
      join(directory, 'url.fixture.ts'),
      `
let value = ""
export const setUrl = (next: string): void => { value = next }
export const getUrl = (): string => value
`,
    )
    writeFileSync(
      join(directory, 'log.vibe'),
      `
import { getUrl } from "./url.fixture.ts"
const searchUrl = getUrl()
` +
        expression +
        '\n',
    )
    writeFileSync(join(directory, 'package.json'), '{"type":"module"}')
    writeFileSync(
      join(directory, 'tsconfig.json'),
      JSON.stringify({
        compilerOptions: {
          strict: true,
          skipLibCheck: true,
          module: 'ESNext',
          moduleResolution: 'Bundler',
          target: 'ESNext',
          types: [],
          outDir: 'dist',
          rewriteRelativeImportExtensions: true,
        },
        files: ['log.vibe'],
      }),
    )
    const compiled = spawnSync(
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
    expect(compiled.status, compiled.stdout + compiled.stderr).toBe(0)
    writeFileSync(
      join(directory, 'run.mjs'),
      `
import assert from "node:assert/strict"
import fc from "fast-check"
import { setUrl } from "./dist/url.fixture.js"
const original = console.log
const output = []
console.log = (...args) => output.push(args)
let iteration = 0
try {
  await fc.assert(fc.asyncProperty(fc.string(), async url => {
    setUrl(url)
    const count = output.length
    await import("./dist/log.js?case=" + iteration++)
    assert.equal(output.length, count + 1)
    assert.deepEqual(output.at(-1), [url])
  }), { seed: ${corpus.seed}, numRuns: ${corpus.runs} })
} finally { console.log = original }
console.log("ROUTING_CONSOLE_PROPERTY 200 exact URL outputs")
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
