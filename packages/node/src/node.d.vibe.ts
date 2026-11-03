import { Config, Effect, Option, PlatformError, Schema } from 'effect';
import { HttpServerError } from 'effect/http';
/** Configuration for a Node server that hosts a built Foldkit application. */
export type ServeOptions = Readonly<{
    /** The port Config that selects the listening port. */
    port: Config.Config<number>;
    /**
     * The origin Config for requests that reach the Fetch handler. Use `None`
     * to derive `http://localhost:<port>` from the resolved port. A supplied
     * origin must use HTTP or HTTPS and have no credentials, path, query, or
     * fragment.
     */
    origin: Config.Config<Option.Option<string>>;
    /**
     * The build manifest to read. Relative paths resolve from the process
     * working directory. It defaults to `dist/server/foldkit.build.json`.
     */
    manifestPath?: string;
    /**
     * The deployed directory that corresponds to the Vite root. Provide it when
     * the manifest's server directory is outside that root. Relative paths
     * resolve from the process working directory.
     */
    rootDirectory?: string;
    /**
     * The root-relative Vite base path for client assets. It defaults to `/` and
     * must end with `/`, such as `/app/`.
     */
    basePath?: string;
}>;
/**
 * Starts a Node HTTP server for a built Foldkit application.
 *
 * The server reads `foldkit.build.json`, serves its client directory for GET
 * and HEAD requests, and sends every other application request to the emitted
 * Web Fetch handler. Interrupting the returned Effect closes the HTTP server.
 */
export declare const serve: (options: ServeOptions) => Effect.Effect<never, Config.ConfigError | Error | PlatformError.PlatformError | Schema.SchemaError | HttpServerError.ServeError>;
