import { delay, randomDelay } from "@/utils";

/** Either an individal character or a text modifier. */
type TextFragment = Char | Modifier | Marker;

type Char = string;



//Modifiers

/** A modifier within a text string that performs actions to the string. */

type Modifier = DelayModifier | DeleteModifier;

type ModifierBase = {
	type: "modifier";
};

type DelayModifier = ModifierBase & {
	option: "delay";
	value: number;
};

type DeleteModifier = ModifierBase & {
	option: "delete";
	value: DeleteModifierValue;
};
type DeleteModifierValue = number | "line" | "element";


//Markers

/** A marker within a text string that indicates a point for an event to occur. */
type Marker = MinHeightMarker;

type MarkerBase = {
	type: "marker";
};

type MinHeightMarker = MarkerBase & {
	option: "minHeight";
};

export class TerminalText {
	private elmts: {
		text: HTMLElement;
		cursor: HTMLElement;
	};
	private parsedTextNodes: Map<Node, TextFragment[]>;
	private predeterminedHeightSet = false;

	constructor(config: { textElmt: HTMLElement; }) {
		this.elmts = {
			text: config.textElmt,
			cursor: this.createCursorElmt()
		};

		this.elmts.text.style.visibility = "hidden";

		this.parsedTextNodes = this.getParsedText();
	}

	/**
	 * Start the terminal text effect.
	 */
	async start() {
		this.elmts.text.style.visibility = "";

		//and wait for all chars to be added
		for (const [node, fragments] of this.parsedTextNodes)
			await this.insertFragments(node, fragments);

		//if predetermined height set - remove the previously calculated min height
		if (this.predeterminedHeightSet)
			this.elmts.text.style.minHeight = "";
	}

	/**
	 * Display the final message very temporarily to accurately get and set the final height.
	 * Sets a short timeout that, after resolving, sets the pretedermined height.
	 */
	async setPredeterminedHeight() {
		outer:
		for (const [node, fragments] of this.parsedTextNodes) {
			for (const fragment of fragments) {
				if (typeof fragment !== "string") {
					if (fragment.type === "marker" && fragment.option === "minHeight")
						break outer;

					continue;
				}

				node.textContent += fragment;
			}
		}

		await delay(250);

		this.elmts.text.style.minHeight = `${this.elmts.text.clientHeight}px`;

		for (const [node] of this.parsedTextNodes)
			node.textContent = "";

		this.predeterminedHeightSet = true;
	}

	private createCursorElmt(this: void) {
		const elmt = document.createElement("span");
		elmt.classList.add("cursor");
		elmt.dataset.blink = "false";
		return elmt;
	}

	private startBlinking() {
		this.elmts.cursor.dataset.blink = "true";
	}

	private stopBlinking() {
		this.elmts.cursor.dataset.blink = "false";
	}

	private getParsedText() {
		const textNodes = this.getTextNodes(this.elmts.text);
		const parsedTextNodes = new Map<Node, TextFragment[]>();

		for (const node of textNodes) {
			parsedTextNodes.set(node, this.parseTextNode(node));
			node.textContent = "";
		}

		return parsedTextNodes;
	}

	/**
	 * Return all the text nodes on an element.
	 * @param elmt Target element
	 * @returns All text nodes
	 */
	private getTextNodes(elmt: Node) {
		const textNodes: Node[] = [];

		for (const node of elmt.childNodes) {
			if (node.nodeType !== Node.TEXT_NODE) {
				textNodes.push(...this.getTextNodes(node));
				continue;
			}

			if (node.textContent === "\n")
				continue;

			textNodes.push(node);
		}

		return textNodes;
	}

	/**
	 * Insert the text fragments onto a Text Node incrementally, with a random duration between each insertion.
	 * @param textNode Target text node
	 */
	private async insertFragments(node: Node, fragments: TextFragment[]) {
		//insert the cursor after this node
		if (node.parentNode === null)
			throw new Error("Terminal text text node has missing parent node");

		if (node.nextSibling !== null)
			node.parentNode.insertBefore(this.elmts.cursor, node.nextSibling);
		else if (node.parentNode !== this.elmts.text)
			node.parentNode.appendChild(this.elmts.cursor);

		this.stopBlinking();

		//insert each char
		for (const fragment of fragments) {
			//if its just a char, append it
			if (typeof fragment === "string") {
				node.textContent = (node.textContent ?? "") + fragment;
				await randomDelay(10, 50);
				continue;
			}

			//if its a non-char item, apply it
			switch (fragment.type) {
				case "modifier":
					switch (fragment.option) {
						case "delay":
							this.startBlinking();
							await delay((fragment).value);
							this.stopBlinking();
							break;

						case "delete":
							await this.deleteChars(node, (fragment).value);
							break;
					}
					break;

				case "marker":
					switch (fragment.option) {
						case "minHeight":
							break;
					}
					break;
			}
		}

		this.startBlinking();
	}

