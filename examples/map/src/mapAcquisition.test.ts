import { Effect, Fiber, Stream } from 'effect'
import { beforeEach, describe, expect, test, vi } from 'vitest'

import { MountMap } from './main.vibe'

const control = vi.hoisted(() => {
  let resolveImport: (() => void) | undefined
  let importStarted: (() => void) | undefined
  let importStartedPromise = new Promise<void>(resolve => {
    importStarted = resolve
  })
  let importGate = new Promise<void>(resolve => {
    resolveImport = resolve
  })

  return {
    reset: () => {
      importStartedPromise = new Promise<void>(resolve => {
        importStarted = resolve
      })
      importGate = new Promise<void>(resolve => {
        resolveImport = resolve
      })
    },
    waitForImportStart: () => importStartedPromise,
    signalImportStart: () => {
      importStarted?.()
    },
    awaitGate: () => importGate,
    releaseImport: () => {
      resolveImport?.()
    },
    makeMap: vi.fn(),
    removeMap: vi.fn(),
  }
})

vi.mock('maplibre-gl', async () => {
  control.signalImportStart()
  await control.awaitGate()

  class Map {
    private readonly container: HTMLElement
    constructor({ container }: { container: HTMLElement }) {
      this.container = container
      control.makeMap()
    }
    remove(): void {
      control.removeMap()
    }
    on(): this {
      return this
    }
    off(): this {
      return this
    }
    getContainer(): HTMLElement {
      return this.container
    }
    getBounds() {
      return {
        getWest: () => -180,
        getSouth: () => -85,
        getEast: () => 180,
        getNorth: () => 85,
      }
    }
  }

  class Marker {
    setLngLat(): this {
      return this
    }
    addTo(): this {
      return this
    }
  }

  return { Map, Marker, setWorkerUrl: vi.fn() }
})

describe('MountMap acquisition masking', () => {
  beforeEach(() => {
    control.reset()
    vi.clearAllMocks()
  })

  test('masks interruption during map acquisition and runs removeMap on teardown like the original base', async () => {
    const host = document.createElement('div')
    const fiber = Effect.runFork(
      Effect.scoped(
        Stream.runDrain(
          MountMap({ hostId: 'mask-test-host' }).f(host, Stream.empty),
        ),
      ),
    )

    await control.waitForImportStart()

    let interrupted = false
    const interruptDone = Effect.runPromise(Fiber.interrupt(fiber)).then(() => {
      interrupted = true
    })

    await new Promise(resolve => setTimeout(resolve, 40))
    expect(interrupted).toBe(false)

    control.releaseImport()
    await interruptDone

    expect(interrupted).toBe(true)
    expect(control.makeMap).toHaveBeenCalledTimes(1)
    expect(control.removeMap).toHaveBeenCalledTimes(1)
  })
})
