import fc from 'fast-check'
import { describe, expect, it } from 'vitest'

import { codeToHtml } from './nativeHighlight.ts'

const themes = {
  light: 'github-light-default',
  dark: 'github-dark-default',
} as const

const sourceText = (html: string): string => {
  const container = document.createElement('div')
  container.innerHTML = html
  const code = container.querySelector('code')
  if (code === null) throw new Error('The highlighter omitted its code element')
  return code.textContent
}

describe('VibeLang highlighting', () => {
  it('highlights native effect and match syntax with the official grammar', async () => {
    const source =
      'export const load = effect {\n  return match (true) { when true: "<native>"; when false: "&other"; }\n}'
    const html = await codeToHtml(source, { lang: 'vibe', themes })
    expect(sourceText(html)).toBe(source)
    expect(html).toContain('<span')
    expect(html).toMatch(
      /<span style=\"color:#CF222E;[^\"]*\">\s*effect<\/span>/,
    )
    expect(html).not.toContain('<native>')
  })

  it('retains existing TypeScript and CSS highlighting', async () => {
    for (const [lang, source] of [
      ['typescript', 'export const answer: number = 42'],
      ['css', '.native { color: red; }'],
    ] as const) {
      expect(sourceText(await codeToHtml(source, { lang, themes }))).toBe(
        source,
      )
    }
  })

  it('preserves arbitrary string payloads in native snippets', async () => {
    await fc.assert(
      fc.asyncProperty(fc.string({ maxLength: 100 }), async value => {
        const source =
          'export const value = effect { return ' + JSON.stringify(value) + ' }'
        const html = await codeToHtml(source, { lang: 'vibelang', themes })
        expect(sourceText(html)).toBe(source)
      }),
      { seed: 33132, numRuns: 100 },
    )
  })
})
