import { Exit, Option, Schema } from 'effect';
import { type Inbound, type Outbound, type Ports, type __PortChannels } from '../port/index.js';
/** Host-side handle for one inbound Port. `send` validates the value by
 *  decoding it against the Port's Schema: on success the decoded value enters
 *  the app through the Port's Subscription; on failure nothing reaches the
 *  app, the failure is logged, and the returned `Exit` carries the
 *  `SchemaError`. Sends after `dispose` are no-ops. */
export type InboundPortHandle<Encoded> = Readonly<{
    send: (value: Encoded) => Exit.Exit<void, Schema.SchemaError>;
}>;
/** Host-side handle for one outbound Port. `subscribe` registers a listener
 *  for the encoded values the app emits with `Port.emit` and returns an
 *  unsubscribe function. Multiple listeners receive each value in
 *  registration order. */
export type OutboundPortHandle<Encoded> = Readonly<{
    subscribe: (listener: (value: Encoded) => void) => () => void;
}>;
/** The inbound half of `PortHandles`: one `InboundPortHandle` per declared
 *  inbound Port, keyed by Port name. */
export type InboundPortHandles<InboundPorts> = InboundPorts extends Readonly<Record<string, Inbound<any, any>>> ? {
    readonly [Name in keyof InboundPorts]: InboundPorts[Name] extends Inbound<any, infer Encoded> ? InboundPortHandle<Encoded> : never;
} : unknown;
/** The outbound half of `PortHandles`: one `OutboundPortHandle` per declared
 *  outbound Port, keyed by Port name. */
export type OutboundPortHandles<OutboundPorts> = OutboundPorts extends Readonly<Record<string, Outbound<any, any>>> ? {
    readonly [Name in keyof OutboundPorts]: OutboundPorts[Name] extends Outbound<any, infer Encoded> ? OutboundPortHandle<Encoded> : never;
} : unknown;
/** The `ports` field of an `EmbedHandle`: one `InboundPortHandle` or
 *  `OutboundPortHandle` per declared Port, keyed by Port name. */
export type PortHandles<P extends Ports | undefined> = P extends Ports ? InboundPortHandles<P['inbound']> & OutboundPortHandles<P['outbound']> : unknown;
/**
 * The handle returned by `embed`. The host talks to the embedded app only
 * through it: `ports.<name>.send` pushes values in, `ports.<name>.subscribe`
 * listens to values the app emits, and `dispose` shuts the runtime down.
 *
 * `dispose` is idempotent. It interrupts the runtime and runs all cleanup:
 * Subscriptions, ManagedResources, Mounts, listeners, and in-flight Commands
 * stop, and the rendered DOM is removed with the container element restored
 * empty in its place, ready for a fresh `embed`.
 */
export type EmbedHandle<P extends Ports | undefined = undefined> = Readonly<{
    ports: PortHandles<P>;
    dispose: () => void;
}>;
export type HostConnector = Readonly<{
    sendInbound: (portName: string, port: Inbound<any, any>, value: unknown) => Exit.Exit<void, Schema.SchemaError>;
    addListener: (port: Outbound<any, any>, listener: (encodedValue: unknown) => void) => () => void;
    deliverOutbound: (port: Outbound<any, any>, encodedValue: unknown) => void;
    bind: (deliverInbound: (port: Inbound<any, any>, value: unknown) => void) => void;
    unbind: () => void;
    dispose: () => void;
}>;
export declare const makeHostConnector: () => HostConnector;
export type PortChannelsBundle = Readonly<{
    channels: __PortChannels;
    deliverInbound: (port: Inbound<any, any>, value: unknown) => void;
}>;
export declare const makePortChannels: (ports: Ports, maybeConnector: Option.Option<HostConnector>) => PortChannelsBundle;
export declare const validatePorts: (ports: Ports) => void;
export declare const buildPortHandles: <P extends Ports | undefined>(ports: P, connector: HostConnector) => PortHandles<P>;
