import { EffectInterval, RenderState } from "../types";
import { delay, randomDelay } from "@/lib/utils";

/**
 * A terminal-typer effect that performs an operation to a string.
 */
export abstract class Effect<TValue = unknown> {
	/**
	 * Applies an interval delay.
	 * @param interval - Target interval
	 */
	protected static async applyInterval(interval: EffectInterval) {
		switch (interval.variance) {
			case "constant":
				return delay(interval.value);
			case "random":
				return randomDelay(interval.min, interval.max);
		}
	}

	readonly value: TValue;

	/**
	 * Creates a new terminal-typer effect instance.
	 * @param value - Unparsed, raw value
	 */
	constructor(value: TValue) {
		this.value = value;
	}

	/**
	 * Applies the effect.
	 * @param state - The current state of the rendering operation.
	 */
	abstract apply(state: RenderState): void | Promise<void>;

	/**
	 * Applies the effect instantly.
	 * @param state - The current state of the rendering operation.
	 */
	abstract applyInstantly(state: Omit<RenderState, "currentInvisibleNode">): void;
}