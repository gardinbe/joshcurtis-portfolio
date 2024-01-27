//Modifiers

/** A modifier within a text string that performs actions to the string. */

export type Modifier = DelayModifier | DeleteModifier;

interface BaseModifier {
	type: "modifier";
}

interface DelayModifier extends BaseModifier {
	option: "delay";
	value: number;
}

export type DelayModifierValue = number;

interface DeleteModifier extends BaseModifier {
	option: "delete";
	value: DeleteModifierValue;
}

export type DeleteModifierValue = number | "line" | "element";