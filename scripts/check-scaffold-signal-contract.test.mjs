import fc from 'fast-check'
import assert from 'node:assert/strict'
import { spawn } from 'node:child_process'
import { createHash } from 'node:crypto'
import * as fs from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join, relative, resolve } from 'node:path'
import { test } from 'node:test'
import { fileURLToPath } from 'node:url'

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
function observeSignal(directory, file, signal) {
  return new Promise((resolveResult, reject) => {
    const child = spawn(
      process.execPath,
      file.endsWith('.vibe') ? ['--import=vibelang/register', file] : [file],
      { cwd: directory },
    )
    let stdout = '',
      stderr = '',
      sent = false
    const timer = setTimeout(() => {
      child.kill('SIGKILL')
      reject(new Error('the signal fixture did not become ready and exit'))
    }, 10_000)
    child.stdout.on('data', data => {
      stdout += data
      if (!sent && stdout.includes('READY\n')) {
        sent = true
        child.kill(signal)
      }
    })
    child.stderr.on('data', data => {
      stderr += data
    })
    child.once('error', error => {
      clearTimeout(timer)
      reject(error)
    })
    child.once('close', (status, actualSignal) => {
      clearTimeout(timer)
      if (!sent) reject(new Error('the CLI exited before readiness: ' + stderr))
      else resolveResult({ status, signal: actualSignal, stdout, stderr })
    })
  })
}
test('scaffold signals preserve terminal output and main finalization', async context => {
  const subject = setup(context)
  const controlFile = join(subject.directory, 'scripts/original-signal.ts')
  const currentFile = join(
    subject.directory,
    'scripts/current-signal.' + (subject.native ? 'vibe' : 'ts'),
  )
  const markerFile = join(subject.directory, 'main-finalized.txt')
  const rows = []
  async function paired(signal, marker) {
    const markerPath = JSON.stringify(markerFile),
      text = JSON.stringify(marker)
    const originalMain =
      'const main = async (): Promise<void> => { const timer = setInterval(() => {}, 1000); try { console.log("READY"); await new Promise<void>(() => {}) } finally { clearInterval(timer); writeFileSync(' +
      markerPath +
      ',' +
      text +
      '); console.log(' +
      text +
      ') } }'
    const nativeMain =
      'const main = effect () => { try { try Console.log("READY"); try Effect.never } finally { const fileSystem = try FileSystem.FileSystem(); try fileSystem.writeFileString(' +
      markerPath +
      ',' +
      text +
      '); try Console.log(' +
      text +
      ') } }'
    fs.writeFileSync(
      controlFile,
      replaceMain(fixture.source, false, originalMain),
    )
    fs.writeFileSync(
      currentFile,
      replaceMain(
        subject.source,
        subject.native,
        subject.native ? nativeMain : originalMain,
      ),
    )
    fs.rmSync(markerFile, { force: true })
    const before = await observeSignal(subject.directory, controlFile, signal)
    assert.equal(
      fs.existsSync(markerFile),
      false,
      'original signal handler exits without finalizing main',
    )
    fs.rmSync(markerFile, { force: true })
    const after = await observeSignal(subject.directory, currentFile, signal)
    assert.deepEqual(
      after,
      before,
      'the exact original signal exit, stdout and stderr',
    )
    assert.equal(
      fs.existsSync(markerFile),
      false,
      'the current handler does not run main finalizers',
    )
    rows.push({ signal, matched: true, mainFinalized: false })
  }
  await paired('SIGINT', 'cleanup witness')
  await paired('SIGTERM', 'cleanup witness')
  await fc.assert(
    fc.asyncProperty(
      fc.constantFrom('SIGINT', 'SIGTERM'),
      fc.string(),
      async (signal, marker) => paired(signal, marker),
    ),
    { numRuns: 100, seed: 413930 },
  )
  if (process.env.SCAFFOLD_SIGNAL_RECEIPT)
    fs.writeFileSync(
      process.env.SCAFFOLD_SIGNAL_RECEIPT,
      JSON.stringify(
        {
          cases: rows.length,
          properties: 100,
          seed: 413930,
          rows,
          originalSourceSha256: fixture.sha256,
          protectedAssertionsChanged: false,
          protectedTimeoutArgumentsChanged: false,
        },
        null,
        2,
      ) + '\n',
    )
})
