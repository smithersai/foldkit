// The document element's style, the touchmove listener and the iOS detection are platform code
// that a .vibe module does not use directly, and Effect has no DOM service, so the raw
// code lives here unchanged.
const scrollLockState = {
  count: 0,
  overflow: '',
  paddingRight: '',
}

const isIOS = (): boolean => {
  const { platform, maxTouchPoints } = window.navigator
  const isIPhone = /iPhone/gi.test(platform)
  const isIPad = /Mac/gi.test(platform) && maxTouchPoints > 0
  return isIPhone || isIPad
}

const isScrollableElement = (element: Element): boolean => {
  const style = window.getComputedStyle(element)
  const overflowY = style.overflowY
  const isOverflowable = overflowY === 'auto' || overflowY === 'scroll'
  return isOverflowable && element.scrollHeight > element.clientHeight
}

const findScrollableParent = (target: Element): Element | null => {
  let current: Element | null = target
  while (current && current !== document.documentElement) {
    if (isScrollableElement(current)) {
      return current
    }
    current = current.parentElement
  }
  return null
}

const touchTarget = (event: TouchEvent): Element | null => {
  const composed = event.composedPath()[0]
  return composed instanceof Element ? composed : null
}

const handleTouchMove = (event: TouchEvent): void => {
  const target = touchTarget(event)
  if (target && !findScrollableParent(target)) {
    event.preventDefault()
  }
}

export const lockScroll = (): void => {
  const {
    documentElement,
    documentElement: { style },
  } = document

  if (scrollLockState.count === 0) {
    scrollLockState.overflow = style.overflow
    scrollLockState.paddingRight = style.paddingRight

    const scrollbarWidth = window.innerWidth - documentElement.clientWidth

    style.overflow = 'hidden'
    style.paddingRight =
      scrollbarWidth > 0 ? `${scrollbarWidth}px` : style.paddingRight

    if (isIOS()) {
      document.addEventListener('touchmove', handleTouchMove, {
        passive: false,
      })
    }
  }

  scrollLockState.count++
}

export const unlockScroll = (): void => {
  scrollLockState.count = Math.max(0, scrollLockState.count - 1)

  if (scrollLockState.count === 0) {
    const {
      documentElement: { style },
    } = document
    style.overflow = scrollLockState.overflow
    style.paddingRight = scrollLockState.paddingRight
    document.removeEventListener('touchmove', handleTouchMove)
  }
}
