import { Schema } from 'effect'
import fc from 'fast-check'
import assert from 'node:assert/strict'
import { dirname, resolve } from 'node:path'
import { test } from 'node:test'
import { fileURLToPath, pathToFileURL } from 'node:url'

test('File schema retains constructor capture and codec semantics at the platform edge', async context => {
  const original = Object.getOwnPropertyDescriptor(globalThis, 'File')
  assert.ok(original, 'the supported Node runtime has a File constructor')
  context.after(() => Object.defineProperty(globalThis, 'File', original))
  const BaseFile = globalThis.File
  class CapturedFile extends BaseFile {}
  class LaterFile extends BaseFile {}
  const reference = Schema.instanceOf(CapturedFile)
  const nativeLookups = []
  function readFileConstructor() {
    const error = new Error()
    Error.captureStackTrace(error, readFileConstructor)
    const caller = error.stack.split('\n')[1] ?? ''
    if (/\.vibe:\d+:\d+/.test(caller)) nativeLookups.push(caller)
    return CapturedFile
  }
  Object.defineProperty(globalThis, 'File', {
    configurable: true,
    get: readFileConstructor,
  })
  await import('vibelang/register')
  const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
  const target = pathToFileURL(
    resolve(root, 'packages/foldkit/src/file/file.vibe'),
  )
  const current = await import(target.href)
  Object.defineProperty(globalThis, 'File', {
    configurable: true,
    value: LaterFile,
    writable: true,
  })

  const observe = operation => {
    try {
      return { ok: true, value: operation() }
    } catch (error) {
      return { ok: false, name: error.name, message: error.message }
    }
  }
  function compare(value) {
    assert.equal(
      Schema.is(current.File)(value),
      Schema.is(reference)(value),
      'the exact constructor captured at module initialization',
    )
    const before = observe(() =>
      Schema.encodeUnknownSync(Schema.toCodecJson(reference))(value),
    )
    const after = observe(() =>
      Schema.encodeUnknownSync(Schema.toCodecJson(current.File))(value),
    )
    assert.deepEqual(
      after,
      before,
      'the original instanceOf JSON codec behavior',
    )
  }
  compare(new CapturedFile(['captured'], 'captured.txt'))
  compare(new BaseFile(['base'], 'base.txt'))
  compare(new LaterFile(['later'], 'later.txt'))
  compare(new Blob(['blob']))
  compare({ name: 'duck.txt', size: 4, type: 'text/plain' })
  await fc.assert(
    fc.asyncProperty(
      fc.string(),
      fc.string(),
      fc.constantFrom('captured', 'base', 'later', 'blob', 'duck'),
      async (text, name, kind) => {
        const value =
          kind === 'captured'
            ? new CapturedFile([text], name)
            : kind === 'base'
              ? new BaseFile([text], name)
              : kind === 'later'
                ? new LaterFile([text], name)
                : kind === 'blob'
                  ? new Blob([text])
                  : { name, size: text.length, type: 'text/plain' }
        compare(value)
        if (value instanceof CapturedFile) {
          assert.equal(current.name(value), value.name)
          assert.equal(current.size(value), value.size)
          assert.equal(current.mimeType(value), value.type)
        }
      },
    ),
    { numRuns: 100, seed: 413933 },
  )
  assert.deepEqual(
    nativeLookups,
    [],
    'ambient File constructor lookup belongs to the TypeScript platform edge',
  )
})
