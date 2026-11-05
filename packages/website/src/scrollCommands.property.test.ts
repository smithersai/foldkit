// @vitest-environment node
import { spawnSync } from 'node:child_process'
import { mkdtempSync, rmSync, symlinkSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { expect, test } from 'vitest'

import corpus from './fixtures/foldkit-scroll-effect-catch.json'
import source from './main.vibe?raw'

test('scroll commands recover missing elements and retain defects and interruption', () => {
  const directory = mkdtempSync(join(tmpdir(), 'foldkit-scroll-catch-'))
  try {
    symlinkSync(
      join(process.cwd(), 'node_modules'),
      join(directory, 'node_modules'),
    )
    const commands = source.match(
      /const ScrollToAnchor =[\s\S]*?(?=\n\/\/ NOTE: mirrors --color-cream)/,
    )?.[0]
    expect(commands).toBeDefined()
    writeFileSync(
      join(directory, 'context.fixture.ts'),
      `
import { Effect } from "effect"
let program: Effect.Effect<void, Error> = Effect.void
let calls = 0
export const setProgram = (value: Effect.Effect<void, Error>): void => { program = value; calls = 0 }
export const callCount = (): number => calls
export namespace Dom {
  export type ElementNotFound = Error
  const operation = () => Effect.suspend(() => { calls++; return program })
  export const scrollIntoViewAfterPaint = (_target: string, _options: unknown) => operation()
  export const focus = (_target: string, _options: unknown) => operation()
  export const scrollIntoViewIfNotVisible = (_target: string, _options?: unknown) => operation()
}
`,
    )
    writeFileSync(
      join(directory, 'commands.vibe'),
      `
import { Command } from "foldkit"
import { Dom } from "./context.fixture.ts"
const DOCS_SIDEBAR_NAV_ID = "docs"
const MOBILE_MENU_NAV_ID = "mobile"
const escapeCssIdentifier = (value: string): string => value
import { defineMessageUnion } from "foldkit/message"
const Message = defineMessageUnion({
  CompletedScrollToAnchor: {},
  CompletedScrollSidebarActiveLinkIntoView: {},
  CompletedScrollMobileMenuActiveLinkIntoView: {},
})
` +
        commands
          ?.replace('const ScrollToAnchor', 'export const ScrollToAnchor')
          .replace(
            'const ScrollMobileMenuActiveLinkIntoView',
            'export const ScrollMobileMenuActiveLinkIntoView',
          ),
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
import { Effect, Exit } from "effect"
import fc from "fast-check"
import { ScrollToAnchor, ScrollSidebarActiveLinkIntoView, ScrollMobileMenuActiveLinkIntoView } from "./dist/commands.js"
import { setProgram, callCount } from "./dist/context.fixture.js"
await fc.assert(fc.asyncProperty(fc.string(), fc.jsonValue(), async (hash, defect) => {
  for (const outcome of ${JSON.stringify(corpus.outcomes)}) {
    const program = outcome === "success" ? Effect.void
      : outcome === "failure" ? Effect.fail(new Error("missing"))
      : outcome === "defect" ? Effect.die(defect) : Effect.interrupt
    for (const create of [
      () => ScrollToAnchor({ hash }),
      () => ScrollSidebarActiveLinkIntoView(),
      () => ScrollMobileMenuActiveLinkIntoView()
    ]) {
      setProgram(program)
      const command = create()
      assert.equal(callCount(), 0)
      for (let replay = 1; replay <= 2; replay++) {
        const result = await Effect.runPromiseExit(command.effect)
        assert.ok(callCount() > 0)
        if (outcome === "success" || outcome === "failure") {
          assert.equal(Exit.isSuccess(result), true)
          assert.equal(result.value._tag, "Completed" + command.name)
        } else {
          assert.equal(Exit.isFailure(result), true)
          const reason = result.cause.reasons[0]
          assert.equal(reason._tag, outcome === "defect" ? "Die" : "Interrupt")
          if (outcome === "defect") assert.equal(reason.defect, defect)
        }
      }
    }
  }
}), { seed: ${corpus.seed}, numRuns: ${corpus.runs} })
console.log("SCROLL_CATCH_PROPERTY 80 cases, 1920 exits, cold replay")
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
