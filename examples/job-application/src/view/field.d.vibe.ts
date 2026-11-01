import { type Field } from 'foldkit/fieldValidation';
import type { Html, HtmlBuilder } from 'foldkit/html';
export declare const input: <ParentMessage>(config: Readonly<{
    id: string;
    label: string;
    field: Field<string>;
    onInput: (value: string) => ParentMessage;
    type?: string;
    placeholder?: string;
}>, h: HtmlBuilder<ParentMessage>) => Html;
export declare const checkbox: <ParentMessage>(config: Readonly<{
    id: string;
    label: string;
    isChecked: boolean;
    onToggle: (isChecked: boolean) => ParentMessage;
}>, h: HtmlBuilder<ParentMessage>) => Html;
export declare const textarea: <ParentMessage>(config: Readonly<{
    id: string;
    label: string;
    value: string;
    onInput: (value: string) => ParentMessage;
    rows?: number;
    placeholder?: string;
}>, h: HtmlBuilder<ParentMessage>) => Html;
