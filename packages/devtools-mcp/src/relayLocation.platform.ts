// Effect's NetAddress parser does not retain Node's scoped-IPv6 acceptance.
// This boundary is called only for inputs containing a zone (foldkit-58).
export { isIPv6 as isScopedIPv6 } from 'node:net'
