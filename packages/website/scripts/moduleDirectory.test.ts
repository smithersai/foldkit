import { Effect } from 'effect'
import fc from 'fast-check'
import { dirname } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { describe, expect, test } from 'vitest'

import * as NodePath from '@effect/platform-node/NodePath'

import { directoryFromModuleUrl } from './fixtures/foldkit-module-directory.vibe'

const directory = (url: URL): string =>
  Effect.runSync(Effect.provide(directoryFromModuleUrl(url), NodePath.layer))

describe('module directories through Effect Path', () => {
  test.each([
    '/tmp/foldkit/plain/module.vibe',
    '/tmp/foldkit/space name/module.vibe',
    '/tmp/foldkit/汉字 #?%/module.vibe',
  ])('preserves Node module-directory semantics for %s', path => {
    const url = pathToFileURL(path)
    expect(directory(url)).toBe(dirname(fileURLToPath(url)))
  })

  test('generated encoded directories and URL metadata match the Node oracle', () => {
    const segment = fc
      .array(
        fc.constantFrom(
          'a',
          'Z',
          '0',
          '_',
          ' ',
          '%',
          '#',
          '?',
          '汉',
          '字',
          '😀',
        ),
        {
          minLength: 1,
          maxLength: 20,
        },
      )
      .map(parts => parts.join(''))
    fc.assert(
      fc.property(
        fc.array(segment, { minLength: 1, maxLength: 5 }),
        fc.constantFrom('', '?source=vibe', '?encoded=%20%23'),
        fc.constantFrom('', '#module', '#汉字'),
        (segments, search, hash) => {
          const url = pathToFileURL(
            '/tmp/foldkit-module/' + segments.join('/') + '/entry.vibe',
          )
          url.search = search
          url.hash = hash
          expect(directory(url)).toBe(dirname(fileURLToPath(url)))
        },
      ),
      { seed: 531123, numRuns: 400 },
    )
  })
})
