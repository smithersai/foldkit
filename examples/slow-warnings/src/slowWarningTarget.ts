// Effect-free: the raw DOM event target the example dispatches its slow
// warnings through; VibeLang code reaches the platform only through services.
export const createSlowWarningTarget = (): EventTarget => new EventTarget()
