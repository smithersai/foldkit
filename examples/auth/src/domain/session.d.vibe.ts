import { Schema } from "effect";
export declare const Session: Schema.Struct<{
    readonly userId: Schema.String;
    readonly email: Schema.String;
    readonly name: Schema.String;
}>;
export type Session = typeof Session.Type;
export declare const SessionJsonString: Schema.fromJsonString<Schema.toCodecJson<Schema.Struct<{
    readonly userId: Schema.String;
    readonly email: Schema.String;
    readonly name: Schema.String;
}>>>;
