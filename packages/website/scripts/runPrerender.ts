import { NodeRuntime } from '@effect/platform-node'

import { main } from './prerender.vibe'

if (import.meta.main) {
  NodeRuntime.runMain(main())
}
