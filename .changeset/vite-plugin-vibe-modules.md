---
'@foldkit/vite-plugin': patch
---

VibeLang modules keep their view identity in development and production builds, and the plugin prebundles `effect/Console` so Vite serves a single copy of it.
