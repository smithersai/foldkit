// Promise rejection remains a JavaScript exception at the async server edge.
export const makeRenderContextLoader = <A>(
  load: () => Promise<A>,
): (() => Promise<A>) => {
  let renderContextPromise: Promise<A> | undefined

  return (): Promise<A> => {
    renderContextPromise ??= load().catch((error: unknown): never => {
      renderContextPromise = undefined
      throw error
    })

    return renderContextPromise
  }
}

export const invalidRenderUrl = (url: string): never => {
  throw new Error(`Cannot render the invalid URL "${url}".`)
}
