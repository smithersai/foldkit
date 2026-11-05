---
'@foldkit/devtools-mcp': patch
---

Build the MCP executable when dependencies use dynamic imports. Keep
`server.js` as the executable entry and emit its lazy dependencies beside it.
