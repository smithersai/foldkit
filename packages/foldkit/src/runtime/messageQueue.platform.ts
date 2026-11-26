// NOTE: raw platform access for messageQueue.vibe: the drain budget
// reads the high-resolution clock and defers to a MessageChannel task, which
// no Effect service covers yet, so these calls stay here unchanged.

export type DeferredDrainChannel = Readonly<{
  channel: MessageChannel
  post: () => void
}>

export const nowMs = (): number => performance.now()

/** @throws {never} */
export const makeDeferredDrainChannel = (
  onMessage: () => void,
): DeferredDrainChannel => {
  const channel = new MessageChannel()
  channel.port2.onmessage = onMessage
  return {
    channel,
    post: () => {
      channel.port1.postMessage(null)
    },
  }
}

/** @throws {never} */
export const closeDeferredDrainChannel = ({
  channel,
}: DeferredDrainChannel): void => {
  channel.port1.close()
  channel.port2.close()
}
