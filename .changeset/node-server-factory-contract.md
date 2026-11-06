---
'@foldkit/node': patch
---

Keep the Node server factory lazy under VibeLang's foreign callback rules. A
failed port configuration still prevents server allocation.
