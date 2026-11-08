import {
  codeToHtml as shikiCodeToHtml,
  getSingletonHighlighter,
  type LanguageRegistration,
} from 'shiki'

import grammar from './syntax/VibeLang.tmLanguage.json' with { type: 'json' }

// Vendored unchanged from VibeLang's editor grammar at 2e010dc26356.
// See syntax/NOTICE for the upstream TypeScript grammar's license.
const vibeLanguage = {
  ...grammar,
  name: 'vibe',
  aliases: ['vibelang'],
} satisfies LanguageRegistration

export const codeToHtml = async (
  code: string,
  options: Parameters<typeof shikiCodeToHtml>[1],
): ReturnType<typeof shikiCodeToHtml> => {
  if (options.lang === 'vibe' || options.lang === 'vibelang') {
    const themes =
      'themes' in options && options.themes !== undefined
        ? Object.values(options.themes).filter(theme => theme !== undefined)
        : 'theme' in options && options.theme !== undefined
          ? [options.theme]
          : []
    const highlighter = await getSingletonHighlighter({
      langs: [vibeLanguage],
      themes,
    })
    return highlighter.codeToHtml(code, options)
  }
  return shikiCodeToHtml(code, options)
}
