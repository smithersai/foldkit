import { Context, Effect, Option, Schema, Stream } from 'effect';
/** Type-level brand for inbound Port values. */
export declare const InboundTypeId: unique symbol;
/** Type-level brand for inbound Port values. */
export type InboundTypeId = typeof InboundTypeId;
/** Type-level brand for outbound Port values. */
export declare const OutboundTypeId: unique symbol;
/** Type-level brand for outbound Port values. */
export type OutboundTypeId = typeof OutboundTypeId;
/**
 * A typed channel for values flowing from the host into the app. The app
 * consumes the decoded values as a Subscription source via `Port.stream` or
 * `Port.subscriptionEntry`; the host pushes encoded values through the
 * `EmbedHandle` returned by `Runtime.embed`. Create with `Port.inbound`.
 */
export interface Inbound<Value, Encoded> {
    readonly [InboundTypeId]: InboundTypeId;
    readonly schema: Schema.Codec<Value, Encoded>;
}
/**
 * A typed channel for values flowing from the app out to the host. The app
 * emits values with `Port.emit` inside its own Commands; the host listens
 * through the `EmbedHandle` returned by `Runtime.embed`. Create with
 * `Port.outbound`.
 */
export interface Outbound<Value, Encoded> {
    readonly [OutboundTypeId]: OutboundTypeId;
    readonly schema: Schema.Codec<Value, Encoded>;
}
/**
 * The Ports record passed to `makeApplication` or `makeElement` via the
 * `ports` config field. Record keys name the ports; the names appear on the
 * `EmbedHandle` and in boundary error messages.
 */
export type Ports = Readonly<{
    inbound?: Readonly<Record<string, Inbound<any, any>>>;
    outbound?: Readonly<Record<string, Outbound<any, any>>>;
}>;
/**
 * Declares an inbound Port carrying values of the given Schema. The host
 * sends values in the Schema's Encoded form; they are validated by decoding
 * at the boundary, so only well-formed `Value`s ever reach the app.
 *
 * @example
 * ```ts
 * export const ports = {
 *   inbound: { stepChanged: Port.inbound(Schema.Number) },
 *   outbound: { countChanged: Port.outbound(Schema.Number) },
 * }
 * ```
 */
export declare const inbound: <Value, Encoded>(schema: Schema.Codec<Value, Encoded>) => Inbound<Value, Encoded>;
/**
 * Declares an outbound Port carrying values of the given Schema. The app
 * emits `Value`s with `Port.emit`; they are encoded at the boundary, so host
 * listeners receive the Schema's Encoded form.
 *
 * @example
 * ```ts
 * export const ports = {
 *   inbound: { stepChanged: Port.inbound(Schema.Number) },
 *   outbound: { countChanged: Port.outbound(Schema.Number) },
 * }
 * ```
 */
export declare const outbound: <Value, Encoded>(schema: Schema.Codec<Value, Encoded>) => Outbound<Value, Encoded>;
/** Per-runtime-instance channel for one inbound Port. Values sent before the
 *  app's first `Port.stream` for the Port attaches are kept in order and
 *  delivered to that first attach; afterwards values go to every attached
 *  stream, and values sent while none is attached are dropped (matching
 *  gated-Subscription semantics). Internal to the runtime. */
export type __InboundChannel = Readonly<{
    deliver: (value: unknown) => void;
    attach: (push: (value: unknown) => void) => () => void;
}>;
/** The per-runtime-instance Port wiring read by `Port.stream` and
 *  `Port.emit`. Internal to the runtime. */
export type __PortChannels = Readonly<{
    isConfigured: boolean;
    lookupInbound: (port: Inbound<any, any>) => Option.Option<__InboundChannel>;
    lookupOutbound: (port: Outbound<any, any>) => Option.Option<(encodedValue: unknown) => void>;
}>;
/** Reference through which the runtime provides the current instance's Port
 *  wiring to Subscription Streams and Command Effects. A Reference has a
 *  default value, so reading it never adds a service requirement; the default
 *  marks Ports as unconfigured. Internal to the runtime. */
export declare const __CurrentPortChannels: Context.Reference<Readonly<{
    isConfigured: boolean;
    lookupInbound: (port: Inbound<any, any>) => Option.Option<__InboundChannel>;
    lookupOutbound: (port: Outbound<any, any>) => Option.Option<(encodedValue: unknown) => void>;
}>>;
/** Creates the channel for one inbound Port. Internal to the runtime. */
export declare const __makeInboundChannel: () => __InboundChannel;
/**
 * The decoded values arriving on an inbound Port, as a Stream. This is the
 * atomic primitive for consuming a Port inside a Subscription entry; reach
 * for `Port.subscriptionEntry` when you want the common always-on form. Values
 * sent while no Stream for the Port is running are dropped, except for
 * values sent before the first Stream attaches, which are buffered and
 * delivered to it in order (so host sends issued right after `Runtime.embed`
 * are not lost during startup).
 */
export declare const stream: <Value, Encoded>(port: Inbound<Value, Encoded>) => Stream.Stream<Value>;
/**
 * Builds a Subscription entry that wraps every decoded value arriving on an
 * inbound Port into a Message. The entry has no Model dependencies of its own,
 * though a parent can gate it when lifting the Subscription. Pass it as an
 * entry value inside `Subscription.make`. For an entry gated by its own Model,
 * build one from `Port.stream`.
 *
 * @example
 * ```ts
 * const subscriptions = Subscription.make<Model, Message>()(_entry => ({
 *   hostStep: Port.subscriptionEntry(ports.inbound.stepChanged, step =>
 *     ChangedStep({ step }),
 *   ),
 * }))
 * ```
 */
export declare const subscriptionEntry: <Value, Encoded, Message>(port: Inbound<Value, Encoded>, toMessage: (value: Value) => Message) => import("../subscription/subscription.js").EntryWithoutKeepAlive<unknown, Message, Record<string, never>, never>;
/**
 * Emits a value on an outbound Port. The value is encoded against the Port's
 * Schema and delivered to every host listener subscribed through the
 * `EmbedHandle`. Compose it into the app's own Commands like any other
 * Effect:
 *
 * ```ts
 * const ReportCount = Command.define('ReportCount', {
 *   args: { count: Schema.Number },
 *   messages: [CompletedReportCount],
 *   execute: ({ count }) =>
 *     Port.emit(ports.outbound.countChanged, count).pipe(
 *       Effect.as(CompletedReportCount()),
 *     ),
 * })
 * ```
 *
 * When the program runs without an embed handle (started with `Runtime.run`),
 * emitting is a no-op.
 */
export declare const emit: <Value, Encoded>(port: Outbound<Value, Encoded>, value: Value) => Effect.Effect<void>;
