import fc from 'fast-check'
import { inertHtml as ih } from 'foldkit/html'
import { describe, expect, test } from 'vitest'

import * as Markdown from '@foldkit/markdown'
import { parseMarkdown } from '@foldkit/markdown/vite'

import { type CodeBlock } from '../component'
import { collectDemoLabels } from './demoLabel'
import corpus from './fixtures/foldkit-foreign-browser-excerpt.json'
import { islandAttributes } from './islandAttributes'
import { docIslands } from './islands'
import { collectHeadings } from './tableOfContents'
import { docViews } from './views'

const EXCERPT_NOTICE =
  'Illustrative VibeLang excerpt; application context may be omitted.'
const FOREIGN_NOTICE =
  'Illustrative excerpt. Browser API lines are foreign JavaScript; checked VibeLang programs use Effect platform services.'

type Panel = Parameters<CodeBlock.RenderSnippet>[0]
type Example = Readonly<{ name: string; label: string }>

const rawInputs = import.meta.glob<string>(
  ['../snippet/*.{vibe,ts,tsx,elm}', '!../snippet/*.d.vibe.ts'],
  {
    query: '?raw',
    import: 'default',
    eager: true,
  },
)

const sourceFor = (name: string): string => {
  const found = Object.entries(rawInputs).find(([path]) =>
    path
      .split('/')
      .at(-1)
      ?.startsWith(name + '.'),
  )
  if (!found) throw new Error('Missing corpus source: ' + name)
  return found[1]
}

const render = (
  examples: ReadonlyArray<Example>,
  pageId = 'snippet-excerpts',
) => {
  const source = examples
    .map(({ name, label }) => `::Snippet{name="${name}" label="${label}"}`)
    .join('\n\n')
  const document = parseMarkdown(source, { islands: islandAttributes })
  const { idByHeading } = collectHeadings(document)
  const renderCopyButton = () => ih.empty
  const renderHeadingLink = () => ih.empty
  const panels: Array<Panel> = []
  const renderSnippet: CodeBlock.RenderSnippet = panel => {
    panels.push(panel)
    return ih.empty
  }
  Markdown.view(document, {
    views: docViews({
      pageId,
      idByHeading,
      renderCopyButton,
      renderHeadingLink,
    }),
    islands: docIslands(
      { demos: {}, renderCopyButton, renderSnippet, renderHeadingLink },
      collectDemoLabels(document, idByHeading),
      pageId,
    ),
  })
  return panels
}

const expectNotice = (panel: Panel, text: string) =>
  expect(panel.content).toMatchObject({
    children: expect.arrayContaining([
      expect.objectContaining({
        sel: 'p',
        children: [expect.objectContaining({ text })],
      }),
    ]),
  })

describe('snippet excerpt boundaries', () => {
  test('labels native excerpts without changing their copied source', () => {
    const [panel] = render([{ name: corpus.nativeSnippet, label: 'Menu' }])
    if (!panel) throw new Error('Snippet did not render')
    expectNotice(panel, EXCERPT_NOTICE)
    expect(panel.rawCode).toBe(sourceFor(corpus.nativeSnippet))
  })

  test.each(corpus.reconvertedSnippets)(
    'labels re-converted native excerpt %s without changing its copied source',
    name => {
      const [panel] = render([{ name, label: 'Re-converted excerpt' }])
      if (!panel) throw new Error('Re-converted snippet did not render')
      expectNotice(panel, EXCERPT_NOTICE)
      expect(panel.rawCode).toBe(sourceFor(name))
    },
  )

  test.each(corpus.foreignSnippets)(
    'labels the foreign browser lines in %s without hiding them',
    name => {
      const [panel] = render([{ name, label: 'Browser integration' }])
      if (!panel) throw new Error('Snippet did not render')
      expectNotice(panel, FOREIGN_NOTICE)
      expect(panel.rawCode).toBe(sourceFor(name))
      if (name === corpus.foreignWitness.name) {
        expect(panel.rawCode).toContain(corpus.foreignWitness.rawFragment)
      }
    },
  )

  test('does not label TypeScript or Elm examples as native excerpts', () => {
    const panels = render(
      corpus.nonNativeSnippets.map(name => ({ name, label: 'Comparison' })),
    )
    expect(panels).toHaveLength(corpus.nonNativeSnippets.length)
    for (const panel of panels) {
      expect(JSON.stringify(panel.content)).not.toContain(EXCERPT_NOTICE)
      expect(JSON.stringify(panel.content)).not.toContain(FOREIGN_NOTICE)
    }
  })

  test('keeps notices, raw source, titles and copy identities through repeated generated islands', () => {
    const names = [
      corpus.nativeSnippet,
      ...corpus.reconvertedSnippets,
      ...corpus.foreignSnippets,
      ...corpus.nonNativeSnippets,
    ]
    const label = fc.stringMatching(/^[A-Za-z][A-Za-z0-9 -]{0,24}$/)
    fc.assert(
      fc.property(
        fc.array(fc.record({ name: fc.constantFrom(...names), label }), {
          minLength: 1,
          maxLength: 8,
        }),
        label,
        (examples, pageId) => {
          const panels = render(examples, pageId)
          expect(panels).toHaveLength(examples.length)
          examples.forEach(({ name, label }, index) => {
            const panel = panels[index]
            if (!panel) throw new Error('Generated snippet did not render')
            expect(panel.id).toBe(`${pageId}-snippet-${name}-${index}`)
            expect(panel.title).toBe(label)
            expect(panel.copyAriaLabel).toBe(`Copy ${label} to clipboard`)
            expect(panel.rawCode).toBe(sourceFor(name))
            if (corpus.foreignSnippets.includes(name)) {
              expectNotice(panel, FOREIGN_NOTICE)
            } else if (
              name === corpus.nativeSnippet ||
              corpus.reconvertedSnippets.includes(name)
            ) {
              expectNotice(panel, EXCERPT_NOTICE)
            }
          })
        },
      ),
      { seed: 531117, numRuns: 200 },
    )
  })
})
