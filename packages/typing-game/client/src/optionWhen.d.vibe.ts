import { Function, Option } from 'effect';
export declare const optionWhen: <T>(condition: boolean, value: Function.LazyArg<T>) => Option.Option<T>;
