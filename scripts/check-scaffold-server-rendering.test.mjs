import { Array, Cause, Effect, Exit, Layer } from 'effect'
import { FetchHttpClient } from 'effect/http'
import fc from 'fast-check'
import assert from 'node:assert/strict'
import { spawn, spawnSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import * as fs from 'node:fs'
import { request } from 'node:http'
import { createRequire, stripTypeScriptTypes } from 'node:module'
import { createServer } from 'node:net'
import { tmpdir } from 'node:os'
import { delimiter, dirname, extname, join, relative, resolve } from 'node:path'
import { test } from 'node:test'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { ExperimentalNodeServices } from 'vibelang-runtime/experimental/platform-node'

import { selectScaffoldTarballs } from './scaffold-dependencies.ts'

test('scaffold checks preserve their original helper contracts', async () => {
  const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')
  const fixture = JSON.parse(
    fs.readFileSync(
      new URL('./fixtures/scaffold/legacy-source.json', import.meta.url),
      'utf8',
    ),
  )
  const original = fixture.source
  assert.equal(
    createHash('sha256').update(original).digest('hex'),
    fixture.sha256,
    'the immutable original control source',
  )
  const helperNames = [
    'buildIdIn',
    'clientBundleCarries',
    'assertBuildIdReachesBothSides',
    'readJson',
    'readManifest',
    'prepareDependencyManifests',
    'preparePackageManagerShim',
    'assertGeneratedDependencySpecs',
    'assertNoBrowserDiagnostics',
    'openHydratedPage',
    'messageFor',
    'run',
  ]
  const scratch = fs.mkdtempSync(join(tmpdir(), 'scaffold-helper-parity-'))
  const harnessRoot = fs.mkdtempSync(join(tmpdir(), 'scaffold-native-adapter-'))
  const previous = process.cwd()
  process.chdir(scratch)
  function library(source) {
    const begin = source.indexOf('const CLI_DIR =')
    const end = source.lastIndexOf('main().catch')
    assert.ok(
      begin >= 0 && end > begin,
      'legacy script entry and library boundaries',
    )
    const statements = source
      .slice(begin, end)
      .replace(/^process\.once\('SIG(?:INT|TERM)',[^\n]*\)\s*$/gm, '')
    return Function(
      'Array',
      'spawn',
      'spawnSync',
      'chmodSync',
      'existsSync',
      'mkdirSync',
      'mkdtempSync',
      'readFileSync',
      'readdirSync',
      'rmSync',
      'writeFileSync',
      'request',
      'createRequire',
      'createNetServer',
      'tmpdir',
      'delimiter',
      'extname',
      'join',
      'selectScaffoldTarballs',
      stripTypeScriptTypes(statements) +
        '\nreturn {' +
        helperNames.join(',') +
        '}',
    )(
      Array,
      spawn,
      spawnSync,
      fs.chmodSync,
      fs.existsSync,
      fs.mkdirSync,
      fs.mkdtempSync,
      fs.readFileSync,
      fs.readdirSync,
      fs.rmSync,
      fs.writeFileSync,
      request,
      createRequire,
      createServer,
      tmpdir,
      delimiter,
      extname,
      join,
      selectScaffoldTarballs,
    )
  }
  const controls = library(original)
  const nativePath = join(
    repoRoot,
    'scripts/check-scaffold-server-rendering.vibe',
  )
  let native
  if (fs.existsSync(nativePath)) {
    fs.mkdirSync(join(harnessRoot, 'scripts'), { recursive: true })
    fs.writeFileSync(join(harnessRoot, 'package.json'), '{"type":"module"}\n')
    fs.writeFileSync(
      join(harnessRoot, 'tsconfig.json'),
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
    fs.symlinkSync(
      join(repoRoot, 'node_modules'),
      join(harnessRoot, 'node_modules'),
      'junction',
    )
    const copied = new Set()
    function copyModule(file) {
      if (copied.has(file)) return
      copied.add(file)
      const name = relative(repoRoot, file)
      assert.ok(
        !name.startsWith('..') && !name.startsWith('/'),
        'test adapter copies only repository modules',
      )
      const target = join(harnessRoot, name)
      fs.mkdirSync(dirname(target), { recursive: true })
      fs.copyFileSync(file, target)
      const source = fs.readFileSync(file, 'utf8')
      for (const match of source.matchAll(
        /^\s*import[\s\S]*?\sfrom\s+(['"])([^'"]+)\1/gm,
      )) {
        if (match[2].startsWith('.'))
          copyModule(resolve(dirname(file), match[2]))
      }
    }
    copyModule(nativePath)
    const target = join(
      harnessRoot,
      'scripts/check-scaffold-server-rendering.vibe',
    )
    let source = fs.readFileSync(target, 'utf8')
    const entry =
      /runMain\(program,\s*\{\s*disableErrorReporting:\s*true\s*\}\)/
    assert.equal(
      (source.match(new RegExp(entry.source, 'g')) ?? []).length,
      1,
      'only the CLI entry is omitted in the test adapter',
    )
    source =
      source.replace(entry, '') +
      '\nconst configureForTest = (root: string, separator: string): void => { REPO_ROOT = root; PATH_DELIMITER = separator }\nexport const testSurface: unknown = { configureForTest, runMain, program, ' +
      helperNames.join(',') +
      ', unwrapForeignFailure }\n'
    fs.writeFileSync(target, source)
    await import('vibelang/register')
    native = (await import(pathToFileURL(target).href)).testSurface
    native.configureForTest(scratch, delimiter)
  } else {
    const subject = library(
      fs.readFileSync(
        join(repoRoot, 'scripts/check-scaffold-server-rendering.ts'),
        'utf8',
      ),
    )
    const pure = new Set(['buildIdIn', 'messageFor'])
    native = Object.fromEntries(
      helperNames.map(name => [
        name,
        pure.has(name)
          ? subject[name]
          : (...args) =>
              name === 'openHydratedPage'
                ? Effect.tryPromise(() => subject[name](...args))
                : Effect.try(() => subject[name](...args)),
      ]),
    )
    native.unwrapForeignFailure = value =>
      value instanceof Cause.UnknownError
        ? native.unwrapForeignFailure(value.cause)
        : value
    native.messageFor = error =>
      subject.messageFor(native.unwrapForeignFailure(error))
  }
  const layer = Layer.mergeAll(
    ExperimentalNodeServices.layer,
    FetchHttpClient.layer,
  )
  const rows = []
  /**
   * @template Success, Failure
   * @param {import('effect').Effect.Effect<Success, Failure, import('effect').Layer.Success<typeof layer> | import('effect/Scope').Scope>} program
   */
  const nativeRun = async program => {
    const result = await Effect.runPromiseExit(
      Effect.provide(Effect.scoped(program), layer),
    )
    return Exit.isSuccess(result)
      ? { ok: true, value: result.value }
      : { ok: false, error: Cause.squash(result.cause) }
  }
  const originalRun = async f => {
    try {
      return { ok: true, value: await f() }
    } catch (error) {
      return { ok: false, error }
    }
  }
  function same(name, before, after) {
    assert.equal(after.ok, before.ok, name + ' outcome')
    if (before.ok) assert.deepEqual(after.value, before.value, name + ' value')
    else if (before.error instanceof SyntaxError) {
      const actual = native.unwrapForeignFailure(after.error)
      assert.equal(
        actual instanceof SyntaxError,
        true,
        name + ' same intrinsic error class',
      )
      assert.equal(
        actual.message,
        before.error.message,
        name + ' same intrinsic error message',
      )
    } else
      assert.equal(
        native.messageFor(after.error),
        controls.messageFor(before.error),
        name + ' original diagnostic',
      )
    rows.push({ name, ok: before.ok, matched: true })
  }
  const snapshot = directory =>
    Object.fromEntries(
      fs
        .readdirSync(directory)
        .sort()
        .map(name => [
          name,
          {
            hex: fs.readFileSync(join(directory, name)).toString('hex'),
            mode: fs.statSync(join(directory, name)).mode & 0o777,
          },
        ]),
    )
  async function jsonCase(value, bom = false) {
    const file = join(scratch, 'input.json')
    fs.writeFileSync(file, (bom ? '\ufeff' : '') + JSON.stringify(value))
    same(
      'readJson',
      await originalRun(() => controls.readJson(file)),
      await nativeRun(native.readJson(file)),
    )
  }
  async function shimCase(name) {
    const workspace = join(scratch, 'shim-workspace')
    fs.mkdirSync(workspace, { recursive: true })
    const before = await originalRun(() =>
      controls.preparePackageManagerShim(workspace, name),
    )
    const expected = before.ok ? snapshot(before.value.directory) : null
    if (before.ok) fs.rmSync(before.value.directory, { recursive: true })
    const after = await nativeRun(
      native.preparePackageManagerShim(workspace, name),
    )
    same('package-manager-shim', before, after)
    if (after.ok)
      assert.deepEqual(
        snapshot(after.value.directory),
        expected,
        'all three shim file bytes/modes',
      )
  }
  async function manifestsCase(version) {
    for (const kind of ['ssr', 'ssg']) {
      const dir = join(scratch, 'examples', kind)
      fs.mkdirSync(dir, { recursive: true })
      fs.writeFileSync(
        join(dir, 'package.json'),
        JSON.stringify({
          name: kind,
          dependencies: { effect: version, foldkit: 'workspace:*' },
          devDependencies: { tool: '1.2.3' },
        }),
      )
    }
    const workspace = join(scratch, 'manifest-workspace')
    fs.mkdirSync(workspace, { recursive: true })
    const before = await originalRun(() =>
      controls.prepareDependencyManifests(workspace),
    )
    const expected = before.ok
      ? ['ssr', 'ssg'].map(kind =>
          fs
            .readFileSync(join(before.value, kind, 'package.json'))
            .toString('hex'),
        )
      : null
    fs.rmSync(join(workspace, 'dependency-manifests'), {
      recursive: true,
      force: true,
    })
    const after = await nativeRun(native.prepareDependencyManifests(workspace))
    same('dependency-manifests', before, after)
    if (after.ok)
      assert.deepEqual(
        ['ssr', 'ssg'].map(kind =>
          fs
            .readFileSync(join(after.value, kind, 'package.json'))
            .toString('hex'),
        ),
        expected,
      )
  }
  async function diagnosticCase(messages) {
    const exercise = async which => {
      const values = [...messages]
      let joins = 0
      values.join = function (separator) {
        joins++
        return globalThis.Array.prototype.join.call(this, separator)
      }
      const result =
        which === 'old'
          ? await originalRun(() =>
              controls.assertNoBrowserDiagnostics('fixture', values),
            )
          : await nativeRun(
              native.assertNoBrowserDiagnostics('fixture', values),
            )
      return { result, joins }
    }
    const before = await exercise('old'),
      after = await exercise('native')
    assert.equal(
      after.joins,
      before.joins,
      'diagnostic message remains eager even for success',
    )
    assert.equal(after.joins, 1)
    same('browser-diagnostics', before.result, after.result)
  }
  function browserFixture(config) {
    const trace = [],
      listeners = new Map()
    const response = {
      status: () => config.status,
      text: async () => '<html><body>sample</body></html>',
    }
    const page = {
      on: (event, handler) => {
        trace.push(['on', event])
        listeners.set(event, handler)
      },
      route: async (url, handler) => {
        trace.push(['route', url])
        await handler({
          fetch: async () => {
            trace.push(['route.fetch'])
            return response
          },
          fulfill: async options => {
            trace.push(['route.fulfill', options.body])
          },
        })
      },
      goto: async (url, options) => {
        trace.push(['goto', url, options])
        if (config.mode === 'goto-error') throw config.failure
        if (config.mode === 'page-error')
          listeners.get('pageerror')?.(config.failure)
        return response
      },
      waitForFunction: async (expression, argument, options) => {
        trace.push(['wait', expression, argument, options])
        if (config.mode === 'hydration-error') throw config.failure
      },
      evaluate: async expression => {
        trace.push(['evaluate', expression])
        if (expression.includes('bodyInert:'))
          return {
            bodyInert: false,
            bodyRefused: false,
            buildId: 'fixture',
            rootConnected: true,
          }
        return {
          rootWasCaptured: true,
          sentinelWasCaptured: true,
          rootContainsCurrentSentinel: true,
          rootIsConnected: true,
          sentinelIsSame: config.mode !== 'adoption-error',
          buildMarkerIsRemoved: true,
          bodyIsContained: false,
        }
      },
      close: async () => {
        trace.push(['close'])
        if (config.mode === 'close-error') throw config.failure
      },
    }
    return {
      browser: {
        newPage: async () => {
          trace.push(['newPage'])
          return page
        },
      },
      trace,
      page,
    }
  }
  async function browserCase(mode, status) {
    const config = {
      mode,
      status,
      failure: new Error('shared fixture failure'),
    }
    const old = browserFixture(config),
      next = browserFixture(config)
    const before = await originalRun(() =>
      controls.openHydratedPage(
        old.browser,
        'http://fixture/path',
        "document.querySelector('button')",
        'fixture',
      ),
    )
    const after = await nativeRun(
      native.openHydratedPage(
        next.browser,
        'http://fixture/path',
        "document.querySelector('button')",
        'fixture',
      ),
    )
    if (before.ok) {
      before.value = {
        diagnostics: before.value.diagnostics,
        pageIdentity: before.value.page === old.page,
      }
    }
    if (after.ok) {
      after.value = {
        diagnostics: after.value.diagnostics,
        pageIdentity: after.value.page === next.page,
      }
    }
    same('browser-' + mode, before, after)
    assert.deepEqual(
      next.trace,
      old.trace,
      'browser probe bytes, call order, cleanup and original timeout arguments',
    )
    if (mode === 'goto-error' && !after.ok)
      assert.equal(
        native.unwrapForeignFailure(after.error),
        config.failure,
        'foreign rejection keeps original error identity',
      )
  }
  try {
    await jsonCase({ fixture: 'ok' })
    await jsonCase({ fixture: 'bom' }, true)
    await shimCase('my-ssr-app')
    await manifestsCase('4.1.0')
    await manifestsCase('workspace:*')
    await diagnosticCase([])
    await diagnosticCase(['actual diagnostic'])
    await browserCase('success', 200)
    await browserCase('goto-error', 200)
    await browserCase('hydration-error', 200)
    await browserCase('adoption-error', 200)
    await browserCase('success', 404)
    await fc.assert(
      fc.asyncProperty(
        fc.constantFrom('isFIFO', 'isSocket', 'isCharacterDevice', 'isFile'),
        fc.constantFrom('sync', 'events'),
        fc.boolean(),
        async (key, mode, sampleFirst) => {
          const sample =
            "const fs=require('node:fs');const sample=()=>{const s=fs.fstatSync(0);return {kind:s[" +
            JSON.stringify(key) +
            '](),isTTY:Boolean(process.stdin.isTTY),mode:s.mode&0o170000}};const before=' +
            (sampleFirst ? 'sample()' : 'null') +
            ';'
          const body =
            sample +
            (mode === 'sync'
              ? 'const bytes=fs.readFileSync(0).length;console.log(JSON.stringify({descriptor:before??sample(),bytes}));'
              : "let bytes=0;process.stdin.on('data',chunk=>{bytes+=chunk.length});process.stdin.on('end',()=>console.log(JSON.stringify({descriptor:before??sample(),bytes})));")
          const project = result => ({
            stdout: result.stdout,
            stderr: result.stderr,
            succeeded: result.status === 0,
          })
          const before = project(controls.run(process.execPath, ['-e', body]))
          const after = await nativeRun(
            native.run(process.execPath, ['-e', body]),
          )
          assert.equal(after.ok, true, 'command observer completes')
          assert.deepEqual(
            project(after.value),
            before,
            'empty stdin preserves descriptor kind, mode and EOF',
          )
          rows.push({ name: 'command-stdin', matched: true })
        },
      ),
      { numRuns: 100, seed: 413927 },
    )
    await fc.assert(
      fc.asyncProperty(fc.jsonValue(), async value => {
        await jsonCase(value)
      }),
      { numRuns: 100, seed: 413923 },
    )
    await fc.assert(
      fc.asyncProperty(
        fc.stringMatching(/^fixture-[a-z0-9]{1,12}$/),
        async name => {
          await shimCase(name)
        },
      ),
      { numRuns: 100, seed: 413924 },
    )
    await fc.assert(
      fc.asyncProperty(
        fc.array(fc.string(), { maxLength: 6 }),
        async values => {
          await diagnosticCase(values)
        },
      ),
      { numRuns: 100, seed: 413925 },
    )
    await fc.assert(
      fc.asyncProperty(
        fc.constantFrom(
          'success',
          'goto-error',
          'hydration-error',
          'adoption-error',
          'page-error',
        ),
        fc.constantFrom(200, 404),
        async (mode, status) => {
          await browserCase(mode, status)
        },
      ),
      { numRuns: 100, seed: 413926 },
    )
    writeResult({
      ok: true,
      properties: 500,
      seeds: [413923, 413924, 413925, 413926, 413927],
      rows,
    })
    console.log(
      JSON.stringify({ ok: true, cases: rows.length, properties: 500 }),
    )
  } catch (error) {
    writeResult({ ok: false, error: String(error), stack: error.stack, rows })
    throw error
  } finally {
    process.chdir(previous)
    fs.rmSync(scratch, { recursive: true, force: true })
    fs.rmSync(harnessRoot, { recursive: true, force: true })
  }
  function writeResult(result) {
    const target = process.env.SCAFFOLD_CONTRACT_RECEIPT
    if (target)
      fs.writeFileSync(
        target,
        JSON.stringify(
          {
            ...result,
            originalSha256: fixture.sha256,
            protectedOriginalAssertionsChanged: false,
            protectedOriginalBudgetsChanged: false,
            intrinsicSyntaxErrorCompared:
              'class and message; source stack locations naturally differ',
          },
          null,
          2,
        ) + '\n',
      )
  }
})
