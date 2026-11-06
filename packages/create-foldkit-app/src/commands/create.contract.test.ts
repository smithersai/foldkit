import fc from 'fast-check'
import { execFileSync } from 'node:child_process'
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { it } from 'vitest'

const packageRoot = fileURLToPath(new URL('../../', import.meta.url))
const require = createRequire(import.meta.url)
const compilerPackage = require.resolve('vibelang/package.json')
const compilerManifest = JSON.parse(readFileSync(compilerPackage, 'utf8'))
const compiler = resolve(
  dirname(compilerPackage),
  compilerManifest.bin.vibelang,
)
const PROPERTY_RUNS = 24

it('typechecks scaffold commands for generated names and package managers', () => {
  fc.assert(
    fc.property(
      fc.array(
        fc.record({
          name: fc.string(),
          rendering: fc.constantFrom('spa', 'ssg', 'ssr'),
          packageManager: fc.constantFrom('pnpm', 'npm', 'yarn', 'bun'),
        }),
        { minLength: 1, maxLength: 8 },
      ),
      inputs => {
        const directory = mkdtempSync(join(packageRoot, '.compiler-contract-'))
        try {
          writeFileSync(
            join(directory, 'tsconfig.json'),
            JSON.stringify({
              extends: '../tsconfig.json',
              include: [],
              files: ['main.vibe'],
              compilerOptions: {
                rootDir: '..',
                composite: false,
                incremental: false,
              },
            }),
          )
          const commands = inputs.map(
            (input, index) =>
              `export const command${index} = create({
              name: Option.some(${JSON.stringify(input.name)}),
              rendering: Option.some(${JSON.stringify(input.rendering)}),
              example: Option.none(),
              packageManager: Option.some(${JSON.stringify(input.packageManager)}),
              maybeDependencyManifestsDirectory: Option.none(),
            })`,
          )
          writeFileSync(
            join(directory, 'main.vibe'),
            [
              "import { Option } from 'effect'",
              "import { create } from '../src/commands/create.vibe'",
              ...commands,
            ].join('\n'),
          )
          execFileSync(
            process.execPath,
            [
              compiler,
              '-p',
              join(directory, 'tsconfig.json'),
              '--noEmit',
              '--singleThreaded',
              '--pretty',
              'false',
            ],
            { cwd: packageRoot, encoding: 'utf8', stdio: 'pipe' },
          )
        } finally {
          rmSync(directory, { recursive: true, force: true })
        }
      },
    ),
    { numRuns: PROPERTY_RUNS, seed: 48173 },
  )
}, 60_000)
