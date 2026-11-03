import { Schema } from 'effect';
import { Runtime, type Update } from 'foldkit';
import { Document, type HtmlBuilder } from 'foldkit/html';
declare const Todo: Schema.Struct<{
    readonly id: Schema.String;
    readonly text: Schema.String;
    readonly completed: Schema.Boolean;
}>;
export type Todo = typeof Todo.Type;
declare const Todos: Schema.$Array<Schema.Struct<{
    readonly id: Schema.String;
    readonly text: Schema.String;
    readonly completed: Schema.Boolean;
}>>;
export type Todos = typeof Todos.Type;
declare const Filter: Schema.Literals<readonly ["All", "Active", "Completed"]>;
export type Filter = typeof Filter.Type;
declare const EditingState: import("foldkit/schema").TaggedUnion<{
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
    readonly nextTodoId: Schema.Number;
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
}>;
export type Message = typeof Message.Type;
export declare const init: Runtime.ApplicationInit<Model, Message>;
type UpdateReturn = Update.Return<Model, Message>;
export declare const update: (model: Model, message: Message) => UpdateReturn;
export declare const filterTodos: (todos: Todos, filter: Filter) => Todos;
export declare const countActiveTodos: (todos: Todos) => number;
export declare const view: (model: Model, h: HtmlBuilder<Message>) => Document;
export {};
