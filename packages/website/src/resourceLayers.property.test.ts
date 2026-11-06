// @vitest-environment node
import { spawnSync } from 'node:child_process'
import { mkdtempSync, rmSync, symlinkSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { expect, test } from 'vitest'

import corpus from './fixtures/foldkit-resource-service-layer.json'
import resources from './snippet/resources.vibe?raw'
import flags from './snippet/resourcesFlags.vibe?raw'

test('resource snippets build a shared service lazily from a separate Layer', () => {
  const directory = mkdtempSync(join(tmpdir(), 'foldkit-resource-layer-'))
  try {
    symlinkSync(
      join(process.cwd(), 'node_modules'),
      join(directory, 'node_modules'),
    )
    writeFileSync(
      join(directory, 'factory.fixture.ts'),
      `
let value = 0, calls = 0
let failing = false, failure: unknown
export const reset = (next: number, rejected: boolean, cause: unknown): void => {
  value = next; calls = 0; failing = rejected; failure = cause
}
export const callCount = (): number => calls
export const makeClient = (): Readonly<{ value: number }> => {
  calls++
  if (failing) throw failure
  return { value }
}
`,
    )
    let firstDefinition: string | undefined
    for (const [index, source] of [resources, flags].entries()) {
      const definition = source.match(
        /service ApiClientService:[\s\S]*?(?=\n\nconst (?:LoadUser|Flags))/,
      )?.[0]
      expect(definition).toBeDefined()
      if (index === 0) firstDefinition = definition
      else expect(definition).toBe(firstDefinition)
      writeFileSync(
        join(directory, 'service' + index + '.vibe'),
        `
import { makeClient } from "./factory.fixture.ts"
type ApiClient = Readonly<{ value: number }>
const makeApiClient: ApiClient!! = effect {
  return try Effect.orDie(Effect.try({
    try: () => makeClient(),
    catch: error => error,
  }))
}
` +
          definition +
          '\nexport { ApiClientService, ApiClientLive }\n',
      )
    }
    writeFileSync(join(directory, 'package.json'), '{"type":"module"}')
    // Identical source needs one compile; the equality check covers both excerpts.
    for (const index of [0]) {
      const config = join(directory, 'tsconfig' + index + '.json')
      writeFileSync(
        config,
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
          files: ['service' + index + '.vibe'],
        }),
      )
      const compiled = spawnSync(
        join(process.cwd(), 'node_modules/.bin/vibelang'),
        ['--singleThreaded', '-p', config, '--pretty', 'false'],
        { encoding: 'utf8', timeout: 30_000 },
      )
      expect(compiled.status, compiled.stdout + compiled.stderr).toBe(0)
    }
    writeFileSync(
      join(directory, 'run.mjs'),
      `
import assert from "node:assert/strict"
import { Effect, Exit } from "effect"
import fc from "fast-check"
import * as first from "./dist/service0.js"
import * as second from "./dist/service0.js"
import { reset, callCount } from "./dist/factory.fixture.js"
await fc.assert(fc.asyncProperty(fc.integer(), fc.jsonValue(), async (value, defect) => {
  for (const { ApiClientService, ApiClientLive } of [first, second]) {
    reset(value, false, undefined)
    const provided = Effect.provide(Effect.gen(function*() {
      const one = yield* ApiClientService
      const two = yield* ApiClientService
      assert.equal(one, two)
      return one
    }), ApiClientLive)
    assert.equal(callCount(), 0)
    const initial = await Effect.runPromise(provided)
    assert.equal(callCount(), 1)
    assert.equal(initial.value, value)
    const repeated = await Effect.runPromise(provided)
    assert.equal(callCount(), 2)
    assert.notEqual(initial, repeated)
    assert.equal(repeated.value, value)
    reset(value, true, defect)
    const failed = await Effect.runPromiseExit(provided)
    assert.equal(Exit.isFailure(failed), true)
    assert.equal(failed.cause.reasons[0]._tag, "Die")
    assert.equal(failed.cause.reasons[0].defect, defect)
    assert.equal(callCount(), 1)
  }
}), { seed: ${corpus.seed}, numRuns: ${corpus.runs} })
console.log("RESOURCE_LAYER_PROPERTY 100 cases, 600 exits, shared instance and cold build")
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
