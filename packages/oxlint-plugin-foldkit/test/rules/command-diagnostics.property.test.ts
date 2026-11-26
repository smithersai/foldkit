import * as Testing from 'effect-oxlint/testing'
import fc from 'fast-check'
import { expect, it } from 'vitest'

import { commandBindingMatchesName } from '../../src/rules/command-binding-matches-name.vibe'

const name = fc
  .tuple(
    fc.constantFrom('Fetch', 'Save', 'Load', 'Delete'),
    fc.integer({ min: 0, max: 999 }),
  )
  .map(([prefix, suffix]) => prefix + suffix)

it('preserves diagnostic locations and names across Command definition forms', () => {
  fc.assert(
    fc.property(name, name, fc.boolean(), (binding, declared, isCurried) => {
      const define = Testing.callOfMember('Command', 'define', [
        Testing.strLiteral(declared),
        ...(isCurried ? [] : [Testing.id('config')]),
      ])
      const init = isCurried
        ? {
            type: 'CallExpression',
            callee: define,
            arguments: [Testing.id('implementation')],
          }
        : define
      const id = Testing.id(binding)
      const diagnostics = Testing.runRule(
        commandBindingMatchesName,
        'VariableDeclarator',
        { type: 'VariableDeclarator', id, init },
      )
      expect(diagnostics).toHaveLength(binding === declared ? 0 : 1)
      if (binding !== declared) {
        expect(diagnostics[0]?.diagnostic.node).toBe(id)
        expect(diagnostics[0]?.diagnostic.message).toContain(binding)
        expect(diagnostics[0]?.diagnostic.message).toContain(declared)
      }
    }),
    { seed: 531180, numRuns: 200 },
  )
})
