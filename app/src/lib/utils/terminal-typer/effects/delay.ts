import { EffectBuilder, RenderState } from "../types";
import { Effect } from "./base";
import { throwExp } from "@/lib/utils";
import { delay } from "@/lib/utils/delay";

export class DelayEffect extends Effect<number> {
	static builder: EffectBuilder<DelayEffect> = {
		key: "delay",
		create(rawValue: string) {
			const floatValue = parseFloat(rawValue);
			const value = !isNaN(floatValue)
				? floatValue
				: throwExp(`Terminal-typer delay effect value '${rawValue}' is invalid`);

			return new DelayEffect(value);
		}
	};

	async apply(state: RenderState) {
		state.cursor.startBlinking();
		await delay(this.value);
		state.cursor.stopBlinking();
	}

	applyInstantly() { }
}