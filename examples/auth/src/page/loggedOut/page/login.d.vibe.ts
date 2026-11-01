import { Effect, Schema } from 'effect';
import { Command, Submodel, type Update } from 'foldkit';
export declare const Model: Schema.Struct<{
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
export type Model = typeof Model.Type;
export declare const initModel: () => Model;
export declare const Message: import("foldkit/message").MessageUnion<{
    readonly ChangedEmail: {
        value: Schema.String;
    };
    readonly ChangedPassword: {
        value: Schema.String;
    };
    readonly SubmittedForm: {};
    readonly SucceededSimulateAuthRequest: {
        session: Schema.Struct<{
            readonly userId: Schema.String;
            readonly email: Schema.String;
            readonly name: Schema.String;
        }>;
    };
    readonly FailedSimulateAuthRequest: {
        error: Schema.String;
    };
}>;
export type Message = typeof Message.Type;
export declare const OutMessage: import("foldkit/message").MessageUnion<{
    readonly SucceededLogin: {
        session: Schema.Struct<{
            readonly userId: Schema.String;
            readonly email: Schema.String;
            readonly name: Schema.String;
        }>;
    };
}>;
export type OutMessage = typeof OutMessage.Type;
export declare const SimulateAuthRequest: Command.CommandDefinitionWithArgs<"SimulateAuthRequest", {
    email: Schema.String;
    password: Schema.String;
}, Effect.Effect<{
    readonly _tag: "FailedSimulateAuthRequest";
    readonly error: string;
} | {
    readonly _tag: "SucceededSimulateAuthRequest";
    readonly session: {
        readonly userId: string;
        readonly email: string;
        readonly name: string;
    };
}, never, never>>;
export declare const update: (model: Model, message: Message) => Readonly<{
    model: {
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
        readonly password: {
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
        readonly isSubmitting: boolean;
    };
    commands?: Update.Commands<{
        readonly _tag: "SubmittedForm";
    } | {
        readonly _tag: "ChangedEmail";
        readonly value: string;
    } | {
        readonly _tag: "ChangedPassword";
        readonly value: string;
    } | {
        readonly _tag: "FailedSimulateAuthRequest";
        readonly error: string;
    } | {
        readonly _tag: "SucceededSimulateAuthRequest";
        readonly session: {
            readonly userId: string;
            readonly email: string;
            readonly name: string;
        };
    }, never>;
    outMessage?: {
        readonly _tag: "SucceededLogin";
        readonly session: {
            readonly userId: string;
            readonly email: string;
            readonly name: string;
        };
    };
}>;
export declare const view: Submodel.View<{
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
    readonly password: {
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
    readonly isSubmitting: boolean;
}, {
    readonly _tag: "SubmittedForm";
} | {
    readonly _tag: "ChangedEmail";
    readonly value: string;
} | {
    readonly _tag: "ChangedPassword";
    readonly value: string;
} | {
    readonly _tag: "FailedSimulateAuthRequest";
    readonly error: string;
} | {
    readonly _tag: "SucceededSimulateAuthRequest";
    readonly session: {
        readonly userId: string;
        readonly email: string;
        readonly name: string;
    };
}, void>;
