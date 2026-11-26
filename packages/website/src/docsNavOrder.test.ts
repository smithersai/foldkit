import { Option } from 'effect'
import fc from 'fast-check'
import { describe, expect, test } from 'vitest'

import { allPages, isNavPageActive, pageNeighbors } from './docsNav.vibe'

const neighbors = (tag: string) => {
  const found = pageNeighbors(tag)
  return {
    previous: Option.getOrNull(found.maybePrevious),
    next: Option.getOrNull(found.maybeNext),
  }
}

const expectedNeighbors = (tag: string) => {
  const index = allPages.findIndex(page => page._tag === tag)
  return {
    previous: index > 0 ? (allPages[index - 1] ?? null) : null,
    next: index >= 0 ? (allPages[index + 1] ?? null) : null,
  }
}

describe('documentation navigation native choices', () => {
  test('the first page has no previous page', () => {
    const first = allPages[0]
    expect(first).toBeDefined()
    if (first !== undefined) {
      expect(neighbors(first._tag)).toEqual(expectedNeighbors(first._tag))
      expect(neighbors(first._tag).previous).toBeNull()
    }
  })

  test('every page uses its first position in the flattened published order', () => {
    expect(allPages.length).toBeGreaterThan(2)
    for (const page of allPages) {
      expect(neighbors(page._tag)).toEqual(expectedNeighbors(page._tag))
    }
  })

  test('an unknown route has no neighbors', () => {
    expect(neighbors('__foldkit_missing_route__')).toEqual({
      previous: null,
      next: null,
    })
  })

  test('generated existing and missing tags preserve both neighbor choices', () => {
    const tag = fc.oneof(
      fc.constantFrom(...allPages.map(page => page._tag)),
      fc.string().map(value => '__foldkit_missing_route__' + value),
    )
    fc.assert(
      fc.property(fc.array(tag, { minLength: 1, maxLength: 40 }), tags => {
        for (const value of tags) {
          expect(neighbors(value)).toEqual(expectedNeighbors(value))
        }
      }),
      { seed: 531121, numRuns: 200 },
    )
  })

  test('example detail highlighting compares the slug only for detail entries', () => {
    expect(
      isNavPageActive(
        'ExampleDetail',
        Option.some('counter'),
        'ExampleDetail:counter',
      ),
    ).toBe(true)
    expect(
      isNavPageActive(
        'ExampleDetail',
        Option.some('counter'),
        'ExampleDetail:other',
      ),
    ).toBe(false)
    expect(
      isNavPageActive(
        'ExampleDetail:counter',
        Option.none(),
        'ExampleDetail:counter',
      ),
    ).toBe(true)
  })

  test('generated slug choices retain ordinary route fallback and detail matching', () => {
    fc.assert(
      fc.property(
        fc.string(),
        fc.string(),
        fc.boolean(),
        (slug, route, hasSlug) => {
          const selected = hasSlug ? Option.some(slug) : Option.none<string>()
          const detail = 'ExampleDetail:' + slug
          expect(isNavPageActive(route, selected, detail)).toBe(
            hasSlug || route === detail,
          )
          expect(isNavPageActive(route, selected, 'CoreModel')).toBe(
            route === 'CoreModel',
          )
        },
      ),
      { seed: 531122, numRuns: 200 },
    )
  })
})
