// The hidden file input and its events are platform code that a .vibe module does not use
// directly, and Effect has no service for the file picker, so the raw code lives here
// unchanged.

import type { File } from './file.vibe'

/** Opens the native picker and calls `onFiles` with the selection (empty when the
 *  user cancelled). Aborting `signal` removes the input without a result. */
export const openFilePicker = (
  accept: ReadonlyArray<string>,
  multiple: boolean,
  onFiles: (files: ReadonlyArray<File>) => void,
  signal: AbortSignal,
): void => {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = accept.join(',')
  input.multiple = multiple
  input.style.display = 'none'

  const cleanup = (): void => {
    input.remove()
  }

  const handleChange = (): void => {
    const files = input.files ? Array.from(input.files) : []
    cleanup()
    onFiles(files)
  }

  const handleCancel = (): void => {
    cleanup()
    onFiles([])
  }

  input.addEventListener('change', handleChange)
  input.addEventListener('cancel', handleCancel)
  signal.addEventListener('abort', cleanup)

  document.body.appendChild(input)
  input.click()
}
