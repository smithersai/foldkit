import { UrlRequest } from '../navigation/urlRequest.vibe';
import { Url } from '../url/index.vibe';
/** Configuration for URL routing with handlers for URL requests and URL changes. */
export type RoutingConfig<Message> = Readonly<{
    onUrlRequest: (request: UrlRequest) => Message;
    onUrlChange: (url: Url) => Message;
}>;
export declare const addNavigationEventListeners: <Message>(dispatch: (message: Message) => void, routingConfig: RoutingConfig<Message>) => (() => void);
export declare const addLinkClickListener: <Message>(dispatch: (message: Message) => void, routingConfig: RoutingConfig<Message>) => (() => void);
