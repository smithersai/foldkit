import { Effect } from 'effect';
import { type RelayClient } from './relayClient.js';
type ToolResult = Readonly<{
    content: ReadonlyArray<Readonly<{
        type: 'text';
        text: string;
    }>>;
    isError?: boolean;
}>;
/** A tool registration the MCP server hands to its low-level `Server.setRequestHandler` for `tools/list` and `tools/call`. */
export type ToolDefinition = Readonly<{
    name: string;
    description: string;
    inputSchema: object;
    handle: (rawInput: unknown) => Effect.Effect<ToolResult>;
}>;
/**
 * Build the read-only Foldkit DevTools tool definitions. Each tool decodes its
 * input via Effect Schema, dispatches a typed `Request` through the WebSocket
 * relay, and formats the typed `Response` as MCP tool content.
 */
export declare const buildTools: (relayClient: RelayClient) => ReadonlyArray<ToolDefinition>;
export {};
