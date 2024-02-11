import { Effect } from "./effects";
import { TerminalTyperRendererOptions } from "./renderer";
import { Options } from "@/lib/types/utils";

//TODO: perhaps provide a normal distribution option, could be more realistic
/** Interval for an effect. */
export type EffectInterval = {
	variance: "constant";
	value: number;
} | {
	variance: "random";
	min: number;
	max: number;
};

/** State of a rendering operation. */
export interface RenderState {
	currentTextNode: Text;
	currentInvisibleTextNode?: Text | undefined;
	cursor: Cursor;
	options: Options<TerminalTyperRendererOptions>;
}

/** A cursor element and functions to perform actions to it. */
export interface Cursor {
	el: HTMLElement;
	startBlinking(): void;
	stopBlinking(): void;
}

export interface EffectBuilder<TEffect extends Effect = Effect> {
	/**
	 * Key name for the effect used to identify the effect within a
	 * string.
	 *
	 * **This cannot contain leading or trailing whitespace**.
	 */
	key: string;
	/**
	 * Creates an instance of the target effect.
	 *
	 * This should parse the raw value into one which the effect expects.
	 * @param rawValue - Unparsed, raw value
	 */
	create(rawValue: string): TEffect;
}