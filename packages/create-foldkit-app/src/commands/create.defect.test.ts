import { Effect, Exit, Option } from 'effect'
import fc from 'fast-check'
import { randomUUID } from 'node:crypto'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { expect, it, vi } from 'vitest'

import { NodeServices } from '@effect/platform-node'

import { create } from './create.vibe'

const formatterFailure: { value: unknown } = vi.hoisted(() => ({
  value: undefined,
}))

vi.mock('chalk', () => ({
  default: {
    blue: () => {
      throw formatterFailure.value
    },
  },
}))

vi.mock('../utils/packages.vibe', async importOriginal => {
  const actual = await importOriginal<typeof import('../utils/packages.vibe')>()
  const { Effect } = await import('effect')
  return {
    ...actual,
    readFoldkitSubtreeRef: Effect.succeed('fixture'),
  }
})

it('preserves the original formatter defect through the create command', async () => {
  await fc.assert(
    fc.asyncProperty(fc.anything(), async failure => {
      formatterFailure.value = failure
      const command = create({
        name: Option.some(join(tmpdir(), 'foldkit-format-' + randomUUID())),
        rendering: Option.some('ssg'),
        example: Option.none(),
        packageManager: Option.some('npm'),
        maybeDependencyManifestsDirectory: Option.none(),
      })
      const result = await Effect.runPromiseExit(
        Effect.provide(command, NodeServices.layer),
      )
      expect(result).toEqual(Exit.die(failure))
      if (Exit.isFailure(result)) {
        const [reason] = result.cause.reasons
        if (reason?._tag === 'Die') {
          expect(reason.defect).toBe(failure)
        } else {
          expect.fail('Expected the formatter defect')
        }
      } else {
        expect.fail('Expected the formatter to fail')
      }
    }),
    { numRuns: 40, seed: 48174 },
  )
}, 30_000)
