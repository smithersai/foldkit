import { Diagnostic, Rule, RuleContext, Visitor } from 'effect-oxlint'
import * as Testing from 'effect-oxlint/testing'
import * as Effect from 'effect/Effect'
import * as Fiber from 'effect/Fiber'
import * as Ref from 'effect/Ref'
import * as Schema from 'effect/Schema'
import * as fc from 'fast-check'
import { describe, expect, test } from 'vitest'
const makeDiagnostic = Diagnostic.make

describe('Rule.define native Effect callbacks', () => {
  test.each(['effect', 'generator'] as const)(
    'constructs %s callbacks inside the original fiber context',
    kind => {
      let observed: ReturnType<typeof Fiber.getCurrent>
      const rule = Rule.define({
        name: 'create-fiber-context',
        meta: Rule.meta({
          type: 'problem',
          description: 'Factory context',
        }),
        create: () => {
          observed = Fiber.getCurrent()
          return kind === 'effect'
            ? Effect.succeed({})
            : (function* () {
                return {}
              })()
        },
      })
      Testing.runRule(rule, 'ThrowStatement', Testing.throwStmt())
      expect(observed).toBeDefined()
    },
  )

  const meta = Rule.meta({ type: 'problem', description: 'Native create' })
  test('runs an Effect callback with RuleContext', () => {
    const rule = Rule.define({
      name: 'native-context',
      meta,
      create: () =>
        Effect.gen(function* () {
          const context = yield* RuleContext
          return Visitor.on('ThrowStatement', node =>
            context.report(makeDiagnostic({ node, message: 'native' })),
          )
        }),
    })
    expect(
      Testing.runRule(rule, 'ThrowStatement', Testing.throwStmt())[0]
        ?.diagnostic.message,
    ).toBe('native')
  })
  test('defers setup until a file is visited and runs it once per file', () => {
    let creates = 0
    const rule = Rule.define({
      name: 'native-lazy',
      meta,
      create: () =>
        Effect.sync(() => {
          creates++
          return {}
        }),
    })
    expect(creates).toBe(0)
    Testing.runRuleMulti(rule, [
      ['ThrowStatement', Testing.throwStmt()],
      ['ThrowStatement', Testing.throwStmt()],
    ])
    expect(creates).toBe(1)
    Testing.runRule(rule, 'ThrowStatement', Testing.throwStmt())
    expect(creates).toBe(2)
  })
  test('preserves defects from Effect callback setup', () => {
    const rule = Rule.define({
      name: 'native-defect',
      meta,
      create: () => Effect.die(new Error('native setup defect')),
    })
    expect(() =>
      Testing.runRule(rule, 'ThrowStatement', Testing.throwStmt()),
    ).toThrow('native setup defect')
  })
  test('Effect and generator callbacks preserve options, state and visitor order', () => {
    fc.assert(
      fc.property(
        fc.string(),
        fc.integer({ min: -100, max: 100 }),
        fc.array(fc.boolean(), { maxLength: 20 }),
        (prefix, delta, enabled) => {
          const options = Schema.Struct({
            prefix: Schema.String,
            delta: Schema.Number,
          })
          const create = function* (decoded: {
            readonly prefix: string
            readonly delta: number
          }) {
            const context = yield* RuleContext
            const count = yield* Ref.make(0)
            return Visitor.on('ThrowStatement', node =>
              Effect.gen(function* () {
                const index = yield* Ref.get(count)
                yield* Ref.update(count, value => value + 1)
                if (enabled[index])
                  yield* context.report(
                    makeDiagnostic({
                      node,
                      message: `${decoded.prefix}:${index + decoded.delta}`,
                    }),
                  )
              }),
            )
          }
          const legacy = Rule.define({
            name: 'legacy-property',
            meta,
            options,
            create,
          })
          const native = Rule.define({
            name: 'native-property',
            meta,
            options,
            create: decoded => Effect.gen(() => create(decoded)),
          })
          const visits = enabled.map(
            () => ['ThrowStatement', Testing.throwStmt()] as const,
          )
          const input = { options: [{ prefix, delta }] }
          const expected = enabled.flatMap((value, index) =>
            value ? [`${prefix}:${index + delta}`] : [],
          )
          const legacyMessages = Testing.runRuleMulti(
            legacy,
            visits,
            input,
          ).map(result => result.diagnostic.message)
          const nativeMessages = Testing.runRuleMulti(
            native,
            visits,
            input,
          ).map(result => result.diagnostic.message)
          expect(legacyMessages).toEqual(expected)
          expect(nativeMessages).toEqual(expected)
        },
      ),
      { numRuns: 100, seed: 21037 },
    )
  })
})
