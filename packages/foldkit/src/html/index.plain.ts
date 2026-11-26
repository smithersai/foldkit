import type { DispatchSync, UnmountResolver } from './runtimeSingleton.vibe'

// NOTE: synchronous VibeLang code never throws (Will, 2026-10-31). The view
// builders refuse an element the server and the client could not render the
// same way by throwing while the view is built, and the fallback dispatchers
// throw when event-bearing Html fires outside a render. Those throws live
// here, outside VibeLang, unchanged; index.vibe calls them.

/** Refuses an element description while the view is being built. */
export function refuseElement(message: string): never {
  throw new Error(message)
}

// NOTE: tolerate the absence of a runtime frame. Static elements
// (`h.code([h.Class('x')], ['text'])`) and prose fragments built at module
// top level (`const fragment = inlineCode('foo')` at import time) must
// construct without an active render frame. They never invoke the fallback
// dispatcher because they have no event handlers; event-bearing Html
// constructed outside a render reaches the fallback only at event-fire time,
// which surfaces a clear error rather than failing at import time. The
// fallbacks are module-level constants so element construction allocates no
// per-element closures for them.
export const fallbackDispatch: DispatchSync = () => {
  throw new Error(
    'Foldkit: an event-bearing Html attribute fired without an ' +
      'active runtime frame. This typically means an Html element ' +
      'with event handlers (OnClick, OnInput, etc.) was constructed ' +
      'at module top level outside of a view function.',
  )
}

export const fallbackUnmountResolver: UnmountResolver = () => () => {
  throw new Error(
    'Foldkit: an OnUnmount attribute fired without an active runtime ' +
      'frame. This typically means an Html element with OnUnmount was ' +
      'constructed at module top level outside of a view function.',
  )
}
