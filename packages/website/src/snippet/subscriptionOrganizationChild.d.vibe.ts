import { Subscription } from 'foldkit';
export declare const subscriptions: {
    readonly escapeKey: Subscription.EntryWithoutKeepAlive<Model, Message, {
        readonly isOpen: boolean;
    }, never> & {
        readonly __subscription: never;
    };
};
