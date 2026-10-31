import { Html, type HtmlBuilder } from 'foldkit/html';
import { type Message } from '../message.vibe';
import { type AppRoute } from '../route.vibe';
export declare const view: (route: AppRoute, className: string, h: HtmlBuilder<Message>) => Html;
