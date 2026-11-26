type ReadMode = 'text' | 'dataUrl' | 'arrayBuffer'
export const startFileRead = <Result>(
  file: globalThis.File,
  mode: ReadMode,
  extract: (reader: FileReader) => Result | null,
  succeed: (result: Result) => void,
  fail: (reason: string) => void,
  signal: AbortSignal,
): void => {
  const reader = new FileReader()
  const handleLoad = () => {
    const extracted = extract(reader)
    if (extracted === null) {
      fail(`FileReader returned an unexpected result type for mode "${mode}"`)
    } else {
      succeed(extracted)
    }
  }
  const handleError = () => {
    const reason = reader.error?.message ?? 'Unknown FileReader error'
    fail(reason)
  }
  reader.addEventListener('load', handleLoad)
  reader.addEventListener('error', handleError)
  signal.addEventListener('abort', () => {
    reader.abort()
  })
  try {
    if (mode === 'text') {
      reader.readAsText(file)
    } else if (mode === 'dataUrl') {
      reader.readAsDataURL(file)
    } else {
      reader.readAsArrayBuffer(file)
    }
  } catch (thrown) {
    const reason = thrown instanceof Error ? thrown.message : String(thrown)
    fail(reason)
  }
}
