import fc from 'fast-check'
import {
  existsSync,
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
// @vitest-environment node
import vibelang from 'vibelang-vite'
import { build, type Plugin } from 'vite'
import { expect, test } from 'vitest'

import corpus from './fixtures/foldkit-vite-metadata.json'

type SnippetMaps = Readonly<{
  rawByPath: Record<string, string>
  highlightedByPath: Record<string, string>
}>
type PostMaps = Readonly<{
  documentByPath: Record<string, unknown>
  frontmatterByPath: Record<string, unknown>
}>
type Probe = Readonly<{
  beforeSnippets: SnippetMaps
  afterSnippets: SnippetMaps
  beforePosts: PostMaps
  afterPosts: PostMaps
  beforeServer: Readonly<{ readServerUrl: () => string | undefined }>
  afterServer: Readonly<{ readServerUrl: () => string | undefined }>
  beforeEnv: Readonly<{ canaryCommit: string | undefined }>
  afterEnv: Readonly<{ canaryCommit: string | undefined }>
}>

test('sibling TypeScript boundaries preserve Vite selection, queries, value identity and injected config', async () => {
  const website = fileURLToPath(new URL('../', import.meta.url))
  const dir = mkdtempSync(join(tmpdir(), 'foldkit-vite-metadata-'))
  const write = (relative: string, contents: string) => {
    const file = join(dir, relative)
    mkdirSync(dirname(file), { recursive: true })
    writeFileSync(file, contents)
  }
  try {
    symlinkSync(join(website, 'node_modules'), join(dir, 'node_modules'), 'dir')
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
        include: ['entry.ts', 'src/**/*.vibe', 'src/**/*.ts'],
        exclude: ['src/snippet/**/*', 'src/page/blog/post/**/*'],
      }),
    )
    const exportCalls = (source: string): string =>
      source.replace(/^const /gm, 'export const ')
    write('src/markdown/before.ts', exportCalls(corpus.snippetBlock))
    write('src/page/blog/before.ts', exportCalls(corpus.postBlock))
    write(
      'src/env.before.ts',
      'export const canaryCommit = ' + corpus.envExpression,
    )
    write(
      'src/server.before.ts',
      'export const readServerUrl = (): string | undefined => import.meta.env.VITE_SERVER_URL',
    )
    write(
      'src/config.env.ts',
      readFileSync(
        join(website, '../typing-game/client/src/config.env.ts'),
        'utf8',
      ),
    )
    write(
      'src/server.after.vibe',
      "export { readServerUrl } from './config.env.ts'",
    )
    write(
      'src/markdown/snippets.globs.ts',
      readFileSync(join(website, 'src/markdown/snippets.globs.ts'), 'utf8'),
    )
    write(
      'src/page/blog/posts.globs.ts',
      readFileSync(join(website, 'src/page/blog/posts.globs.ts'), 'utf8'),
    )
    write(
      'src/deployment.env.ts',
      readFileSync(join(website, 'src/deployment.env.ts'), 'utf8'),
    )
    write(
      'src/markdown/after.vibe',
      "export { rawByPath, highlightedByPath } from './snippets.globs.ts'",
    )
    write(
      'src/page/blog/after.vibe',
      "export { documentByPath, frontmatterByPath } from './posts.globs.ts'",
    )
    write(
      'src/env.after.vibe',
      "export { canaryCommit } from './deployment.env.ts'",
    )
    write(
      'entry.ts',
      [
        "export * as beforeSnippets from './src/markdown/before.ts'",
        "export * as afterSnippets from './src/markdown/after.vibe'",
        "export * as beforePosts from './src/page/blog/before.ts'",
        "export * as afterPosts from './src/page/blog/after.vibe'",
        "export * as beforeServer from './src/server.before.ts'",
        "export * as afterServer from './src/server.after.vibe'",
        "export * as beforeEnv from './src/env.before.ts'",
        "export * as afterEnv from './src/env.after.vibe'",
      ].join('\n'),
    )

    const generated = fc.sample(
      fc.record({
        stem: fc
          .array(fc.constantFrom('a', 'Z', '_', '-', '汉', '字', ' '), {
            minLength: 1,
            maxLength: 10,
          })
          .map(parts => parts.join('')),
        extension: fc.constantFrom(
          'vibe',
          'ts',
          'tsx',
          'elm',
          'json',
          'html',
          'sh',
          'txt',
        ),
        payload: fc.string(),
        hasFrontmatter: fc.boolean(),
      }),
      { seed: 531124, numRuns: 400 },
    )
    const expected = generated.map((row, index) => {
      const name = String(index).padStart(4, '0') + '-' + row.stem
      const snippet = name + '.' + row.extension
      const raw = 'export const value = ' + JSON.stringify(row.payload) + '\n'
      const frontmatter = row.hasFrontmatter
        ? { title: name, value: row.payload }
        : undefined
      write('src/snippet/' + snippet, raw)
      write('src/snippet/' + name + '.d.vibe.ts', 'export {}\n')
      write(
        'src/page/blog/post/' + name + '.md',
        JSON.stringify({ document: row.payload, frontmatter }),
      )
      return {
        snippetKey: '../snippet/' + snippet,
        postKey: './post/' + name + '.md',
        raw,
        frontmatter,
        document: row.payload,
      }
    })

    const highlightPrefix = '\0foldkit-vite-boundary-highlight:'
    const highlightSuffix = '.boundary.js'
    const controlledResources: Plugin = {
      name: 'foldkit-vite-boundary-query-oracle',
      enforce: 'pre',
      async resolveId(source, importer) {
        if (!source.includes('?highlighted')) return undefined
        const resolved = await this.resolve(source, importer, {
          skipSelf: true,
        })
        if (resolved === null || resolved.external) return undefined
        return highlightPrefix + resolved.id + highlightSuffix
      },
      load(id: string): string | undefined {
        const resourceId = id.startsWith(highlightPrefix)
          ? id.slice(highlightPrefix.length, -highlightSuffix.length)
          : id
        const path = resourceId.split('?')[0]
        if (path === undefined || !existsSync(path)) return undefined
        if (id.startsWith(highlightPrefix)) {
          return (
            'export default ' +
            JSON.stringify('highlight:' + readFileSync(path, 'utf8'))
          )
        }
        if (path.endsWith('.md')) {
          const value: Readonly<{ document: string; frontmatter?: unknown }> =
            JSON.parse(readFileSync(path, 'utf8'))
          return (
            'export default ' +
            JSON.stringify(value.document) +
            '; export const frontmatter = ' +
            (value.frontmatter === undefined
              ? 'undefined'
              : JSON.stringify(value.frontmatter))
          )
        }
        return undefined
      },
    }
    const injected = [
      undefined,
      '',
      'canary-汉字',
      'quote"slash\\',
      'line\nbreak',
    ]
    for (const [index, value] of injected.entries()) {
      const outDir = join(dir, 'out-' + index)
      await build({
        configFile: false,
        root: dir,
        envDir: false,
        envPrefix: 'FOLDKIT_TEST_NO_EXTERNAL_ENV_',
        logLevel: 'silent',
        define: {
          'import.meta.env.VITE_SERVER_URL':
            value === undefined ? 'undefined' : JSON.stringify(value),
          'import.meta.env.VITE_FOLDKIT_CANARY_COMMIT':
            value === undefined ? 'undefined' : JSON.stringify(value),
        },
        plugins: [vibelang(), controlledResources],
        build: {
          ssr: join(dir, 'entry.ts'),
          target: 'node26',
          outDir,
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
      const result: Probe = await import(
        pathToFileURL(join(outDir, 'entry.mjs')).href
      )
      for (const _ of [0, 1, 2]) {
        expect(result.beforeServer.readServerUrl()).toBe(value)
        expect(result.afterServer.readServerUrl()).toBe(value)
      }
      expect(Object.keys(result.beforeSnippets.rawByPath)).toEqual(
        Object.keys(result.afterSnippets.rawByPath),
      )
      expect(Object.keys(result.beforeSnippets.rawByPath).sort()).toEqual(
        expected.map(row => row.snippetKey).sort(),
      )
      expect(
        Object.keys(result.afterSnippets.highlightedByPath).sort(),
      ).toEqual(expected.map(row => row.snippetKey).sort())
      expect(Object.keys(result.beforePosts.documentByPath)).toEqual(
        Object.keys(result.afterPosts.documentByPath),
      )
      expect(Object.keys(result.afterPosts.frontmatterByPath).sort()).toEqual(
        expected.map(row => row.postKey).sort(),
      )
      for (const row of expected) {
        expect(result.beforeSnippets.rawByPath[row.snippetKey]).toBe(row.raw)
        expect(result.afterSnippets.rawByPath[row.snippetKey]).toBe(row.raw)
        expect(result.beforeSnippets.highlightedByPath[row.snippetKey]).toBe(
          'highlight:' + row.raw,
        )
        expect(result.afterSnippets.highlightedByPath[row.snippetKey]).toBe(
          'highlight:' + row.raw,
        )
        expect(result.beforePosts.documentByPath[row.postKey]).toBe(
          row.document,
        )
        expect(result.afterPosts.documentByPath[row.postKey]).toBe(
          result.beforePosts.documentByPath[row.postKey],
        )
        expect(
          Object.hasOwn(result.afterPosts.frontmatterByPath, row.postKey),
        ).toBe(true)
        expect(result.afterPosts.frontmatterByPath[row.postKey]).toBe(
          result.beforePosts.frontmatterByPath[row.postKey],
        )
        expect(result.afterPosts.frontmatterByPath[row.postKey]).toEqual(
          row.frontmatter,
        )
      }
      fc.assert(
        fc.property(fc.constantFrom(...expected), row => {
          expect(result.afterSnippets.rawByPath[row.snippetKey]).toBe(row.raw)
          expect(result.afterSnippets.highlightedByPath[row.snippetKey]).toBe(
            'highlight:' + row.raw,
          )
          expect(result.afterPosts.documentByPath[row.postKey]).toBe(
            result.beforePosts.documentByPath[row.postKey],
          )
          expect(
            Object.hasOwn(result.afterPosts.frontmatterByPath, row.postKey),
          ).toBe(true)
          expect(result.afterPosts.frontmatterByPath[row.postKey]).toBe(
            result.beforePosts.frontmatterByPath[row.postKey],
          )
        }),
        { seed: 531125, numRuns: 400 },
      )
      expect(result.beforeEnv.canaryCommit).toBe(value)
      expect(result.afterEnv.canaryCommit).toBe(value)
    }
  } finally {
    rmSync(dir, { recursive: true, force: true })
  }
}, 120_000)
