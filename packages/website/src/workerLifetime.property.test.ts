// @vitest-environment node
import { spawnSync } from 'node:child_process'
import { mkdtempSync, rmSync, symlinkSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { expect, test } from 'vitest'

import corpus from './fixtures/foldkit-worker-lifetime.json'
import platformSource from './snippet/chessWorker.platform.ts?raw'
import source from './snippet/managedResourcesLayer.vibe?raw'

test('keeps worker creation cold and terminates exactly once on scope closure', () => {
  const directory = mkdtempSync(join(tmpdir(), 'foldkit-command-defect-'))
  try {
    symlinkSync(
      join(process.cwd(), 'node_modules'),
      join(directory, 'node_modules'),
    )
    const acquisition = source.match(
      /const worker = ([\s\S]*?)(?=\n\n\s*return \{)/,
    )?.[1]
    expect(acquisition).toBeDefined()
    writeFileSync(join(directory, 'chessWorker.platform.ts'), platformSource)
    writeFileSync(
      join(directory, 'command.vibe'),
      `
import { createChessEngineWorker } from "./chessWorker.platform.ts"
export const acquire = effect {
  const worker = ` +
        acquisition +
        `
  return worker
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
    expect(compiled.stdout + compiled.stderr).not.toMatch(/EK4402/)
    writeFileSync(
      join(directory, 'run.mjs'),
      `
import assert from "node:assert/strict"
import { Effect, Exit } from "effect"
import fc from "fast-check"
import { acquire } from "./dist/command.js"
const stage = { constructed: 0, terminated: 0, mode: "success", failure: undefined, events: [] }
globalThis.Worker = class {
  constructor(url) {
    stage.constructed++
    stage.events.push(["construct", url])
    assert.equal(url, "/chess-engine-worker.js")
    if (stage.mode === "constructor") throw stage.failure
  }
  terminate() {
    stage.terminated++
    stage.events.push(["terminate"])
    if (stage.mode === "terminate") throw stage.failure
  }
}
await fc.assert(fc.asyncProperty(fc.jsonValue(), async defect => {
  stage.failure = defect
  for (const mode of ["success", "constructor", "terminate", "interrupt"]) {
    stage.mode = mode; stage.constructed = 0; stage.terminated = 0; stage.events = []
    const use = Effect.flatMap(acquire, worker => mode === "interrupt" ? Effect.interrupt : Effect.succeed(worker))
    const program = Effect.scoped(use)
    assert.equal(stage.constructed, 0)
    for (let replay = 1; replay <= 2; replay++) {
      const result = await Effect.runPromiseExit(program)
      assert.equal(stage.constructed, replay)
      assert.equal(stage.terminated, mode === "constructor" ? 0 : replay)
      if (mode === "success") assert.equal(Exit.isSuccess(result), true)
      else {
        assert.equal(Exit.isFailure(result), true)
        const reason = result.cause.reasons[0]
        assert.equal(reason._tag, mode === "interrupt" ? "Interrupt" : "Die")
        if (mode !== "interrupt") assert.equal(reason.defect, defect)
      }
      assert.deepEqual(stage.events.slice((replay - 1) * (mode === "constructor" ? 1 : 2)),
        mode === "constructor" ? [["construct", "/chess-engine-worker.js"]]
        : [["construct", "/chess-engine-worker.js"], ["terminate"]])
    }
  }
}), { seed: ${corpus.seed}, numRuns: ${corpus.runs} })
console.log("WORKER_SPAWNER_PROPERTY 200 values, 1600 exits, exact raw worker lifetime, cold acquire and exact cleanup")

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
