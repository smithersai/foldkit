// @vitest-environment node
import { spawnSync } from 'node:child_process'
import { mkdtempSync, rmSync, symlinkSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { expect, test } from 'vitest'

import corpus from './fixtures/foldkit-website-native-callbacks.json'
import main from './main.vibe?raw'
import example from './page/example/exampleDetail.vibe?raw'
import ui from './page/ui/update.vibe?raw'

test('native callbacks preserve foreign update arguments and host identity', () => {
  const directory = mkdtempSync(join(tmpdir(), 'foldkit-native-callback-'))
  try {
    symlinkSync(
      join(process.cwd(), 'node_modules'),
      join(directory, 'node_modules'),
    )
    const core = main.match(
      /const foldCoreSubmodelPage = Update.foldChild\(\{\s*update: ([\s\S]*?),\n\s*read:/,
    )?.[1]
    const animation = ui.match(
      /const foldAnimationDemo = Update.foldChild\(\{\s*update: ([\s\S]*?),\n\s*read:/,
    )?.[1]
    const target = example.match(
      /return Dom.streamFromEventFilterMap\(\{\s*target: ([\s\S]*?),\n\s*type:/,
    )?.[1]
    for (const callback of [core, animation, target])
      expect(callback).toBeDefined()
    writeFileSync(
      join(directory, 'foreign.fixture.ts'),
      `
type Model = Readonly<{ value: number }>
type Message = Readonly<{ increment: number }>
let target: unknown
export const setTarget = (value: unknown): void => { target = value }
export const browserWindow = (): unknown => target
export const calls: Array<readonly [Model, Message]> = []
const originalUpdate = (model: Model, message: Message): Model => {
  calls.push([model, message])
  return { value: model.value + message.increment }
}
export namespace Core {
  export namespace SubmodelPage {
    export type Model = Readonly<{ value: number }>
    export type Message = Readonly<{ increment: number }>
    export const update = (model: Model, message: Message): Model => originalUpdate(model, message)
  }
}
export namespace Animation {
  export type Model = Readonly<{ value: number }>
  export type Message = Readonly<{ increment: number }>
  export const update = (model: Model, message: Message): Model => originalUpdate(model, message)
}
`,
    )
    writeFileSync(
      join(directory, 'callbacks.vibe'),
      `
import { Core, Animation, browserWindow } from "./foreign.fixture.ts"
type Model = Readonly<{ value: number }>
type Message = Readonly<{ increment: number }>
export const callbacks: Readonly<{
  core: (model: Model, message: Message) => Model
  animation: (model: Model, message: Message) => Model
  target: () => unknown
}> = {
  core: ${core},
  animation: ${animation},
  target: ${target},
}
`,
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
        files: ['callbacks.vibe'],
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
import { callbacks } from "./dist/callbacks.js"
import { calls, setTarget } from "./dist/foreign.fixture.js"
await fc.assert(fc.property(fc.integer(), fc.integer(), fc.jsonValue(), (value, increment, host) => {
  const model = Object.freeze({ value })
  const message = Object.freeze({ increment })
  calls.length = 0
  for (const callback of [callbacks.core, callbacks.animation]) {
    const result = callback(model, message)
    assert.deepEqual(result, { value: value + increment })
    assert.equal(calls.at(-1)[0], model)
    assert.equal(calls.at(-1)[1], message)
  }
  assert.equal(calls.length, 2)
  setTarget(host)
  assert.equal(callbacks.target(), host)
  const replacement = { host }
  setTarget(replacement)
  assert.equal(callbacks.target(), replacement)
}), { seed: ${corpus.seed}, numRuns: ${corpus.runs} })
console.log("NATIVE_CALLBACK_PROPERTY 200 cases, argument and target identity")
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
