// Raw browser operations retained while foldkit-30 lacks an injected Document API.
export const createCanvas = (gridSize: number, scale: number) => {
  const canvas = document.createElement('canvas')
  canvas.width = gridSize * scale
  canvas.height = gridSize * scale
  const context = canvas.getContext('2d')
  return { canvas, context }
}

export const drawCell = (
  context: CanvasRenderingContext2D,
  color: string,
  x: number,
  y: number,
  scale: number,
) => {
  context.fillStyle = color
  context.fillRect(x * scale, y * scale, scale, scale)
}

export const downloadCanvas = (canvas: HTMLCanvasElement) => {
  const link = document.createElement('a')
  link.download = 'pixel-art.png'
  link.href = canvas.toDataURL('image/png')
  link.click()
}
