import fc from 'fast-check'
import { spawnSync } from 'node:child_process'
import {
  copyFileSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  symlinkSync,
  writeFileSync,
} from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { type InlineConfig, resolveConfig } from 'vite'
import { expect, it } from 'vitest'

import { foldkit } from '../src/index.vibe'

const directory = dirname(fileURLToPath(import.meta.url))
const workspace = resolve(directory, '../../..')
const corpus: {
  source: string
  seed: number
  numRuns: number
  environments: ReadonlyArray<string>
} = JSON.parse(
  readFileSync(
    join(directory, 'fixtures/foldkit-console-prebundle.json'),
    'utf8',
  ),
)
const fixture = () => {
  const root = mkdtempSync(join(tmpdir(), 'foldkit-console-prebundle-'))
  writeFileSync(
    join(root, 'package.json'),
    JSON.stringify({
      name: 'foldkit-console-fixture',
      private: true,
      type: 'module',
      dependencies: { foldkit: '*' },
    }),
  )
  symlinkSync(
    join(workspace, 'node_modules'),
    join(root, 'node_modules'),
    'dir',
  )
  return root
}

it('prebundles Console imports emitted by the native compiler', () => {
  const root = fixture()
  try {
    mkdirSync(join(root, 'src'))
    writeFileSync(join(root, 'src/foldkit-console.vibe'), corpus.source)
    writeFileSync(
      join(root, 'tsconfig.json'),
      JSON.stringify({
        compilerOptions: {
          target: 'ESNext',
          module: 'NodeNext',
          moduleResolution: 'NodeNext',
          strict: true,
          skipLibCheck: true,
          rootDir: './src',
          outDir: './out',
          types: [],
        },
        files: ['./src/foldkit-console.vibe'],
      }),
    )
    const compile = spawnSync(
      process.execPath,
      [
        join(workspace, 'node_modules/vibelang/bin/vibelang'),
        '--singleThreaded',
        '-p',
        join(root, 'tsconfig.json'),
      ],
      { cwd: root, encoding: 'utf8' },
    )
    expect(compile.status, compile.stdout + compile.stderr).toBe(0)
    mkdirSync(join(root, 'packages/foldkit/dist'), { recursive: true })
    copyFileSync(
      join(root, 'out/foldkit-console.js'),
      join(root, 'packages/foldkit/dist/foldkit-console.js'),
    )
    const check = spawnSync(
      process.execPath,
      [join(workspace, 'scripts/check-effect-prebundle.ts')],
      { cwd: root, encoding: 'utf8' },
    )
    expect(check.status, check.stdout + check.stderr).toBe(0)
  } finally {
    rmSync(root, { recursive: true, force: true })
  }
}, 30000)

it('covers Console in enabled optimizer environments and preserves disabled servers', async () => {
  const root = fixture()
  try {
    await fc.assert(
      fc.asyncProperty(
        fc.constantFrom(...corpus.environments),
        fc.constantFrom<'client' | 'server'>('client', 'server'),
        fc.boolean(),
        fc.boolean(),
        async (name, consumer, discover, explicit) => {
          const options: InlineConfig = {
            root,
            configFile: false,
            logLevel: 'silent',
            plugins: foldkit({ devToolsMcpPort: false }),
            environments: {
              [name]: {
                consumer,
                optimizeDeps: {
                  noDiscovery: !discover,
                  include: explicit ? ['effect/Schema'] : [],
                },
              },
            },
          }
          const config = await resolveConfig(options, 'serve')
          const includes = config.environments[name]?.optimizeDeps.include ?? []
          if (consumer === 'client' || discover || explicit) {
            expect(includes).toContain('effect/Console')
          } else {
            expect(includes).not.toContain('effect/Console')
          }
        },
      ),
      { seed: corpus.seed, numRuns: corpus.numRuns },
    )
  } finally {
    rmSync(root, { recursive: true, force: true })
  }
}, 30000)
