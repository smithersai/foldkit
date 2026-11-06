import { Config, Effect, Option } from 'effect'
import fc from 'fast-check'
import { expect, it } from 'vitest'

import { type ServeOptions, serve } from '../src/index.ts'
import corpus from './fixtures/foldkit-node-program-construction.json' with { type: 'json' }

it('captures only the port Config while constructing a server program', () => {
  fc.assert(
    fc.property(
      fc.integer({ min: corpus.minPort, max: corpus.maxPort }),
      port => {
        let portReads = 0
        let originReads = 0
        let manifestReads = 0
        const options: ServeOptions = {
          get port() {
            portReads++
            return Config.succeed(port)
          },
          get origin() {
            originReads++
            return Config.succeed(Option.none())
          },
          get manifestPath() {
            manifestReads++
            return 'dist/server/foldkit.build.json'
          },
        }
        const program = serve(options)
        expect(Effect.isEffect(program)).toBe(true)
        expect(portReads).toBe(1)
        expect(originReads).toBe(0)
        expect(manifestReads).toBe(0)
      },
    ),
    { seed: corpus.seed, numRuns: corpus.runs, endOnFailure: true },
  )
})
