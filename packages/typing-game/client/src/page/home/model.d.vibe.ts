import { Schema } from 'effect';
export declare const HomeAction: Schema.Literals<readonly ["CreateRoom", "JoinRoom", "ChangeUsername"]>;
export type HomeAction = typeof HomeAction.Type;
export declare const HOME_ACTIONS: ReadonlyArray<HomeAction>;
export declare const homeActionToLabel: (u: HomeAction) => "Change username" | "Create room" | "Join room";
export declare const HomeStep: import("foldkit/schema").TaggedUnion<{
    readonly EnterUsername: {
        username: Schema.String;
    };
    readonly SelectAction: {
        username: Schema.String;
        selectedAction: Schema.Literals<readonly ["CreateRoom", "JoinRoom", "ChangeUsername"]>;
    };
    readonly EnterRoomId: {
        username: Schema.String;
        roomId: Schema.String;
    };
}>;
export type HomeStep = typeof HomeStep.Type;
export declare const Model: Schema.Struct<{
    readonly homeStep: import("foldkit/schema").TaggedUnion<{
        readonly EnterUsername: {
            username: Schema.String;
        };
        readonly SelectAction: {
            username: Schema.String;
            selectedAction: Schema.Literals<readonly ["CreateRoom", "JoinRoom", "ChangeUsername"]>;
        };
        readonly EnterRoomId: {
            username: Schema.String;
            roomId: Schema.String;
        };
    }>;
    readonly formError: Schema.Option<Schema.String>;
}>;
export type Model = typeof Model.Type;
export declare const capturesKeyboard: (model: Model) => boolean;
