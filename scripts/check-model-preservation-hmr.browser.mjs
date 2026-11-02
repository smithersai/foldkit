import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { dirname, join, resolve } from 'node:path'
import test from 'node:test'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const { default: fc } = await import('fast-check')
const { createServer } = await import('vite')
const compilerRequire = createRequire(
  join(root, 'packages/foldkit/package.json'),
)
const { default: vibelang } = await import(
  compilerRequire.resolve('vibelang-vite')
)
const { chromium } = createRequire(join(root, 'packages/website/package.json'))(
  'playwright',
)
const corpus = JSON.parse(
  readFileSync(
    new URL(
      './fixtures/model-preservation/foldkit-hmr-owner.json',
      import.meta.url,
    ),
    'utf8',
  ),
)

const waitUntil = async predicate => {
  const limit = Date.now() + 30000
  while (!predicate()) {
    assert.ok(Date.now() < limit, 'server event wait timed out')
    await new Promise(resolve => setTimeout(resolve, 5))
  }
}

test(
  'bridge reload discards pending model replies from the old module',
  { timeout: 120000 },
  async () => {
    const dir = mkdtempSync(join(root, 'packages/foldkit/.hmr-model-owner-'))
    const runtime = join(root, 'packages/foldkit/src/runtime')
    const errors = []
    const requests = []
    const preserves = []
    let browser
    let server
    let page
    let index = 0
    try {
      writeFileSync(
        join(dir, 'index.html'),
        '<script type="module" src="/entry.ts"></script>',
      )
      writeFileSync(
        join(dir, 'tsconfig.json'),
        JSON.stringify({
          extends: '../tsconfig.json',
          compilerOptions: {
            rootDir: '.',
            types: ['vite/client'],
            composite: false,
            incremental: false,
          },
          include: [
            './bridge.vibe',
            './modelPreservation.vibe',
            './modelPreservationBridge.platform.ts',
            './bridge.hot.ts',
          ],
        }),
      )
      writeFileSync(
        join(dir, 'bridge.vibe'),
        readFileSync(join(runtime, 'modelPreservationBridge.vibe')),
      )
      writeFileSync(
        join(dir, 'modelPreservation.vibe'),
        readFileSync(join(runtime, 'modelPreservation.vibe')),
      )
      writeFileSync(
        join(dir, 'modelPreservationBridge.platform.ts'),
        readFileSync(join(runtime, 'modelPreservationBridge.platform.ts')),
      )
      // The mutation control imports this sibling. The production bridge does not.
      writeFileSync(
        join(dir, 'bridge.hot.ts'),
        'export const hot = import.meta.hot\n',
      )
      writeFileSync(
        join(dir, 'entry.ts'),
        [
          "import { Effect } from 'effect';",
          "import * as bridge from './bridge.vibe';",
          'window.bridge = bridge; window.updates = 0; window.connected = false;',
          "window.begin = id => { window.result = 'pending'; window.started = performance.now(); Effect.runPromise(window.bridge.resolvePreservedModel(id)).then(value => { window.result = { value, elapsed: performance.now() - window.started } }, error => { window.result = { error: String(error) } }); };",
          'window.preserve = (id, model) => window.bridge.preserveModel(id, model, true);',
          "import.meta.hot.accept('./bridge.vibe', next => { window.bridge = next; window.updates++; });",
          "import.meta.hot.on('foldkit-owner-handshake', () => window.connected = true);",
          "import.meta.hot.send('foldkit-owner-ready', {});",
        ].join('\n'),
      )
      const compile = spawnSync(
        join(root, 'node_modules/vibelang/native/vibelang'),
        [
          '--singleThreaded',
          '-p',
          join(dir, 'tsconfig.json'),
          '--noEmit',
          '--composite',
          'false',
          '--incremental',
          'false',
          '--pretty',
          'false',
        ],
        { cwd: root, encoding: 'utf8' },
      )
      assert.equal(compile.status, 0, compile.stdout + compile.stderr)
      server = await createServer({
        configFile: false,
        root: dir,
        plugins: [vibelang()],
        optimizeDeps: { include: ['effect', 'vibelang-runtime'] },
        server: {
          host: '127.0.0.1',
          port: 0,
          strictPort: true,
          fs: { allow: [root] },
        },
        clearScreen: false,
      })
      server.ws.on('foldkit-owner-ready', (_data, client) =>
        client.send('foldkit-owner-handshake', {}),
      )
      server.ws.on('foldkit:request-model', (data, client) =>
        requests.push({ data, client }),
      )
      server.ws.on('foldkit:preserve-model', data => preserves.push(data))
      await server.listen()
      const address = server.httpServer.address()
      assert.ok(address && typeof address === 'object')
      browser = await chromium.launch({
        headless: true,
        args: ['--no-sandbox'],
      })
      page = await browser.newPage()
      page.on('pageerror', error => errors.push(error.message))
      await page.goto('http://127.0.0.1:' + address.port)
      await page.waitForFunction(() => window.connected && window.bridge)
      const check = async model => {
        await page.evaluate(
          ({ id, model }) => window.preserve(id, model),
          model,
        )
        await waitUntil(() => preserves.length === index + 1)
        assert.deepEqual(preserves[index], {
          id: model.id,
          model: model.model,
          isReloadFlush: true,
        })
        let before = requests.length
        await page.evaluate(id => window.begin(id), model.id)
        await waitUntil(() => requests.length === before + 1)
        let request = requests[before]
        assert.deepEqual(request.data, { id: model.id })
        request.client.send('foldkit:restore-model', {
          id: model.id,
          model: model.model,
        })
        await page.waitForFunction(() => window.result !== 'pending')
        let result = await page.evaluate(() => window.result)
        assert.equal(result.error, undefined)
        assert.deepEqual(
          result.value,
          model.model,
          'timely reply restores the model',
        )
        before = requests.length
        await page.evaluate(id => window.begin(id), model.id)
        await waitUntil(() => requests.length === before + 1)
        request = requests[before]
        assert.deepEqual(request.data, { id: model.id })
        const module = server.moduleGraph.getModuleById(
          join(dir, 'bridge.vibe'),
        )
        assert.ok(module)
        await server.reloadModule(module)
        await page.waitForFunction(
          expected => window.updates >= expected,
          index + 1,
        )
        request.client.send('foldkit:restore-model', {
          id: model.id,
          model: model.model,
        })
        await page.waitForFunction(() => window.result !== 'pending')
        result = await page.evaluate(() => window.result)
        assert.equal(result.error, undefined)
        assert.equal(
          result.value,
          undefined,
          'a late reply cannot restore an old module request',
        )
        assert.ok(
          result.elapsed >= 450,
          'the original 500 ms timeout remains in force',
        )
        assert.deepEqual(errors, [])
        index++
      }
      await check(corpus.fixed)
      await fc.assert(
        fc.asyncProperty(
          fc.record({ id: fc.uuid(), model: fc.jsonValue() }),
          check,
        ),
        {
          numRuns: corpus.runs,
          seed: corpus.seed,
          endOnFailure: true,
        },
      )
      assert.equal(index, corpus.runs + 1)
      assert.deepEqual(errors, [])
    } finally {
      if (page) await page.close()
      if (browser) await browser.close()
      if (server) await server.close()
      rmSync(dir, { recursive: true, force: true })
    }
  },
)
