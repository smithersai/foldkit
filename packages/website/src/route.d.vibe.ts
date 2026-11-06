import { Schema } from 'effect';
export declare const AppRoute: import("foldkit/route").RouteUnion<{
    readonly Home: {};
    readonly WhyFoldkit: {};
    readonly Performance: {};
    readonly ComingFromReact: {};
    readonly ComingFromTanStackQuery: {};
    readonly ReactComparison: {};
    readonly EffectAtomComparison: {};
    readonly ElmComparison: {};
    readonly GetStarted: {};
    readonly Roadmap: {};
    readonly RoutingAndNavigation: {};
    readonly FieldValidation: {};
    readonly Testing: {};
    readonly TestingStory: {};
    readonly TestingScene: {};
    readonly Examples: {};
    readonly ExampleDetail: {
        exampleSlug: Schema.String;
    };
    readonly TypingTerminal: {};
    readonly Playground: {
        exampleSlug: Schema.String;
    };
    readonly BestPracticesSideEffects: {};
    readonly BestPracticesMessages: {};
    readonly BestPracticesKeying: {};
    readonly BestPracticesImmutability: {};
    readonly ProjectOrganization: {};
    readonly ToolingLinting: {};
    readonly ApiModule: {
        moduleSlug: Schema.String;
    };
    readonly CoreArchitecture: {};
    readonly CoreCounterExample: {};
    readonly CoreModel: {};
    readonly CoreMessages: {};
    readonly CoreUpdate: {};
    readonly CoreView: {};
    readonly CoreCommands: {};
    readonly CoreMount: {};
    readonly CoreCustomElement: {};
    readonly CoreSubscriptions: {};
    readonly CoreInitAndFlags: {};
    readonly CoreDom: {};
    readonly CoreRender: {};
    readonly CoreFile: {};
    readonly CoreHttp: {};
    readonly CoreQuery: {};
    readonly CoreCanvas: {};
    readonly CoreRuntime: {};
    readonly CoreServerRendering: {};
    readonly CoreResources: {};
    readonly CoreManagedResources: {};
    readonly CoreDevTools: {};
    readonly CoreCrashView: {};
    readonly CoreViewTransitions: {};
    readonly CoreSlowWarnings: {};
    readonly CoreFreezeModel: {};
    readonly CorePreserveScroll: {};
    readonly CoreViewMemoization: {};
    readonly CoreEmbedding: {};
    readonly CoreSubmodel: {};
    readonly CoreMachine: {};
    readonly AsyncData: {};
    readonly PatternsAntiPatterns: {};
    readonly PatternsInformingSubmodels: {};
    readonly PatternsSubscriptionOrganization: {};
    readonly UiOverview: {};
    readonly UiSelectionSubmodels: {};
    readonly UiButton: {};
    readonly UiCalendar: {};
    readonly UiDatePicker: {};
    readonly UiCheckbox: {};
    readonly UiTabs: {};
    readonly UiNav: {};
    readonly UiDisclosure: {};
    readonly UiDialog: {};
    readonly UiMenu: {};
    readonly UiPopover: {};
    readonly UiListbox: {};
    readonly UiRadioGroup: {};
    readonly UiSelect: {};
    readonly UiSlider: {};
    readonly UiMeter: {};
    readonly UiProgress: {};
    readonly UiSwitch: {};
    readonly UiCombobox: {};
    readonly UiInput: {};
    readonly UiTextarea: {};
    readonly UiFieldset: {};
    readonly UiDragAndDrop: {};
    readonly UiFileDrop: {};
    readonly UiHoverIntent: {};
    readonly UiToast: {};
    readonly UiTooltip: {};
    readonly UiAnimation: {};
    readonly UiAnchor: {};
    readonly UiVirtualList: {};
    readonly About: {};
    readonly Contact: {};
    readonly Privacy: {};
    readonly ContentApi: {};
    readonly AiOverview: {};
    readonly AiSkills: {};
    readonly AiMcp: {};
    readonly Newsletter: {};
    readonly Blog: {};
    readonly BlogPost: {
        postSlug: Schema.String;
    };
    readonly NotFound: {
        path: Schema.String;
    };
}>;
export type AppRoute = typeof AppRoute.Type;
export declare const DocsRoute: Schema.Union<readonly [Schema.TaggedStruct<"WhyFoldkit", {}> & ((value?: void | {
    readonly _tag?: "WhyFoldkit";
} | undefined) => {
    readonly _tag: "WhyFoldkit";
}), Schema.TaggedStruct<"Performance", {}> & ((value?: void | {
    readonly _tag?: "Performance";
} | undefined) => {
    readonly _tag: "Performance";
}), Schema.TaggedStruct<"ComingFromReact", {}> & ((value?: void | {
    readonly _tag?: "ComingFromReact";
} | undefined) => {
    readonly _tag: "ComingFromReact";
}), Schema.TaggedStruct<"ComingFromTanStackQuery", {}> & ((value?: void | {
    readonly _tag?: "ComingFromTanStackQuery";
} | undefined) => {
    readonly _tag: "ComingFromTanStackQuery";
}), Schema.TaggedStruct<"ReactComparison", {}> & ((value?: void | {
    readonly _tag?: "ReactComparison";
} | undefined) => {
    readonly _tag: "ReactComparison";
}), Schema.TaggedStruct<"EffectAtomComparison", {}> & ((value?: void | {
    readonly _tag?: "EffectAtomComparison";
} | undefined) => {
    readonly _tag: "EffectAtomComparison";
}), Schema.TaggedStruct<"ElmComparison", {}> & ((value?: void | {
    readonly _tag?: "ElmComparison";
} | undefined) => {
    readonly _tag: "ElmComparison";
}), Schema.TaggedStruct<"GetStarted", {}> & ((value?: void | {
    readonly _tag?: "GetStarted";
} | undefined) => {
    readonly _tag: "GetStarted";
}), Schema.TaggedStruct<"Roadmap", {}> & ((value?: void | {
    readonly _tag?: "Roadmap";
} | undefined) => {
    readonly _tag: "Roadmap";
}), Schema.TaggedStruct<"RoutingAndNavigation", {}> & ((value?: void | {
    readonly _tag?: "RoutingAndNavigation";
} | undefined) => {
    readonly _tag: "RoutingAndNavigation";
}), Schema.TaggedStruct<"FieldValidation", {}> & ((value?: void | {
    readonly _tag?: "FieldValidation";
} | undefined) => {
    readonly _tag: "FieldValidation";
}), Schema.TaggedStruct<"Testing", {}> & ((value?: void | {
    readonly _tag?: "Testing";
} | undefined) => {
    readonly _tag: "Testing";
}), Schema.TaggedStruct<"TestingStory", {}> & ((value?: void | {
    readonly _tag?: "TestingStory";
} | undefined) => {
    readonly _tag: "TestingStory";
}), Schema.TaggedStruct<"TestingScene", {}> & ((value?: void | {
    readonly _tag?: "TestingScene";
} | undefined) => {
    readonly _tag: "TestingScene";
}), Schema.TaggedStruct<"Examples", {}> & ((value?: void | {
    readonly _tag?: "Examples";
} | undefined) => {
    readonly _tag: "Examples";
}), Schema.TaggedStruct<"ExampleDetail", {
    readonly exampleSlug: Schema.String;
}> & ((value: {
    readonly _tag?: "ExampleDetail";
    readonly exampleSlug: string;
}) => {
    readonly _tag: "ExampleDetail";
    readonly exampleSlug: string;
}), Schema.TaggedStruct<"TypingTerminal", {}> & ((value?: void | {
    readonly _tag?: "TypingTerminal";
} | undefined) => {
    readonly _tag: "TypingTerminal";
}), Schema.TaggedStruct<"BestPracticesSideEffects", {}> & ((value?: void | {
    readonly _tag?: "BestPracticesSideEffects";
} | undefined) => {
    readonly _tag: "BestPracticesSideEffects";
}), Schema.TaggedStruct<"BestPracticesMessages", {}> & ((value?: void | {
    readonly _tag?: "BestPracticesMessages";
} | undefined) => {
    readonly _tag: "BestPracticesMessages";
}), Schema.TaggedStruct<"BestPracticesKeying", {}> & ((value?: void | {
    readonly _tag?: "BestPracticesKeying";
} | undefined) => {
    readonly _tag: "BestPracticesKeying";
}), Schema.TaggedStruct<"BestPracticesImmutability", {}> & ((value?: void | {
    readonly _tag?: "BestPracticesImmutability";
} | undefined) => {
    readonly _tag: "BestPracticesImmutability";
}), Schema.TaggedStruct<"ProjectOrganization", {}> & ((value?: void | {
    readonly _tag?: "ProjectOrganization";
} | undefined) => {
    readonly _tag: "ProjectOrganization";
}), Schema.TaggedStruct<"ToolingLinting", {}> & ((value?: void | {
    readonly _tag?: "ToolingLinting";
} | undefined) => {
    readonly _tag: "ToolingLinting";
}), Schema.TaggedStruct<"ApiModule", {
    readonly moduleSlug: Schema.String;
}> & ((value: {
    readonly _tag?: "ApiModule";
    readonly moduleSlug: string;
}) => {
    readonly _tag: "ApiModule";
    readonly moduleSlug: string;
}), Schema.TaggedStruct<"CoreArchitecture", {}> & ((value?: void | {
    readonly _tag?: "CoreArchitecture";
} | undefined) => {
    readonly _tag: "CoreArchitecture";
}), Schema.TaggedStruct<"CoreCounterExample", {}> & ((value?: void | {
    readonly _tag?: "CoreCounterExample";
} | undefined) => {
    readonly _tag: "CoreCounterExample";
}), Schema.TaggedStruct<"CoreModel", {}> & ((value?: void | {
    readonly _tag?: "CoreModel";
} | undefined) => {
    readonly _tag: "CoreModel";
}), Schema.TaggedStruct<"CoreMessages", {}> & ((value?: void | {
    readonly _tag?: "CoreMessages";
} | undefined) => {
    readonly _tag: "CoreMessages";
}), Schema.TaggedStruct<"CoreUpdate", {}> & ((value?: void | {
    readonly _tag?: "CoreUpdate";
} | undefined) => {
    readonly _tag: "CoreUpdate";
}), Schema.TaggedStruct<"CoreView", {}> & ((value?: void | {
    readonly _tag?: "CoreView";
} | undefined) => {
    readonly _tag: "CoreView";
}), Schema.TaggedStruct<"CoreCommands", {}> & ((value?: void | {
    readonly _tag?: "CoreCommands";
} | undefined) => {
    readonly _tag: "CoreCommands";
}), Schema.TaggedStruct<"CoreMount", {}> & ((value?: void | {
    readonly _tag?: "CoreMount";
} | undefined) => {
    readonly _tag: "CoreMount";
}), Schema.TaggedStruct<"CoreCustomElement", {}> & ((value?: void | {
    readonly _tag?: "CoreCustomElement";
} | undefined) => {
    readonly _tag: "CoreCustomElement";
}), Schema.TaggedStruct<"CoreSubscriptions", {}> & ((value?: void | {
    readonly _tag?: "CoreSubscriptions";
} | undefined) => {
    readonly _tag: "CoreSubscriptions";
}), Schema.TaggedStruct<"CoreInitAndFlags", {}> & ((value?: void | {
    readonly _tag?: "CoreInitAndFlags";
} | undefined) => {
    readonly _tag: "CoreInitAndFlags";
}), Schema.TaggedStruct<"CoreDom", {}> & ((value?: void | {
    readonly _tag?: "CoreDom";
} | undefined) => {
    readonly _tag: "CoreDom";
}), Schema.TaggedStruct<"CoreRender", {}> & ((value?: void | {
    readonly _tag?: "CoreRender";
} | undefined) => {
    readonly _tag: "CoreRender";
}), Schema.TaggedStruct<"CoreFile", {}> & ((value?: void | {
    readonly _tag?: "CoreFile";
} | undefined) => {
    readonly _tag: "CoreFile";
}), Schema.TaggedStruct<"CoreHttp", {}> & ((value?: void | {
    readonly _tag?: "CoreHttp";
} | undefined) => {
    readonly _tag: "CoreHttp";
}), Schema.TaggedStruct<"CoreQuery", {}> & ((value?: void | {
    readonly _tag?: "CoreQuery";
} | undefined) => {
    readonly _tag: "CoreQuery";
}), Schema.TaggedStruct<"CoreCanvas", {}> & ((value?: void | {
    readonly _tag?: "CoreCanvas";
} | undefined) => {
    readonly _tag: "CoreCanvas";
}), Schema.TaggedStruct<"CoreRuntime", {}> & ((value?: void | {
    readonly _tag?: "CoreRuntime";
} | undefined) => {
    readonly _tag: "CoreRuntime";
}), Schema.TaggedStruct<"CoreServerRendering", {}> & ((value?: void | {
    readonly _tag?: "CoreServerRendering";
} | undefined) => {
    readonly _tag: "CoreServerRendering";
}), Schema.TaggedStruct<"CoreResources", {}> & ((value?: void | {
    readonly _tag?: "CoreResources";
} | undefined) => {
    readonly _tag: "CoreResources";
}), Schema.TaggedStruct<"CoreManagedResources", {}> & ((value?: void | {
    readonly _tag?: "CoreManagedResources";
} | undefined) => {
    readonly _tag: "CoreManagedResources";
}), Schema.TaggedStruct<"CoreDevTools", {}> & ((value?: void | {
    readonly _tag?: "CoreDevTools";
} | undefined) => {
    readonly _tag: "CoreDevTools";
}), Schema.TaggedStruct<"CoreCrashView", {}> & ((value?: void | {
    readonly _tag?: "CoreCrashView";
} | undefined) => {
    readonly _tag: "CoreCrashView";
}), Schema.TaggedStruct<"CoreViewTransitions", {}> & ((value?: void | {
    readonly _tag?: "CoreViewTransitions";
} | undefined) => {
    readonly _tag: "CoreViewTransitions";
}), Schema.TaggedStruct<"CoreSlowWarnings", {}> & ((value?: void | {
    readonly _tag?: "CoreSlowWarnings";
} | undefined) => {
    readonly _tag: "CoreSlowWarnings";
}), Schema.TaggedStruct<"CoreFreezeModel", {}> & ((value?: void | {
    readonly _tag?: "CoreFreezeModel";
} | undefined) => {
    readonly _tag: "CoreFreezeModel";
}), Schema.TaggedStruct<"CorePreserveScroll", {}> & ((value?: void | {
    readonly _tag?: "CorePreserveScroll";
} | undefined) => {
    readonly _tag: "CorePreserveScroll";
}), Schema.TaggedStruct<"CoreViewMemoization", {}> & ((value?: void | {
    readonly _tag?: "CoreViewMemoization";
} | undefined) => {
    readonly _tag: "CoreViewMemoization";
}), Schema.TaggedStruct<"CoreEmbedding", {}> & ((value?: void | {
    readonly _tag?: "CoreEmbedding";
} | undefined) => {
    readonly _tag: "CoreEmbedding";
}), Schema.TaggedStruct<"CoreSubmodel", {}> & ((value?: void | {
    readonly _tag?: "CoreSubmodel";
} | undefined) => {
    readonly _tag: "CoreSubmodel";
}), Schema.TaggedStruct<"CoreMachine", {}> & ((value?: void | {
    readonly _tag?: "CoreMachine";
} | undefined) => {
    readonly _tag: "CoreMachine";
}), Schema.TaggedStruct<"AsyncData", {}> & ((value?: void | {
    readonly _tag?: "AsyncData";
} | undefined) => {
    readonly _tag: "AsyncData";
}), Schema.TaggedStruct<"PatternsAntiPatterns", {}> & ((value?: void | {
    readonly _tag?: "PatternsAntiPatterns";
} | undefined) => {
    readonly _tag: "PatternsAntiPatterns";
}), Schema.TaggedStruct<"PatternsInformingSubmodels", {}> & ((value?: void | {
    readonly _tag?: "PatternsInformingSubmodels";
} | undefined) => {
    readonly _tag: "PatternsInformingSubmodels";
}), Schema.TaggedStruct<"PatternsSubscriptionOrganization", {}> & ((value?: void | {
    readonly _tag?: "PatternsSubscriptionOrganization";
} | undefined) => {
    readonly _tag: "PatternsSubscriptionOrganization";
}), Schema.TaggedStruct<"UiOverview", {}> & ((value?: void | {
    readonly _tag?: "UiOverview";
} | undefined) => {
    readonly _tag: "UiOverview";
}), Schema.TaggedStruct<"UiSelectionSubmodels", {}> & ((value?: void | {
    readonly _tag?: "UiSelectionSubmodels";
} | undefined) => {
    readonly _tag: "UiSelectionSubmodels";
}), Schema.TaggedStruct<"UiButton", {}> & ((value?: void | {
    readonly _tag?: "UiButton";
} | undefined) => {
    readonly _tag: "UiButton";
}), Schema.TaggedStruct<"UiCalendar", {}> & ((value?: void | {
    readonly _tag?: "UiCalendar";
} | undefined) => {
    readonly _tag: "UiCalendar";
}), Schema.TaggedStruct<"UiDatePicker", {}> & ((value?: void | {
    readonly _tag?: "UiDatePicker";
} | undefined) => {
    readonly _tag: "UiDatePicker";
}), Schema.TaggedStruct<"UiCheckbox", {}> & ((value?: void | {
    readonly _tag?: "UiCheckbox";
} | undefined) => {
    readonly _tag: "UiCheckbox";
}), Schema.TaggedStruct<"UiTabs", {}> & ((value?: void | {
    readonly _tag?: "UiTabs";
} | undefined) => {
    readonly _tag: "UiTabs";
}), Schema.TaggedStruct<"UiNav", {}> & ((value?: void | {
    readonly _tag?: "UiNav";
} | undefined) => {
    readonly _tag: "UiNav";
}), Schema.TaggedStruct<"UiDisclosure", {}> & ((value?: void | {
    readonly _tag?: "UiDisclosure";
} | undefined) => {
    readonly _tag: "UiDisclosure";
}), Schema.TaggedStruct<"UiDialog", {}> & ((value?: void | {
    readonly _tag?: "UiDialog";
} | undefined) => {
    readonly _tag: "UiDialog";
}), Schema.TaggedStruct<"UiMenu", {}> & ((value?: void | {
    readonly _tag?: "UiMenu";
} | undefined) => {
    readonly _tag: "UiMenu";
}), Schema.TaggedStruct<"UiPopover", {}> & ((value?: void | {
    readonly _tag?: "UiPopover";
} | undefined) => {
    readonly _tag: "UiPopover";
}), Schema.TaggedStruct<"UiListbox", {}> & ((value?: void | {
    readonly _tag?: "UiListbox";
} | undefined) => {
    readonly _tag: "UiListbox";
}), Schema.TaggedStruct<"UiRadioGroup", {}> & ((value?: void | {
    readonly _tag?: "UiRadioGroup";
} | undefined) => {
    readonly _tag: "UiRadioGroup";
}), Schema.TaggedStruct<"UiSelect", {}> & ((value?: void | {
    readonly _tag?: "UiSelect";
} | undefined) => {
    readonly _tag: "UiSelect";
}), Schema.TaggedStruct<"UiSlider", {}> & ((value?: void | {
    readonly _tag?: "UiSlider";
} | undefined) => {
    readonly _tag: "UiSlider";
}), Schema.TaggedStruct<"UiMeter", {}> & ((value?: void | {
    readonly _tag?: "UiMeter";
} | undefined) => {
    readonly _tag: "UiMeter";
}), Schema.TaggedStruct<"UiProgress", {}> & ((value?: void | {
    readonly _tag?: "UiProgress";
} | undefined) => {
    readonly _tag: "UiProgress";
}), Schema.TaggedStruct<"UiSwitch", {}> & ((value?: void | {
    readonly _tag?: "UiSwitch";
} | undefined) => {
    readonly _tag: "UiSwitch";
}), Schema.TaggedStruct<"UiCombobox", {}> & ((value?: void | {
    readonly _tag?: "UiCombobox";
} | undefined) => {
    readonly _tag: "UiCombobox";
}), Schema.TaggedStruct<"UiInput", {}> & ((value?: void | {
    readonly _tag?: "UiInput";
} | undefined) => {
    readonly _tag: "UiInput";
}), Schema.TaggedStruct<"UiTextarea", {}> & ((value?: void | {
    readonly _tag?: "UiTextarea";
} | undefined) => {
    readonly _tag: "UiTextarea";
}), Schema.TaggedStruct<"UiFieldset", {}> & ((value?: void | {
    readonly _tag?: "UiFieldset";
} | undefined) => {
    readonly _tag: "UiFieldset";
}), Schema.TaggedStruct<"UiDragAndDrop", {}> & ((value?: void | {
    readonly _tag?: "UiDragAndDrop";
} | undefined) => {
    readonly _tag: "UiDragAndDrop";
}), Schema.TaggedStruct<"UiFileDrop", {}> & ((value?: void | {
    readonly _tag?: "UiFileDrop";
} | undefined) => {
    readonly _tag: "UiFileDrop";
}), Schema.TaggedStruct<"UiHoverIntent", {}> & ((value?: void | {
    readonly _tag?: "UiHoverIntent";
} | undefined) => {
    readonly _tag: "UiHoverIntent";
}), Schema.TaggedStruct<"UiToast", {}> & ((value?: void | {
    readonly _tag?: "UiToast";
} | undefined) => {
    readonly _tag: "UiToast";
}), Schema.TaggedStruct<"UiTooltip", {}> & ((value?: void | {
    readonly _tag?: "UiTooltip";
} | undefined) => {
    readonly _tag: "UiTooltip";
}), Schema.TaggedStruct<"UiAnimation", {}> & ((value?: void | {
    readonly _tag?: "UiAnimation";
} | undefined) => {
    readonly _tag: "UiAnimation";
}), Schema.TaggedStruct<"UiAnchor", {}> & ((value?: void | {
    readonly _tag?: "UiAnchor";
} | undefined) => {
    readonly _tag: "UiAnchor";
}), Schema.TaggedStruct<"UiVirtualList", {}> & ((value?: void | {
    readonly _tag?: "UiVirtualList";
} | undefined) => {
    readonly _tag: "UiVirtualList";
}), Schema.TaggedStruct<"AiOverview", {}> & ((value?: void | {
    readonly _tag?: "AiOverview";
} | undefined) => {
    readonly _tag: "AiOverview";
}), Schema.TaggedStruct<"AiSkills", {}> & ((value?: void | {
    readonly _tag?: "AiSkills";
} | undefined) => {
    readonly _tag: "AiSkills";
}), Schema.TaggedStruct<"AiMcp", {}> & ((value?: void | {
    readonly _tag?: "AiMcp";
} | undefined) => {
    readonly _tag: "AiMcp";
}), Schema.TaggedStruct<"About", {}> & ((value?: void | {
    readonly _tag?: "About";
} | undefined) => {
    readonly _tag: "About";
}), Schema.TaggedStruct<"Contact", {}> & ((value?: void | {
    readonly _tag?: "Contact";
} | undefined) => {
    readonly _tag: "Contact";
}), Schema.TaggedStruct<"Privacy", {}> & ((value?: void | {
    readonly _tag?: "Privacy";
} | undefined) => {
    readonly _tag: "Privacy";
}), Schema.TaggedStruct<"ContentApi", {}> & ((value?: void | {
    readonly _tag?: "ContentApi";
} | undefined) => {
    readonly _tag: "ContentApi";
}), Schema.TaggedStruct<"NotFound", {
    readonly path: Schema.String;
}> & ((value: {
    readonly _tag?: "NotFound";
    readonly path: string;
}) => {
    readonly _tag: "NotFound";
    readonly path: string;
})]>;
export type DocsRoute = typeof DocsRoute.Type;
export type BlogRoute = typeof AppRoute.Blog.Type;
export type BlogPostRoute = typeof AppRoute.BlogPost.Type;
export type PlaygroundRoute = typeof AppRoute.Playground.Type;
export declare const isPlaygroundRoute: (value: {
    readonly _tag: "About";
} | {
    readonly _tag: "AiMcp";
} | {
    readonly _tag: "AiOverview";
} | {
    readonly _tag: "AiSkills";
} | {
    readonly _tag: "AsyncData";
} | {
    readonly _tag: "BestPracticesImmutability";
} | {
    readonly _tag: "BestPracticesKeying";
} | {
    readonly _tag: "BestPracticesMessages";
} | {
    readonly _tag: "BestPracticesSideEffects";
} | {
    readonly _tag: "Blog";
} | {
    readonly _tag: "ComingFromReact";
} | {
    readonly _tag: "ComingFromTanStackQuery";
} | {
    readonly _tag: "Contact";
} | {
    readonly _tag: "ContentApi";
} | {
    readonly _tag: "CoreArchitecture";
} | {
    readonly _tag: "CoreCanvas";
} | {
    readonly _tag: "CoreCommands";
} | {
    readonly _tag: "CoreCounterExample";
} | {
    readonly _tag: "CoreCrashView";
} | {
    readonly _tag: "CoreCustomElement";
} | {
    readonly _tag: "CoreDevTools";
} | {
    readonly _tag: "CoreDom";
} | {
    readonly _tag: "CoreEmbedding";
} | {
    readonly _tag: "CoreFile";
} | {
    readonly _tag: "CoreFreezeModel";
} | {
    readonly _tag: "CoreHttp";
} | {
    readonly _tag: "CoreInitAndFlags";
} | {
    readonly _tag: "CoreMachine";
} | {
    readonly _tag: "CoreManagedResources";
} | {
    readonly _tag: "CoreMessages";
} | {
    readonly _tag: "CoreModel";
} | {
    readonly _tag: "CoreMount";
} | {
    readonly _tag: "CorePreserveScroll";
} | {
    readonly _tag: "CoreQuery";
} | {
    readonly _tag: "CoreRender";
} | {
    readonly _tag: "CoreResources";
} | {
    readonly _tag: "CoreRuntime";
} | {
    readonly _tag: "CoreServerRendering";
} | {
    readonly _tag: "CoreSlowWarnings";
} | {
    readonly _tag: "CoreSubmodel";
} | {
    readonly _tag: "CoreSubscriptions";
} | {
    readonly _tag: "CoreUpdate";
} | {
    readonly _tag: "CoreView";
} | {
    readonly _tag: "CoreViewMemoization";
} | {
    readonly _tag: "CoreViewTransitions";
} | {
    readonly _tag: "EffectAtomComparison";
} | {
    readonly _tag: "ElmComparison";
} | {
    readonly _tag: "Examples";
} | {
    readonly _tag: "FieldValidation";
} | {
    readonly _tag: "GetStarted";
} | {
    readonly _tag: "Home";
} | {
    readonly _tag: "Newsletter";
} | {
    readonly _tag: "PatternsAntiPatterns";
} | {
    readonly _tag: "PatternsInformingSubmodels";
} | {
    readonly _tag: "PatternsSubscriptionOrganization";
} | {
    readonly _tag: "Performance";
} | {
    readonly _tag: "Privacy";
} | {
    readonly _tag: "ProjectOrganization";
} | {
    readonly _tag: "ReactComparison";
} | {
    readonly _tag: "Roadmap";
} | {
    readonly _tag: "RoutingAndNavigation";
} | {
    readonly _tag: "Testing";
} | {
    readonly _tag: "TestingScene";
} | {
    readonly _tag: "TestingStory";
} | {
    readonly _tag: "ToolingLinting";
} | {
    readonly _tag: "TypingTerminal";
} | {
    readonly _tag: "UiAnchor";
} | {
    readonly _tag: "UiAnimation";
} | {
    readonly _tag: "UiButton";
} | {
    readonly _tag: "UiCalendar";
} | {
    readonly _tag: "UiCheckbox";
} | {
    readonly _tag: "UiCombobox";
} | {
    readonly _tag: "UiDatePicker";
} | {
    readonly _tag: "UiDialog";
} | {
    readonly _tag: "UiDisclosure";
} | {
    readonly _tag: "UiDragAndDrop";
} | {
    readonly _tag: "UiFieldset";
} | {
    readonly _tag: "UiFileDrop";
} | {
    readonly _tag: "UiHoverIntent";
} | {
    readonly _tag: "UiInput";
} | {
    readonly _tag: "UiListbox";
} | {
    readonly _tag: "UiMenu";
} | {
    readonly _tag: "UiMeter";
} | {
    readonly _tag: "UiNav";
} | {
    readonly _tag: "UiOverview";
} | {
    readonly _tag: "UiPopover";
} | {
    readonly _tag: "UiProgress";
} | {
    readonly _tag: "UiRadioGroup";
} | {
    readonly _tag: "UiSelect";
} | {
    readonly _tag: "UiSelectionSubmodels";
} | {
    readonly _tag: "UiSlider";
} | {
    readonly _tag: "UiSwitch";
} | {
    readonly _tag: "UiTabs";
} | {
    readonly _tag: "UiTextarea";
} | {
    readonly _tag: "UiToast";
} | {
    readonly _tag: "UiTooltip";
} | {
    readonly _tag: "UiVirtualList";
} | {
    readonly _tag: "WhyFoldkit";
} | {
    readonly _tag: "ApiModule";
    readonly moduleSlug: string;
} | {
    readonly _tag: "BlogPost";
    readonly postSlug: string;
} | {
    readonly _tag: "ExampleDetail";
    readonly exampleSlug: string;
} | {
    readonly _tag: "NotFound";
    readonly path: string;
} | {
    readonly _tag: "Playground";
    readonly exampleSlug: string;
}) => value is {
    readonly _tag: "Playground";
    readonly exampleSlug: string;
};
export declare const isBlogRoute: (value: {
    readonly _tag: "About";
} | {
    readonly _tag: "AiMcp";
} | {
    readonly _tag: "AiOverview";
} | {
    readonly _tag: "AiSkills";
} | {
    readonly _tag: "AsyncData";
} | {
    readonly _tag: "BestPracticesImmutability";
} | {
    readonly _tag: "BestPracticesKeying";
} | {
    readonly _tag: "BestPracticesMessages";
} | {
    readonly _tag: "BestPracticesSideEffects";
} | {
    readonly _tag: "Blog";
} | {
    readonly _tag: "ComingFromReact";
} | {
    readonly _tag: "ComingFromTanStackQuery";
} | {
    readonly _tag: "Contact";
} | {
    readonly _tag: "ContentApi";
} | {
    readonly _tag: "CoreArchitecture";
} | {
    readonly _tag: "CoreCanvas";
} | {
    readonly _tag: "CoreCommands";
} | {
    readonly _tag: "CoreCounterExample";
} | {
    readonly _tag: "CoreCrashView";
} | {
    readonly _tag: "CoreCustomElement";
} | {
    readonly _tag: "CoreDevTools";
} | {
    readonly _tag: "CoreDom";
} | {
    readonly _tag: "CoreEmbedding";
} | {
    readonly _tag: "CoreFile";
} | {
    readonly _tag: "CoreFreezeModel";
} | {
    readonly _tag: "CoreHttp";
} | {
    readonly _tag: "CoreInitAndFlags";
} | {
    readonly _tag: "CoreMachine";
} | {
    readonly _tag: "CoreManagedResources";
} | {
    readonly _tag: "CoreMessages";
} | {
    readonly _tag: "CoreModel";
} | {
    readonly _tag: "CoreMount";
} | {
    readonly _tag: "CorePreserveScroll";
} | {
    readonly _tag: "CoreQuery";
} | {
    readonly _tag: "CoreRender";
} | {
    readonly _tag: "CoreResources";
} | {
    readonly _tag: "CoreRuntime";
} | {
    readonly _tag: "CoreServerRendering";
} | {
    readonly _tag: "CoreSlowWarnings";
} | {
    readonly _tag: "CoreSubmodel";
} | {
    readonly _tag: "CoreSubscriptions";
} | {
    readonly _tag: "CoreUpdate";
} | {
    readonly _tag: "CoreView";
} | {
    readonly _tag: "CoreViewMemoization";
} | {
    readonly _tag: "CoreViewTransitions";
} | {
    readonly _tag: "EffectAtomComparison";
} | {
    readonly _tag: "ElmComparison";
} | {
    readonly _tag: "Examples";
} | {
    readonly _tag: "FieldValidation";
} | {
    readonly _tag: "GetStarted";
} | {
    readonly _tag: "Home";
} | {
    readonly _tag: "Newsletter";
} | {
    readonly _tag: "PatternsAntiPatterns";
} | {
    readonly _tag: "PatternsInformingSubmodels";
} | {
    readonly _tag: "PatternsSubscriptionOrganization";
} | {
    readonly _tag: "Performance";
} | {
    readonly _tag: "Privacy";
} | {
    readonly _tag: "ProjectOrganization";
} | {
    readonly _tag: "ReactComparison";
} | {
    readonly _tag: "Roadmap";
} | {
    readonly _tag: "RoutingAndNavigation";
} | {
    readonly _tag: "Testing";
} | {
    readonly _tag: "TestingScene";
} | {
    readonly _tag: "TestingStory";
} | {
    readonly _tag: "ToolingLinting";
} | {
    readonly _tag: "TypingTerminal";
} | {
    readonly _tag: "UiAnchor";
} | {
    readonly _tag: "UiAnimation";
} | {
    readonly _tag: "UiButton";
} | {
    readonly _tag: "UiCalendar";
} | {
    readonly _tag: "UiCheckbox";
} | {
    readonly _tag: "UiCombobox";
} | {
    readonly _tag: "UiDatePicker";
} | {
    readonly _tag: "UiDialog";
} | {
    readonly _tag: "UiDisclosure";
} | {
    readonly _tag: "UiDragAndDrop";
} | {
    readonly _tag: "UiFieldset";
} | {
    readonly _tag: "UiFileDrop";
} | {
    readonly _tag: "UiHoverIntent";
} | {
    readonly _tag: "UiInput";
} | {
    readonly _tag: "UiListbox";
} | {
    readonly _tag: "UiMenu";
} | {
    readonly _tag: "UiMeter";
} | {
    readonly _tag: "UiNav";
} | {
    readonly _tag: "UiOverview";
} | {
    readonly _tag: "UiPopover";
} | {
    readonly _tag: "UiProgress";
} | {
    readonly _tag: "UiRadioGroup";
} | {
    readonly _tag: "UiSelect";
} | {
    readonly _tag: "UiSelectionSubmodels";
} | {
    readonly _tag: "UiSlider";
} | {
    readonly _tag: "UiSwitch";
} | {
    readonly _tag: "UiTabs";
} | {
    readonly _tag: "UiTextarea";
} | {
    readonly _tag: "UiToast";
} | {
    readonly _tag: "UiTooltip";
} | {
    readonly _tag: "UiVirtualList";
} | {
    readonly _tag: "WhyFoldkit";
} | {
    readonly _tag: "ApiModule";
    readonly moduleSlug: string;
} | {
    readonly _tag: "BlogPost";
    readonly postSlug: string;
} | {
    readonly _tag: "ExampleDetail";
    readonly exampleSlug: string;
} | {
    readonly _tag: "NotFound";
    readonly path: string;
} | {
    readonly _tag: "Playground";
    readonly exampleSlug: string;
}) => value is {
    readonly _tag: "Blog";
} | {
    readonly _tag: "BlogPost";
    readonly postSlug: string;
};
export declare const isSearchRoute: (route: AppRoute) => boolean;
/**
 * Whether a route belongs to the documentation section, which is what the
 * header's `Docs` link highlights on. Derived from `DocsRoute` so a new
 * top-level route cannot silently join the section. `NotFound` is a member of
 * the union so 404s render in the docs shell, but it belongs to no section.
 */
