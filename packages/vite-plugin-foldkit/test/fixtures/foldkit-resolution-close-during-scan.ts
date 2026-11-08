export type PendingScanScenario = Readonly<{
  hasDependency: boolean
  holdUntilCrawlEnd: boolean
  eventLoopTurns: number
}>

export const foldkitResolutionPendingScan: PendingScanScenario = {
  hasDependency: true,
  holdUntilCrawlEnd: true,
  eventLoopTurns: 20,
}
