import { Marker } from "./markers";
import { Modifier } from "./modifiers";

/** Either an individal character or a keyword. */
export type TextFragment = Char | Keyword;

export type Char = string;

export type Keyword = Modifier | Marker;
