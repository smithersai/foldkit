import { Readable } from 'node:stream'
import { ReadableStream } from 'node:stream/web'

export { createServer } from 'node:http'

type ResponseClose = Readonly<{
  once: (event: 'close', listener: () => void) => unknown
  off: (event: 'close', listener: () => void) => unknown
}>

export const toNodeResponseBody = (
  responseBody: globalThis.ReadableStream<Uint8Array<ArrayBuffer>>,
  nodeResponse: ResponseClose,
  signal: AbortSignal,
): Readable => {
  const webReader = responseBody.getReader()
  const nodeBody = Readable.fromWeb(
    new ReadableStream<Uint8Array>({
      async pull(controller) {
        const chunk = await webReader.read()
        if (chunk.done) {
          controller.close()
        } else {
          controller.enqueue(chunk.value)
        }
      },
      cancel: reason => webReader.cancel(reason),
    }),
  )
  const destroyBody = () => nodeBody.destroy()
  nodeResponse.once('close', destroyBody)
  nodeBody.once('close', () => nodeResponse.off('close', destroyBody))
  if (signal.aborted) {
    nodeBody.destroy()
  }
  return nodeBody
}

export const requestAtUrl = (url: string, request: Request): Request =>
  new Request(url, request)

export const responseHeaders = (response: Response): Headers =>
  new Headers(response.headers)
