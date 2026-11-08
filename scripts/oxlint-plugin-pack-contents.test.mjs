import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import {
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { test } from 'node:test'

// The @foldkit/oxlint-plugin build compiles its rules into dist/native so
// rolldown can bundle them into dist/index.js. That directory is a build
// intermediate: the published tarball must ship the bundle and the presets,
// never the intermediates beside them.

const packageJsonPath = new URL(
  '../packages/oxlint-plugin-foldkit/package.json',
  import.meta.url,
)

const withDirectory = operation => {
  const root = mkdtempSync(join(tmpdir(), 'foldkit-oxlint-plugin-pack-'))
  try {
    return operation(root)
  } finally {
    rmSync(root, { recursive: true, force: true })
  }
}

const put = (path, content = 'export {}\n') => {
  mkdirSync(dirname(path), { recursive: true })
  writeFileSync(path, content)
}

const packedPaths = root => {
  const result = spawnSync('npm', ['pack', '--dry-run', '--json'], {
    cwd: root,
    encoding: 'utf8',
  })
  assert.equal(result.status, 0, result.stderr)
  const [entry] = JSON.parse(result.stdout)
  return entry.files.map(file => file.path).sort()
}

test('the oxlint plugin tarball ships the bundle and presets without dist/native', () => {
  withDirectory(root => {
    writeFileSync(join(root, 'package.json'), readFileSync(packageJsonPath))
    put(join(root, 'dist/index.js'))
    put(join(root, 'dist/index.d.ts'))
    put(join(root, 'dist/native/src/index.js'))
    put(join(root, 'dist/native/src/rules/no-empty-children-array.js'))
    put(join(root, 'recommended.json'), '{}\n')
    put(join(root, 'all.json'), '{}\n')

    const paths = packedPaths(root)

    assert.deepEqual(
      paths.filter(path => !path.startsWith('dist/native/')),
      [
        'all.json',
        'dist/index.d.ts',
        'dist/index.js',
        'package.json',
        'recommended.json',
      ],
    )
    assert.deepEqual(
      paths.filter(path => path.startsWith('dist/native/')),
      [],
      'dist/native is a build intermediate and must not be published',
    )
  })
})
