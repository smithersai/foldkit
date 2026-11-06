---
'@foldkit/oxlint-plugin': patch
---

Stop publishing the `dist/native` build intermediates. The tarball ships `dist/index.js`, its declarations and the presets, as before the native rule compilation step was added; the 41 intermediate rule modules no longer ride along.
