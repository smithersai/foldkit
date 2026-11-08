import fc from 'fast-check'
import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import {
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  symlinkSync,
  writeFileSync,
} from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { test } from 'node:test'
import { fileURLToPath } from 'node:url'

import {
  nativeOptions,
  nativeRules,
  readPolicy,
} from './run-vibe-effect-lint.mjs'

const runner = fileURLToPath(
  new URL('./run-vibe-effect-lint.mjs', import.meta.url),
)
const corpus = readFileSync(
  new URL('./fixtures/foldkit-effect-lint.vibe.txt', import.meta.url),
  'utf8',
)

test('Effect lint severities preserve disabled rules and reject warnings', () => {
  fc.assert(
    fc.property(
      fc.constantFrom(0, 1, 2, 'off', 'warn', 'error'),
      fc.boolean(),
      fc.constantFrom(
        ['effecttsgo/floating-effect', 'floatingEffect'],
        ['effecttsgo/schema-sync-in-effect', 'schemaSyncInEffect'],
      ),
      (severity, isArray, [rule, name]) => {
        const setting = isArray ? [severity] : severity
        assert.deepEqual(nativeRules({ [rule]: setting }), {
          [name]: severity === 0 || severity === 'off' ? 'off' : 'error',
        })
      },
    ),
    { numRuns: 300 },
  )
})

test('Effect lint inheritance retains scoped exclusions and rejects unknown rules', () => {
  const root = mkdtempSync(join(tmpdir(), 'foldkit-effect-lint-policy-'))
  try {
    const base = join(root, 'base policy')
    mkdirSync(base)
    writeFileSync(
      join(base, 'base.json'),
      JSON.stringify({
        rules: { 'effecttsgo/floating-effect': 'warn' },
        overrides: [
          {
            files: ['scoped/**/*.vibe'],
            rules: { 'effecttsgo/floating-effect': 'off' },
          },
        ],
      }),
    )
    writeFileSync(
      join(root, 'policy.json'),
      JSON.stringify({
        extends: ['./base policy/base.json'],
        rules: { 'effecttsgo/schema-sync-in-effect': 'warn' },
        ignorePatterns: ['ignored/'],
      }),
    )
    const policy = readPolicy(join(root, 'policy.json'))
    const plugin = nativeOptions(policy, root)
    assert.equal(plugin.name, '@effect/language-service')
    assert.equal(plugin.diagnosticSeverity.floatingEffect, 'off')
    assert.deepEqual(plugin.overrides[0].options.diagnosticSeverity, {
      floatingEffect: 'error',
      schemaSyncInEffect: 'error',
    })
    assert.deepEqual(plugin.overrides[1], {
      include: [join(base, 'scoped/**/*.vibe')],
      options: { diagnosticSeverity: { floatingEffect: 'off' } },
    })
    assert.deepEqual(plugin.overrides.at(-1).include, [
      join(root, 'ignored/**/*'),
    ])
    assert.throws(
      () => nativeRules({ 'effecttsgo/not-a-pinned-rule': 'warn' }),
      /Unknown rule/,
    )
    assert.throws(
      () => nativeOptions(policy, root, []),
      /at least one source path/,
    )
    writeFileSync(
      join(root, 'empty-override.json'),
      JSON.stringify({
        overrides: [
          { files: [], rules: { 'effecttsgo/floating-effect': 'off' } },
        ],
      }),
    )
    assert.throws(
      () => readPolicy(join(root, 'empty-override.json')),
      /at least one file/,
    )
  } finally {
    rmSync(root, { recursive: true, force: true })
  }
})

