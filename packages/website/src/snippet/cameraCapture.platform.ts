declare const ImageCapture: new (track: MediaStreamTrack) => {
  readonly grabFrame: () => Promise<ImageBitmap>
}

export const makeImageCapture = (track: MediaStreamTrack) =>
  new ImageCapture(track)
