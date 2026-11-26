import { ConfigProvider, Effect, Option, Schema } from 'effect'
import fc from 'fast-check'
import { readFileSync } from 'node:fs'
import { isIPv6 } from 'node:net'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'

import {
  configuredRelayUrl,
  loadSettings,
  resolveRelayTargets,
} from '../src/relayLocation.vibe'
import {
  makeUncheckedRegistryReader,
  runWithNode,
} from './relayRegistryFixtures.ts'

const corpus = Schema.decodeUnknownSync(
  Schema.Struct({ hosts: Schema.Array(Schema.String), seed: Schema.Number }),
)(
  JSON.parse(
    readFileSync(
      join(
        dirname(fileURLToPath(import.meta.url)),
        'corpus/foldkit-mcp-relay-location.json',
      ),
      'utf8',
    ),
  ),
)

const fullAddress = fc
  .array(fc.integer({ min: 0, max: 65535 }), { minLength: 8, maxLength: 8 })
  .map(parts => parts.map(part => part.toString(16)).join(':'))
const host = fc.oneof(
  fc.constantFrom(...corpus.hosts),
  fullAddress,
  fc.string({ maxLength: 80 }),
  fc
    .tuple(
      fc.oneof(
        fullAddress,
        fc.constantFrom('fe80::1', '::1', '::ffff:192.0.2.1'),
      ),
      fc.string({ minLength: 1, maxLength: 12 }),
    )
    .map(([address, zone]) => address + '%' + zone),
)

describe('native relay-location preservation', () => {
  it('keeps Node IPv6 and scoped-host URL spelling for generated hosts', () => {
    fc.assert(
      fc.property(host, fc.integer({ min: 1, max: 65535 }), (value, port) => {
        const result = configuredRelayUrl({
          maybeConfiguredHost: Option.some(value),
          maybeConfiguredPort: Option.some(String(port)),
          projectRoot: '/fixture/project',
        })
        const rendered = isIPv6(value) ? '[' + value + ']' : value
        expect(result).toEqual(Option.some('ws://' + rendered + ':' + port))
      }),
      { seed: corpus.seed, numRuns: 5000 },
    )
  })

  it('keeps the configured target array eager and shared across runs', async () => {
    const reader = await runWithNode(makeUncheckedRegistryReader)
    await fc.assert(
      fc.asyncProperty(host, async initialHost => {
        let currentHost = initialHost
        let reads = 0
        const settings = {
          get maybeConfiguredHost() {
            reads++
            return Option.some(currentHost)
          },
          maybeConfiguredPort: Option.some('4600'),
          projectRoot: '/fixture/project',
        }
        const program = resolveRelayTargets(settings, reader)
        expect(reads).toBeGreaterThan(0)
        const capturedReads = reads
        currentHost = 'changed-after-construction.invalid'
        const first = await runWithNode(program)
        const second = await runWithNode(program)
        const rendered = isIPv6(initialHost)
          ? '[' + initialHost + ']'
          : initialHost
        expect(first[0]?.url).toBe('ws://' + rendered + ':4600')
        expect(second).toBe(first)
        expect(reads).toBe(capturedReads)
      }),
      { seed: 413956, numRuns: 40 },
    )
  })

  it('reads configuration afresh for every run and keeps the cwd fallback', () => {
    const names = [
      'FOLDKIT_DEVTOOLS_MCP_PORT',
      'FOLDKIT_DEVTOOLS_MCP_HOST',
      'FOLDKIT_PROJECT_ROOT',
    ] as const
    const previous = names.map(name => [name, process.env[name]] as const)
    try {
      for (const name of names) delete process.env[name]
      const run = () =>
        Effect.runSync(
          Effect.provideService(
            loadSettings,
            ConfigProvider.ConfigProvider,
            ConfigProvider.fromEnv(),
          ),
        )
      fc.assert(
        fc.property(fc.integer({ min: 1, max: 65535 }), index => {
          const firstRoot = '/fixture/root-' + index
          process.env['FOLDKIT_PROJECT_ROOT'] = firstRoot
          expect(run().projectRoot).toBe(firstRoot)
          const secondRoot = firstRoot + '-next'
          process.env['FOLDKIT_PROJECT_ROOT'] = secondRoot
          expect(run().projectRoot).toBe(secondRoot)
          delete process.env['FOLDKIT_PROJECT_ROOT']
          expect(run().projectRoot).toBe(process.cwd())
        }),
        { seed: 413957, numRuns: 60 },
      )
    } finally {
      for (const [name, value] of previous) {
        if (value === undefined) delete process.env[name]
        else process.env[name] = value
      }
    }
  })
})
