import { Effect, Option, Schema } from 'effect';
import { Command, Mount, Runtime, Update } from 'foldkit';
import type { Document } from 'foldkit/html';
import { HtmlBuilder } from 'foldkit/html';
export declare const GeolocateState: import("foldkit/schema").TaggedUnion<{
    readonly Idle: {};
    readonly Locating: {};
    readonly Failed: {
        reason: Schema.String;
    };
}>;
export type GeolocateState = typeof GeolocateState.Type;
export declare const Model: Schema.Struct<{
    readonly locations: Schema.$Array<Schema.Struct<{
        readonly id: Schema.String;
        readonly name: Schema.String;
        readonly region: Schema.String;
        readonly lng: Schema.Number;
        readonly lat: Schema.Number;
    }>>;
    readonly searchQuery: Schema.String;
    readonly maybeMapHostId: Schema.Option<Schema.String>;
    readonly maybeMapError: Schema.Option<Schema.String>;
    readonly maybeBounds: Schema.Option<Schema.Struct<{
        readonly west: Schema.Number;
        readonly south: Schema.Number;
        readonly east: Schema.Number;
        readonly north: Schema.Number;
    }>>;
    readonly maybeSelectedLocationId: Schema.Option<Schema.String>;
    readonly maybeUserLocation: Schema.Option<Schema.Struct<{
        readonly lng: Schema.Number;
        readonly lat: Schema.Number;
    }>>;
    readonly geolocateState: import("foldkit/schema").TaggedUnion<{
        readonly Idle: {};
        readonly Locating: {};
        readonly Failed: {
            reason: Schema.String;
        };
    }>;
}>;
export type Model = typeof Model.Type;
export declare const Message: import("foldkit/message").MessageUnion<{
    readonly SucceededMountMap: {
        hostId: Schema.String;
    };
    readonly FailedMountMap: {
        reason: Schema.String;
    };
    readonly MovedMap: {
        bounds: Schema.Struct<{
            readonly west: Schema.Number;
            readonly south: Schema.Number;
            readonly east: Schema.Number;
            readonly north: Schema.Number;
        }>;
    };
    readonly ClickedMarker: {
        locationId: Schema.String;
    };
    readonly ClickedLocation: {
        locationId: Schema.String;
    };
    readonly UpdatedSearchQuery: {
        value: Schema.String;
    };
    readonly ClickedFindMe: {};
    readonly DismissedGeolocate: {};
    readonly SucceededGeolocate: {
        lng: Schema.Number;
        lat: Schema.Number;
    };
    readonly FailedGeolocate: {
        reason: Schema.String;
    };
    readonly SucceededFlyTo: {};
    readonly FailedFlyTo: {
        reason: Schema.String;
    };
    readonly CompletedFocusSearchInput: {};
    readonly CompletedLockBodyScroll: {};
    readonly CompletedUnlockBodyScroll: {};
}>;
export type Message = typeof Message.Type;
export declare const FlyTo: Command.CommandDefinitionWithArgs<"FlyTo", {
    maybeHostId: Schema.Option<Schema.String>;
    lng: Schema.Number;
    lat: Schema.Number;
    zoom: Schema.Number;
}, Effect.Effect<{
    readonly _tag: "SucceededFlyTo";
} | {
    readonly _tag: "FailedFlyTo";
    readonly reason: string;
}, never, never>>;
export declare const Geolocate: Command.CommandDefinitionNoArgs<"Geolocate", Effect.Effect<{
    readonly _tag: "FailedGeolocate";
    readonly reason: string;
} | {
    readonly _tag: "SucceededGeolocate";
    readonly lng: number;
    readonly lat: number;
}, never, never>>;
export declare const FocusSearchInput: Command.CommandDefinitionNoArgs<"FocusSearchInput", Effect.Effect<{
    readonly _tag: "CompletedFocusSearchInput";
}, never, never>>;
export declare const LockBodyScroll: Command.CommandDefinitionNoArgs<"LockBodyScroll", Effect.Effect<{
    readonly _tag: "CompletedLockBodyScroll";
}, never, never>>;
export declare const UnlockBodyScroll: Command.CommandDefinitionNoArgs<"UnlockBodyScroll", Effect.Effect<{
    readonly _tag: "CompletedUnlockBodyScroll";
}, never, never>>;
export declare const update: (model: Model, message: Message) => Readonly<{
    model: {
        readonly locations: readonly {
            readonly id: string;
            readonly name: string;
            readonly region: string;
            readonly lng: number;
            readonly lat: number;
        }[];
        readonly searchQuery: string;
        readonly maybeMapHostId: Option.Option<string>;
        readonly maybeMapError: Option.Option<string>;
        readonly maybeBounds: Option.Option<{
            readonly west: number;
            readonly south: number;
            readonly east: number;
            readonly north: number;
        }>;
        readonly maybeSelectedLocationId: Option.Option<string>;
        readonly maybeUserLocation: Option.Option<{
            readonly lng: number;
            readonly lat: number;
        }>;
        readonly geolocateState: {
            readonly _tag: "Idle";
        } | {
            readonly _tag: "Locating";
        } | {
            readonly _tag: "Failed";
            readonly reason: string;
        };
    };
    commands?: Update.Commands<{
        readonly _tag: "ClickedFindMe";
    } | {
        readonly _tag: "CompletedFocusSearchInput";
    } | {
        readonly _tag: "CompletedLockBodyScroll";
    } | {
        readonly _tag: "CompletedUnlockBodyScroll";
    } | {
        readonly _tag: "DismissedGeolocate";
    } | {
        readonly _tag: "SucceededFlyTo";
    } | {
        readonly _tag: "ClickedLocation";
        readonly locationId: string;
    } | {
        readonly _tag: "ClickedMarker";
        readonly locationId: string;
    } | {
        readonly _tag: "FailedFlyTo";
        readonly reason: string;
    } | {
        readonly _tag: "FailedGeolocate";
        readonly reason: string;
    } | {
        readonly _tag: "FailedMountMap";
        readonly reason: string;
    } | {
        readonly _tag: "MovedMap";
        readonly bounds: {
            readonly west: number;
            readonly south: number;
            readonly east: number;
            readonly north: number;
        };
    } | {
        readonly _tag: "SucceededGeolocate";
        readonly lng: number;
        readonly lat: number;
    } | {
        readonly _tag: "SucceededMountMap";
        readonly hostId: string;
    } | {
        readonly _tag: "UpdatedSearchQuery";
        readonly value: string;
    }, never>;
    outMessage?: never;
}>;
export declare const init: Runtime.ApplicationInit<Model, Message>;
export declare const MountMap: Mount.MountDefinitionWithArgs<"MountMap", {
    hostId: Schema.String;
}, {
    readonly _tag: "ClickedMarker";
    readonly locationId: string;
} | {
    readonly _tag: "FailedMountMap";
    readonly reason: string;
} | {
    readonly _tag: "MovedMap";
    readonly bounds: {
        readonly west: number;
        readonly south: number;
        readonly east: number;
        readonly north: number;
    };
} | {
    readonly _tag: "SucceededMountMap";
    readonly hostId: string;
}>;
export declare const view: (model: Model, h: HtmlBuilder<Message>) => Document;
