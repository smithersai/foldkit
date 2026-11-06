import { readFileSync, readdirSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

// The root of @effect/platform-node re-exports every module, NodeRedis
// included. A value import of the root loads redis and about 640 modules into
// every `vite build` whose config loads this plugin, which took the build-id
// tests past their budget in the full suite (foldkit-147). Each module names
// the one it uses by subpath.
describe('platform imports', () => {
  it('names @effect/platform-* modules by subpath, never a package root', () => {
    const directory = resolve(import.meta.dirname, '../src')
    for (const name of readdirSync(directory)) {
      if (!/\.(?:ts|vibe)$/.test(name) || name.endsWith('.d.vibe.ts')) continue
      const source = readFileSync(resolve(directory, name), 'utf8')
      expect(source, name).not.toMatch(
        /from '@effect\/platform-(?:node|bun|browser)'/,
      )
    }
  })
})
