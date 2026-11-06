---
'@foldkit/oxlint-plugin': patch
---

The `no-child-message-construction-in-root` rule no longer reports root Messages imported from `main.vibe`, `message.vibe`, `index.vibe` or `schema.vibe` as child Messages. Migrating a module to VibeLang preserves its Message ownership, and constructing a genuine child's Message from a parent still reports an error.
