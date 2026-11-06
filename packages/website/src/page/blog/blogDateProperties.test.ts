import { DateTime, Option, Schema } from 'effect'
import fc from 'fast-check'
import { describe, expect, test } from 'vitest'

import corpus from './fixtures/foldkit-website-blog-dates.json'
import { PostFrontmatter } from './frontmatter.vibe'
import { formatPostDate } from './posts.vibe'

const CALENDAR_SEED = 531109
const FORMAT_SEED = 531110
const FALLBACK_SEED = 531111
const CALENDAR_RUNS = 1000
const FORMAT_RUNS = 500
const FALLBACK_RUNS = 200
const DATE_PART_WIDTH = 2
const YEAR_RANGE = { min: 1900, max: 2200 }

const withDate = (date: string) => ({
  title: 'Calendar property',
  description: 'Calendar property',
  date,
})

const isoDate = (year: number, month: number, day: number): string =>
  globalThis.String(year) +
  '-' +
  globalThis.String(month).padStart(DATE_PART_WIDTH, '0') +
  '-' +
  globalThis.String(day).padStart(DATE_PART_WIDTH, '0')

const decode = Schema.decodeUnknownSync(PostFrontmatter)

describe('blog date boundaries', () => {
  test.each(corpus.validDates)(
    'accepts and formats $date',
    ({ date, display }) => {
      expect(() => decode(withDate(date))).not.toThrow()
      expect(formatPostDate(date)).toBe(display)
    },
  )

  test.each(corpus.invalidCalendarDates)('rejects %s', date => {
    expect(() => decode(withDate(date))).toThrow()
  })

  test.each(corpus.invalidDates)('retains the unparseable input %s', date => {
    expect(formatPostDate(date)).toBe(date)
  })

  test('checks generated calendar days against the DateTime round trip', () => {
    fc.assert(
      fc.property(
        fc.record({
          year: fc.integer(YEAR_RANGE),
          month: fc.integer({ min: 0, max: 13 }),
          day: fc.integer({ min: 0, max: 32 }),
        }),
        ({ year, month, day }) => {
          const date = isoDate(year, month, day)
          const parsed = DateTime.make(date)
          const valid =
            Option.isSome(parsed) &&
            DateTime.formatIsoDateUtc(parsed.value) === date

          if (valid) {
            expect(() => decode(withDate(date))).not.toThrow()
          } else {
            expect(() => decode(withDate(date))).toThrow()
          }
        },
      ),
      { seed: CALENDAR_SEED, numRuns: CALENDAR_RUNS },
    )
  })

  test('formats generated days with the English month and original year', () => {
    fc.assert(
      fc.property(
        fc.record({
          year: fc.integer(YEAR_RANGE),
          day: fc.integer({ min: 1, max: 28 }),
          month: fc.constantFrom(
            { number: 1, name: 'January' },
            { number: 2, name: 'February' },
            { number: 3, name: 'March' },
            { number: 4, name: 'April' },
            { number: 5, name: 'May' },
            { number: 6, name: 'June' },
            { number: 7, name: 'July' },
            { number: 8, name: 'August' },
            { number: 9, name: 'September' },
            { number: 10, name: 'October' },
            { number: 11, name: 'November' },
            { number: 12, name: 'December' },
          ),
        }),
        ({ year, month, day }) => {
          expect(formatPostDate(isoDate(year, month.number, day))).toBe(
            month.name +
              ' ' +
              globalThis.String(day) +
              ', ' +
              globalThis.String(year),
          )
        },
      ),
      { seed: FORMAT_SEED, numRuns: FORMAT_RUNS },
    )
  })

  test('retains generated invalid dates without formatting them', () => {
    fc.assert(
      fc.property(
        fc.integer(YEAR_RANGE),
        fc.integer({ min: 1, max: 28 }),
        (year, day) => {
          const date = isoDate(year, 99, day)
          expect(formatPostDate(date)).toBe(date)
        },
      ),
      { seed: FALLBACK_SEED, numRuns: FALLBACK_RUNS },
    )
  })
})
