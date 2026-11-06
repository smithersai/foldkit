import { Option } from 'effect';
import { Html, HtmlBuilder } from 'foldkit/html';
import { Message } from '../message.vibe';
export declare const playing: (secondsLeft: number, maybeGameText: Option.Option<string>, userGameText: string, maybeWrongCharIndex: Option.Option<number>, h: HtmlBuilder<Message>) => Html;
