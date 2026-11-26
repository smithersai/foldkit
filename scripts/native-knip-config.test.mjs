import fc from 'fast-check'
import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import {
  mkdtempSync,
  readFileSync,
  rmSync,
  symlinkSync,
  writeFileSync,
} from 'node:fs'
import { tmpdir } from 'node:os'
import { delimiter, join, resolve } from 'node:path'
import { test } from 'node:test'

const ROOT = resolve(import.meta.dirname, '..')
const script = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8'))
  .scripts['check:dead-code']
const nativePaths = fc.uniqueArray(
  fc
    .array(fc.constantFrom('a', 'Z', '0', '-', '_', 'é', '界', ' ', '.'), {
      minLength: 1,
      maxLength: 12,
    })
    .map(parts => parts.join('')),
  { minLength: 1, maxLength: 10 },
)

const checkNativeConfig = paths => {
  const directory = mkdtempSync(join(tmpdir(), 'foldkit-native-knip-'))
  try {
    writeFileSync(
      join(directory, 'package.json'),
      JSON.stringify({
        name: 'foldkit-native-knip-fixture',
        private: true,
        type: 'module',
        // The compiled .vibe configs import the runtime and the config loads
        // vibelang/knip, as the root manifest declares them.
        devDependencies: { vibelang: '*', 'vibelang-runtime': '*' },
      }),
    )
    symlinkSync(
      join(ROOT, 'node_modules'),
      join(directory, 'node_modules'),
      'dir',
    )
    const files = paths.map(
      (path, index) => 'config-' + index + '-' + path + '.vibe',
    )
    for (const file of files)
      writeFileSync(
        join(directory, file),
        "export const entry: ReadonlyArray<string> = ['entry.ts']\n",
      )
    writeFileSync(
      join(directory, 'entry.ts'),
      "console.log('native config entry')\n",
    )
    writeFileSync(
      join(directory, 'tsconfig.json'),
      JSON.stringify({
        compilerOptions: {
          target: 'ES2022',
          module: 'ESNext',
          moduleResolution: 'Bundler',
          strict: true,
          noEmit: true,
          skipLibCheck: true,
          types: [],
        },
        files: [...files, 'entry.ts'],
      }),
    )
    const imports = files
      .map(
        (file, index) =>
          'import { entry as entry' +
          index +
          ' } from ' +
          JSON.stringify('./' + file),
      )
      .join('\n')
    writeFileSync(
      join(directory, 'knip.config.ts'),
      "import vibelang from 'vibelang/knip'\n" +
        imports +
        '\nif (Reflect.get(globalThis, "__foldkitKnipInherited") !== "kept") throw new Error("inherited NODE_OPTIONS was lost")\n' +
        // The fixture mirrors the generated root config: vibelang compiles the
        // .vibe configs and their declaration sidecars are its output, not files.
        "export default { compilers: { vibe: vibelang }, ignore: ['**/*.d.vibe.ts'], entry: [" +
        files.map((_, index) => '...entry' + index).join(',') +
        '] }\n',
    )
    const marker =
      'data:text/javascript;base64,' +
      Buffer.from('globalThis.__foldkitKnipInherited = "kept"').toString(
        'base64',
      )
    const result = spawnSync(
      '/bin/sh',
      ['-c', script + ' --directory "$1"', 'native-knip-config', directory],
      {
        cwd: ROOT,
        encoding: 'utf8',
        env: {
          ...process.env,
          NODE_OPTIONS: '--no-experimental-webstorage --import=' + marker,
          PATH: join(ROOT, 'node_modules/.bin') + delimiter + process.env.PATH,
        },
      },
    )
    assert.equal(result.status, 0, result.stdout + result.stderr)
  } finally {
    rmSync(directory, { recursive: true, force: true })
  }
}

// Native config dependencies use the same source-named loader as application imports.
test('Knip loads native config dependencies and retains inherited Node options', () => {
  fc.assert(fc.property(nativePaths, checkNativeConfig), {
    numRuns: 30,
    seed: 33178,
  })
})
