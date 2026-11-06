import { Schema } from 'effect'
import fc from 'fast-check'
import { expect, it } from 'vitest'

import corpus from './fixtures/foldkit-anchor-config-undefined.json' with { type: 'json' }
import { AnchorConfig, Padding, Placement } from './public.js'

const reference = Schema.Struct({
  placement: Schema.optional(Placement),
  gap: Schema.optional(Schema.Number),
  offset: Schema.optional(Schema.Number),
  padding: Schema.optional(Padding),
  portal: Schema.optional(Schema.Boolean),
  isPlacementLocked: Schema.optional(Schema.Boolean),
})
const acceptsReference = Schema.is(reference)
const acceptsNative = Schema.is(AnchorConfig)
const keys = [
  'placement',
  'gap',
  'offset',
  'padding',
  'portal',
  'isPlacementLocked',
] as const

it.each(keys)('accepts a present undefined %s', key => {
  expect(acceptsNative({ [key]: undefined })).toBe(true)
})

const examples = corpus.map(({ value, presentUndefined }): [unknown] => [
  {
    ...value,
    ...Object.fromEntries(presentUndefined.map(key => [key, undefined])),
  },
])

it('matches the original anchor codec for omitted, undefined and invalid values', () => {
  const optionalNumber = fc.oneof(fc.double(), fc.constant(undefined))
  const input = fc.oneof(
    fc.anything(),
    fc.record(
      {
        placement: fc.oneof(
          fc.constantFrom(
            'top',
            'right',
            'bottom',
            'left',
            'top-start',
            'top-end',
            'right-start',
            'right-end',
            'bottom-start',
            'bottom-end',
            'left-start',
            'left-end',
          ),
          fc.constant(undefined),
        ),
        gap: optionalNumber,
        offset: optionalNumber,
        padding: fc.oneof(
          optionalNumber,
          fc.record(
            {
              top: optionalNumber,
              right: optionalNumber,
              bottom: optionalNumber,
              left: optionalNumber,
            },
            { requiredKeys: [] },
          ),
        ),
        portal: fc.oneof(fc.boolean(), fc.constant(undefined)),
        isPlacementLocked: fc.oneof(fc.boolean(), fc.constant(undefined)),
      },
      { requiredKeys: [] },
    ),
  )
  fc.assert(
    fc.property(input, value => {
      expect(acceptsNative(value)).toBe(acceptsReference(value))
    }),
    { numRuns: 512, examples },
  )
})
