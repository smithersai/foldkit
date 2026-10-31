// Keep the synchronous text-transform exception contract used by Vite.

const ROOT_ELEMENT_PATTERN = /<div\b[^>]*\bid="root"[^>]*>\s*<\/div>/

const ROOT_LOADING_MARKUP = `<div id="root"><div style="display:flex;align-items:center;justify-content:center;min-height:100vh;font-family:system-ui,-apple-system,sans-serif;font-size:14px;color:#9ca3af">Loading\u2026</div></div>`

export const rewriteWorkspaceSpec =
  (versions: Readonly<Record<string, string>>) =>
  (name: string, specifier: string): string => {
    if (!specifier.startsWith('workspace:')) {
      return specifier
    }

    const version = versions[name]

    if (version === undefined) {
      throw new Error(
        `[playground-files] ${name} uses ${specifier} but is not a public workspace package`,
      )
    }

    return version
  }

export const injectLoadingPlaceholder = (
  indexHtml: string,
  slug: string,
): string => {
  if (!ROOT_ELEMENT_PATTERN.test(indexHtml)) {
    throw new Error(
      `[playground-files] Could not find <div id="root"></div> in ${slug}/index.html to inject the playground loading placeholder. ` +
        `Ensure the example's index.html contains an empty root div.`,
    )
  }
  return indexHtml.replace(ROOT_ELEMENT_PATTERN, ROOT_LOADING_MARKUP)
}
