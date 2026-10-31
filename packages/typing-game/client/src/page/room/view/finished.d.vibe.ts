import { Option } from "effect";
import { Html, HtmlBuilder } from 'foldkit/html';
import * as Shared from '@typing-game/shared';
import type { Message } from '../message.vibe';
import { RoomPlayerSession } from '../model.vibe';
export declare const finished: (maybeScoreboard: Option.Option<Shared.Scoreboard>, hostId: string, maybeSession: Option.Option<RoomPlayerSession>, h: HtmlBuilder<Message>) => Html;
