import { Option } from "effect";
import { Submodel } from 'foldkit';
export declare const view: Submodel.View<{
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
}, {
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
}, void>;
