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

The snippet measurement and OG image cleanup callbacks explicitly use `effect` and `try`. Their regression checks require the official VIP-only fixer to leave both sources unchanged. A seeded property compares 106 explicit callback program models against TypeScript declaration bytes, checks cold construction and repeated runs, and detects a validly typed eager-read mutant. Explicit effects no longer use legacy-versus-explicit JavaScript identity as an oracle. The Vite metadata checks use Effect-free TypeScript before fixtures for host-owned globs and injected environment values, preserving the same selection, query and identity assertions.

The good managed WebSocket excerpt uses a cold `effect` block with native `try`/`catch`. The captured socket program and checked send now use explicit `try socketProgram` and `try Effect.try(...)` operands, so explicit-effects compilers no longer reject a stored-program call or discard the send. The resource getter stays outside the cold block. Its regression checks preserve the TypeScript factory's eager program lookup, three repeated runs, messages and failure channels across 212 runtime models. Compiled wrong-result and deferred-lookup mutants are rejected. The full-excerpt check compares its existing `TS2307`/`TS6133` diagnostic families under the illustrative-context rule.

The template reader is an `effect` function, and local calendar values
are run as stored programs. Debounced playground writes keep their catch handler
inside the cold program passed to `FiberMap.run`. Regression properties compare
509 write models with the original TypeScript callback, including replacements,
CSS refreshes and failures.

Snippet discovery accepts `.vibex` alongside `.vibe`, retaining the basename lookup, native excerpt notice, raw copy text and native syntax highlighting. Generated declaration sidecars stay out of the displayed snippets. This display support does not compile JSX snippets or establish compiler support for `.vibex`.

Example source listings exclude both `.d.vibe.ts` and `.d.vibex.ts` native declaration sidecars. The source files remain visible.

The `check:playground-ssg-build` launcher enables native loading only for its checker process, so generated project installs preserve caller `NODE_OPTIONS` without inheriting the checker's loader.

Native Effect functions use `effect`, and `try` runs a program. A plain factory
keeps eager argument or resource lookups before its returned `effect { ... }`
block, preserving what happens when the program is created and when it runs.

The website uses a native `vite.config.vibe` with the native config loader.
The type display and heading slug helpers are native programs. Their differential
properties preserve TypeDoc getter evaluation, recursive heading text, Unicode,
explicit heading IDs and opaque HTML identity, and reject typed wrong-result
mutants. The source-collector regression creates a temporary native config at
the website root; its filename pattern is included in the website project.

The atom mutation and browser-listener comparison excerpt contains no JSX and
uses `atomCompareAtomEffect.vibe`. The mutation remains a cold `effect function`;
the listener uses `BrowserStream.fromEventListenerWindow` and its registry
finalizer cancels the running stream. Differential properties compare the
original atom's construction, exact service operations and result states across
103 mutation models, plus listener acquisition, sharing, events and cleanup
across 102 lifecycle models. Compiled omitted-operation and missing-cancellation
mutants must fail those observations.

Plain native functions use ordinary TypeScript return inference. No return
annotation is needed to infer a curried callback or an object literal.

Native Message constructors run directly inside `effect` bodies. Their generated
declarations preserve nonthrowing contracts across module boundaries.

The API reference parser uses native `match` expressions for optional signatures,
parameters, types and namespace children. Mapper creation and getter order stay
the same when those values are absent.

The note-player fallback waits for its duration before constructing its native
completion Message. Other failures, defects and interruption keep their channels.

Generated schema fixtures keep their fields `readonly`, matching the original
`Schema.Struct` data and declaration contracts.

The deferred-resource-lookup mutant uses supported native catch syntax. Its
runtime getter trace rejects delayed acquisition rather than a parser error.

Declaration regressions compare parsed type syntax and ordinary documentation
while excluding generated `@throws {never}` metadata and emitter formatting.
Generated controls retain literal text, other failure contracts, optionality,
readonly fields and changed return types. Qualified `Option.Option<number>`
fixtures also preserve their TypeScript declarations and `Some` values.

Imported Effect `Option` return types stay qualified as `Option.Option<T>`,
matching TypeScript and leaving VIP-only migration idempotent.

Intersection-observer construction, observation and disconnection live in an
Effect-free platform sibling. Native acquisition retains callback state, target
order and scope ownership. Failed acquisition keeps the original defect and
does not register a release; completed acquisition disconnects exactly once.

Loading browser preferences preserves unrelated UI demos during hydration.
Completed list measurements, input values and other demo selections remain in
the Model. Calendar and date-picker setup still uses the local date. Regression
properties cover startup event ordering and every unrelated UI field.
