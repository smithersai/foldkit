import { Effect, Schema } from 'effect';
import { Command, Runtime, type Update } from 'foldkit';
import { Document, HtmlBuilder } from 'foldkit/html';
export declare const EditingState: import("foldkit/schema").TaggedUnion<{
    readonly NotEditing: {};
    readonly Editing: {
        id: Schema.String;
        text: Schema.String;
    };
}>;
export type EditingState = typeof EditingState.Type;
export declare const Model: Schema.Struct<{
    readonly todos: Schema.$Array<Schema.Struct<{
        readonly id: Schema.String;
        readonly text: Schema.String;
        readonly completed: Schema.Boolean;
        readonly createdAt: Schema.Number;
    }>>;
    readonly newTodoText: Schema.String;
    readonly filter: Schema.Literals<readonly ["All", "Active", "Completed"]>;
    readonly editing: import("foldkit/schema").TaggedUnion<{
        readonly NotEditing: {};
        readonly Editing: {
            id: Schema.String;
            text: Schema.String;
        };
    }>;
}>;
export type Model = typeof Model.Type;
export declare const Message: import("foldkit/message").MessageUnion<{
    readonly UpdatedNewTodo: {
        text: Schema.String;
    };
    readonly UpdatedEditingTodo: {
        text: Schema.String;
    };
    readonly AddedTodo: {};
    readonly CompletedGenerateTodo: {
        id: Schema.String;
        timestamp: Schema.Number;
        text: Schema.String;
    };
    readonly DeletedTodo: {
        id: Schema.String;
    };
    readonly ToggledTodo: {
        id: Schema.String;
    };
    readonly StartedEditing: {
        id: Schema.String;
    };
    readonly SavedEdit: {};
    readonly CancelledEdit: {};
    readonly ToggledAll: {};
    readonly ClearedCompleted: {};
    readonly SelectedFilter: {
        filter: Schema.Literals<readonly ["All", "Active", "Completed"]>;
    };
    readonly SucceededSaveTodos: {
        todos: Schema.$Array<Schema.Struct<{
            readonly id: Schema.String;
            readonly text: Schema.String;
            readonly completed: Schema.Boolean;
            readonly createdAt: Schema.Number;
        }>>;
    };
    readonly FailedSaveTodos: {};
}>;
export type Message = typeof Message.Type;
export declare const Flags: Schema.Struct<{
    readonly todos: Schema.Option<Schema.$Array<Schema.Struct<{
        readonly id: Schema.String;
        readonly text: Schema.String;
        readonly completed: Schema.Boolean;
        readonly createdAt: Schema.Number;
    }>>>;
}>;
export type Flags = typeof Flags.Type;
export declare const init: Runtime.ApplicationInit<Model, Message, Flags>;
export declare const update: (model: Model, message: Message) => Readonly<{
    model: {
        readonly todos: readonly {
            readonly id: string;
            readonly text: string;
            readonly completed: boolean;
            readonly createdAt: number;
        }[];
        readonly newTodoText: string;
        readonly filter: "Active" | "All" | "Completed";
        readonly editing: {
            readonly _tag: "NotEditing";
        } | {
            readonly _tag: "Editing";
            readonly id: string;
            readonly text: string;
        };
    };
    commands?: Update.Commands<{
        readonly _tag: "AddedTodo";
    } | {
        readonly _tag: "CancelledEdit";
    } | {
        readonly _tag: "ClearedCompleted";
    } | {
        readonly _tag: "FailedSaveTodos";
    } | {
        readonly _tag: "SavedEdit";
    } | {
        readonly _tag: "ToggledAll";
    } | {
        readonly _tag: "CompletedGenerateTodo";
        readonly id: string;
        readonly timestamp: number;
        readonly text: string;
    } | {
        readonly _tag: "DeletedTodo";
        readonly id: string;
    } | {
        readonly _tag: "SelectedFilter";
        readonly filter: "Active" | "All" | "Completed";
    } | {
        readonly _tag: "StartedEditing";
        readonly id: string;
    } | {
        readonly _tag: "SucceededSaveTodos";
        readonly todos: readonly {
            readonly id: string;
            readonly text: string;
            readonly completed: boolean;
            readonly createdAt: number;
        }[];
    } | {
        readonly _tag: "ToggledTodo";
        readonly id: string;
    } | {
        readonly _tag: "UpdatedEditingTodo";
        readonly text: string;
    } | {
        readonly _tag: "UpdatedNewTodo";
        readonly text: string;
    }, never>;
    outMessage?: never;
}>;
export declare const GenerateTodo: Command.CommandDefinitionWithArgs<"GenerateTodo", {
    text: Schema.String;
}, Effect.Effect<{
    readonly _tag: "CompletedGenerateTodo";
    readonly id: string;
    readonly timestamp: number;
    readonly text: string;
}, never, never>>;
export declare const SaveTodos: Command.CommandDefinitionWithArgs<"SaveTodos", {
    todos: Schema.$Array<Schema.Struct<{
        readonly id: Schema.String;
        readonly text: Schema.String;
        readonly completed: Schema.Boolean;
        readonly createdAt: Schema.Number;
    }>>;
}, Effect.Effect<{
    readonly _tag: "FailedSaveTodos";
} | {
    readonly _tag: "SucceededSaveTodos";
    readonly todos: readonly {
        readonly id: string;
        readonly text: string;
        readonly completed: boolean;
        readonly createdAt: number;
    }[];
}, never, never>>;
export declare const view: (model: Model, h: HtmlBuilder<Message>) => Document;
export declare const flags: Effect.Effect<Flags>;
