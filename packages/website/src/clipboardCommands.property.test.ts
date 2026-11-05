// @vitest-environment node
import { spawnSync } from 'node:child_process'
import { mkdtempSync, rmSync, symlinkSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { expect, test } from 'vitest'

import corpus from './fixtures/foldkit-clipboard-service.json'
import main from './main.vibe?raw'
import snippet from './snippetCopy/update.vibe?raw'

test('copies links and snippets through the provided Clipboard service', () => {
  const directory = mkdtempSync(join(tmpdir(), 'foldkit-clipboard-'))
  try {
    symlinkSync(
      join(process.cwd(), 'node_modules'),
      join(directory, 'node_modules'),
    )
    const link = main.match(
      /const CopyLink =[\s\S]*?(?=\n\nexport const ScrollToTop)/,
    )?.[0]
    const copy = snippet.match(
      /export const CopySnippet =[\s\S]*?(?=\n\nconst COPY_INDICATOR_DURATION)/,
    )?.[0]
    expect(link).toBeDefined()
    expect(copy).toBeDefined()
    writeFileSync(
      join(directory, 'commands.vibe'),
      `
import * as Clipboard from "@effect/platform-browser/Clipboard"
import { Command } from "foldkit"
import { defineMessageUnion } from "foldkit/message"
const Message = defineMessageUnion({
  SucceededCopyLink: {},
  FailedCopyLink: {},
  SucceededCopySnippet: { snippetId: Schema.String },
  FailedCopySnippet: {},
})
` +
        link?.replace('const CopyLink', 'export const CopyLink') +
        '\n' +
        copy,
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
        files: ['commands.vibe'],
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
import { Effect } from "effect"
import fc from "fast-check"
import { CopyLink, CopySnippet } from "./dist/commands.js"
let writes = []
let reject = false
Object.defineProperty(globalThis, "navigator", { configurable: true, value: {
  clipboard: { writeText: async text => {
    writes.push(text)
    if (reject) throw new Error("permission denied")
  } }
} })
await fc.assert(fc.asyncProperty(fc.string(), fc.boolean(), async (text, failure) => {
  reject = failure
  for (const [kind, create] of [
    ["Link", () => CopyLink({ url: text })],
    ["Snippet", () => CopySnippet({ snippetId: "example", text })]
  ]) {
    writes = []
    const command = create()
    assert.deepEqual(writes, [])
    for (let replay = 1; replay <= 2; replay++) {
      const result = await Effect.runPromise(command.effect)
      assert.equal(result._tag, (failure ? "Failed" : "Succeeded") + "Copy" + kind)
      if (!failure && kind === "Snippet") assert.equal(result.snippetId, "example")
      assert.deepEqual(writes, Array(replay).fill(text))
    }
  }
}), { seed: ${corpus.seed}, numRuns: ${corpus.runs} })
console.log("CLIPBOARD_PROPERTY 150 cases, 600 executions, cold replay")
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
