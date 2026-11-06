import type { Html, HtmlBuilder } from 'foldkit/html';
import { Message } from './message';
import type { Model } from './model';
export declare const view: (model: Model, h: HtmlBuilder<Message>) => Html;
export declare const update: (model: Model, message: Message) => any;
