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
import ts from 'typescript'

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
// NOTE: VIP-27:24 permits generated @throws contracts to differ.
// Preserve every byte outside the JSDoc tag lines, including inline signatures.
const withoutThrows = bytes => {
  const source = bytes.toString('latin1')
  const declarations = ts.createSourceFile(
    'declarations.d.ts',
    source,
    ts.ScriptTarget.Latest,
  )
  const comments = new Map()
  const collectComments = node => {
    for (const comment of [
      ...(ts.getLeadingCommentRanges(source, node.pos) ?? []),
      ...(ts.getTrailingCommentRanges(source, node.pos) ?? []),
    ]) {
      if (source.startsWith('/**', comment.pos)) {
        comments.set(comment.pos, comment.end)
      }
    }
    ts.forEachChild(node, collectComments)
  }
  collectComments(declarations)

  return Buffer.from(
    source.replace(
      /(?:^[\t ]*)?\/\*\* @throws \{[^}\r\n]*\} \*\/(?:\r?\n|$)|^[\t ]*\* @throws \{[^}\r\n]*\}[\t ]*(?:\r?\n|$)/gm,
      (tag, offset) => {
        const start = offset + tag.search(/\S/)
        const isJSDocTag = [...comments].some(([position, end]) =>
          source.startsWith('/**', start)
            ? position === start && end === offset + tag.trimEnd().length
            : position < start && start < end,
        )
        return isJSDocTag ? '' : tag
      },
    ),
    'latin1',
  )
}
const sameBytes = (actualBytes, expectedBytes, stage) => {
  const actual = withoutThrows(actualBytes)
  const expected = withoutThrows(expectedBytes)
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
test('declaration comparisons ignore generated throws tag lines on either side', () => {
  const declaration =
    'export declare const callback: () => ((value: string) => number);\n'
  const tagged =
    '/** @throws {never} */\nexport declare const callback: () => (/** @throws {never} */\n(value: string) => number);\n'
  const documented =
    '/**\n * Callback documentation.\n * @deprecated Use another callback.\n */\n' +
    declaration
  const withThrows = documented.replace(
    ' * @deprecated',
    ' * @throws {never}\n * @deprecated',
  )

  for (const [actual, expected] of [
    [tagged, declaration],
    [declaration, tagged],
    [tagged, tagged.replaceAll('{never}', '{Error}')],
    [withThrows, documented],
    [documented, withThrows],
    ['  /** @throws {never} */\n' + declaration, declaration],
    [tagged.replaceAll('\n', '\r\n'), declaration.replaceAll('\n', '\r\n')],
  ]) {
    sameBytes(Buffer.from(actual), Buffer.from(expected), 'throws tags')
  }
})

test('declaration comparisons reject every difference outside throws tag lines', () => {
  const declaration =
    '/** Callback documentation.\n * @deprecated Use another callback.\n */\nexport declare const callback: () => string;\n'

  for (const changed of [
    declaration.replace('string', 'number'),
    declaration.replace('const callback', 'const renamed'),
    declaration.replace('Callback documentation.', 'Changed documentation.'),
    declaration.replace(
      '@deprecated Use another callback.',
      '@deprecated Use a new callback.',
    ),
    declaration.replace('@deprecated', '@rethrows'),
    declaration.replace('=> string', '=>  string'),
    declaration.replaceAll('\n', '\r\n'),
    declaration + '\n',
    declaration.trimEnd(),
    '/** @throwsExtra {never} */\n' + declaration,
    '/** @throws {never} @deprecated Use another callback. */\n' + declaration,
    '/** Mention @throws {never} in prose. */\n' + declaration,
    'export declare const text: "/** @throws {never} */";\n' + declaration,
  ]) {
    for (const [actual, expected] of [
      [changed, declaration],
      [declaration, changed],
    ]) {
      assert.throws(
        () =>
          sameBytes(
            Buffer.from(actual),
            Buffer.from(expected),
            'changed declaration',
          ),
        { code: 'ERR_ASSERTION' },
      )
    }
  }
})

test('declaration comparisons preserve throws text inside types and documentation', () => {
  for (const declaration of [
    'export declare const text: `before\n/** @throws {never} */\nafter`;\n',
    'export declare const text: `before\n * @throws {never}\nafter`;\n',
    '/** Example /** @throws {never} */\nexport declare const text: string;\n',
  ]) {
    assert.throws(
      () =>
        sameBytes(
          Buffer.from(declaration),
          Buffer.from(declaration.replace('{never}', '{Error}')),
          'throws text',
        ),
      { code: 'ERR_ASSERTION' },
    )
  }
  assert.throws(
    () => sameBytes(Buffer.from([0xff]), Buffer.from([0xfe]), 'distinct bytes'),
    { code: 'ERR_ASSERTION' },
  )
})

test('generated throws tags cannot hide declaration or documentation mutations', () => {
  fc.assert(
    fc.property(
      fc.record({
        result: fc.constantFrom('string', 'number', 'boolean'),
        documentation: fc
          .array(fc.constantFrom('a', 'b', ' ', 'é', '😀'), {
            minLength: 1,
            maxLength: 40,
          })
          .map(characters => characters.join('')),
        newline: fc.constantFrom('\n', '\r\n'),
        actualThrows: fc.constantFrom('never', 'Error', 'RangeError'),
        expectedThrows: fc.constantFrom('never', 'Error', 'TypeError'),
        mutation: fc.constantFrom(
          'type',
          'name',
          'documentation',
          'tag',
          'whitespace',
          'blank line',
        ),
      }),
      ({
        result,
        documentation,
        newline,
        actualThrows,
        expectedThrows,
        mutation,
      }) => {
        const declaration =
          '/**\n * ' +
          documentation +
          '\n * @deprecated Use another callback.\n */\nexport declare const callback: () => ' +
          result +
          ';\n'
        const decorate = (text, contract) =>
          (
            '/** @throws {' +
            contract +
            '} */\n' +
            text.replace(
              ' * @deprecated',
              ' * @throws {' + contract + '}\n * @deprecated',
            )
          ).replaceAll('\n', newline)
        const changed = {
          type: declaration.replace('=> ' + result, '=> Date'),
          name: declaration.replace('const callback', 'const renamed'),
          documentation: declaration.replace(
            ' * ' + documentation,
            ' * Changed ' + documentation,
          ),
          tag: declaration.replace('@deprecated', '@rethrows'),
          whitespace: declaration.replace('=> ', '=>  '),
          'blank line': declaration + '\n',
        }[mutation]
        const expected = Buffer.from(decorate(declaration, expectedThrows))
        sameBytes(
          Buffer.from(decorate(declaration, actualThrows)),
          expected,
          'generated tags',
        )
        assert.throws(
          () =>
            sameBytes(
              Buffer.from(decorate(changed, actualThrows)),
              expected,
              'generated mutation',
            ),
          { code: 'ERR_ASSERTION' },
        )
      },
    ),
    { numRuns: 250, seed: 271024 },
  )
})

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

test('Foldkit public callback declarations preserve bytes except throws tags through native formatting', () =>
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

test('250 generated callback shapes preserve bytes except throws tags before and after formatting', () => {
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
