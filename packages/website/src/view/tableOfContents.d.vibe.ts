import { Option } from 'effect';
import { type Html, type HtmlBuilder } from 'foldkit/html';
import { Message } from '../message.vibe';
import { type TableOfContentsEntry } from '../tableOfContentsEntry.js';
export declare const view: (entries: ReadonlyArray<TableOfContentsEntry>, maybeActiveSectionId: Option.Option<string>, h: HtmlBuilder<Message>) => Html;
export declare const mobileView: (entries: ReadonlyArray<TableOfContentsEntry>, maybeActiveSectionId: Option.Option<string>, isOpen: boolean, h: HtmlBuilder<Message>) => Html;
