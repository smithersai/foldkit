# Foldkit Website

Foldkit documentation website.

The playground opens `src/main.vibe` before `src/main.ts`, so migrated examples
start at their VibeLang entry. If neither entry exists, it opens the first file
path in alphabetical order.

The website uses `vite.config.vibe` with Vite's native config loader. The
prerender command starts `scripts/runPrerender.ts`, which keeps the
`import.meta.main` check and runs the program exported by
`scripts/prerender.vibe`.

Snippet discovery accepts `.vibe` and `.vibex` alongside `.ts`. Snippets and
example source listings leave out the generated `.d.vibe.ts` and `.d.vibex.ts`
declaration sidecars.
