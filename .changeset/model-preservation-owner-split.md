---
'foldkit': patch
---

Move the model-preservation protocol into native code while the TypeScript host module keeps its Vite hot context. Reloads of either module still clear the pending restore listener, and the original 500 ms timeout, warning and payloads are unchanged.
