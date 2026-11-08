import assert from 'node:assert/strict'
import { mkdtemp, rm, writeFile } from 'node:fs/promises'
import { createServer as createNetServer } from 'node:net'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { createServer } from 'vite'
const bind = (server, port) =>
  new Promise((resolve, reject) => {
    server.once('error', reject)
    server.listen(port, '127.0.0.1', resolve)
  })
const close = server =>
  new Promise((resolve, reject) => {
    if (!server.listening) return resolve()
    server.close(error => (error ? reject(error) : resolve()))
  })
export async function portZeroRace({ collisions, strictPort }) {
  const root = await mkdtemp(join(tmpdir(), 'foldkit-port-zero-'))
  const blockers = []
  const observed = []
  let server
  let remaining = collisions
  try {
    await writeFile(
      join(root, 'index.html'),
      '<title>foldkit port-zero witness</title>',
    )
    server = await createServer({
      root,
      configFile: false,
      logLevel: 'silent',
      server: { host: '127.0.0.1', port: 0, strictPort },
      optimizeDeps: { noDiscovery: true, include: [] },
    })
    assert.ok(server.httpServer)
    const http = server.httpServer,
      originalListen = http.listen.bind(http)
    http.listen = (...args) => {
      const [port] = args
      observed.push({ kind: 'candidate', port })
      if (remaining > 0) {
        remaining--
        const blocker = createNetServer()
        blockers.push(blocker)
        void bind(blocker, port)
          .then(() => {
            observed.push({
              kind: 'competing-listener-bound',
              port,
              address: blocker.address(),
            })
            return originalListen(...args)
          })
          .catch(error => http.emit('error', error))
      } else {
        originalListen(...args)
      }
      return http
    }
    await server.listen()
    const address = http.address()
    assert.equal(typeof address, 'object')
    assert.ok(address && address.port > 0)
    assert.equal(remaining, 0)
    assert.ok(!blockers.some(b => b.address()?.port === address.port))
    const response = await fetch('http://127.0.0.1:' + address.port)
    assert.equal(response.status, 200)
    assert.match(await response.text(), /foldkit port-zero witness/)
    observed.push({
      kind: 'serving',
      port: address.port,
      status: response.status,
    })
    return { collisions, strictPort, observed }
  } catch (error) {
    observed.push({
      kind: 'startup-failed',
      name: error.name,
      message: error.message,
      code: error.code,
      cause: error.cause,
    })
    throw error
  } finally {
    if (server) await server.close()
    for (const blocker of blockers) await close(blocker)
    await rm(root, { recursive: true, force: true })
  }
}

export async function fixedPortControl(strictPort) {
  const root = await mkdtemp(join(tmpdir(), 'foldkit-explicit-port-'))
  const blocker = createNetServer()
  let server
  try {
    await bind(blocker, 0)
    const port = blocker.address().port
    await writeFile(
      join(root, 'index.html'),
      '<title>explicit-port control</title>',
    )
    server = await createServer({
      root,
      configFile: false,
      logLevel: 'silent',
      server: { host: '127.0.0.1', port, strictPort },
      optimizeDeps: { noDiscovery: true, include: [] },
    })
    if (strictPort) {
      await assert.rejects(
        () => server.listen(),
        error => error.message === 'Port ' + port + ' is already in use',
      )
    } else {
      await server.listen()
      const bound = server.httpServer.address()
      assert.ok(bound && bound.port > port)
      const response = await fetch('http://127.0.0.1:' + bound.port)
      assert.equal(response.status, 200)
      await response.arrayBuffer()
    }
  } finally {
    if (server) await server.close()
    await close(blocker)
    await rm(root, { recursive: true, force: true })
  }
}

export async function nonAddressErrorControl() {
  const root = await mkdtemp(join(tmpdir(), 'foldkit-bind-error-'))
  let server
  try {
    server = await createServer({
      root,
      configFile: false,
      logLevel: 'silent',
      server: { host: '127.0.0.1', port: 0 },
      optimizeDeps: { noDiscovery: true, include: [] },
    })
    const expected = Object.assign(new Error('controlled bind denial'), {
      code: 'EACCES',
    })
    let attempts = 0
    const http = server.httpServer
    http.listen = () => {
      attempts++
      queueMicrotask(() => http.emit('error', expected))
      return http
    }
    await assert.rejects(
      () => server.listen(),
      error => error === expected,
    )
    assert.equal(attempts, 1)
  } finally {
    if (server) await server.close()
    await rm(root, { recursive: true, force: true })
  }
}
