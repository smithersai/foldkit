// document.startViewTransition and the ViewTransition constructor are platform code that a .vibe
// module does not use directly (VIP-33), and Effect has no service for them, so the feature
// detection lives here unchanged.
import { Option, pipe } from 'effect'

import type { StartViewTransition } from './viewTransition.vibe'

/** Feature-detects `document.startViewTransition`, returning `Option.none()`
 *  where the API is unavailable so the runtime falls through to plain
 *  renders. Transition types are newer than the API itself, so when the
 *  running browser only supports the callback form the types are dropped and
 *  the transition still runs untyped. */
export const resolveStartViewTransition =
  (): Option.Option<StartViewTransition> => {
    if (typeof document.startViewTransition !== 'function') {
      return Option.none()
    }

    const isTypesSupported =
      typeof ViewTransition !== 'undefined' &&
      'types' in ViewTransition.prototype

    return Option.some((update, maybeTypes) =>
      pipe(
        maybeTypes,
        Option.filter(() => isTypesSupported),
        Option.match({
          onNone: () => document.startViewTransition(update),
          onSome: types =>
            document.startViewTransition({ update, types: [...types] }),
        }),
      ),
    )
  }
