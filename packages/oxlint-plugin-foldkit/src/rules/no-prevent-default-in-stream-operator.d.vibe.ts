/**
 * Flags `event.preventDefault()` inside callbacks passed to Stream operators
 * (`Stream.map`, `Stream.mapEffect`, `Stream.filterMap`,
 * `Stream.filterMapEffect`, `Stream.filter`, `Stream.filterEffect`,
 * `Stream.tap`).
 * Those callbacks do not reliably run inside the browser's event dispatch.
 * For a DOM-event Stream, cancellation belongs inside the native listener,
 * which is where `Dom.streamFromEventFilterMapPreventDefault` runs its
 * mapper.
 */
export declare const noPreventDefaultInStreamOperator: import("effect-oxlint").CreateRule;
