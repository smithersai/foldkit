import { Cause } from 'effect'
import * as PlatformError from 'effect/PlatformError'
import fc from 'fast-check'
import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import * as fs from 'node:fs'
import { stripTypeScriptTypes } from 'node:module'
import { tmpdir } from 'node:os'
import { dirname, join, relative, resolve } from 'node:path'
import { test } from 'node:test'
import { fileURLToPath, pathToFileURL } from 'node:url'

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const fixture = JSON.parse(
  fs.readFileSync(
    new URL('./fixtures/scaffold/legacy-source.json', import.meta.url),
    'utf8',
  ),
)
assert.equal(
  createHash('sha256').update(fixture.source).digest('hex'),
  fixture.sha256,
)

function formatter(source) {
  const start = source.indexOf('const messageFor =')
  const end = source.lastIndexOf('main().catch')
  assert.ok(start >= 0 && end > start)
  return Function(
    stripTypeScriptTypes(
      'class ScaffoldCheckError extends Error {}\n' + source.slice(start, end),
    ) + '\nreturn messageFor',
  )()
}
function setup(context) {
  const directory = fs.mkdtempSync(join(tmpdir(), 'scaffold-failure-contract-'))
  context.after(() => fs.rmSync(directory, { recursive: true, force: true }))
  fs.mkdirSync(join(directory, 'scripts'))
  fs.symlinkSync(
    join(repoRoot, 'node_modules'),
    join(directory, 'node_modules'),
    'junction',
  )
  fs.writeFileSync(join(directory, 'package.json'), '{"type":"module"}\n')
  fs.writeFileSync(
    join(directory, 'tsconfig.json'),
    JSON.stringify({
      compilerOptions: {
        target: 'ES2022',
        module: 'ESNext',
        moduleResolution: 'Bundler',
        strict: true,
        exactOptionalPropertyTypes: true,
        noUncheckedIndexedAccess: true,
        skipLibCheck: true,
        noEmit: true,
        types: ['node'],
      },
      include: ['scripts/**/*.vibe', 'scripts/**/*.ts', 'scripts/**/*.mts'],
    }),
  )
  const copied = new Set()
  function copy(file) {
    if (copied.has(file)) return
    copied.add(file)
    const name = relative(repoRoot, file)
    assert.ok(!name.startsWith('..') && !name.startsWith('/'))
    const target = join(directory, name)
    fs.mkdirSync(dirname(target), { recursive: true })
    fs.copyFileSync(file, target)
    const text = fs.readFileSync(file, 'utf8')
    for (const match of text.matchAll(
      /^\s*import[\s\S]*?\sfrom\s+(['"])([^'"]+)\1/gm,
    )) {
      if (match[2].startsWith('.')) copy(resolve(dirname(file), match[2]))
    }
  }
  const native = fs.existsSync(
    join(repoRoot, 'scripts/check-scaffold-server-rendering.vibe'),
  )
  const subject = join(
    repoRoot,
    'scripts/check-scaffold-server-rendering.' + (native ? 'vibe' : 'ts'),
  )
  copy(subject)
  copy(join(repoRoot, 'scripts/scaffold-dependencies.ts'))
  return { directory, native, source: fs.readFileSync(subject, 'utf8') }
}
function replaceMain(source, native, replacement) {
  const start = source.indexOf(
    native ? 'const main = effect' : 'const main = async',
  )
  const end = source.indexOf('const messageFor =', start)
  assert.ok(start >= 0 && end > start)
  return source.slice(0, start) + replacement + '\n\n' + source.slice(end)
}
function observe(directory, file) {
  const result = spawnSync(
    process.execPath,
    file.endsWith('.vibe') ? ['--import=vibelang/register', file] : [file],
    {
      cwd: directory,
      encoding: 'utf8',
      timeout: 10_000,
    },
  )
  assert.equal(
    result.error,
    undefined,
    'the actual CLI entry starts and completes',
  )
  return {
    status: result.status,
    signal: result.signal,
    stdout: result.stdout,
    stderr: result.stderr,
  }
}
test('scaffold entry reports typed failures and defects', context => {
  const subject = setup(context)
  const controlFile = join(subject.directory, 'scripts/original-cli.ts')
  fs.writeFileSync(
    controlFile,
    replaceMain(
      fixture.source,
      false,
      'const main = async (): Promise<void> => { throw new ScaffoldCheckError("root witness") }',
    ),
  )
  const expected = observe(subject.directory, controlFile)
  assert.deepEqual(expected, {
    status: 1,
    signal: null,
    stdout: '',
    stderr: '[scaffold-ssr] FAIL: root witness\n',
  })
  for (const mode of ['typed', 'defect']) {
    const body =
      mode === 'typed'
        ? 'throw new ScaffoldCheckError({message:"root witness"})'
        : 'try die(new ScaffoldCheckError({message:"root witness"}))'
    const main = subject.native
      ? 'const main = effect () => { ' + body + ' }'
      : 'const main = async (): Promise<void> => { throw new ScaffoldCheckError("root witness") }'
    const file = join(
      subject.directory,
      'scripts/' + mode + '-cli.' + (subject.native ? 'vibe' : 'ts'),
    )
    fs.writeFileSync(file, replaceMain(subject.source, subject.native, main))
    assert.deepEqual(
      observe(subject.directory, file),
      expected,
      mode + ' keeps the original stderr and terminal status',
    )
  }
})
test('scaffold diagnostics preserve original platform and foreign causes', async context => {
  const subject = setup(context)
  const original = formatter(fixture.source)
  let current
  if (subject.native) {
    const entry =
      /runMain\(program,\s*\{\s*disableErrorReporting:\s*true\s*\}\)/
    assert.equal(
      (subject.source.match(new RegExp(entry.source, 'g')) ?? []).length,
      1,
    )
    const file = join(subject.directory, 'scripts/formatter.vibe')
    fs.writeFileSync(
      file,
      subject.source.replace(entry, '') +
        '\nexport const formatterForTest: unknown = messageFor\n',
    )
    await import('vibelang/register')
    current = (await import(pathToFileURL(file).href)).formatterForTest
  } else current = formatter(subject.source)
  const wrap = (value, kinds) =>
    kinds.reduce(
      (cause, kind) =>
        kind === 'unknown'
          ? new Cause.UnknownError(cause)
          : PlatformError.systemError({
              _tag: 'NotFound',
              module: 'FileSystem',
              method: 'readFile',
              pathOrDescriptor: '/fixture/missing',
              cause,
            }),
      value,
    )
  const compare = (raw, wrapped) =>
    assert.equal(
      current(subject.native ? wrapped : raw),
      original(raw),
      'the complete original diagnostic bytes survive the wrapper boundary',
    )
  const known = new Error('original filesystem failure')
  known.stack = 'Error: original filesystem failure\n    fixture stack\n'
  compare(known, wrap(known, ['platform']))
  compare(known, wrap(known, ['unknown', 'platform', 'unknown']))
  const noCause = PlatformError.systemError({
    _tag: 'NotFound',
    module: 'FileSystem',
    method: 'readFile',
  })
  compare(noCause, noCause)
  await fc.assert(
    fc.asyncProperty(
      fc.string(),
      fc.string(),
      fc.array(fc.constantFrom('unknown', 'platform'), {
        minLength: 0,
        maxLength: 6,
      }),
      async (message, stack, kinds) => {
        const error = new Error(message)
        error.stack = stack
        compare(error, wrap(error, kinds))
      },
    ),
    { numRuns: 100, seed: 413928 },
  )
  await fc.assert(
    fc.asyncProperty(
      fc.oneof(
        fc.string(),
        fc.integer(),
        fc.boolean(),
        fc.constant(null),
        fc.constant(undefined),
      ),
      fc.integer({ min: 0, max: 6 }),
      async (value, depth) =>
        compare(
          value,
          wrap(
            value,
            globalThis.Array.from({ length: depth }, () => 'unknown'),
          ),
        ),
    ),
    { numRuns: 100, seed: 413929 },
  )
})
