import { Option } from "effect";
import type { Html, HtmlBuilder } from 'foldkit/html';
import { Message } from '../message.vibe';
import { Toast } from './toastModule.vibe';
type Model = typeof Toast.Model.Type;
export declare const demo: (toastModel: Model, maybeLastDismissedTitle: Option.Option<string>, h: HtmlBuilder<Message>) => ReadonlyArray<Html>;
export {};
