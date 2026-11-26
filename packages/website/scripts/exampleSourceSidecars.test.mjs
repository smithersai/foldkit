// @vitest-environment node
import fc from 'fast-check'
import { spawn } from 'node:child_process'
import {
  existsSync,
  mkdtempSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  rmSync,
  writeFileSync,
} from 'node:fs'
import { tmpdir } from 'node:os'
import { basename, dirname, extname, join, relative } from 'node:path'
import { createInterface } from 'node:readline'
import { fileURLToPath } from 'node:url'
import { expect, test } from 'vitest'

import corpus from './fixtures/foldkit-website-vibex-example-sidecar.json' with { type: 'json' }

const website = dirname(dirname(fileURLToPath(import.meta.url)))
const childProgram = [
  "import { pathToFileURL } from 'node:url'",
  "import { createInterface } from 'node:readline'",
  'const { collectSourceFiles } = await import(pathToFileURL(process.argv[1]).href)',
  'const input = createInterface({ input: process.stdin, crlfDelay: Infinity })',
  'console.log(JSON.stringify({ ready: true }))',
  'for await (const line of input) {',
  '  const request = JSON.parse(line)',
  '  try {',
  '    const files = await collectSourceFiles(request.directory)',
  '    console.log(JSON.stringify({ id: request.id, ok: true, files }))',
  '  } catch (error) {',
  '    console.log(JSON.stringify({ id: request.id, ok: false, name: error?.name }))',
  '  }',
  '}',
].join('\n')

const withCollector = async run => {
  const config = ['vite.config.ts', 'vite.config.vibe']
    .map(name => join(website, name))
    .find(existsSync)
  if (config === undefined) throw new Error('Website Vite config is missing')
  const directory = mkdtempSync(join(tmpdir(), 'foldkit-example-sidecars-'))
  const prefix = '.source-collector-' + basename(directory)
  const modulePath = join(website, prefix + extname(config))
  const source = readFileSync(config, 'utf8')
  writeFileSync(modulePath, source + '\nexport { collectSourceFiles }\n')
  const child = spawn(
    process.execPath,
    [
      '--import',
      'vibelang/register',
      '--input-type=module',
      '-e',
      childProgram,
      modulePath,
    ],
    { cwd: website, stdio: ['pipe', 'pipe', 'pipe'] },
  )
  let errors = ''
  child.stderr.setEncoding('utf8')
  child.stderr.on('data', chunk => {
    errors += chunk
  })
  const lines = createInterface({ input: child.stdout })
  const iterator = lines[Symbol.asyncIterator]()
  let sequence = 0
  const receive = async () => {
    const result = await iterator.next()
    if (result.done) throw new Error('Collector child stopped: ' + errors)
    return JSON.parse(result.value)
  }
  try {
    expect(await receive()).toEqual({ ready: true })
    const collect = async path => {
      const id = sequence++
      child.stdin.write(JSON.stringify({ id, directory: path }) + '\n')
      const result = await receive()
      expect(result.id).toBe(id)
      return result
    }
    const write = (path, text = '// source listing fixture\n') => {
      mkdirSync(dirname(path), { recursive: true })
      writeFileSync(path, text)
    }
    await run({ directory, collect, write })
    expect(readFileSync(modulePath, 'utf8')).toBe(
      source + '\nexport { collectSourceFiles }\n',
    )
  } finally {
    child.stdin.end()
    child.kill()
    lines.close()
    for (const name of readdirSync(website)) {
      if (name.startsWith(prefix)) rmSync(join(website, name), { force: true })
    }
    rmSync(directory, { recursive: true, force: true })
  }
}

test('example source discovery excludes JSX declaration sidecars without hiding sources', async () => {
  await withCollector(async ({ directory, collect, write }) => {
    for (const path of corpus.files) write(join(directory, path))
    const result = await collect(directory)
    expect(result.ok).toBe(true)
    expect(result.files.map(path => relative(directory, path)).sort()).toEqual(
      [...corpus.visible].sort(),
    )
    const missing = await collect(join(directory, 'missing'))
    expect(missing.ok).toBe(true)
    expect(missing.files).toEqual([])
    const file = join(directory, 'not-a-directory')
    write(file)
    expect((await collect(file)).ok).toBe(false)
    console.log(
      'EXAMPLE_SIDECAR_FIXED ' +
        JSON.stringify({
          calls: 3,
          missingDirectoryEmpty: true,
          otherReadFailuresReject: true,
        }),
    )
  })
}, 120_000)

const segment = fc
  .array(fc.constantFrom('a', 'Z', '_', '-', '.', '汉', 'β', ' '), {
    minLength: 1,
    maxLength: 6,
  })
  .map(parts => 'part-' + parts.join(''))
const paths = fc.uniqueArray(
  fc
    .array(segment, { minLength: 1, maxLength: 3 })
    .map(parts => parts.join('/')),
  { minLength: 1, maxLength: 5 },
)
test('example source discovery preserves generated native source trees and excludes their sidecars', async () => {
  await withCollector(async ({ directory, collect, write }) => {
    let compared = 0
    let attempts = 0
    await fc.assert(
      fc.asyncProperty(paths, async stems => {
        const model = join(directory, 'model-' + attempts++)
        const visible = []
        for (const stem of stems) {
          for (const extension of [
            'vibe',
            'vibex',
            'ts',
            'tsx',
            'css',
            'md',
            'mjs',
          ]) {
            const path = stem + '.' + extension
            write(join(model, path))
            visible.push(path)
          }
          for (const extension of ['d.vibe.ts', 'd.vibex.ts', 'txt', 'log'])
            write(join(model, stem + '.' + extension))
        }
        write(join(model, 'node_modules/hidden.vibex'))
        write(join(model, 'vitest-setup.ts'))
        write(join(model, 'original.d.ts'))
        visible.push('original.d.ts')
        const result = await collect(model)
        expect(result.ok).toBe(true)
        expect(result.files.map(path => relative(model, path)).sort()).toEqual(
          visible.sort(),
        )
        compared++
      }),
      { seed: 5311430, numRuns: 200 },
    )
    expect(compared).toBe(200)
    console.log(
      'EXAMPLE_SIDECAR_PROPERTY ' +
        JSON.stringify({
          seed: 5311430,
          comparedModels: compared,
          nativeExtensions: ['vibe', 'vibex'],
          forbiddenSidecars: ['d.vibe.ts', 'd.vibex.ts'],
        }),
    )
  })
}, 120_000)
