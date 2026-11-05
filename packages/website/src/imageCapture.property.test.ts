// @vitest-environment node
import { spawnSync } from 'node:child_process'
import { mkdtempSync, rmSync, symlinkSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { expect, test } from 'vitest'

import corpus from './fixtures/foldkit-image-capture-platform.json'
import platformSource from './snippet/cameraCapture.platform.ts?raw'
import source from './snippet/managedResourcesCommand.vibe?raw'

test('keeps image construction defects distinct from frame acquisition failures', () => {
  const directory = mkdtempSync(join(tmpdir(), 'foldkit-command-defect-'))
  try {
    symlinkSync(
      join(process.cwd(), 'node_modules'),
      join(directory, 'node_modules'),
    )
    const construction = source.match(
      /const imageCapture = ([\s\S]*?)(?=\n\s*try Effect.tryPromise)/,
    )?.[1]
    expect(construction).toBeDefined()
    writeFileSync(join(directory, 'cameraCapture.platform.ts'), platformSource)
    writeFileSync(
      join(directory, 'command.vibe'),
      `
import { makeImageCapture } from "./cameraCapture.platform.ts"
export const frame = (track: MediaStreamTrack) => effect {
  const imageCapture = ` +
        construction +
        `
  return try Effect.tryPromise(() => imageCapture.grabFrame())
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
import { frame } from "./dist/command.js"
const stage = { constructorCalls: 0, frameCalls: 0, mode: "success", failure: undefined, track: undefined }
globalThis.ImageCapture = class {
  constructor(track) {
    stage.constructorCalls++
    assert.equal(track, stage.track)
    if (stage.mode === "constructor") throw stage.failure
  }
  grabFrame() {
    stage.frameCalls++
    if (stage.mode === "sync") throw stage.failure
    return stage.mode === "reject" ? Promise.reject(stage.failure) : Promise.resolve(stage.track)
  }
}
await fc.assert(fc.asyncProperty(fc.jsonValue(), async defect => {
  stage.failure = defect; stage.track = { defect }
  for (const mode of ["success", "constructor", "sync", "reject"]) {
    stage.mode = mode; stage.constructorCalls = 0; stage.frameCalls = 0
    const program = frame(stage.track)
    assert.equal(stage.constructorCalls, 0)
    assert.equal(stage.frameCalls, 0)
    for (let replay = 1; replay <= 2; replay++) {
      const result = await Effect.runPromiseExit(program)
      assert.equal(stage.constructorCalls, replay)
      assert.equal(stage.frameCalls, mode === "constructor" ? 0 : replay)
      if (mode === "success") {
        assert.equal(Exit.isSuccess(result), true)
        assert.equal(result.value, stage.track)
      } else {
        assert.equal(Exit.isFailure(result), true)
        const reason = result.cause.reasons[0]
        assert.equal(reason._tag, mode === "constructor" ? "Die" : "Fail")
        if (mode === "constructor") assert.equal(reason.defect, defect)
        else assert.equal(reason.error.cause, defect)
      }
    }
  }
}), { seed: ${corpus.seed}, numRuns: ${corpus.runs} })
console.log("IMAGE_CAPTURE_PROPERTY 200 values, 1600 exits, constructor/frame stages and cold replay")

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
