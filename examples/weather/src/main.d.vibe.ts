import { Effect, Schema } from "effect";
import { HttpClient } from "effect/http";
import { AsyncData, Command, Runtime, type Update } from 'foldkit';
import { Document, HtmlBuilder } from 'foldkit/html';
export declare const WeatherData: Schema.Struct<{
    readonly zipCode: Schema.String;
    readonly temperature: Schema.Number;
    readonly description: Schema.String;
    readonly humidity: Schema.Number;
    readonly windSpeed: Schema.Number;
    readonly locationName: Schema.String;
    readonly region: Schema.String;
}>;
export type WeatherData = typeof WeatherData.Type;
export declare const WeatherAsyncData: Readonly<{
    schema: Schema.Codec<AsyncData.AsyncData<{
        readonly zipCode: string;
        readonly temperature: number;
        readonly description: string;
        readonly humidity: number;
        readonly windSpeed: number;
        readonly locationName: string;
        readonly region: string;
    }, string>, AsyncData.AsyncDataEncoded<{
        readonly zipCode: string;
        readonly temperature: number;
        readonly description: string;
        readonly humidity: number;
        readonly windSpeed: number;
        readonly locationName: string;
        readonly region: string;
    }, string>, never, never>;
    Idle: typeof AsyncData.Idle;
    Loading: typeof AsyncData.Loading;
    Refreshing: (payload: Readonly<{
        data: {
            readonly zipCode: string;
            readonly temperature: number;
            readonly description: string;
            readonly humidity: number;
            readonly windSpeed: number;
            readonly locationName: string;
            readonly region: string;
        };
    }>) => AsyncData.AsyncData<{
        readonly zipCode: string;
        readonly temperature: number;
        readonly description: string;
        readonly humidity: number;
        readonly windSpeed: number;
        readonly locationName: string;
        readonly region: string;
    }, string>;
    Failure: (payload: Readonly<{
        error: string;
    }>) => AsyncData.AsyncData<{
        readonly zipCode: string;
        readonly temperature: number;
        readonly description: string;
        readonly humidity: number;
        readonly windSpeed: number;
        readonly locationName: string;
        readonly region: string;
    }, string>;
    Stale: (payload: Readonly<{
        error: string;
        data: {
            readonly zipCode: string;
            readonly temperature: number;
            readonly description: string;
            readonly humidity: number;
            readonly windSpeed: number;
            readonly locationName: string;
            readonly region: string;
        };
    }>) => AsyncData.AsyncData<{
        readonly zipCode: string;
        readonly temperature: number;
        readonly description: string;
        readonly humidity: number;
        readonly windSpeed: number;
        readonly locationName: string;
        readonly region: string;
    }, string>;
    Success: (payload: Readonly<{
        data: {
            readonly zipCode: string;
            readonly temperature: number;
            readonly description: string;
            readonly humidity: number;
            readonly windSpeed: number;
            readonly locationName: string;
            readonly region: string;
        };
    }>) => AsyncData.AsyncData<{
        readonly zipCode: string;
        readonly temperature: number;
        readonly description: string;
        readonly humidity: number;
        readonly windSpeed: number;
        readonly locationName: string;
        readonly region: string;
    }, string>;
}>;
export declare const Model: Schema.Struct<{
    readonly zipCodeInput: Schema.String;
    readonly weather: Schema.Codec<AsyncData.AsyncData<{
        readonly zipCode: string;
        readonly temperature: number;
        readonly description: string;
        readonly humidity: number;
        readonly windSpeed: number;
        readonly locationName: string;
        readonly region: string;
    }, string>, AsyncData.AsyncDataEncoded<{
        readonly zipCode: string;
        readonly temperature: number;
        readonly description: string;
        readonly humidity: number;
        readonly windSpeed: number;
        readonly locationName: string;
        readonly region: string;
    }, string>, never, never>;
}>;
export type Model = typeof Model.Type;
export declare const Message: import("foldkit/message").MessageUnion<{
    readonly UpdatedZipCodeInput: {
        value: Schema.String;
    };
    readonly SubmittedWeatherForm: {};
    readonly SucceededFetchWeather: {
        weather: Schema.Struct<{
            readonly zipCode: Schema.String;
            readonly temperature: Schema.Number;
            readonly description: Schema.String;
            readonly humidity: Schema.Number;
            readonly windSpeed: Schema.Number;
            readonly locationName: Schema.String;
            readonly region: Schema.String;
        }>;
    };
    readonly FailedFetchWeather: {
        error: Schema.String;
    };
}>;
export type Message = typeof Message.Type;
export declare const update: (model: Model, message: Message) => Readonly<{
    model: {
        readonly zipCodeInput: string;
        readonly weather: AsyncData.AsyncData<{
            readonly zipCode: string;
            readonly temperature: number;
            readonly description: string;
            readonly humidity: number;
            readonly windSpeed: number;
            readonly locationName: string;
            readonly region: string;
        }, string>;
    };
    commands?: Update.Commands<{
        readonly _tag: "SubmittedWeatherForm";
    } | {
        readonly _tag: "FailedFetchWeather";
        readonly error: string;
    } | {
        readonly _tag: "SucceededFetchWeather";
        readonly weather: {
            readonly zipCode: string;
            readonly temperature: number;
            readonly description: string;
            readonly humidity: number;
            readonly windSpeed: number;
            readonly locationName: string;
            readonly region: string;
        };
    } | {
        readonly _tag: "UpdatedZipCodeInput";
        readonly value: string;
    }, never>;
    outMessage?: never;
}>;
export declare const init: Runtime.ApplicationInit<Model, Message>;
export declare const fetchWeatherEffect: (zipCode: string) => Effect.Effect<{
    readonly _tag: "FailedFetchWeather";
    readonly error: string;
} | {
    readonly _tag: "SucceededFetchWeather";
    readonly weather: {
        readonly zipCode: string;
        readonly temperature: number;
        readonly description: string;
        readonly humidity: number;
        readonly windSpeed: number;
        readonly locationName: string;
        readonly region: string;
    };
}, never, HttpClient.HttpClient>;
export declare const FetchWeather: Command.CommandDefinitionWithArgs<"FetchWeather", {
    zipCode: Schema.String;
}, Effect.Effect<{
    readonly _tag: "FailedFetchWeather";
    readonly error: string;
} | {
    readonly _tag: "SucceededFetchWeather";
    readonly weather: {
        readonly zipCode: string;
        readonly temperature: number;
        readonly description: string;
        readonly humidity: number;
        readonly windSpeed: number;
        readonly locationName: string;
        readonly region: string;
    };
}, never, never>>;
export declare const view: (model: Model, h: HtmlBuilder<Message>) => Document;
