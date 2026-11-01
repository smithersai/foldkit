import { Schema } from 'effect';
import { type Html, type HtmlBuilder } from 'foldkit/html';
export declare const State: import("foldkit/schema").TaggedUnion<{
    readonly Loading: {
        previewUrl: Schema.String;
    };
    readonly Loaded: {
        previewUrl: Schema.String;
    };
}>;
export type State = typeof State.Type;
export declare const start: (previewUrl: string) => State;
export declare const load: (state: State, previewUrl: string) => State;
export declare const view: <Message>(state: State, loadedMessage: Message, loadingView: Html, h: HtmlBuilder<Message>) => Html;
