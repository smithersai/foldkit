import { tmpdir } from 'node:os'

// Query the native temporary directory without creating it.
// Preserve absence of getuid on non-POSIX platforms.
export const currentUid = () => process.getuid?.()
export const temporaryDirectory = () => tmpdir()
