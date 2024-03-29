import { EffectBuilder } from "../types";
import { strToFloat } from "../utils";
import { Effect, EffectContext } from "./abstract";
import { delay } from "~/lib/utils/delay";

interface WaitEffectContext extends EffectContext {
	/** Delay duration in seconds. */
	duration: number;
}

export class WaitEffect extends Effect<WaitEffectContext> {
	static builder(): EffectBuilder<WaitEffect> {
		return {
			key: "wait",
			create: ctx =>
				new WaitEffect({
					containers: ctx.containers,
					cursor: ctx.cursor,
					duration: strToFloat(ctx.rawValue)
				})
		};
	}

	async apply() {
		this.ctx.cursor.startBlinking();
		await delay(this.ctx.duration * 1000);
		this.ctx.cursor.stopBlinking();
	}

	applyInvisible() { }
}