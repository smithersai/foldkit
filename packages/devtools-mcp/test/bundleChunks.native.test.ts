import fc from 'fast-check'
import { mkdtemp, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'
import { rolldown } from 'rolldown'
import { expect, it } from 'vitest'

import config from '../rolldown.config.ts'
import corpus from './corpus/foldkit-mcp-lazy-bundle.json' with { type: 'json' }

it('keeps the executable name and loads each emitted lazy dependency', async () => {
  await fc.assert(
    fc.asyncProperty(
      fc.oneof(
        fc.constantFrom(...corpus.cases),
        fc.array(fc.integer(), { minLength: 1, maxLength: 4 }),
      ),
      async values => {
        const modules = new Map([
          [
            'entry',
            'export const trace = []; export async function read(index) { switch (index) {' +
              values
                .map(
                  (_, index) =>
                    `case ${index}: return (await import("lazy-${index}")).value;`,
                )
                .join('') +
              '} }',
          ],
          ...values.map((value, index): [string, string] => [
            `lazy-${index}`,
            `import { trace } from "entry"; trace.push(${index}); export const value = ${value};`,
          ]),
        ])
        const bundle = await rolldown({
          input: 'entry',
          ...(config.platform === undefined
            ? {}
            : { platform: config.platform }),
          plugins: [
            {
              name: 'lazy-dependency-fixture',
              resolveId: id => (modules.has(id) ? id : null),
              load: id => modules.get(id) ?? null,
            },
          ],
        })
        const directory = await mkdtemp(join(tmpdir(), 'foldkit-mcp-bundle-'))
        try {
          if (Array.isArray(config.output))
            throw new Error('Expected one bundle output')
          const { output } = await bundle.generate(config.output)
          expect(
            output.some(
              chunk =>
                chunk.type === 'chunk' &&
                chunk.isEntry &&
                chunk.fileName === 'server.js',
            ),
          ).toBe(true)
          await writeFile(join(directory, 'package.json'), '{"type":"module"}')
          for (const chunk of output) {
            expect(chunk.type).toBe('chunk')
            if (chunk.type === 'chunk')
              await writeFile(join(directory, chunk.fileName), chunk.code)
          }
          const entry = await import(
            pathToFileURL(join(directory, 'server.js')).href
          )
          expect(entry.trace).toEqual([])
          for (const [index, value] of values.entries()) {
            expect(await entry.read(index)).toBe(value)
            expect(entry.trace).toEqual(
              values.slice(0, index + 1).map((_, seen) => seen),
            )
            expect(await entry.read(index)).toBe(value)
            expect(entry.trace).toHaveLength(index + 1)
          }
        } finally {
          await bundle.close()
          await rm(directory, { recursive: true, force: true })
        }
      },
    ),
    { seed: corpus.seed, numRuns: corpus.runs },
  )
})
