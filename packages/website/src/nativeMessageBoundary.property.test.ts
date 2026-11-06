// @vitest-environment node
import { spawnSync } from 'node:child_process'
import { mkdtempSync, rmSync, symlinkSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { expect, test } from 'vitest'

import corpus from './fixtures/foldkit-native-message-boundary.json'
import source from './main.vibe?raw'

test('preserves native message metadata across a fresh module boundary', () => {
  const directory = mkdtempSync(join(tmpdir(), 'foldkit-command-defect-'))
  try {
    symlinkSync(
      join(process.cwd(), 'node_modules'),
      join(directory, 'node_modules'),
    )
    const command = source.match(
      /export const ScrollToTop =[\s\S]*?(?=\n\nconst ScrollToAnchor)/,
    )?.[0]
    expect(command).toBeDefined()
    writeFileSync(
      join(directory, 'host.platform.ts'),
      `
export const browserWindow = () => ({ scrollTo: (_options: unknown): void => {} })
`,
    )

    writeFileSync(
      join(directory, 'message.vibe'),
      `
import { defineMessageUnion } from "foldkit/message"
export const Message = defineMessageUnion({ CompletedScrollToTop: {} })
`,
    )
    writeFileSync(
      join(directory, 'producer.json'),
      JSON.stringify({
        compilerOptions: {
          strict: true,
          skipLibCheck: true,
          module: 'ESNext',
          moduleResolution: 'Bundler',
          target: 'ESNext',
          types: [],
          outDir: 'producer',
          declaration: true,
          rewriteRelativeImportExtensions: true,
        },
        files: ['message.vibe'],
      }),
    )
    const produced = spawnSync(
      join(process.cwd(), 'node_modules/.bin/vibelang'),
      [
        '--singleThreaded',
        '-p',
        join(directory, 'producer.json'),
        '--pretty',
        'false',
      ],
      { encoding: 'utf8', timeout: 30_000 },
    )
    expect(produced.status, produced.stdout + produced.stderr).toBe(0)
    writeFileSync(
      join(directory, 'command.vibe'),
      `
import { browserWindow } from "./host.platform.ts"
import { Command } from "foldkit"
import { Message } from "./producer/message.js"
export { Message }
` + command,
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
          outDir: '.',
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
import { ScrollToTop, Message } from "./command.js"
let currentDefect, calls = 0
Message.CompletedScrollToTop = new Proxy(Message.CompletedScrollToTop, {
  apply() { calls++; throw currentDefect }
})
await fc.assert(fc.asyncProperty(fc.jsonValue(), async defect => {
  currentDefect = defect; calls = 0
  const program = ScrollToTop().effect
  assert.equal(calls, 0)
  for (let replay = 1; replay <= 2; replay++) {
    const result = await Effect.runPromiseExit(program)
    assert.equal(calls, replay)
    assert.equal(Exit.isFailure(result), true)
    const reason = result.cause.reasons[0]
    assert.equal(reason._tag, "Die")
    assert.equal(reason.defect, defect)
  }
}), { seed: ${corpus.seed}, numRuns: ${corpus.runs} })
console.log("CONSTRUCTOR_DEFECT_PROPERTY 200 values, 400 exits, cold replay")
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
