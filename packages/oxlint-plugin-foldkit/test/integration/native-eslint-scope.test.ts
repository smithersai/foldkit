import * as fc from 'fast-check'
import { spawnSync } from 'node:child_process'
import {
  copyFileSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  symlinkSync,
  writeFileSync,
} from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { expect, it } from 'vitest'

const here = dirname(fileURLToPath(import.meta.url))
const pluginRoot = join(here, '..', '..')
const repoRoot = join(pluginRoot, '..', '..')
const corpus = readFileSync(
  join(
    pluginRoot,
    'test',
    'integration',
    'fixtures',
    'foldkit-eslint-ignore-scope.vibe',
  ),
  'utf8',
)
const relativePath = (root: string, file: string): string =>
  relative(root, resolve(root, file)).split('\\').join('/')

it.each([
  {
    scope: 'root',
    configFile: 'eslint.config.mjs',
    oxlintFile: '.oxlintrc.json',
  },
  {
    scope: 'application',
    configFile: 'eslint.app.config.mjs',
    oxlintFile: '.oxlintrc.app.json',
  },
  {
    scope: 'Effect',
    configFile: 'eslint.effect.config.mjs',
    oxlintFile: '.oxlintrc.effect.json',
  },
])(
  '$scope retains exclusions and checks native siblings across generated directory trees',
  ({ configFile, oxlintFile }) => {
    fc.assert(
      fc.property(
        fc.array(
          fc.record({
            label: fc.stringMatching(/^[a-zA-Z]{1,8}$/),
            nested: fc.boolean(),
          }),
          { minLength: 8, maxLength: 12 },
        ),
        cases => {
          const root = mkdtempSync(
            join(tmpdir(), 'foldkit-native-eslint-scope-'),
          )
          try {
            mkdirSync(join(root, '.vibelang'))
            symlinkSync(
              join(repoRoot, 'node_modules'),
              join(root, 'node_modules'),
              process.platform === 'win32' ? 'junction' : 'dir',
            )
            copyFileSync(
              join(repoRoot, '.vibelang', configFile),
              join(root, '.vibelang', 'eslint.config.mjs'),
            )
            const tsFiles: Array<string> = []
            const nativeFiles: Array<string> = []
            const visibleFiles: Array<string> = []
            const ignorePatterns = cases.map(
              (entry, index) => 'ignored-' + index + '-' + entry.label + '/',
            )
            for (const [index, entry] of cases.entries()) {
              const prefix = 'ignored-' + index + '-' + entry.label
              for (const isIgnored of [true, false]) {
                const directory = join(
                  prefix + (isIgnored ? '' : '-visible'),
                  ...(entry.nested ? ['nested', 'leaf'] : []),
                )
                mkdirSync(join(root, directory), { recursive: true })
                const tsFile = join(directory, 'case.ts')
                const nativeFile = join(directory, 'case.vibe')
                writeFileSync(join(root, tsFile), corpus)
                writeFileSync(join(root, nativeFile), corpus)
                tsFiles.push(tsFile)
                nativeFiles.push(nativeFile)
                if (!isIgnored)
                  visibleFiles.push(relativePath(root, nativeFile))
              }
            }
            writeFileSync(
              join(root, oxlintFile),
              JSON.stringify({
                categories: { correctness: 'off' },
                rules: { 'no-debugger': 'error' },
                ignorePatterns,
              }),
            )
            const control = spawnSync(
              process.execPath,
              [
                join(repoRoot, 'node_modules', 'oxlint', 'bin', 'oxlint'),
                '--threads=1',
                '--config',
                oxlintFile,
                '--disable-nested-config',
                '--format=json',
                ...tsFiles,
              ],
              { cwd: root, encoding: 'utf8', timeout: 60_000 },
            )
            expect(control.status, control.stderr).toBe(1)
            const original: {
              diagnostics: ReadonlyArray<{ filename: string; code?: string }>
            } = JSON.parse(control.stdout)
            const expected = original.diagnostics
              .filter(diagnostic => diagnostic.code === 'eslint(no-debugger)')
              .map(diagnostic =>
                relativePath(root, diagnostic.filename).replace(
                  /\.ts$/,
                  '.vibe',
                ),
              )
              .sort()
            expect(expected).toEqual(visibleFiles.sort())
            const native = spawnSync(
              process.execPath,
              [
                join(repoRoot, 'node_modules', 'eslint', 'bin', 'eslint.js'),
                '--config',
                '.vibelang/eslint.config.mjs',
                '--format=json',
                '--no-warn-ignored',
                ...nativeFiles,
              ],
              { cwd: root, encoding: 'utf8', timeout: 60_000 },
            )
            expect(native.status, native.stderr).toBe(1)
            const checked: ReadonlyArray<{
              filePath: string
              messages: ReadonlyArray<{ ruleId?: string }>
            }> = JSON.parse(native.stdout)
            const actual = checked
              .filter(file =>
                file.messages.some(message => message.ruleId === 'no-debugger'),
              )
              .map(file => relativePath(root, file.filePath))
              .sort()
            expect(actual).toEqual(expected)
          } finally {
            rmSync(root, { recursive: true, force: true })
          }
        },
      ),
      { numRuns: 10, seed: 43039, endOnFailure: true },
    )
  },
  180_000,
)
