// @vitest-environment node
import { spawnSync } from 'node:child_process'
import { mkdtempSync, rmSync, symlinkSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { expect, test } from 'vitest'

import corpus from './fixtures/foldkit-root-document-service.json'
import atom from './snippet/atomCompareFoldkitEffect.vibe?raw'
import crash from './snippet/crashReport.vibe?raw'
import filtered from './snippet/domFilteredEvent.vibe?raw'
import prevented from './snippet/domPreventDefault.vibe?raw'
import managed from './snippet/managedResources.vibe?raw'
import resources from './snippet/resources.vibe?raw'
import flags from './snippet/resourcesFlags.vibe?raw'
import multiple from './snippet/resourcesMultiple.vibe?raw'
import slow from './snippet/slowConfig.vibe?raw'
import child from './snippet/subscriptionOrganizationChild.vibe?raw'

const containerExpression = (
  source: string,
  marker = 'container: ',
): string => {
  const begin = source.indexOf(marker) + marker.length
  expect(begin).toBeGreaterThan(marker.length - 1)
  let depth = 0
  let quote = ''
  for (let index = begin; index < source.length; index++) {
    const character = source.charAt(index)
    if (quote) {
      if (character === '\\') index++
      else if (character === quote) quote = ''
    } else if (character === '"' || character === "'" || character === '`') {
      quote = character
    } else if ('({['.includes(character)) depth++
    else if (')}]'.includes(character)) depth--
    else if (character === ',' && depth === 0) return source.slice(begin, index)
  }
  throw new Error('The runtime container expression is missing its delimiter')
}

test('runtime snippets look up the current document root once at configuration', () => {
  const directory = mkdtempSync(join(tmpdir(), 'foldkit-document-root-'))
  try {
    symlinkSync(
      join(process.cwd(), 'node_modules'),
      join(directory, 'node_modules'),
    )
    const sources = [
      ...[managed, slow, resources, crash, flags, multiple].map(source => ({
        source,
        marker: 'container: ',
      })),
      ...[atom, filtered, prevented].map(source => ({
        source,
        marker: 'target: ',
      })),
      { source: child, marker: 'Stream.fromEventListener<KeyboardEvent>(' },
    ]
    expect(sources).toHaveLength(
      corpus.files.length + corpus.targetFiles.length,
    )
    writeFileSync(
      join(directory, 'roots.vibe'),
      `
import { ExperimentalBrowserDocument } from "vibelang-runtime/experimental/platform-browser"
` +
        sources
          .map(
            ({ source, marker }, index) =>
              'export const root' +
              index +
              ' = ' +
              containerExpression(source, marker),
          )
          .join('\n'),
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
        files: ['roots.vibe'],
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
import { Window } from "happy-dom"
import fc from "fast-check"
let iteration = 0
await fc.assert(fc.asyncProperty(fc.boolean(), fc.string(), async (present, text) => {
  const window = new Window()
  const element = window.document.createElement("div")
  element.id = present ? "root" : "other"
  element.textContent = text
  window.document.body.appendChild(element)
  globalThis.window = window
  globalThis.document = window.document
  const lookups = []
  const lookup = window.document.getElementById
  window.document.getElementById = function(id) {
    lookups.push(id)
    return lookup.call(this, id)
  }
  const roots = await import("./dist/roots.js?case=" + iteration++)
  assert.deepEqual(lookups, Array(${corpus.files.length}).fill(${JSON.stringify(corpus.selector)}))
  for (let index = 0; index < ${sources.length}; index++) {
    assert.equal(roots["root" + index], index < ${corpus.files.length} ? (present ? element : null) : window.document)
  }
  await window.happyDOM.close()
}), { seed: ${corpus.seed}, numRuns: ${corpus.runs} })
console.log("DOCUMENT_ROOT_PROPERTY 80 documents, 480 exact root lookups, 320 event-target identities")
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
