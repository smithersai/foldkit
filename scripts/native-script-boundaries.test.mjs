import { Effect, Exit, Stream } from 'effect'
import fc from 'fast-check'
import assert from 'node:assert/strict'
import * as fs from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join, resolve } from 'node:path'
import { test } from 'node:test'
import { fileURLToPath, pathToFileURL } from 'node:url'

test('script cleanup and byte decoding preserve JavaScript outcomes', async context => {
  const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
  const directory = fs.mkdtempSync(join(tmpdir(), 'foldkit-script-boundaries-'))
  context.after(() => fs.rmSync(directory, { recursive: true, force: true }))
  fs.symlinkSync(
    join(root, 'node_modules'),
    join(directory, 'node_modules'),
    'junction',
  )
  fs.writeFileSync(join(directory, 'package.json'), '{"type":"module"}')
  fs.writeFileSync(
    join(directory, 'tsconfig.json'),
    JSON.stringify({
      compilerOptions: {
        target: 'ES2022',
        module: 'ESNext',
        moduleResolution: 'Bundler',
        strict: true,
        skipLibCheck: true,
        noEmit: true,
        types: [],
      },
      include: ['*.vibe'],
    }),
  )
  const source = fs.readFileSync(
    join(root, 'scripts/check-scaffold-server-rendering.vibe'),
    'utf8',
  )
  const start = source.indexOf('const decodeUtf8 =')
  const end = source.indexOf('type RunOptions =', start)
  assert.ok(start >= 0 && end > start)
  const helpers = source
    .slice(start, end)
    .replace(/const readUtf8 = effect[\s\S]*?\n}\n/, '')
  fs.writeFileSync(
    join(directory, 'helpers.vibe'),
    "import type * as PlatformError from 'effect/PlatformError'\n" +
      helpers +
      '\nexport { decodeUtf8, collectText }\n',
  )
  await import('vibelang/register')
  const { decodeUtf8, collectText } = await import(
    pathToFileURL(join(directory, 'helpers.vibe')).href
  )
  const { cleanupProgram } =
    await import('./fixtures/native-script-boundaries/foldkit-script-cleanup.vibe')
  const corpus = JSON.parse(
    fs.readFileSync(
      join(
        root,
        'scripts/fixtures/native-script-boundaries/foldkit-script-byte-chunks.json',
      ),
      'utf8',
    ),
  )

  fc.assert(
    fc.property(
      fc.boolean(),
      fc.boolean(),
      fc.anything(),
      fc.anything(),
      (failBody, failCleanup, bodyError, cleanupError) => {
        const expectedTrace = []
        let expected
        try {
          try {
            expectedTrace.push('body')
            if (failBody) throw bodyError
            expected = Exit.succeed('value')
          } finally {
            expectedTrace.push('cleanup')
            if (failCleanup) throw cleanupError
          }
        } catch (error) {
          expected = Exit.fail(error)
        }
        const trace = []
        const actual = Effect.runSyncExit(
          cleanupProgram(
            failBody,
            failCleanup,
            bodyError,
            cleanupError,
            stage => trace.push(stage),
          ),
        )
        assert.deepEqual(actual, expected)
        assert.deepEqual(trace, expectedTrace)
        if (Exit.isFailure(actual))
          assert.equal(
            actual.cause.reasons[0].error,
            failCleanup ? cleanupError : bodyError,
          )
      },
    ),
    { seed: corpus.seed, numRuns: 400 },
  )

  await fc.assert(
    fc.asyncProperty(
      fc.oneof(
        fc.constantFrom(
          ...corpus.cases.map(chunks =>
            chunks.map(chunk => Uint8Array.from(chunk)),
          ),
        ),
        fc.array(fc.uint8Array({ maxLength: 40 }), { maxLength: 12 }),
      ),
      async chunks => {
        const bytes = Uint8Array.from(chunks.flatMap(chunk => [...chunk]))
        const expected = new TextDecoder('utf-8', { ignoreBOM: true }).decode(
          bytes,
        )
        assert.equal(Effect.runSync(decodeUtf8(bytes)), expected)
        assert.equal(
          await Effect.runPromise(collectText(Stream.fromIterable(chunks))),
          expected,
        )
      },
    ),
    { seed: corpus.seed, numRuns: 400 },
  )

  const defect = new TypeError('decoder failure')
  const originalDecode = TextDecoder.prototype.decode
  let result
  try {
    TextDecoder.prototype.decode = function () {
      throw defect
    }
    result = Effect.runSyncExit(decodeUtf8(new Uint8Array([65])))
  } finally {
    TextDecoder.prototype.decode = originalDecode
  }
  assert.equal(result._tag, 'Failure')
  assert.equal(result.cause.reasons[0]._tag, 'Die')
  assert.equal(result.cause.reasons[0].defect, defect)
})
