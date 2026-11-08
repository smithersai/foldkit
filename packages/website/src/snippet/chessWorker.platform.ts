export const createChessEngineWorker = (): globalThis.Worker =>
  new globalThis.Worker('/chess-engine-worker.js')
