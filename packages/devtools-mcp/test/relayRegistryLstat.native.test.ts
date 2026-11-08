// Platform access goes only through injected Effect services.
// Effect 4.1.1 File.Info: "`dev`, `ino`, `rdev`, `nlink`, and `blocks` are `bigint` values".
// The original trust probe compares exact (dev, ino) tuples before and after canonicalization.
import { Effect, Option } from 'effect'
import * as ByteSize from 'effect/ByteSize'
import type * as Fs from 'effect/FileSystem'
import fc from 'fast-check'
import { chmod, mkdtemp, realpath, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { afterAll, beforeAll, expect, it, vi } from 'vitest'

import { NodeServices } from '@effect/platform-node'

import corpus from './fixtures/foldkit-relay-lstat-bigint.json' with { type: 'json' }

type ProbePhase =
  | 'stable'
  | 'canonical'
  | 'confirmation'
  | 'canonicalDev'
  | 'confirmationDev'
  | 'missing'
  | 'missingUid'
  | 'symlink'
type ProbeState = {
  directory: string
  calls: number
  dev: bigint
  ino: bigint
  phase: ProbePhase
}
const state = vi.hoisted((): ProbeState => ({
  directory: '',
  calls: 0,
  dev: 1n,
  ino: 1n,
  phase: 'stable',
}))

vi.mock('@effect/platform-node', async importOriginal => {
  const actual = await importOriginal<typeof import('@effect/platform-node')>()
  const { Effect, FileSystem, Layer, Option } = await import('effect')
  return {
    ...actual,
    NodeFileSystem: {
      ...actual.NodeFileSystem,
      layer: Layer.sync(FileSystem.FileSystem, () =>
        FileSystem.makeNoop({
          realPath: () => Effect.succeed(state.directory),
          lstat: path =>
            Effect.sync(() => {
              const leaf = path === state.directory
              if (leaf) state.calls++
              const changed =
                leaf &&
                ((state.phase.startsWith('canonical') && state.calls >= 2) ||
                  (state.phase.startsWith('confirmation') && state.calls >= 3))
              const info: Fs.File.Info = {
                mtime: Option.none(),
                atime: Option.none(),
                birthtime: Option.none(),
                nlink: Option.none(),
                gid: Option.none(),
                rdev: Option.none(),
                size: ByteSize.zero,
                blksize: Option.none(),
                blocks: Option.none(),
                type:
                  leaf && state.phase === 'symlink'
                    ? 'SymbolicLink'
                    : 'Directory',
                dev:
                  state.dev +
                  (changed && state.phase.endsWith('Dev') ? 1n : 0n),
                ino:
                  state.phase === 'missing'
                    ? Option.none()
                    : Option.some(
                        state.ino +
                          (changed && !state.phase.endsWith('Dev') ? 1n : 0n),
                      ),
                mode: 0o700,
                uid:
                  state.phase === 'missingUid'
                    ? Option.none()
                    : Option.some(42),
              }
              return info
            }),
        }),
      ),
    },
  }
})

vi.mock('vibelang-runtime/experimental/platform-node', async importOriginal => {
  const actual =
    await importOriginal<
      typeof import('vibelang-runtime/experimental/platform-node')
    >()
  const { Process } = await import('vibelang-runtime/experimental')
  return {
    ...actual,
    ExperimentalNodeProcess: {
      ...actual.ExperimentalNodeProcess,
      layer: Process.layerTest(),
    },
  }
})
vi.mock('../src/relayRegistryTrustPlatform.ts', async importOriginal => {
  const actual =
    await importOriginal<
      typeof import('../src/relayRegistryTrustPlatform.ts')
    >()
  return { ...actual, currentUid: () => 42 }
})

import {
  probeWindowsDirectory,
  relayRegistryTrust,
} from '../src/relayRegistryTrust.vibe'

beforeAll(async () => {
  state.directory = await realpath(
    await mkdtemp(join(tmpdir(), 'foldkit-lstat-')),
  )
  await chmod(state.directory, 0o700)
})
afterAll(() => rm(state.directory, { recursive: true, force: true }))

const inspect = async (phase: typeof state.phase, ino: bigint, dev = 1n) => {
  state.calls = 0
  state.phase = phase
  state.ino = ino
  state.dev = dev
  const result = await Effect.runPromise(
    relayRegistryTrust
      .inspect(state.directory)
      .pipe(Effect.provide(NodeServices.layer)),
  )
  return result.maybeRefusal
}

it('rejects a canonical inode replacement above the safe integer range', async () => {
  expect(await inspect('canonical', BigInt(corpus.inode))).toEqual(
    Option.some('has ownership that cannot be verified'),
  )
})
it('rejects an inode replacement during confirmation', async () => {
  expect(await inspect('confirmation', 2n ** 63n)).toEqual(
    Option.some('has ownership that cannot be verified'),
  )
})
it('rejects missing inode metadata and symlinks', async () => {
  expect(await inspect('missing', 1n)).toEqual(
    Option.some('has ownership that cannot be verified'),
  )
  expect(await inspect('symlink', 1n)).toEqual(
    Option.some('is not a regular directory'),
  )
})
it('preserves exact 64-bit identity and refuses replacements across probe stages', async () => {
  await fc.assert(
    fc.asyncProperty(
      fc.constantFrom<typeof state.phase>(
        'stable',
        'canonical',
        'confirmation',
        'canonicalDev',
        'confirmationDev',
        'missing',
        'missingUid',
        'symlink',
      ),
      fc.bigInt({ min: 2n ** 53n, max: 2n ** 64n - 2n }),
      fc.bigInt({ min: 0n, max: 2n ** 64n - 1n }),
      async (phase, ino, dev) => {
        const refusal = await inspect(phase, ino, dev)
        expect(refusal).toEqual(
          phase === 'stable'
            ? Option.none()
            : Option.some(
                phase === 'symlink'
                  ? 'is not a regular directory'
                  : 'has ownership that cannot be verified',
              ),
        )
      },
    ),
    { seed: 53117073, numRuns: 200 },
  )
})

it('selects the executable when constructing the cold probe', () => {
  let reads = 0
  const selected = Option.some('/unused')
  Object.defineProperty(selected, 'value', {
    get: () => {
      reads++
      return '/unused'
    },
  })
  const program = probeWindowsDirectory(selected, '/registry')
  expect(reads).toBe(1)
  expect(Effect.isEffect(program)).toBe(true)
})
