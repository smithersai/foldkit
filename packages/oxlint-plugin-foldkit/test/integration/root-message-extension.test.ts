import * as fc from 'fast-check'
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { afterAll, expect, it } from 'vitest'

import { runOxlint } from './run-oxlint.ts'

const here = dirname(fileURLToPath(import.meta.url))
const pluginRoot = join(here, '..', '..')
const repoRoot = join(pluginRoot, '..', '..')
const work = mkdtempSync(join(tmpdir(), 'foldkit-root-message-extension-'))
const configPath = join(work, 'oxlint.json')
writeFileSync(
  configPath,
  JSON.stringify({
    plugins: ['typescript'],
    jsPlugins: [
      {
        name: 'foldkit',
        specifier: pathToFileURL(join(pluginRoot, 'dist/index.js')).href,
      },
    ],
    categories: { correctness: 'off' },
    rules: { 'foldkit/no-child-message-construction-in-root': 'error' },
  }),
)

afterAll(() => rmSync(work, { recursive: true, force: true }))

type Case = Readonly<{
  source: string
  isChild: boolean
  isNamespaceImport: boolean
}>
const check = (cases: ReadonlyArray<Case>) => {
  const file = join(work, 'entry.ts')
  const source = cases
    .map((entry, index) => {
      const name = 'Source' + index
      const imported = entry.isNamespaceImport
        ? '* as ' + name
        : '{ Message as ' + name + ' }'
      const callee =
        name +
        (entry.isNamespaceImport ? '.Message' : '') +
        '.ClickedLink' +
        index
      return (
        'import ' +
        imported +
        ' from ' +
        JSON.stringify(entry.source) +
        ';\n' +
        'export const route' +
        index +
        ' = () => ' +
        callee +
        '({});'
      )
    })
    .join('\n')
  writeFileSync(file, source)
  const diagnostics = runOxlint({
    oxlintBin: join(repoRoot, 'node_modules', 'oxlint', 'bin', 'oxlint'),
    cwd: work,
    configPath,
    target: file,
  })
  const actual = diagnostics
    .map(diagnostic => {
      expect(diagnostic.code).toBe(
        'foldkit(no-child-message-construction-in-root)',
      )
      const match = diagnostic.message.match(/ClickedLink([0-9]+)/)
      expect(match).not.toBeNull()
      return Number(match?.[1])
    })
    .sort((left, right) => left - right)
  const expected = cases.flatMap((entry, index) =>
    entry.isChild ? [index] : [],
  )
  expect(actual).toEqual(expected)
}

it('keeps the minimized Foldkit root main.vibe routing pattern valid', () => {
  const corpus = readFileSync(
    join(here, 'fixtures', 'foldkit-root-message-extension.ts'),
    'utf8',
  )
  const file = join(work, 'entry.ts')
  writeFileSync(file, corpus)
  expect(
    runOxlint({
      oxlintBin: join(repoRoot, 'node_modules', 'oxlint', 'bin', 'oxlint'),
      cwd: work,
      configPath,
      target: file,
    }),
  ).toEqual([])
})

it('recognizes native root modules while retaining child ownership across paths and import styles', () => {
  fc.assert(
    fc.property(
      fc.array(
        fc.record({
          module: fc.constantFrom(
            'main',
            'message',
            'index',
            'schema',
            'Main',
            'MESSAGE',
          ),
          extension: fc.constantFrom(
            'vibe',
            'ts',
            'js',
            'mts',
            'mjs',
            'cts',
            'cjs',
            'tsx',
            'jsx',
          ),
          prefix: fc.constantFrom('./', '../', '../../', '@/', '~/'),
          isChild: fc.boolean(),
          isNamespaceImport: fc.boolean(),
        }),
        { minLength: 100, maxLength: 100 },
      ),
      entries =>
        check(
          entries.map(entry => ({
            source:
              entry.prefix +
              (entry.isChild ? 'child/' : '') +
              entry.module +
              '.' +
              entry.extension,
            isChild: entry.isChild,
            isNamespaceImport: entry.isNamespaceImport,
          })),
        ),
    ),
    { seed: 53168, numRuns: 10, endOnFailure: true },
  )
}, 120_000)
