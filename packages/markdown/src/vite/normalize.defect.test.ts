import { Effect, Exit } from 'effect'
import fc from 'fast-check'
import type { Root } from 'mdast'
import { expect, it, vi } from 'vitest'

const fault = vi.hoisted(() => ({
  constructor: '',
  value: undefined as unknown,
}))
vi.mock('../ast/index.js', async importOriginal => {
  const original = await importOriginal<Record<string, unknown>>()
  const result = { ...original }
  for (const name of [
    'Text',
    'InlineCode',
    'HardBreak',
    'Emphasis',
    'Strong',
    'Strikethrough',
    'Link',
    'Image',
    'TableCell',
    'TableRow',
    'Table',
    'Island',
    'ListItem',
    'Heading',
    'Paragraph',
    'CodeBlock',
    'List',
    'Blockquote',
    'ThematicBreak',
  ]) {
    result[name] = (...args: Array<unknown>) => {
      if (fault.constructor === name) throw fault.value
      return Reflect.apply(
        original[name] as (...args: Array<unknown>) => unknown,
        undefined,
        args,
      )
    }
  }
  return result
})

import corpus from './corpus/foldkit-markdown-ast-constructors.json' with { type: 'json' }
import { normalize } from './normalize.vibe'

it('preserves the exact defect from every AST constructor', () => {
  fc.assert(
    fc.property(fc.anything(), failure => {
      for (const { constructor: name, node } of corpus.cases) {
        fault.constructor = name
        fault.value = failure
        try {
          const root = { type: 'root', children: [node] } as unknown as Root
          const result = Effect.runSyncExit(normalize(root, {}))
          expect(result, name).toEqual(Exit.die(failure))
          if (Exit.isFailure(result)) {
            const [reason] = result.cause.reasons
            expect(reason?._tag).toBe('Die')
            if (reason?._tag === 'Die') expect(reason.defect).toBe(failure)
          }
        } finally {
          fault.constructor = ''
        }
      }
    }),
    { seed: corpus.seed, numRuns: corpus.runs },
  )
})
