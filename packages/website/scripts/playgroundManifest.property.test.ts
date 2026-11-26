// @vitest-environment node
import { Array } from 'effect'
import fc from 'fast-check'
import { expect, test } from 'vitest'

import corpus from './fixtures/foldkit-playground-manifest-parsing.json'
import {
  PLAYGROUND_DEPENDENCY_OVERRIDES,
  transformPackageJson,
  transformTsConfig,
} from './playgroundManifest.ts'

test('preserves synchronous manifest rewrites and workspace resolution', () => {
  fc.assert(
    fc.property(fc.string(), fc.string(), (name, version) => {
      const raw = JSON.stringify({
        name,
        scripts: { dev: 'vite --host', check: 'vibelang --noEmit' },
        dependencies: { foldkit: 'workspace:*', other: '^1' },
        devDependencies: { vite: '^8', unused: '^2' },
        optionalDependencies: { foldkit: 'workspace:^' },
        peerDependencies: { foldkit: 'workspace:~' },
        overrides: { custom: '2', rolldown: 'wrong' },
      })
      const value = JSON.parse(
        transformPackageJson(raw, { foldkit: version }, true),
      )
      expect(value.name).toBe(name)
      expect(value.scripts).toEqual({
        dev: 'node --import vibelang/register ./node_modules/vite/bin/vite.js --configLoader native --host',
        check: 'vibelang --noEmit',
      })
      expect(value.dependencies).toEqual({ foldkit: version, other: '^1' })
      expect(value.devDependencies).toEqual({ vite: '^8' })
      expect(value.optionalDependencies).toEqual({ foldkit: version })
      expect(value.peerDependencies).toEqual({ foldkit: version })
      expect(value.overrides).toEqual({
        custom: '2',
        ...PLAYGROUND_DEPENDENCY_OVERRIDES,
      })
      expect(
        JSON.parse(transformPackageJson(raw, { foldkit: version }, false))
          .scripts.dev,
      ).toBe('vite --host')
    }),
    { seed: corpus.packageSeed, numRuns: 200 },
  )
})

test('keeps parser failures synchronous for each text transform', () => {
  for (const invalid of corpus.invalid) {
    expect(() => transformPackageJson(invalid, {}, false)).toThrow(SyntaxError)
    expect(() => transformTsConfig(invalid, {}, [], Array.dedupe)).toThrow(
      SyntaxError,
    )
  }
  fc.assert(
    fc.property(fc.string(), suffix => {
      const invalid = '{' + JSON.stringify(suffix) + ':'
      expect(() => transformPackageJson(invalid, {}, false)).toThrow(
        SyntaxError,
      )
      expect(() => transformTsConfig(invalid, {}, [], Array.dedupe)).toThrow(
        SyntaxError,
      )
      expect(() =>
        transformPackageJson(
          '{"dependencies":{"missing":"workspace:*"}}',
          {},
          false,
        ),
      ).toThrow('is not a public workspace package')
    }),
    { seed: corpus.parserSeed, numRuns: 100 },
  )
})

test('preserves tsconfig merge precedence and Effect deduplication', () => {
  fc.assert(
    fc.property(fc.array(fc.string()), fc.array(fc.string()), (base, local) => {
      const value = JSON.parse(
        transformTsConfig(
          JSON.stringify({
            extends: '../../tsconfig.base.json',
            compilerOptions: { strict: false },
            include: ['src'],
            vibelang: { explicitEffects: true },
            exclude: local,
          }),
          { strict: true, target: 'ES2022' },
          base,
          Array.dedupe,
        ),
      )
      expect(value).toEqual({
        compilerOptions: { strict: false, target: 'ES2022' },
        include: ['src'],
        vibelang: { explicitEffects: true },
        exclude: Array.dedupe([...base, ...local]),
      })
    }),
    { seed: corpus.tsconfigSeed, numRuns: 200 },
  )
})
