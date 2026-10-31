import { HashMap, HashSet } from "effect";
import { type Update } from 'foldkit';
import { Message } from './message.vibe';
import { type Model } from './model.vibe';
export declare const update: (model: Model, message: Message) => Readonly<{
    model: {
        readonly openDisclosureIds: HashSet.HashSet<string>;
        readonly snippetSizes: HashMap.HashMap<string, {
            readonly _tag: "Fits";
        } | {
            readonly _tag: "Overflows";
        }>;
    };
    commands?: Update.Commands<{
        readonly _tag: "CompletedMeasureSnippetHeight";
        readonly snippetId: string;
        readonly snippetSize: {
            readonly _tag: "Fits";
        } | {
            readonly _tag: "Overflows";
        };
    } | {
        readonly _tag: "ToggledCodeDisclosure";
        readonly disclosureId: string;
        readonly isOpen: boolean;
    }, never>;
    outMessage?: never;
}>;
