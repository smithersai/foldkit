import fc from 'fast-check'
import { parseAst } from 'vite'
import { describe, expect, it } from 'vitest'

import { transformViewIdentity } from '../src/viewIdentity.ts'

const ROOT = '/native-owner'
const COMPILED_VIEW =
  'export const makeView = () => { const view = () => ({ type: "node" }); return view() }\n'
const ALIAS = '__foldkitBrandViewResult'

describe('native view ownership', () => {
  it('preserves the TypeScript owner when its source becomes native', () => {
    const original = transformViewIdentity(
      COMPILED_VIEW,
      ROOT + '/src/animation/index.ts',
      ROOT,
    )
    const native = transformViewIdentity(
      COMPILED_VIEW,
      ROOT + '/src/animation/index.vibe',
      ROOT,
    )
    expect(original).not.toBeNull()
    expect(native).not.toBeNull()
    expect(native?.code).toBe(original?.code)
    expect(native?.code).toContain('"src/animation/index.ts#view"')
  })

  it('does not instrument a generated native declaration sidecar', () => {
    expect(
      transformViewIdentity(
        COMPILED_VIEW,
        ROOT + '/src/view.d.vibe.ts?import',
        ROOT,
      ),
    ).toBeNull()
  })

  it('keeps canonical owners, queries, source positions and idempotence across native paths', () => {
    const segment = fc
      .array(fc.constantFrom('a', 'Z', '0', '-', '_', 'é', '界'), {
        minLength: 1,
        maxLength: 12,
      })
      .map(chars => chars.join(''))
    fc.assert(
      fc.property(
        fc.array(segment, { minLength: 1, maxLength: 5 }),
        fc.constantFrom('', '?v=42', '?t=123&import'),
        (segments, query) => {
          const path = '/src/' + segments.join('/')
          const original = transformViewIdentity(
            COMPILED_VIEW,
            ROOT + path + '.ts' + query,
            ROOT,
          )
          const native = transformViewIdentity(
            COMPILED_VIEW,
            ROOT + path + '.vibe' + query,
            ROOT,
          )
          expect(native).not.toBeNull()
          expect(native?.code).toBe(original?.code)
          expect(native?.map.toString()).toBe(original?.map.toString())
          if (native === null) throw new Error('expected native view branding')
          expect(() => parseAst(native.code)).not.toThrow()
          expect(
            transformViewIdentity(
              native.code,
              ROOT + path + '.vibe' + query,
              ROOT,
            ),
          ).toBeNull()
          const execute = new Function(
            ALIAS,
            native.code
              .split('\n')
              .filter(line => !line.includes("from 'foldkit/brand'"))
              .join('\n')
              .replace('export const ', 'const ') + '\nreturn makeView()',
          )
          const branded: Array<string> = []
          execute((value: unknown, owner: string) => {
            branded.push(owner)
            return value
          })
          expect(branded).toEqual([
            path.slice(1) + '.ts#view',
            path.slice(1) + '.ts#makeView',
          ])
          for (const excluded of [
            ROOT + '/node_modules/pkg/view.vibe',
            ROOT + '/packages/foldkit/src/view.vibe',
            '\0virtual:view.vibe',
            ROOT + path + '.d.vibe.ts' + query,
          ]) {
            expect(
              transformViewIdentity(COMPILED_VIEW, excluded, ROOT),
            ).toBeNull()
          }
        },
      ),
      { numRuns: 250, seed: 33176 },
    )
  })

  it.each(['ts', 'tsx', 'js', 'jsx', 'mts', 'mjs'])(
    'preserves existing %s module identity',
    extension => {
      const result = transformViewIdentity(
        COMPILED_VIEW,
        ROOT + '/src/view.' + extension,
        ROOT,
      )
      expect(result?.code).toContain('"src/view.' + extension + '#view"')
    },
  )
})
