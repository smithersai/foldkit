import { Option } from "effect";
export declare const validateUserTextInput: (newUserText: string, maybeGameText: Option.Option<string>) => string;
export declare const findFirstWrongCharIndex: (userGameText: string) => (gameText: string) => Option.Option<number>;
