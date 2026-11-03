import { Effect, Schema } from "effect";
/** Browser → plugin: the runtime preserves its current Model under a stable id so it can be restored after a full reload. `isReloadFlush` is set by the runtime when flushing on `vite:beforeFullReload` to mark the entry as eligible for restoration; absent or `false` for ordinary debounced preserves. */
export declare const PreserveModelMessage: Schema.Struct<{
    readonly id: Schema.String;
    readonly model: Schema.Unknown;
    readonly isReloadFlush: Schema.optional<Schema.Boolean>;
}>;
export type PreserveModelMessage = typeof PreserveModelMessage.Type;
/** Browser → plugin: the runtime requests its previously-preserved Model on startup, scoped by id. */
export declare const RequestModelMessage: Schema.Struct<{
    readonly id: Schema.String;
}>;
export type RequestModelMessage = typeof RequestModelMessage.Type;
/** Plugin → browser: the plugin returns the preserved Model for a given runtime id. `model` is omitted when nothing is preserved (cold start, manual refresh). */
export declare const RestoreModelMessage: Schema.Struct<{
    readonly id: Schema.String;
    readonly model: Schema.optional<Schema.Unknown>;
}>;
export type RestoreModelMessage = typeof RestoreModelMessage.Type;
/** The Vite hot context of the module that owns the protocol's listeners. Vite ties a context's listeners to the module that read `import.meta.hot`, so the owner passes its context in and this module never reads one. */
type HotContext = NonNullable<ImportMeta['hot']>;
/** Browser → plugin through `hot`, the owning module's Vite hot context: preserves the Model under `id`. */
export declare const preserveModelThrough: (hot: HotContext, id: string, encodedModel: unknown, isReloadFlush: boolean) => void;
/** The restore result of a module without a Vite hot context: nothing is preserved. */
export declare function absentPreservedModel(): Effect.Effect<unknown>;
export declare function requestPreservedModel(hot: HotContext, runtimeId: string): Effect.Effect<unknown>;
export {};
