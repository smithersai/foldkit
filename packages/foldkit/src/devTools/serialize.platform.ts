// Preserve the original class checks, including their lookup order.
export const isFileValue = (value: unknown): value is File =>
  value instanceof File

export const isBlobValue = (value: unknown): value is Blob =>
  value instanceof Blob
