import { type AppRoute } from '../src/route.vibe';
export type PageMetadata = Readonly<{
    title: string;
    description: string;
    section: string;
}>;
export type ApiModuleNameResolver = (slug: string) => string;
export declare const routeToMetadata: (route: AppRoute, resolveApiModuleName: ApiModuleNameResolver) => PageMetadata;
