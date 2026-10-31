---
'@foldkit/ui': patch
---

Build UI declarations with TypeScript `7.1.0-dev.20261031.1`. This compiler-only
preparation reorders inferred union members in 23 declaration files while
preserving the source and runtime behavior. The unchanged-source output matches
the VibeLang compiler byte for byte, establishing the control for conversion.
