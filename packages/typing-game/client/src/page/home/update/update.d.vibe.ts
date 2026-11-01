import { Option } from 'effect';
import { type Update } from 'foldkit';
import { RoomsClient } from '../../../rpc.vibe';
import { Message, OutMessage } from '../message.vibe';
import { Model } from '../model.vibe';
export type UpdateReturn = Update.ReturnWithOutMessage<Model, Message, OutMessage, RoomsClient>;
export declare const update: (model: Model, message: Message) => Readonly<{
    model: {
        readonly homeStep: {
            readonly _tag: "EnterRoomId";
            readonly username: string;
            readonly roomId: string;
        } | {
            readonly _tag: "EnterUsername";
            readonly username: string;
        } | {
            readonly _tag: "SelectAction";
            readonly username: string;
            readonly selectedAction: "ChangeUsername" | "CreateRoom" | "JoinRoom";
        };
        readonly formError: Option.Option<string>;
    };
    commands?: Update.Commands<{
        readonly _tag: "BlurredRoomIdInput";
    } | {
        readonly _tag: "BlurredUsernameInput";
    } | {
        readonly _tag: "CompletedFocusRoomIdInput";
    } | {
        readonly _tag: "CompletedFocusUsernameInput";
    } | {
        readonly _tag: "SubmittedJoinRoomForm";
    } | {
        readonly _tag: "SubmittedUsernameForm";
    } | {
        readonly _tag: "ChangedRoomId";
        readonly value: string;
    } | {
        readonly _tag: "ChangedUsername";
        readonly value: string;
    } | {
        readonly _tag: "FailedCreateRoom";
        readonly error: string;
    } | {
        readonly _tag: "FailedJoinRoom";
        readonly error: string;
    } | {
        readonly _tag: "PressedKey";
        readonly key: string;
    } | {
        readonly _tag: "SucceededCreateRoom";
        readonly roomId: string;
        readonly player: {
            readonly id: string;
            readonly username: string;
        };
    } | {
        readonly _tag: "SucceededJoinRoom";
        readonly roomId: string;
        readonly player: {
            readonly id: string;
            readonly username: string;
        };
    }, RoomsClient>;
    outMessage?: {
        readonly _tag: "CreatedRoom";
        readonly roomId: string;
        readonly player: {
            readonly id: string;
            readonly username: string;
        };
    } | {
        readonly _tag: "JoinedRoom";
        readonly roomId: string;
        readonly player: {
            readonly id: string;
            readonly username: string;
        };
    };
}>;
