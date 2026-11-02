# Scoped program migration corpus

`foldkit-scoped-fork-programs.json` records the seed and event bounds for the independent `makePreserveScheduler` model. It covers every generated prefix of schedule, virtual-time advance, flush, and cancel operations, then closes the owning scope and advances time again. Callbacks must stay cold, coalesce to the latest model, and stop after cancellation or scope closure.

The minimized repository pattern is a legacy `forkIn(scope, () => work())` whose producer is a constant, explicit `effect` function with no parameters or defaults. The scoped-fork API now consumes a program. This module uses `Effect.forkIn(work(), scope)` while the native `fork.in` syntax is unavailable in the tested toolchain. General plain factories can have eager work; their thunks must not be dropped without preserving call phase.

The same Core pass makes existing program kinds and service reads explicit. A legacy arrow with a native `catch` body needs its `effect` modifier; a written return contract alone does not mark it. The official `--fix-vip-only` pass left that case for manual repair. The recorded input and remaining migration gaps are `foldkit-130` and `foldkit-131`.

Original Foldkit tests remain unchanged. The new property compares actual timer effects against an independent synchronous model and keeps its fixed seed, 100 cases, and timeout explicit.
