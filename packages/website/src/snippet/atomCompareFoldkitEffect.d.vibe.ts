import { Subscription } from 'foldkit';
export declare const subscriptions: {
    readonly mouseRelease: Subscription.EntryWithoutKeepAlive<Model, Message, {
        readonly isDrawing: boolean;
    }, never> & {
        readonly __subscription: never;
    };
};
