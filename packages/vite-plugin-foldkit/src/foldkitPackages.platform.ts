// The platform code of foldkitPackages.vibe, which a .vibe file does not import as a value (EK4402).

import { realpathSync } from 'node:fs'
import { resolve } from 'node:path'

export const toRealPath = (path: string): string => {
  try {
    return realpathSync(path)
  } catch {
    return path
  }
}
export const toCrawlRoot = (
  root: string,
  isPreservingSymlinks: boolean,
): string => {
  const absoluteRoot = resolve(root)

  // NOTE: The crawl and the dedupe lookup must start from the root Vite
  // resolves from: the path as given under resolve.preserveSymlinks, and its
  // realpath otherwise. Any other root makes them walk a different directory
  // chain than Vite's resolver.
  if (isPreservingSymlinks) {
    return absoluteRoot
  }

  return toRealPath(absoluteRoot)
}
