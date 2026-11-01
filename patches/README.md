# Dependency patches

## `effect-oxlint@0.3.4`

`Rule.define` accepts generator callbacks but has no configuration hook for
Effect-returning callbacks. The patch accepts both forms and dispatches inside
`Effect.suspend` so callback construction retains fiber context and laziness.
The source, published JavaScript and declarations carry the same change.

`packages/oxlint-plugin-foldkit/test/effect-oxlint-native-create.test.ts`
covers context, per-file state, decoded options, defects and visitor order,
including a 100-run property. The adjacent native integration test exercises
the compiler output through the real library. Existing rule and Oxlint
integration tests cover the migrated rules. Refresh this patch against the
registry package with `pnpm patch effect-oxlint@0.3.4` and `pnpm patch-commit`.

## `knip@6.38.0`

Knip follows a package import to emitted JavaScript, then maps that output
back to source using the configured `rootDir` and `outDir`. Its source
lookup omitted custom compiler extensions, so it reported a used native
rule as unused. The patch includes the configured compiler extensions and
preserves the existing preference for TypeScript source.

`scripts/knip-native-source-map.test.mjs` covers the minimized Foldkit rule
and a 1,000-case property over custom extensions, nested Unicode paths,
source roots, TypeScript alternatives, missing sources and declaration
sidecars. Run it with `node --test scripts/knip-native-source-map.test.mjs`.
The package Knip check also detects a genuinely unused native rule when
its product import is removed. Refresh with `pnpm patch knip@6.38.0` and
`pnpm patch-commit`; keep the regression passing.

A type-only relative `.js` re-export must also find its sibling `.vibe`
source when the native compiler is registered. The resolver patch adds
that fallback after ordinary JavaScript, TypeScript, JSX and declaration
files, and leaves unregistered resolution unchanged. The UI compiler
base configuration (`packages/ui/tsconfig.base.json`) prefers ordinary
source before native declaration sidecars. Both the build and TypeDoc
configurations inherit it and retain the original public spelling.

`scripts/knip-native-reexport.test.mjs` covers the unchanged Foldkit
re-export, its raw declaration, the real Knip CLI and 1,000 generated
resolver cases with nested Unicode paths, ordinary alternatives and
compiler registration controls.

The UI keeps its original `.js` references to retained TypeScript
modules. The compiler preserves written non-native paths under the
accepted declaration spelling policy (decided detail 263).
`scripts/native-written-returns.test.mjs` checks the minimized Foldkit
callback contract and a batch of 250 generated callback shapes against
stock TypeScript, with single-threaded raw declaration comparisons before
and after formatting.
