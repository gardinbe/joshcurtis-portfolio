import { EffectBuilder, RenderState } from "../types";
import { Effect } from "./base";
import { throwExp } from "@/lib/utils";
import { delay } from "@/lib/utils/delay";

export class DeleteEffect extends Effect<number | "nodeContent"> {
	static builder: EffectBuilder<DeleteEffect> = {
		key: "delete",
		create(rawValue) {
			const intValue = parseInt(rawValue);
			const value = rawValue === "nodeContent"
				? rawValue
				: !isNaN(intValue)
					? intValue
					: throwExp(`Terminal-typer delete effect value '${rawValue}' is invalid`);

			return new DeleteEffect(value);
		}
	};

	async apply(state: RenderState) {
		let remaining = this.value === "nodeContent"
			? state.currentTextNode.textContent!.length
			: this.value;

		const deleteLastChar = () => {
			state.currentTextNode.textContent =
				state.currentTextNode.textContent!.slice(0, -1);
		};

		if (state.options.intervals.delete.afterFirstCharacter) {
			deleteLastChar();
			await delay(state.options.intervals.delete.afterFirstCharacter);
		}

		while (remaining > 0) {
			deleteLastChar();
			await DeleteEffect.applyInterval(state.options.intervals.delete);
			remaining--;
		}
	}

	applyInstantly(state: RenderState) {
		state.currentTextNode.textContent = this.value === "nodeContent"
			? ""
			: state.currentTextNode.textContent!.slice(0, -this.value);
	}
}