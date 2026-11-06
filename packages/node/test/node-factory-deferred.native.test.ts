import { Config, ConfigProvider, Effect, Exit, Option } from 'effect'
import fc from 'fast-check'
import { expect, it, vi } from 'vitest'

const factory = vi.hoisted(() => vi.fn())
vi.mock('../src/node.platform.ts', async importOriginal => ({
  ...(await importOriginal<Record<string, unknown>>()),
  createServer: factory,
}))

import { serve } from '../src/index.ts'

it('never allocates a server before the port configuration succeeds', async () => {
  await fc.assert(
    fc.asyncProperty(fc.string(), async message => {
      factory.mockClear()
      const program = serve({
        port: Config.fail(new ConfigProvider.SourceError({ message })),
        origin: Config.succeed(Option.none()),
      })
      expect(factory).not.toHaveBeenCalled()
      const result = await Effect.runPromiseExit(program)
      expect(Exit.isFailure(result)).toBe(true)
      expect(factory).not.toHaveBeenCalled()
    }),
    { seed: 187408, numRuns: 200 },
  )
})
