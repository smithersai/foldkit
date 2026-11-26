// These checks retain the host constructor lookup at the original call site.
export const isCanvasElement = (value: unknown): value is HTMLCanvasElement =>
  value instanceof HTMLCanvasElement
