import { Option } from "effect";
import type { Map as MapInstance } from 'maplibre-gl';
/** Stash a live Map instance against an id so Commands can reach it without
 *  putting the mutable, unfreezable instance in the Model. */
export declare const setMap: (hostId: string, instance: MapInstance) => void;
export declare const getMap: (hostId: string) => Option.Option<MapInstance>;
export declare const removeMap: (hostId: string, map: MapInstance) => void;
