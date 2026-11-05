import { spawnSync } from 'node:child_process'
import { mkdtempSync, rmSync, symlinkSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { expect, test } from 'vitest'

import corpus from './fixtures/foldkit-effect-catch-handlers.json'
import uploadSource from './snippet/commandInterruptKey.vibe?raw'
import focusSource from './snippet/domFocus.vibe?raw'
import flagsSource from './snippet/resourcesFlags.vibe?raw'

const context = `
import { Effect, Option } from "effect"
import { fileConstructor as File } from "./file.platform.ts"
type Definition = {
  args?: Record<string, unknown>
  messages: ReadonlyArray<unknown>
  execute: Effect.Effect<unknown, unknown, unknown> | ((args: any) => Effect.Effect<unknown, unknown, unknown>)
  interrupt?: { keyFields: ReadonlyArray<string>; toKey: (args: any) => string }
}
function define<T extends Definition>(_name: string, definition: T): T { return definition }
const Command = { define }
let focusProgram: void!Error = Effect.void
let uploadProgram: string!Error = Effect.succeed("uploaded")
export function setPrograms(focus: void!Error, upload: string!Error): void {
  focusProgram = focus
  uploadProgram = upload
}
effect function focus(_selector: string): void!Error { return try focusProgram }
const Dom = { focus }
effect function postFile(_file: globalThis.File): string!Error { return try uploadProgram }
const Focused = (): { readonly _tag: "Focused" } => ({ _tag: "Focused" })
export service ApiClientService {
  static readonly key = "test/SnippetHandlers/ApiClientService"
  readonly restoreSession: string!Error
}
type Flags = { readonly maybeSession: Option.Option<string> }
const Flags = { make: (value: Flags): Flags => value }
data Message {
  SucceededUploadFile { uploadId: number }
  FailedUploadFile { uploadId: number }
}
`

const runner = `
import assert from "node:assert/strict"
import { Effect, Exit, Option } from "effect"
import fc from "fast-check"
import { focusExecution, uploadExecution, sessionFlags, ApiClientService, setPrograms } from "./dist/handlers.js"
const outcomes = ${JSON.stringify(corpus.outcomes)}
let caseNumber = 0
await fc.assert(fc.asyncProperty(
  fc.integer(),
  fc.string(),
  fc.jsonValue(),
  async (uploadId, message, defect) => {
    const currentCase = caseNumber++
    for (const outcome of outcomes) {
      const original = new Error(message)
      const program = outcome === "success" ? Effect.void
        : outcome === "failure" ? Effect.fail(original)
        : outcome === "defect" ? Effect.die(defect) : Effect.interrupt
      setPrograms(program, Effect.as(program, "uploaded"))
      for (const [kind, operation] of [
        ["focus", focusExecution],
        ["upload", uploadExecution({ uploadId, file: new File([], "upload") })],
        ["flags", Effect.provideService(sessionFlags, ApiClientService, { restoreSession: Effect.as(program, "session") })],
      ]) {
        console.log("HANDLER_STAGE", currentCase, outcome, kind, "start")
        const exit = await Effect.runPromiseExit(operation)
        console.log("HANDLER_STAGE", currentCase, outcome, kind, "complete")
        if (outcome === "success" || outcome === "failure") {
          assert.equal(Exit.isSuccess(exit), true)
          if (kind === "flags") {
            assert.equal(Option.isSome(exit.value.maybeSession), outcome === "success")
            if (outcome === "success") assert.equal(Option.getOrThrow(exit.value.maybeSession), "session")
          } else {
            assert.equal(exit.value._tag, kind === "focus" ? "Focused"
              : outcome === "success" ? "SucceededUploadFile" : "FailedUploadFile")
            if (kind === "upload") assert.equal(exit.value.uploadId, uploadId)
          }
        } else {
          assert.equal(Exit.isFailure(exit), true)
          const reason = exit.cause.reasons[0]
          assert.equal(reason._tag, outcome === "defect" ? "Die" : "Interrupt")
          if (outcome === "defect") assert.equal(reason.defect, defect)
        }
      }
    }
  }
), { seed: 186008, numRuns: 100 })
let calls = 0
setPrograms(Effect.void, Effect.sync(() => { calls++; return "uploaded" }))
const cold = uploadExecution({ uploadId: 1, file: new File([], "upload") })
assert.equal(calls, 0)
await Effect.runPromise(cold)
await Effect.runPromise(cold)
assert.equal(calls, 2)
console.log("SNIPPET_HANDLER_PROPERTY 100 cases, 1200 exits, cold replay")
`

test('snippet handlers preserve successes, failures, defects and interruption', () => {
  const directory = mkdtempSync(join(tmpdir(), 'foldkit-catch-handlers-'))

  try {
    symlinkSync(
      join(process.cwd(), 'node_modules'),
      join(directory, 'node_modules'),
    )
    const focus = focusSource.replace(/^import .*\n/gm, '')
    const upload = uploadSource
      .replace(/^import .*\n/gm, '')
      .replace(/const Message = defineMessageUnion\([\s\S]*?\n\}\)\n/, '')
    writeFileSync(
      join(directory, 'file.platform.ts'),
      'export const fileConstructor = globalThis.File\n',
    )
    const flags = flagsSource.match(
      /const flags:[\s\S]*?(?=\n\nconst application)/,
    )?.[0]
    expect(flags).toBeDefined()
    writeFileSync(
      join(directory, 'handlers.vibe'),
      context +
        focus +
        upload +
        flags +
        '\nexport const focusExecution = FocusEmailInput.execute\n' +
        'export const uploadExecution = UploadFile.execute\n' +
        'export const sessionFlags = flags\n',
    )
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
        files: ['handlers.vibe'],
      }),
    )
    writeFileSync(join(directory, 'package.json'), '{"type":"module"}')
    const compiled = spawnSync(
      join(process.cwd(), 'node_modules', '.bin', 'vibelang'),
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
    writeFileSync(join(directory, 'run.mjs'), runner)
    const executed = spawnSync(process.execPath, [join(directory, 'run.mjs')], {
      encoding: 'utf8',
      timeout: 20_000,
      maxBuffer: 4 * 1024 * 1024,
    })
    expect(executed.status, executed.stdout + executed.stderr).toBe(0)
  } finally {
    rmSync(directory, { recursive: true, force: true })
  }
})
