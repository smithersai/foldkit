import { Context, Effect, HashSet, Option, Schema } from 'effect';
import * as Command from 'foldkit/command';
import { type DevToolsStore } from 'foldkit/devtools-host';
import type { DevToolsMode, DevToolsPosition } from 'foldkit/runtime';
declare const StoreService_base: Context.ServiceClass<StoreService, "foldkit/DevToolsStore", DevToolsStore>;
declare class StoreService extends StoreService_base {
}
declare const ShadowRootService_base: Context.ServiceClass<ShadowRootService, "foldkit/DevToolsShadowRoot", ShadowRoot>;
declare class ShadowRootService extends ShadowRootService_base {
}
export declare const LockScroll: Command.CommandDefinitionNoArgs<"LockScroll", Effect.Effect<{
    readonly _tag: "CompletedLockScroll";
}, never, never>>;
export declare const UnlockScroll: Command.CommandDefinitionNoArgs<"UnlockScroll", Effect.Effect<{
    readonly _tag: "CompletedUnlockScroll";
}, never, never>>;
export declare const PersistDevToolsState: Command.CommandDefinitionWithArgs<"PersistDevToolsState", {
    isOpen: Schema.Boolean;
    isFlattened: Schema.Boolean;
}, Effect.Effect<{
    readonly _tag: "CompletedPersistDevToolsState";
}, never, never>>;
export declare const JumpToAndInspect: Command.CommandDefinitionWithArgs<"JumpToAndInspect", {
    index: Schema.Number;
}, Effect.Effect<{
    readonly _tag: "ReceivedInspectedState";
    readonly model: unknown;
    readonly maybeMessage: Option.Option<unknown>;
    readonly changedPaths: HashSet.HashSet<string>;
    readonly affectedPaths: HashSet.HashSet<string>;
}, never, StoreService>>;
export declare const InspectState: Command.CommandDefinitionWithArgs<"InspectState", {
    index: Schema.Number;
}, Effect.Effect<{
    readonly _tag: "ReceivedInspectedState";
    readonly model: unknown;
    readonly maybeMessage: Option.Option<unknown>;
    readonly changedPaths: HashSet.HashSet<string>;
    readonly affectedPaths: HashSet.HashSet<string>;
}, never, StoreService>>;
export declare const InspectLatest: Command.CommandDefinitionNoArgs<"InspectLatest", Effect.Effect<{
    readonly _tag: "ReceivedInspectedState";
    readonly model: unknown;
    readonly maybeMessage: Option.Option<unknown>;
    readonly changedPaths: HashSet.HashSet<string>;
    readonly affectedPaths: HashSet.HashSet<string>;
}, never, StoreService>>;
export declare const Resume: Command.CommandDefinitionNoArgs<"Resume", Effect.Effect<{
    readonly _tag: "CompletedResume";
}, never, StoreService>>;
export declare const Clear: Command.CommandDefinitionNoArgs<"Clear", Effect.Effect<{
    readonly _tag: "CompletedClear";
}, never, StoreService>>;
export declare const CopyPayloadToClipboard: Command.CommandDefinitionWithArgs<"CopyPayloadToClipboard", {
    targetId: Schema.String;
    requestId: Schema.Number;
    payload: Schema.Unknown;
}, Effect.Effect<{
    readonly _tag: "FailedCopyPayloadToClipboard";
    readonly targetId: string;
    readonly requestId: number;
} | {
    readonly _tag: "SucceededCopyPayloadToClipboard";
    readonly targetId: string;
    readonly requestId: number;
}, never, never>>;
export declare const WaitBeforeHidingCopyIndicator: Command.CommandDefinitionWithArgs<"WaitBeforeHidingCopyIndicator", {
    targetId: Schema.String;
    requestId: Schema.Number;
}, Effect.Effect<{
    readonly _tag: "CompletedWaitBeforeHidingCopyIndicator";
    readonly targetId: string;
    readonly requestId: number;
}, never, never>>;
export declare const ScrollToTop: Command.CommandDefinitionNoArgs<"ScrollToTop", Effect.Effect<{
    readonly _tag: "CompletedScrollToTop";
}, never, ShadowRootService>>;
export declare const createOverlay: (store: DevToolsStore, position: DevToolsPosition, mode: DevToolsMode, maybeBanner: Option.Option<string>) => Effect.Effect<void, never, import("effect/Scope").Scope>;
export {};
