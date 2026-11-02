import fc from 'fast-check'
import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import {
  copyFileSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from 'node:fs'
import { createRequire } from 'node:module'
import { dirname, join, resolve } from 'node:path'
import test from 'node:test'
import { fileURLToPath } from 'node:url'

const scripts = dirname(fileURLToPath(import.meta.url))
const root = resolve(scripts, '../../..')
const corpus = JSON.parse(
  readFileSync(
    join(scripts, 'fixtures', 'foldkit-native-fixture-sidecar-resolution.json'),
    'utf8',
  ),
)
const fixtureName = 'foldkit-module-directory'
const sidecar = join(scripts, 'fixtures', fixtureName + '.d.vibe.ts')
const caller = join(scripts, 'moduleDirectory.test.ts')
const native = join(scripts, 'fixtures', fixtureName + '.vibe')
const run = args => {
  const result = spawnSync('pnpm', args, {
    cwd: root,
    env: process.env,
    encoding: 'utf8',
    timeout: 30000,
  })
  return {
    status: result.status,
    output: (result.stdout ?? '') + (result.stderr ?? ''),
    error: result.error,
  }
}

test(
  'native fixture contracts survive fresh typed lint and reject an unknown error channel',
  { timeout: 90000 },
  () => {
    const directory = mkdtempSync(join(scripts, '.native-fixture-lint-'))
    const originalCaller = readFileSync(caller)
    const originalNative = readFileSync(native)
    const originalSidecar = existsSync(sidecar) ? readFileSync(sidecar) : null
    try {
      mkdirSync(join(directory, 'fixtures'))
      copyFileSync(caller, join(directory, 'moduleDirectory.test.ts'))
      copyFileSync(native, join(directory, 'fixtures', fixtureName + '.vibe'))
      const copiedSidecar = join(
        directory,
        'fixtures',
        fixtureName + '.d.vibe.ts',
      )
      if (originalSidecar !== null)
        writeFileSync(copiedSidecar, originalSidecar)
      writeFileSync(
        join(directory, 'tsconfig.json'),
        JSON.stringify({
          extends: join(scripts, '..', 'tsconfig.json'),
          files: ['moduleDirectory.test.ts'],
          include: [],
          exclude: [],
        }),
      )
      const patched = run([
        'exec',
        'effect-tsgo',
        'patch',
        '--no-typescript',
        '--oxlint',
      ])
      assert.equal(patched.error, undefined, patched.output)
      assert.equal(patched.status, 0, patched.output)

      const lint = () =>
        run([
          'exec',
          'oxlint',
          '--config',
          '.oxlintrc.effect.json',
          '--disable-nested-config',
          '--deny-warnings',
          '--no-ignore',
          join(directory, 'moduleDirectory.test.ts'),
        ])
      const fresh = lint()
      assert.equal(fresh.error, undefined, fresh.output)
      assert.equal(fresh.status, 0, fresh.output)

      const declaration = readFileSync(copiedSidecar, 'utf8')
      const neverChannel = /,\s*never\s*,/
      assert.match(declaration, neverChannel)
      writeFileSync(
        copiedSidecar,
        declaration.replace(neverChannel, ', unknown,'),
      )
      const mutant = lint()
      assert.equal(mutant.error, undefined, mutant.output)
      assert.notEqual(mutant.status, 0, mutant.output)
      assert.match(mutant.output, /any-unknown-in-error-context/)
      assert.match(mutant.output, /moduleDirectory\.test\.ts/)
      writeFileSync(copiedSidecar, declaration)
      const restored = lint()
      assert.equal(restored.error, undefined, restored.output)
      assert.equal(restored.status, 0, restored.output)
    } finally {
      rmSync(directory, { recursive: true, force: true })
      assert.deepEqual(readFileSync(caller), originalCaller)
      assert.deepEqual(readFileSync(native), originalNative)
      assert.deepEqual(
        existsSync(sidecar) ? readFileSync(sidecar) : null,
        originalSidecar,
      )
    }
  },
)

test(
  'stock resolution follows native sidecars across generated fixture names and deletion',
  { timeout: 30000 },
  () => {
    const ts = createRequire(join(root, 'package.json'))('typescript')
    const declaration = readFileSync(sidecar)
    const source = readFileSync(native)
    const directory = mkdtempSync(join(scripts, '.native-fixture-resolution-'))
    try {
      const configPath = join(scripts, '..', 'tsconfig.json')
      const config = ts.readConfigFile(configPath, ts.sys.readFile)
      assert.equal(config.error, undefined)
      const parsed = ts.parseJsonConfigFileContent(
        config.config,
        ts.sys,
        dirname(configPath),
      )
      assert.deepEqual(parsed.errors, [])
      const name = fc
        .array(
          fc.constantFrom('a', 'Z', '0', '_', '-', ' ', '%', '#', '汉', '😀'),
          { minLength: 1, maxLength: 12 },
        )
        .map(parts => parts.join(''))
      let checked = 0
      fc.assert(
        fc.property(name, value => {
          const caseDirectory = mkdtempSync(join(directory, 'case-'))
          try {
            const fixtures = join(caseDirectory, 'fixtures')
            mkdirSync(fixtures)
            const nativePath = join(fixtures, value + '.vibe')
            const declarationPath = join(fixtures, value + '.d.vibe.ts')
            const consumer = join(caseDirectory, 'consumer.ts')
            const specifier = './fixtures/' + value + '.vibe'
            writeFileSync(nativePath, source)
            writeFileSync(
              consumer,
              "export { directoryFromModuleUrl } from '" + specifier + "'",
            )
            const resolveFixture = () =>
              ts.resolveModuleName(specifier, consumer, parsed.options, ts.sys)
                .resolvedModule?.resolvedFileName
            assert.equal(resolveFixture(), undefined)
            writeFileSync(declarationPath, declaration)
            assert.equal(resolveFixture(), declarationPath)
            rmSync(declarationPath)
            assert.equal(resolveFixture(), undefined)
            writeFileSync(declarationPath, declaration)
            assert.equal(resolveFixture(), declarationPath)
            checked += 1
          } finally {
            rmSync(caseDirectory, { recursive: true, force: true })
          }
        }),
        {
          seed: 531134,
          numRuns: 200,
          examples: corpus.names.map(value => [value]),
        },
      )
      assert.ok(checked >= 200)
      console.info(
        'NATIVE_FIXTURE_RESOLUTION ' +
          JSON.stringify({
            typescript: ts.version,
            seed: 531134,
            checked,
            fixedExamples: corpus.names.length,
          }),
      )
    } finally {
      rmSync(directory, { recursive: true, force: true })
      assert.deepEqual(readFileSync(sidecar), declaration)
      assert.deepEqual(readFileSync(native), source)
    }
  },
)
