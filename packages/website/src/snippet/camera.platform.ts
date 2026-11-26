export const acquireCamera = (facingMode: string): Promise<MediaStream> =>
  navigator.mediaDevices.getUserMedia({
    video: { facingMode },
  })

export const releaseCamera = (stream: {
  readonly getTracks: () => ReadonlyArray<{ readonly stop: () => void }>
}): void => stream.getTracks().forEach(track => track.stop())
