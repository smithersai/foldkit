import { Context, Effect } from "effect";
declare const Dispatch_base: Context.ServiceClass<Dispatch, "@foldkit/Dispatch", {
    readonly dispatchAsync: (message: unknown) => Effect.Effect<void>;
    readonly dispatchSync: (message: unknown) => void;
}>;
/** Effect service tag that provides message dispatching to the view layer. */
export declare class Dispatch extends Dispatch_base {
}
export {};
