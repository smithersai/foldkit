import fc from 'fast-check'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { test } from 'node:test'

import { requiredPeerDependencies } from './consumer-required-peers.ts'

const corpus = JSON.parse(
  readFileSync(
    new URL(
      '../fixtures/foldkit-consumer-required-peers.json',
      import.meta.url,
    ),
    'utf8',
  ),
)

test('the legacy-peer-mode fixture declares the installed platform Redis requirement', () => {
  const platform = JSON.parse(
    readFileSync(
      new URL(
        '../../node_modules/@effect/platform-node/package.json',
        import.meta.url,
      ),
      'utf8',
    ),
  )
  assert.equal(platform.version, '4.1.1')
  assert.equal(platform.peerDependenciesMeta?.redis?.optional, undefined)
  const dependencies = requiredPeerDependencies(platform)
  assert.equal(dependencies.redis, platform.peerDependencies.redis)
  assert.ok(dependencies.redis)
})

test('generated required peers survive legacy installation without adding optional peers', () => {
  fc.assert(
    fc.property(
      fc.uniqueArray(
        fc.record({
          name: fc.stringMatching(/^[a-z][a-z0-9-]{0,7}$/),
          range: fc.constantFrom('*', '^1.0.0', '4.1.1', '>=5.1.0 <7.0.0'),
          optional: fc.option(fc.boolean(), { nil: undefined }),
        }),
        { selector: peer => peer.name, maxLength: 12 },
      ),
      peers => {
        const manifest = {
          peerDependencies: Object.fromEntries(
            peers.map(peer => [peer.name, peer.range]),
          ),
          peerDependenciesMeta: Object.fromEntries(
            peers
              .filter(peer => peer.optional !== undefined)
              .map(peer => [peer.name, { optional: peer.optional }]),
          ),
        }
        const before = structuredClone(manifest)
        const dependencies = requiredPeerDependencies(manifest)
        for (const peer of peers) {
          assert.equal(
            Object.hasOwn(dependencies, peer.name),
            peer.optional !== true,
          )
          if (peer.optional !== true)
            assert.equal(dependencies[peer.name], peer.range)
        }
        assert.equal(
          Object.keys(dependencies).length,
          peers.filter(peer => peer.optional !== true).length,
        )
        assert.deepEqual(manifest, before)
        assert.equal(
          { ...dependencies, effect: '4.1.1' }.effect,
          '4.1.1',
          'the explicit fixture Effect version keeps precedence',
        )
      },
    ),
    { seed: corpus.seed, numRuns: corpus.runs, endOnFailure: true },
  )
  assert.deepEqual(requiredPeerDependencies({}), {})
})
