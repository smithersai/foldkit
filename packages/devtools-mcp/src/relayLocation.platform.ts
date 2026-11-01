// The node:net and process calls are platform code a .vibe module does not use directly
// (VIP-33). Effect has no IPv6 predicate (foldkit-58) and the working directory is read once
// when settings load, so the raw calls live here unchanged.

import { isIPv6 } from 'node:net'

export const isIPv6Address = (host: string): boolean => isIPv6(host)

export const currentWorkingDirectory = (): string => process.cwd()
