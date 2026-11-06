import { Data } from 'effect'

import { type Example } from '../../src/examples.ts'

// Minimized original Foldkit pair: this control stays in TypeScript.
export type Scaffold = Data.TaggedEnum<{
  Spa: { readonly example: Example }
  Ssg: {}
  Ssr: {}
}>

export const Scaffold = Data.taggedEnum<Scaffold>()
