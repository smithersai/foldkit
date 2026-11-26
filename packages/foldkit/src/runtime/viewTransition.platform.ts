// document.startViewTransition and the ViewTransition constructor are platform code that a .vibe
// module does not use directly, and Effect has no service for them, so the raw calls live
// here unchanged. The feature decision itself is VibeLang in viewTransition.vibe.
import type { ViewTransitionHandle } from './viewTransition.vibe'

/** Whether the running browser has `document.startViewTransition` at all. */
export const hasStartViewTransition = (): boolean =>
  typeof document.startViewTransition === 'function'

/** Whether transitions can carry types, a newer addition than the API itself. */
export const isViewTransitionTypesSupported = (): boolean =>
  typeof ViewTransition !== 'undefined' && 'types' in ViewTransition.prototype

/** Starts an untyped transition around `update`. */
export const startViewTransition = (update: () => void): ViewTransitionHandle =>
  document.startViewTransition(update)

/** Starts a transition around `update`, tagged with `types`. */
export const startTypedViewTransition = (
  update: () => void,
  types: ReadonlyArray<string>,
): ViewTransitionHandle =>
  document.startViewTransition({ update, types: [...types] })
