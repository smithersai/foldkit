import { Schema } from "effect";
export declare const Model: Schema.Struct<{
    readonly demoTabs: Schema.Struct<{
        readonly id: Schema.String;
        readonly maybeFocusedIndex: Schema.Option<Schema.Number>;
        readonly activationMode: Schema.Literals<readonly ["Automatic", "Manual"]>;
    }>;
    readonly activeDemoTab: Schema.Literals<readonly ["Architecture", "Note Player"]>;
    readonly playgroundMenu: Schema.Struct<{
        readonly id: Schema.String;
        readonly isOpen: Schema.Boolean;
        readonly isAnimated: Schema.Boolean;
        readonly isModal: Schema.Boolean;
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
        readonly maybePointerOrigin: Schema.Option<Schema.Struct<{
            readonly screenX: Schema.Number;
            readonly screenY: Schema.Number;
            readonly timeStamp: Schema.Number;
        }>>;
    }>;
    readonly asyncCounterDemo: Schema.Struct<{
        readonly count: Schema.Number;
        readonly isResetting: Schema.Boolean;
        readonly resetDuration: Schema.Number;
        readonly phase: Schema.Literals<readonly ["Idle", "IncrementMessage", "IncrementUpdate", "IncrementModel", "DurationMessage", "DurationUpdate", "DurationModel", "ResetMessage", "ResetUpdate", "ResetCommand", "ResetCommandMessage", "ResetCommandUpdate", "ResetModel"]>;
        readonly generation: Schema.Number;
        readonly messageLog: Schema.$Array<Schema.String>;
    }>;
    readonly notePlayerDemo: Schema.Struct<{
        readonly noteInput: Schema.Union<readonly [Schema.TaggedStruct<"NotValidated", {
            readonly value: Schema.Codec<string, string, never, never>;
        }>, Schema.TaggedStruct<"Validating", {
            readonly value: Schema.Codec<string, string, never, never>;
        }>, Schema.TaggedStruct<"Valid", {
            readonly value: Schema.Codec<string, string, never, never>;
        }>, Schema.TaggedStruct<"Invalid", {
            readonly value: Schema.Codec<string, string, never, never>;
            readonly errors: Schema.NonEmptyArray<Schema.String>;
        }>]>;
        readonly noteDurationRadioGroup: Schema.Struct<{
            readonly id: Schema.String;
            readonly maybeFocusedIndex: Schema.Option<Schema.Number>;
        }>;
        readonly noteDuration: Schema.Literals<readonly ["Short", "Medium", "Long"]>;
        readonly playbackState: import("foldkit/schema").TaggedUnion<{
            readonly Idle: {};
            readonly Playing: {
                noteSequence: Schema.$Array<Schema.Literals<readonly ["A", "B", "C", "D", "E", "F", "G"]>>;
                currentNoteIndex: Schema.Number;
            };
            readonly Paused: {
                noteSequence: Schema.$Array<Schema.Literals<readonly ["A", "B", "C", "D", "E", "F", "G"]>>;
                currentNoteIndex: Schema.Number;
            };
        }>;
        readonly highlightPhase: Schema.Literals<readonly ["Idle", "PlayMessage", "PlayUpdate", "PlayModel", "PauseMessage", "NoteMessage", "NoteUpdate", "NoteModel", "NoteCommand"]>;
        readonly generation: Schema.Number;
        readonly messageLog: Schema.$Array<Schema.String>;
        readonly audio: import("foldkit/schema").TaggedUnion<{
            readonly Acquiring: {};
            readonly Ready: {};
            readonly Unavailable: {};
        }>;
    }>;
}>;
export type Model = typeof Model.Type;
