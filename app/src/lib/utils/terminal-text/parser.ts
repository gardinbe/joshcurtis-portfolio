import { Keyword, TextFragment } from "./types/general";
import { Marker } from "./types/markers";
import { DelayModifierValue, DeleteModifierValue, Modifier } from "./types/modifiers";

/**
 * Parser for the terminal text/typewriter.
 *
 * Responsible for parsing chars, modifiers and
 * markers within the text of an element.
 */
export class TerminalTextParser {
	/**
	 * Parse an element and return a map of all of it's text nodes with
	 * their text fragments.
	 * @param elmt - Target element
	 * @returns Parsed text nodes with their text fragments
	 */
	parse(elmt: HTMLElement) {
		const textNodes = this.getTextNodes(elmt);
		const nodesWithFragments = new Map<Node, TextFragment[]>();

		for (const node of textNodes) {
			nodesWithFragments.set(node, this.getTextFragments(node));
			node.textContent = "";
		}

		return nodesWithFragments;
	}

	/**
	 * Return all the text nodes on an element.
	 *
	 * Recursively retrieves all text nodes within child nodes.
	 * @param node - Target element/non-text node
	 * @returns All text nodes
	 */
	private getTextNodes(node: Node) {
		const textNodes: Node[] = [];

		for (const childNode of node.childNodes) {
			if (childNode.nodeType !== Node.TEXT_NODE) {
				textNodes.push(...this.getTextNodes(childNode));
				continue;
			}

			if (childNode.textContent === "\n")
				continue;

			textNodes.push(childNode);
		}

		return textNodes;
	}

	/**
	 * Parse a single text node to get all of it's text fragments.
	 * @param node - Target text node
	 * @returns Text fragments
	 */
	private getTextFragments(node: Node) {
		if (!node.textContent)
			return [];

		//not technically a TextFragment: these are strings, not chars at this point
		let chunks: TextFragment[] = [node.textContent];

		const updateTextChunks = (
			updater: (chunk: string) => TextFragment[]
		) => {
			//smelly and imperative
			for (let index = 0; index < chunks.length; index++) {
				const chunk = chunks[index];
				if (typeof chunk !== "string")
					continue;

				const updatedChunk = updater(chunk);

				chunks = [
					...chunks.slice(0, index),
					...updatedChunk,
					...chunks.slice(index + 1, chunks.length)
				];

				index += updatedChunk.length;
			}
		};

		updateTextChunks(chunk =>
			this.parseKeyword(chunk, "{{", "}}", this.parseModifier.bind(this)));

		updateTextChunks(chunk =>
			this.parseKeyword(chunk, "[[", "]]", this.parseMarker.bind(this)));

		updateTextChunks(chunk => [...chunk]);

		return chunks;
	}

	/**
	 * Parse a text string to replace any keywords (text fragments that aren't
	 * chars).
	 *
	 * Returns an array with the original text, but with the keyword strings
	 * removed from the text: they are replaced with their relevant keyword objects.
	 * @param text - Target text string
	 * @param openingSymbol - Keyword opening symbol
	 * @param closingSymbol - Keyword closing symbol
	 * @param parser - Keyword parser (to create the keyword object)
	 * @returns Array with original text and keyword objects
	 */
	private parseKeyword(
		text: string,
		openingSymbol: string,
		closingSymbol: string,
		parser: (str: string) => Keyword
	) {
		let _text = text;

		//not TextFragments: strings not chars
		const parsedText: (string | Keyword)[] = [];

		//this whole thing stinks, but cant think of a quicker way to do it

		while (_text.includes(openingSymbol) && _text.includes(closingSymbol)) {
			const start = _text.indexOf(openingSymbol);
			const end = _text.indexOf(closingSymbol, start) + closingSymbol.length;
			if (end === -1)
				throw new Error(`Terminal text missing closing '${closingSymbol}'`);

			const keywordStr = _text
				.slice(start + openingSymbol.length, end - closingSymbol.length)
				.trim();

			const keyword = parser(keywordStr);

			parsedText.push(_text.slice(0, start));
			parsedText.push(keyword);

			//edit the text string here, changing the start position of the string itself
			_text = _text.slice(end, _text.length);
		}

		parsedText.push(_text);

		return parsedText;
	}

	/**
	 * Parse and return a modifier using a raw string value.
	 * @param str - Unparsed modifier string
	 * @returns Modifier
	 */
	private parseModifier(str: string): Modifier {
		const seperatorIndex = str.indexOf(":");
		if (seperatorIndex === -1)
			throw new Error("Terminal text modifier is missing seperator colon");

		const parseDeleteModifier = (rawValue: string): DeleteModifierValue => {
			const numericValue = parseFloat(rawValue);
			const value = !isNaN(numericValue)
				? numericValue
				: rawValue;

			if (
				typeof value !== "number"
				&& value !== "line"
				&& value !== "element"
			)
				throw new Error(`Terminal text delete modifier value '${value}' is invalid`);

			return value;
		};

		const parseDelayModifier = (rawValue: string): DelayModifierValue => {
			const numericValue = parseFloat(rawValue);
			const value = !isNaN(numericValue)
				? numericValue
				: rawValue;

			if (typeof value !== "number")
				throw new Error(`Terminal text delay modifier value '${value}' is invalid`);

			return value;
		};

		const option = str
			.slice(0, seperatorIndex)
			.trim();

		const rawValue = str
			.slice(seperatorIndex + 1, str.length)
			.trim();

		switch (option) {
			case "delay":
				return { type: "modifier", option, value: parseDelayModifier(rawValue) };
			case "delete":
				return { type: "modifier", option, value: parseDeleteModifier(rawValue) };
			default:
				throw new Error(`Terminal text modifier option '${option}' is invalid`);
		}
	}

	/**
	 * Parse and return a marker using a raw string value.
	 * @param str - Unparsed marker string
	 * @returns Marker
	 */
	private parseMarker(str: string): Marker {
		const option = str.trim();

		if (option !== "minHeight")
			throw new Error(`Terminal text marker option '${option}' is invalid`);

		return { type: "marker", option };
	}
}