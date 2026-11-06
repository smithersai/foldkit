// @vitest-environment node
import { spawnSync } from 'node:child_process'
import { mkdtempSync, rmSync, symlinkSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { expect, test } from 'vitest'

import corpus from './fixtures/foldkit-frame-window-service.json'
import source from './snippet/subscriptionEquivalence.vibe?raw'
import { expressionAfter } from './snippetSource.test-support.ts'

test('reads live frame dependencies and cancels the latest scheduled frame', () => {
  const directory = mkdtempSync(join(tmpdir(), 'foldkit-command-defect-'))
  try {
    symlinkSync(
      join(process.cwd(), 'node_modules'),
      join(directory, 'node_modules'),
    )
    writeFileSync(
      join(directory, 'command.vibe'),
      `
import { ExperimentalBrowserWindow } from "vibelang-runtime/experimental/platform-browser"
import { defineMessageUnion } from "foldkit/message"
const Message = defineMessageUnion({ AdvancedAutoScrollFrame: {} })
export const frames: (
  dependencies: { readonly isDragging: boolean; readonly clientY: number },
  readDependencies: () => { readonly isDragging: boolean; readonly clientY: number }
) => Stream.Stream<typeof Message.AdvancedAutoScrollFrame.Type> = ` +
        expressionAfter(source, /dependenciesToStream:\s*/),
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
import { Fiber, Stream } from "effect"
import { Window } from "happy-dom"
import { frames } from "./dist/command.js"
const turn = () => new Promise(resolve => setImmediate(resolve))
await fc.assert(fc.asyncProperty(
  fc.integer({ min: 50, max: 2000 }),
  fc.array(fc.integer({ min: -100, max: 3000 }), { maxLength: 12 }),
  fc.boolean(),
  async (height, positions, isDragging) => {
    const framePositions = [height - 41, height - 40, height - 39, ...positions]
    const browser = new Window()
    globalThis.window = browser
    Object.defineProperty(browser, "innerHeight", { value: height, configurable: true })
    let nextId = 0, clientY = 0, dependencyReads = 0
    const pending = new Map(), cancelled = [], scrolls = [], messages = []
    let started
    const scheduled = new Promise(resolve => { started = resolve })
    browser.requestAnimationFrame = callback => { const id = ++nextId; pending.set(id, callback); started(); return id }
    browser.cancelAnimationFrame = id => { cancelled.push(id); pending.delete(id) }
    browser.scrollBy = function(x, y) { assert.equal(this, browser); scrolls.push([x, y]) }
    try {
      const stream = frames({ isDragging, clientY: 0 }, () => { dependencyReads++; return { isDragging, clientY } })
      assert.equal(nextId, 0)
      const fiber = Effect.runFork(Stream.runForEach(stream, message => Effect.sync(() => { messages.push(message._tag) })))
      if (!isDragging) {
        const exit = await Effect.runPromise(Fiber.await(fiber))
        assert.equal(Exit.isSuccess(exit), true)
        assert.equal(nextId, 0)
        assert.equal(dependencyReads, 0)
        assert.deepEqual(cancelled, [])
      } else {
        await Promise.race([scheduled, Effect.runPromise(Fiber.await(fiber)).then(exit => { throw new Error("Frame stream ended before scheduling: " + JSON.stringify(exit)) })])
        assert.equal(pending.size, 1)
        for (const position of framePositions) {
          clientY = position
          const [id, callback] = pending.entries().next().value
          pending.delete(id)
          callback(id)
          await turn()
          assert.equal(pending.size, 1)
        }
        assert.equal(dependencyReads, framePositions.length)
        assert.deepEqual(scrolls, framePositions.map(value => [0, value > height - 40 ? 5 : 0]))
        assert.deepEqual(messages, framePositions.map(() => "AdvancedAutoScrollFrame"))
        assert.equal(nextId, framePositions.length + 1)
        const latest = nextId
        await Effect.runPromise(Fiber.interrupt(fiber))
        assert.equal(pending.size, 0)
        assert.deepEqual(cancelled, [latest])
      }
    } finally { await browser.happyDOM.close() }
  }
), { seed: ${corpus.seed}, numRuns: ${corpus.runs} })
console.log("FRAME_WINDOW_PROPERTY 100 viewport/frame sequences, live dependency reads, exact cancellation")

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
