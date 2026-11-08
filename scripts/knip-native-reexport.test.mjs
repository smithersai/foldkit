import fc from 'fast-check'
import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import {
  mkdirSync,
  mkdtempSync,
  readFileSync,
  realpathSync,
  rmSync,
  symlinkSync,
  writeFileSync,
} from 'node:fs'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'
import { after, before, test } from 'node:test'
import ts from 'typescript'

const ROOT = resolve(import.meta.dirname, '..')
const corpus = JSON.parse(
  readFileSync(
    join(
      ROOT,
      'scripts/fixtures/knip-native-reexport/foldkit-ui-typeonly-js-reexport.json',
    ),
    'utf8',
  ),
)
const knipRoot = realpathSync(join(ROOT, 'node_modules/knip'))
const knipManifest = JSON.parse(
  readFileSync(join(knipRoot, 'package.json'), 'utf8'),
)
const knipBin =
  typeof knipManifest.bin === 'string'
    ? knipManifest.bin
    : knipManifest.bin.knip
const { _createSyncModuleResolver } = await import(
  new URL('./util/resolve.js', import.meta.resolve('knip')).href
)
const parent = process.env.FOLDKIT_TEST_TMPDIR ?? tmpdir()
let directory

const run = (command, args, options = {}) => {
  const result = spawnSync(command, args, {
    cwd: directory,
    encoding: 'utf8',
    env: { ...process.env, CI: 'true' },
    ...options,
  })
  assert.equal(result.error, undefined, String(result.error))
  assert.equal(result.signal, null, String(result.signal))
  return result
}

before(() => {
  directory = mkdtempSync(join(parent, 'foldkit-knip-reexport-'))
  mkdirSync(join(directory, 'src'))
  for (const [name, source] of Object.entries(corpus.files))
    writeFileSync(join(directory, 'src', name), source)
  symlinkSync(
    join(ROOT, 'packages/ui/node_modules'),
    join(directory, 'node_modules'),
    'dir',
  )
  writeFileSync(
    join(directory, 'package.json'),
    '{"private":true,"type":"module"}\n',
  )
  for (const project of ['tsconfig.json', 'tsconfig.docs.json']) {
    const configPath = join(ROOT, 'packages/ui', project)
    const loaded = ts.readConfigFile(configPath, ts.sys.readFile)
    assert.equal(loaded.error, undefined)
    const parsed = ts.parseJsonConfigFileContent(
      loaded.config,
      ts.sys,
      join(ROOT, 'packages/ui'),
    )
    writeFileSync(
      join(directory, project),
      JSON.stringify({
        compilerOptions: {
          module: 'NodeNext',
          moduleResolution: 'NodeNext',
          target: 'ESNext',
          strict: true,
          skipLibCheck: true,
          declaration: true,
          rootDir: 'src',
          outDir: 'dist',
          allowArbitraryExtensions: true,
          rewriteRelativeImportExtensions: true,
          moduleSuffixes: parsed.options.moduleSuffixes,
        },
        include: ['src/**/*'],
      }),
    )
  }
  writeFileSync(
    join(directory, 'knip.config.mjs'),
    "import vibelang from 'vibelang/knip'\n" +
      "export default {entry:['src/foldkit-ui-typeonly-js-reexport.ts'],project:['src/**/*.{ts,vibe}'],ignore:['**/*.d.vibe.ts'],compilers:{vibe:vibelang}}\n",
  )
  const result = run(process.execPath, [
    join(ROOT, 'packages/ui/node_modules/vibelang/bin/vibelang'),
    '--singleThreaded',
    '-p',
    'tsconfig.json',
  ])
  assert.equal(result.status, 0, result.stdout + result.stderr)
})

after(() => {
  if (directory) rmSync(directory, { recursive: true, force: true })
})

test('stock TypeScript resolves the original Foldkit JS re-export without changing its declaration', () => {
  for (const project of ['tsconfig.json', 'tsconfig.docs.json']) {
    const result = run(process.execPath, [
      join(ROOT, 'packages/ui/node_modules/typescript/bin/tsc'),
      '-p',
      project,
      '--noEmit',
    ])
    assert.equal(
      result.status,
      0,
      project + '\n' + result.stdout + result.stderr,
    )
  }
  const original = corpus.files['foldkit-ui-typeonly-js-reexport.ts']
  const declaration = readFileSync(
    join(directory, 'dist/foldkit-ui-typeonly-js-reexport.d.ts'),
    'utf8',
  )
  assert.equal(declaration, original.trimEnd() + ';\n')
})

test('Knip follows the original type-only JS re-export into native source', () => {
  const result = run(process.execPath, [
    '--import',
    'vibelang/register',
    join(knipRoot, knipBin),
    '--config',
    'knip.config.mjs',
    '--include',
    'unresolved',
    '--no-progress',
  ])
  assert.equal(result.status, 0, result.stdout + result.stderr)
})

const segment = fc
  .array(fc.constantFrom('a', 'b', 'Z', '0', '-', '_', 'é', '界', ' '), {
    minLength: 1,
    maxLength: 12,
  })
  .map(parts => parts.join(''))

test('native JS fallback preserves ordinary source precedence and requires registration', () => {
  let index = 0
  const configured = _createSyncModuleResolver([
    '.js',
    '.ts',
    '.tsx',
    '.vibe',
    '.d.ts',
  ])
  const unconfigured = _createSyncModuleResolver([
    '.js',
    '.ts',
    '.tsx',
    '.d.ts',
  ])
  fc.assert(
    fc.property(
      fc.record({
        directories: fc.array(segment, { minLength: 0, maxLength: 3 }),
        name: segment,
        ordinary: fc.constantFrom('', '.js', '.ts', '.tsx', '.d.ts'),
      }),
      ({ directories, name, ordinary }) => {
        const base = join(directory, 'property-' + index++, ...directories)
        mkdirSync(base, { recursive: true })
        const source = join(base, name + '.vibe')
        const containingFile = join(base, 'public.ts')
        writeFileSync(source, 'export const value = 1\n')
        writeFileSync(containingFile, "export * from './" + name + ".js'\n")
        const expected = ordinary ? join(base, name + ordinary) : source
        if (ordinary) writeFileSync(expected, 'export const value = 2\n')
        assert.equal(configured('./' + name + '.js', containingFile), expected)
        assert.equal(
          unconfigured('./' + name + '.js', containingFile),
          ordinary ? expected : undefined,
        )
      },
    ),
    { numRuns: 1000, seed: 531108 },
  )
})
