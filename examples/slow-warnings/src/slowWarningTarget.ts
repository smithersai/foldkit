// Effect-free: the raw DOM event target the example dispatches its slow
// warnings through; VibeLang code reaches the platform only through services.
export const createSlowWarningTarget = (): EventTarget => new EventTarget()

export const createSlowWarningEvent = <Detail>(
  type: string,
  detail: Detail,
): CustomEvent<Detail> => new CustomEvent(type, { detail })
