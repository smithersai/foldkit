import { Option, Schema } from 'effect';
import { Update } from 'foldkit';
import { RadioGroup } from '@foldkit/ui';
export declare const nameRules: Readonly<{
    requiredMessage: Option.Option<import("../../../../node_modules/foldkit/dist/fieldValidation/rule").RuleMessage<string>>;
    rules: readonly import("../../../../node_modules/foldkit/dist/fieldValidation/rule").Rule<string>[];
    isEmpty: (value: string) => boolean;
}>;
export declare const proficiencyRadioGroupId: (entryId: string) => string;
export declare const ProficiencyRadioGroup: Readonly<{
    view: import("foldkit/submodel").View<{
        readonly id: string;
        readonly maybeFocusedIndex: Option.Option<number>;
    }, {
        readonly _tag: "CompletedFocusOption";
    } | {
        readonly _tag: "FocusedOption";
        readonly index: number;
    } | {
        readonly _tag: "SelectedOption";
        readonly index: number;
        readonly value: string;
    }, Readonly<{
        options: readonly ("Advanced" | "Beginner" | "Expert" | "Intermediate")[];
        selectedValue: Option.Option<"Advanced" | "Beginner" | "Expert" | "Intermediate">;
        ariaLabel: string;
        toView: (render: Readonly<{
            group: readonly Readonly<{
                readonly __childAttribute: true;
                readonly attribute: unknown;
                readonly dispatch: import("../../../../node_modules/foldkit/dist/html/runtimeSingleton").DispatchSync;
                readonly resolveUnmount: (message: unknown) => () => void;
                readonly boundaryMappers: ReadonlyArray<(message: unknown) => unknown>;
                readonly resolveMountDispatch?: import("../../../../node_modules/foldkit/dist/html/runtimeSingleton").MountDispatchResolver;
            }>[];
            options: readonly Readonly<{
                value: "Advanced" | "Beginner" | "Expert" | "Intermediate";
                index: number;
                isSelected: boolean;
                isActive: boolean;
                isDisabled: boolean;
                isReadOnly: boolean;
                option: readonly Readonly<{
                    readonly __childAttribute: true;
                    readonly attribute: unknown;
                    readonly dispatch: import("../../../../node_modules/foldkit/dist/html/runtimeSingleton").DispatchSync;
                    readonly resolveUnmount: (message: unknown) => () => void;
                    readonly boundaryMappers: ReadonlyArray<(message: unknown) => unknown>;
                    readonly resolveMountDispatch?: import("../../../../node_modules/foldkit/dist/html/runtimeSingleton").MountDispatchResolver;
                }>[];
                label: readonly Readonly<{
                    readonly __childAttribute: true;
                    readonly attribute: unknown;
                    readonly dispatch: import("../../../../node_modules/foldkit/dist/html/runtimeSingleton").DispatchSync;
                    readonly resolveUnmount: (message: unknown) => () => void;
                    readonly boundaryMappers: ReadonlyArray<(message: unknown) => unknown>;
                    readonly resolveMountDispatch?: import("../../../../node_modules/foldkit/dist/html/runtimeSingleton").MountDispatchResolver;
                }>[];
                description: readonly Readonly<{
                    readonly __childAttribute: true;
                    readonly attribute: unknown;
                    readonly dispatch: import("../../../../node_modules/foldkit/dist/html/runtimeSingleton").DispatchSync;
                    readonly resolveUnmount: (message: unknown) => () => void;
                    readonly boundaryMappers: ReadonlyArray<(message: unknown) => unknown>;
                    readonly resolveMountDispatch?: import("../../../../node_modules/foldkit/dist/html/runtimeSingleton").MountDispatchResolver;
                }>[];
            }>[];
            selectedValue: Option.Option<"Advanced" | "Beginner" | "Expert" | "Intermediate">;
            hiddenInput: readonly Readonly<{
                readonly __childAttribute: true;
                readonly attribute: unknown;
                readonly dispatch: import("../../../../node_modules/foldkit/dist/html/runtimeSingleton").DispatchSync;
                readonly resolveUnmount: (message: unknown) => () => void;
                readonly boundaryMappers: ReadonlyArray<(message: unknown) => unknown>;
                readonly resolveMountDispatch?: import("../../../../node_modules/foldkit/dist/html/runtimeSingleton").MountDispatchResolver;
            }>[];
        }>) => import("foldkit/html").Html;
        orientation?: RadioGroup.Orientation;
        isOptionDisabled?: (value: "Advanced" | "Beginner" | "Expert" | "Intermediate", index: number) => boolean;
        hasOptionDescription?: (value: "Advanced" | "Beginner" | "Expert" | "Intermediate", index: number) => boolean;
        isDisabled?: boolean;
        isReadOnly?: boolean;
        name?: string;
    }>>;
    update: (model: RadioGroup.Model, message: RadioGroup.Message) => Readonly<{
        model: {
            readonly id: string;
            readonly maybeFocusedIndex: Option.Option<number>;
        };
        commands?: Update.Commands<{
            readonly _tag: "CompletedFocusOption";
        } | {
            readonly _tag: "FocusedOption";
            readonly index: number;
        } | {
            readonly _tag: "SelectedOption";
            readonly index: number;
            readonly value: string;
        }, never>;
        outMessage?: Readonly<{
            readonly _tag: 'Selected';
            readonly value: "Advanced" | "Beginner" | "Expert" | "Intermediate";
            readonly index: number;
        }>;
    }>;
}>;
export declare const Model: Schema.Struct<{
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
}>;
export type Model = typeof Model.Type;
export declare const Message: import("foldkit/message").MessageUnion<{
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
export type Message = typeof Message.Type;
export declare const OutMessage: import("foldkit/message").MessageUnion<{
    readonly Removed: {};
}>;
export type OutMessage = typeof OutMessage.Type;
export type Removed = typeof OutMessage.Removed.Type;
export declare const init: (entryId: string) => Model;
export declare const update: (model: Model, message: Message) => Readonly<{
    model: {
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
            readonly maybeFocusedIndex: Option.Option<number>;
        };
    };
    commands?: Update.Commands<{
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
    }, never>;
    outMessage?: {
        readonly _tag: "Removed";
    };
}>;
export declare const hasErrors: (entry: Model) => boolean;
export declare const isComplete: (entry: Model) => boolean;
export declare const revealErrors: (entry: Model) => Model;
