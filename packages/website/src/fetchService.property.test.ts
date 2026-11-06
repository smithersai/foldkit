// @vitest-environment node
import { spawnSync } from 'node:child_process'
import { mkdtempSync, rmSync, symlinkSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { expect, test } from 'vitest'

import corpus from './fixtures/foldkit-fetch-service.json'
import profile from './snippet/devtoolsRedacted.vibe?raw'
import user from './snippet/foldkitDataFetching.vibe?raw'
import { blockAfter, callAt } from './snippetSource.test-support.ts'

test('keeps injected fetch calls cold and preserves request and JSON failures', () => {
  const directory = mkdtempSync(join(tmpdir(), 'foldkit-command-defect-'))
  try {
    symlinkSync(
      join(process.cwd(), 'node_modules'),
      join(directory, 'node_modules'),
    )
    const profileProgram = profile.includes('const performRequest')
      ? blockAfter(profile, 'execute:')
      : 'effect { return try ' + callAt(profile, 'Effect.tryPromise') + ' }'
    writeFileSync(
      join(directory, 'command.vibe'),
      `
import { Redacted } from "effect"
import { FetchHttpClient } from "effect/http"
export const profile = (accessToken: Redacted.Redacted<string>) => ` +
        profileProgram +
        `
export const user = (userId: string) => effect {
  const performRequest = try FetchHttpClient.Fetch
  return try ` +
        callAt(user, 'Effect.tryPromise') +
        `
}
`,
    )
    writeFileSync(join(directory, 'package.json'), '{"type":"module"}')
    writeFileSync(
      join(directory, 'tsconfig.json'),
      JSON.stringify({
        compilerOptions: {
          strict: true,
          skipLibCheck: true,
          module: 'ESNext',
          moduleResolution: 'Bundler',
          target: 'ESNext',
          types: [],
          outDir: 'dist',
          rewriteRelativeImportExtensions: true,
        },
        files: ['command.vibe'],
      }),
    )
    const compiled = spawnSync(
      join(process.cwd(), 'node_modules/.bin/vibelang'),
      [
        '--singleThreaded',
        '-p',
        join(directory, 'tsconfig.json'),
        '--pretty',
        'false',
      ],
      { encoding: 'utf8', timeout: 30_000 },
    )
    expect(compiled.status, compiled.stdout + compiled.stderr).toBe(0)
    expect(compiled.stdout + compiled.stderr).not.toMatch(/EK4402/)
    writeFileSync(
      join(directory, 'run.mjs'),
      `
import assert from "node:assert/strict"
import { Effect, Exit } from "effect"
import fc from "fast-check"
import { Redacted } from "effect"
import { FetchHttpClient } from "effect/http"
import { profile, user } from "./dist/command.js"
await fc.assert(fc.asyncProperty(fc.string(), fc.string(), fc.jsonValue(), async (id, token, failure) => {
  for (const [kind, build] of [["profile", () => profile(Redacted.make(token, { label: "access token" }))], ["user", () => user(id)]]) {
    for (const mode of ["success", "fetchThrow", "fetchReject", "jsonThrow", "jsonReject"]) {
      let fetchCalls = 0, jsonCalls = 0, lastResponse, lastJson
      const body = { id, token }
      const performRequest = (...args) => {
        fetchCalls++
        assert.deepEqual(args, kind === "profile"
          ? ["/api/profile", { headers: { Authorization: "Bearer " + token } }]
          : ["/api/users/" + id])
        if (mode === "fetchThrow") throw failure
        if (mode === "fetchReject") return Promise.reject(failure)
        const response = new Response(JSON.stringify(body))
        const json = response.json.bind(response)
        response.json = () => {
          jsonCalls++
          if (mode === "jsonThrow") throw failure
          if (mode === "jsonReject") return Promise.reject(failure)
          return json().then(value => { lastJson = value; return value })
        }
        lastResponse = response
        return Promise.resolve(response)
      }
      const program = Effect.provideService(build(), FetchHttpClient.Fetch, performRequest)
      assert.equal(fetchCalls, 0)
      assert.equal(jsonCalls, 0)
      for (let replay = 1; replay <= 2; replay++) {
        const exit = await Effect.runPromiseExit(program)
        const fetchFails = mode === "fetchThrow" || mode === "fetchReject"
        const jsonFails = kind === "user" && (mode === "jsonThrow" || mode === "jsonReject")
        assert.equal(fetchCalls, replay)
        assert.equal(jsonCalls, kind === "user" && !fetchFails ? replay : 0)
        if (fetchFails || jsonFails) {
          assert.equal(Exit.isFailure(exit), true)
          const reason = exit.cause.reasons[0]
          assert.equal(reason._tag, "Fail")
          assert.equal(reason.error.cause, failure)
        } else {
          assert.equal(Exit.isSuccess(exit), true)
          assert.equal(exit.value, kind === "profile" ? lastResponse : lastJson)
          if (kind === "user") assert.deepEqual(exit.value, body)
        }
      }
    }
  }
}), { seed: ${corpus.seed}, numRuns: ${corpus.runs} })
console.log("FETCH_SERVICE_PROPERTY 100 cases, 2000 executions, exact URLs/options, cold replay and JSON failures")

`,
    )
    const executed = spawnSync(process.execPath, [join(directory, 'run.mjs')], {
      encoding: 'utf8',
      timeout: 20_000,
    })
    expect(executed.status, executed.stdout + executed.stderr).toBe(0)
  } finally {
    rmSync(directory, { recursive: true, force: true })
  }
})
