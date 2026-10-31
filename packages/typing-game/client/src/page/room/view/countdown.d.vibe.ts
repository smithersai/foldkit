import { Option } from "effect";
import { Html, HtmlBuilder } from 'foldkit/html';
import type { Message } from '../message.vibe';
export declare const countdown: (secondsLeft: number, maybeGameText: Option.Option<string>, h: HtmlBuilder<Message>) => Html;
