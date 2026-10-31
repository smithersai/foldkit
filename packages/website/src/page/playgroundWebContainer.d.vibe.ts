import { Deferred, Effect, Fiber, FiberMap, Ref } from "effect";
import type { WebContainer, WebContainerProcess } from '@webcontainer/api';
declare const WebContainerError_base: new <A extends Record<string, any> = {}>(args: import("effect/Types").VoidIfEmpty<{ readonly [P in keyof A as P extends "_tag" ? never : P]: A[P]; }>) => import("effect/Cause").YieldableError & {
    readonly _tag: "WebContainerError";
} & Readonly<A>;
declare class WebContainerError extends WebContainerError_base<{
    readonly message: string;
    readonly cause?: unknown;
}> {
}
export declare const PROCESS_OUTPUT_TAIL_CHARACTERS = 32768;
type ProcessHost = Readonly<{
    spawn: (command: string, args: Array<string>) => Promise<WebContainerProcess>;
}>;
type ServerHost = ProcessHost & Readonly<{
    on: (event: 'server-ready', listener: (port: number, url: string) => void) => () => void;
}>;
export type PlaygroundWebContainer = Readonly<{
    container: WebContainer;
    previewUrl: string;
    pendingWrites: FiberMap.FiberMap<string, void, never>;
    serverFailure: Deferred.Deferred<never, Error>;
}>;
export declare const reasonFromError: (error: unknown) => string;
export declare const appendProcessOutputTail: (current: string, chunk: string) => string;
export declare function captureProcessOutput(output: ReadableStream<string>, label: string): Effect.Effect<{
    tail: Ref.Ref<string>;
    fiber: Fiber.Fiber<void, WebContainerError>;
}, never, import("effect/Scope").Scope>;
export declare function installDependencies(container: ProcessHost): Effect.Effect<void, WebContainerError, never>;
export declare function startDevServer(container: ServerHost): Effect.Effect<{
    previewUrl: string;
    serverFailure: Deferred.Deferred<never, Error>;
}, Error | WebContainerError, import("effect/Scope").Scope>;
export declare function acquirePlaygroundWebContainer(files: Readonly<Record<string, string>>): Effect.Effect<{
    container: WebContainer;
    previewUrl: string;
    pendingWrites: FiberMap.FiberMap<string, void, never>;
    serverFailure: Deferred.Deferred<never, Error>;
}, Error | WebContainerError, import("effect/Scope").Scope>;
export {};
