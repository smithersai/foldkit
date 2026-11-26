import {
  absentPreservedModel,
  preserveModelThrough,
  requestPreservedModel,
} from './modelPreservation.vibe'

// NOTE: this module owns the Vite hot context of the model-preservation
// protocol. Vite ties a hot context's listeners to the module that read
// `import.meta.hot`, so the reads stay here: a reload of this module clears
// the pending restore listener, and a late plugin reply cannot resume the
// previous instance's request. The protocol itself lives in
// `modelPreservation.vibe` and receives the context as an argument. Vite
// replaces `import.meta.hot` with `undefined` in a production build, so the
// hot branches below fold away there.
export const preserveModel = (
  id: string,
  encodedModel: unknown,
  isReloadFlush: boolean,
): void => {
  if (import.meta.hot) {
    preserveModelThrough(import.meta.hot, id, encodedModel, isReloadFlush)
  }
}

export const resolvePreservedModel = (runtimeId: string) =>
  import.meta.hot
    ? requestPreservedModel(import.meta.hot, runtimeId)
    : absentPreservedModel()
