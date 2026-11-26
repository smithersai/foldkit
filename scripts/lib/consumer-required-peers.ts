type PeerManifest = Readonly<{
  peerDependencies?: Readonly<Record<string, string>>
  peerDependenciesMeta?: Readonly<
    Record<string, Readonly<{ optional?: boolean }>>
  >
}>

/**
 * Dependencies a fixture must declare when its installer disables peer resolution.
 * Explicit fixture dependencies can override these ranges after spreading them.
 */
export const requiredPeerDependencies = (
  manifest: PeerManifest,
): Record<string, string> =>
  Object.fromEntries(
    Object.entries(manifest.peerDependencies ?? {}).filter(
      ([name]) => manifest.peerDependenciesMeta?.[name]?.optional !== true,
    ),
  )
