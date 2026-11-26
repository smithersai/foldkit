// NOTE: raw platform access for parser.vibe: the development-only
// warning reads Vite's HMR flag and writes to the console, which no Effect
// service covers yet, so it stays here unchanged.

/** @throws {never} */
export const warnIfNotSingleSegment = (
  name: string,
  segment: string,
  isSingleSegment: boolean,
): void => {
  if (import.meta.hot && !isSingleSegment) {
    console.warn(
      `[foldkit] schemaSegment('${name}') encoded to '${segment}', which is not ` +
        'a single URL segment. Parsing re-splits the path on slashes and drops ' +
        'empty pieces, so this value will not round-trip. Encode to one ' +
        'non-empty, slash-free segment, or use rest for multi-segment values.',
    )
  }
}
