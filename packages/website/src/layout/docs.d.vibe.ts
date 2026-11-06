import { Html, type HtmlBuilder } from 'foldkit/html';
import { Message } from '../message.vibe';
import { type Model } from '../model.vibe';
import { type DocsRoute } from '../route.vibe';
export declare const headerView: (model: Model, h: HtmlBuilder<Message>) => Html;
export declare const footerView: (model: Model, h: HtmlBuilder<Message>) => Html;
export declare const searchWeight: (tag: string) => string;
export declare const view: (model: Model, docsRoute: DocsRoute, h: HtmlBuilder<Message>) => Html;
