import * as fc from 'fast-check'
import { expect, test, vi } from 'vitest'

import { registrationFailures } from './fixtures/foldkit-map-listener-rollback'
import { registerMapListeners } from './mapPlatform'

test('wires the original map and container listeners', () => {
  fc.assert(
    fc.property(
      fc.array(fc.constantFrom('move', 'click'), { maxLength: 60 }),
      events => {
        const container = document.createElement('div')
        const moveListeners: Array<() => void> = []
        const onMoveEnd = vi.fn()
        const onContainerClick = vi.fn()
        const map = {
          on: (_event: 'moveend', listener: () => void) => {
            moveListeners.push(listener)
          },
          off: vi.fn(),
        }
        const registered = registerMapListeners(
          map,
          container,
          onMoveEnd,
          onContainerClick,
        )
        expect(registered.container).toBe(container)
        expect(registered.onMoveEnd).toBe(onMoveEnd)
        expect(registered.onContainerClick).toBe(onContainerClick)
        for (const event of events) {
          if (event === 'move') moveListeners[0]?.()
          else container.dispatchEvent(new MouseEvent('click'))
        }
        expect(onMoveEnd).toHaveBeenCalledTimes(
          events.filter(event => event === 'move').length,
        )
        expect(onContainerClick).toHaveBeenCalledTimes(
          events.filter(event => event === 'click').length,
        )
        expect(map.off).not.toHaveBeenCalled()
      },
    ),
    { seed: 178189, numRuns: 200 },
  )
})

test('rolls back both listeners and rethrows each registration failure', () => {
  fc.assert(
    fc.property(
      fc.oneof(
        fc.constantFrom(...registrationFailures),
        fc.tuple(fc.constantFrom('map', 'container'), fc.anything()),
      ),
      ([failingStage, failure]) => {
        const container = document.createElement('div')
        const onMoveEnd = vi.fn()
        const onContainerClick = vi.fn()
        const map = {
          on: () => {
            if (failingStage === 'map') throw failure
          },
          off: vi.fn(),
        }
        const add = vi
          .spyOn(container, 'addEventListener')
          .mockImplementation(() => {
            throw failure
          })
        const remove = vi.spyOn(container, 'removeEventListener')
        let threw = false
        let caught: unknown
        try {
          registerMapListeners(map, container, onMoveEnd, onContainerClick)
        } catch (error) {
          threw = true
          caught = error
        }
        expect(threw).toBe(true)
        expect(caught).toBe(failure)
        expect(map.off).toHaveBeenCalledExactlyOnceWith('moveend', onMoveEnd)
        expect(remove).toHaveBeenCalledExactlyOnceWith(
          'click',
          onContainerClick,
        )
        expect(add).toHaveBeenCalledTimes(failingStage === 'map' ? 0 : 1)
        add.mockRestore()
        remove.mockRestore()
      },
    ),
    { seed: 189178, numRuns: 200 },
  )
})
