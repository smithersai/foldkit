---
'create-foldkit-app': patch
---

The scaffolding command runs terminal color formatting through an Effect boundary, so it typechecks with the current VibeLang compiler. Output text and exception handling stay the same.
