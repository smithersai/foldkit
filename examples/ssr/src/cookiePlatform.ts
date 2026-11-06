// Raw Document cookie assignment retained until foldkit-30 provides the browser service.
export const writeCookie = (cookie: string): void => {
  document.cookie = cookie
}
