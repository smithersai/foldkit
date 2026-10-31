export const replaceOrThrow = (
  html: string,
  pattern: RegExp,
  replacement: string,
  urlPath: string,
): string => {
  if (!pattern.test(html)) {
    throw new Error(
      `Head rewrite for ${urlPath} matched nothing with ${pattern}. The markup in index.html no longer has the shape this pattern expects.`,
    )
  }

  return html.replace(pattern, () => replacement)
}
