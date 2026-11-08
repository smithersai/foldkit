import { Array, Option, Order, pipe } from 'effect'
import * as fc from 'fast-check'
import { expect, test } from 'vitest'

import { contributionCounts } from './fixtures/foldkit-contributor-order'
import {
  type RawTelemetry,
  contributorSummary,
  transformTelemetry,
} from './telemetry.vibe'

const rawTelemetry = (
  contributors: RawTelemetry['contributors'],
): RawTelemetry => ({
  fetchedAt: 0,
  repository: {
    stargazers_count: 0,
    forks_count: 0,
    watchers_count: 0,
    open_issues_count: 0,
    pushed_at: '1970-01-01T00:00:00.000Z',
    default_branch: 'main',
  },
  contributors,
  issues: [],
  pullRequests: [],
  releases: [],
  starHistory: [],
  commitActivity: { data: Option.none(), warnings: [] },
  packageData: [],
})

const counts = fc.oneof(
  fc.constantFrom(...contributionCounts),
  fc.array(fc.integer({ min: -1_000_000, max: 1_000_000 }), { maxLength: 40 }),
)

test('keeps contributor ranking descending and stable at the cutoff', () => {
  fc.assert(
    fc.property(counts, values => {
      const contributors = values.map((contributions, index) => ({
        login: 'contributor-' + index,
        contributions,
        avatar_url: Option.none(),
      }))
      const expected = [...contributors]
        .sort((left, right) => right.contributions - left.contributions)
        .slice(0, 6)
        .map(contributor => contributor.login)
      expect(
        transformTelemetry(rawTelemetry(contributors)).topContributors.map(
          contributor => contributor.login,
        ),
      ).toEqual(expected)
    }),
    { seed: 1873189, numRuns: 200 },
  )
})

test('preserves the original comparator getter-read order', () => {
  fc.assert(
    fc.property(counts, fc.boolean(), (values, repeatReferences) => {
      const makeContributors = (reads: globalThis.Array<number>) => {
        const contributors = values.map((value, index) => ({
          login: 'contributor-' + index,
          get contributions() {
            reads.push(index)
            return value
          },
          avatar_url: Option.none(),
        }))
        return repeatReferences
          ? contributors.flatMap(contributor => [contributor, contributor])
          : contributors
      }
      const expectedReads: globalThis.Array<number> = []
      const expected = Array.sort(
        makeContributors(expectedReads),
        pipe(
          Order.Number,
          Order.mapInput(
            (contributor: { contributions: number }) =>
              contributor.contributions,
          ),
          Order.flip,
        ),
      )
        .slice(0, 6)
        .map(contributorSummary)
      const actualReads: globalThis.Array<number> = []
      const actual = transformTelemetry(
        rawTelemetry(makeContributors(actualReads)),
      ).topContributors
      expect(actual).toEqual(expected)
      expect(actualReads).toEqual(expectedReads)
    }),
    { seed: 1873190, numRuns: 200 },
  )
})
