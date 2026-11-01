import { Effect, HashSet, Schema } from 'effect';
import { Command, Update } from 'foldkit';
import { Message } from './message.vibe';
import { type Model } from './model.vibe';
export declare const update: (model: Model, message: Message) => Readonly<{
    model: {
        readonly copiedSnippetIds: HashSet.HashSet<string>;
    };
    commands?: Update.Commands<{
        readonly _tag: "FailedCopySnippet";
    } | {
        readonly _tag: "ClickedCopySnippet";
        readonly snippetId: string;
        readonly text: string;
    } | {
        readonly _tag: "CompletedWaitBeforeHidingCopiedIndicator";
        readonly snippetId: string;
    } | {
        readonly _tag: "SucceededCopySnippet";
        readonly snippetId: string;
    }, never>;
    outMessage?: never;
}>;
export declare const CopySnippet: Command.CommandDefinitionWithArgs<"CopySnippet", {
    snippetId: Schema.String;
    text: Schema.String;
}, Effect.Effect<{
    readonly _tag: "FailedCopySnippet";
} | {
    readonly _tag: "SucceededCopySnippet";
    readonly snippetId: string;
}, never, never>>;
export declare const WaitBeforeHidingCopiedIndicator: Command.CommandDefinitionWithArgs<"WaitBeforeHidingCopiedIndicator", {
    snippetId: Schema.String;
}, Effect.Effect<{
    readonly _tag: "CompletedWaitBeforeHidingCopiedIndicator";
    readonly snippetId: string;
}, never, never>>;