test('native Effect lint checks both source forms, preserves exclusions and emits no files', () => {
  const root = mkdtempSync(join(tmpdir(), 'foldkit native lint '))
  try {
    const source = join(root, 'packages/app/src')
    mkdirSync(join(source, 'ignored'), { recursive: true })
    mkdirSync(join(root, 'node_modules'))
    for (const name of ['effect', 'vibelang-runtime']) {
      symlinkSync(
        fileURLToPath(new URL('../node_modules/' + name, import.meta.url)),
        join(root, 'node_modules', name),
        'dir',
      )
    }
    writeFileSync(
      join(root, 'package.json'),
      '{"private":true,"type":"module"}',
    )
    for (const name of [
      'floating.vibe',
      'twin.ts',
      'excepted.vibe',
      'ignored/input.vibe',
    ]) {
      writeFileSync(join(source, name), corpus)
    }
    const project = join(root, 'packages/app/tsconfig.json')
    writeFileSync(
      project,
      JSON.stringify({
        compilerOptions: {
          target: 'ES2022',
          module: 'NodeNext',
          moduleResolution: 'NodeNext',
          strict: true,
          skipLibCheck: true,
          types: [],
        },
        include: ['src/**/*.ts', 'src/**/*.vibe'],
      }),
    )
    const config = join(root, 'policy.json')
    const policy = {
      rules: { 'effecttsgo/floating-effect': 'warn' },
      overrides: [
        {
          files: ['packages/app/src/excepted.vibe'],
          rules: { 'effecttsgo/floating-effect': 'off' },
        },
      ],
      ignorePatterns: ['packages/app/src/ignored/'],
    }
    writeFileSync(config, JSON.stringify(policy))
    const run = () => {
      const result = spawnSync(
        process.execPath,
        [runner, '--project', project, '--config', config],
        { cwd: root, encoding: 'utf8', timeout: 90000 },
      )
      assert.ifError(result.error)
      return { status: result.status, output: result.stdout + result.stderr }
    }

    const failing = run()
    assert.equal(failing.status, 1, failing.output)
    assert.equal(
      failing.output.match(/error EK3801:/g)?.length,
      2,
      failing.output,
    )
    assert.match(failing.output, /floating\.vibe\(/)
    assert.match(failing.output, /twin\.ts\(/)
    assert.doesNotMatch(
      failing.output,
      /excepted\.vibe\([^)]*\): error EK3801:/,
    )
    assert.doesNotMatch(
      failing.output,
      /ignored\/input\.vibe\([^)]*\): error EK3801:/,
    )
    assert.doesNotMatch(failing.output, /TS5023/)

    writeFileSync(
      config,
      JSON.stringify({
        rules: policy.rules,
        overrides: [],
        ignorePatterns: [],
      }),
    )
    const unrestricted = run()
    assert.equal(unrestricted.status, 1, unrestricted.output)
    assert.equal(
      unrestricted.output.match(/error EK3801:/g)?.length,
      4,
      unrestricted.output,
    )

    policy.rules['effecttsgo/floating-effect'] = 'off'
    writeFileSync(config, JSON.stringify(policy))
    const disabled = run()
    assert.equal(disabled.status, 0, disabled.output)
    assert.doesNotMatch(disabled.output, /EK3801/)

    writeFileSync(
      config,
      JSON.stringify({ rules: { 'effecttsgo/schema-sync-in-effect': 'warn' } }),
    )
    const schemaFile = join(source, 'decoder.vibe')
    for (const [fixture, expected] of [
      ['foldkit-effect-schema-decoder.vibe.txt', 1],
      ['foldkit-effect-schema-decoder-fixed.vibe.txt', 0],
    ]) {
      writeFileSync(
        schemaFile,
        readFileSync(new URL('./fixtures/' + fixture, import.meta.url), 'utf8'),
      )
      const result = run()
      assert.equal(result.status, expected, result.output)
      if (expected === 1) assert.match(result.output, /error EK38113:/)
      else assert.doesNotMatch(result.output, /EK38113/)
    }

    assert.equal(existsSync(join(source, 'floating.js')), false)
    assert.equal(existsSync(join(source, 'floating.d.vibe.ts')), false)
  } finally {
    rmSync(root, { recursive: true, force: true })
  }
})
