import { Schema } from "effect";
export declare const PronounOption: Schema.Literals<readonly ["He/Him", "She/Her", "They/Them", "He/They", "She/They", "Other"]>;
export type PronounOption = typeof PronounOption.Type;
export declare const all: ReadonlyArray<PronounOption>;
