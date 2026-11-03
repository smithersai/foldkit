import { Data, Effect, Queue } from 'effect';
import { SecureRandom } from 'effect/crypto';
import type { ViteDevServer, WebSocketClient } from 'vite';
import { type WebSocket } from 'ws';
import type { FoldkitPluginOptions } from './index.ts';
export type Event = Data.TaggedEnum<{
    PreserveModelReceived: {
        payload: unknown;
    };
    RequestModelReceived: {
        payload: unknown;
    };
    BrowserEventFrameReceived: {
        data: unknown;
        client: WebSocketClient;
    };
    BrowserResponseFrameReceived: {
        data: unknown;
    };
    ViteClientClosed: {
        client: WebSocketClient;
    };
    HotUpdateFired: {};
    McpClientConnected: {
        client: WebSocket;
    };
    McpClientDisconnected: {
        client: WebSocket;
    };
    McpRequestReceived: {
        client: WebSocket;
        raw: string;
    };
}>;
export declare const Event: Data.TaggedEnum.Constructor<{
    readonly _tag: "BrowserEventFrameReceived";
    readonly data: unknown;
    readonly client: WebSocketClient;
} | {
    readonly _tag: "BrowserResponseFrameReceived";
    readonly data: unknown;
} | {
    readonly _tag: "HotUpdateFired";
} | {
    readonly _tag: "McpClientConnected";
    readonly client: WebSocket;
} | {
    readonly _tag: "McpClientDisconnected";
    readonly client: WebSocket;
} | {
    readonly _tag: "McpRequestReceived";
    readonly client: WebSocket;
    readonly raw: string;
} | {
    readonly _tag: "PreserveModelReceived";
    readonly payload: unknown;
} | {
    readonly _tag: "RequestModelReceived";
    readonly payload: unknown;
} | {
    readonly _tag: "ViteClientClosed";
    readonly client: WebSocketClient;
}>;
/**
 * The dev server program: Model preservation across reloads and, unless the
 * plugin disables it or Vitest runs, the DevTools MCP relay. It runs until
 * the fiber that started it is interrupted, in the scope that owns the relay.
 *
 * @internal
 */
export declare const main: (server: ViteDevServer, events: Queue.Queue<Event>, options: FoldkitPluginOptions) => Effect.Effect<void, never, import("effect/process/ChildProcessSpawner").ChildProcessSpawner | import("effect/FileSystem").FileSystem | import("effect/Path").Path | import("vibelang-runtime/experimental/Process").Process | import("effect/Scope").Scope | SecureRandom.SecureRandom>;
