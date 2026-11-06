import { Schema } from 'effect';
import { type Update } from 'foldkit';
import { PeopleRoute } from './route';
export declare const Message: import("foldkit/message").MessageUnion<{
    readonly ChangedSearchInput: {
        value: Schema.String;
    };
    readonly SubmittedSearch: {};
    readonly ChangedRoute: {
        route: any;
    };
    readonly SucceededFetchPeople: {
        query: Schema.String;
        people: Schema.$Array<Schema.Struct<{
            readonly id: Schema.Number;
            readonly name: Schema.String;
            readonly role: Schema.String;
        }>>;
    };
}>;
export type Message = typeof Message.Type;
export declare const update: (model: Model, message: Message) => Readonly<{
    model: Model;
    commands?: Update.Commands<{
        readonly _tag: "SubmittedSearch";
    } | {
        readonly _tag: "ChangedSearchInput";
        readonly value: string;
    } | {
        readonly _tag: "SucceededFetchPeople";
        readonly query: string;
        readonly people: readonly {
            readonly id: number;
            readonly name: string;
            readonly role: string;
        }[];
    } | {
        [x: string]: any;
    }, never>;
    outMessage?: never;
}>;
export declare const informRouteChanged: (model: Model, route: PeopleRoute) => Readonly<{
    model: Model;
    commands?: Update.Commands<{
        readonly _tag: "SubmittedSearch";
    } | {
        readonly _tag: "ChangedSearchInput";
        readonly value: string;
    } | {
        readonly _tag: "SucceededFetchPeople";
        readonly query: string;
        readonly people: readonly {
            readonly id: number;
            readonly name: string;
            readonly role: string;
        }[];
    } | {
        [x: string]: any;
    }, never>;
    outMessage?: never;
}>;
