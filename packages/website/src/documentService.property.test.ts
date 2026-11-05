// @vitest-environment node
import { spawnSync } from 'node:child_process'
import { mkdtempSync, rmSync, symlinkSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { expect, test } from 'vitest'

import corpus from './fixtures/foldkit-document-service.json'
import portal from './snippet/mountPortalToBody.vibe?raw'
import render from './snippet/renderBasic.vibe?raw'
import { callAt, expressionAfter } from './snippetSource.test-support.ts'

test('preserves document selection, HTML layout filtering and portal cleanup', () => {
  const directory = mkdtempSync(join(tmpdir(), 'foldkit-command-defect-'))
  try {
    symlinkSync(
      join(process.cwd(), 'node_modules'),
      join(directory, 'node_modules'),
    )
    const portalBody = expressionAfter(portal, /execute:\s*/).replace(
      'Message.CompletedPortalToBody()',
      'element',
    )
    const layout = callAt(
      render,
      render.includes('Effect.sync(') ? 'Effect.sync' : 'sync',
    )
    writeFileSync(
      join(directory, 'command.vibe'),
      `
import { Scope } from "effect"
import { ExperimentalBrowserDocument } from "vibelang-runtime/experimental/platform-browser"
export const portal: (args: { readonly element: HTMLElement }) => HTMLElement!never!Scope.Scope = ` +
        portalBody +
        `
export const measure = effect {
  provide ExperimentalBrowserDocument.layer {
    const documentService = try Experimental.Document.Document
    const page = try documentService.current
    return try ` +
        layout +
        `
  }
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
import { Window } from "happy-dom"
import { portal, measure } from "./dist/command.js"
await fc.assert(fc.asyncProperty(fc.integer({ min: 0, max: 10000 }), fc.constantFrom("html", "foreign", "svg", "missing"), fc.jsonValue(), async (width, kind, failure) => {
  const owner = new Window(), other = new Window()
  try {
    globalThis.HTMLElement = owner.HTMLElement
    globalThis.document = owner.document
    let layoutReads = 0
    const target = kind === "svg" ? owner.document.createElementNS("http://www.w3.org/2000/svg", "svg")
      : (kind === "foreign" ? other : owner).document.createElement("div")
    target.id = "panel"
    target.getBoundingClientRect = () => { layoutReads++; return new owner.DOMRect(0, 0, width, 0) }
    if (kind !== "missing") owner.document.body.appendChild(target)
    const expectedHtml = kind !== "missing" && target instanceof globalThis.HTMLElement
    assert.equal(layoutReads, 0)
    for (let replay = 1; replay <= 2; replay++) {
      assert.equal(await Effect.runPromise(measure), expectedHtml ? width : 0)
      assert.equal(layoutReads, expectedHtml ? replay : 0)
    }
    for (const mode of ["success", "acquire", "release"]) {
      const element = other.document.createElement("section")
      const originalAppend = owner.document.body.appendChild
      const originalRemove = element.remove
      let appended = 0, removed = 0, used = 0
      owner.document.body.appendChild = function(child) {
        appended++
        if (mode === "acquire") throw failure
        return Reflect.apply(originalAppend, this, [child])
      }
      element.remove = function() {
        removed++
        if (mode === "release") throw failure
        return Reflect.apply(originalRemove, this, [])
      }
      try {
        const program = Effect.scoped(Effect.flatMap(portal({ element }), actual => Effect.sync(() => {
          used++
          assert.equal(actual, element)
          assert.equal(element.parentElement, owner.document.body)
        })))
        assert.equal(appended, 0); assert.equal(removed, 0)
        for (let replay = 1; replay <= 2; replay++) {
          const exit = await Effect.runPromiseExit(program)
          assert.equal(appended, replay)
          assert.equal(used, mode === "acquire" ? 0 : replay)
          assert.equal(removed, mode === "acquire" ? 0 : replay)
          if (mode === "success") {
            assert.equal(Exit.isSuccess(exit), true)
            assert.equal(element.parentElement, null)
          } else {
            assert.equal(Exit.isFailure(exit), true)
            assert.equal(exit.cause.reasons[0]._tag, "Die")
            assert.equal(exit.cause.reasons[0].defect, failure)
          }
        }
      } finally {
        owner.document.body.appendChild = originalAppend
        element.remove = originalRemove
        element.remove()
      }
    }
  } finally { await owner.happyDOM.close(); await other.happyDOM.close() }
}), { seed: ${corpus.seed}, numRuns: ${corpus.runs} })
console.log("DOCUMENT_SERVICE_PROPERTY 100 worlds, HTML/SVG/missing/foreign-document layout, 600 portal scopes")

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
