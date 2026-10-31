import { AppRoute } from '../route.vibe'

export const TopLevelRoute = AppRoute.subset(['Home', 'Newsletter', 'NotFound'])
export type TopLevelRoute = typeof TopLevelRoute.Type
