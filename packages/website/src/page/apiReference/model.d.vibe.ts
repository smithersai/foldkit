import { Option, Schema } from "effect";
import { AsyncData } from 'foldkit';
export declare const ApiData: Schema.Struct<{
    readonly parsedApi: Schema.Struct<{
        readonly modules: Schema.$Array<Schema.Struct<{
            readonly name: Schema.String;
            readonly functions: Schema.$Array<Schema.Struct<{
                readonly name: Schema.String;
                readonly description: Schema.OptionFromNullishOr<Schema.String>;
                readonly signatures: Schema.$Array<Schema.Struct<{
                    readonly parameters: Schema.$Array<Schema.Struct<{
                        readonly name: Schema.String;
                        readonly type: Schema.String;
                        readonly isOptional: Schema.Boolean;
                        readonly isRest: Schema.Boolean;
                        readonly defaultValue: Schema.OptionFromNullishOr<Schema.String>;
                        readonly description: Schema.OptionFromNullishOr<Schema.String>;
                    }>>;
                    readonly returnType: Schema.String;
                    readonly typeParameters: Schema.$Array<Schema.String>;
                }>>;
                readonly sourceUrl: Schema.OptionFromNullishOr<Schema.String>;
            }>>;
            readonly types: Schema.$Array<Schema.Struct<{
                readonly name: Schema.String;
                readonly description: Schema.OptionFromNullishOr<Schema.String>;
                readonly typeDefinition: Schema.String;
                readonly sourceUrl: Schema.OptionFromNullishOr<Schema.String>;
            }>>;
            readonly interfaces: Schema.$Array<Schema.Struct<{
                readonly name: Schema.String;
                readonly description: Schema.OptionFromNullishOr<Schema.String>;
                readonly typeDefinition: Schema.String;
                readonly sourceUrl: Schema.OptionFromNullishOr<Schema.String>;
            }>>;
            readonly variables: Schema.$Array<Schema.Struct<{
                readonly name: Schema.String;
                readonly description: Schema.OptionFromNullishOr<Schema.String>;
                readonly type: Schema.String;
                readonly sourceUrl: Schema.OptionFromNullishOr<Schema.String>;
            }>>;
        }>>;
    }>;
    readonly highlights: Schema.$Record<Schema.String, Schema.String>;
}>;
export type ApiData = typeof ApiData.Type;
/**
 * Narrows a full ApiData to what one module's page renders: that module plus
 * only the highlight entries whose scoped ids belong to it. A prerendered
 * module page embeds this slice in its hydration Flags instead of the full
 * reference; the boot Command then loads the full data after hydration so
 * cross-module navigation keeps working.
 */
export declare const sliceApiDataToModule: (apiData: ApiData, moduleSlug: string) => Option.Option<ApiData>;
export declare const ApiDataAsyncData: Readonly<{
    schema: Schema.Codec<AsyncData.AsyncData<{
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
    }, string>, AsyncData.AsyncDataEncoded<{
        readonly parsedApi: {
            readonly modules: readonly {
                readonly name: string;
                readonly functions: readonly {
                    readonly name: string;
                    readonly description: string | null | undefined;
                    readonly signatures: readonly {
                        readonly parameters: readonly {
                            readonly name: string;
                            readonly type: string;
                            readonly isOptional: boolean;
                            readonly isRest: boolean;
                            readonly defaultValue: string | null | undefined;
                            readonly description: string | null | undefined;
                        }[];
                        readonly returnType: string;
                        readonly typeParameters: readonly string[];
                    }[];
                    readonly sourceUrl: string | null | undefined;
                }[];
                readonly types: readonly {
                    readonly name: string;
                    readonly description: string | null | undefined;
                    readonly typeDefinition: string;
                    readonly sourceUrl: string | null | undefined;
                }[];
                readonly interfaces: readonly {
                    readonly name: string;
                    readonly description: string | null | undefined;
                    readonly typeDefinition: string;
                    readonly sourceUrl: string | null | undefined;
                }[];
                readonly variables: readonly {
                    readonly name: string;
                    readonly description: string | null | undefined;
                    readonly type: string;
                    readonly sourceUrl: string | null | undefined;
                }[];
            }[];
        };
        readonly highlights: {
            readonly [x: string]: string;
        };
    }, string>, never, never>;
    Idle: typeof AsyncData.Idle;
    Loading: typeof AsyncData.Loading;
    Refreshing: (payload: Readonly<{
        data: {
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
    }>) => AsyncData.AsyncData<{
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
    Failure: (payload: Readonly<{
        error: string;
    }>) => AsyncData.AsyncData<{
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
    Stale: (payload: Readonly<{
        error: string;
        data: {
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
    }>) => AsyncData.AsyncData<{
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
    Success: (payload: Readonly<{
        data: {
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
    }>) => AsyncData.AsyncData<{
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
}>;
export type ApiDataAsyncData = typeof ApiDataAsyncData.schema.Type;
export declare const Disclosures: Schema.$Record<Schema.String, Schema.Boolean>;
export type Disclosures = typeof Disclosures.Type;
export declare const Model: Schema.Struct<{
    readonly apiData: Schema.Codec<AsyncData.AsyncData<{
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
    }, string>, AsyncData.AsyncDataEncoded<{
        readonly parsedApi: {
            readonly modules: readonly {
                readonly name: string;
                readonly functions: readonly {
                    readonly name: string;
                    readonly description: string | null | undefined;
                    readonly signatures: readonly {
                        readonly parameters: readonly {
                            readonly name: string;
                            readonly type: string;
                            readonly isOptional: boolean;
                            readonly isRest: boolean;
                            readonly defaultValue: string | null | undefined;
                            readonly description: string | null | undefined;
                        }[];
                        readonly returnType: string;
                        readonly typeParameters: readonly string[];
                    }[];
                    readonly sourceUrl: string | null | undefined;
                }[];
                readonly types: readonly {
                    readonly name: string;
                    readonly description: string | null | undefined;
                    readonly typeDefinition: string;
                    readonly sourceUrl: string | null | undefined;
                }[];
                readonly interfaces: readonly {
                    readonly name: string;
                    readonly description: string | null | undefined;
                    readonly typeDefinition: string;
                    readonly sourceUrl: string | null | undefined;
                }[];
                readonly variables: readonly {
                    readonly name: string;
                    readonly description: string | null | undefined;
                    readonly type: string;
                    readonly sourceUrl: string | null | undefined;
                }[];
            }[];
        };
        readonly highlights: {
            readonly [x: string]: string;
        };
    }, string>, never, never>;
    readonly disclosures: Schema.$Record<Schema.String, Schema.Boolean>;
}>;
export type Model = typeof Model.Type;
