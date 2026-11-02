# Foldkit Website

Foldkit documentation website.

The playground opens `src/main.vibe` before `src/main.ts`, so migrated examples
start at their native entry instead of another file such as `index.html`. If
neither entry exists, it opens the first file path in alphabetical order.

Documentation snippets are illustrative excerpts and may omit application
context. Native snippets show this notice next to the code. Examples that teach
raw browser API calls also identify those lines as foreign JavaScript. Checked
VibeLang programs use Effect platform services for browser operations. These
notices do not make an excerpt a complete checked example, and the copy button
preserves the source exactly.

Previous and next documentation links follow the sidebar page order. Example
links are highlighted by their selected slug.

Build scripts resolve their module directory from `import.meta.url` through the
Effect Path service.

Vite `import.meta.glob` resources and `import.meta.env` build values live in
sibling Effect-free TypeScript modules. Their relative roots and injected values
are preserved when the native modules import them.

The prerender command starts `scripts/runPrerender.ts`, which keeps the host-owned `import.meta.main` check and runs the cold Effect program exported by `scripts/prerender.vibe`. Importing the native library does not launch prerendering.

Native fixtures imported by TypeScript tests include their compiler-generated
`*.d.vibe.ts` declarations in the repository. This lets typed lint resolve their
contracts in a fresh checkout before typecheck runs. Regenerate the declarations
with `pnpm --filter website typecheck`; keep them with their `.vibe` sources.

`pnpm --filter website test` first runs the native-fixture contract checks with
plain Node, before the native loader can generate declarations, then runs
Vitest. The checks cover fresh typed lint, an unknown-error mutant, and generated
fixture names with declaration deletion and restoration.

The five checked native schema snippets use a `schema` declaration for both the codec and its associated type. Their regression checks compile the five illustrative excerpts for legacy-constructor diagnostics. A separate generated-program property checks 205 complete schema programs for identical emitted JavaScript structure and declaration bytes; it does not make the excerpts standalone programs.

The snippet measurement and OG image cleanup callbacks explicitly use `effect` and `try`. Their regression checks require the official VIP-only fixer to leave both sources unchanged. A seeded property compares 106 callback program models, checks cold construction and repeated runs, and detects a validly typed eager-read mutant.

The good managed WebSocket excerpt uses a cold `effect` block with native `try`/`catch`. The captured socket program and checked send now use explicit `try socketProgram` and `try Effect.try(...)` operands, so explicit-effects compilers no longer reject a stored-program call or discard the send. The resource getter stays outside the cold block. Its regression checks preserve the TypeScript factory's eager program lookup, three repeated runs, messages and failure channels across 212 runtime models. Compiled wrong-result and deferred-lookup mutants are rejected. The full-excerpt check compares its existing `TS2307`/`TS6133` diagnostic families under the illustrative-context rule.

The template reader is an `effect` function, and local calendar values
are run as stored programs. Debounced playground writes keep their catch handler
inside the cold program passed to `FiberMap.run`. Regression properties compare
509 write models with the original TypeScript callback, including replacements,
CSS refreshes and failures.
