import fc from 'fast-check'
import { spawnSync } from 'node:child_process'
import {
  mkdtempSync,
  mkdirSync,
  readFileSync,
  writeFileSync,
  rmSync,
} from 'node:fs'
import { createRequire } from 'node:module'
import { dirname, join, resolve, relative } from 'node:path'
import { fileURLToPath } from 'node:url'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'

const scripts = dirname(fileURLToPath(import.meta.url))
const root = resolve(scripts, '../../..')
const website = resolve(scripts, '..')
const compiler = join(root, 'node_modules/vibelang/native/vibelang')
const corpus = JSON.parse(
  readFileSync(
    join(scripts, 'fixtures/foldkit-snippet-schema-forms.json'),
    'utf8',
  ),
)
const ts = createRequire(join(root, 'package.json'))('typescript')
const temporary = []
const directory = () => {
  const path = mkdtempSync(join(scripts, '.snippet-schema-'))
  temporary.push(path)
  return path
}
const compile = args => {
  const result = spawnSync(
    compiler,
    [
      '--singleThreaded',
      '--incremental',
      'false',
      '--composite',
      'false',
      '--pretty',
      'false',
      ...args,
    ],
    {
      cwd: root,
      env: { ...process.env, GOMAXPROCS: '2' },
      encoding: 'utf8',
      timeout: 30000,
      maxBuffer: 16 * 1024 * 1024,
    },
  )
  expect(
    result.error,
    (result.stdout ?? '') + (result.stderr ?? ''),
  ).toBeUndefined()
  return {
    code: result.status,
    text: (result.stdout ?? '') + (result.stderr ?? ''),
  }
}
const config = (path, files) => {
  const file = join(path, 'tsconfig.json')
  writeFileSync(
    file,
    JSON.stringify({
      extends: join(website, 'tsconfig.json'),
      files,
      include: [],
      exclude: [],
    }),
  )
  return file
}
afterAll(() => {
  for (const path of temporary) rmSync(path, { recursive: true, force: true })
})

describe('native schema declarations in illustrative snippets', () => {
  let report
  let copies
  beforeAll(() => {
    const path = directory()
    copies = corpus.files.map(name => {
      const copy = join(path, name + '.vibe')
      writeFileSync(
        copy,
        readFileSync(join(website, 'src/snippet', name + '.vibe')),
      )
      return copy
    })
    report = compile(['-p', config(path, copies), '--noEmit', '--listFiles'])
    for (const copy of copies) {
      expect(
        report.text.includes(copy) ||
          report.text.includes(relative(root, copy)),
        report.text,
      ).toBe(true)
    }
  }, 40000)

  test.each(corpus.files)(
    '%s does not propose a legacy Schema.Struct constructor',
    name => {
      const diagnostics = report.text
        .split('\n')
        .filter(
          line =>
            line.includes(name + '.vibe(') || line.includes(name + '.vibe:'),
        )
      expect(diagnostics.filter(line => /\bEK4832\b/.test(line))).toEqual([])
    },
  )
})

const bindingFlags =
  ts.NodeFlags.Const |
  ts.NodeFlags.Let |
  ts.NodeFlags.Using |
  ts.NodeFlags.AwaitUsing
const shape = node => {
  const children = []
  ts.forEachChild(node, child => {
    children.push(shape(child))
  })
  const result = { kind: node.kind, children }
  if (node.flags & bindingFlags) result.bindingFlags = node.flags & bindingFlags
  if (typeof node.text === 'string' && node.kind !== ts.SyntaxKind.SourceFile)
    result.text = node.text
  if (typeof node.rawText === 'string') result.rawText = node.rawText
  return result
}
const javascript = path => {
  const source = ts.createSourceFile(
    path,
    readFileSync(path, 'utf8'),
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.JS,
  )
  expect(source.parseDiagnostics).toEqual([])
  return shape(source)
}
const forms = {
  string: ['Schema.String', 'string'],
  number: ['Schema.Number', 'number'],
  boolean: ['Schema.Boolean', 'boolean'],
  unknown: ['Schema.Unknown', 'Schema.Unknown'],
  strings: ['Schema.Array(Schema.String)', 'ReadonlyArray<string>'],
  child: ['Child', 'Child'],
  children: ['Schema.Array(Child)', 'ReadonlyArray<Child>'],
  qualified: ['ChildModule.Model', 'ChildModule.Model'],
}
const header =
  "import * as ChildModule from '../shared.vibe'\nexport const Child = ChildModule.Model\n"
