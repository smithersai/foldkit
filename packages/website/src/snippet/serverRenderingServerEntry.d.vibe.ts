import { Server } from 'foldkit/experimental';
export declare const renderDocument: (application: Server.RenderedApplication, assets: Server.DocumentAssets, options?: Server.DocumentOptions) => string;
export declare const renderPage: (request: globalThis.Request) => Promise<Server.EntryResult>;
