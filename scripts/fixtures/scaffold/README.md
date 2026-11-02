# Scaffold script regression controls

The immutable `legacy-source.json` records the original scaffold script and its
SHA-256. The test loads its helper definitions without executing the CLI or
registering process signal handlers. It compares the actual helper implementations
present in the checkout, whether TypeScript or VibeLang, with those controls.

The five deterministic fast-check properties cover JSON values, package-manager
shim bytes and modes, eager browser diagnostics, browser call order and cleanup,
and child stdin descriptor kind, mode and EOF. Each runs 100 cases. The named
corpus records minimized witnesses that rejected three deliberately broken native
implementations: ignored stdin, lazy success diagnostics and wrapped browser
rejections.

The native adapter copies source modules into an isolated temporary directory,
omits only the CLI invocation and exposes private helpers for observation. It
does not modify repository sources or original assertions and timeout arguments.
The complete SSR and SSG scaffold check remains a separate integration gate.
