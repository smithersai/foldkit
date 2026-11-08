// @vitest-environment node
import fc from 'fast-check'
import { Window } from 'happy-dom'
import {
  mkdtempSync,
  mkdirSync,
  readFileSync,
  rmSync,
  symlinkSync,
  writeFileSync,
} from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import vibelang from 'vibelang-vite'
import { build, type Plugin } from 'vite'
import { expect, test } from 'vitest'

import { shikiDarkTheme, shikiLightTheme } from '../src/shikiTheme.ts'
import websiteConfig, { EXAMPLE_FILE_EXTENSIONS } from '../vite.config.vibe'
import corpus from './fixtures/foldkit-vibex-snippet-discovery.json'
import { codeToHtml } from './nativeHighlight.ts'

const website = dirname(dirname(fileURLToPath(import.meta.url)))
const highlighter = websiteConfig.plugins?.find(
  plugin =>
    plugin !== null &&
    typeof plugin === 'object' &&
    'name' in plugin &&
    plugin.name === 'highlight-code',
)

test('native JSX files are eligible for displayed example sources', () => {
  expect(EXAMPLE_FILE_EXTENSIONS.has('.vibex')).toBe(true)
  for (const extension of ['.vibe', '.ts', '.tsx', '.css', '.md', '.mjs']) {
    expect(EXAMPLE_FILE_EXTENSIONS.has(extension)).toBe(true)
  }
})

