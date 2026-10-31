import { Schema } from "effect";
export declare const Plan: Schema.Literals<readonly ["Startup", "Business", "Enterprise"]>;
export type Plan = typeof Plan.Type;
export declare const DemoTab: Schema.Literals<readonly ["Foldkit", "React", "Elm"]>;
export type DemoTab = typeof DemoTab.Type;
export declare const City: Schema.Literals<readonly ["Johannesburg", "Kyiv", "Oxford", "Plymouth", "Quito", "Wellington", "Zurich"]>;
export type City = typeof City.Type;
export declare const ListboxItem: Schema.Literals<readonly ["Michael Bluth", "Lindsay Funke", "Gob Bluth", "George Michael", "Maeby Funke", "Buster Bluth", "Tobias Funke", "Lucille Bluth"]>;
export type ListboxItem = typeof ListboxItem.Type;
export declare const DemoCard: Schema.Struct<{
    readonly id: Schema.String;
    readonly label: Schema.String;
}>;
export type DemoCard = typeof DemoCard.Type;
export declare const DemoColumn: Schema.Struct<{
    readonly id: Schema.String;
    readonly label: Schema.String;
    readonly cards: Schema.mutable<Schema.$Array<Schema.Struct<{
        readonly id: Schema.String;
        readonly label: Schema.String;
    }>>>;
}>;
export type DemoColumn = typeof DemoColumn.Type;
export declare const VirtualListChatMessage: Schema.Struct<{
    readonly id: Schema.Number;
    readonly body: Schema.String;
    readonly isExpanded: Schema.Boolean;
}>;
export type VirtualListChatMessage = typeof VirtualListChatMessage.Type;
export declare const VirtualListChatStartProximity: import("foldkit/schema").TaggedUnion<{
    readonly Away: {};
    readonly Near: {};
}>;
export declare const Model: Schema.Struct<{
    readonly buttonClickCount: Schema.Number;
    readonly inputDemoValue: Schema.String;
    readonly textareaDemoValue: Schema.String;
    readonly fieldsetInputValue: Schema.String;
    readonly fieldsetTextareaValue: Schema.String;
    readonly isFieldsetCheckboxDemoChecked: Schema.Boolean;
    readonly calendarBasicDemo: Schema.Struct<{
        readonly id: Schema.String;
        readonly today: Schema.Struct<{
            readonly year: Schema.Int;
            readonly month: Schema.Int;
            readonly day: Schema.Int;
        }>;
        readonly viewYear: Schema.Int;
        readonly viewMonth: Schema.Int;
        readonly viewMode: Schema.Literals<readonly ["Days", "Months", "Years"]>;
        readonly maybeFocusedDate: Schema.Option<Schema.Struct<{
            readonly year: Schema.Int;
            readonly month: Schema.Int;
            readonly day: Schema.Int;
        }>>;
        readonly isGridFocused: Schema.Boolean;
        readonly locale: Schema.Struct<{
            readonly firstDayOfWeek: Schema.Literals<readonly ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]>;
            readonly monthNames: Schema.Tuple<readonly [Schema.String, Schema.String, Schema.String, Schema.String, Schema.String, Schema.String, Schema.String, Schema.String, Schema.String, Schema.String, Schema.String, Schema.String]>;
            readonly shortMonthNames: Schema.Tuple<readonly [Schema.String, Schema.String, Schema.String, Schema.String, Schema.String, Schema.String, Schema.String, Schema.String, Schema.String, Schema.String, Schema.String, Schema.String]>;
            readonly dayNames: Schema.Tuple<readonly [Schema.String, Schema.String, Schema.String, Schema.String, Schema.String, Schema.String, Schema.String]>;
            readonly shortDayNames: Schema.Tuple<readonly [Schema.String, Schema.String, Schema.String, Schema.String, Schema.String, Schema.String, Schema.String]>;
            readonly longFormat: Schema.NonEmptyArray<import("foldkit/schema").TaggedUnion<{
                readonly MonthName: {};
                readonly ShortMonthName: {};
                readonly MonthNumber: {};
                readonly PaddedMonthNumber: {};
                readonly DayNumber: {};
                readonly PaddedDayNumber: {};
                readonly DayName: {};
                readonly ShortDayName: {};
                readonly YearNumber: {};
                readonly LiteralText: {
                    text: Schema.String;
                };
            }>>;
            readonly shortFormat: Schema.NonEmptyArray<import("foldkit/schema").TaggedUnion<{
                readonly MonthName: {};
                readonly ShortMonthName: {};
                readonly MonthNumber: {};
                readonly PaddedMonthNumber: {};
                readonly DayNumber: {};
                readonly PaddedDayNumber: {};
                readonly DayName: {};
                readonly ShortDayName: {};
                readonly YearNumber: {};
                readonly LiteralText: {
                    text: Schema.String;
                };
            }>>;
            readonly ariaLabelFormat: Schema.NonEmptyArray<import("foldkit/schema").TaggedUnion<{
                readonly MonthName: {};
                readonly ShortMonthName: {};
                readonly MonthNumber: {};
                readonly PaddedMonthNumber: {};
                readonly DayNumber: {};
                readonly PaddedDayNumber: {};
                readonly DayName: {};
                readonly ShortDayName: {};
                readonly YearNumber: {};
                readonly LiteralText: {
                    text: Schema.String;
                };
            }>>;
            readonly monthYearFormat: Schema.NonEmptyArray<Schema.Union<readonly [Schema.TaggedStruct<"MonthName", {}> & ((value?: void | {
                readonly _tag?: "MonthName";
            } | undefined) => {
                readonly _tag: "MonthName";
            }), Schema.TaggedStruct<"ShortMonthName", {}> & ((value?: void | {
                readonly _tag?: "ShortMonthName";
            } | undefined) => {
                readonly _tag: "ShortMonthName";
            }), Schema.TaggedStruct<"MonthNumber", {}> & ((value?: void | {
                readonly _tag?: "MonthNumber";
            } | undefined) => {
                readonly _tag: "MonthNumber";
            }), Schema.TaggedStruct<"PaddedMonthNumber", {}> & ((value?: void | {
                readonly _tag?: "PaddedMonthNumber";
            } | undefined) => {
                readonly _tag: "PaddedMonthNumber";
            }), Schema.TaggedStruct<"YearNumber", {}> & ((value?: void | {
                readonly _tag?: "YearNumber";
            } | undefined) => {
                readonly _tag: "YearNumber";
            }), Schema.TaggedStruct<"LiteralText", {
                readonly text: Schema.String;
            }> & ((value: {
                readonly _tag?: "LiteralText";
                readonly text: string;
            }) => {
                readonly _tag: "LiteralText";
                readonly text: string;
            })]>>;
        }>;
        readonly maybeMinDate: Schema.Option<Schema.Struct<{
            readonly year: Schema.Int;
            readonly month: Schema.Int;
            readonly day: Schema.Int;
        }>>;
        readonly maybeMaxDate: Schema.Option<Schema.Struct<{
            readonly year: Schema.Int;
            readonly month: Schema.Int;
            readonly day: Schema.Int;
        }>>;
        readonly disabledDaysOfWeek: Schema.$Array<Schema.Literals<readonly ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]>>;
        readonly disabledDates: Schema.$Array<Schema.Struct<{
            readonly year: Schema.Int;
            readonly month: Schema.Int;
            readonly day: Schema.Int;
        }>>;
    }>;
    readonly maybeCalendarBasicDemoSelectedDate: Schema.Option<Schema.Struct<{
        readonly year: Schema.Int;
        readonly month: Schema.Int;
        readonly day: Schema.Int;
    }>>;
    readonly datePickerBasicDemo: Schema.Struct<{
        readonly id: Schema.String;
        readonly calendar: Schema.Struct<{
            readonly id: Schema.String;
            readonly today: Schema.Struct<{
                readonly year: Schema.Int;
                readonly month: Schema.Int;
                readonly day: Schema.Int;
            }>;
            readonly viewYear: Schema.Int;
            readonly viewMonth: Schema.Int;
            readonly viewMode: Schema.Literals<readonly ["Days", "Months", "Years"]>;
            readonly maybeFocusedDate: Schema.Option<Schema.Struct<{
                readonly year: Schema.Int;
                readonly month: Schema.Int;
                readonly day: Schema.Int;
            }>>;
            readonly isGridFocused: Schema.Boolean;
            readonly locale: Schema.Struct<{
                readonly firstDayOfWeek: Schema.Literals<readonly ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]>;
                readonly monthNames: Schema.Tuple<readonly [Schema.String, Schema.String, Schema.String, Schema.String, Schema.String, Schema.String, Schema.String, Schema.String, Schema.String, Schema.String, Schema.String, Schema.String]>;
                readonly shortMonthNames: Schema.Tuple<readonly [Schema.String, Schema.String, Schema.String, Schema.String, Schema.String, Schema.String, Schema.String, Schema.String, Schema.String, Schema.String, Schema.String, Schema.String]>;
                readonly dayNames: Schema.Tuple<readonly [Schema.String, Schema.String, Schema.String, Schema.String, Schema.String, Schema.String, Schema.String]>;
                readonly shortDayNames: Schema.Tuple<readonly [Schema.String, Schema.String, Schema.String, Schema.String, Schema.String, Schema.String, Schema.String]>;
                readonly longFormat: Schema.NonEmptyArray<import("foldkit/schema").TaggedUnion<{
                    readonly MonthName: {};
                    readonly ShortMonthName: {};
                    readonly MonthNumber: {};
                    readonly PaddedMonthNumber: {};
                    readonly DayNumber: {};
                    readonly PaddedDayNumber: {};
                    readonly DayName: {};
                    readonly ShortDayName: {};
                    readonly YearNumber: {};
                    readonly LiteralText: {
                        text: Schema.String;
                    };
                }>>;
                readonly shortFormat: Schema.NonEmptyArray<import("foldkit/schema").TaggedUnion<{
                    readonly MonthName: {};
                    readonly ShortMonthName: {};
                    readonly MonthNumber: {};
                    readonly PaddedMonthNumber: {};
                    readonly DayNumber: {};
                    readonly PaddedDayNumber: {};
                    readonly DayName: {};
                    readonly ShortDayName: {};
                    readonly YearNumber: {};
                    readonly LiteralText: {
                        text: Schema.String;
                    };
                }>>;
                readonly ariaLabelFormat: Schema.NonEmptyArray<import("foldkit/schema").TaggedUnion<{
                    readonly MonthName: {};
                    readonly ShortMonthName: {};
                    readonly MonthNumber: {};
                    readonly PaddedMonthNumber: {};
                    readonly DayNumber: {};
                    readonly PaddedDayNumber: {};
                    readonly DayName: {};
                    readonly ShortDayName: {};
                    readonly YearNumber: {};
                    readonly LiteralText: {
                        text: Schema.String;
                    };
                }>>;
                readonly monthYearFormat: Schema.NonEmptyArray<Schema.Union<readonly [Schema.TaggedStruct<"MonthName", {}> & ((value?: void | {
                    readonly _tag?: "MonthName";
                } | undefined) => {
                    readonly _tag: "MonthName";
                }), Schema.TaggedStruct<"ShortMonthName", {}> & ((value?: void | {
                    readonly _tag?: "ShortMonthName";
                } | undefined) => {
                    readonly _tag: "ShortMonthName";
                }), Schema.TaggedStruct<"MonthNumber", {}> & ((value?: void | {
                    readonly _tag?: "MonthNumber";
                } | undefined) => {
                    readonly _tag: "MonthNumber";
                }), Schema.TaggedStruct<"PaddedMonthNumber", {}> & ((value?: void | {
                    readonly _tag?: "PaddedMonthNumber";
                } | undefined) => {
                    readonly _tag: "PaddedMonthNumber";
                }), Schema.TaggedStruct<"YearNumber", {}> & ((value?: void | {
                    readonly _tag?: "YearNumber";
                } | undefined) => {
                    readonly _tag: "YearNumber";
                }), Schema.TaggedStruct<"LiteralText", {
                    readonly text: Schema.String;
                }> & ((value: {
                    readonly _tag?: "LiteralText";
                    readonly text: string;
                }) => {
                    readonly _tag: "LiteralText";
                    readonly text: string;
                })]>>;
            }>;
            readonly maybeMinDate: Schema.Option<Schema.Struct<{
                readonly year: Schema.Int;
                readonly month: Schema.Int;
                readonly day: Schema.Int;
            }>>;
            readonly maybeMaxDate: Schema.Option<Schema.Struct<{
                readonly year: Schema.Int;
                readonly month: Schema.Int;
                readonly day: Schema.Int;
            }>>;
            readonly disabledDaysOfWeek: Schema.$Array<Schema.Literals<readonly ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]>>;
            readonly disabledDates: Schema.$Array<Schema.Struct<{
                readonly year: Schema.Int;
                readonly month: Schema.Int;
                readonly day: Schema.Int;
            }>>;
        }>;
        readonly popover: Schema.Struct<{
            readonly id: Schema.String;
            readonly isOpen: Schema.Boolean;
            readonly isAnimated: Schema.Boolean;
            readonly isModal: Schema.Boolean;
            readonly contentFocus: Schema.Boolean;
            readonly animation: Schema.Struct<{
                readonly id: Schema.String;
                readonly isShowing: Schema.Boolean;
                readonly transitionState: Schema.Literals<readonly ["Idle", "EnterStart", "EnterAnimating", "LeaveStart", "LeaveAnimating"]>;
                readonly transitionGeneration: Schema.Number;
            }>;
            readonly maybeLastButtonPointerType: Schema.Option<Schema.String>;
        }>;
    }>;
    readonly maybeDatePickerBasicDemoSelectedDate: Schema.Option<Schema.Struct<{
        readonly year: Schema.Int;
        readonly month: Schema.Int;
        readonly day: Schema.Int;
    }>>;
    readonly isCheckboxBasicDemoChecked: Schema.Boolean;
    readonly isCheckboxOptionADemoChecked: Schema.Boolean;
    readonly isCheckboxOptionBDemoChecked: Schema.Boolean;
    readonly comboboxDemo: Schema.Struct<{
        readonly id: Schema.String;
        readonly isOpen: Schema.Boolean;
        readonly isAnimated: Schema.Boolean;
        readonly isModal: Schema.Boolean;
        readonly nullable: Schema.Boolean;
        readonly immediate: Schema.Boolean;
        readonly selectInputOnFocus: Schema.Boolean;
        readonly animation: Schema.Struct<{
            readonly id: Schema.String;
            readonly isShowing: Schema.Boolean;
            readonly transitionState: Schema.Literals<readonly ["Idle", "EnterStart", "EnterAnimating", "LeaveStart", "LeaveAnimating"]>;
            readonly transitionGeneration: Schema.Number;
        }>;
        readonly maybeActiveItemIndex: Schema.Option<Schema.Number>;
        readonly activationTrigger: Schema.Literals<readonly ["Pointer", "Keyboard"]>;
        readonly inputValue: Schema.String;
        readonly maybeLastPointerPosition: Schema.Option<Schema.Struct<{
            readonly screenX: Schema.Number;
            readonly screenY: Schema.Number;
        }>>;
    }>;
    readonly maybeComboboxDemoSelectedCity: Schema.Option<Schema.Literals<readonly ["Johannesburg", "Kyiv", "Oxford", "Plymouth", "Quito", "Wellington", "Zurich"]>>;
    readonly comboboxPlacementLockDemo: Schema.Struct<{
        readonly id: Schema.String;
        readonly isOpen: Schema.Boolean;
        readonly isAnimated: Schema.Boolean;
        readonly isModal: Schema.Boolean;
        readonly nullable: Schema.Boolean;
        readonly immediate: Schema.Boolean;
        readonly selectInputOnFocus: Schema.Boolean;
        readonly animation: Schema.Struct<{
            readonly id: Schema.String;
            readonly isShowing: Schema.Boolean;
            readonly transitionState: Schema.Literals<readonly ["Idle", "EnterStart", "EnterAnimating", "LeaveStart", "LeaveAnimating"]>;
            readonly transitionGeneration: Schema.Number;
        }>;
        readonly maybeActiveItemIndex: Schema.Option<Schema.Number>;
        readonly activationTrigger: Schema.Literals<readonly ["Pointer", "Keyboard"]>;
        readonly inputValue: Schema.String;
        readonly maybeLastPointerPosition: Schema.Option<Schema.Struct<{
            readonly screenX: Schema.Number;
            readonly screenY: Schema.Number;
        }>>;
    }>;
    readonly maybeComboboxPlacementLockDemoSelectedCity: Schema.Option<Schema.Literals<readonly ["Johannesburg", "Kyiv", "Oxford", "Plymouth", "Quito", "Wellington", "Zurich"]>>;
    readonly comboboxNullableDemo: Schema.Struct<{
        readonly id: Schema.String;
        readonly isOpen: Schema.Boolean;
        readonly isAnimated: Schema.Boolean;
        readonly isModal: Schema.Boolean;
        readonly nullable: Schema.Boolean;
        readonly immediate: Schema.Boolean;
        readonly selectInputOnFocus: Schema.Boolean;
        readonly animation: Schema.Struct<{
            readonly id: Schema.String;
            readonly isShowing: Schema.Boolean;
            readonly transitionState: Schema.Literals<readonly ["Idle", "EnterStart", "EnterAnimating", "LeaveStart", "LeaveAnimating"]>;
            readonly transitionGeneration: Schema.Number;
        }>;
        readonly maybeActiveItemIndex: Schema.Option<Schema.Number>;
        readonly activationTrigger: Schema.Literals<readonly ["Pointer", "Keyboard"]>;
        readonly inputValue: Schema.String;
        readonly maybeLastPointerPosition: Schema.Option<Schema.Struct<{
            readonly screenX: Schema.Number;
            readonly screenY: Schema.Number;
        }>>;
    }>;
    readonly maybeComboboxNullableDemoSelectedCity: Schema.Option<Schema.Literals<readonly ["Johannesburg", "Kyiv", "Oxford", "Plymouth", "Quito", "Wellington", "Zurich"]>>;
    readonly comboboxMultiDemo: Schema.Struct<{
        readonly id: Schema.String;
        readonly isOpen: Schema.Boolean;
        readonly isAnimated: Schema.Boolean;
        readonly isModal: Schema.Boolean;
        readonly nullable: Schema.Boolean;
        readonly immediate: Schema.Boolean;
        readonly selectInputOnFocus: Schema.Boolean;
        readonly animation: Schema.Struct<{
            readonly id: Schema.String;
            readonly isShowing: Schema.Boolean;
            readonly transitionState: Schema.Literals<readonly ["Idle", "EnterStart", "EnterAnimating", "LeaveStart", "LeaveAnimating"]>;
            readonly transitionGeneration: Schema.Number;
        }>;
        readonly maybeActiveItemIndex: Schema.Option<Schema.Number>;
        readonly activationTrigger: Schema.Literals<readonly ["Pointer", "Keyboard"]>;
        readonly inputValue: Schema.String;
        readonly maybeLastPointerPosition: Schema.Option<Schema.Struct<{
            readonly screenX: Schema.Number;
            readonly screenY: Schema.Number;
        }>>;
    }>;
    readonly comboboxMultiDemoSelectedCities: Schema.$Array<Schema.Literals<readonly ["Johannesburg", "Kyiv", "Oxford", "Plymouth", "Quito", "Wellington", "Zurich"]>>;
    readonly comboboxSelectOnFocusDemo: Schema.Struct<{
        readonly id: Schema.String;
        readonly isOpen: Schema.Boolean;
        readonly isAnimated: Schema.Boolean;
        readonly isModal: Schema.Boolean;
        readonly nullable: Schema.Boolean;
        readonly immediate: Schema.Boolean;
        readonly selectInputOnFocus: Schema.Boolean;
        readonly animation: Schema.Struct<{
            readonly id: Schema.String;
            readonly isShowing: Schema.Boolean;
            readonly transitionState: Schema.Literals<readonly ["Idle", "EnterStart", "EnterAnimating", "LeaveStart", "LeaveAnimating"]>;
            readonly transitionGeneration: Schema.Number;
        }>;
        readonly maybeActiveItemIndex: Schema.Option<Schema.Number>;
        readonly activationTrigger: Schema.Literals<readonly ["Pointer", "Keyboard"]>;
        readonly inputValue: Schema.String;
        readonly maybeLastPointerPosition: Schema.Option<Schema.Struct<{
            readonly screenX: Schema.Number;
            readonly screenY: Schema.Number;
        }>>;
    }>;
    readonly maybeComboboxSelectOnFocusDemoSelectedCity: Schema.Option<Schema.Literals<readonly ["Johannesburg", "Kyiv", "Oxford", "Plymouth", "Quito", "Wellington", "Zurich"]>>;
    readonly dialogDemo: Schema.Struct<{
        readonly id: Schema.String;
        readonly isOpen: Schema.Boolean;
        readonly isAnimated: Schema.Boolean;
        readonly animation: Schema.Struct<{
            readonly id: Schema.String;
            readonly isShowing: Schema.Boolean;
            readonly transitionState: Schema.Literals<readonly ["Idle", "EnterStart", "EnterAnimating", "LeaveStart", "LeaveAnimating"]>;
            readonly transitionGeneration: Schema.Number;
        }>;
        readonly maybeFocusSelector: Schema.Option<Schema.String>;
    }>;
    readonly dialogAnimatedDemo: Schema.Struct<{
        readonly id: Schema.String;
        readonly isOpen: Schema.Boolean;
        readonly isAnimated: Schema.Boolean;
        readonly animation: Schema.Struct<{
            readonly id: Schema.String;
            readonly isShowing: Schema.Boolean;
            readonly transitionState: Schema.Literals<readonly ["Idle", "EnterStart", "EnterAnimating", "LeaveStart", "LeaveAnimating"]>;
            readonly transitionGeneration: Schema.Number;
        }>;
        readonly maybeFocusSelector: Schema.Option<Schema.String>;
    }>;
    readonly overlayDialogDemo: Schema.Struct<{
        readonly id: Schema.String;
        readonly isOpen: Schema.Boolean;
        readonly isAnimated: Schema.Boolean;
        readonly animation: Schema.Struct<{
            readonly id: Schema.String;
            readonly isShowing: Schema.Boolean;
            readonly transitionState: Schema.Literals<readonly ["Idle", "EnterStart", "EnterAnimating", "LeaveStart", "LeaveAnimating"]>;
            readonly transitionGeneration: Schema.Number;
        }>;
        readonly maybeFocusSelector: Schema.Option<Schema.String>;
    }>;
    readonly overlayComboboxDemo: Schema.Struct<{
        readonly id: Schema.String;
        readonly isOpen: Schema.Boolean;
        readonly isAnimated: Schema.Boolean;
        readonly isModal: Schema.Boolean;
        readonly nullable: Schema.Boolean;
        readonly immediate: Schema.Boolean;
        readonly selectInputOnFocus: Schema.Boolean;
        readonly animation: Schema.Struct<{
            readonly id: Schema.String;
            readonly isShowing: Schema.Boolean;
            readonly transitionState: Schema.Literals<readonly ["Idle", "EnterStart", "EnterAnimating", "LeaveStart", "LeaveAnimating"]>;
            readonly transitionGeneration: Schema.Number;
        }>;
        readonly maybeActiveItemIndex: Schema.Option<Schema.Number>;
        readonly activationTrigger: Schema.Literals<readonly ["Pointer", "Keyboard"]>;
        readonly inputValue: Schema.String;
        readonly maybeLastPointerPosition: Schema.Option<Schema.Struct<{
            readonly screenX: Schema.Number;
            readonly screenY: Schema.Number;
        }>>;
    }>;
    readonly maybeOverlayComboboxDemoSelectedCity: Schema.Option<Schema.Literals<readonly ["Johannesburg", "Kyiv", "Oxford", "Plymouth", "Quito", "Wellington", "Zurich"]>>;
    readonly nestedDialogParentDemo: Schema.Struct<{
        readonly id: Schema.String;
        readonly isOpen: Schema.Boolean;
        readonly isAnimated: Schema.Boolean;
        readonly animation: Schema.Struct<{
            readonly id: Schema.String;
            readonly isShowing: Schema.Boolean;
            readonly transitionState: Schema.Literals<readonly ["Idle", "EnterStart", "EnterAnimating", "LeaveStart", "LeaveAnimating"]>;
            readonly transitionGeneration: Schema.Number;
        }>;
        readonly maybeFocusSelector: Schema.Option<Schema.String>;
    }>;
    readonly nestedDialogChildDemo: Schema.Struct<{
        readonly id: Schema.String;
        readonly isOpen: Schema.Boolean;
        readonly isAnimated: Schema.Boolean;
        readonly animation: Schema.Struct<{
            readonly id: Schema.String;
            readonly isShowing: Schema.Boolean;
            readonly transitionState: Schema.Literals<readonly ["Idle", "EnterStart", "EnterAnimating", "LeaveStart", "LeaveAnimating"]>;
            readonly transitionGeneration: Schema.Number;
        }>;
        readonly maybeFocusSelector: Schema.Option<Schema.String>;
    }>;
    readonly isDisclosureDemoOpen: Schema.Boolean;
    readonly isDisclosureCollapsedPreviewDemoOpen: Schema.Boolean;
    readonly listboxDemo: Schema.Struct<{
        readonly id: Schema.String;
        readonly isOpen: Schema.Boolean;
        readonly isAnimated: Schema.Boolean;
        readonly isModal: Schema.Boolean;
        readonly orientation: Schema.Literals<readonly ["Vertical", "Horizontal"]>;
        readonly animation: Schema.Struct<{
            readonly id: Schema.String;
            readonly isShowing: Schema.Boolean;
            readonly transitionState: Schema.Literals<readonly ["Idle", "EnterStart", "EnterAnimating", "LeaveStart", "LeaveAnimating"]>;
            readonly transitionGeneration: Schema.Number;
        }>;
        readonly maybeActiveItemIndex: Schema.Option<Schema.Number>;
        readonly activationTrigger: Schema.Literals<readonly ["Pointer", "Keyboard"]>;
        readonly searchQuery: Schema.String;
        readonly searchVersion: Schema.Number;
        readonly maybeLastPointerPosition: Schema.Option<Schema.Struct<{
            readonly screenX: Schema.Number;
            readonly screenY: Schema.Number;
        }>>;
        readonly maybeLastButtonPointerType: Schema.Option<Schema.String>;
    }>;
    readonly maybeListboxDemoSelectedItem: Schema.Option<Schema.Literals<readonly ["Michael Bluth", "Lindsay Funke", "Gob Bluth", "George Michael", "Maeby Funke", "Buster Bluth", "Tobias Funke", "Lucille Bluth"]>>;
    readonly listboxMultiDemo: Schema.Struct<{
        readonly id: Schema.String;
        readonly isOpen: Schema.Boolean;
        readonly isAnimated: Schema.Boolean;
        readonly isModal: Schema.Boolean;
        readonly orientation: Schema.Literals<readonly ["Vertical", "Horizontal"]>;
        readonly animation: Schema.Struct<{
            readonly id: Schema.String;
            readonly isShowing: Schema.Boolean;
            readonly transitionState: Schema.Literals<readonly ["Idle", "EnterStart", "EnterAnimating", "LeaveStart", "LeaveAnimating"]>;
            readonly transitionGeneration: Schema.Number;
        }>;
        readonly maybeActiveItemIndex: Schema.Option<Schema.Number>;
        readonly activationTrigger: Schema.Literals<readonly ["Pointer", "Keyboard"]>;
        readonly searchQuery: Schema.String;
        readonly searchVersion: Schema.Number;
        readonly maybeLastPointerPosition: Schema.Option<Schema.Struct<{
            readonly screenX: Schema.Number;
            readonly screenY: Schema.Number;
        }>>;
        readonly maybeLastButtonPointerType: Schema.Option<Schema.String>;
    }>;
    readonly listboxMultiDemoSelectedItems: Schema.$Array<Schema.Literals<readonly ["Michael Bluth", "Lindsay Funke", "Gob Bluth", "George Michael", "Maeby Funke", "Buster Bluth", "Tobias Funke", "Lucille Bluth"]>>;
    readonly listboxGroupedDemo: Schema.Struct<{
        readonly id: Schema.String;
        readonly isOpen: Schema.Boolean;
        readonly isAnimated: Schema.Boolean;
        readonly isModal: Schema.Boolean;
        readonly orientation: Schema.Literals<readonly ["Vertical", "Horizontal"]>;
        readonly animation: Schema.Struct<{
            readonly id: Schema.String;
            readonly isShowing: Schema.Boolean;
            readonly transitionState: Schema.Literals<readonly ["Idle", "EnterStart", "EnterAnimating", "LeaveStart", "LeaveAnimating"]>;
            readonly transitionGeneration: Schema.Number;
        }>;
        readonly maybeActiveItemIndex: Schema.Option<Schema.Number>;
        readonly activationTrigger: Schema.Literals<readonly ["Pointer", "Keyboard"]>;
        readonly searchQuery: Schema.String;
        readonly searchVersion: Schema.Number;
        readonly maybeLastPointerPosition: Schema.Option<Schema.Struct<{
            readonly screenX: Schema.Number;
            readonly screenY: Schema.Number;
        }>>;
        readonly maybeLastButtonPointerType: Schema.Option<Schema.String>;
    }>;
    readonly maybeListboxGroupedDemoSelectedItem: Schema.Option<Schema.String>;
    readonly menuBasicDemo: Schema.Struct<{
        readonly id: Schema.String;
        readonly isOpen: Schema.Boolean;
        readonly isAnimated: Schema.Boolean;
        readonly isModal: Schema.Boolean;
        readonly animation: Schema.Struct<{
            readonly id: Schema.String;
            readonly isShowing: Schema.Boolean;
            readonly transitionState: Schema.Literals<readonly ["Idle", "EnterStart", "EnterAnimating", "LeaveStart", "LeaveAnimating"]>;
            readonly transitionGeneration: Schema.Number;
        }>;
        readonly maybeActiveItemIndex: Schema.Option<Schema.Number>;
        readonly activationTrigger: Schema.Literals<readonly ["Pointer", "Keyboard"]>;
        readonly searchQuery: Schema.String;
        readonly searchVersion: Schema.Number;
        readonly maybeLastPointerPosition: Schema.Option<Schema.Struct<{
            readonly screenX: Schema.Number;
            readonly screenY: Schema.Number;
        }>>;
        readonly maybeLastButtonPointerType: Schema.Option<Schema.String>;
        readonly maybePointerOrigin: Schema.Option<Schema.Struct<{
            readonly screenX: Schema.Number;
            readonly screenY: Schema.Number;
            readonly timeStamp: Schema.Number;
        }>>;
    }>;
    readonly menuAnimatedDemo: Schema.Struct<{
        readonly id: Schema.String;
        readonly isOpen: Schema.Boolean;
        readonly isAnimated: Schema.Boolean;
        readonly isModal: Schema.Boolean;
        readonly animation: Schema.Struct<{
            readonly id: Schema.String;
            readonly isShowing: Schema.Boolean;
            readonly transitionState: Schema.Literals<readonly ["Idle", "EnterStart", "EnterAnimating", "LeaveStart", "LeaveAnimating"]>;
            readonly transitionGeneration: Schema.Number;
        }>;
        readonly maybeActiveItemIndex: Schema.Option<Schema.Number>;
        readonly activationTrigger: Schema.Literals<readonly ["Pointer", "Keyboard"]>;
        readonly searchQuery: Schema.String;
        readonly searchVersion: Schema.Number;
        readonly maybeLastPointerPosition: Schema.Option<Schema.Struct<{
            readonly screenX: Schema.Number;
            readonly screenY: Schema.Number;
        }>>;
        readonly maybeLastButtonPointerType: Schema.Option<Schema.String>;
        readonly maybePointerOrigin: Schema.Option<Schema.Struct<{
            readonly screenX: Schema.Number;
            readonly screenY: Schema.Number;
            readonly timeStamp: Schema.Number;
        }>>;
    }>;
    readonly popoverBasicDemo: Schema.Struct<{
        readonly id: Schema.String;
        readonly isOpen: Schema.Boolean;
        readonly isAnimated: Schema.Boolean;
        readonly isModal: Schema.Boolean;
        readonly contentFocus: Schema.Boolean;
        readonly animation: Schema.Struct<{
            readonly id: Schema.String;
            readonly isShowing: Schema.Boolean;
            readonly transitionState: Schema.Literals<readonly ["Idle", "EnterStart", "EnterAnimating", "LeaveStart", "LeaveAnimating"]>;
            readonly transitionGeneration: Schema.Number;
        }>;
        readonly maybeLastButtonPointerType: Schema.Option<Schema.String>;
    }>;
    readonly popoverAnimatedDemo: Schema.Struct<{
        readonly id: Schema.String;
        readonly isOpen: Schema.Boolean;
        readonly isAnimated: Schema.Boolean;
        readonly isModal: Schema.Boolean;
        readonly contentFocus: Schema.Boolean;
        readonly animation: Schema.Struct<{
            readonly id: Schema.String;
            readonly isShowing: Schema.Boolean;
            readonly transitionState: Schema.Literals<readonly ["Idle", "EnterStart", "EnterAnimating", "LeaveStart", "LeaveAnimating"]>;
            readonly transitionGeneration: Schema.Number;
        }>;
        readonly maybeLastButtonPointerType: Schema.Option<Schema.String>;
    }>;
    readonly popoverArrowDemo: Schema.Struct<{
        readonly id: Schema.String;
        readonly isOpen: Schema.Boolean;
        readonly isAnimated: Schema.Boolean;
        readonly isModal: Schema.Boolean;
        readonly contentFocus: Schema.Boolean;
        readonly animation: Schema.Struct<{
            readonly id: Schema.String;
            readonly isShowing: Schema.Boolean;
            readonly transitionState: Schema.Literals<readonly ["Idle", "EnterStart", "EnterAnimating", "LeaveStart", "LeaveAnimating"]>;
            readonly transitionGeneration: Schema.Number;
        }>;
        readonly maybeLastButtonPointerType: Schema.Option<Schema.String>;
    }>;
    readonly popoverNestedParentDemo: Schema.Struct<{
        readonly id: Schema.String;
        readonly isOpen: Schema.Boolean;
        readonly isAnimated: Schema.Boolean;
        readonly isModal: Schema.Boolean;
        readonly contentFocus: Schema.Boolean;
        readonly animation: Schema.Struct<{
            readonly id: Schema.String;
            readonly isShowing: Schema.Boolean;
            readonly transitionState: Schema.Literals<readonly ["Idle", "EnterStart", "EnterAnimating", "LeaveStart", "LeaveAnimating"]>;
            readonly transitionGeneration: Schema.Number;
        }>;
        readonly maybeLastButtonPointerType: Schema.Option<Schema.String>;
    }>;
    readonly popoverNestedChildDemo: Schema.Struct<{
        readonly id: Schema.String;
        readonly isOpen: Schema.Boolean;
        readonly isAnimated: Schema.Boolean;
        readonly isModal: Schema.Boolean;
        readonly contentFocus: Schema.Boolean;
        readonly animation: Schema.Struct<{
            readonly id: Schema.String;
            readonly isShowing: Schema.Boolean;
            readonly transitionState: Schema.Literals<readonly ["Idle", "EnterStart", "EnterAnimating", "LeaveStart", "LeaveAnimating"]>;
            readonly transitionGeneration: Schema.Number;
        }>;
        readonly maybeLastButtonPointerType: Schema.Option<Schema.String>;
    }>;
    readonly verticalRadioGroupDemo: Schema.Struct<{
        readonly id: Schema.String;
        readonly maybeFocusedIndex: Schema.Option<Schema.Number>;
    }>;
    readonly verticalRadioGroupDemoValue: Schema.Option<Schema.Literals<readonly ["Startup", "Business", "Enterprise"]>>;
    readonly horizontalRadioGroupDemo: Schema.Struct<{
        readonly id: Schema.String;
        readonly maybeFocusedIndex: Schema.Option<Schema.Number>;
    }>;
    readonly horizontalRadioGroupDemoValue: Schema.Option<Schema.Literals<readonly ["Startup", "Business", "Enterprise"]>>;
    readonly selectDemoValue: Schema.String;
    readonly sliderRatingDemo: Schema.Struct<{
        readonly id: Schema.String;
        readonly min: Schema.Number;
        readonly max: Schema.Number;
        readonly step: Schema.Number;
        readonly dragState: import("foldkit/schema").TaggedUnion<{
            readonly Idle: {};
            readonly Dragging: {
                originValue: Schema.Number;
            };
        }>;
    }>;
    readonly sliderRatingValue: Schema.Number;
    readonly sliderVolumeDemo: Schema.Struct<{
        readonly id: Schema.String;
        readonly min: Schema.Number;
        readonly max: Schema.Number;
        readonly step: Schema.Number;
        readonly dragState: import("foldkit/schema").TaggedUnion<{
            readonly Idle: {};
            readonly Dragging: {
                originValue: Schema.Number;
            };
        }>;
    }>;
    readonly sliderVolumeValue: Schema.Number;
    readonly isSwitchDemoChecked: Schema.Boolean;
    readonly horizontalTabsDemo: Schema.Struct<{
        readonly id: Schema.String;
        readonly maybeFocusedIndex: Schema.Option<Schema.Number>;
        readonly activationMode: Schema.Literals<readonly ["Automatic", "Manual"]>;
    }>;
    readonly horizontalTabsDemoTab: Schema.Literals<readonly ["Foldkit", "React", "Elm"]>;
    readonly verticalTabsDemo: Schema.Struct<{
        readonly id: Schema.String;
        readonly maybeFocusedIndex: Schema.Option<Schema.Number>;
        readonly activationMode: Schema.Literals<readonly ["Automatic", "Manual"]>;
    }>;
    readonly verticalTabsDemoTab: Schema.Literals<readonly ["Foldkit", "React", "Elm"]>;
    readonly dragAndDropDemo: Schema.Struct<{
        readonly id: Schema.String;
        readonly orientation: Schema.Literals<readonly ["Horizontal", "Vertical"]>;
        readonly activationThreshold: Schema.Number;
        readonly dragState: import("foldkit/schema").TaggedUnion<{
            readonly Idle: {};
            readonly Pending: {
                itemId: Schema.String;
                containerId: Schema.String;
                index: Schema.Number;
                origin: Schema.Struct<{
                    readonly screenX: Schema.Number;
                    readonly screenY: Schema.Number;
                }>;
            };
            readonly Dragging: {
                itemId: Schema.String;
                sourceContainerId: Schema.String;
                sourceIndex: Schema.Number;
                origin: Schema.Struct<{
                    readonly screenX: Schema.Number;
                    readonly screenY: Schema.Number;
                }>;
                current: Schema.Struct<{
                    readonly clientX: Schema.Number;
                    readonly clientY: Schema.Number;
                }>;
                maybeDropTarget: Schema.Option<Schema.Struct<{
                    readonly containerId: Schema.String;
                    readonly index: Schema.Number;
                }>>;
            };
            readonly KeyboardDragging: {
                itemId: Schema.String;
                sourceContainerId: Schema.String;
                sourceIndex: Schema.Number;
                targetContainerId: Schema.String;
                targetIndex: Schema.Number;
            };
        }>;
    }>;
    readonly dragAndDropDemoColumns: Schema.$Array<Schema.Struct<{
        readonly id: Schema.String;
        readonly label: Schema.String;
        readonly cards: Schema.mutable<Schema.$Array<Schema.Struct<{
            readonly id: Schema.String;
            readonly label: Schema.String;
        }>>>;
    }>>;
    readonly dragAndDropDemoAnnouncement: Schema.String;
    readonly fileDropBasicDemo: Schema.Struct<{
        readonly id: Schema.String;
        readonly isDragOver: Schema.Boolean;
    }>;
    readonly fileDropBasicDemoFiles: Schema.$Array<Schema.Schema<File>>;
    readonly toastDemo: Schema.Struct<{
        readonly id: Schema.String;
        readonly defaultDuration: Schema.DurationFromMillis;
        readonly entries: Schema.$Array<Schema.Struct<{
            readonly id: Schema.String;
            readonly variant: Schema.Literals<readonly ["Info", "Success", "Warning", "Error"]>;
            readonly animation: Schema.Struct<{
                readonly id: Schema.String;
                readonly isShowing: Schema.Boolean;
                readonly transitionState: Schema.Literals<readonly ["Idle", "EnterStart", "EnterAnimating", "LeaveStart", "LeaveAnimating"]>;
                readonly transitionGeneration: Schema.Number;
            }>;
            readonly maybeDuration: Schema.Option<Schema.DurationFromMillis>;
            readonly pendingDismissVersion: Schema.Number;
            readonly isHovered: Schema.Boolean;
            readonly swipeState: import("foldkit/schema").TaggedUnion<{
                readonly Idle: {};
                readonly Dragging: {
                    pointerId: Schema.Number;
                    startX: Schema.Number;
                    currentX: Schema.Number;
                };
                readonly Settling: {
                    offsetX: Schema.Number;
                };
                readonly Dismissing: {
                    offsetX: Schema.Number;
                    direction: Schema.Literals<readonly ["Left", "Right"]>;
                };
            }>;
            readonly swipeVersion: Schema.Number;
            readonly payload: Schema.Codec<{
                readonly title: string;
                readonly maybeDescription: import("effect/Option").Option<string>;
            }, {
                readonly title: string;
                readonly maybeDescription: import("effect/Option").Option<string>;
            }, never, never>;
        }>>;
        readonly nextEntryKey: Schema.Number;
        readonly maybeSwipeConfig: Schema.Option<Schema.Struct<{
            readonly direction: Schema.Literals<readonly ["Left", "Right"]>;
            readonly threshold: Schema.Number;
        }>>;
    }>;
    readonly maybeLastDismissedToastTitle: Schema.Option<Schema.String>;
    readonly tooltipDemo: Schema.Struct<{
        readonly id: Schema.String;
        readonly isOpen: Schema.Boolean;
        readonly isHovered: Schema.Boolean;
        readonly isFocused: Schema.Boolean;
        readonly isDismissed: Schema.Boolean;
        readonly showDelay: Schema.DurationFromMillis;
        readonly pendingShowVersion: Schema.Number;
        readonly maybeLastPointerType: Schema.Option<Schema.String>;
    }>;
    readonly hoverIntentCardDemo: Schema.Struct<{
        readonly isOpen: Schema.Boolean;
        readonly isTriggerHovered: Schema.Boolean;
        readonly isPanelHovered: Schema.Boolean;
        readonly maybeFocusLocation: Schema.Option<Schema.Literals<readonly ["Trigger", "Panel"]>>;
        readonly isDismissed: Schema.Boolean;
        readonly openDelay: Schema.DurationFromMillis;
        readonly closeDelay: Schema.DurationFromMillis;
        readonly pendingOpenVersion: Schema.Number;
        readonly pendingCloseVersion: Schema.Number;
    }>;
    readonly hoverIntentMenuDemo: Schema.Struct<{
        readonly isOpen: Schema.Boolean;
        readonly isTriggerHovered: Schema.Boolean;
        readonly isPanelHovered: Schema.Boolean;
        readonly maybeFocusLocation: Schema.Option<Schema.Literals<readonly ["Trigger", "Panel"]>>;
        readonly isDismissed: Schema.Boolean;
        readonly openDelay: Schema.DurationFromMillis;
        readonly closeDelay: Schema.DurationFromMillis;
        readonly pendingOpenVersion: Schema.Number;
        readonly pendingCloseVersion: Schema.Number;
    }>;
    readonly animationDemo: Schema.Struct<{
        readonly id: Schema.String;
        readonly isShowing: Schema.Boolean;
        readonly transitionState: Schema.Literals<readonly ["Idle", "EnterStart", "EnterAnimating", "LeaveStart", "LeaveAnimating"]>;
        readonly transitionGeneration: Schema.Number;
    }>;
    readonly virtualListDemo: Schema.Struct<{
        readonly id: Schema.String;
        readonly rowHeightPx: Schema.Number;
        readonly scrollTop: Schema.Number;
        readonly measurement: import("foldkit/schema").TaggedUnion<{
            readonly Unmeasured: {};
            readonly Measured: {
                containerWidth: Schema.Number;
                containerHeight: Schema.Number;
            };
        }>;
        readonly viewportAnchor: import("foldkit/schema").TaggedUnion<{
            readonly Offset: {
                scrollTop: Schema.Number;
            };
            readonly Row: {
                key: Schema.String;
                index: Schema.Number;
                viewportOffset: Schema.Number;
            };
            readonly End: {};
        }>;
        readonly measuredRowHeights: Schema.$Record<Schema.String, Schema.Number>;
        readonly layoutVersion: Schema.Number;
        readonly initialScroll: import("foldkit/schema").TaggedUnion<{
            readonly Applied: {};
            readonly Pending: {
                target: import("foldkit/schema").TaggedUnion<{
                    readonly Index: {
                        index: Schema.Number;
                    };
                    readonly Key: {
                        key: Schema.String;
                    };
                    readonly Offset: {
                        offset: Schema.Number;
                    };
                    readonly End: {};
                }>;
                alignment: Schema.Literals<readonly ["Start", "Center", "End", "Nearest"]>;
            };
        }>;
        readonly endBehavior: import("foldkit/schema").TaggedUnion<{
            readonly PreserveAnchor: {};
            readonly Follow: {
                thresholdPx: Schema.Number;
            };
        }>;
        readonly pendingScroll: import("foldkit/schema").TaggedUnion<{
            readonly Idle: {};
            readonly Pending: {
                request: import("foldkit/schema").TaggedUnion<{
                    readonly Target: {
                        target: import("foldkit/schema").TaggedUnion<{
                            readonly Index: {
                                index: Schema.Number;
                            };
                            readonly Key: {
                                key: Schema.String;
                            };
                            readonly Offset: {
                                offset: Schema.Number;
                            };
                            readonly End: {};
                        }>;
                        alignment: Schema.Literals<readonly ["Start", "Center", "End", "Nearest"]>;
                    };
                    readonly Anchor: {
                        anchor: import("foldkit/schema").TaggedUnion<{
                            readonly Offset: {
                                scrollTop: Schema.Number;
                            };
                            readonly Row: {
                                key: Schema.String;
                                index: Schema.Number;
                                viewportOffset: Schema.Number;
                            };
                            readonly End: {};
                        }>;
                    };
                }>;
                version: Schema.Number;
            };
        }>;
        readonly pendingScrollVersion: Schema.Number;
    }>;
    readonly virtualListVariableDemo: Schema.Struct<{
        readonly id: Schema.String;
        readonly rowHeightPx: Schema.Number;
        readonly scrollTop: Schema.Number;
        readonly measurement: import("foldkit/schema").TaggedUnion<{
            readonly Unmeasured: {};
            readonly Measured: {
                containerWidth: Schema.Number;
                containerHeight: Schema.Number;
            };
        }>;
        readonly viewportAnchor: import("foldkit/schema").TaggedUnion<{
            readonly Offset: {
                scrollTop: Schema.Number;
            };
            readonly Row: {
                key: Schema.String;
                index: Schema.Number;
                viewportOffset: Schema.Number;
            };
            readonly End: {};
        }>;
        readonly measuredRowHeights: Schema.$Record<Schema.String, Schema.Number>;
        readonly layoutVersion: Schema.Number;
        readonly initialScroll: import("foldkit/schema").TaggedUnion<{
            readonly Applied: {};
            readonly Pending: {
                target: import("foldkit/schema").TaggedUnion<{
                    readonly Index: {
                        index: Schema.Number;
                    };
                    readonly Key: {
                        key: Schema.String;
                    };
                    readonly Offset: {
                        offset: Schema.Number;
                    };
                    readonly End: {};
                }>;
                alignment: Schema.Literals<readonly ["Start", "Center", "End", "Nearest"]>;
            };
        }>;
        readonly endBehavior: import("foldkit/schema").TaggedUnion<{
            readonly PreserveAnchor: {};
            readonly Follow: {
                thresholdPx: Schema.Number;
            };
        }>;
        readonly pendingScroll: import("foldkit/schema").TaggedUnion<{
            readonly Idle: {};
            readonly Pending: {
                request: import("foldkit/schema").TaggedUnion<{
                    readonly Target: {
                        target: import("foldkit/schema").TaggedUnion<{
                            readonly Index: {
                                index: Schema.Number;
                            };
                            readonly Key: {
                                key: Schema.String;
                            };
                            readonly Offset: {
                                offset: Schema.Number;
                            };
                            readonly End: {};
                        }>;
                        alignment: Schema.Literals<readonly ["Start", "Center", "End", "Nearest"]>;
                    };
                    readonly Anchor: {
                        anchor: import("foldkit/schema").TaggedUnion<{
                            readonly Offset: {
                                scrollTop: Schema.Number;
                            };
                            readonly Row: {
                                key: Schema.String;
                                index: Schema.Number;
                                viewportOffset: Schema.Number;
                            };
                            readonly End: {};
                        }>;
                    };
                }>;
                version: Schema.Number;
            };
        }>;
        readonly pendingScrollVersion: Schema.Number;
    }>;
    readonly virtualListChatDemo: Schema.Struct<{
        readonly id: Schema.String;
        readonly rowHeightPx: Schema.Number;
        readonly scrollTop: Schema.Number;
        readonly measurement: import("foldkit/schema").TaggedUnion<{
            readonly Unmeasured: {};
            readonly Measured: {
                containerWidth: Schema.Number;
                containerHeight: Schema.Number;
            };
        }>;
        readonly viewportAnchor: import("foldkit/schema").TaggedUnion<{
            readonly Offset: {
                scrollTop: Schema.Number;
            };
            readonly Row: {
                key: Schema.String;
                index: Schema.Number;
                viewportOffset: Schema.Number;
            };
            readonly End: {};
        }>;
        readonly measuredRowHeights: Schema.$Record<Schema.String, Schema.Number>;
        readonly layoutVersion: Schema.Number;
        readonly initialScroll: import("foldkit/schema").TaggedUnion<{
            readonly Applied: {};
            readonly Pending: {
                target: import("foldkit/schema").TaggedUnion<{
                    readonly Index: {
                        index: Schema.Number;
                    };
                    readonly Key: {
                        key: Schema.String;
                    };
                    readonly Offset: {
                        offset: Schema.Number;
                    };
                    readonly End: {};
                }>;
                alignment: Schema.Literals<readonly ["Start", "Center", "End", "Nearest"]>;
            };
        }>;
        readonly endBehavior: import("foldkit/schema").TaggedUnion<{
            readonly PreserveAnchor: {};
            readonly Follow: {
                thresholdPx: Schema.Number;
            };
        }>;
        readonly pendingScroll: import("foldkit/schema").TaggedUnion<{
            readonly Idle: {};
            readonly Pending: {
                request: import("foldkit/schema").TaggedUnion<{
                    readonly Target: {
                        target: import("foldkit/schema").TaggedUnion<{
                            readonly Index: {
                                index: Schema.Number;
                            };
                            readonly Key: {
                                key: Schema.String;
                            };
                            readonly Offset: {
                                offset: Schema.Number;
                            };
                            readonly End: {};
                        }>;
                        alignment: Schema.Literals<readonly ["Start", "Center", "End", "Nearest"]>;
                    };
                    readonly Anchor: {
                        anchor: import("foldkit/schema").TaggedUnion<{
                            readonly Offset: {
                                scrollTop: Schema.Number;
                            };
                            readonly Row: {
                                key: Schema.String;
                                index: Schema.Number;
                                viewportOffset: Schema.Number;
                            };
                            readonly End: {};
                        }>;
                    };
                }>;
                version: Schema.Number;
            };
        }>;
        readonly pendingScrollVersion: Schema.Number;
    }>;
    readonly virtualListChatMessages: Schema.$Array<Schema.Struct<{
        readonly id: Schema.Number;
        readonly body: Schema.String;
        readonly isExpanded: Schema.Boolean;
    }>>;
    readonly virtualListChatNextId: Schema.Number;
    readonly virtualListChatStartProximity: import("foldkit/schema").TaggedUnion<{
        readonly Away: {};
        readonly Near: {};
    }>;
}>;
export type Model = typeof Model.Type;
