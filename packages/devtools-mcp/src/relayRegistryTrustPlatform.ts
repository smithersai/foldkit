import { tmpdir } from 'node:os'

// Existing foldkit-153: query the native temporary directory without creating it.
// foldkit-160: preserve absence of getuid on non-POSIX platforms.
export const currentUid = () => process.getuid?.()
export const temporaryDirectory = () => tmpdir()