const program = (fields, native) =>
  header +
  (native
    ? 'export schema Example {\n' +
      fields
        .map(field => '  readonly ' + field.name + ': ' + forms[field.kind][1])
        .join('\n') +
      '\n}\n'
    : 'export const Example = Schema.Struct({\n' +
      fields
        .map(field => '  ' + field.name + ': ' + forms[field.kind][0] + ',')
        .join('\n') +
      '\n})\nexport type Example = typeof Example.Type\n')

test('generated native schema forms preserve emitted programs and declarations', () => {
  const field = fc
    .record({
      id: fc.integer({ min: 0, max: 99 }),
      kind: fc.constantFrom(...Object.keys(forms)),
    })
    .map(({ id, kind }) => ({ name: 'field_' + id, kind }))
  const model = fc.uniqueArray(field, {
    minLength: 1,
    maxLength: 5,
    selector: value => value.name,
  })
  fc.assert(
    fc.property(
      fc.array(model, {
        minLength: corpus.generatedModels,
        maxLength: corpus.generatedModels,
      }),
      generated => {
        const models = [...corpus.fixedModels, ...generated]
        const path = directory()
        writeFileSync(
          join(path, 'shared.vibe'),
          'export schema Model {\n  value: string\n}\n',
        )
        const files = {}
        const outputs = {}
        for (const side of ['legacy', 'native']) {
          const source = join(path, side)
          mkdirSync(source)
          files[side] = models.map((fields, index) => {
            const file = join(source, 'case_' + index + '.vibe')
            writeFileSync(file, program(fields, side === 'native'))
            return file
          })
          outputs[side] = join(path, 'emit-' + side)
          const result = compile([
            '-p',
            config(source, [join(path, 'shared.vibe'), ...files[side]]),
            '--noEmit',
            'false',
            '--declaration',
            'true',
            '--declarationMap',
            'false',
            '--noEmitOnError',
            'true',
            '--rewriteRelativeImportExtensions',
            'true',
            '--sourceMap',
            'false',
            '--rootDir',
            path,
            '--outDir',
            outputs[side],
          ])
          expect(result.code, result.text).toBe(0)
          if (side === 'native')
            expect(result.text).not.toMatch(/\bEK48\d{2}\b/)
        }
        for (let index = 0; index < models.length; index += 1) {
          expect(
            javascript(join(outputs.native, 'native', 'case_' + index + '.js')),
          ).toEqual(
            javascript(join(outputs.legacy, 'legacy', 'case_' + index + '.js')),
          )
          expect(
            readFileSync(
              join(outputs.native, 'native', 'case_' + index + '.d.ts'),
            ),
          ).toEqual(
            readFileSync(
              join(outputs.legacy, 'legacy', 'case_' + index + '.d.ts'),
            ),
          )
        }
        const original = readFileSync(files.native[0], 'utf8')
        expect(original).toContain('roomId: string')
        try {
          writeFileSync(
            files.native[0],
            original.replace('roomId: string', 'roomId: number'),
          )
          const mutantOutput = join(path, 'emit-mutant')
          const result = compile([
            '-p',
            config(join(path, 'native'), [
              join(path, 'shared.vibe'),
              files.native[0],
            ]),
            '--noEmit',
            'false',
            '--declaration',
            'true',
            '--declarationMap',
            'false',
            '--rewriteRelativeImportExtensions',
            'true',
            '--sourceMap',
            'false',
            '--rootDir',
            path,
            '--outDir',
            mutantOutput,
          ])
          expect(result.code, result.text).toBe(0)
          expect(
            javascript(join(mutantOutput, 'native', 'case_0.js')),
          ).not.toEqual(javascript(join(outputs.legacy, 'legacy', 'case_0.js')))
        } finally {
          writeFileSync(files.native[0], original)
        }
        console.info(
          'SNIPPET_SCHEMA_FORMS ' +
            JSON.stringify({
              seed: corpus.seed,
              propertyRuns: 1,
              generatedModels: generated.length,
              corpusModels: corpus.fixedModels.length,
              compared: models.length,
              declarationRawBytesIdentical: true,
              validTypedMutantRejected: true,
            }),
        )
      },
    ),
    { seed: corpus.seed, numRuns: 1, endOnFailure: true },
  )
}, 90000)
