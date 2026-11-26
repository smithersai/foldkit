---
'@foldkit/oxlint-plugin': patch
---

`no-child-message-construction-in-root` treats Messages imported from `main.vibe`, `message.vibe`, `index.vibe` or `schema.vibe` as root Messages, as it does for the `.ts` modules.
