import { Effect, Schema } from 'effect';
import { Command, Update } from 'foldkit';
import { type CalendarDate } from 'foldkit/calendar';
export declare const Model: Schema.Struct<{
    readonly entries: Schema.$Array<Schema.Struct<{
        readonly id: Schema.String;
        readonly school: Schema.Union<readonly [Schema.TaggedStruct<"NotValidated", {
            readonly value: Schema.Codec<string, string, never, never>;
        }>, Schema.TaggedStruct<"Validating", {
            readonly value: Schema.Codec<string, string, never, never>;
        }>, Schema.TaggedStruct<"Valid", {
            readonly value: Schema.Codec<string, string, never, never>;
        }>, Schema.TaggedStruct<"Invalid", {
            readonly value: Schema.Codec<string, string, never, never>;
            readonly errors: Schema.NonEmptyArray<Schema.String>;
        }>]>;
        readonly degree: Schema.Union<readonly [Schema.TaggedStruct<"NotValidated", {
            readonly value: Schema.Codec<string, string, never, never>;
        }>, Schema.TaggedStruct<"Validating", {
            readonly value: Schema.Codec<string, string, never, never>;
        }>, Schema.TaggedStruct<"Valid", {
            readonly value: Schema.Codec<string, string, never, never>;
        }>, Schema.TaggedStruct<"Invalid", {
            readonly value: Schema.Codec<string, string, never, never>;
            readonly errors: Schema.NonEmptyArray<Schema.String>;
        }>]>;
        readonly fieldOfStudy: Schema.Union<readonly [Schema.TaggedStruct<"NotValidated", {
            readonly value: Schema.Codec<string, string, never, never>;
        }>, Schema.TaggedStruct<"Validating", {
            readonly value: Schema.Codec<string, string, never, never>;
        }>, Schema.TaggedStruct<"Valid", {
            readonly value: Schema.Codec<string, string, never, never>;
        }>, Schema.TaggedStruct<"Invalid", {
            readonly value: Schema.Codec<string, string, never, never>;
            readonly errors: Schema.NonEmptyArray<Schema.String>;
        }>]>;
        readonly maybeGraduationYear: Schema.Option<Schema.String>;
        readonly graduationYearListbox: Schema.Struct<{
            readonly id: Schema.String;
            readonly isOpen: Schema.Boolean;
            readonly isAnimated: Schema.Boolean;
            readonly isModal: Schema.Boolean;
            readonly orientation: Schema.Literals<readonly ["Vertical", "Horizontal"]>;
            readonly animation: Schema.Struct<{
                readonly id: Schema.String;
                readonly isShowing: Schema.Boolean;
                readonly transitionState: Schema.Literals<readonly ["Idle", "EnterStart", "EnterAnimating", "LeaveStart", "LeaveAnimating"]>;
                readonly transitionGeneration: Schema.Number;
            }>;
            readonly maybeActiveItemIndex: Schema.Option<Schema.Number>;
            readonly activationTrigger: Schema.Literals<readonly ["Pointer", "Keyboard"]>;
            readonly searchQuery: Schema.String;
            readonly searchVersion: Schema.Number;
            readonly maybeLastPointerPosition: Schema.Option<Schema.Struct<{
                readonly screenX: Schema.Number;
                readonly screenY: Schema.Number;
            }>>;
            readonly maybeLastButtonPointerType: Schema.Option<Schema.String>;
        }>;
        readonly isCurrentlyEnrolled: Schema.Boolean;
    }>>;
    readonly today: Schema.Struct<{
        readonly year: Schema.Int;
        readonly month: Schema.Int;
        readonly day: Schema.Int;
    }>;
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
            readonly UpdatedSchool: {
                value: Schema.String;
            };
            readonly UpdatedDegree: {
                value: Schema.String;
            };
            readonly UpdatedFieldOfStudy: {
                value: Schema.String;
            };
            readonly GotGraduationYearListboxMessage: {
                message: import("foldkit/message").MessageUnion<{
                    readonly Opened: {
                        maybeActiveItemIndex: Schema.Option<Schema.Number>;
                    };
                    readonly Closed: {};
                    readonly BlurredItems: {};
                    readonly ActivatedItem: {
                        index: Schema.Number;
                        activationTrigger: Schema.Literals<readonly ["Pointer", "Keyboard"]>;
                    };
                    readonly DeactivatedItem: {};
                    readonly SelectedItem: {
                        item: Schema.String;
                    };
                    readonly MovedPointerOverItem: {
                        index: Schema.Number;
                        screenX: Schema.Number;
                        screenY: Schema.Number;
                    };
                    readonly RequestedItemClick: {
                        index: Schema.Number;
                    };
                    readonly Searched: {
                        key: Schema.String;
                        maybeTargetIndex: Schema.Option<Schema.Number>;
                    };
                    readonly CompletedDelayClearSearch: {
                        version: Schema.Number;
                    };
                    readonly CompletedLockScroll: {};
                    readonly CompletedUnlockScroll: {};
                    readonly CompletedInertOthers: {};
                    readonly CompletedRestoreInert: {};
                    readonly CompletedFocusButton: {};
                    readonly CompletedFocusItems: {};
                    readonly CompletedScrollIntoView: {};
                    readonly CompletedClickItem: {};
                    readonly ClickedButton: {};
                    readonly IgnoredMouseClick: {};
                    readonly SuppressedSpaceScroll: {};
                    readonly SuppressedItemCommit: {};
                    readonly CompletedAnchorListbox: {};
                    readonly CompletedPortalListboxBackdrop: {};
                    readonly GotAnimationMessage: {
                        message: import("foldkit/message").MessageUnion<{
                            readonly Showed: {};
                            readonly Hid: {};
                            readonly CompletedWaitForPaint: {
                                generation: Schema.Number;
                            };
                            readonly EndedAnimation: {
                                generation: Schema.Number;
                            };
                        }>;
                    };
                    readonly PressedPointerOnButton: {
                        pointerType: Schema.String;
                        button: Schema.Number;
                    };
                }>;
            };
            readonly ToggledCurrentlyEnrolled: {
                isChecked: Schema.Boolean;
            };
            readonly ClickedRemoveSelf: {};
        }>;
    };
}>;
export type Message = typeof Message.Type;
export declare const init: (today: CalendarDate, initialEntryId: string) => Model;
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
            readonly school: {
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
            readonly degree: {
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
            readonly fieldOfStudy: {
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
            readonly maybeGraduationYear: import("effect/Option").Option<string>;
            readonly graduationYearListbox: {
                readonly id: string;
                readonly isOpen: boolean;
                readonly isAnimated: boolean;
                readonly isModal: boolean;
                readonly orientation: "Horizontal" | "Vertical";
                readonly animation: {
                    readonly id: string;
                    readonly isShowing: boolean;
                    readonly transitionState: "EnterAnimating" | "EnterStart" | "Idle" | "LeaveAnimating" | "LeaveStart";
                    readonly transitionGeneration: number;
                };
                readonly maybeActiveItemIndex: import("effect/Option").Option<number>;
                readonly activationTrigger: "Keyboard" | "Pointer";
                readonly searchQuery: string;
                readonly searchVersion: number;
                readonly maybeLastPointerPosition: import("effect/Option").Option<{
                    readonly screenX: number;
                    readonly screenY: number;
                }>;
                readonly maybeLastButtonPointerType: import("effect/Option").Option<string>;
            };
            readonly isCurrentlyEnrolled: boolean;
        }[];
        readonly today: {
            readonly year: number;
            readonly month: number;
            readonly day: number;
        };
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
            readonly _tag: "GotGraduationYearListboxMessage";
            readonly message: {
                readonly _tag: "BlurredItems";
            } | {
                readonly _tag: "ClickedButton";
            } | {
                readonly _tag: "Closed";
            } | {
                readonly _tag: "CompletedAnchorListbox";
            } | {
                readonly _tag: "CompletedClickItem";
            } | {
                readonly _tag: "CompletedFocusButton";
            } | {
                readonly _tag: "CompletedFocusItems";
            } | {
                readonly _tag: "CompletedInertOthers";
            } | {
                readonly _tag: "CompletedLockScroll";
            } | {
                readonly _tag: "CompletedPortalListboxBackdrop";
            } | {
                readonly _tag: "CompletedRestoreInert";
            } | {
                readonly _tag: "CompletedScrollIntoView";
            } | {
                readonly _tag: "CompletedUnlockScroll";
            } | {
                readonly _tag: "DeactivatedItem";
            } | {
                readonly _tag: "IgnoredMouseClick";
            } | {
                readonly _tag: "SuppressedItemCommit";
            } | {
                readonly _tag: "SuppressedSpaceScroll";
            } | {
                readonly _tag: "ActivatedItem";
                readonly index: number;
                readonly activationTrigger: "Keyboard" | "Pointer";
            } | {
                readonly _tag: "CompletedDelayClearSearch";
                readonly version: number;
            } | {
                readonly _tag: "GotAnimationMessage";
                readonly message: {
                    readonly _tag: "Hid";
                } | {
                    readonly _tag: "Showed";
                } | {
                    readonly _tag: "CompletedWaitForPaint";
                    readonly generation: number;
                } | {
                    readonly _tag: "EndedAnimation";
                    readonly generation: number;
                };
            } | {
                readonly _tag: "MovedPointerOverItem";
                readonly index: number;
                readonly screenX: number;
                readonly screenY: number;
            } | {
                readonly _tag: "Opened";
                readonly maybeActiveItemIndex: import("effect/Option").Option<number>;
            } | {
                readonly _tag: "PressedPointerOnButton";
                readonly pointerType: string;
                readonly button: number;
            } | {
                readonly _tag: "RequestedItemClick";
                readonly index: number;
            } | {
                readonly _tag: "Searched";
                readonly key: string;
                readonly maybeTargetIndex: import("effect/Option").Option<number>;
            } | {
                readonly _tag: "SelectedItem";
                readonly item: string;
            };
        } | {
            readonly _tag: "ToggledCurrentlyEnrolled";
            readonly isChecked: boolean;
        } | {
            readonly _tag: "UpdatedDegree";
            readonly value: string;
        } | {
            readonly _tag: "UpdatedFieldOfStudy";
            readonly value: string;
        } | {
            readonly _tag: "UpdatedSchool";
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
