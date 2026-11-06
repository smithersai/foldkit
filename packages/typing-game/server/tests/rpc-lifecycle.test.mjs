import assert from 'node:assert/strict'
import { spawn } from 'node:child_process'
import { once } from 'node:events'
import fs from 'node:fs'
import { createRequire } from 'node:module'
import { tmpdir } from 'node:os'
import path from 'node:path'
import test from 'node:test'
import { fileURLToPath, pathToFileURL } from 'node:url'
test('RPC game preserves seeded progress, final scoring and disconnect host transfer', async () => {
  const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
  const dir = fs.mkdtempSync(path.join(tmpdir(), 'foldkit-typing-game-rpc-'))
  try {
    fs.writeFileSync(
      path.join(dir, 'package.json'),
      '{"type":"module"}' + String.fromCharCode(10),
    )
    fs.symlinkSync(
      path.join(root, 'node_modules'),
      path.join(dir, 'node_modules'),
      'dir',
    )
    const require = createRequire(path.join(root, 'package.json'))
    const imp = specifier =>
      import(pathToFileURL(require.resolve(specifier)).href)
    const { Effect, Layer, Stream, Fiber, Deferred, Option } =
      await imp('effect')
    const fc = (await imp('fast-check')).default
    const { RpcClient, RpcSerialization } = await imp('effect/rpc')
    const { FetchHttpClient } = await imp('effect/http')
    const Shared = await imp('@typing-game/shared')
    const results = {}
    const name = 'native',
      dist = path.join(root, 'dist')
    {
      const entry = path.join(dir, name + '.mjs')
      let code = fs.readFileSync(path.join(dist, 'index.js'), 'utf8')
      code = code.replace(
        /(from\s*["'])(\.[^"']+)(["'])/g,
        (_, a, b, c) => a + pathToFileURL(path.resolve(dist, b)).href + c,
      )
      assert(
        code.includes('port: 3001'),
        'Only the smoke-test port configuration may change',
      )
      code = code.replace('port: 3001', 'port: 0')
      fs.writeFileSync(entry, code)
      const started = Date.now()
      const child = spawn(process.execPath, [entry], {
        cwd: dir,
        env: process.env,
        stdio: ['ignore', 'pipe', 'pipe'],
      })
      let output = '',
        timer
      const ready = new Promise((resolve, reject) => {
        const receive = chunk => {
          output += chunk.toString()
          const address = /http:\/\/(?:\[[^\]]+\]|[a-zA-Z0-9_.:-]+):(\d+)/.exec(
            output,
          )
          if (address) resolve(Number(address[1]))
        }
        child.stdout.on('data', receive)
        child.stderr.on('data', receive)
        child.once('error', reject)
        child.once('exit', code =>
          reject(new Error(name + ' exited before address, code ' + code)),
        )
        timer = setTimeout(
          () => reject(new Error(name + ' startup timed out')),
          30000,
        )
      })
      try {
        const port = await ready
        clearTimeout(timer)
        assert(port > 0)
        console.log(name + ' listening after ' + (Date.now() - started) + ' ms')
        const protocol = RpcClient.layerProtocolHttp({
          url: 'http://127.0.0.1:' + port + '/rpc',
        }).pipe(
          Layer.provide([FetchHttpClient.layer, RpcSerialization.layerNdjson]),
        )
        const summary = await Effect.runPromise(
          Effect.scoped(
            Effect.gen(function* () {
              const client = yield* RpcClient.make(Shared.RoomRpcs)
              const created = yield* client.createRoom({
                username: 'synthetic-host',
              })
              assert.equal(created.room.hostId, created.player.id)
              assert.equal(created.room.status._tag, 'Waiting')
              const joined = yield* client.joinRoom({
                roomId: created.room.id,
                username: 'synthetic-host',
              })
              assert.equal(joined.player.username, 'synthetic-host (2)')
              const fetched = yield* client.getRoomById({
                roomId: created.room.id,
              })
              assert.equal(fetched.players.length, 2)
              const denied = yield* Effect.match(
                client.startGame({
                  roomId: created.room.id,
                  playerId: joined.player.id,
                }),
                {
                  onFailure: error => error._tag,
                  onSuccess: () => 'unexpected success',
                },
              )
              assert.equal(denied, 'UnauthorizedError')
              const missing = yield* Effect.match(
                client.getRoomById({ roomId: created.room.id + '/missing' }),
                {
                  onFailure: error => error._tag,
                  onSuccess: () => 'unexpected success',
                },
              )
              assert.equal(missing, 'RoomNotFoundError')
              console.log(name + ' lifecycle subscribing')
              const ready = yield* Deferred.make()
              const progressReady = yield* Deferred.make()
              const gameFinished = yield* Deferred.make()
              const seenStatuses = new Set()
              let finalText = null
              const observer = yield* Effect.forkChild(
                Stream.runForEach(
                  client.subscribeToRoom({
                    roomId: created.room.id,
                    playerId: created.player.id,
                  }),
                  event =>
                    Effect.gen(function* () {
                      seenStatuses.add(event.room.status._tag)
                      yield* Deferred.succeed(ready, undefined)
                      if (
                        finalText !== null &&
                        Option.isSome(event.maybePlayerProgress) &&
                        event.maybePlayerProgress.value.userText === finalText
                      )
                        yield* Deferred.succeed(
                          progressReady,
                          event.maybePlayerProgress.value,
                        )
                      if (
                        event.room.status._tag === 'Finished' &&
                        Option.isSome(event.room.maybeScoreboard)
                      )
                        yield* Deferred.succeed(gameFinished, event.room)
                    }),
                ),
              )
              yield* Deferred.await(ready)
              console.log(name + ' lifecycle subscription ready')
              yield* client.startGame({
                roomId: created.room.id,
                playerId: created.player.id,
              })
              const startedRoom = yield* client.getRoomById({
                roomId: created.room.id,
              })
              assert(
                Option.isSome(startedRoom.maybeGame),
                'authorized start publishes a game',
              )
              const game = startedRoom.maybeGame.value
              finalText = game.text
              const prefixes = fc.sample(
                fc.integer({ min: 0, max: game.text.length }),
                { seed: 53136, numRuns: 32 },
              )
              for (const size of prefixes)
                yield* client.updatePlayerProgress({
                  playerId: created.player.id,
                  gameId: game.id,
                  userText: game.text.slice(0, size),
                  charsTyped: size,
                })
              yield* client.updatePlayerProgress({
                playerId: created.player.id,
                gameId: game.id,
                userText: game.text,
                charsTyped: game.text.length,
              })
              console.log(
                name + ' lifecycle submitted32seeded prefixes and final text',
              )
              const progress = yield* Deferred.await(progressReady)
              assert.equal(progress.charsTyped, game.text.length)
              assert.equal(progress.gameId, game.id)
              const finishedRoom = yield* Deferred.await(gameFinished)
              assert(Option.isSome(finishedRoom.maybeScoreboard))
              const scoreboard = finishedRoom.maybeScoreboard.value
              assert.equal(scoreboard.length, 2)
              const hostScore = scoreboard.find(
                player => player.playerId === created.player.id,
              )
              const guestScore = scoreboard.find(
                player => player.playerId === joined.player.id,
              )
              assert(hostScore && guestScore)
              assert.equal(hostScore.correctChars, game.text.length)
              assert.equal(hostScore.charsTyped, game.text.length)
              assert.equal(hostScore.accuracy, 100)
              assert.equal(guestScore.charsTyped, 0)
              assert.equal(guestScore.correctChars, 0)
              // The public stream is throttled100ms; transient GetReady can share Waiting's window.
              const requiredStages = [
                'Waiting',
                'Countdown',
                'Playing',
                'Finished',
              ]
              for (const stage of requiredStages)
                assert(seenStatuses.has(stage), 'stream delivered ' + stage)
              fs.writeFileSync(
                path.join(dir, name + '-observed-stages.json'),
                JSON.stringify([...seenStatuses]) + String.fromCharCode(10),
              )
              console.log(name + ' lifecycle finished with scoreboard')
              yield* Fiber.interrupt(observer)
              let afterDisconnect = yield* client.getRoomById({
                roomId: created.room.id,
              })
              while (
                afterDisconnect.players.length !== 1 ||
                afterDisconnect.hostId !== joined.player.id
              ) {
                yield* Effect.sleep(100)
                afterDisconnect = yield* client.getRoomById({
                  roomId: created.room.id,
                })
              }
              assert.equal(afterDisconnect.players.length, 1)
              assert.equal(afterDisconnect.hostId, joined.player.id)
              console.log(
                name + ' lifecycle disconnect cleanup and host transfer passed',
              )
              return {
                players: fetched.players.length,
                duplicateUsername: joined.player.username,
                unauthorized: denied,
                missingRoom: missing,
                progressCases: prefixes.length,
                fullTextProgress: true,
                scoreboardPlayers: scoreboard.length,
                hostAccuracy: hostScore.accuracy,
                guestZeroCharacters: true,
                statuses: requiredStages,
                cleanupPlayers: afterDisconnect.players.length,
                hostTransferred: true,
              }
            }).pipe(Effect.provide(protocol), Effect.timeout('60 seconds')),
          ),
        )
        results[name] = { ...summary, scenarioElapsedMs: Date.now() - started }
        console.log(name + ' RPC assertions passed')
      } catch (error) {
        console.error(
          name + ' startup/RPC failure; stage output:\n' + output.slice(-3000),
        )
        throw error
      } finally {
        clearTimeout(timer)
        fs.writeFileSync(path.join(dir, name + '.log'), output)
        if (child.exitCode === null) {
          const exited = once(child, 'exit')
          child.kill('SIGTERM')
          let killTimer
          await Promise.race([
            exited,
            new Promise(resolve => {
              killTimer = setTimeout(() => {
                child.kill('SIGKILL')
                resolve()
              }, 5000)
            }),
          ])
          clearTimeout(killTimer)
        }
      }
    }
    assert.equal(results.native.progressCases, 32)
    assert.equal(results.native.hostTransferred, true)
  } finally {
    fs.rmSync(dir, { recursive: true, force: true })
  }
})
