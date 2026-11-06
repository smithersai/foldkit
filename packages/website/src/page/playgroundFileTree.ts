import type { FileSystemTree } from '@webcontainer/api'

export const fileSystemTreeFromFiles = (
  files: Readonly<Record<string, string>>,
): FileSystemTree => {
  const tree: FileSystemTree = {}
  for (const [path, contents] of Object.entries(files)) {
    const segments = path.split('/')
    const fileName = segments.pop()
    if (fileName === undefined) {
      continue
    }

    let cursor: FileSystemTree = tree
    for (const segment of segments) {
      const existing = cursor[segment]
      if (existing === undefined) {
        const directory: FileSystemTree = {}
        cursor[segment] = { directory }
        cursor = directory
      } else if ('directory' in existing) {
        cursor = existing.directory
      } else {
        throw new Error(
          `Playground file tree conflict: ${segment} is both a file and a directory`,
        )
      }
    }

    cursor[fileName] = { file: { contents } }
  }
  return tree
}
