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
