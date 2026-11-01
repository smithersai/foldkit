import { Schema } from 'effect';
export declare const Message: import("foldkit/message").MessageUnion<{
    readonly RequestedApiData: {};
    readonly SucceededLoadApiData: {
        apiData: Schema.Struct<{
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
    };
    readonly FailedLoadApiData: {
        error: Schema.String;
    };
    readonly ToggledSignature: {
        id: Schema.String;
        isOpen: Schema.Boolean;
    };
}>;
export type Message = typeof Message.Type;
