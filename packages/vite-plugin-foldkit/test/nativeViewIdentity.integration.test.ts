import fc from 'fast-check'
import { type Html } from 'foldkit/html'
import {
  mkdtempSync,
  mkdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import vibelang from 'vibelang-vite'
import { createServer } from 'vite'
import { expect, it } from 'vitest'

import { TraceMap, originalPositionFor } from '@jridgewell/trace-mapping'

import { brandDistDirectory } from '../src/brandDist.ts'
import { foldkitViewIdentity } from '../src/viewIdentity.ts'

type Views = Readonly<{
  view: (flag: boolean) => NonNullable<Html>
  nested: (flag: boolean) => NonNullable<Html>
  explicit: () => NonNullable<Html>
  named: (flag: boolean) => NonNullable<Html>
}>

const packageRoot = dirname(dirname(fileURLToPath(import.meta.url)))

it('preserves source owners through real native lowering and packaged dist maps', async () => {
  const root = mkdtempSync(join(packageRoot, 'test/fixtures/native-owners-'))
  const matchBody =
    "match (flag) { when true: inertHtml.div([inertHtml.Id('a')]); default: inertHtml.div([inertHtml.Id('b')]); }"
  const conditional =
    "flag ? inertHtml.div([inertHtml.Id('a')]) : inertHtml.div([inertHtml.Id('b')])"
  const source = (body: string): string =>
    [
      "import { type Html, inertHtml } from 'foldkit/html'",
      '// UTF-16 mapping: 界 🧭',
      'export const view = (flag: boolean): Html => ' + body,
      'export const nested = (flag: boolean): Html => { const inner = (): Html => ' +
        body +
        '; return inner() }',
      'export const explicit = (): Html => (() : Html => inertHtml.div([]))()',
      'export function named(flag: boolean): Html { return ' + body + ' }',
    ].join('\n')
  writeFileSync(join(root, 'native.vibe'), source(matchBody))
  writeFileSync(join(root, 'before.ts'), source(conditional))
  writeFileSync(
    join(root, 'tsconfig.json'),
    JSON.stringify({
      compilerOptions: {
        module: 'ESNext',
        moduleResolution: 'Bundler',
        target: 'ES2022',
        strict: true,
        skipLibCheck: true,
        noEmit: true,
      },
      files: ['native.vibe', 'before.ts'],
    }),
  )
  let compiledCode = ''
  let compiledMap = ''
  const server = await createServer({
    root,
    configFile: false,
    logLevel: 'silent',
    plugins: [
      vibelang(),
      {
        name: 'capture-native-before-branding',
        transform(code, id) {
          if (id === join(root, 'native.vibe')) {
            compiledCode = code
            compiledMap = JSON.stringify(this.getCombinedSourcemap())
          }
        },
      },
      foldkitViewIdentity(),
    ],
    server: { middlewareMode: true, hmr: false },
  })
  try {
    const original = (await server.ssrLoadModule('/before.ts')) as Views
    const native = (await server.ssrLoadModule('/native.vibe')) as Views
    expect(compiledCode).toContain('$match')
    expect(compiledMap).toContain('native.vibe')
    fc.assert(
      fc.property(fc.boolean(), flag => {
        for (const name of ['view', 'nested', 'named'] as const) {
          expect(native[name](flag).identity).toBe(
            original[name](flag).identity?.replace('before.ts#', 'native.ts#'),
          )
        }
        expect(native.explicit().identity).toBe(
          original.explicit().identity?.replace('before.ts#', 'native.ts#'),
        )
      }),
      { numRuns: 100, seed: 33178 },
    )
    expect(native.view(true).identity).toBe('native.ts#view')
    expect(native.nested(false).identity).toBe('native.ts#inner')
    expect(native.explicit().identity).toBe('native.ts#anonymous')
    mkdirSync(join(root, 'dist'))
    writeFileSync(
      join(root, 'dist/native.js'),
      compiledCode + '\n//# sourceMappingURL=native.js.map\n',
    )
    writeFileSync(join(root, 'dist/native.js.map'), compiledMap)
    expect(brandDistDirectory(root, '@foldkit/test')).toEqual({
      brandedCount: 1,
      skippedCount: 0,
    })
    const packaged = (await server.ssrLoadModule('/dist/native.js')) as Views
    for (const flag of [true, false]) {
      expect(packaged.view(flag).identity).toBe('@foldkit/test/native.js#view')
      expect(packaged.nested(flag).identity).toBe(
        '@foldkit/test/native.js#inner',
      )
      expect(packaged.named(flag).identity).toBe(
        '@foldkit/test/native.js#named',
      )
    }
    expect(packaged.explicit().identity).toBe(
      '@foldkit/test/native.js#anonymous',
    )
    const branded = readFileSync(join(root, 'dist/native.js'), 'utf8')
    const map = new TraceMap(
      readFileSync(join(root, 'dist/native.js.map'), 'utf8'),
    )
    const target = branded.indexOf("inertHtml.Id('a')")
    expect(target).toBeGreaterThan(0)
    const prefix = branded.slice(0, target)
    const position = originalPositionFor(map, {
      line: prefix.split('\n').length,
      column: target - prefix.lastIndexOf('\n') - 1,
    })
    expect(position.source).toContain('native.vibe')
    expect(position.line).toBe(3)
    expect(brandDistDirectory(root, '@foldkit/test')).toEqual({
      brandedCount: 0,
      skippedCount: 1,
    })
  } finally {
    await server.close()
    rmSync(root, { recursive: true, force: true })
  }
}, 30_000)
