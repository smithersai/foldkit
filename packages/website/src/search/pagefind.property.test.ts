import { Effect } from 'effect'
import fc from 'fast-check'
import { spawnSync } from 'node:child_process'
import { join } from 'node:path'
import { expect, test, vi } from 'vitest'

import corpus from './fixtures/foldkit-pagefind-dynamic-import.json'
import * as loader from './pagefind.platform.ts'
import { PagefindService, pagefindLive } from './pagefind.vibe'

test('imports generated search modules in the Node module loader', () => {
  const script = String.raw`
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { pathToFileURL } from 'node:url'
import fc from 'fast-check'
const { loadPagefindModule } = await import(pathToFileURL(process.argv[1]).href)
const corpus = JSON.parse(readFileSync(process.argv[2], 'utf8'))
const module = await loadPagefindModule('data:text/javascript,' + encodeURIComponent(corpus.moduleSource))
await fc.assert(fc.asyncProperty(fc.string(), async query => {
  const response = await module.search(query)
  const result = await response.results[0].data()
  assert.deepEqual(result, { url: query, excerpt: query })
}), { seed: 190001, numRuns: 100 })
await fc.assert(fc.asyncProperty(fc.string(), async message => {
  const source = 'throw new Error(' + JSON.stringify(message) + ')'
  await assert.rejects(
    loadPagefindModule('data:text/javascript,' + encodeURIComponent(source)),
    error => error.message === message,
  )
}), { seed: 190003, numRuns: 50 })
console.log('PAGEFIND_IMPORT_PROPERTY 100 search queries, 50 rejected imports')
`
  const result = spawnSync(
    process.execPath,
    [
      '--input-type=module',
      '-e',
      script,
      join(process.cwd(), 'src/search/pagefind.platform.ts'),
      join(
        process.cwd(),
        'src/search/fixtures/foldkit-pagefind-dynamic-import.json',
      ),
    ],
    { encoding: 'utf8', timeout: 20_000 },
  )

  expect(result.status, result.stdout + result.stderr).toBe(0)
})

test('loads search lazily and falls back after synchronous or rejected imports', async () => {
  const load = vi.spyOn(loader, 'loadPagefindModule')
  try {
    await fc.assert(
      fc.asyncProperty(
        fc.string(),
        fc.oneof(fc.constantFrom(...corpus.failures), fc.jsonValue()),
        fc.constantFrom(...corpus.outcomes),
        async (query, cause, outcome) => {
          load.mockClear()
          load.mockImplementation(() => {
            if (outcome === 'throw') throw cause
            if (outcome === 'reject') return Promise.reject(cause)
            return Promise.resolve({
              search: async (value: string) => ({
                results: [
                  { data: async () => ({ url: value, excerpt: value }) },
                ],
              }),
            })
          })
          const request = Effect.gen(function* () {
            const pagefind = yield* PagefindService
            return yield* Effect.promise(() => pagefind.search(query))
          }).pipe(Effect.provide(pagefindLive))

          expect(load).not.toHaveBeenCalled()
          const response = await Effect.runPromise(request)
          expect(load).toHaveBeenCalledExactlyOnceWith('/pagefind/pagefind.js')
          if (outcome === 'success') {
            expect(await response.results[0]!.data()).toEqual({
              url: query,
              excerpt: query,
            })
          } else {
            expect(response.results).toEqual([])
          }
        },
      ),
      { seed: 190002, numRuns: 150 },
    )
  } finally {
    load.mockRestore()
  }
})
