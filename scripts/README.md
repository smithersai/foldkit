# Repository script checks

Run the checks with `pnpm test:scripts` and `pnpm typecheck:scripts`.

The embed CLI property test runs isolated SPA and prerendered fixtures. It checks
build IDs, exact generated HTML bytes, UTF-8 byte-order marks, child command arguments,
bounded batches and sibling completion after a failed build. It runs the actual
TypeScript or VibeLang entry point present in the checkout; the assertions are the same.

CI path-selection tests require legacy and native script paths to select the same
website or DOM parity job, while generated declaration sidecars select neither.
