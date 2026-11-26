import fc from 'fast-check'
import { beforeEach, describe, expect, test, vi } from 'vitest'

import corpus from './fixtures/foldkit-playground-native-main.json'
import { init } from './playground.vibe'

const NATIVE_ENTRY = 'src/main.vibe'
const LEGACY_ENTRY = 'src/main.ts'
const EXAMPLE_SLUG = 'initial-file-example'
const PROPERTY_RUNS = 200
const NATIVE_ENTRY_SEED = 531113
const LEGACY_ENTRY_SEED = 531114
const FALLBACK_SEED = 531115
const MAX_OTHER_FILES = 12
const MAX_CONTENT_LENGTH = 24

const examples = vi.hoisted(() => {
  const filesBySlug: Record<string, { files: Record<string, string> }> = {}
  return { filesBySlug }
})

vi.mock('virtual:playground-files', () => ({
  default: examples.filesBySlug,
}))

const modelForFiles = (files: Readonly<Record<string, string>>) => {
  examples.filesBySlug[EXAMPLE_SLUG] = { files: { ...files } }
  return init(EXAMPLE_SLUG)
}

const otherPath = fc
  .tuple(
    fc.constantFrom('src', 'assets', 'styles'),
    fc.stringMatching(/^[a-z]{1,8}$/),
    fc.constantFrom('ts', 'vibe', 'css', 'json'),
  )
  .map(([folder, name, extension]) => `${folder}/${name}.${extension}`)
  .filter(path => path !== NATIVE_ENTRY && path !== LEGACY_ENTRY)

const otherFiles = fc.dictionary(
  otherPath,
  fc.string({ maxLength: MAX_CONTENT_LENGTH }),
  { maxKeys: MAX_OTHER_FILES },
)

describe('Playground initial file', () => {
  beforeEach(() => {
    for (const slug of Object.keys(examples.filesBySlug)) {
      delete examples.filesBySlug[slug]
    }
  })

  test('opens the migrated counter main instead of its HTML file', () => {
    const model = modelForFiles(corpus.files)
    expect(model.activeFilePath).toBe(corpus.expectedInitialFile)
    expect(model.files).toEqual(corpus.files)
  })

  test('prefers native main when both native and legacy entries exist', () => {
    expect(
      modelForFiles({
        [LEGACY_ENTRY]: 'legacy',
        [NATIVE_ENTRY]: 'native',
      }).activeFilePath,
    ).toBe(NATIVE_ENTRY)
  })

  test('keeps the legacy main when no native entry exists', () => {
    expect(
      modelForFiles({
        'index.html': 'html',
        [LEGACY_ENTRY]: 'legacy',
      }).activeFilePath,
    ).toBe(LEGACY_ENTRY)
  })

  test('keeps the alphabetically first fallback when neither main exists', () => {
    expect(
      modelForFiles({ 'src/view.vibe': 'view', 'index.html': 'html' })
        .activeFilePath,
    ).toBe('index.html')
  })

  test('keeps an empty selection for an empty file map', () => {
    expect(modelForFiles({}).activeFilePath).toBe('')
  })

  test('keeps an empty selection for an unavailable example', () => {
    expect(init('missing-example').activeFilePath).toBe('')
  })

  test('native selection survives other paths and insertion order', () => {
    fc.assert(
      fc.property(otherFiles, fc.boolean(), (files, withLegacy) => {
        const entries: Array<[string, string]> = [
          ...Object.entries(files),
          [NATIVE_ENTRY, 'native'],
        ]
        if (withLegacy) {
          entries.push([LEGACY_ENTRY, 'legacy'])
        }
        const forward = modelForFiles(Object.fromEntries(entries))
        const reversed = modelForFiles(
          Object.fromEntries(entries.slice().reverse()),
        )
        expect(forward.activeFilePath).toBe(NATIVE_ENTRY)
        expect(reversed.activeFilePath).toBe(NATIVE_ENTRY)
        expect(forward.files).toEqual(reversed.files)
      }),
      { seed: NATIVE_ENTRY_SEED, numRuns: PROPERTY_RUNS },
    )
  })

  test('legacy selection survives other paths and insertion order', () => {
    fc.assert(
      fc.property(otherFiles, files => {
        const entries: Array<[string, string]> = [
          ...Object.entries(files),
          [LEGACY_ENTRY, 'legacy'],
        ]
        expect(modelForFiles(Object.fromEntries(entries)).activeFilePath).toBe(
          LEGACY_ENTRY,
        )
        expect(
          modelForFiles(Object.fromEntries(entries.slice().reverse()))
            .activeFilePath,
        ).toBe(LEGACY_ENTRY)
      }),
      { seed: LEGACY_ENTRY_SEED, numRuns: PROPERTY_RUNS },
    )
  })

  test('fallback selection survives insertion order', () => {
    fc.assert(
      fc.property(otherFiles, files => {
        const entries = Object.entries(files)
        const forward = modelForFiles(Object.fromEntries(entries))
        const reversed = modelForFiles(
          Object.fromEntries(entries.slice().reverse()),
        )
        const active = forward.activeFilePath
        expect(reversed.activeFilePath).toBe(active)
        if (entries.length === 0) {
          expect(active).toBe('')
        } else {
          expect(Object.hasOwn(files, active)).toBe(true)
          for (const path of Object.keys(files)) {
            expect(active <= path).toBe(true)
          }
        }
      }),
      { seed: FALLBACK_SEED, numRuns: PROPERTY_RUNS },
    )
  })
})
