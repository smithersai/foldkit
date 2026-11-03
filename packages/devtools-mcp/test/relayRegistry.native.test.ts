import { ConfigProvider, Effect, FileSystem, Schema } from 'effect'
import fc from 'fast-check'
import {
  RELAY_RECORD_VERSION,
  RELAY_REGISTRY_DIRECTORY_NAME,
  type RelayRecord,
} from 'foldkit/devtools-protocol'
import { readFileSync } from 'node:fs'
import { homedir, tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'

import { discoverRelays } from '../src/relayRegistry.ts'
import {
  makeUncheckedRegistryReader,
  runWithNode,
} from './relayRegistryFixtures.ts'

const corpus = Schema.decodeUnknownSync(
  Schema.Struct({
    pids: Schema.Array(Schema.Number),
    seed: Schema.Number,
  }),
)(
  JSON.parse(
    readFileSync(
      join(
        dirname(fileURLToPath(import.meta.url)),
        'corpus/foldkit-mcp-registry-host-boundaries.json',
      ),
      'utf8',
    ),
  ),
)

const nativeAlive = (pid: number): boolean => {
  try {
    process.kill(pid, 0)
    return true
  } catch (error) {
    return error instanceof Error && 'code' in error && error.code === 'EPERM'
  }
}

describe('native registry host boundaries', () => {
  it('retains zero/group queries and invalid-pid refusal when discovering generated records', async () => {
    const reader = await runWithNode(makeUncheckedRegistryReader)
    const pid = fc.oneof(
      fc.constantFrom(process.pid, process.ppid, ...corpus.pids),
      fc.integer({ min: 2147483648, max: 4294967295 }),
      fc.integer({ min: -4294967295, max: -2147483649 }),
    )
    await fc.assert(
      fc.asyncProperty(pid, async value => {
        const record: RelayRecord = {
          version: RELAY_RECORD_VERSION,
          id: 'property-record',
          root: '/fixture/project',
          url: 'ws://127.0.0.1:9988',
          pid: value,
          startedAt: 1,
        }
        let retired = 0
        const fs = FileSystem.makeNoop({
          exists: () => Effect.succeed(true),
          readDirectory: () => Effect.succeed(['record.json']),
          readFileString: () => Effect.succeed(JSON.stringify(record)),
          realPath: value => Effect.succeed(value),
          rename: () =>
            Effect.sync(() => {
              retired++
            }),
          remove: () => Effect.void,
          link: () => Effect.void,
        })
        const expected = nativeAlive(value)
        const result = await runWithNode(
          discoverRelays('/fixture/project', reader).pipe(
            Effect.provideService(FileSystem.FileSystem, fs),
            Effect.provideService(
              ConfigProvider.ConfigProvider,
              ConfigProvider.fromEnv({
                env: { FOLDKIT_DEVTOOLS_RELAY_DIRECTORY: '/fixture/registry' },
              }),
            ),
          ),
        )
        expect(result).toEqual(expected ? [record] : [])
        expect(retired).toBe(expected ? 0 : 1)
      }),
      { seed: corpus.seed, numRuns: 600 },
    )
  })

  it('resolves the native host home rather than a different ConfigProvider home', async () => {
    const reader = await runWithNode(makeUncheckedRegistryReader)
    await fc.assert(
      fc.asyncProperty(fc.integer({ min: 0, max: 100000 }), async value => {
        const inspected: Array<string> = []
        const fs = FileSystem.makeNoop({
          exists: directory =>
            Effect.sync(() => {
              inspected.push(directory)
              return false
            }),
        })
        const result = await runWithNode(
          discoverRelays('/fixture/project', reader).pipe(
            Effect.provideService(FileSystem.FileSystem, fs),
            Effect.provideService(
              ConfigProvider.ConfigProvider,
              ConfigProvider.fromEnv({
                env: { HOME: '/fixture/provider-home-' + value },
              }),
            ),
          ),
        )
        const parent =
          process.platform === 'win32' ? tmpdir() : join(homedir(), '.cache')
        expect(inspected).toEqual([join(parent, RELAY_REGISTRY_DIRECTORY_NAME)])
        expect(result).toEqual([])
      }),
      { seed: 413959, numRuns: 64 },
    )
  })
})