	/**
	 * Parse a string as a long array of `SpecialChar`s. This can probably be done in a better way.
	 * @param text Target text
	 * @returns Parsed text
	 */
	private parseTextNode(node: Node) {
		const fragments: TextFragment[] = [];
		let text = node.textContent ?? "";

		const handleNonCharItems = (
			startSymbol: string,
			endSymbol: string,
			parser: (str: string) => Modifier | Marker
		) => {
			while (text.includes(startSymbol) && text.includes(endSymbol)) {
				const start = text.indexOf(startSymbol);
				const end = text.indexOf(endSymbol, start);
				if (end === -1)
					throw new Error(`Terminal text missing closing '${endSymbol}'`);

				const itemString = text
					.slice(start + startSymbol.length, end)
					.trim();
				const item = parser(itemString);

				fragments.push(...text.slice(0, start).split(""));
				fragments.push(item);

				text = text.slice(end + endSymbol.length, text.length); //smelly
			}
		};

		handleNonCharItems("{{", "}}", this.getModifier);
		handleNonCharItems("[[", "]]", this.getMarker);

		fragments.push(...text);

		return fragments;
	}

	/**
	 * Gets a modifier using a string in the form "name: value".
	 * @param str
	 * @returns Text modifier
	 */
	private getModifier(this: void, str: string) {
		const seperatorIndex = str.indexOf(":");
		if (seperatorIndex === -1)
			throw new Error("Terminal text modifier is missing seperator colon");

		const parseDeleteValue = (value: unknown) => {
			if (
				typeof value !== "number" &&
				value !== "line" &&
				value !== "element"
			)
				throw new Error(`Terminal text delete modifier value '${value as string}' is invalid`);

			return value;
		};

		const parseDelayValue = (value: unknown) => {
			if (typeof value !== "number")
				throw new Error(`Terminal text delay modifier value '${value as string}' is invalid`);

			return value;
		};

		const option = str
			.slice(0, seperatorIndex)
			.trim();

		const rawValue: string | number = str
			.slice(seperatorIndex + 1, str.length)
			.trim();

		const rawValueAsNumber = parseFloat(rawValue);

		const value = isNaN(rawValueAsNumber)
			? rawValue
			: rawValueAsNumber;

		const modifier = { type: "modifier", option } as Modifier; //smelly

		switch (option) {
			case "delay":
				modifier.value = parseDelayValue(value);
				break;
			case "delete":
				modifier.value = parseDeleteValue(value);
				break;
			default:
				throw new Error(`Terminal text modifier option '${option}' is invalid`);
		}

		return modifier;
	}

	/**
	 * Gets a marker using a string in the form "name".
	 * @param str
	 * @returns Text marker
	 */
	private getMarker(this: void, str: string) {
		const option = str.trim();

		if (
			option !== "minHeight"
		)
			throw new Error(`Terminal text marker option '${option}' is invalid`);

		const marker: Marker = { type: "marker", option };
		return marker;
	}

	/**
	 * Perform the 'delete' modifier and remove chars from the text.
	 * @param node Target text node
	 * @param quantity Quantity of chars to remove
	 */
	private async deleteChars(node: Node, quantity: DeleteModifierValue) {
		const remaining = quantity === "line" || quantity === "element"
			? node.textContent?.length ?? 0
			: quantity;

		for (let i = 0; i < remaining; i++) {
			node.textContent = node.textContent?.slice(0, node.textContent.length - 1) ?? null;
			await randomDelay(10, 50);
		}

		const parentElmt = node.parentNode as HTMLElement | null;
		if (parentElmt === null)
			throw new Error("Terminal text node is missing parent element");

		if (quantity === "element") {
			parentElmt.previousElementSibling?.appendChild(this.elmts.cursor);
			parentElmt.remove();
		}
	}
}