export declare const isDocsSectionRoute: (route: AppRoute) => boolean;
export declare const homeRouter: import("foldkit/route").Router<{
    readonly _tag: "Home";
}>;
export declare const whyFoldkitRouter: import("foldkit/route").Router<{
    readonly _tag: "WhyFoldkit";
}>;
export declare const getStartedRouter: import("foldkit/route").Router<{
    readonly _tag: "GetStarted";
}>;
export declare const roadmapRouter: import("foldkit/route").Router<{
    readonly _tag: "Roadmap";
}>;
export declare const performanceRouter: import("foldkit/route").Router<{
    readonly _tag: "Performance";
}>;
export declare const comingFromReactRouter: import("foldkit/route").Router<{
    readonly _tag: "ComingFromReact";
}>;
export declare const comingFromTanStackQueryRouter: import("foldkit/route").Router<{
    readonly _tag: "ComingFromTanStackQuery";
}>;
export declare const reactComparisonRouter: import("foldkit/route").Router<{
    readonly _tag: "ReactComparison";
}>;
export declare const effectAtomComparisonRouter: import("foldkit/route").Router<{
    readonly _tag: "EffectAtomComparison";
}>;
export declare const elmComparisonRouter: import("foldkit/route").Router<{
    readonly _tag: "ElmComparison";
}>;
export declare const routingAndNavigationRouter: import("foldkit/route").Router<{
    readonly _tag: "RoutingAndNavigation";
}>;
export declare const fieldValidationRouter: import("foldkit/route").Router<{
    readonly _tag: "FieldValidation";
}>;
export declare const testingRouter: import("foldkit/route").Router<{
    readonly _tag: "Testing";
}>;
export declare const testingStoryRouter: import("foldkit/route").Router<{
    readonly _tag: "TestingStory";
}>;
export declare const testingSceneRouter: import("foldkit/route").Router<{
    readonly _tag: "TestingScene";
}>;
export declare const examplesRouter: import("foldkit/route").Router<{
    readonly _tag: "Examples";
}>;
export declare const exampleDetailRouter: import("foldkit/route").Router<{
    readonly _tag: "ExampleDetail";
    readonly exampleSlug: string;
}>;
export declare const typingTerminalRouter: import("foldkit/route").Router<{
    readonly _tag: "TypingTerminal";
}>;
export declare const playgroundRouter: import("foldkit/route").Router<{
    readonly _tag: "Playground";
    readonly exampleSlug: string;
}>;
export declare const bestPracticesSideEffectsRouter: import("foldkit/route").Router<{
    readonly _tag: "BestPracticesSideEffects";
}>;
export declare const bestPracticesMessagesRouter: import("foldkit/route").Router<{
    readonly _tag: "BestPracticesMessages";
}>;
export declare const bestPracticesKeyingRouter: import("foldkit/route").Router<{
    readonly _tag: "BestPracticesKeying";
}>;
export declare const bestPracticesImmutabilityRouter: import("foldkit/route").Router<{
    readonly _tag: "BestPracticesImmutability";
}>;
export declare const projectOrganizationRouter: import("foldkit/route").Router<{
    readonly _tag: "ProjectOrganization";
}>;
export declare const toolingLintingRouter: import("foldkit/route").Router<{
    readonly _tag: "ToolingLinting";
}>;
export declare const apiModuleRouter: import("foldkit/route").Router<{
    readonly _tag: "ApiModule";
    readonly moduleSlug: string;
}>;
export declare const coreArchitectureRouter: import("foldkit/route").Router<{
    readonly _tag: "CoreArchitecture";
}>;
export declare const coreCounterExampleRouter: import("foldkit/route").Router<{
    readonly _tag: "CoreCounterExample";
}>;
export declare const coreModelRouter: import("foldkit/route").Router<{
    readonly _tag: "CoreModel";
}>;
export declare const coreMessagesRouter: import("foldkit/route").Router<{
    readonly _tag: "CoreMessages";
}>;
export declare const coreUpdateRouter: import("foldkit/route").Router<{
    readonly _tag: "CoreUpdate";
}>;
export declare const coreViewRouter: import("foldkit/route").Router<{
    readonly _tag: "CoreView";
}>;
export declare const coreCommandsRouter: import("foldkit/route").Router<{
    readonly _tag: "CoreCommands";
}>;
export declare const coreMountRouter: import("foldkit/route").Router<{
    readonly _tag: "CoreMount";
}>;
export declare const coreCustomElementRouter: import("foldkit/route").Router<{
    readonly _tag: "CoreCustomElement";
}>;
export declare const coreSubscriptionsRouter: import("foldkit/route").Router<{
    readonly _tag: "CoreSubscriptions";
}>;
export declare const coreInitAndFlagsRouter: import("foldkit/route").Router<{
    readonly _tag: "CoreInitAndFlags";
}>;
export declare const coreDomRouter: import("foldkit/route").Router<{
    readonly _tag: "CoreDom";
}>;
export declare const coreRenderRouter: import("foldkit/route").Router<{
    readonly _tag: "CoreRender";
}>;
export declare const coreFileRouter: import("foldkit/route").Router<{
    readonly _tag: "CoreFile";
}>;
export declare const coreHttpRouter: import("foldkit/route").Router<{
    readonly _tag: "CoreHttp";
}>;
export declare const coreQueryRouter: import("foldkit/route").Router<{
    readonly _tag: "CoreQuery";
}>;
export declare const coreCanvasRouter: import("foldkit/route").Router<{
    readonly _tag: "CoreCanvas";
}>;
export declare const coreRuntimeRouter: import("foldkit/route").Router<{
    readonly _tag: "CoreRuntime";
}>;
export declare const coreServerRenderingRouter: import("foldkit/route").Router<{
    readonly _tag: "CoreServerRendering";
}>;
export declare const coreResourcesRouter: import("foldkit/route").Router<{
    readonly _tag: "CoreResources";
}>;
export declare const coreManagedResourcesRouter: import("foldkit/route").Router<{
    readonly _tag: "CoreManagedResources";
}>;
export declare const coreDevToolsRouter: import("foldkit/route").Router<{
    readonly _tag: "CoreDevTools";
}>;
export declare const coreCrashViewRouter: import("foldkit/route").Router<{
    readonly _tag: "CoreCrashView";
}>;
export declare const coreViewTransitionsRouter: import("foldkit/route").Router<{
    readonly _tag: "CoreViewTransitions";
}>;
export declare const coreSlowWarningsRouter: import("foldkit/route").Router<{
    readonly _tag: "CoreSlowWarnings";
}>;
export declare const coreFreezeModelRouter: import("foldkit/route").Router<{
    readonly _tag: "CoreFreezeModel";
}>;
export declare const corePreserveScrollRouter: import("foldkit/route").Router<{
    readonly _tag: "CorePreserveScroll";
}>;
export declare const coreViewMemoizationRouter: import("foldkit/route").Router<{
    readonly _tag: "CoreViewMemoization";
}>;
export declare const coreEmbeddingRouter: import("foldkit/route").Router<{
    readonly _tag: "CoreEmbedding";
}>;
export declare const coreSubmodelRouter: import("foldkit/route").Router<{
    readonly _tag: "CoreSubmodel";
}>;
export declare const coreMachineRouter: import("foldkit/route").Router<{
    readonly _tag: "CoreMachine";
}>;
export declare const asyncDataRouter: import("foldkit/route").Router<{
    readonly _tag: "AsyncData";
}>;
export declare const patternsAntiPatternsRouter: import("foldkit/route").Router<{
    readonly _tag: "PatternsAntiPatterns";
}>;
export declare const patternsInformingSubmodelsRouter: import("foldkit/route").Router<{
    readonly _tag: "PatternsInformingSubmodels";
}>;
export declare const patternsSubscriptionOrganizationRouter: import("foldkit/route").Router<{
    readonly _tag: "PatternsSubscriptionOrganization";
}>;
export declare const uiOverviewRouter: import("foldkit/route").Router<{
    readonly _tag: "UiOverview";
}>;
export declare const uiSelectionSubmodelsRouter: import("foldkit/route").Router<{
    readonly _tag: "UiSelectionSubmodels";
}>;
export declare const uiButtonRouter: import("foldkit/route").Router<{
    readonly _tag: "UiButton";
}>;
export declare const uiCalendarRouter: import("foldkit/route").Router<{
    readonly _tag: "UiCalendar";
}>;
export declare const uiDatePickerRouter: import("foldkit/route").Router<{
    readonly _tag: "UiDatePicker";
}>;
export declare const uiCheckboxRouter: import("foldkit/route").Router<{
    readonly _tag: "UiCheckbox";
}>;
export declare const uiTabsRouter: import("foldkit/route").Router<{
    readonly _tag: "UiTabs";
}>;
export declare const uiNavRouter: import("foldkit/route").Router<{
    readonly _tag: "UiNav";
}>;
export declare const uiDisclosureRouter: import("foldkit/route").Router<{
    readonly _tag: "UiDisclosure";
}>;
export declare const uiDialogRouter: import("foldkit/route").Router<{
    readonly _tag: "UiDialog";
}>;
export declare const uiMenuRouter: import("foldkit/route").Router<{
    readonly _tag: "UiMenu";
}>;
export declare const uiPopoverRouter: import("foldkit/route").Router<{
    readonly _tag: "UiPopover";
}>;
export declare const uiListboxRouter: import("foldkit/route").Router<{
    readonly _tag: "UiListbox";
}>;
export declare const uiRadioGroupRouter: import("foldkit/route").Router<{
    readonly _tag: "UiRadioGroup";
}>;
export declare const uiSelectRouter: import("foldkit/route").Router<{
    readonly _tag: "UiSelect";
}>;
export declare const uiSliderRouter: import("foldkit/route").Router<{
    readonly _tag: "UiSlider";
}>;
export declare const uiMeterRouter: import("foldkit/route").Router<{
    readonly _tag: "UiMeter";
}>;
export declare const uiProgressRouter: import("foldkit/route").Router<{
    readonly _tag: "UiProgress";
}>;
export declare const uiSwitchRouter: import("foldkit/route").Router<{
    readonly _tag: "UiSwitch";
}>;
export declare const uiComboboxRouter: import("foldkit/route").Router<{
    readonly _tag: "UiCombobox";
}>;
export declare const uiInputRouter: import("foldkit/route").Router<{
    readonly _tag: "UiInput";
}>;
export declare const uiTextareaRouter: import("foldkit/route").Router<{
    readonly _tag: "UiTextarea";
}>;
export declare const uiFieldsetRouter: import("foldkit/route").Router<{
    readonly _tag: "UiFieldset";
}>;
export declare const uiDragAndDropRouter: import("foldkit/route").Router<{
    readonly _tag: "UiDragAndDrop";
}>;
export declare const uiFileDropRouter: import("foldkit/route").Router<{
    readonly _tag: "UiFileDrop";
}>;
export declare const uiHoverIntentRouter: import("foldkit/route").Router<{
    readonly _tag: "UiHoverIntent";
}>;
export declare const uiToastRouter: import("foldkit/route").Router<{
    readonly _tag: "UiToast";
}>;
export declare const uiTooltipRouter: import("foldkit/route").Router<{
    readonly _tag: "UiTooltip";
}>;
export declare const uiAnimationRouter: import("foldkit/route").Router<{
    readonly _tag: "UiAnimation";
}>;
export declare const uiAnchorRouter: import("foldkit/route").Router<{
    readonly _tag: "UiAnchor";
}>;
export declare const uiVirtualListRouter: import("foldkit/route").Router<{
    readonly _tag: "UiVirtualList";
}>;
export declare const aboutRouter: import("foldkit/route").Router<{
    readonly _tag: "About";
}>;
export declare const contactRouter: import("foldkit/route").Router<{
    readonly _tag: "Contact";
}>;
export declare const privacyRouter: import("foldkit/route").Router<{
    readonly _tag: "Privacy";
}>;
export declare const contentApiRouter: import("foldkit/route").Router<{
    readonly _tag: "ContentApi";
}>;
export declare const aiOverviewRouter: import("foldkit/route").Router<{
    readonly _tag: "AiOverview";
}>;
export declare const aiSkillsRouter: import("foldkit/route").Router<{
    readonly _tag: "AiSkills";
}>;
export declare const aiMcpRouter: import("foldkit/route").Router<{
    readonly _tag: "AiMcp";
}>;
export declare const newsletterRouter: import("foldkit/route").Router<{
    readonly _tag: "Newsletter";
}>;
export declare const blogRouter: import("foldkit/route").Router<{
    readonly _tag: "Blog";
}>;
export declare const BLOG_POST_SLUG_PATTERN: RegExp;
export declare const blogPostRouter: import("foldkit/route").Router<{
    readonly _tag: "BlogPost";
    readonly postSlug: string;
}>;
export declare const routeParser: import("foldkit/route").Parser<{
    readonly _tag: "About";
} | {
    readonly _tag: "AiMcp";
} | {
    readonly _tag: "AiOverview";
} | {
    readonly _tag: "AiSkills";
} | {
    readonly _tag: "AsyncData";
} | {
    readonly _tag: "BestPracticesImmutability";
} | {
    readonly _tag: "BestPracticesKeying";
} | {
    readonly _tag: "BestPracticesMessages";
} | {
    readonly _tag: "BestPracticesSideEffects";
} | {
    readonly _tag: "Blog";
} | {
    readonly _tag: "ComingFromReact";
} | {
    readonly _tag: "ComingFromTanStackQuery";
} | {
    readonly _tag: "Contact";
} | {
    readonly _tag: "ContentApi";
} | {
    readonly _tag: "CoreArchitecture";
} | {
    readonly _tag: "CoreCanvas";
} | {
    readonly _tag: "CoreCommands";
} | {
    readonly _tag: "CoreCounterExample";
} | {
    readonly _tag: "CoreCrashView";
} | {
    readonly _tag: "CoreCustomElement";
} | {
    readonly _tag: "CoreDevTools";
} | {
    readonly _tag: "CoreDom";
} | {
    readonly _tag: "CoreEmbedding";
} | {
    readonly _tag: "CoreFile";
} | {
    readonly _tag: "CoreFreezeModel";
} | {
    readonly _tag: "CoreHttp";
} | {
    readonly _tag: "CoreInitAndFlags";
} | {
    readonly _tag: "CoreMachine";
} | {
    readonly _tag: "CoreManagedResources";
} | {
    readonly _tag: "CoreMessages";
} | {
    readonly _tag: "CoreModel";
} | {
    readonly _tag: "CoreMount";
} | {
    readonly _tag: "CorePreserveScroll";
} | {
    readonly _tag: "CoreQuery";
} | {
    readonly _tag: "CoreRender";
} | {
    readonly _tag: "CoreResources";
} | {
    readonly _tag: "CoreRuntime";
} | {
    readonly _tag: "CoreServerRendering";
} | {
    readonly _tag: "CoreSlowWarnings";
} | {
    readonly _tag: "CoreSubmodel";
} | {
    readonly _tag: "CoreSubscriptions";
} | {
    readonly _tag: "CoreUpdate";
} | {
    readonly _tag: "CoreView";
} | {
    readonly _tag: "CoreViewMemoization";
} | {
    readonly _tag: "CoreViewTransitions";
} | {
    readonly _tag: "EffectAtomComparison";
} | {
    readonly _tag: "ElmComparison";
} | {
    readonly _tag: "Examples";
} | {
    readonly _tag: "FieldValidation";
} | {
    readonly _tag: "GetStarted";
} | {
    readonly _tag: "Home";
} | {
    readonly _tag: "Newsletter";
} | {
    readonly _tag: "PatternsAntiPatterns";
} | {
    readonly _tag: "PatternsInformingSubmodels";
} | {
    readonly _tag: "PatternsSubscriptionOrganization";
} | {
    readonly _tag: "Performance";
} | {
    readonly _tag: "Privacy";
} | {
    readonly _tag: "ProjectOrganization";
} | {
    readonly _tag: "ReactComparison";
} | {
    readonly _tag: "Roadmap";
} | {
    readonly _tag: "RoutingAndNavigation";
} | {
    readonly _tag: "Testing";
} | {
    readonly _tag: "TestingScene";
} | {
    readonly _tag: "TestingStory";
} | {
    readonly _tag: "ToolingLinting";
} | {
    readonly _tag: "TypingTerminal";
} | {
    readonly _tag: "UiAnchor";
} | {
    readonly _tag: "UiAnimation";
} | {
    readonly _tag: "UiButton";
} | {
    readonly _tag: "UiCalendar";
} | {
    readonly _tag: "UiCheckbox";
} | {
    readonly _tag: "UiCombobox";
} | {
    readonly _tag: "UiDatePicker";
} | {
    readonly _tag: "UiDialog";
} | {
    readonly _tag: "UiDisclosure";
} | {
    readonly _tag: "UiDragAndDrop";
} | {
    readonly _tag: "UiFieldset";
} | {
    readonly _tag: "UiFileDrop";
} | {
    readonly _tag: "UiHoverIntent";
} | {
    readonly _tag: "UiInput";
} | {
    readonly _tag: "UiListbox";
} | {
    readonly _tag: "UiMenu";
} | {
    readonly _tag: "UiMeter";
} | {
    readonly _tag: "UiNav";
} | {
    readonly _tag: "UiOverview";
} | {
    readonly _tag: "UiPopover";
} | {
    readonly _tag: "UiProgress";
} | {
    readonly _tag: "UiRadioGroup";
} | {
    readonly _tag: "UiSelect";
} | {
    readonly _tag: "UiSelectionSubmodels";
} | {
    readonly _tag: "UiSlider";
} | {
    readonly _tag: "UiSwitch";
} | {
    readonly _tag: "UiTabs";
} | {
    readonly _tag: "UiTextarea";
} | {
    readonly _tag: "UiToast";
} | {
    readonly _tag: "UiTooltip";
} | {
    readonly _tag: "UiVirtualList";
} | {
    readonly _tag: "WhyFoldkit";
} | {
    readonly _tag: "ApiModule";
    readonly moduleSlug: string;
} | {
    readonly _tag: "BlogPost";
    readonly postSlug: string;
} | {
    readonly _tag: "ExampleDetail";
    readonly exampleSlug: string;
} | {
    readonly _tag: "Playground";
    readonly exampleSlug: string;
}>;
export declare const urlToAppRoute: (url: import("foldkit/url").Url) => {
    readonly _tag: "About";
} | {
    readonly _tag: "AiMcp";
} | {
    readonly _tag: "AiOverview";
} | {
    readonly _tag: "AiSkills";
} | {
    readonly _tag: "AsyncData";
} | {
    readonly _tag: "BestPracticesImmutability";
} | {
    readonly _tag: "BestPracticesKeying";
} | {
    readonly _tag: "BestPracticesMessages";
} | {
    readonly _tag: "BestPracticesSideEffects";
} | {
    readonly _tag: "Blog";
} | {
    readonly _tag: "ComingFromReact";
} | {
    readonly _tag: "ComingFromTanStackQuery";
} | {
    readonly _tag: "Contact";
} | {
    readonly _tag: "ContentApi";
} | {
    readonly _tag: "CoreArchitecture";
} | {
    readonly _tag: "CoreCanvas";
} | {
    readonly _tag: "CoreCommands";
} | {
    readonly _tag: "CoreCounterExample";
} | {
    readonly _tag: "CoreCrashView";
} | {
    readonly _tag: "CoreCustomElement";
} | {
    readonly _tag: "CoreDevTools";
} | {
    readonly _tag: "CoreDom";
} | {
    readonly _tag: "CoreEmbedding";
} | {
    readonly _tag: "CoreFile";
} | {
    readonly _tag: "CoreFreezeModel";
} | {
    readonly _tag: "CoreHttp";
} | {
    readonly _tag: "CoreInitAndFlags";
} | {
    readonly _tag: "CoreMachine";
} | {
    readonly _tag: "CoreManagedResources";
} | {
    readonly _tag: "CoreMessages";
} | {
    readonly _tag: "CoreModel";
} | {
    readonly _tag: "CoreMount";
} | {
    readonly _tag: "CorePreserveScroll";
} | {
    readonly _tag: "CoreQuery";
} | {
    readonly _tag: "CoreRender";
} | {
    readonly _tag: "CoreResources";
} | {
    readonly _tag: "CoreRuntime";
} | {
    readonly _tag: "CoreServerRendering";
} | {
    readonly _tag: "CoreSlowWarnings";
} | {
    readonly _tag: "CoreSubmodel";
} | {
    readonly _tag: "CoreSubscriptions";
} | {
    readonly _tag: "CoreUpdate";
} | {
    readonly _tag: "CoreView";
} | {
    readonly _tag: "CoreViewMemoization";
} | {
    readonly _tag: "CoreViewTransitions";
} | {
    readonly _tag: "EffectAtomComparison";
} | {
    readonly _tag: "ElmComparison";
} | {
    readonly _tag: "Examples";
} | {
    readonly _tag: "FieldValidation";
} | {
    readonly _tag: "GetStarted";
} | {
    readonly _tag: "Home";
} | {
    readonly _tag: "Newsletter";
} | {
    readonly _tag: "PatternsAntiPatterns";
} | {
    readonly _tag: "PatternsInformingSubmodels";
} | {
    readonly _tag: "PatternsSubscriptionOrganization";
} | {
    readonly _tag: "Performance";
} | {
    readonly _tag: "Privacy";
} | {
    readonly _tag: "ProjectOrganization";
} | {
    readonly _tag: "ReactComparison";
} | {
    readonly _tag: "Roadmap";
} | {
    readonly _tag: "RoutingAndNavigation";
} | {
    readonly _tag: "Testing";
} | {
    readonly _tag: "TestingScene";
} | {
    readonly _tag: "TestingStory";
} | {
    readonly _tag: "ToolingLinting";
} | {
    readonly _tag: "TypingTerminal";
} | {
    readonly _tag: "UiAnchor";
} | {
    readonly _tag: "UiAnimation";
} | {
    readonly _tag: "UiButton";
} | {
    readonly _tag: "UiCalendar";
} | {
    readonly _tag: "UiCheckbox";
} | {
    readonly _tag: "UiCombobox";
} | {
    readonly _tag: "UiDatePicker";
} | {
    readonly _tag: "UiDialog";
} | {
    readonly _tag: "UiDisclosure";
} | {
    readonly _tag: "UiDragAndDrop";
} | {
    readonly _tag: "UiFieldset";
} | {
    readonly _tag: "UiFileDrop";
} | {
    readonly _tag: "UiHoverIntent";
} | {
    readonly _tag: "UiInput";
} | {
    readonly _tag: "UiListbox";
} | {
    readonly _tag: "UiMenu";
} | {
    readonly _tag: "UiMeter";
} | {
    readonly _tag: "UiNav";
} | {
    readonly _tag: "UiOverview";
} | {
    readonly _tag: "UiPopover";
} | {
    readonly _tag: "UiProgress";
} | {
    readonly _tag: "UiRadioGroup";
} | {
    readonly _tag: "UiSelect";
} | {
    readonly _tag: "UiSelectionSubmodels";
} | {
    readonly _tag: "UiSlider";
} | {
    readonly _tag: "UiSwitch";
} | {
    readonly _tag: "UiTabs";
} | {
    readonly _tag: "UiTextarea";
} | {
    readonly _tag: "UiToast";
} | {
    readonly _tag: "UiTooltip";
} | {
    readonly _tag: "UiVirtualList";
} | {
    readonly _tag: "WhyFoldkit";
} | {
    readonly _tag: "ApiModule";
    readonly moduleSlug: string;
} | {
    readonly _tag: "BlogPost";
    readonly postSlug: string;
} | {
    readonly _tag: "ExampleDetail";
    readonly exampleSlug: string;
} | {
    readonly _tag: "NotFound";
    readonly path: string;
} | {
    readonly _tag: "Playground";
    readonly exampleSlug: string;
};
export declare const SITE_URL = "https://foldkit.dev";
export declare const routeToUrlPath: (route: AppRoute) => string;
export declare const routeToCanonicalUrl: (route: AppRoute) => string;
