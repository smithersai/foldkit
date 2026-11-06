// console.error and queueMicrotask are platform code that a .vibe module does not use directly
// (VIP-33); the host connector delivers to plain listeners synchronously, so the raw calls live here.

export const reportPortError = (label: string, error: unknown): void => {
  console.error(label, error)
}

export const scheduleMicrotask = (task: () => void): void => {
  queueMicrotask(task)
}
