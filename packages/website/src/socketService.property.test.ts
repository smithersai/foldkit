// @vitest-environment node
import { spawnSync } from 'node:child_process'
import { mkdtempSync, rmSync, symlinkSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { expect, test } from 'vitest'

import corpus from './fixtures/foldkit-socket-service.json'
import room from './snippet/antiPatternLiveHandleGood.vibe?raw'
import signaling from './snippet/managedResourcesLift.vibe?raw'
import { expressionAfter } from './snippetSource.test-support.ts'

test('preserves immediate socket acquisition and its explicit close lifecycle', () => {
  const directory = mkdtempSync(join(tmpdir(), 'foldkit-command-defect-'))
  try {
    symlinkSync(
      join(process.cwd(), 'node_modules'),
      join(directory, 'node_modules'),
    )
    const signalingUrl = signaling.match(/^const SIGNALING_URL = (.+)$/m)?.[1]
    expect(signalingUrl).toBeDefined()
    writeFileSync(
      join(directory, 'command.vibe'),
      `
import { Socket } from "effect/socket"
const SIGNALING_URL = ` +
        signalingUrl +
        `
export const room: (args: { readonly roomId: string }) => Socket.WebSocketLike!unknown = ` +
        expressionAfter(room, /acquire:\s*/) +
        `
export const signaling: () => Socket.WebSocketLike!unknown = ` +
        expressionAfter(signaling, /acquire:\s*/) +
        `
export const release: (socket: Socket.WebSocketLike) => void!! = ` +
        expressionAfter(room, /release:\s*/) +
        `
export const releaseSignaling: (socket: Socket.WebSocketLike) => void!! = ` +
        expressionAfter(signaling, /release:\s*/),
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
import { room, signaling, release, releaseSignaling } from "./dist/command.js"
const stage = { calls: 0, closes: 0, failure: undefined, mode: "success", url: "" }
globalThis.WebSocket = class {
  constructor(url, protocols) {
    stage.calls++
    assert.equal(url, stage.url)
    assert.equal(protocols, undefined)
    if (stage.mode === "constructor") throw stage.failure
  }
  close() {
    stage.closes++
    if (stage.mode === "close") throw stage.failure
  }
}
await fc.assert(fc.asyncProperty(fc.string(), fc.jsonValue(), async (roomId, failure) => {
  for (const [acquire, close, url] of [[() => room({ roomId }), release, "/rooms/" + roomId], [signaling, releaseSignaling, "wss://example.com/call/signaling"]]) {
    for (const mode of ["success", "constructor", "close"]) {
      stage.calls = 0; stage.closes = 0; stage.failure = failure; stage.mode = mode; stage.url = url
      const program = acquire()
      assert.equal(stage.calls, 0)
      for (let replay = 1; replay <= 2; replay++) {
        const exit = await Effect.runPromiseExit(program)
        assert.equal(stage.calls, replay)
        if (mode === "constructor") {
          assert.equal(Exit.isFailure(exit), true)
          const reason = exit.cause.reasons[0]
          assert.equal(reason._tag, "Fail")
          assert.equal(reason.error.cause, failure)
          assert.equal(stage.closes, 0)
        } else {
          assert.equal(Exit.isSuccess(exit), true)
          const shutdown = close(exit.value)
          assert.equal(stage.closes, replay - 1)
          const closed = Effect.runSyncExit(shutdown)
          assert.equal(stage.closes, replay)
          if (mode === "close") {
            assert.equal(Exit.isFailure(closed), true)
            assert.equal(closed.cause.reasons[0]._tag, "Die")
            assert.equal(closed.cause.reasons[0].defect, failure)
          } else assert.equal(Exit.isSuccess(closed), true)
        }
      }
    }
  }
}), { seed: ${corpus.seed}, numRuns: ${corpus.runs} })
console.log("SOCKET_SERVICE_PROPERTY 100 URLs/causes, 1200 acquisitions and explicit close/defect identity")

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
