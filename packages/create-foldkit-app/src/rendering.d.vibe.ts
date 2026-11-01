import { Data } from 'effect';
import { type Example } from './examples.js';
export declare const RENDERING_VALUES: readonly ['spa', 'ssg', 'ssr'];
export type Rendering = (typeof RENDERING_VALUES)[number];
export declare const renderings: ReadonlyArray<{
    value: Rendering;
    title: string;
    description: string;
}>;
export type Scaffold = Data.TaggedEnum<{
    Spa: {
        readonly example: Example;
    };
    Ssg: {};
    Ssr: {};
}>;
export declare const Scaffold: Data.TaggedEnum.Constructor<{
    readonly _tag: "Spa";
    readonly example: Example;
} | {
    readonly _tag: "Ssg";
} | {
    readonly _tag: "Ssr";
}>;
