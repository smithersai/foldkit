import type { ServerResponse } from 'node:http'

type HeaderWriteTracking = Readonly<{
  names: ReadonlySet<string>
  stop: () => void
}>

export const trackHeaderWrites = (
  nodeResponse: ServerResponse,
): HeaderWriteTracking => {
  const names = new Set<string>()
  const setHeader = nodeResponse.setHeader
  const appendHeader = nodeResponse.appendHeader
  const removeHeader = nodeResponse.removeHeader

  nodeResponse.setHeader = function (name, value) {
    names.add(String(name).toLowerCase())
    return Reflect.apply(setHeader, this, [name, value])
  }
  nodeResponse.appendHeader = function (name, value) {
    names.add(String(name).toLowerCase())
    return Reflect.apply(appendHeader, this, [name, value])
  }
  nodeResponse.removeHeader = function (name) {
    names.add(String(name).toLowerCase())
    return Reflect.apply(removeHeader, this, [name])
  }

  return {
    names,
    stop: () => {
      nodeResponse.setHeader = setHeader
      nodeResponse.appendHeader = appendHeader
      nodeResponse.removeHeader = removeHeader
    },
  }
}
