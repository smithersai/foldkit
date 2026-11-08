import { Option, type Stream } from 'effect'

import { invariant } from '../invariant.js'
import {
  type EventTypeOf,
  type StreamFromEventFilterMapPreventDefaultConfig,
  streamFromEventFilterMap,
} from './streamFromEvent.vibe'

/**
 * Build a Stream that emits a value for the dispatches of a DOM event the
 * mapper marks handled, calling `event.preventDefault()` on each of them,
 * registering the listener when the Stream's scope opens and removing it when
 * the scope closes.
 *
 * This is the cancelling variant of `streamFromEventFilterMap`, mirroring
 * `h.OnKeyDownPreventDefault` from `foldkit/html`. Its `filterMapEvent` returns
 * `Option.some(value)` to mark a dispatch handled. The helper evaluates the
 * mapper, calls `event.preventDefault()`, and queues the value before the
 * native listener returns. `Option.none()` leaves the default behavior intact.
 * The mapper never calls `preventDefault()` itself.
 *
 * Because cancelling is the point, the listener registers with
 * `passive: false` when the config does not say otherwise. This keeps wheel
 * and touch events cancelable when a browser would otherwise make listeners
 * on a global target passive. The config rejects `passive: true`; the runtime
 * guard also throws for unchecked JavaScript inputs.
 *
 * The target, event name, and mapper parameter are one fact: `type` is
 * constrained to the names the target declares, and the mapper receives the
 * event those two resolve to. A target with no declared event map accepts any
 * name and reports `Event`; annotate it with `TypedEventTarget` to
 * resolve its own events.
 *
 * The listener lifecycle uses `Effect.acquireRelease`. The `addEventListener`
 * call happens inside the acquire Effect, and the matching
 * `removeEventListener` is registered only after acquire completes, so the
 * listener never leaks on interruption.
 *
 * This is a Stream, not a Subscription entry. Wrap it with
 * `Subscription.persistentEntry` for a listener with no local Model dependencies,
 * or plug it into a `Subscription.make` entry's
 * `dependenciesToStream` (typically behind `Stream.when`) to gate it on a
 * Model condition. The mapper's output type is inferred (even a raw Event is
 * accepted here); `Subscription.make` checks the final Stream against the
 * application's Message type.
 *
 * @example
 * ```typescript
 * const subscriptions = Subscription.make<Model, Message>()(entry => ({
 *   wheelLock: entry(
 *     { isModalOpen: Schema.Boolean },
 *     {
 *       modelToDependencies: model => ({ isModalOpen: model.isModalOpen }),
 *       dependenciesToStream: ({ isModalOpen }) =>
 *         Stream.when(
 *           Dom.streamFromEventFilterMapPreventDefault({
 *             target: window,
 *             type: 'wheel',
 *             filterMapEvent: () => Option.some(Message.SuppressedWheelScroll()),
 *           }),
 *           Effect.sync(() => isModalOpen),
 *         ),
 *     },
 *   ),
 * }))
 * ```
 */
export const streamFromEventFilterMapPreventDefault = <
  Target extends EventTarget,
  Type extends EventTypeOf<Target>,
  Output,
>(
  config: StreamFromEventFilterMapPreventDefaultConfig<Target, Type, Output>,
): Stream.Stream<Output> => {
  const options: AddEventListenerOptions | undefined = config.options

  if (options?.passive === true) {
    invariant(
      `Foldkit: \`Dom.streamFromEventFilterMapPreventDefault\` was passed ` +
        `\`options: { passive: true }\` for a "${config.type}" listener. ` +
        `The helper exists to call \`event.preventDefault()\` on every ` +
        `dispatch the mapper marks handled, and a passive listener promises ` +
        `the browser the exact opposite: \`preventDefault()\` inside it is ` +
        `ignored and logs a console warning. Drop the \`passive\` option ` +
        `(the helper registers the listener with \`passive: false\` for ` +
        `you), or use \`Dom.streamFromEventFilterMap\` for a listener ` +
        `that only observes.`,
    )
  }

  return streamFromEventFilterMap({
    ...config,
    options: { ...options, passive: false },
    filterMapEvent: event => {
      const maybeOutput = config.filterMapEvent(event)
      if (Option.isSome(maybeOutput)) {
        event.preventDefault()
      }
      return maybeOutput
    },
  })
}
