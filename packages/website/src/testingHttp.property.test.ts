// @vitest-environment node
import { spawnSync } from 'node:child_process'
import { mkdtempSync, rmSync, symlinkSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { expect, test } from 'vitest'

import corpus from './fixtures/foldkit-testing-http-platform.json'
import source from './snippet/testingCommandEffect.vibe?raw'

test('preserves eager test registration and native mock HTTP response bytes', () => {
  const directory = mkdtempSync(join(tmpdir(), 'foldkit-command-defect-'))
  try {
    symlinkSync(
      join(process.cwd(), 'node_modules'),
      join(directory, 'node_modules'),
    )
    const begin = source.indexOf(
      source.includes('HttpServerResponse.toWeb(')
        ? 'HttpServerResponse.toWeb('
        : 'new globalThis.Response(',
    )
    expect(begin).toBeGreaterThan(0)
    let depth = 0
    let end = begin
    for (
      let index = source.indexOf('(', begin);
      index < source.length;
      index++
    ) {
      if (source.charAt(index) === '(') depth++
      if (source.charAt(index) === ')' && --depth === 0) {
        end = index + 1
        break
      }
    }
    const conversion = source.slice(begin, end)
    writeFileSync(
      join(directory, 'registration.platform.ts'),
      `
export let calls = 0
export const records: Array<{ readonly name: string; readonly body: () => Promise<void> }> = []
let failure: Error | undefined
export function reset(value: Error | undefined): void { failure = value; calls = 0; records.length = 0 }
/** @throws {Error} */
export function test(name: string, body: () => Promise<void>): void {
  calls++
  if (failure !== undefined) throw failure
  records.push({ name, body })
}
export function expect(_value: unknown) { return { toBe(_expected: unknown): void {} } }
`,
    )
    const bootstrap = source.includes('Effect.runSync(')
      ? source.indexOf('Effect.runSync(')
      : source.indexOf("test('fetchWeather")
    expect(bootstrap).toBeGreaterThan(0)
    const transformed =
      source.slice(0, bootstrap) +
      'export const register = () => ' +
      source.slice(bootstrap).trim() +
      '\nregister()\n'
    writeFileSync(
      join(directory, 'command.vibe'),
      transformed.replace(
        "from 'vitest'",
        'from "./registration.platform.ts"',
      ) +
        `
declare function fetchWeather(zip: string): { readonly effect: { readonly _tag: string }!never!HttpClient.HttpClient }
export const makeResponse = (responseData: unknown) => ` +
        conversion,
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
        files: ['command.vibe'],
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
import { Effect, Exit } from "effect"
import fc from "fast-check"
import * as control from "./dist/registration.platform.js"
const command = await import("./dist/command.js")
assert.equal(control.calls, 1)
assert.equal(control.records.length, 1)
await fc.assert(fc.asyncProperty(fc.jsonValue(), fc.string(), async (value, message) => {
  for (const fails of [false, true]) {
    const failure = new Error(message, { cause: value })
    control.reset(fails ? failure : undefined)
    try { command.register() }
    catch (error) { assert.equal(fails, true); assert.equal(error, failure) }
    assert.equal(control.calls, 1)
    assert.equal(control.records.length, fails ? 0 : 1)
    if (!fails) {
      assert.equal(control.records[0].name, "fetchWeather returns SucceededFetchWeather on success")
      assert.equal(typeof control.records[0].body, "function")
      const actual = command.makeResponse(value)
      const expected = new Response(JSON.stringify(value), { status: 200 })
      assert.equal(actual.status, expected.status)
      assert.equal(actual.statusText, expected.statusText)
      assert.deepEqual([...actual.headers], [...expected.headers])
      assert.equal(await actual.text(), await expected.text())
    }
  }
}), { seed: ${corpus.seed}, numRuns: ${corpus.runs} })
console.log("TESTING_HTTP_PROPERTY 200 JSON bodies and exact Error identities, 400 eager registrations")

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
