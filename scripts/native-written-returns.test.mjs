import fc from 'fast-check'
import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import {
  copyFileSync,
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
import { test } from 'node:test'

const ROOT = resolve(import.meta.dirname, '..')
const compiler = realpathSync(join(ROOT, 'node_modules/vibelang'))
const corpus = JSON.parse(
  readFileSync(
    join(
      ROOT,
      'scripts/fixtures/native-written-returns/foldkit-callback-return-types.json',
    ),
    'utf8',
  ),
)
const stock = join(ROOT, 'packages/ui/node_modules/typescript/bin/tsc')
const run = (cwd, args) => {
  const result = spawnSync(process.execPath, args, {
    cwd,
    encoding: 'utf8',
    env: { ...process.env, CI: 'true' },
  })
  assert.equal(result.error, undefined, String(result.error))
  assert.equal(result.signal, null, String(result.signal))
  assert.equal(result.status, 0, result.stdout + result.stderr)
}
const sameBytes = (actual, expected, stage) => {
  const actualLines = actual.toString().split('\n')
  const expectedLines = expected.toString().split('\n')
  const line = expectedLines.findIndex(
    (value, index) => value !== actualLines[index],
  )
  assert.ok(
    actual.equals(expected),
    JSON.stringify({
      stage,
      line: line + 1,
      expected: expectedLines[line],
      actual: actualLines[line],
    }),
  )
}
const verify = (sources, label) => {
  const directory = mkdtempSync(
    join(
      process.env.FOLDKIT_TEST_TMPDIR ?? tmpdir(),
      'foldkit-written-returns-',
    ),
  )
  try {
    const original = join(directory, 'original')
    const native = join(directory, 'native')
    for (const [cwd, extension, source] of [
      [original, 'ts', sources.typescript],
      [native, 'vibe', sources.native],
    ]) {
      mkdirSync(cwd)
      symlinkSync(
        join(ROOT, 'packages/ui/node_modules'),
        join(cwd, 'node_modules'),
        'dir',
      )
      writeFileSync(
        join(cwd, 'package.json'),
        '{"private":true,"type":"module"}\n',
      )
      writeFileSync(join(cwd, 'main.' + extension), source)
      writeFileSync(
        join(cwd, 'tsconfig.json'),
        JSON.stringify({
          compilerOptions: {
            target: 'ES2022',
            module: 'NodeNext',
            moduleResolution: 'NodeNext',
            strict: true,
            skipLibCheck: true,
            declaration: true,
            emitDeclarationOnly: true,
            declarationMap: false,
            sourceMap: false,
            inlineSources: false,
            outDir: 'dist',
          },
          files: ['main.' + extension],
        }),
      )
    }
    run(original, [stock, '-p', 'tsconfig.json', '--singleThreaded'])
    const expected = readFileSync(join(original, 'dist/main.d.ts'))
    run(native, [
      join(compiler, 'bin/vibelang'),
      '-p',
      'tsconfig.json',
      '--singleThreaded',
    ])
    sameBytes(
      readFileSync(join(native, 'dist/main.d.ts')),
      expected,
      label + ': before format',
    )
    run(native, [join(compiler, 'bin/vibelang-format'), '--write', 'main.vibe'])
    run(native, [
      join(compiler, 'bin/vibelang'),
      '-p',
      'tsconfig.json',
      '--singleThreaded',
    ])
    const actual = readFileSync(join(native, 'dist/main.d.ts'))
    if (process.env.FOLDKIT_TEST_ARTIFACTS) {
      const output = join(process.env.FOLDKIT_TEST_ARTIFACTS, label)
      mkdirSync(output, { recursive: true })
      writeFileSync(join(output, 'original.ts'), sources.typescript)
      writeFileSync(join(output, 'before.vibe'), sources.native)
      copyFileSync(join(native, 'main.vibe'), join(output, 'after.vibe'))
      writeFileSync(join(output, 'original.d.ts'), expected)
      writeFileSync(join(output, 'formatted.d.ts'), actual)
    }
    sameBytes(actual, expected, label + ': after format')
  } finally {
    rmSync(directory, { recursive: true, force: true })
  }
}

test('Foldkit public callback declarations keep their original bytes through native formatting', () =>
  verify(corpus, 'foldkit-callbacks'))

const shape = fc.record({
  parameters: fc.array(fc.constantFrom('string', 'number', 'boolean'), {
    minLength: 1,
    maxLength: 3,
  }),
  result: fc.constantFrom('string', 'number', 'boolean'),
  parentheses: fc.integer({ min: 1, max: 3 }),
  nested: fc.boolean(),
})
const sourcesFor = (shapes, native) =>
  shapes
    .map((shape, index) => {
      const parameters = shape.parameters
        .map((type, index) => 'value' + index + ': ' + type)
        .join(', ')
      const result = { string: "'ok'", number: '1', boolean: 'true' }[
        shape.result
      ]
      const returned = shape.nested
        ? '(inner: number) => ' + shape.result
        : shape.result
      const functionType = '(' + parameters + ') => ' + returned
      const writtenReturn =
        '('.repeat(shape.parentheses) +
        functionType +
        ')'.repeat(shape.parentheses)
      const innerBody = shape.nested
        ? '(inner: number): ' +
          (native ? 'infer _' : shape.result) +
          ' => ' +
          result
        : result
      return (
        'export const callback' +
        index +
        ' = (): ' +
        writtenReturn +
        ' => (' +
        parameters +
        '): ' +
        (native ? 'infer _' : returned) +
        ' => ' +
        innerBody +
        '\n'
      )
    })
    .join('\n')

test('250 generated callback shapes retain raw declarations before and after formatting', () => {
  fc.assert(
    fc.property(fc.array(shape, { minLength: 250, maxLength: 250 }), shapes => {
      verify(
        {
          typescript: sourcesFor(shapes, false),
          native: sourcesFor(shapes, true),
        },
        'generated-callbacks',
      )
    }),
    { numRuns: 1, seed: 531130, endOnFailure: true },
  )
})
