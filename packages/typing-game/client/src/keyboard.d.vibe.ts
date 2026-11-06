import { Stream } from 'effect';
export declare const capturedKeyDownStream: <Message>(toMessage: (key: string) => Message) => Stream.Stream<Message>;