test('native JSX snippets retain their basename, native language and copied text', async () => {
  const directory = mkdtempSync(join(tmpdir(), 'foldkit-vibex-snippets-'))
  const browser = new Window()
  const write = (relative: string, contents: string) => {
    const path = join(directory, relative)
    mkdirSync(dirname(path), { recursive: true })
    writeFileSync(path, contents)
  }
  const generated = fc.sample(
    fc.record({
      stem: fc
        .array(fc.constantFrom('a', 'Z', '_', '-', '汉', '🙂', '.'), {
          minLength: 1,
          maxLength: 8,
        })
        .map(parts => parts.join('')),
      payload: fc.string({ maxLength: 80 }),
    }),
    { seed: 5311420, numRuns: 200 },
  )
  const rows = [
    ...corpus.cases,
    ...generated.map((row, index) => ({
      name: 'generated-' + index + '-' + row.stem,
      source:
        'export const sample = effect { return <div>{' +
        JSON.stringify(row.payload) +
        '}</div> }\n',
    })),
  ]
  try {
    symlinkSync(
      join(website, 'node_modules'),
      join(directory, 'node_modules'),
      'dir',
    )
    write('package.json', '{"type":"module"}')
    write(
      'tsconfig.json',
      JSON.stringify({
        compilerOptions: {
          target: 'ES2022',
          module: 'ESNext',
          moduleResolution: 'Bundler',
          strict: true,
          skipLibCheck: true,
          noEmit: true,
          allowImportingTsExtensions: true,
          types: ['vite/client'],
          lib: ['ES2022', 'DOM'],
        },
        include: [
          'entry.ts',
          'src/vite-env.d.ts',
          'src/markdown/**/*.vibe',
          'src/markdown/**/*.ts',
        ],
        exclude: ['src/snippet/**/*'],
      }),
    )
    write(
      'src/vite-env.d.ts',
      readFileSync(join(website, 'src/vite-env.d.ts'), 'utf8'),
    )
    for (const file of ['snippets.vibe', 'snippets.globs.ts']) {
      write(
        'src/markdown/' + file,
        readFileSync(join(website, 'src/markdown', file), 'utf8'),
      )
    }
    for (const row of rows) {
      write('src/snippet/' + row.name + '.vibex', row.source)
      write(
        'src/snippet/' + row.name + '.d.vibex.ts',
        'export declare const excluded: unique symbol\n',
      )
    }
    write(
      'src/snippet/unchanged-native.vibe',
      'export const value = effect { return 42 }\n',
    )
    write(
      'src/snippet/unchanged-native.d.vibe.ts',
      'export declare const value: unknown\n',
    )
    write('src/snippet/unchanged-tsx.tsx', 'export const value = <div />\n')
    write('src/snippet/nested/ignored.vibex', 'export const nested = <div />\n')
    write('src/snippet/ignored.vibex.bak', 'not a snippet')
    write(
      'entry.ts',
      [
        "import { lookupSnippet } from './src/markdown/snippets.vibe'",
        "export { rawByPath, highlightedByPath } from './src/markdown/snippets.globs.ts'",
        'export const snippets = ' +
          JSON.stringify([
            ...rows.map(row => row.name),
            'unchanged-native',
            'unchanged-tsx',
          ]) +
          '.map(name => lookupSnippet(name))',
      ].join('\n'),
    )
    const css: Plugin = {
      name: 'foldkit-vibex-empty-css',
      resolveId: id =>
        id === 'virtual:css-snippets' ? '\0vibex-test-css' : undefined,
      load: id => (id === '\0vibex-test-css' ? 'export default {}' : undefined),
    }
    expect(highlighter).toBeDefined()
    await build({
      configFile: false,
      root: directory,
      envDir: false,
      logLevel: 'silent',
      plugins: [vibelang(), highlighter, css],
      build: {
        ssr: join(directory, 'entry.ts'),
        target: 'node26',
        outDir: 'out',
        emptyOutDir: true,
        minify: false,
        rollupOptions: {
          output: {
            format: 'es',
            entryFileNames: 'entry.mjs',
            inlineDynamicImports: true,
          },
        },
      },
    })
    const result: Readonly<{
      snippets: ReadonlyArray<unknown>
      rawByPath: Record<string, string>
      highlightedByPath: Record<string, string>
    }> = await import(pathToFileURL(join(directory, 'out/entry.mjs')).href)
    const expectedKeys = [
      ...rows.map(row => '../snippet/' + row.name + '.vibex'),
      '../snippet/unchanged-native.vibe',
      '../snippet/unchanged-tsx.tsx',
    ].sort()
    expect(Object.keys(result.rawByPath).sort()).toEqual(expectedKeys)
    expect(Object.keys(result.highlightedByPath).sort()).toEqual(expectedKeys)
    expect(result.snippets).toHaveLength(rows.length + 2)
    for (const [index, row] of rows.entries()) {
      const key = '../snippet/' + row.name + '.vibex'
      expect(result.rawByPath[key]).toBe(row.source)
      expect(result.snippets[index]).toMatchObject({
        _tag: 'Some',
        value: {
          raw: row.source,
          language: 'vibe',
          highlighted: result.highlightedByPath[key],
        },
      })
      expect(result.highlightedByPath[key]).toContain('<code>')
      expect(result.highlightedByPath[key]).toBe(
        await codeToHtml(row.source.trimEnd(), {
          lang: 'vibe',
          themes: { light: shikiLightTheme, dark: shikiDarkTheme },
        }),
      )
      const container = browser.document.createElement('div')
      container.innerHTML = result.highlightedByPath[key] ?? ''
      expect(container.querySelector('code')?.textContent).toBe(
        row.source.trimEnd(),
      )
    }
    expect(result.snippets[rows.length]).toMatchObject({
      _tag: 'Some',
      value: { language: 'vibe' },
    })
    expect(result.snippets[rows.length + 1]).toMatchObject({
      _tag: 'Some',
      value: { language: 'tsx' },
    })
    fc.assert(
      fc.property(fc.integer({ min: 0, max: rows.length - 1 }), index => {
        const row = rows[index]
        expect(row).toBeDefined()
        if (row === undefined) throw new Error('Generated row is missing')
        expect(result.rawByPath['../snippet/' + row.name + '.vibex']).toBe(
          row.source,
        )
        expect(result.snippets[index]).toMatchObject({
          _tag: 'Some',
          value: { raw: row.source, language: 'vibe' },
        })
      }),
      { seed: 5311421, numRuns: 400 },
    )
  } finally {
    await browser.happyDOM.abort()
    rmSync(directory, { recursive: true, force: true })
  }
}, 120_000)
