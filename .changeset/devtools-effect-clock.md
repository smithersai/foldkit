---
'foldkit': patch
---

DevTools history timestamps read the Effect monotonic clock instead of `performance.now()`. A program that provides its own `Clock` sees that clock's time in DevTools, still in milliseconds.
