import { Context, Layer } from 'effect';
export interface ViteEnvConfigShape {
    readonly VITE_SERVER_URL: string;
}
declare const ViteEnvConfig_base: Context.ServiceClass<ViteEnvConfig, "ViteEnvConfig", {
    readonly VITE_SERVER_URL: string;
}>;
export declare class ViteEnvConfig extends ViteEnvConfig_base {
}
export declare const ViteEnvConfigLive: Layer.Layer<ViteEnvConfig, never, never>;
export {};
