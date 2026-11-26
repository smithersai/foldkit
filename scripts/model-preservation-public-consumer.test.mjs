import fc from 'fast-check'
// The public schema entry must typecheck without Vite ambient declarations.
// Compile real native source first; the consumer never imports vite/client.
import assert from 'node:assert/strict'
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
import { createRequire } from 'node:module'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { test } from 'node:test'
import { fileURLToPath } from 'node:url'
import ts from 'typescript'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const require = createRequire(import.meta.url)
const corpus = JSON.parse(
  readFileSync(
    join(
      root,
      'scripts/fixtures/foldkit-model-preservation-public-consumer.json',
    ),
    'utf8',
  ),
)

test(
  'model-preservation public declarations work in a non-Vite consumer',
  { timeout: 60_000 },
  () => {
    const directory = mkdtempSync(join(tmpdir(), 'foldkit-model-consumer-'))
    try {
      const input = join(directory, 'input')
      mkdirSync(input)
      symlinkSync(
        join(root, 'node_modules'),
        join(directory, 'node_modules'),
        'junction',
      )
      writeFileSync(
        join(directory, 'package.json'),
        JSON.stringify({ type: 'module' }),
      )
      for (const file of [
        'modelPreservation.vibe',
        'modelPreservationPublic.ts',
      ]) {
        copyFileSync(
          join(root, 'packages/foldkit/src/runtime', file),
          join(input, file),
        )
      }
      const producerConfig = join(directory, 'producer.json')
      writeFileSync(
        producerConfig,
        JSON.stringify({
          extends: join(root, 'packages/foldkit/tsconfig.build.json'),
          compilerOptions: {
            rootDir: input,
            outDir: join(directory, 'types'),
            noEmit: false,
            declaration: true,
            declarationMap: false,
            emitDeclarationOnly: true,
            composite: false,
            incremental: false,
            types: ['vite/client'],
          },
          files: [
            join(input, 'modelPreservation.vibe'),
            join(input, 'modelPreservationPublic.ts'),
          ],
          include: [],
          exclude: [],
        }),
      )
      const compilerManifest = require.resolve('vibelang/package.json')
      const manifest = JSON.parse(readFileSync(compilerManifest, 'utf8'))
      const bin =
        typeof manifest.bin === 'string' ? manifest.bin : manifest.bin.vibelang
      const emitted = spawnSync(
        process.execPath,
        [
          join(dirname(compilerManifest), bin),
          '-p',
          producerConfig,
          '--singleThreaded',
          '--pretty',
          'false',
        ],
        {
          cwd: root,
          encoding: 'utf8',
          maxBuffer: 8 * 1024 * 1024,
          timeout: 45_000,
        },
      )
      assert.equal(emitted.status, 0, emitted.stdout + emitted.stderr)

      const declarations = join(directory, 'types/modelPreservationPublic.d.ts')
      const model = fc.record({
        id: fc.string({ maxLength: 16 }),
        model: fc.oneof(
          fc.string({ maxLength: 16 }),
          fc.integer(),
          fc.boolean(),
          fc.constant(null),
          fc.array(fc.integer(), { maxLength: 4 }),
          fc.record({ value: fc.integer() }),
        ),
        reload: fc.boolean(),
        restoreModel: fc.boolean(),
      })
      fc.assert(
        fc.property(
          fc.array(model, { minLength: corpus.runs, maxLength: corpus.runs }),
          samples => {
            assert.equal(samples.length, corpus.runs)
            const consumer = join(directory, 'consumer.ts')
            const lines = [
              "import { PreserveModelMessage, RequestModelMessage, RestoreModelMessage } from './types/modelPreservationPublic.js'",
              'export const schemas = [PreserveModelMessage, RequestModelMessage, RestoreModelMessage]',
            ]
            for (const [index, item] of samples.entries()) {
              const id = JSON.stringify(item.id),
                model = JSON.stringify(item.model)
              lines.push(
                'const p' +
                  index +
                  ' = PreserveModelMessage.make({id:' +
                  id +
                  ',model:' +
                  model +
                  ',isReloadFlush:' +
                  item.reload +
                  '})',
                'const q' +
                  index +
                  ' = RequestModelMessage.make({id:' +
                  id +
                  '})',
                'const r' +
                  index +
                  ' = RestoreModelMessage.make({id:' +
                  id +
                  (item.restoreModel ? ',model:' + model : '') +
                  '})',
              )
            }
            writeFileSync(consumer, lines.join('\n'))
            const parsed = ts.parseJsonConfigFileContent(
              {
                compilerOptions: {
                  strict: true,
                  noEmit: true,
                  skipLibCheck: false,
                  target: 'ESNext',
                  module: 'NodeNext',
                  moduleResolution: 'NodeNext',
                  lib: ['ESNext', 'DOM', 'DOM.Iterable'],
                  types: [],
                  allowImportingTsExtensions: true,
                },
                files: [consumer],
              },
              ts.sys,
              directory,
            )
            const program = ts.createProgram(parsed.fileNames, parsed.options)
            const diagnostics = ts.getPreEmitDiagnostics(program)
            assert.deepEqual(
              diagnostics.map(d => ({
                code: d.code,
                text: ts.flattenDiagnosticMessageText(d.messageText, '\n'),
              })),
              [],
            )
            const exports = program
              .getTypeChecker()
              .getExportsOfModule(
                program
                  .getTypeChecker()
                  .getSymbolAtLocation(program.getSourceFile(declarations)),
              )
              .map(symbol => symbol.name)
              .sort()
            assert.deepEqual(exports, [...corpus.exports].sort())
          },
        ),
        { seed: corpus.seed, numRuns: corpus.batches, endOnFailure: true },
      )
    } finally {
      rmSync(directory, { recursive: true, force: true })
    }
  },
)
