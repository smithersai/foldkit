import { Submodel } from 'foldkit';
export declare const view: Submodel.View<{
    readonly _tag: "LoggedIn";
    readonly route: {
        readonly _tag: "Dashboard";
    } | {
        readonly _tag: "Settings";
    } | {
        readonly _tag: "NotFound";
        readonly path: string;
    };
    readonly session: {
        readonly userId: string;
        readonly email: string;
        readonly name: string;
    };
}, {
    readonly _tag: "ClickedLogout";
}, void>;
