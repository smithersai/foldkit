import { Schema } from "effect";
export declare const Step: Schema.Literals<readonly ["PersonalInfo", "WorkHistory", "Education", "Skills", "CoverLetter", "Attachments", "Review"]>;
export type Step = typeof Step.Type;
export declare const all: readonly ["PersonalInfo", "WorkHistory", "Education", "Skills", "CoverLetter", "Attachments", "Review"];
export declare const indexOf: (step: Step) => number;
export declare const show: (step: Step) => string;
