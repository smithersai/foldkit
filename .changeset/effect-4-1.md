---
'foldkit': minor
'@foldkit/ui': minor
'@foldkit/devtools': minor
'@foldkit/devtools-mcp': minor
'@foldkit/markdown': minor
'@foldkit/node': minor
'@foldkit/vite-plugin': minor
'create-foldkit-app': minor
---

Upgrade to Effect 4.1.1. The `effect` and `@effect/*` peer dependencies now require `4.1.1`; update them in your app together. Effect 4.1 replaces `Crypto.Crypto` with `SecureRandom` from `effect/crypto`, and it starts `Stream.callback` setup immediately: a Mount whose asynchronous acquisition must stop on unmount passes `{ interruptible: true }` to `Effect.acquireRelease`.
