import { spawnSync } from 'node:child_process'
import {
  cpSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'

const scripts = dirname(fileURLToPath(import.meta.url))
const website = resolve(scripts, '..')
const root = resolve(website, '../..')
const compiler = join(root, 'node_modules/vibelang/native/vibelang')
const corpus = JSON.parse(
  readFileSync(
    join(scripts, 'fixtures/foldkit-website-recursive-heading-inline.json'),
    'utf8',
  ),
)
const currentPath = join(website, 'src/markdown/slug.vibe')
const current = readFileSync(
  existsSync(currentPath) ? currentPath : join(website, 'src/markdown/slug.ts'),
  'utf8',
)
const temporary = mkdtempSync(join(scripts, '.slug-native-'))
const source = join(temporary, 'source')
const results = join(temporary, 'results')
mkdirSync(results, { recursive: true })
let compileText
const declarations = []
const run = mutant => {
  const result = spawnSync(
    process.execPath,
    [join(source, 'verify.mjs'), ...(mutant ? ['--mutant'] : [])],
    {
      cwd: source,
      encoding: 'utf8',
      timeout: 30000,
      maxBuffer: 16 * 1024 * 1024,
    },
  )
  expect(result.error, result.stdout + result.stderr).toBeUndefined()
  writeFileSync(
    join(results, mutant ? 'mutant.log' : 'positive.log'),
    (result.stdout ?? '') + (result.stderr ?? ''),
  )
  return result
}
beforeAll(() => {
  const choices = ["HardBreak: () => ' '", 'when { _tag: "HardBreak" }: \' \'']
  const selected = choices.filter(value => current.includes(value))
  expect(selected).toHaveLength(1)
  expect(current.split(selected[0])).toHaveLength(2)
  const mutant = current.replace(selected[0], selected[0].replace("' '", "''"))
  for (const [side, file, text] of [
    ['original', 'slug.ts', corpus.originalSource],
    ['native', 'slug.vibe', current],
    ['mutant', 'slug.vibe', mutant],
  ]) {
    const directory = join(source, 'src', side)
    mkdirSync(directory, { recursive: true })
    writeFileSync(join(directory, file), text)
  }
  const config = join(source, 'tsconfig.json')
  writeFileSync(
    config,
    JSON.stringify({
      extends: join(website, 'tsconfig.json'),
      files: ['original/slug.ts', 'native/slug.vibe', 'mutant/slug.vibe'].map(
        file => join(source, 'src', file),
      ),
      include: [],
      exclude: [],
    }),
  )
  const args = [
    '-p',
    config,
    '--singleThreaded',
    '--incremental',
    'false',
    '--composite',
    'false',
    '--pretty',
    'false',
    '--noEmit',
    'false',
    '--declaration',
    'true',
    '--declarationMap',
    'false',
    '--sourceMap',
    'false',
    '--rewriteRelativeImportExtensions',
    'true',
    '--rootDir',
    join(source, 'src'),
    '--outDir',
    join(source, '.slug-output'),
  ]
  const result = spawnSync(compiler, args, {
    cwd: root,
    encoding: 'utf8',
    timeout: 30000,
    maxBuffer: 16 * 1024 * 1024,
    env: { ...process.env, GOMAXPROCS: '2' },
  })
  compileText = (result.stdout ?? '') + (result.stderr ?? '')
  writeFileSync(join(results, 'compile.log'), compileText)
  expect(result.error, compileText).toBeUndefined()
  expect(result.status, compileText).toBe(0)
  for (const side of ['original', 'native', 'mutant'])
    declarations.push(
      readFileSync(join(source, '.slug-output', side, 'slug.d.ts'), 'utf8'),
    )
  writeFileSync(join(source, 'verify.mjs'), verifyScript)
  writeFileSync(
    join(source, 'foldkit-website-recursive-heading-inline.json'),
    JSON.stringify(corpus.fixed),
  )
}, 60000)
afterAll(() => {
  if (process.env.FOLDKIT_SLUG_PROOF_DIR) {
    mkdirSync(process.env.FOLDKIT_SLUG_PROOF_DIR, { recursive: true })
    cpSync(temporary, process.env.FOLDKIT_SLUG_PROOF_DIR, { recursive: true })
  }
  rmSync(temporary, { recursive: true, force: true })
})
describe('native recursive markdown heading choices', () => {
  test('has no TypeScript-style choice diagnostic in the actual slug helper', () => {
    expect(
      compileText
        .split('\n')
        .filter(
          line => line.includes('native/slug.vibe') && /\bEK48\d+\b/.test(line),
        ),
      compileText,
    ).toEqual([])
  })
  test('retains the raw public declarations', () => {
    expect(new Set(declarations).size).toBe(1)
  })
  test('preserves recursive text, markers, Unicode and opaque Html identity', () => {
    const result = run(false)
    expect(result.status, result.stdout + result.stderr).toBe(0)
    const line = result.stdout
      .split('\n')
      .find(value => value.startsWith('SLUG_NATIVE_PROPERTY '))
    expect(line).toBeDefined()
    expect(
      JSON.parse(line.slice('SLUG_NATIVE_PROPERTY '.length)),
    ).toMatchObject({
      propertyRuns: 1,
      seed: corpus.seed,
      generatedModels: corpus.numRuns,
      fixedModels: 20,
      comparedModels: 1020,
      formatterCalls: 8160,
      immutableRecursiveInputs: true,
      allFourExportsCompared: true,
      terminalAndNestedHeadingMarkers: true,
      opaqueHtmlIdentity: true,
      nodeTags: [
        'Emphasis',
        'HardBreak',
        'Image',
        'InlineCode',
        'Link',
        'Strikethrough',
        'Strong',
        'Text',
      ],
    })
  })
  test('rejects a compiled HardBreak mutant for its output', () => {
    const result = run(true)
    expect(result.status).toBe(1)
    expect(result.stderr).toContain('fresh native outputs')
    expect(result.stderr).toContain('HardBreak')
  })
})

const verifyScript =
  "import assert from 'node:assert/strict'\nimport fs from 'node:fs'\nimport fc from 'fast-check'\nimport { Option } from 'effect'\nimport * as original from './.slug-output/original/slug.js'\nimport * as official from './.slug-output/native/slug.js'\nimport * as mutant from './.slug-output/mutant/slug.js'\nconst mode = process.argv.includes('--mutant') ? 'wrongHardBreak' : 'positive'\nconst selected = mode === 'positive' ? official : mutant\nconst fixed = JSON.parse(fs.readFileSync(new URL('./foldkit-website-recursive-heading-inline.json', import.meta.url), 'utf8'))\nconst stats = { comparedModels: 0, formatterCalls: 0, nodeTags: new Set() }\nconst title = input => Option.fromNullishOr(input)\nfunction hydrate(node) {\n  stats.nodeTags.add(node._tag)\n  const copy = { ...node }\n  if ('content' in copy) copy.content = Object.freeze(copy.content.map(hydrate))\n  if ('maybeTitle' in copy) copy.maybeTitle = title(copy.maybeTitle)\n  return Object.freeze(copy)\n}\nfunction observe(api, content, text, render) {\n  stats.formatterCalls += 4\n  return [api.inlineToText(content), api.parseHeadingId(content), api.slugify(text), api.stripHeadingIdMarker(render)]\n}\nfunction compare(input) {\n  const content = Object.freeze(input.content.map(hydrate))\n  const opaque = Object.freeze({ opaqueMarkup: 'same object identity' })\n  const render = Object.freeze([input.text, opaque, ' {#rendered-id}'])\n  const expected = observe(original, content, input.text, render)\n  assert.deepEqual(observe(selected, content, input.text, render), expected, 'fresh native outputs: ' + JSON.stringify(input.content))\n  for (const api of [original, selected]) {\n    assert.equal(api.slugify(api.slugify(input.text)), api.slugify(input.text), 'slugify idempotence')\n    for (const segments of [[], [opaque], [input.text, opaque], [input.text, ' {#only-marker}'], [input.text, ' marker {#with-text}']]) {\n      const got = api.stripHeadingIdMarker(segments), want = original.stripHeadingIdMarker(segments)\n      assert.deepEqual(got, want, 'rendered heading marker')\n      for (let i = 0; i < got.length; i++) if (typeof got[i] !== 'string') assert.equal(got[i], want[i], 'opaque Html identity')\n    }\n    assert.deepEqual(api.parseHeadingId([...content, { _tag: 'Text', value: ' {#fixed-id}' }]), original.parseHeadingId([...content, { _tag: 'Text', value: ' {#fixed-id}' }]), 'terminal marker')\n    assert.deepEqual(api.parseHeadingId([{ _tag: 'Emphasis', content: [...content, { _tag: 'Text', value: ' {#nested-id}' }] }]), original.parseHeadingId([{ _tag: 'Emphasis', content: [...content, { _tag: 'Text', value: ' {#nested-id}' }] }]), 'nested marker')\n  }\n  stats.comparedModels++\n}\nconst text = fc.string({ maxLength: 50 })\nconst leaf = fc.oneof(\n  fc.record({ _tag: fc.constant('Text'), value: text }),\n  fc.record({ _tag: fc.constant('InlineCode'), value: text }),\n  fc.constant({ _tag: 'HardBreak' }),\n  fc.record({ _tag: fc.constant('Image'), url: text, alt: text, maybeTitle: fc.option(text, { nil: null }) }),\n)\nlet inline = leaf\nfor (let depth = 0; depth < 4; depth++) {\n  const child = fc.array(inline, { maxLength: 4 })\n  inline = fc.oneof(leaf,\n    fc.record({ _tag: fc.constantFrom('Emphasis', 'Strong', 'Strikethrough'), content: child }),\n    fc.record({ _tag: fc.constant('Link'), content: child, url: text, maybeTitle: fc.option(text, { nil: null }) }),\n  )\n}\nfor (const input of fixed) compare(input)\nfc.assert(fc.property(fc.record({ content: fc.array(inline, { maxLength: 5 }), text }), compare), { seed: 5311400, numRuns: 1000 })\nassert.deepEqual([...stats.nodeTags].sort(), ['Emphasis', 'HardBreak', 'Image', 'InlineCode', 'Link', 'Strikethrough', 'Strong', 'Text'])\nconsole.log('SLUG_NATIVE_PROPERTY ' + JSON.stringify({ propertyRuns: 1, seed: 5311400, generatedModels: 1000, fixedModels: fixed.length, ...stats, nodeTags: [...stats.nodeTags].sort(), immutableRecursiveInputs: true, allFourExportsCompared: true, terminalAndNestedHeadingMarkers: true, opaqueHtmlIdentity: true, mutationControl: mode }))\n"
