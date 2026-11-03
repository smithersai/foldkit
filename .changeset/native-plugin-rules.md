---
'@foldkit/oxlint-plugin': patch
---

Migrate rule implementations to VibeLang while preserving rule diagnostics and published declarations. Accept native Effect callbacks through a reproducible `effect-oxlint` patch, retaining generator callbacks and per-file state.

Keep native linting in the original Oxlint scopes through ESLint's global ignore configuration, with generated-directory regression coverage.
