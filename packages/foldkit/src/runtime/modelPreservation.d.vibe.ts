import { Schema } from "effect";
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
