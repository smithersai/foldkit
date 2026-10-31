import { Option } from "effect";
import { type GroupKey } from './sidebarStorage.vibe';
export declare const DOCS_SIDEBAR_NAV_ID = "docs-sidebar-nav";
export declare const MOBILE_MENU_NAV_ID = "mobile-menu-nav";
export type NavPage = Readonly<{
    _tag: string;
    href: string;
    label: string;
}>;
/** Determines whether a nav page should be highlighted as active. Handles
 *  example detail pages whose `_tag` encodes the slug (e.g. `ExampleDetail:counter`). */
export declare const isNavPageActive: (routeTag: string, maybeExampleSlug: Option.Option<string>, pageTag: string) => boolean;
export type DocsSection = Readonly<{
    key: GroupKey;
    label: string;
    pageGroups: ReadonlyArray<ReadonlyArray<NavPage>>;
}>;
export declare const getStartedPage: NavPage;
export declare const docsSections: ReadonlyArray<DocsSection>;
export declare const allPages: ReadonlyArray<NavPage>;
export type PageNeighbors = Readonly<{
    maybePrevious: Option.Option<NavPage>;
    maybeNext: Option.Option<NavPage>;
}>;
export declare const pageNeighbors: (_tag: string) => PageNeighbors;
export declare const findActiveSectionKey: (routeTag: string, maybeExampleSlug: Option.Option<string>) => Option.Option<GroupKey>;
