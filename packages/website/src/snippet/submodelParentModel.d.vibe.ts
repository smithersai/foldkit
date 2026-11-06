import { Schema } from 'effect';
export declare const Model: Schema.Struct<{
    readonly username: Schema.String;
    readonly settings: any;
}>;
export type Model = typeof Model.Type;
