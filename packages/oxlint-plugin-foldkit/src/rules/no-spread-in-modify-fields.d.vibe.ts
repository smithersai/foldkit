/** Flags modifyFields field updaters that rebuild a record with an object spread. Nested record updates go through a nested modifyFields so every level of Model evolution stays on the strict update path. */
export declare const noSpreadInModifyFields: import("effect-oxlint").CreateRule;
