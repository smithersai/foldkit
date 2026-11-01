export const getDocument = (): Document => document

export const createMutationObserver = (
  onMutation: () => void,
): MutationObserver => new MutationObserver(onMutation)
