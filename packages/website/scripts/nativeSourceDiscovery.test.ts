import fc from 'fast-check'
import { mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { describe, expect, it } from 'vitest'

import { EXAMPLE_FILE_EXTENSIONS } from '../vite.config.vibe'
import corpus from './fixtures/foldkit-native-source-discovery.json'
import {
  INCLUDED_EXTENSIONS,
  buildExampleFileMap,
} from './playgroundFilesPlugin.vibe'

const compilerReference = '0.0.13'
const viteReference = '0.0.13'
const baseOptions = { strict: true }
const nativeSource = 'export const sample = effect { return 1 }\n'
const segment = fc
  .array(
    fc.constantFrom(
      ...'abcdefghijklmnopqrstuvwxyz0123456789_-',
      'é',
      'β',
      '🙂',
    ),
    {
      minLength: 1,
      maxLength: 8,
    },
  )
  .map(letters => letters.join(''))
const modulePath = fc
  .array(segment, { minLength: 1, maxLength: 3 })
  .map(parts => parts.join('/'))
const paths = fc.uniqueArray(modulePath, { minLength: 1, maxLength: 8 })
const examples: [string[]][] = corpus.cases.map(paths => [paths])

const withExample = async <A>(
  run: (directory: string) => Promise<A>,
): Promise<A> => {
  const directory = await mkdtemp(join(tmpdir(), 'foldkit-native-source-'))
  try {
    await writeFile(
      join(directory, 'package.json'),
      JSON.stringify({
        name: 'native-discovery-fixture',
        scripts: { dev: 'vite' },
        dependencies: { foldkit: 'workspace:*' },
        devDependencies: {
          vite: 'fixture',
          vibelang: compilerReference,
          'vibelang-vite': viteReference,
        },
      }),
    )
    await writeFile(
      join(directory, 'tsconfig.json'),
      JSON.stringify({
        include: ['src'],
        vibelang: { trustedPackages: ['foldkit'] },
      }),
    )
    await writeFile(
      join(directory, 'vite.config.ts'),
      'export default { plugins: [] }\n',
    )
    await writeFile(
      join(directory, 'index.html'),
      '<html><body><div id="root"></div></body></html>',
    )
    await mkdir(join(directory, 'src'))
    await writeFile(join(directory, 'src/main.vibe'), nativeSource)
    return await run(directory)
  } finally {
    await rm(directory, { recursive: true, force: true })
  }
}

const build = (directory: string) =>
  buildExampleFileMap(
    'native-discovery-fixture',
    { foldkit: 'fixture' },
    baseOptions,
    [],
    directory,
  )

describe('native source discovery', () => {
  it('retains native sources, the toolchain references, and the config loader', async () => {
    await withExample(async directory => {
      const files = await build(directory)
      const manifest = JSON.parse(files['package.json'] ?? '{}')
      expect(EXAMPLE_FILE_EXTENSIONS.has('.vibe')).toBe(true)
      expect(INCLUDED_EXTENSIONS.has('.vibe')).toBe(true)
      expect(files['src/main.vibe']).toBe(nativeSource)
      expect(manifest.devDependencies.vibelang).toBe(compilerReference)
      expect(manifest.devDependencies['vibelang-vite']).toBe(viteReference)
      expect(manifest.scripts.dev).toContain('--import vibelang/register')
      expect(manifest.scripts.dev).toContain('--configLoader native')
      expect(files['vite.config.ts']).toContain("from 'vibelang-vite'")
      expect(files['vite.config.ts']).toContain('vibelang()')
      expect(JSON.parse(files['tsconfig.json'] ?? '{}').vibelang).toEqual({
        trustedPackages: ['foldkit'],
      })
    })
  })

  it('preserves custom Markdown and SSR plugins and their order', async () => {
    await withExample(async directory => {
      const config =
        "import { defineConfig } from 'vite'\nexport default defineConfig({ plugins: [markdown({ islands }), foldkit({ ssr: { serverEntry: '/src/entry.server.vibe' } })] })\n"
      await writeFile(join(directory, 'vite.config.playground.ts'), config)
      await writeFile(join(directory, 'src/entry.server.vibe'), nativeSource)
      const files = await build(directory)
      const actual = files['vite.config.ts'] ?? ''
      expect(actual).toContain(
        'plugins: [vibelang(), markdown({ islands }), foldkit(',
      )
      expect(actual).toContain("serverEntry: '/src/entry.server.vibe'")
      expect(files['index.html']).toBe(
        '<html><body><div id="root"></div></body></html>',
      )
      expect(files['vite.config.playground.ts']).toBeUndefined()
    })
  })

  it('includes nested native modules while excluding declaration sidecars', async () => {
    await fc.assert(
      fc.asyncProperty(paths, suffixes =>
        withExample(async directory => {
          for (const suffix of suffixes) {
            const module = join(directory, 'src', suffix + '.vibe')
            await mkdir(dirname(module), { recursive: true })
            await writeFile(module, nativeSource)
            await writeFile(
              join(directory, 'src', suffix + '.d.vibe.ts'),
              'export declare const sample: number\n',
            )
          }
          const files = await build(directory)
          for (const suffix of suffixes) {
            expect(files['src/' + suffix + '.vibe']).toBe(nativeSource)
            expect(Object.hasOwn(files, 'src/' + suffix + '.d.vibe.ts')).toBe(
              false,
            )
          }
        }),
      ),
      { seed: 33152, numRuns: 100, examples },
    )
  }, 60_000)
})
