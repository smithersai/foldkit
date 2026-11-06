import { Html, type HtmlBuilder } from 'foldkit/html';
import { Message } from '../message.vibe';
import { type Model } from '../model.vibe';
import { type BlogPostRoute, type BlogRoute } from '../route.vibe';
export declare const view: (model: Model, blogRoute: BlogRoute | BlogPostRoute, h: HtmlBuilder<Message>) => Html;
