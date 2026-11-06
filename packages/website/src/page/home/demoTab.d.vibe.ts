import { Schema } from 'effect';
import { Tabs } from '@foldkit/ui';
export declare const Tab: Schema.Literals<readonly ["Architecture", "Note Player"]>;
export type Tab = typeof Tab.Type;
export declare const DemoTabs: Readonly<{
    view: import("foldkit/submodel").View<{
        readonly id: string;
        readonly maybeFocusedIndex: import("effect/Option").Option<number>;
        readonly activationMode: "Automatic" | "Manual";
    }, {
        readonly _tag: "CompletedFocusTab";
    } | {
        readonly _tag: "FocusedTab";
        readonly index: number;
    } | {
        readonly _tag: "SelectedTab";
        readonly index: number;
        readonly value: string;
    }, Readonly<{
        tabs: readonly ("Architecture" | "Note Player")[];
        selectedValue: "Architecture" | "Note Player";
        ariaLabel: string;
        toView: (render: Readonly<{
            tablist: readonly Readonly<{
                readonly __childAttribute: true;
                readonly attribute: unknown;
                readonly dispatch: import("../../../node_modules/foldkit/dist/html/runtimeSingleton").DispatchSync;
                readonly resolveUnmount: (message: unknown) => () => void;
                readonly boundaryMappers: ReadonlyArray<(message: unknown) => unknown>;
                readonly resolveMountDispatch?: import("../../../node_modules/foldkit/dist/html/runtimeSingleton").MountDispatchResolver;
            }>[];
            tabs: readonly Readonly<{
                value: "Architecture" | "Note Player";
                index: number;
                isActive: boolean;
                isFocused: boolean;
                isDisabled: boolean;
                tab: readonly Readonly<{
                    readonly __childAttribute: true;
                    readonly attribute: unknown;
                    readonly dispatch: import("../../../node_modules/foldkit/dist/html/runtimeSingleton").DispatchSync;
                    readonly resolveUnmount: (message: unknown) => () => void;
                    readonly boundaryMappers: ReadonlyArray<(message: unknown) => unknown>;
                    readonly resolveMountDispatch?: import("../../../node_modules/foldkit/dist/html/runtimeSingleton").MountDispatchResolver;
                }>[];
                panel: readonly Readonly<{
                    readonly __childAttribute: true;
                    readonly attribute: unknown;
                    readonly dispatch: import("../../../node_modules/foldkit/dist/html/runtimeSingleton").DispatchSync;
                    readonly resolveUnmount: (message: unknown) => () => void;
                    readonly boundaryMappers: ReadonlyArray<(message: unknown) => unknown>;
                    readonly resolveMountDispatch?: import("../../../node_modules/foldkit/dist/html/runtimeSingleton").MountDispatchResolver;
                }>[];
            }>[];
            activeIndex: number;
        }>) => import("foldkit/html").Html;
        isTabDisabled?: (value: "Architecture" | "Note Player", index: number) => boolean;
        orientation?: Tabs.Orientation;
        panelMount?: Tabs.PanelMount;
    }>>;
    update: (model: Tabs.Model, message: Tabs.Message) => Readonly<{
        model: {
            readonly id: string;
            readonly maybeFocusedIndex: import("effect/Option").Option<number>;
            readonly activationMode: "Automatic" | "Manual";
        };
        commands?: import("foldkit/update").Commands<{
            readonly _tag: "CompletedFocusTab";
        } | {
            readonly _tag: "FocusedTab";
            readonly index: number;
        } | {
            readonly _tag: "SelectedTab";
            readonly index: number;
            readonly value: string;
        }, never>;
        outMessage?: Readonly<{
            readonly _tag: 'Selected';
            readonly value: "Architecture" | "Note Player";
            readonly index: number;
        }>;
    }>;
}>;
export declare const all: ReadonlyArray<Tab>;
export declare const isActive: (tab: Tab) => (activeDemoTab: Tab) => boolean;
