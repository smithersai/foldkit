import { Option } from 'effect';
import { AsyncData, type Update } from 'foldkit';
import { Message } from './message.vibe';
import { type Model } from './model.vibe';
export type UpdateReturn = Update.Return<Model, Message>;
export declare const update: (model: Model, message: Message) => Readonly<{
    model: {
        readonly apiData: AsyncData.AsyncData<{
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
    };
    commands?: Update.Commands<{
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
    }, never>;
    outMessage?: never;
}>;
export declare const informRouteChanged: (model: Model) => Readonly<{
    model: {
        readonly apiData: AsyncData.AsyncData<{
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
    };
    commands?: Update.Commands<{
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
    }, never>;
    outMessage?: never;
}>;
