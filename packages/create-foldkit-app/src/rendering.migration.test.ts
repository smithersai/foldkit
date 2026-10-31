import fc from 'fast-check'
import { describe, expect, it } from 'vitest'

import { Scaffold as OriginalScaffold } from '../test/fixtures/foldkit-scaffold-data.ts'
import { EXAMPLE_VALUES } from './examples.ts'
import { Scaffold } from './rendering.vibe'

describe('native scaffold data migration', () => {
  it('preserves constructors, guards and exhaustive matching for every rendering', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('Spa', 'Ssg', 'Ssr'),
        fc.constantFrom(...EXAMPLE_VALUES),
        (variant, example) => {
          const original =
            variant === 'Spa'
              ? OriginalScaffold.Spa({ example })
              : variant === 'Ssg'
                ? OriginalScaffold.Ssg()
                : OriginalScaffold.Ssr()
          const native =
            variant === 'Spa'
              ? Scaffold.Spa({ example })
              : variant === 'Ssg'
                ? Scaffold.Ssg()
                : Scaffold.Ssr()
          expect(native).toEqual(original)
          expect(Object.getPrototypeOf(native)).toBe(
            Object.getPrototypeOf(original),
          )
          for (const tag of ['Spa', 'Ssg', 'Ssr'] as const) {
            expect(Scaffold.$is(tag)(native)).toBe(
              OriginalScaffold.$is(tag)(original),
            )
          }
          const choose = {
            Spa: ({ example }: Readonly<{ example: string }>) => example,
            Ssg: () => 'ssg',
            Ssr: () => 'ssr',
          }
          expect(Scaffold.$match(native, choose)).toBe(
            OriginalScaffold.$match(original, choose),
          )
        },
      ),
      { numRuns: 300, seed: 33179 },
    )
  })
})
