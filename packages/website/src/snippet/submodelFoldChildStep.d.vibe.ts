import { Update } from 'foldkit';
export declare const closeDialog: (model: Model) => Readonly<{
    model: Model;
    commands?: Update.Commands<any, never>;
    outMessage?: unknown;
}>;
