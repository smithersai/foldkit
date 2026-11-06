// @vitest-environment node
import { Effect } from 'effect'
import fc from 'fast-check'
import { spawnSync } from 'node:child_process'
import {
  mkdtempSync,
  mkdirSync,
  readFileSync,
  rmSync,
  symlinkSync,
  writeFileSync,
} from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { describe, expect, test } from 'vitest'

import corpus from './fixtures/foldkit-prerender-entry.json'
import { main } from './prerender.vibe'

const modes = [
  'direct',
  'relative',
  'import',
  'preload',
  'symlink',
  'preserve-symlink',
] as const
type Mode = (typeof modes)[number]

const entrySource = readFileSync(
  fileURLToPath(new URL('./runPrerender.ts', import.meta.url)),
  'utf8',
)
const entryBody = entrySource.replace(/^import .+ from .+\n/gm, '').trim()
const marker = corpus.marker
const prefix =
  "import { NodeRuntime } from './runtime.mjs'\nimport { main } from './library.mjs'\n"
const control =
  prefix + 'if (' + corpus.condition + ') { NodeRuntime.runMain(main()) }\n'
const candidate = prefix + entryBody + '\n'

const makeHarness = () => {
  const root = mkdtempSync(join(tmpdir(), 'foldkit-prerender-entry-'))
  let index = 0
  const stub = (dir: string) => {
    mkdirSync(dir, { recursive: true })
    writeFileSync(
      join(dir, 'runtime.mjs'),
      'export const NodeRuntime = { runMain(value) { if (value !== ' +
        JSON.stringify(marker) +
        ') throw new Error("unexpected payload"); process.stdout.write(value + "\\n") } }\n',
    )
    writeFileSync(
      join(dir, 'library.mjs'),
      'export function main() { return ' + JSON.stringify(marker) + ' }\n',
    )
  }
  const run = (file: string, link: string, mode: Mode) => {
    const url = pathToFileURL(file).href
    const args =
      mode === 'direct'
        ? [file]
        : mode === 'relative'
          ? ['./' + file.slice(root.length + 1)]
          : mode === 'import'
            ? [
                '--input-type=module',
                '-e',
                'await import(' + JSON.stringify(url) + ')',
              ]
            : mode === 'preload'
              ? ['--import', url, '--input-type=module', '-e', '']
              : mode === 'symlink'
                ? [link]
                : ['--preserve-symlinks-main', link]
    const result = spawnSync(process.execPath, args, {
      cwd: root,
      encoding: 'utf8',
      timeout: 10_000,
    })
    return {
      status: result.status,
      signal: result.signal,
      stdout: result.stdout,
      stderr: result.stderr,
      error: result.error?.name,
    }
  }
  return {
    root,
    pair(stem: string, mode: Mode) {
      const dir = join(root, String(index++) + '-' + stem)
      const links = join(dir, 'links')
      stub(dir)
      stub(links)
      const before = join(dir, 'before.mjs')
      const after = join(dir, 'after.mjs')
      const beforeLink = join(links, 'before.mjs')
      const afterLink = join(links, 'after.mjs')
      writeFileSync(before, control)
      writeFileSync(after, candidate)
      symlinkSync(before, beforeLink)
      symlinkSync(after, afterLink)
      const expected =
        mode === 'import' || mode === 'preload' ? '' : marker + '\n'
      const original = run(before, beforeLink, mode)
      const actual = run(after, afterLink, mode)
      expect(original).toEqual({
        status: 0,
        signal: null,
        stdout: expected,
        stderr: '',
        error: undefined,
      })
      expect(actual).toEqual(original)
    },
    close() {
      rmSync(root, { recursive: true, force: true })
    },
  }
}

describe('host-owned prerender entry identity', () => {
  test('the native main constructs a cold program when imported', () => {
    expect(Effect.isEffect(main())).toBe(true)
  })

  test.each(modes)('preserves the host decision for %s', mode => {
    const harness = makeHarness()
    try {
      harness.pair('space 汉字 #?%', mode)
    } finally {
      harness.close()
    }
  })

  test('generated names and invocation modes preserve output, exit and import silence', () => {
    const harness = makeHarness()
    try {
      const stem = fc
        .array(
          fc.constantFrom('a', 'Z', '_', '-', ' ', '汉', '字', '#', '?', '%'),
          {
            minLength: 1,
            maxLength: 12,
          },
        )
        .map(parts => parts.join(''))
      fc.assert(
        fc.property(stem, fc.constantFrom(...modes), (name, mode) => {
          harness.pair(name, mode)
        }),
        { seed: 531126, numRuns: 100 },
      )
    } finally {
      harness.close()
    }
  }, 120_000)
})
