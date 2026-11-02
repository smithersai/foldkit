---
'foldkit': patch
---

Keep model-preservation HMR metadata in its original host module until a native API can preserve listener ownership. Cold builds no longer reject unsupported native metadata reads; reloads retain the original cleanup behavior.
