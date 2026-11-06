import { Effect, Fiber, Stream } from 'effect'
import fc from 'fast-check'
import { afterEach, describe, expect, test, vi } from 'vitest'

import { subscriptions } from './activeSection.vibe'
import corpus from './fixtures/foldkit-website-active-section-observer.json'

const OBSERVER_SEED = 531112
const OBSERVER_RUNS = 200
const PROPERTY_TIMEOUT_MS = 30000
const SECTION_ID_MAX = 9
const SECTION_COUNT_MAX = 6
const BATCH_ENTRY_MAX = 8
const BATCH_COUNT_MAX = 12

type Batch = ReadonlyArray<readonly [string, boolean]>
type Scenario = Readonly<{
  sections: ReadonlyArray<string>
  present: ReadonlyArray<string>
  batches: ReadonlyArray<Batch>
  expected: ReadonlyArray<string>
}>

afterEach(() => {
  vi.restoreAllMocks()
  vi.unstubAllGlobals()
  document.body.replaceChildren()
})

const runScenario = async (scenario: Scenario): Promise<void> => {
  const events: string[] = []
  const elements = new Map<string, HTMLElement>()
  for (const id of scenario.present) {
    const element = document.createElement('section')
    element.id = id
    elements.set(id, element)
    document.body.append(element)
  }

  let deliver: (
    entries: ReadonlyArray<IntersectionObserverEntry>,
  ) => void = () => {
    throw new Error('Observer has not started')
  }
  let ready: () => void = () => {}
  const started = new Promise<void>(resolve => {
    ready = resolve
  })
  class Observer {
    constructor(
      callback: (entries: ReadonlyArray<IntersectionObserverEntry>) => void,
      options?: IntersectionObserverInit,
    ) {
      events.push('make')
      expect(options).toEqual({ rootMargin: '-100px 0px -80% 0px' })
      deliver = callback
      ready()
    }
    observe(target: Element): void {
      events.push('observe:' + target.id)
    }
    disconnect(): void {
      events.push('disconnect')
    }
  }
  vi.stubGlobal('IntersectionObserver', Observer)
  vi.stubGlobal('requestAnimationFrame', (callback: FrameRequestCallback) => {
    events.push('frame')
    queueMicrotask(() => callback(0))
    return 1
  })
  vi.stubGlobal('cancelAnimationFrame', () => {})

  const readElement = document.getElementById.bind(document)
  const lookup = vi.spyOn(document, 'getElementById').mockImplementation(id => {
    events.push('lookup:' + id)
    return readElement(id)
  })
  const fiber = Effect.runFork(
    subscriptions.activeSection
      .dependenciesToStream({
        pageId: 'observer-proof',
        sections: scenario.sections,
      })
      .pipe(Stream.take(scenario.expected.length), Stream.runCollect),
  )
  const result = Effect.runPromise(Fiber.join(fiber))
  try {
    await Promise.race([
      started,
      result.then(() => {
        throw new Error('Stream closed before observer start')
      }),
    ])
    expect(events).toEqual([
      'frame',
      'make',
      ...scenario.sections.flatMap(id =>
        scenario.present.includes(id)
          ? ['lookup:' + id, 'observe:' + id]
          : ['lookup:' + id],
      ),
    ])
    for (const batch of scenario.batches) {
      deliver(
        batch.map(([id, isIntersecting]) => {
          const target = elements.get(id)
          if (!target) throw new Error('Corpus names an absent target: ' + id)
          const rect = target.getBoundingClientRect()
          return {
            target,
            isIntersecting,
            boundingClientRect: rect,
            intersectionRect: rect,
            intersectionRatio: isIntersecting ? 1 : 0,
            rootBounds: null,
            time: 0,
          }
        }),
      )
    }
    const messages = await result
    expect(
      messages.map(message =>
        message._tag === 'ChangedActiveSection'
          ? message.sectionId
          : message._tag,
      ),
    ).toEqual(scenario.expected)
    expect(events.filter(event => event === 'disconnect')).toHaveLength(1)
    expect(events.at(-1)).toBe('disconnect')
  } finally {
    await Effect.runPromise(Fiber.interrupt(fiber))
    lookup.mockRestore()
    document.body.replaceChildren()
  }
}

describe('active section observer lifecycle', () => {
  test.each(corpus)('$name', async scenario => {
    const batches: Batch[] = scenario.batches.map(batch =>
      batch.map((entry): readonly [string, boolean] => {
        const [id, visible] = entry
        if (typeof id !== 'string' || typeof visible !== 'boolean') {
          throw new Error('Invalid observer corpus entry')
        }
        return [id, visible]
      }),
    )
    await runScenario({ ...scenario, batches })
  })

  test(
    'keeps the first visible section across generated callback batches',
    async () => {
      const scenario = fc
        .uniqueArray(fc.integer({ min: 0, max: SECTION_ID_MAX }), {
          minLength: 1,
          maxLength: SECTION_COUNT_MAX,
        })
        .chain(numbers => {
          const sections = numbers.map(number => 'section-' + number)
          return fc
            .array(
              fc.array(fc.tuple(fc.constantFrom(...sections), fc.boolean()), {
                maxLength: BATCH_ENTRY_MAX,
              }),
              { maxLength: BATCH_COUNT_MAX },
            )
            .map(changes => {
              const first = sections[0]
              if (first === undefined)
                throw new Error('Generator produced no sections')
              const batches: Batch[] = [[[first, true]], ...changes]
              const visible = new Set<string>()
              const expected: string[] = []
              for (const batch of batches) {
                for (const [id, intersects] of batch) {
                  if (intersects) visible.add(id)
                  else visible.delete(id)
                }
                const active = sections.find(id => visible.has(id))
                if (active !== undefined) expected.push(active)
              }
              return { sections, present: sections, batches, expected }
            })
        })
      await fc.assert(fc.asyncProperty(scenario, runScenario), {
        seed: OBSERVER_SEED,
        numRuns: OBSERVER_RUNS,
      })
    },
    PROPERTY_TIMEOUT_MS,
  )

  test('does not construct an observer for an empty section list', async () => {
    const observer = vi.fn()
    vi.stubGlobal('IntersectionObserver', observer)
    const fiber = Effect.runFork(
      Stream.runDrain(
        subscriptions.activeSection.dependenciesToStream({
          pageId: 'empty',
          sections: [],
        }),
      ),
    )
    await Effect.runPromise(Fiber.interrupt(fiber))
    expect(observer).not.toHaveBeenCalled()
  })
})
