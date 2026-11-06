---
'@foldkit/ui': patch
---

VirtualList preserves mutation observer cleanup timing when setup fails: it registers the finalizer only after observation and row reconciliation complete.
