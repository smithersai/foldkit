import { type HtmlBuilder } from 'foldkit/html';
import { type CodeBlock } from '../component/index.js';
import { Message } from './message.vibe';
import { type Model } from './model.vibe';
export declare const renderer: <ParentMessage>(model: Model, toParentMessage: (message: Message) => ParentMessage, renderCopyButton: CodeBlock.RenderCopyButton, h: HtmlBuilder<ParentMessage>) => CodeBlock.RenderSnippet;
