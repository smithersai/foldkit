# HMR metadata boundary

Hydration and DevTools configuration only test whether a Vite hot context exists.
Their native modules obey the accepted `import.meta.url` restriction. Raw sibling
helpers retain one lazy metadata read per call. The property initializes real ES
modules with changing host metadata and checks identity for 100 generated
sequences; no Effect code or custom platform layer lives in the helpers.
