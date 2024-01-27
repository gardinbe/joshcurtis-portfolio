import { merge } from "lodash";
import { TextFragment } from "./types/general";
import { DeleteModifierValue, Modifier } from "./types/modifiers";
import { Marker } from "./types/markers";
import { OptionalProps } from "@/lib/types/utils";
import { delay, randomDelay } from "@/lib/utils/delay";

export interface TerminalTextRenderOptions {
	/**
	 * Whether or not to predetermine the minimum height of an element.
	 *
	 * If a `[[minHeight]]` keyword is used, then this will be where this height is
	 * determined.
	 *
	 * This stops the element from slowing increasing in height over time, as
	 * more characters are added.
	 */
	predetermineHeight?: boolean;
}

/**
 * Apply a terminal-text/typewriter effect to an element with text nodes inside of
 * it.
 *
 * Using the provided syntax, modifiers and effects can be applied to the text.
 */
export class TerminalTextRenderer {
	static readonly defaultRenderOptions: Required<OptionalProps<TerminalTextRenderOptions>> = {
		predetermineHeight: false
	};

	private readonly cursor: HTMLElement;

	/**
	 * Creates an instance of the Terminal Text effect on an element.
	 */
	constructor() {
		this.cursor = this.createCursorElmt();
	}

	/**
	 * Render the parsed text nodes and their text fragments to the text element.
	 * @param elmt - Target element
	 * @param nodesWithFragments - Map of text nodes with their text fragments
	 * @param options - Rendering options
	 */
	async render(
		elmt: HTMLElement,
		nodesWithFragments: Map<Node, TextFragment[]>,
		options?: TerminalTextRenderOptions
	) {
		const _options = merge({}, TerminalTextRenderer.defaultRenderOptions, options);

		if (_options.predetermineHeight)
			await this.setPredeterminedHeight(elmt, nodesWithFragments);

		elmt.style.visibility = "";

		//and wait for all chars to be added
		for (const [node, fragments] of nodesWithFragments)
			await this.insertFragments(elmt, node, fragments);

		if (_options.predetermineHeight)
			this.removePredeterminedHeight(elmt);
	}

	/**
	 * Display the final message very temporarily to accurately get and
	 * set the final height.
	 *
	 * Sets a short timeout that, after resolving,
	 * sets the pretedermined height.
	 * @param elmt - Target element
	 * @param nodesWithFragments - Map of text nodes with their text fragments
	 */
	private async setPredeterminedHeight(
		elmt: HTMLElement,
		nodesWithFragments: Map<Node, TextFragment[]>
	) {
		const temporarilySetText = () => {
			for (const [node, fragments] of nodesWithFragments) {
				const minHeightMarkerIndex = fragments.findIndex(fragment =>
					typeof fragment !== "string"
					&& fragment.type === "marker"
					&& fragment.option === "minHeight");

				const fragmentsToInsert = minHeightMarkerIndex > -1
					? fragments.slice(0, minHeightMarkerIndex)
					: fragments;

				const charFragments = fragmentsToInsert.filter(
					(value): value is string => typeof value === "string"
				);

				node.textContent = charFragments.join("");

				if (minHeightMarkerIndex > -1)
					return;
			}
		};

		temporarilySetText();

		await delay(250);

		elmt.style.minHeight = `${elmt.clientHeight}px`;

		for (const [node] of nodesWithFragments)
			node.textContent = "";
	}

	/**
	 * Remove the predetermined height.
	 * @param elmt - Target element
	 */
	private removePredeterminedHeight(elmt: HTMLElement) {
		elmt.style.minHeight = "";
	}

	/**
	 * Create the cursor element.
	 * @returns Created cursor element
	 */
	private createCursorElmt() {
		const elmt = document.createElement("span");
		elmt.classList.add("cursor");
		elmt.dataset.blink = "false";
		return elmt;
	}

	/**
	 * Start blinking the cursor.
	 */
	private startBlinking() {
		this.cursor.dataset.blink = "true";
	}

	/**
	 * Stop blinking the cursor.
	 */
	private stopBlinking() {
		this.cursor.dataset.blink = "false";
	}

	/**
	 * Insert text fragments onto a Text Node, one by one.
	 * @param node - Target text node
	 * @param fragments - Fragments to be added
	 */
	private async insertFragments(
		elmt: HTMLElement,
		node: Node,
		fragments: TextFragment[]
	) {
		if (node.nextSibling !== null)
			node.parentNode!.insertBefore(this.cursor, node.nextSibling);
		else if (node.parentNode !== elmt)
			node.parentNode!.appendChild(this.cursor);

		this.stopBlinking();

		for (const fragment of fragments)
			await this.insertFragment(node, fragment);

		this.startBlinking();
	}

	/**
	 * Insert a text fragment onto a Text Node.
	 *
	 * If it's a char, it will just be appended alongside a random duration.
	 *
	 * If it's a keyword, it will be applied.
	 * @param node - Target text node
	 * @param fragment - Fragment to be added
	 */
	private async insertFragment(node: Node, fragment: TextFragment) {
		if (typeof fragment === "string") {
			node.textContent = (node.textContent ?? "") + fragment;
			//TODO -> perhaps a normal distribution would be more realistic
			await randomDelay(10, 80);
			return;
		}

		switch (fragment.type) {
			case "modifier":
				await this.applyModifier(node, fragment);
				return;

			case "marker":
				this.applyMarker(fragment);
				return;
		}
	}

	/**
	 * Apply a modifier to a text node.
	 * @param node - Target text node
	 * @param modifier - Modifier
	 */
	private async applyModifier(node: Node, modifier: Modifier) {
		switch (modifier.option) {
			case "delay":
				this.startBlinking();
				await delay(modifier.value);
				this.stopBlinking();
				return;

			case "delete":
				await this.deleteChars(node, modifier.value);
				return;
		}
	}

	/**
	 * Apply a marker to a text node.
	 * @param marker - Marker
	 */
	private applyMarker(marker: Marker) {
		switch (marker.option) {
			case "minHeight":
				return;
		}
	}

	/**
	 * Perform the 'delete' modifier and remove chars from the text.
	 * @param node - Target text node
	 * @param quantity - Quantity of chars to remove
	 */
	private async deleteChars(node: Node, quantity: DeleteModifierValue) {
		const remaining = quantity === "line" || quantity === "element"
			? node.textContent?.length ?? 0
			: quantity;

		for (let i = 0; i < remaining; i++) {
			node.textContent = node.textContent?.slice(0, node.textContent.length - 1) ?? null;
			await randomDelay(10, 50);
		}

		if (quantity === "element") {
			node.parentElement!.previousElementSibling?.appendChild(this.cursor);
			node.parentElement!.remove();
		}
	}
}