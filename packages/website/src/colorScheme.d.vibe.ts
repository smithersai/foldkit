import { Schema } from "effect";
export declare const DARK_COLOR_SCHEME_QUERY = "(prefers-color-scheme: dark)";
export declare const ResolvedTheme: Schema.Literals<readonly ["Dark", "Light"]>;
export type ResolvedTheme = typeof ResolvedTheme.Type;
