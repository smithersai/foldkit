import { Option } from 'effect';
import { Submodel } from 'foldkit';
import { Html } from 'foldkit/html';
import { type RenderHeadingLink } from '../../prose.vibe';
import { type ApiModule } from './domain.vibe';
import type { ApiData } from './model.vibe';
type Highlights = ApiData['highlights'];
/**
 * Renders one API module: its sections and every function, type, interface, and
 * constant it exports.
 *
 * The page is dispatched through `h.submodel`, so it takes `renderHeadingLink`
 * from its parent rather than building the copy-link itself. The control carries
 * an app-level Message, and a handler's dispatcher comes from the frame the
 * element is built in, so one built here would be rejected by this Submodel's
 * `toParentMessage`.
 */
export declare const view: Submodel.View<{
    readonly apiData: import("foldkit/asyncData").AsyncData<{
        readonly parsedApi: {
            readonly modules: readonly {
                readonly name: string;
                readonly functions: readonly {
                    readonly name: string;
                    readonly description: Option.Option<string>;
                    readonly signatures: readonly {
                        readonly parameters: readonly {
                            readonly name: string;
                            readonly type: string;
                            readonly isOptional: boolean;
                            readonly isRest: boolean;
                            readonly defaultValue: Option.Option<string>;
                            readonly description: Option.Option<string>;
                        }[];
                        readonly returnType: string;
                        readonly typeParameters: readonly string[];
                    }[];
                    readonly sourceUrl: Option.Option<string>;
                }[];
                readonly types: readonly {
                    readonly name: string;
                    readonly description: Option.Option<string>;
                    readonly typeDefinition: string;
                    readonly sourceUrl: Option.Option<string>;
                }[];
                readonly interfaces: readonly {
                    readonly name: string;
                    readonly description: Option.Option<string>;
                    readonly typeDefinition: string;
                    readonly sourceUrl: Option.Option<string>;
                }[];
                readonly variables: readonly {
                    readonly name: string;
                    readonly description: Option.Option<string>;
                    readonly type: string;
                    readonly sourceUrl: Option.Option<string>;
                }[];
            }[];
        };
        readonly highlights: {
            readonly [x: string]: string;
        };
    }, string>;
    readonly disclosures: {
        readonly [x: string]: boolean;
    };
}, {
    readonly _tag: "RequestedApiData";
} | {
    readonly _tag: "FailedLoadApiData";
    readonly error: string;
} | {
    readonly _tag: "SucceededLoadApiData";
    readonly apiData: {
        readonly parsedApi: {
            readonly modules: readonly {
                readonly name: string;
                readonly functions: readonly {
                    readonly name: string;
                    readonly description: Option.Option<string>;
                    readonly signatures: readonly {
                        readonly parameters: readonly {
                            readonly name: string;
                            readonly type: string;
                            readonly isOptional: boolean;
                            readonly isRest: boolean;
                            readonly defaultValue: Option.Option<string>;
                            readonly description: Option.Option<string>;
                        }[];
                        readonly returnType: string;
                        readonly typeParameters: readonly string[];
                    }[];
                    readonly sourceUrl: Option.Option<string>;
                }[];
                readonly types: readonly {
                    readonly name: string;
                    readonly description: Option.Option<string>;
                    readonly typeDefinition: string;
                    readonly sourceUrl: Option.Option<string>;
                }[];
                readonly interfaces: readonly {
                    readonly name: string;
                    readonly description: Option.Option<string>;
                    readonly typeDefinition: string;
                    readonly sourceUrl: Option.Option<string>;
                }[];
                readonly variables: readonly {
                    readonly name: string;
                    readonly description: Option.Option<string>;
                    readonly type: string;
                    readonly sourceUrl: Option.Option<string>;
                }[];
            }[];
        };
        readonly highlights: {
            readonly [x: string]: string;
        };
    };
} | {
    readonly _tag: "ToggledSignature";
    readonly id: string;
    readonly isOpen: boolean;
}, Readonly<{
    module: ApiModule;
    highlights: Highlights;
    renderHeadingLink: RenderHeadingLink;
}>>;
export declare const skeletonView: () => Html;
export declare const failureView: (error: string) => Html;
export {};
