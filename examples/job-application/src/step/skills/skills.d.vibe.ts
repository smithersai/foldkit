import { Effect, Schema } from 'effect';
import { Command, Update } from 'foldkit';
export declare const Model: Schema.Struct<{
    readonly entries: Schema.$Array<Schema.Struct<{
        readonly id: Schema.String;
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
        readonly proficiency: Schema.Literals<readonly ["Beginner", "Intermediate", "Advanced", "Expert"]>;
        readonly proficiencyRadioGroup: Schema.Struct<{
            readonly id: Schema.String;
            readonly maybeFocusedIndex: Schema.Option<Schema.Number>;
        }>;
    }>>;
}>;
export type Model = typeof Model.Type;
export declare const Message: import("foldkit/message").MessageUnion<{
    readonly ClickedAddEntry: {};
    readonly SucceededGenerateEntryId: {
        entryId: Schema.String;
    };
    readonly FailedGenerateEntryId: {};
    readonly RemovedEntry: {
        entryId: Schema.String;
    };
    readonly GotEntryMessage: {
        entryId: Schema.String;
        message: import("foldkit/message").MessageUnion<{
            readonly UpdatedName: {
                value: Schema.String;
            };
            readonly GotProficiencyRadioGroupMessage: {
                message: import("foldkit/message").MessageUnion<{
                    readonly SelectedOption: {
                        index: Schema.Number;
                        value: Schema.String;
                    };
                    readonly FocusedOption: {
                        index: Schema.Number;
                    };
                    readonly CompletedFocusOption: {};
                }>;
            };
            readonly ClickedRemoveSelf: {};
        }>;
    };
}>;
export type Message = typeof Message.Type;
export declare const init: (initialEntryId: string) => Model;
export declare const GenerateEntryId: Command.CommandDefinitionNoArgs<"GenerateEntryId", Effect.Effect<{
    readonly _tag: "FailedGenerateEntryId";
} | {
    readonly _tag: "SucceededGenerateEntryId";
    readonly entryId: string;
}, never, never>>;
export declare const update: (model: Model, message: Message) => Readonly<{
    model: {
        readonly entries: readonly {
            readonly id: string;
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
            readonly proficiency: "Advanced" | "Beginner" | "Expert" | "Intermediate";
            readonly proficiencyRadioGroup: {
                readonly id: string;
                readonly maybeFocusedIndex: import("effect/Option").Option<number>;
            };
        }[];
    };
    commands?: Update.Commands<{
        readonly _tag: "ClickedAddEntry";
    } | {
        readonly _tag: "FailedGenerateEntryId";
    } | {
        readonly _tag: "GotEntryMessage";
        readonly entryId: string;
        readonly message: {
            readonly _tag: "ClickedRemoveSelf";
        } | {
            readonly _tag: "GotProficiencyRadioGroupMessage";
            readonly message: {
                readonly _tag: "CompletedFocusOption";
            } | {
                readonly _tag: "FocusedOption";
                readonly index: number;
            } | {
                readonly _tag: "SelectedOption";
                readonly index: number;
                readonly value: string;
            };
        } | {
            readonly _tag: "UpdatedName";
            readonly value: string;
        };
    } | {
        readonly _tag: "RemovedEntry";
        readonly entryId: string;
    } | {
        readonly _tag: "SucceededGenerateEntryId";
        readonly entryId: string;
    }, never>;
    outMessage?: never;
}>;
export declare const hasErrors: (model: Model) => boolean;
export declare const isComplete: (model: Model) => boolean;
export declare const revealErrors: (model: Model) => Model;
