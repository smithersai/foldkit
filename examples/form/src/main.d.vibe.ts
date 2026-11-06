import { Effect, Schema } from 'effect';
import { Command, Runtime, type Update } from 'foldkit';
import { Document, HtmlBuilder } from 'foldkit/html';
export declare const Model: Schema.Struct<{
    readonly name: Schema.Union<readonly [Schema.TaggedStruct<"NotValidated", {
        readonly value: Schema.Codec<string, string, never, never>;
    }>, Schema.TaggedStruct<"Validating", {
        readonly value: Schema.Codec<string, string, never, never>;
    }>, Schema.TaggedStruct<"Valid", {
        readonly value: Schema.Codec<string, string, never, never>;
    }>, Schema.TaggedStruct<"Invalid", {
        readonly value: Schema.Codec<string, string, never, never>;
        readonly errors: Schema.NonEmptyArray<Schema.String>;
    }>]>;
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
    readonly messageText: Schema.Union<readonly [Schema.TaggedStruct<"NotValidated", {
        readonly value: Schema.Codec<string, string, never, never>;
    }>, Schema.TaggedStruct<"Validating", {
        readonly value: Schema.Codec<string, string, never, never>;
    }>, Schema.TaggedStruct<"Valid", {
        readonly value: Schema.Codec<string, string, never, never>;
    }>, Schema.TaggedStruct<"Invalid", {
        readonly value: Schema.Codec<string, string, never, never>;
        readonly errors: Schema.NonEmptyArray<Schema.String>;
    }>]>;
    readonly submission: import("foldkit/schema").TaggedUnion<{
        readonly NotSubmitted: {};
        readonly Submitting: {};
        readonly SubmitSuccess: {
            confirmationText: Schema.String;
        };
        readonly SubmitError: {
            error: Schema.String;
        };
    }>;
}>;
export type Model = typeof Model.Type;
export declare const Message: import("foldkit/message").MessageUnion<{
    readonly UpdatedName: {
        value: Schema.String;
    };
    readonly UpdatedEmail: {
        value: Schema.String;
    };
    readonly CompletedValidateEmail: {
        field: Schema.Union<readonly [Schema.TaggedStruct<"NotValidated", {
            readonly value: Schema.Codec<string, string, never, never>;
        }>, Schema.TaggedStruct<"Validating", {
            readonly value: Schema.Codec<string, string, never, never>;
        }>, Schema.TaggedStruct<"Valid", {
            readonly value: Schema.Codec<string, string, never, never>;
        }>, Schema.TaggedStruct<"Invalid", {
            readonly value: Schema.Codec<string, string, never, never>;
            readonly errors: Schema.NonEmptyArray<Schema.String>;
        }>]>;
    };
    readonly UpdatedMessageText: {
        value: Schema.String;
    };
    readonly ClickedFormSubmit: {};
    readonly SucceededSubmitForm: {
        name: Schema.String;
    };
    readonly FailedSubmitForm: {};
}>;
export type Message = typeof Message.Type;
export declare const initialModel: Model;
export declare const init: Runtime.ApplicationInit<Model, Message>;
export declare const ValidateEmail: Command.CommandDefinitionWithArgs<"ValidateEmail", {
    email: Schema.String;
}, Effect.Effect<{
    readonly _tag: "CompletedValidateEmail";
    readonly field: {
        readonly _tag: "Invalid";
        readonly value: string;
        readonly errors: readonly [string, ...string[]];
    } | {
        readonly _tag: "NotValidated";
        readonly value: string;
    } | {
        readonly _tag: "Valid";
        readonly value: string;
    } | {
        readonly _tag: "Validating";
        readonly value: string;
    };
}, never, never>>;
export declare const update: (model: Model, message: Message) => Readonly<{
    model: {
        readonly name: {
            readonly _tag: "Invalid";
            readonly value: string;
            readonly errors: readonly [string, ...string[]];
        } | {
            readonly _tag: "NotValidated";
            readonly value: string;
        } | {
            readonly _tag: "Valid";
            readonly value: string;
        } | {
            readonly _tag: "Validating";
            readonly value: string;
        };
        readonly email: {
            readonly _tag: "Invalid";
            readonly value: string;
            readonly errors: readonly [string, ...string[]];
        } | {
            readonly _tag: "NotValidated";
            readonly value: string;
        } | {
            readonly _tag: "Valid";
            readonly value: string;
        } | {
            readonly _tag: "Validating";
            readonly value: string;
        };
        readonly messageText: {
            readonly _tag: "Invalid";
            readonly value: string;
            readonly errors: readonly [string, ...string[]];
        } | {
            readonly _tag: "NotValidated";
            readonly value: string;
        } | {
            readonly _tag: "Valid";
            readonly value: string;
        } | {
            readonly _tag: "Validating";
            readonly value: string;
        };
        readonly submission: {
            readonly _tag: "NotSubmitted";
        } | {
            readonly _tag: "Submitting";
        } | {
            readonly _tag: "SubmitError";
            readonly error: string;
        } | {
            readonly _tag: "SubmitSuccess";
            readonly confirmationText: string;
        };
    };
    commands?: Update.Commands<{
        readonly _tag: "ClickedFormSubmit";
    } | {
        readonly _tag: "FailedSubmitForm";
    } | {
        readonly _tag: "CompletedValidateEmail";
        readonly field: {
            readonly _tag: "Invalid";
            readonly value: string;
            readonly errors: readonly [string, ...string[]];
        } | {
            readonly _tag: "NotValidated";
            readonly value: string;
        } | {
            readonly _tag: "Valid";
            readonly value: string;
        } | {
            readonly _tag: "Validating";
            readonly value: string;
        };
    } | {
        readonly _tag: "SucceededSubmitForm";
        readonly name: string;
    } | {
        readonly _tag: "UpdatedEmail";
        readonly value: string;
    } | {
        readonly _tag: "UpdatedMessageText";
        readonly value: string;
    } | {
        readonly _tag: "UpdatedName";
        readonly value: string;
    }, never>;
    outMessage?: never;
}>;
export declare const SubmitForm: Command.CommandDefinitionWithArgs<"SubmitForm", {
    name: Schema.String;
    email: Schema.String;
    messageText: Schema.String;
}, Effect.Effect<{
    readonly _tag: "FailedSubmitForm";
} | {
    readonly _tag: "SucceededSubmitForm";
    readonly name: string;
}, never, never>>;
export declare const view: (model: Model, h: HtmlBuilder<Message>) => Document;
