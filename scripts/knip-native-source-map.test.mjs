import fc from 'fast-check'
import assert from 'node:assert/strict'
import {
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join, relative } from 'node:path'
import { test } from 'node:test'

const { getModuleSourcePathHandler } = await import(
  new URL('./util/to-source-path.js', import.meta.resolve('knip')).href
)

const corpus = JSON.parse(
  readFileSync(
    new URL(
      './fixtures/knip-native-source-map/foldkit-native-rule.json',
      import.meta.url,
    ),
    'utf8',
  ),
)

const withDirectory = operation => {
  const root = mkdtempSync(join(tmpdir(), 'foldkit-knip-native-map-'))
  try {
    return operation(root)
  } finally {
    rmSync(root, { recursive: true, force: true })
  }
}

const put = path => {
  mkdirSync(dirname(path), { recursive: true })
  writeFileSync(path, 'export const rule = 1\n')
}

const mapper = (root, srcDir, outDir, extension, configured = true) => {
  const workspace = { sourceMaps: [{ srcDir, outDir }] }
  return getModuleSourcePathHandler({
    cwd: root,
    config: {
      compilers: new Map(configured ? [[extension, source => source]] : []),
    },
    findWorkspaceByFilePath: path =>
      path.startsWith(root + '/') ? workspace : undefined,
  })
}

test('maps the compiled Foldkit rule to its real configured native source', () => {
  withDirectory(root => {
    const source = join(root, corpus.source)
    const output = join(root, corpus.output)
    put(source)
    put(output)
    const resolve = mapper(
      root,
      join(root, corpus.rootDir),
      join(root, corpus.outDir),
      corpus.extension,
    )
    assert.equal(resolve(output), source)
  })
})

const segment = fc
  .array(fc.constantFrom('a', 'b', 'Z', '0', '-', '_', 'é', '中'), {
    minLength: 1,
    maxLength: 8,
  })
  .map(characters => characters.join(''))

test('preserves configured source identities and native TypeScript precedence', () => {
  fc.assert(
    fc.property(
      fc.record({
        extension: fc.constantFrom('.vibe', '.native', '.component', '.mdx'),
        directories: fc.array(segment, { minLength: 0, maxLength: 3 }),
        name: segment,
        sourceRoot: fc.boolean(),
        shadowedByTypeScript: fc.boolean(),
      }),
      ({ extension, directories, name, sourceRoot, shadowedByTypeScript }) => {
        withDirectory(root => {
          const srcDir = sourceRoot ? join(root, 'src') : root
          const source = join(root, 'src', ...directories, name + extension)
          const outputDir = join(root, 'dist', 'native')
          const output = join(
            outputDir,
            relative(srcDir, source).slice(0, -extension.length) + '.js',
          )
          put(source)
          put(output)
          // A declaration sidecar must never substitute for the real source.
          put(source.slice(0, -extension.length) + '.d' + extension + '.ts')
          const tsSource = source.slice(0, -extension.length) + '.ts'
          if (shadowedByTypeScript) put(tsSource)

          const resolve = mapper(root, srcDir, outputDir, extension)
          assert.equal(
            resolve(output),
            shadowedByTypeScript ? tsSource : source,
          )

          const unconfigured = mapper(root, srcDir, outputDir, extension, false)
          assert.equal(
            unconfigured(output),
            shadowedByTypeScript ? tsSource : undefined,
          )

          rmSync(source)
          const withoutNativeSource = mapper(root, srcDir, outputDir, extension)
          assert.equal(
            withoutNativeSource(output),
            shadowedByTypeScript ? tsSource : undefined,
          )
        })
      },
    ),
    { numRuns: 1000, seed: 53131 },
  )
})
