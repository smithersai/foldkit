import fc from 'fast-check'
import { existsSync, readdirSync } from 'node:fs'
import { mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { setImmediate } from 'node:timers/promises'
import { type ViteDevServer, createServer } from 'vite'
import { describe, expect, it } from 'vitest'

import {
  type PendingScanScenario,
  foldkitResolutionPendingScan,
} from './fixtures/foldkit-resolution-close-during-scan.ts'

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

const closeDuringPendingScan = async (
  scenario: PendingScanScenario,
): Promise<
  Readonly<{
    remainingTemporaryDirectories: ReadonlyArray<string>
    postCloseWriterStarts: number
  }>
> => {
  const root = await mkdtemp(join(tmpdir(), 'foldkit-scan-shutdown-'))
  const entered = makeBarrier()
  const release = makeBarrier()
  const writerFinished = makeBarrier()
  let server: ViteDevServer | undefined
  let startup: Promise<ViteDevServer> | undefined
  let firstBuildEnd = true
  let writerStarted = false
  let closeCompleted = false
  let postCloseWriterStarts = 0

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
    await writeFile(
      join(root, 'entry.js'),
      scenario.hasDependency
        ? "import { value } from 'proof-dep'; console.log(value)\n"
        : 'console.log(1)\n',
    )
    startup = createServer({
      root,
      configFile: false,
      logLevel: 'silent',
      server: { middlewareMode: true, hmr: false, ws: false },
      plugins: [
        {
          name: 'capture-server-during-scan',
          configureServer(instance) {
            server = instance
          },
        },
      ],
      optimizeDeps: {
        noDiscovery: false,
        entries: ['entry.js'],
        include: [],
        holdUntilCrawlEnd: scenario.holdUntilCrawlEnd,
        rolldownOptions: {
          plugins: [
            {
              name: 'hold-completed-dependency-scan',
              async buildEnd() {
                if (!firstBuildEnd) return
                firstBuildEnd = false
                entered.resolve()
                await release.promise
              },
              generateBundle() {
                writerStarted = true
                if (closeCompleted) postCloseWriterStarts++
              },
              closeBundle() {
                if (writerStarted) writerFinished.resolve()
              },
            },
          ],
        },
      },
    })
    await Promise.race([entered.promise, startup.then(() => entered.promise)])
    const runningServer = server
    if (runningServer === undefined) throw new Error('Missing real server')
    const optimizer = runningServer.environments.client.depsOptimizer
    if (optimizer?.scanProcessing === undefined) {
      throw new Error('Expected a pending dependency scan')
    }

    const closing = optimizer.close()
    for (let turn = 0; turn < scenario.eventLoopTurns; turn++) {
      await setImmediate()
    }
    release.resolve()
    await closing
    closeCompleted = true

    const { cacheDir } = runningServer.config
    const remainingTemporaryDirectories = existsSync(cacheDir)
      ? readdirSync(cacheDir).filter(name => name.includes('temp'))
      : []
    if (scenario.hasDependency && remainingTemporaryDirectories.length > 0) {
      await writerFinished.promise
    }
    await startup
    return { remainingTemporaryDirectories, postCloseWriterStarts }
  } finally {
    release.resolve()
    await server?.close()
    await rm(root, { recursive: true, force: true })
  }
}

describe('closing during dependency discovery', () => {
  it('does not start optimization after closing an unfinished scan', async () => {
    expect(await closeDuringPendingScan(foldkitResolutionPendingScan)).toEqual({
      remainingTemporaryDirectories: [],
      postCloseWriterStarts: 0,
    })
  })

  it('preserves closure across generated scan and release choices', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.record({
          hasDependency: fc.boolean(),
          holdUntilCrawlEnd: fc.boolean(),
          eventLoopTurns: fc.integer({ min: 0, max: 20 }),
        }),
        async scenario => {
          expect(await closeDuringPendingScan(scenario)).toEqual({
            remainingTemporaryDirectories: [],
            postCloseWriterStarts: 0,
          })
        },
      ),
      { numRuns: 100, seed: 413908 },
    )
  }, 30_000)
})
