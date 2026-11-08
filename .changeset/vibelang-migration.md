---
'foldkit': patch
'@foldkit/ui': patch
'@foldkit/devtools': patch
'@foldkit/devtools-mcp': patch
'@foldkit/markdown': patch
'@foldkit/node': patch
'@foldkit/oxlint-plugin': patch
'@foldkit/vite-plugin': patch
'create-foldkit-app': patch
---

Implement the package in VibeLang. The published entry points and type declarations keep the same exports. The compiled JavaScript imports its helpers from the new `vibelang-runtime` dependency.
