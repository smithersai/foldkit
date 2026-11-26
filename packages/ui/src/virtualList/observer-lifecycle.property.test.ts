import { Deferred, Effect, Stream } from 'effect'
import fc from 'fast-check'
import * as Mount from 'foldkit/mount'
import { expect, it, vi } from 'vitest'

import { ObserveVirtualList } from './index.vibe'

it('keeps row reconciliation synchronous and closes every observer across generated DOM changes', async () => {
  await fc.assert(
    fc.asyncProperty(
      fc.array(
        fc.record({
          row: fc.integer({ min: 0, max: 5 }),
          operation: fc.constantFrom(
            'append',
            'remove',
            'measure',
            'ignore',
            'version',
          ),
        }),
        { maxLength: 30 },
      ),
      async actions => {
        const resizes: ResizeProbe[] = []
        const mutations: MutationProbe[] = []

        class ResizeProbe implements ResizeObserver {
          readonly active = new Set<Element>()
          disconnects = 0

          readonly callback: ResizeObserverCallback

          constructor(callback: ResizeObserverCallback) {
            this.callback = callback
            resizes.push(this)
          }

          observe(target: Element): void {
            this.active.add(target)
          }

          unobserve(target: Element): void {
            this.active.delete(target)
          }

          disconnect(): void {
            this.disconnects += 1
            this.active.clear()
          }
        }

        class MutationProbe implements MutationObserver {
          disconnects = 0

          readonly callback: MutationCallback

          constructor(callback: MutationCallback) {
            this.callback = callback
            mutations.push(this)
          }

          observe(): void {}

          disconnect(): void {
            this.disconnects += 1
          }

          takeRecords(): MutationRecord[] {
            return []
          }
        }

        vi.stubGlobal('ResizeObserver', ResizeProbe)
        vi.stubGlobal('MutationObserver', MutationProbe)
        const container = document.createElement('div')
        const rows = globalThis.Array.from({ length: 6 }, (_, index) => {
          const row = document.createElement('div')
          row.setAttribute('data-virtual-list-item-key', String(index))
          row.setAttribute('data-virtual-list-layout-version', '0')
          row.setAttribute('data-virtual-list-measure', 'true')
          return row
        })

        try {
          await Effect.runPromise(
            Effect.scoped(
              Effect.gen(function* () {
                const mounted = yield* Deferred.make<void>()
                yield* ObserveVirtualList({ id: 'observer-property' })
                  .f(container, Mount.liveViewStateChanges)
                  .pipe(
                    Stream.runForEach(() =>
                      Deferred.succeed(mounted, undefined),
                    ),
                    Effect.forkScoped,
                  )
                yield* Deferred.await(mounted)

                expect(resizes).toHaveLength(2)
                expect(mutations).toHaveLength(1)
                const rowObserver = resizes[1]!
                const mutationObserver = mutations[0]!
                expect([...resizes[0]!.active]).toEqual([container])

                for (const [index, action] of actions.entries()) {
                  const row = rows[action.row]!
                  switch (action.operation) {
                    case 'append':
                      container.append(row)
                      break
                    case 'remove':
                      row.remove()
                      break
                    case 'measure':
                      row.setAttribute('data-virtual-list-measure', 'true')
                      break
                    case 'ignore':
                      row.setAttribute('data-virtual-list-measure', 'false')
                      break
                    case 'version':
                      row.setAttribute(
                        'data-virtual-list-layout-version',
                        String(index + 1),
                      )
                      break
                  }

                  mutationObserver.callback([], mutationObserver)

                  // Reconciliation must finish in the host callback, before an
                  // Effect fiber or a later browser event can run.
                  const expected = rows.filter(
                    row =>
                      row.parentElement === container &&
                      row.getAttribute('data-virtual-list-measure') === 'true',
                  )
                  expect(rowObserver.active).toEqual(new Set(expected))
                  expect(resizes).toHaveLength(2)
                }
              }),
            ),
          )

          expect(resizes.every(observer => observer.disconnects === 1)).toBe(
            true,
          )
          expect(resizes.every(observer => observer.active.size === 0)).toBe(
            true,
          )
          expect(mutations.every(observer => observer.disconnects === 1)).toBe(
            true,
          )
        } finally {
          vi.unstubAllGlobals()
        }
      },
    ),
    { numRuns: 100, seed: 53135 },
  )
})

it('preserves missing or malformed HTMLElement constructors as defects', async () => {
  await fc.assert(
    fc.asyncProperty(
      fc.oneof(
        fc.constant(undefined),
        fc.constant(null),
        fc.integer(),
        fc.string(),
      ),
      async constructor => {
        const element = document.createElement('div')
        vi.stubGlobal('HTMLElement', constructor)
        try {
          const exit = await Effect.runPromise(
            Effect.exit(
              Effect.scoped(
                ObserveVirtualList({ id: 'invalid-constructor-property' })
                  .f(element, Mount.liveViewStateChanges)
                  .pipe(Stream.runDrain, Effect.timeoutOption('100 millis')),
              ),
            ),
          )
          expect(exit._tag).toBe('Failure')
        } finally {
          vi.unstubAllGlobals()
        }
      },
    ),
    { numRuns: 100, seed: 53164 },
  )
})
