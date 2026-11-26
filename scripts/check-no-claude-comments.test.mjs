import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import {
  chmodSync,
  mkdirSync,
  mkdtempSync,
  rmSync,
  writeFileSync,
} from 'node:fs'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'
import { test } from 'node:test'

const scriptPath = resolve('scripts/check-no-claude-comments.sh')

const runScript = (cwd, env = process.env) =>
  spawnSync('bash', [scriptPath], { cwd, env, encoding: 'utf8' })

const makeTempGitRepo = () => {
  const dir = mkdtempSync(join(tmpdir(), 'foldkit-claude-comment-check-'))
  const init = spawnSync('git', ['init', '-q'], {
    cwd: dir,
    encoding: 'utf8',
  })
  assert.equal(init.status, 0, init.stderr)
  return dir
}

test('passes when tracked files contain no CLAUDE: comments', () => {
  const dir = makeTempGitRepo()
  try {
    writeFileSync(join(dir, 'ok.ts'), 'export const value = 1\n')
    spawnSync('git', ['add', 'ok.ts'], { cwd: dir })
    const res = runScript(dir)
    assert.equal(res.status, 0, res.stderr)
    assert.match(res.stdout, /No CLAUDE: comments found\./)
  } finally {
    rmSync(dir, { recursive: true, force: true })
  }
})

test('fails with exit 1 when tracked files contain a CLAUDE: comment', () => {
  const dir = makeTempGitRepo()
  try {
    writeFileSync(
      join(dir, 'bad.ts'),
      '// CLAUDE: fix before merge\nexport const x = 1\n',
    )
    spawnSync('git', ['add', 'bad.ts'], { cwd: dir })
    const res = runScript(dir)
    assert.equal(res.status, 1, res.stdout + res.stderr)
    assert.match(res.stdout, /bad\.ts:1:.*CLAUDE:/)
  } finally {
    rmSync(dir, { recursive: true, force: true })
  }
})

test('propagates repository scan failure (git grep exit 125) instead of reporting success', () => {
  const dir = mkdtempSync(join(tmpdir(), 'foldkit-claude-comment-fail-'))
  const fakeBin = join(dir, 'bin')
  try {
    mkdirSync(fakeBin, { recursive: true })
    const fakeGit = join(fakeBin, 'git')
    writeFileSync(fakeGit, '#!/usr/bin/env bash\nexit 125\n')
    chmodSync(fakeGit, 0o755)
    const res = runScript(dir, {
      ...process.env,
      PATH: `${fakeBin}:${process.env.PATH ?? ''}`,
    })
    assert.equal(
      res.status,
      125,
      `expected 125, got ${res.status}: ${res.stdout}\n${res.stderr}`,
    )
    assert.doesNotMatch(res.stdout, /No CLAUDE: comments found\./)
  } finally {
    rmSync(dir, { recursive: true, force: true })
  }
})
