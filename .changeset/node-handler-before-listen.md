---
'@foldkit/node': patch
---

The Node host prepares its request handler, which loads the Fetch handler bundle, before it listens. A request that reached the open port before the handler was attached was never answered, so a client that connected during startup waited until its own timeout.
