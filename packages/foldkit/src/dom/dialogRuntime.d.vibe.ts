import { Context } from "effect";
declare const DialogRuntime_base: Context.ServiceClass<DialogRuntime, "@foldkit/DialogRuntime", {
    readonly register: (id: string) => void;
    readonly unregister: (id: string) => void;
}>;
export declare class DialogRuntime extends DialogRuntime_base {
}
export {};
