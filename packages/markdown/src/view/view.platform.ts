// console.warn is platform code, which a .vibe module does not use directly (VIP-33); these two
// once-per-name warnings are the raw calls, unchanged, so view.vibe keeps the rendering logic.

// NOTE: Warns once per island name for the lifetime of the process, not per
// document, so a missing island in one document suppresses the warning for the
// same name in every later document. Per-render warnings would flood the
// console, since the fold runs on every Message dispatch.
const warnedInvalidAttributeIslandNames = new Set<string>()

export const warnInvalidAttributesOnce = (
  islandName: string,
  detail: string,
): void => {
  if (!warnedInvalidAttributeIslandNames.has(islandName)) {
    warnedInvalidAttributeIslandNames.add(islandName)
    console.warn(
      `[@foldkit/markdown] Invalid attributes for island "${islandName}", so it renders nothing. ` +
        `Compile with the markdown plugin's islands option to catch this at build time. ${detail}`,
    )
  }
}

const warnedIslandNames = new Set<string>()

export const warnMissingIslandOnce = (islandName: string): void => {
  if (!warnedIslandNames.has(islandName)) {
    warnedIslandNames.add(islandName)
    console.warn(
      `[@foldkit/markdown] No island view registered for "${islandName}", so it renders nothing. ` +
        'Add it to the islands record passed to Markdown.view.',
    )
  }
}
