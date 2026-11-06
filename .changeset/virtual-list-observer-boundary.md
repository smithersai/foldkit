---
'@foldkit/ui': patch
---

VirtualList failed to load when the runtime did not export its experimental mutation observer service. It now observes row changes through the browser API, preserving synchronous measurement and disconnecting the observer when its Mount closes.
