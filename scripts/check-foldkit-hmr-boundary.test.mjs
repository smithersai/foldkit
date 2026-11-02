import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { test } from 'node:test'
import ts from 'typescript'
import parser from 'vibelang/eslint'

const consumers = [
  'packages/foldkit/src/hydrate.vibe',
  'packages/foldkit/src/runtime/devToolsConfig.vibe',
]
const source = path =>
  readFileSync(new URL('../' + path, import.meta.url), 'utf8')

function rawMetadataReads(text, filePath) {
  const { ast } = parser.parseForESLint(text, {
    filePath,
    sourceType: 'module',
    ecmaVersion: 2022,
  })
  const reads = []
  function visit(node, parent) {
    if (!node || typeof node !== 'object') return
    if (
      node.type === 'MetaProperty' &&
      node.meta.name === 'import' &&
      node.property.name === 'meta'
    ) {
      const permitted =
        parent?.type === 'MemberExpression' &&
        parent.object === node &&
        parent.computed === false &&
        parent.property.name === 'url'
      if (!permitted) reads.push(node.range)
    }
    for (const [key, value] of Object.entries(node)) {
      if (['parent', 'tokens', 'comments', 'loc', 'range'].includes(key))
        continue
      if (Array.isArray(value)) for (const child of value) visit(child, node)
      else if (value && typeof value === 'object') visit(value, node)
    }
  }
  visit(ast, undefined)
  return reads
}

test('native hydration and DevTools consumers obey the module metadata boundary', () => {
  for (const path of consumers) {
    assert.deepEqual(
      rawMetadataReads(
        source(path),
        new URL('../' + path, import.meta.url).pathname,
      ),
      [],
      path,
    )
  }
  const sample = new URL('../boundary-oracle.vibe', import.meta.url).pathname
  assert.deepEqual(
    rawMetadataReads('export const identity: string = import.meta.url', sample),
    [],
  )
  assert.equal(
    rawMetadataReads('export const hot: unknown = import.meta.hot', sample)
      .length,
    1,
  )
  assert.equal(
    rawMetadataReads('export const meta: unknown = import.meta', sample).length,
    1,
  )
  assert.equal(
    rawMetadataReads(
      "export const computed: unknown = import.meta['url']",
      sample,
    ).length,
    1,
  )
  assert.deepEqual(
    rawMetadataReads("export const text: string = 'import.meta.hot'", sample),
    [],
  )
})

test('raw HMR helpers retain lazy per-read context identity through generated host changes', () => {
  const helpers = consumers.map(path => {
    const name = path.replace(/\.vibe$/, '.hot.ts')
    const output = ts.transpileModule(source(name), {
      compilerOptions: {
        target: ts.ScriptTarget.ES2022,
        module: ts.ModuleKind.ESNext,
      },
    })
    return { name, code: output.outputText }
  })
  const program = String.raw`
import assert from 'node:assert/strict'
import { SourceTextModule } from 'node:vm'
import fc from 'fast-check'
let data = ''
for await (const chunk of process.stdin) data += chunk
const helpers = JSON.parse(data)
let modules = 0
await fc.assert(fc.asyncProperty(
  fc.array(fc.option(fc.record({ token: fc.string(), active: fc.boolean() }), { nil: undefined }), { minLength: 1, maxLength: 20 }),
  async values => {
    for (const helper of helpers) {
      let reads = 0, current
      const module = new SourceTextModule(helper.code, {
        identifier: helper.name,
        initializeImportMeta(meta) {
          Object.defineProperty(meta, 'hot', { get() { reads++; return current } })
        },
      })
      await module.link(() => { throw new Error('the raw edge must be Effect-free and dependency-free') })
      await module.evaluate()
      assert.equal(reads, 0, 'initialization must not eagerly capture the hot context')
      for (const value of values) {
        current = value
        const before = reads
        assert.equal(module.namespace.readHotContext(), value, 'preserve the current exact host context')
        assert.equal(reads, before + 1, 'preserve one lookup for every original read')
      }
      modules++
    }
  },
), { numRuns: 100, seed: 413934 })
console.log(JSON.stringify({ propertyRuns: 100, seed: 413934, modules }))
`
  const result = spawnSync(
    process.execPath,
    ['--experimental-vm-modules', '--input-type=module', '-e', program],
    {
      input: JSON.stringify(helpers),
      encoding: 'utf8',
      cwd: new URL('../', import.meta.url),
      maxBuffer: 1024 * 1024,
    },
  )
  assert.equal(result.status, 0, result.stderr)
  assert.deepEqual(JSON.parse(result.stdout), {
    propertyRuns: 100,
    seed: 413934,
    modules: 200,
  })
})
