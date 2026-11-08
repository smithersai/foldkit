// The platform code of ssrRender.vibe, which a .vibe file does not import as a
// value (EK4402): Node's stream adapter for a request body.

import { Readable } from 'node:stream'
import { trusted } from 'vibelang-runtime'
import type { Connect } from 'vite'

// `Request` construction throws only on a malformed URL, which the host
// validated before rendering: a programmer error, so the call is trusted.
export const toWebRequest = trusted(
  (
    requestUrl: string,
    nodeRequest: Connect.IncomingMessage,
    headerEntries: ReadonlyArray<readonly [name: string, value: string]>,
  ): Request => {
    const headers = new Headers()
    for (const [name, value] of headerEntries) {
      headers.append(name, value)
    }

    const method = nodeRequest.method ?? 'GET'
    const requestInit: RequestInit & { duplex?: 'half' } = { headers, method }

    if (method !== 'GET' && method !== 'HEAD') {
      // NOTE: Node and the DOM library declare structurally different
      // ReadableStream interfaces even though Node's `Readable.toWeb` returns
      // the Web stream implementation that `Request` consumes at runtime.
      requestInit.body = Readable.toWeb(
        nodeRequest,
      ) as ReadableStream<Uint8Array>
      requestInit.duplex = 'half'
    }

    return new Request(requestUrl, requestInit)
  },
  [],
)
