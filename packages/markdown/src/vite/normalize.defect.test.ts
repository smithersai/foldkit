import { Effect, Exit } from 'effect'
import fc from 'fast-check'
import type { Root } from 'mdast'
import { readFileSync } from 'node:fs'
import { URL as NodeURL } from 'node:url'
import { expect, it, vi } from 'vitest'

const fault = vi.hoisted((): { constructor: string; value: unknown } => ({
  constructor: '',
  value: undefined,
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
      const constructor = original[name]
      if (typeof constructor !== 'function') {
        throw new TypeError(`Missing AST constructor: ${name}`)
      }
      return Reflect.apply(constructor, undefined, args)
    }
  }
  return result
})

import { normalize } from './normalize.vibe'

const corpus: Readonly<{
  seed: number
  runs: number
  cases: ReadonlyArray<
    Readonly<{ constructor: string; node: Root['children'][number] }>
  >
}> = JSON.parse(
  readFileSync(
    new NodeURL(
      './corpus/foldkit-markdown-ast-constructors.json',
      import.meta.url,
    ),
    'utf8',
  ),
)

it('preserves the exact defect from every AST constructor', () => {
  fc.assert(
    fc.property(fc.anything(), failure => {
      for (const { constructor: name, node } of corpus.cases) {
        fault.constructor = name
        fault.value = failure
        try {
          const root: Root = { type: 'root', children: [node] }
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
