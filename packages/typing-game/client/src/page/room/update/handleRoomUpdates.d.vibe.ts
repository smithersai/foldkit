import { Option } from 'effect';
import * as Shared from '@typing-game/shared';
import { Model } from '../model.vibe';
import type { UpdateReturn } from './update.vibe';
export declare const handleRoomUpdated: (model: Model) => ({ room, maybePlayerProgress, }: {
    room: Shared.Room;
    maybePlayerProgress: Option.Option<Shared.PlayerProgress>;
}) => UpdateReturn;
