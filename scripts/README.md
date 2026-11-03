# Repository script checks

Run the checks with `pnpm test:scripts` and `pnpm typecheck:scripts`.

The embed CLI property test runs isolated SPA and prerendered fixtures. It checks
build IDs, exact generated HTML bytes, UTF-8 byte-order marks, child command arguments,
bounded batches and sibling completion after a failed build. It runs the actual
TypeScript or VibeLang entry point present in the checkout; the assertions are the same.

CI path-selection tests require legacy and native script paths to select the same
website or DOM parity job, while generated declaration sidecars select neither.

# Repository scripts

`pnpm build:examples` builds the embedded examples and adds the bridge script to their HTML.
`pnpm build:examples:prerendered` builds the `ssg` embed. To select examples, use
`pnpm build:examples --only counter,ssg`. `FOLDKIT_BUILD_ID` supplies the prerendered build ID;
otherwise each prerendered example gets a fresh UUID. HTML keeps its existing UTF-8 byte-order mark.

`pnpm check:dom-state-parity` checks server and browser rendering against the same views,
including property reflection, refused views, style rules, CSP and script insertion.

These entry points use VibeLang. Package scripts load `vibelang/register` automatically.
`pnpm typecheck:scripts` checks TypeScript and `.vibe` scripts.

The scaffold helper regression test compares the current script with its immutable
original source. Five deterministic properties exercise JSON, shim files, browser
diagnostics and cleanup, and child stdin. Its native adapter omits the CLI entry
only. These checks complement the complete SSR and SSG scaffold gate.

`pnpm check:scaffold-server-rendering` generates an SSR and an SSG project with the packed
CLI, builds each through its own build command and drives both in Chromium. The gate is
VibeLang: commands, files, ports and HTTP go through Effect's services, and only the
examples-e2e Playwright `require` and the host exit after a signal stay in
`check-scaffold-server-rendering.platform.mts`. `--skip-build` reuses built packages.
