export type CrashAction = 'direct' | 'build' | 'run'

export const crashCallbackActions: ReadonlyArray<ReadonlyArray<CrashAction>> = [
  [],
  ['build'],
  ['direct'],
  ['run'],
  ['build', 'direct', 'run', 'build', 'run'],
]
