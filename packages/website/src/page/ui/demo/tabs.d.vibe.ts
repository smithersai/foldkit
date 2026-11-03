import type { HtmlBuilder } from 'foldkit/html';
import { Tabs } from '@foldkit/ui';
import { Message } from '../message.vibe';
import type { DemoTab } from '../model.vibe';
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
        tabs: readonly ("Elm" | "Foldkit" | "React")[];
        selectedValue: "Elm" | "Foldkit" | "React";
        ariaLabel: string;
        toView: (render: Readonly<{
            tablist: readonly Readonly<{
                readonly __childAttribute: true;
                readonly attribute: unknown;
                readonly dispatch: import("../../../../node_modules/foldkit/dist/html/runtimeSingleton").DispatchSync;
                readonly resolveUnmount: (message: unknown) => () => void;
                readonly boundaryMappers: ReadonlyArray<(message: unknown) => unknown>;
                readonly resolveMountDispatch?: import("../../../../node_modules/foldkit/dist/html/runtimeSingleton").MountDispatchResolver;
            }>[];
            tabs: readonly Readonly<{
                value: "Elm" | "Foldkit" | "React";
                index: number;
                isActive: boolean;
                isFocused: boolean;
                isDisabled: boolean;
                tab: readonly Readonly<{
                    readonly __childAttribute: true;
                    readonly attribute: unknown;
                    readonly dispatch: import("../../../../node_modules/foldkit/dist/html/runtimeSingleton").DispatchSync;
                    readonly resolveUnmount: (message: unknown) => () => void;
                    readonly boundaryMappers: ReadonlyArray<(message: unknown) => unknown>;
                    readonly resolveMountDispatch?: import("../../../../node_modules/foldkit/dist/html/runtimeSingleton").MountDispatchResolver;
                }>[];
                panel: readonly Readonly<{
                    readonly __childAttribute: true;
                    readonly attribute: unknown;
                    readonly dispatch: import("../../../../node_modules/foldkit/dist/html/runtimeSingleton").DispatchSync;
                    readonly resolveUnmount: (message: unknown) => () => void;
                    readonly boundaryMappers: ReadonlyArray<(message: unknown) => unknown>;
                    readonly resolveMountDispatch?: import("../../../../node_modules/foldkit/dist/html/runtimeSingleton").MountDispatchResolver;
                }>[];
            }>[];
            activeIndex: number;
        }>) => import("foldkit/html").Html;
        isTabDisabled?: (value: "Elm" | "Foldkit" | "React", index: number) => boolean;
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
            readonly value: "Elm" | "Foldkit" | "React";
            readonly index: number;
        }>;
    }>;
}>;
export declare const horizontalDemo: (tabsModel: Tabs.Model, selectedTab: DemoTab, h: HtmlBuilder<Message>) => import("foldkit/html").Html[];
export declare const verticalDemo: (tabsModel: Tabs.Model, selectedTab: DemoTab, h: HtmlBuilder<Message>) => import("foldkit/html").Html[];
