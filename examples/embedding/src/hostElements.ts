export const getElement = (elementId: string): HTMLElement => {
  const element = document.getElementById(elementId)
  if (element === null) {
    throw new Error(`Missing host element "${elementId}"`)
  }
  return element
}

export const getInputElement = (elementId: string): HTMLInputElement => {
  const element = document.getElementById(elementId)
  if (!(element instanceof HTMLInputElement)) {
    throw new Error(`Missing host input "${elementId}"`)
  }
  return element
}

