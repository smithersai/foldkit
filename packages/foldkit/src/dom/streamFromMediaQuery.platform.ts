export const subscribeMediaQuery = (
  query: string,
  emit: (matches: boolean) => void,
): (() => void) => {
  const mediaQueryList = window.matchMedia(query)
  const handleChange = (event: MediaQueryListEvent): void => {
    emit(event.matches)
  }
  emit(mediaQueryList.matches)
  mediaQueryList.addEventListener('change', handleChange)
  return () => {
    mediaQueryList.removeEventListener('change', handleChange)
  }
}
