import { Html, HtmlBuilder } from 'foldkit/html';
import { Cart } from '../domain/index.js';
import { Message } from '../main.vibe';
export declare const view: (cart: Cart.Cart, h: HtmlBuilder<Message>) => Html;
