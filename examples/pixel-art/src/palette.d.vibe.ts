import { Array } from 'effect';
import { type Cell, type HexColor } from './model.vibe';
export type PaletteTheme = Readonly<{
    name: string;
    colors: ReadonlyArray<HexColor>;
}>;
export declare const hex: (value: string) => HexColor;
export declare const PALETTE_THEMES: Array.NonEmptyReadonlyArray<PaletteTheme>;
export declare const resolveColor: (cell: Cell, theme: PaletteTheme) => HexColor;
export declare const currentPaletteTheme: (model: Readonly<{
    paletteThemeIndex: number;
}>) => PaletteTheme;
