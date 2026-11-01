import { Option } from "effect";
import { Submodel } from 'foldkit';
export declare const view: Submodel.View<{
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
}, {
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
}, void>;
