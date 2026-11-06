import { type Update } from 'foldkit';
import { RoomsClient } from '../../../rpc.vibe';
import { Message } from '../message.vibe';
import { Model } from '../model.vibe';
type UpdateReturn = Update.Return<Model, Message, RoomsClient>;
export declare const handleKeyPressed: (model: Model) => ({ key }: {
    key: string;
}) => UpdateReturn;
export {};
