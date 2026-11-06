import fc from 'fast-check'
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { expect, test } from 'vitest'

import { declarationContract } from './declarationContract.mjs'

const corpus = JSON.parse(
  readFileSync(
    join(
      dirname(fileURLToPath(import.meta.url)),
      'fixtures/foldkit-generated-failure-metadata.json',
    ),
    'utf8',
  ),
)

test('declaration comparisons preserve types, docs and comment-like literal text', () => {
  fc.assert(
    fc.property(fc.string(), fc.boolean(), (value, readonly) => {
      const prefix =
        '/** User documentation: ' +
        JSON.stringify(value).replaceAll('*/', '* /') +
        ' */\n'
      const signature =
        'export interface Contract {\n  ' +
        (readonly ? 'readonly ' : '') +
        'value: ' +
        JSON.stringify(value) +
        '\n  run(): number\n}\n'
      const original = prefix + signature
      const native =
        prefix +
        signature.replace(
          '  run(): number',
          '  /** @throws {never} */\n  run(): number',
        )
      const expected = declarationContract(original)
      expect(declarationContract(native)).toBe(expected)
      expect(declarationContract(original)).toBe(expected)
      expect(
        declarationContract(native.replace('run(): number', 'run(): string')),
      ).not.toBe(expected)
      expect(
        declarationContract(
          native.replace('User documentation:', 'Changed documentation:'),
        ),
      ).not.toBe(expected)
      expect(
        declarationContract(native.replace('{never}', '{unknown}')),
      ).not.toBe(expected)
      const changedReadonly = readonly
        ? native.replace('readonly value:', 'value:')
        : native.replace('value:', 'readonly value:')
      expect(declarationContract(changedReadonly)).not.toBe(expected)
      expect(declarationContract(native.replace('value:', 'value?:'))).not.toBe(
        expected,
      )
    }),
    { seed: corpus.seed, numRuns: corpus.runs },
  )
  const literal = 'export type Literal = `line\n/** @throws {never} */\nend`\n'
  expect(declarationContract(literal)).toContain('/** @throws {never} */')
  expect(declarationContract(literal.replace('{never}', '{unknown}'))).not.toBe(
    declarationContract(literal),
  )
})
