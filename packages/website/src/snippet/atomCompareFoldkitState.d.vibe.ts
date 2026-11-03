import { Schema } from 'effect';
import { type Update } from 'foldkit';
export declare const Model: Schema.Struct<{
    readonly todos: Schema.$Array<any>;
    readonly filter: Schema.Literals<readonly ["All", "Active", "Done"]>;
}>;
type Model = typeof Model.Type;
declare const Message: import("foldkit/message").MessageUnion<{
    readonly AddedTodo: {};
    readonly ClearedDoneTodos: {};
    readonly SelectedFilter: {
        filter: Schema.Literals<readonly ["All", "Active", "Done"]>;
    };
}>;
type Message = typeof Message.Type;
export declare const update: (model: Model, message: Message) => Readonly<{
    model: {
        readonly todos: readonly any[];
        readonly filter: "Active" | "All" | "Done";
    };
    commands?: Update.Commands<{
        readonly _tag: "AddedTodo";
    } | {
        readonly _tag: "ClearedDoneTodos";
    } | {
        readonly _tag: "SelectedFilter";
        readonly filter: "Active" | "All" | "Done";
    }, never>;
    outMessage?: never;
}>;
export {};
