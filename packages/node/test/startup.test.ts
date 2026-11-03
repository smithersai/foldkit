import { Config, Effect, Fiber, Option } from 'effect'
import { copyFile, mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises'
import { createConnection, createServer } from 'node:net'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { afterEach, describe, expect, it } from 'vitest'

import { serve } from '../src/index.ts'

const fixtureDirectories: Array<string> = []
const slowHandlerFixtureUrl = new URL(
  './fixture/slow-handler.mjs',
  import.meta.url,
)

const getAvailablePort = (): Promise<number> =>
  new Promise((resolvePort, reject) => {
    const server = createServer()
    server.once('error', reject)
    server.listen(0, '127.0.0.1', () => {
      const address = server.address()
      if (address === null || typeof address === 'string') {
        reject(new Error('Node did not allocate a TCP port'))
        return
      }
      server.close(error => {
        if (error === undefined) {
          resolvePort(address.port)
        } else {
          reject(error)
        }
      })
    })
  })

const tryConnect = (port: number): Promise<boolean> =>
  new Promise(resolveConnected => {
    const socket = createConnection({ host: '127.0.0.1', port })
    socket.once('connect', () => {
      socket.destroy()
      resolveConnected(true)
    })
    socket.once('error', () => {
      resolveConnected(false)
    })
  })

const waitForOpenPort = async (port: number): Promise<void> => {
  for (let attempt = 0; attempt < 1000; attempt++) {
    if (await tryConnect(port)) {
      return
    }
    await new Promise(resolveWait => setTimeout(resolveWait, 10))
  }
  throw new Error(`port ${String(port)} never accepted a connection`)
}

const createSlowFixture = async (): Promise<string> => {
  const rootDirectory = await mkdtemp(join(tmpdir(), 'foldkit-node-startup-'))
  fixtureDirectories.push(rootDirectory)
  const clientDirectory = join(rootDirectory, 'dist', 'client')
  const serverDirectory = join(rootDirectory, 'dist', 'server')
  await mkdir(clientDirectory, { recursive: true })
  await mkdir(serverDirectory, { recursive: true })
  await copyFile(slowHandlerFixtureUrl, join(serverDirectory, 'handler.mjs'))
  const manifestPath = join(serverDirectory, 'foldkit.build.json')
  await writeFile(
    manifestPath,
    `${JSON.stringify({
      schemaVersion: 1,
      client: 'dist/client',
      server: 'dist/server',
      serverEntry: 'handler.mjs',
      prerendered: [],
    })}\n`,
  )
  return manifestPath
}

afterEach(async () => {
  await Promise.all(
    fixtureDirectories
      .splice(0)
      .map(directory => rm(directory, { recursive: true, force: true })),
  )
})

describe('serve startup', () => {
  it('answers the first request the open port receives', async () => {
    const manifestPath = await createSlowFixture()
    const port = await getAvailablePort()
    const fiber = Effect.runFork(
      serve({
        port: Config.succeed(port),
        origin: Config.succeed(Option.none()),
        manifestPath,
      }),
    )
    try {
      await waitForOpenPort(port)
      // The port opening is the only readiness signal a client has. A request
      // it accepts must be answered, not left until the client gives up.
      const response = await fetch(`http://localhost:${String(port)}/`, {
        signal: AbortSignal.timeout(2_000),
      })
      expect(response.status).toBe(200)
      expect(await response.text()).toBe('ready')
    } finally {
      await Effect.runPromise(Fiber.interrupt(fiber))
    }
  })
})
