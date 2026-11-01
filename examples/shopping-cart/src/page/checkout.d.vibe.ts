import { Html, HtmlBuilder } from 'foldkit/html';
import { Cart } from '../domain/index.js';
import { Message } from '../main.js';
export declare const view: (cart: Cart.Cart, deliveryInstructions: string, orderPlaced: boolean, h: HtmlBuilder<Message>) => Html;
