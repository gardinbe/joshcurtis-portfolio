import { EffectBuilder, RenderState } from "../types";
import { Effect } from "./base";

export class InsertEffect extends Effect<string> {
	static builder: EffectBuilder<InsertEffect> = {
		key: "insert",
		create(rawValue) {
			return new InsertEffect(rawValue);
		}
	};

	async apply(state: RenderState) {
		const chars = [...this.value];

		for (const char of chars) {
			if (state.currentInvisibleTextNode)
				state.currentInvisibleTextNode.textContent =
					state.currentInvisibleTextNode.textContent!.slice(1);

			state.currentTextNode.textContent! += char;
			await InsertEffect.applyInterval(state.options.intervals.insert);
		}
	}

	applyInstantly(state: RenderState) {
		state.currentTextNode.textContent! += this.value;
	}
}