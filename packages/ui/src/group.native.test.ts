import fc from 'fast-check'
import { describe, expect, it } from 'vitest'

import { groupContiguous } from './group.vibe'

describe('groupContiguous native behavior', () => {
  it('keeps separated equal keys in separate segments', () => {
    const items = ['a', 'a', 'b', 'a']
    expect(groupContiguous(items, item => item)).toEqual([
      { key: 'a', items: ['a', 'a'] },
      { key: 'b', items: ['b'] },
      { key: 'a', items: ['a'] },
    ])
  })

  it('preserves contiguous order, identity, and one indexed key call per item', () => {
    const key = fc.oneof(
      fc.constantFrom('', '\0', '雪', 'a/b', 'a', 'b', 'a#b', '\ud800'),
      fc.string({ maxLength: 12 }),
    )
    fc.assert(
      fc.property(
        fc.array(fc.record({ key, value: fc.integer() }), { maxLength: 80 }),
        generated => {
          const items = Object.freeze(
            generated.map(item => Object.freeze({ ...item })),
          )
          const calls: number[] = []
          const actual = groupContiguous(items, (item, index) => {
            expect(item).toBe(items[index])
            calls.push(index)
            return item.key
          })
          const expected: {
            key: string
            items: (typeof items)[number][]
          }[] = []
          for (const item of items) {
            const last = expected.at(-1)
            if (last?.key === item.key) {
              last.items.push(item)
            } else {
              expected.push({ key: item.key, items: [item] })
            }
          }
          expect(actual).toEqual(expected)
          expect(calls).toEqual(items.map((_, index) => index))
          const flattened = actual.flatMap(segment => segment.items)
          expect(flattened).toHaveLength(items.length)
          flattened.forEach((item, index) => expect(item).toBe(items[index]))
        },
      ),
      { seed: 53134, numRuns: 1000 },
    )
  })
})
