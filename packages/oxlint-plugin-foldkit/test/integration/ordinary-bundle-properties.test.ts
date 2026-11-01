import * as fc from 'fast-check'
import { mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { build } from 'rolldown'
import { expect, it } from 'vitest'

import sourcePlugin from '../corpus/foldkit-ordinary-rolldown-entry.ts'

const here = dirname(fileURLToPath(import.meta.url))
const snapshotRules = (plugin: typeof sourcePlugin) =>
  Object.fromEntries(
    Object.entries(plugin.rules).map(([name, rule]) => [
      name,
      { meta: rule.meta, hasCreate: typeof rule.create === 'function' },
    ]),
  )
const sourceRules = snapshotRules(sourcePlugin)
const ruleNames = Object.keys(sourceRules).sort()
const withBundledPlugin = async (
  check: (plugin: typeof sourcePlugin) => void,
) => {
  const work = mkdtempSync(join(tmpdir(), 'foldkit-ordinary-bundle-'))
  const bundlePath = join(work, 'plugin.mjs')
  try {
    await build({
      input: join(here, '..', 'corpus', 'foldkit-ordinary-rolldown-entry.ts'),
      platform: 'node',
      output: { file: bundlePath, format: 'esm' },
    })
    check((await import(pathToFileURL(bundlePath).href)).default)
  } finally {
    rmSync(work, { recursive: true, force: true })
  }
}

it(
  'loads every native rule through an ordinary Rolldown consumer',
  () =>
    withBundledPlugin(bundledPlugin => {
      const bundledRules = snapshotRules(bundledPlugin)
      expect(Object.keys(bundledRules).sort()).toEqual(ruleNames)
      expect(Object.values(bundledRules).every(rule => rule.hasCreate)).toBe(
        true,
      )
      expect(bundledPlugin.configs).toEqual(sourcePlugin.configs)
    }),
  60_000,
)

it(
  'preserves rule selections and preset entries across generated consumer configurations',
  () =>
    withBundledPlugin(bundledPlugin => {
      const bundledRules = snapshotRules(bundledPlugin)
      fc.assert(
        fc.property(
          fc.array(fc.constantFrom(...ruleNames), {
            maxLength: ruleNames.length * 2,
          }),
          fc.constantFrom('recommended' as const, 'all' as const),
          (selected, preset) => {
            for (const name of selected) {
              expect(bundledRules[name]).toEqual(sourceRules[name])
              const id = `foldkit/${name}`
              expect(bundledPlugin.configs[preset].rules[id]).toEqual(
                sourcePlugin.configs[preset].rules[id],
              )
            }
          },
        ),
        { seed: 53197, numRuns: 1000 },
      )
    }),
  60_000,
)
