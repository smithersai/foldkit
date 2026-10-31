import { Schema } from "effect";
export declare const SIDEBAR_STORAGE_KEY = "foldkit-sidebar-state";
export declare const SidebarState: Schema.Struct<{
    readonly open: Schema.$Record<Schema.String, Schema.Boolean>;
}>;
export type SidebarState = typeof SidebarState.Type;
export declare const SidebarStateJsonString: Schema.fromJsonString<Schema.Struct<{
    readonly open: Schema.$Record<Schema.String, Schema.Boolean>;
}>>;
export declare const GroupKey: Schema.Literals<readonly ["blog", "introduction", "coreConcepts", "comparisons", "faq", "testing", "bestPractices", "patterns", "tooling", "foldkitUi", "ai", "examples", "apiReference"]>;
export type GroupKey = typeof GroupKey.Type;
export declare const SidebarGroups: Schema.$Record<Schema.Literals<readonly ["blog", "introduction", "coreConcepts", "comparisons", "faq", "testing", "bestPractices", "patterns", "tooling", "foldkitUi", "ai", "examples", "apiReference"]>, Schema.Boolean>;
export type SidebarGroups = typeof SidebarGroups.Type;
