import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { expect, test } from 'vitest'

const scripts = dirname(fileURLToPath(import.meta.url))

test('keeps the displayed socket program read and send explicit', () => {
  const source = readFileSync(
    join(scripts, '../src/snippet/antiPatternLiveHandleGood.vibe'),
    'utf8',
  )
  const execute = /execute:\s*([\s\S]+),\s*\}\)\s*$/.exec(source)?.[1]
  expect(execute).toBeDefined()
  // VIP-1: try runs an Effect value in effect code. The resource program stays
  // captured before the cold block; the existing runtime property checks timing.
  expect(execute).toMatch(/\bconst\s+socket\s*=\s*try\s+socketProgram\b/)
  expect(execute).toMatch(
    /\btry\s+Effect\.try\s*\(\(\)\s*=>\s*socket\.send\(text\)\)/,
  )
  expect(execute).not.toMatch(/\bsocketProgram\s*\(/)
})
