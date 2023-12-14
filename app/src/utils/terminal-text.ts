import { delay, randomDelay } from "@/utils";

/** Either an individal character or a text modifier. */
type TextFragment = Char | Modifier;

type Char = string;

/** A modifier within a text string that performs actions to the string. */
type Modifier = {
	type: ModifierType;
	value: number | string;
};

type ModifierType = "delay" | "delete";

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
			await this.insertChars(node, fragments);

		//if predetermined height set - remove the previously calculated min height
		if (this.predeterminedHeightSet)
			this.elmts.text.style.minHeight = "";
	}

	/**
	 * Display the final message very temporarily to accurately get and set the final height.
	 * Sets a short timeout that, after resolving, sets the pretedermined height.
	 */
	async setPredeterminedHeight() {
		for (const [node, fragments] of this.parsedTextNodes) {
			node.textContent = fragments
				.map(fragment => typeof fragment === "string"
					? fragment
					: "")
				.join("");
		}

		await delay(250);
		this.elmts.text.style.minHeight = `${this.elmts.text.clientHeight}px`;

		for (const [node] of this.parsedTextNodes)
			node.textContent = "";

		this.predeterminedHeightSet = true;
	}

	private createCursorElmt() {
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
	private async insertChars(node: Node, fragments: TextFragment[]) {
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
			//if its just a string character: append it
			if (typeof fragment === "string") {
				await randomDelay(10, 50);
				node.textContent = (node.textContent ?? "") + fragment;
				continue;
			}

			//otherwise, if its a modifier: apply that modifier
			switch (fragment.type) {
				case "delay":
					if (typeof fragment.value !== "number")
						throw new Error("Terminal text 'delay' modifier has invalid value");

					this.startBlinking();
					await delay(fragment.value);
					this.stopBlinking();
					break;

				case "delete":
					if (typeof fragment.value !== "number" && fragment.value !== "line")
						throw new Error("Terminal text 'delete' modifier has invalid value");

					await this.removeChars(node, fragment.value);
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

		while (text.includes("{") && text.includes("}")) {
			const start = text.indexOf("{");
			const end = text.indexOf("}", start);
			if (end === -1)
				throw new Error("Terminal text modifier bracket was opened but never closed");

			const modString = text.slice(start + 1, end).trim();
			const mod = this.getModifier(modString);

			fragments.push(...text.slice(0, start).split(""));
			fragments.push(mod);

			text = text.slice(end + 1, text.length);
		}

		fragments.push(...text);
		return fragments;
	}

	/**
	 * Gets a modifier using a string in the form "name: value".
	 * @param string
	 * @returns Text modifier
	 */
	private getModifier(string: string) {
		const seperatorIndex = string.indexOf(":");
		if (seperatorIndex === -1)
			throw new Error("Terminal text modifier is missing seperator colon");

		const type = string
			.slice(0, seperatorIndex)
			.trim();

		if (!["delay", "delete"].includes(type))
			throw new Error("Terminal text modifier type is invalid");

		const rawValue = string
			.slice(seperatorIndex + 1, string.length)
			.trim();
		const rawValueAsNumber = parseFloat(rawValue);
		const value = isNaN(rawValueAsNumber)
			? rawValue
			: rawValueAsNumber;

		const modifier: Modifier = { type: type as ModifierType, value };
		return modifier;
	}

	/**
	 * Perform the 'delete' modifier and remove chars from the text. This is basic, and cannot
	 * handle climbing up to the previous text node.
	 * @param textNode Target text node
	 * @param quantity Quantity of chars to remove
	 */
	private async removeChars(textNode: Node, quantity: number | "line") {
		const remaining = quantity === "line"
			? textNode.textContent?.length ?? 0
			: quantity;

		for (let i = 0; i < remaining; i++) {
			await randomDelay(10, 50);
			textNode.textContent = textNode.textContent?.slice(0, textNode.textContent.length - 1) ?? null;
		}
	}
}