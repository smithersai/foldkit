---
'foldkit': patch
'@foldkit/ui': patch
'@foldkit/devtools': patch
'create-foldkit-app': patch
'@foldkit/vite-plugin': patch
'@foldkit/devtools-mcp': patch
'@foldkit/oxlint-plugin': patch
'@foldkit/markdown': patch
'@foldkit/node': patch
---

Install VibeLang and its runtime from npm at version `0.0.13`. Package manifests previously referred to local toolchain tarballs that consumers could not install. The compiler includes the concurrent build fix and a formatter plugin that resolves under pnpm.
