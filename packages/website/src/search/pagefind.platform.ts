// Pagefind is generated after the client bundle. Keep this import dynamic.
export const loadPagefindModule = <Module>(path: string): Promise<Module> =>
  new Function('path', 'return import(path)')(path)
