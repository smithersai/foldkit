import { Server } from 'foldkit/experimental';
export declare const renderDocument: (application: Server.RenderedApplication, assets: Server.DocumentAssets, options?: Server.DocumentOptions) => string;
export declare const renderPage: (request: Request) => Promise<Server.EntryResult>;
