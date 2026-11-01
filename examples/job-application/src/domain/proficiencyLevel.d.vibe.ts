import { Schema } from "effect";
export declare const ProficiencyLevel: Schema.Literals<readonly ["Beginner", "Intermediate", "Advanced", "Expert"]>;
export type ProficiencyLevel = typeof ProficiencyLevel.Type;
export declare const all: ReadonlyArray<ProficiencyLevel>;
