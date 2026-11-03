// A non-consuming stdin-close observer is missing (foldkit-158).
// The native caller owns Effect resume and interruption cleanup;
// the transport remains the sole stdin consumer.
export const observeStdinClose = (
  resume: () => void,
): (() => void) | undefined => {
  if (process.stdin.readableEnded || process.stdin.destroyed) {
    resume()
    return
  }
  const detach = () => {
    process.stdin.off('end', onClose)
    process.stdin.off('close', onClose)
  }
  const onClose = () => {
    detach()
    resume()
  }
  process.stdin.on('end', onClose)
  process.stdin.on('close', onClose)
  return detach
}
