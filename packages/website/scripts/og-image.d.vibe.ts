import { Effect, FileSystem as FileSystem_1 } from "effect";
import { type Browser } from 'playwright';
import { type AppRoute } from '../src/route.vibe';
import { type ApiModuleNameResolver } from './metadata.vibe';
declare const OgImageError_base: new <A extends Record<string, any> = {}>(args: import("effect/Types").VoidIfEmpty<{ readonly [P in keyof A as P extends "_tag" ? never : P]: A[P]; }>) => import("effect/Cause").YieldableError & {
    readonly _tag: "OgImageError";
} & Readonly<A>;
declare class OgImageError extends OgImageError_base<{
    readonly message: string;
}> {
}
export declare const generateOgImages: (routes: ReadonlyArray<AppRoute>, routeToUrlPath: (route: AppRoute) => string, distDir: string, resolveApiModuleName: ApiModuleNameResolver, browser: Browser) => Effect.Effect<void, OgImageError | import("effect/PlatformError").PlatformError, FileSystem_1.FileSystem>;
export declare const ORGANIZATION_SCHEMA: {
    '@context': string;
    '@type': string;
    '@id': string;
    name: string;
    url: string;
    logo: string;
    description: string;
    sameAs: string[];
    contactPoint: {
        '@type': string;
        contactType: string;
        url: string;
        availableLanguage: string;
    }[];
};
export declare const injectMetaTags: (html: string, route: AppRoute, urlPath: string, resolveApiModuleName: ApiModuleNameResolver) => string;
export {};
