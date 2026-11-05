import * as fc from 'fast-check'
import { globSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { expect, test } from 'vitest'

import { inferenceCases } from './fixtures/foldkit-bare-infer-return'

const retiredReturnAnnotation = /:\s*infer\s+_(?=\s*=>)/

test('uses ordinary TypeScript return inference throughout the examples', () => {
  const examples = join(process.cwd(), '..')
  const sources = globSync('*/{src,scripts}/**/*.vibe', { cwd: examples })

  expect(sources.length).toBeGreaterThan(0)
  for (const source of sources) {
    expect(readFileSync(join(examples, source), 'utf8'), source).not.toMatch(
      retiredReturnAnnotation,
    )
  }
})

test('distinguishes obsolete return annotations from conditional inference', () => {
  const whitespace = fc.constantFrom(' ', '\n', '\t', '\r\n', ' \n\t')
  fc.assert(
    fc.property(
      fc.constantFrom(...inferenceCases),
      whitespace,
      whitespace,
      whitespace,
      (source, beforeInfer, afterInfer, beforeArrow) => {
        const annotation =
          ':' + beforeInfer + 'infer' + afterInfer + '_' + beforeArrow
        const legacy = source.replace('=>', annotation + '=>')
        expect(legacy).toMatch(retiredReturnAnnotation)
        expect(source).not.toMatch(retiredReturnAnnotation)
        expect(
          'type Value<T> = T extends { value: infer _ } ? _ : never',
        ).not.toMatch(retiredReturnAnnotation)
      },
    ),
    { seed: 269003, numRuns: 200 },
  )
})
