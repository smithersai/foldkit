// Raw Document cookie assignment retained until Effect provides a browser cookie service.
export const writeCookie = (cookie: string): void => {
  document.cookie = cookie
}
