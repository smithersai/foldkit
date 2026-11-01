import fc from 'fast-check'
import { mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { setImmediate } from 'node:timers/promises'
import { type ViteDevServer, createServer } from 'vite'
import { describe, expect, it } from 'vitest'

type WriterPhase =
  | 'buildStart'
  | 'generateBundle'
  | 'writeBundle'
  | 'closeBundle'

const makeBarrier = (): Readonly<{
  promise: Promise<void>
  resolve: () => void
}> => {
  let resolve = (): void => {}
  const promise = new Promise<void>(done => {
    resolve = done
  })
  return { promise, resolve }
}

const closeDuringOptimizerWrite = async (
  phase: WriterPhase,
  eventLoopTurns: number,
  rejectWrite = false,
): Promise<boolean> => {
  const root = await mkdtemp(join(tmpdir(), 'foldkit-optimizer-shutdown-'))
  const entered = makeBarrier()
  const release = makeBarrier()
  const drained = makeBarrier()
  let armed = false
  let reached = false
  let writerDrained = false
  let closeObservedDrained = false
  let server: ViteDevServer | undefined
  let closing: Promise<void> | undefined
  const block = async (): Promise<void> => {
    if (!armed || reached) return
    reached = true
    entered.resolve()
    await release.promise
  }
  try {
    const dependency = join(root, 'node_modules/proof-dep')
    await mkdir(dependency, { recursive: true })
    await writeFile(
      join(root, 'package.json'),
      JSON.stringify({ type: 'module', dependencies: { 'proof-dep': '*' } }),
    )
    await writeFile(
      join(dependency, 'package.json'),
      JSON.stringify({
        name: 'proof-dep',
        version: '1.0.0',
        type: 'module',
        exports: './index.js',
      }),
    )
    await writeFile(join(dependency, 'index.js'), 'export const value = 1\n')
    server = await createServer({
      root,
      configFile: false,
      logLevel: 'silent',
      server: { middlewareMode: true, hmr: false, ws: false },
      optimizeDeps: {
        noDiscovery: false,
        entries: [],
        include: [],
        rolldownOptions: {
          plugins: [
            {
              name: 'controlled-optimizer-writer',
              async buildStart() {
                if (phase === 'buildStart') await block()
              },
              async generateBundle() {
                if (phase === 'generateBundle') {
                  await block()
                  if (armed && rejectWrite)
                    throw new Error('Controlled optimizer write failure')
                }
              },
              async writeBundle() {
                if (phase === 'writeBundle') await block()
              },
              async closeBundle() {
                if (!armed) return
                if (phase === 'closeBundle') await block()
                writerDrained = true
                drained.resolve()
              },
            },
          ],
        },
      },
    })
    const optimizer = server.environments.client.depsOptimizer
    if (optimizer === undefined) throw new Error('Missing client optimizer')
    await optimizer.init()
    await optimizer.scanProcessing
    armed = true
    optimizer.registerMissingImport('proof-dep', join(dependency, 'index.js'))
    optimizer.run()
    await entered.promise
    closing = server.close().then(() => {
      closeObservedDrained = writerDrained
    })
    for (let turn = 0; turn < eventLoopTurns; turn++) await setImmediate()
    release.resolve()
    await closing
    await drained.promise
    return closeObservedDrained
  } finally {
    release.resolve()
    await closing
    await server?.close()
    if (reached) await drained.promise
    await rm(root, { recursive: true, force: true })
  }
}

describe('optimizer shutdown drains dependency writers', () => {
  it('finishes an in-flight bundle before resolving server.close', async () => {
    expect(await closeDuringOptimizerWrite('generateBundle', 20)).toBe(true)
  })

  it('drains a rejected bundle before resolving server.close', async () => {
    expect(await closeDuringOptimizerWrite('generateBundle', 20, true)).toBe(
      true,
    )
  })

  it('preserves shutdown order across generated optimizer phases', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.constantFrom<WriterPhase>(
          'buildStart',
          'generateBundle',
          'writeBundle',
          'closeBundle',
        ),
        fc.integer({ min: 0, max: 20 }),
        async (phase, turns) => {
          expect(await closeDuringOptimizerWrite(phase, turns)).toBe(true)
        },
      ),
      { numRuns: 100, seed: 413906 },
    )
  }, 30_000)
})
