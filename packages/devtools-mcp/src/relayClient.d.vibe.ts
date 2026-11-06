import { Effect, Option } from 'effect';
import type { Cause } from 'effect';
import { Request, type Response, type RuntimeInfo } from 'foldkit/devtools-protocol';
import type { RelayTarget } from './relayLocation.vibe';
export type ListedRuntime = Readonly<{
    runtime: typeof RuntimeInfo.Type;
    maybeProjectRoot: Option.Option<string>;
}>;
/**
 * Connects MCP tool calls to the DevTools relays for a project.
 *
 * Each call checks the registry, connects to matching relays, and lists their
 * Runtimes before routing a request. It closes connections to relays that are
 * no longer published. Concurrent calls share one registry lookup. A dev server
 * started or restarted after the previous call is reached on the next one.
 *
 * `listRuntimes` returns Runtimes from every connected relay, oldest dev server
 * first. `sendRequest` uses the newest relay that lists the requested Runtime.
 * Without an id, it uses the most recently connected Runtime of the most
 * recently started dev server. An id that no relay lists returns an error
 * without waiting for the request timeout.
 *
 * Cancelling one call leaves shared discovery available to other calls. `close`
 * interrupts discovery, closes the relay connections, and fails pending
 * requests.
 */
export type RelayClient = Readonly<{
    listRuntimes: Effect.Effect<ReadonlyArray<ListedRuntime>, Error>;
    sendRequest: (request: typeof Request.Type, maybeRuntimeId: Option.Option<string>) => Effect.Effect<typeof Response.Type, Cause.TimeoutError | Error>;
    close: Effect.Effect<void>;
}>;
/**
 * Returns an error message for display. Effect's `TimeoutError` has no
 * `message`, so its string form is used instead.
 */
export declare const errorReason: (error: Error) => string;
export declare const makeRelayClient: <Services>(resolveTargets: Effect.Effect<ReadonlyArray<RelayTarget>, never, Services>) => Effect.Effect<RelayClient, never, Services>;
