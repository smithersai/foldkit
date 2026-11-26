// Serialized by Playwright; runs in its remote browser document.
export const coverPngInBrowser = async ({
  source,
  targetHeight,
  targetWidth,
}: {
  source: string
  targetHeight: number
  targetWidth: number
}) => {
  const image = new Image()
  image.src = source
  await image.decode()
  if (image.naturalWidth === 0 || image.naturalHeight === 0) {
    throw new Error('Cover image decoded with no intrinsic dimensions.')
  }
  const canvas = document.createElement('canvas')
  canvas.width = targetWidth
  canvas.height = targetHeight
  const context = canvas.getContext('2d')
  if (context === null) {
    throw new Error('Canvas 2d context is unavailable.')
  }
  const scale = Math.max(
    targetWidth / image.naturalWidth,
    targetHeight / image.naturalHeight,
  )
  const drawWidth = image.naturalWidth * scale
  const drawHeight = image.naturalHeight * scale
  context.drawImage(
    image,
    (targetWidth - drawWidth) / 2,
    (targetHeight - drawHeight) / 2,
    drawWidth,
    drawHeight,
  )
  const pngPrefix = 'data:image/png;base64,'
  return canvas.toDataURL('image/png').slice(pngPrefix.length)
}
