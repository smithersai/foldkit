/** Flags a parent that copies a namespaced child helper or update Return's Model
 *  into the matching modifyFields field. It requires a matching
 *  Update.foldChild, Update.foldChildAt, or Update.foldChildStep reference in
 *  the file, and leaves ordinary helpers, direct imports, aliases, init
 *  assembly, keyed collection writes, and Model-only reflect helpers alone. */
export declare const requireFoldForChildUpdateResult: import("effect-oxlint").CreateRule;
