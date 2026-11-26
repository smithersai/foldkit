// Window is injected by the Experimental service. CustomEvent construction has
// no admitted service API; keep only that raw operation at the TypeScript edge.
export const urlChangeEvent = (): CustomEvent =>
  new CustomEvent('foldkit:urlchange')
