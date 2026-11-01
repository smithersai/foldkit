import { Schema } from 'effect';
import { LoggedIn, LoggedOut } from './page/index.js';
export declare const Model: Schema.Union<readonly [import("foldkit/schema").CallableTaggedStruct<"LoggedOut", {
    route: Schema.Union<readonly [Schema.TaggedStruct<"Home", {}> & ((value?: void | {
        readonly _tag?: "Home";
    } | undefined) => {
        readonly _tag: "Home";
    }), Schema.TaggedStruct<"Login", {}> & ((value?: void | {
        readonly _tag?: "Login";
    } | undefined) => {
        readonly _tag: "Login";
    }), Schema.TaggedStruct<"NotFound", {
        readonly path: Schema.String;
    }> & ((value: {
        readonly _tag?: "NotFound";
        readonly path: string;
    }) => {
        readonly _tag: "NotFound";
        readonly path: string;
    })]>;
    loginModel: Schema.Struct<{
        readonly email: Schema.Union<readonly [Schema.TaggedStruct<"NotValidated", {
            readonly value: Schema.Codec<string, string, never, never>;
        }>, Schema.TaggedStruct<"Validating", {
            readonly value: Schema.Codec<string, string, never, never>;
        }>, Schema.TaggedStruct<"Valid", {
            readonly value: Schema.Codec<string, string, never, never>;
        }>, Schema.TaggedStruct<"Invalid", {
            readonly value: Schema.Codec<string, string, never, never>;
            readonly errors: Schema.NonEmptyArray<Schema.String>;
        }>]>;
        readonly password: Schema.Union<readonly [Schema.TaggedStruct<"NotValidated", {
            readonly value: Schema.Codec<string, string, never, never>;
        }>, Schema.TaggedStruct<"Validating", {
            readonly value: Schema.Codec<string, string, never, never>;
        }>, Schema.TaggedStruct<"Valid", {
            readonly value: Schema.Codec<string, string, never, never>;
        }>, Schema.TaggedStruct<"Invalid", {
            readonly value: Schema.Codec<string, string, never, never>;
            readonly errors: Schema.NonEmptyArray<Schema.String>;
        }>]>;
        readonly isSubmitting: Schema.Boolean;
    }>;
}>, import("foldkit/schema").CallableTaggedStruct<"LoggedIn", {
    route: Schema.Union<readonly [Schema.TaggedStruct<"Dashboard", {}> & ((value?: void | {
        readonly _tag?: "Dashboard";
    } | undefined) => {
        readonly _tag: "Dashboard";
    }), Schema.TaggedStruct<"Settings", {}> & ((value?: void | {
        readonly _tag?: "Settings";
    } | undefined) => {
        readonly _tag: "Settings";
    }), Schema.TaggedStruct<"NotFound", {
        readonly path: Schema.String;
    }> & ((value: {
        readonly _tag?: "NotFound";
        readonly path: string;
    }) => {
        readonly _tag: "NotFound";
        readonly path: string;
    })]>;
    session: Schema.Struct<{
        readonly userId: Schema.String;
        readonly email: Schema.String;
        readonly name: Schema.String;
    }>;
}>]>;
export type Model = typeof Model.Type;
export { LoggedOut, LoggedIn };
