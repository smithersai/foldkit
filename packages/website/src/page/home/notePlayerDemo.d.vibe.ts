import { Option, Schema } from 'effect';
import { ManagedResource, Submodel, Update } from 'foldkit';
export declare const Model: Schema.Struct<{
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
export type Model = typeof Model.Type;
export declare const Message: import("foldkit/message").MessageUnion<{
    readonly ChangedNoteInput: {
        value: Schema.String;
    };
    readonly GotNoteDurationMessage: {
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
    readonly ClickedPlay: {};
    readonly ClickedPause: {};
    readonly ClickedStop: {};
    readonly CompletedPlayNote: {
        noteIndex: Schema.Number;
    };
    readonly CompletedDelayAdvancePhase: {
        generation: Schema.Number;
    };
    readonly SucceededAcquireAudioContext: {};
    readonly FailedAcquireAudioContext: {};
    readonly ReleasedAudioContext: {};
}>;
export type Message = typeof Message.Type;
type UpdateReturn = Update.Return<Model, Message, AudioContextService>;
export declare const init: () => UpdateReturn;
export declare const update: (model: Model, message: Message) => Readonly<{
    model: {
        readonly noteInput: {
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
        readonly noteDurationRadioGroup: {
            readonly id: string;
            readonly maybeFocusedIndex: Option.Option<number>;
        };
        readonly noteDuration: "Long" | "Medium" | "Short";
        readonly playbackState: {
            readonly _tag: "Idle";
        } | {
            readonly _tag: "Paused";
            readonly noteSequence: readonly ("A" | "B" | "C" | "D" | "E" | "F" | "G")[];
            readonly currentNoteIndex: number;
        } | {
            readonly _tag: "Playing";
            readonly noteSequence: readonly ("A" | "B" | "C" | "D" | "E" | "F" | "G")[];
            readonly currentNoteIndex: number;
        };
        readonly highlightPhase: "Idle" | "NoteCommand" | "NoteMessage" | "NoteModel" | "NoteUpdate" | "PauseMessage" | "PlayMessage" | "PlayModel" | "PlayUpdate";
        readonly generation: number;
        readonly messageLog: readonly string[];
        readonly audio: {
            readonly _tag: "Acquiring";
        } | {
            readonly _tag: "Ready";
        } | {
            readonly _tag: "Unavailable";
        };
    };
    commands?: Update.Commands<{
        readonly _tag: "ClickedPause";
    } | {
        readonly _tag: "ClickedPlay";
    } | {
        readonly _tag: "ClickedStop";
    } | {
        readonly _tag: "FailedAcquireAudioContext";
    } | {
        readonly _tag: "ReleasedAudioContext";
    } | {
        readonly _tag: "SucceededAcquireAudioContext";
    } | {
        readonly _tag: "ChangedNoteInput";
        readonly value: string;
    } | {
        readonly _tag: "CompletedDelayAdvancePhase";
        readonly generation: number;
    } | {
        readonly _tag: "CompletedPlayNote";
        readonly noteIndex: number;
    } | {
        readonly _tag: "GotNoteDurationMessage";
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
    }, ManagedResource.ManagedResourceService<"AudioContext">>;
    outMessage?: never;
}>;
declare const AudioContextResource: ManagedResource.ManagedResource<AudioContext, ManagedResource.ManagedResourceService<"AudioContext">>;
type AudioContextService = ManagedResource.ServiceOf<typeof AudioContextResource>;
export declare const managedResources: {
    audioContext: ManagedResource.Entry<{
        readonly noteInput: {
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
        readonly noteDurationRadioGroup: {
            readonly id: string;
            readonly maybeFocusedIndex: Option.Option<number>;
        };
        readonly noteDuration: "Long" | "Medium" | "Short";
        readonly playbackState: {
            readonly _tag: "Idle";
        } | {
            readonly _tag: "Paused";
            readonly noteSequence: readonly ("A" | "B" | "C" | "D" | "E" | "F" | "G")[];
            readonly currentNoteIndex: number;
        } | {
            readonly _tag: "Playing";
            readonly noteSequence: readonly ("A" | "B" | "C" | "D" | "E" | "F" | "G")[];
            readonly currentNoteIndex: number;
        };
        readonly highlightPhase: "Idle" | "NoteCommand" | "NoteMessage" | "NoteModel" | "NoteUpdate" | "PauseMessage" | "PlayMessage" | "PlayModel" | "PlayUpdate";
        readonly generation: number;
        readonly messageLog: readonly string[];
        readonly audio: {
            readonly _tag: "Acquiring";
        } | {
            readonly _tag: "Ready";
        } | {
            readonly _tag: "Unavailable";
        };
    }, {
        readonly _tag: "ClickedPause";
    } | {
        readonly _tag: "ClickedPlay";
    } | {
        readonly _tag: "ClickedStop";
    } | {
        readonly _tag: "FailedAcquireAudioContext";
    } | {
        readonly _tag: "ReleasedAudioContext";
    } | {
        readonly _tag: "SucceededAcquireAudioContext";
    } | {
        readonly _tag: "ChangedNoteInput";
        readonly value: string;
    } | {
        readonly _tag: "CompletedDelayAdvancePhase";
        readonly generation: number;
    } | {
        readonly _tag: "CompletedPlayNote";
        readonly noteIndex: number;
    } | {
        readonly _tag: "GotNoteDurationMessage";
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
    }, Option.Option<null>, AudioContext, ManagedResource.ManagedResourceService<"AudioContext">, () => {
        readonly _tag: "SucceededAcquireAudioContext";
    }>;
};
export declare const view: Submodel.View<{
    readonly noteInput: {
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
    readonly noteDurationRadioGroup: {
        readonly id: string;
        readonly maybeFocusedIndex: Option.Option<number>;
    };
    readonly noteDuration: "Long" | "Medium" | "Short";
    readonly playbackState: {
        readonly _tag: "Idle";
    } | {
        readonly _tag: "Paused";
        readonly noteSequence: readonly ("A" | "B" | "C" | "D" | "E" | "F" | "G")[];
        readonly currentNoteIndex: number;
    } | {
        readonly _tag: "Playing";
        readonly noteSequence: readonly ("A" | "B" | "C" | "D" | "E" | "F" | "G")[];
        readonly currentNoteIndex: number;
    };
    readonly highlightPhase: "Idle" | "NoteCommand" | "NoteMessage" | "NoteModel" | "NoteUpdate" | "PauseMessage" | "PlayMessage" | "PlayModel" | "PlayUpdate";
    readonly generation: number;
    readonly messageLog: readonly string[];
    readonly audio: {
        readonly _tag: "Acquiring";
    } | {
        readonly _tag: "Ready";
    } | {
        readonly _tag: "Unavailable";
    };
}, {
    readonly _tag: "ClickedPause";
} | {
    readonly _tag: "ClickedPlay";
} | {
    readonly _tag: "ClickedStop";
} | {
    readonly _tag: "FailedAcquireAudioContext";
} | {
    readonly _tag: "ReleasedAudioContext";
} | {
    readonly _tag: "SucceededAcquireAudioContext";
} | {
    readonly _tag: "ChangedNoteInput";
    readonly value: string;
} | {
    readonly _tag: "CompletedDelayAdvancePhase";
    readonly generation: number;
} | {
    readonly _tag: "CompletedPlayNote";
    readonly noteIndex: number;
} | {
    readonly _tag: "GotNoteDurationMessage";
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
}, void>;
export {};
