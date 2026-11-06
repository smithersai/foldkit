# Model preservation HMR regression

Run `pnpm check:model-preservation-hmr` after installing Chromium with `pnpm --filter website exec playwright install chromium`. The check uses the pinned VibeLang compiler and a real Vite server and browser. It has no skipped mode.

The `foldkit:model-preservation:hmr-owner-lifecycle` corpus records the fixed case and fast-check seed for foldkit-129. The original bridge sends a preservation payload, restores a timely reply, then starts another request. Reloading the bridge must remove the old listener. A late reply then leaves that request to expire after its unchanged `500` ms timeout.

VIP-33 and decided detail 90 require moving unsupported raw platform calls to TypeScript. That move must also preserve behavior. Vite associates a hot context's listeners with the module that created the context. Exporting `import.meta.hot` from a sibling changes that association. The mutation control moves the context to a sibling and must fail the same test.

The browser driver compiles the native schema and actual bridge entry without incremental state. It checks actual preserve/request payloads, model results and browser errors for one fixed case and 20 generated JSON models. It waits for real WebSocket events and HMR receipts; the only application timeout remains the bridge's own timeout.

The bridge is retained as its original TypeScript entry under `foldkit-129` until a native API preserves the owning module context. The metadata regression rejects direct unsupported reads in a native entry. The same browser assertions run against either source extension; no test is skipped when the host entry is TypeScript.
