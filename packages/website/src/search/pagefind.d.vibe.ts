import { Context, Layer } from "effect";
type PagefindResult = Readonly<{
    data: () => Promise<Readonly<{
        url: string;
        excerpt: string;
        meta?: Readonly<{
            title?: string;
            section?: string;
            kind?: string;
        }>;
    }>>;
}>;
type PagefindResponse = Readonly<{
    results: ReadonlyArray<PagefindResult>;
}>;
declare const PagefindService_base: Context.ServiceClass<PagefindService, "PagefindService", {
    readonly search: (query: string) => Promise<PagefindResponse>;
}>;
export declare class PagefindService extends PagefindService_base {
}
export declare const pagefindLive: Layer.Layer<PagefindService, never, never>;
export {};
