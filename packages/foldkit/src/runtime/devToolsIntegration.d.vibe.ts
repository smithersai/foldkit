import { Effect, type Scope } from 'effect';
import { type MountRecord } from '../devTools/store.vibe';
import { MountRuntime, MountTracker, type ViewState } from '../mount/index.vibe';
import { type DevToolsConfig } from './devToolsConfig.vibe';
/** The Mount starts and ends recorded since the last drain. */
export type MountEvents = Readonly<{
    starts: ReadonlyArray<MountRecord>;
    ends: ReadonlyArray<MountRecord>;
}>;
/** A Command invocation and its runtime-local identity for DevTools history. */
export type RecordableCommand = Readonly<{
    id: number;
    command: Readonly<{
        name: string;
        args?: Record<string, unknown>;
    }>;
}>;
/** The replay bridge the render side hands the store when it is installed. */
export type DevToolsRenderBridge = Readonly<{
    renderReplay: (model: unknown) => Effect.Effect<void>;
    markRenderPending: Effect.Effect<void>;
}>;
/**
 * Everything the runtime needs from DevTools, whether or not DevTools is
 * configured. The Mount tracker and runtime, the view state, and the pause
 * check exist from boot, and the tracker records only once the store
 * exists. `installDevToolsStore` creates the store, mounts the overlay,
 * and starts the WebSocket bridge once the render side can supply the
 * replay bridge, and does nothing when DevTools is off. The recording
 * helpers no-op until the store exists.
 */
export type DevToolsIntegration<Model, Message> = Readonly<{
    isRecordingCommands: boolean;
    mountTracker: typeof MountTracker.Service;
    mountRuntime: typeof MountRuntime.Service;
    drainMountEvents: () => MountEvents;
    readViewState: () => ViewState;
    setViewState: (nextViewState: ViewState) => void;
    isPausedNow: () => boolean;
    installDevToolsStore: (bridge: DevToolsRenderBridge) => Effect.Effect<void, never, Scope.Scope>;
    resumeDevTools: Effect.Effect<void>;
    recordInit: (initModel: Model, initCommands: ReadonlyArray<RecordableCommand>) => Effect.Effect<void>;
    recordMessage: (message: Message, currentModel: Model, nextModel: Model, commands: ReadonlyArray<RecordableCommand>) => void;
    recordCommandResult: (id: number, message: Message) => void;
    attachRenderedMounts: () => void;
}>;
/**
 * Builds the DevTools integration for one runtime from the `devTools`
 * config. `update` and `maybeFreezeModel` drive time-travel replay, and
 * `enqueueMessageEffect` is how Messages sent over the WebSocket bridge
 * reach the queue.
 */
export declare const makeDevToolsIntegration: <Model, Message>({ devTools, update, maybeFreezeModel, enqueueMessageEffect, }: Readonly<{
    devTools: DevToolsConfig | undefined;
    update: (model: Model, message: Message) => Readonly<{
        model: Model;
    }>;
    maybeFreezeModel: (model: Model) => Model;
    enqueueMessageEffect: (message: Message) => Effect.Effect<void>;
}>) => Effect.Effect<DevToolsIntegration<Model, Message>>;
