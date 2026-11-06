import { type Update } from 'foldkit';
import { Message } from './message.vibe';
import type { Model } from './model.vibe';
export type UpdateReturn = Update.Return<Model, Message>;
export declare const update: (model: Model, message: Message) => Readonly<{
    model: {
        readonly [x: string]: boolean;
    };
    commands?: Update.Commands<{
        readonly _tag: "ToggledFaq";
        readonly id: string;
        readonly isOpen: boolean;
    }, never>;
    outMessage?: never;
}>;
