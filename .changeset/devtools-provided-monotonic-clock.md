---
'foldkit': patch
---

DevTools history timestamps now read the active Effect monotonic clock inside the Message's state update. Histories recorded with a provided clock use that clock consistently, and timestamps remain expressed in milliseconds.
