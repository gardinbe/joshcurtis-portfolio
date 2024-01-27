import { TerminalTextParser } from "./parser";
import { TerminalTextRenderOptions, TerminalTextRenderer } from "./renderer";

/**
 * Apply a terminal-text/typewriter effect to an element with text nodes inside of
 * it.
 *
 * Using the provided syntax, modifiers and effects can be applied to the text.
 */
export class TerminalText {
	private readonly elmt: HTMLElement;
	private readonly parser: TerminalTextParser;
	private readonly renderer: TerminalTextRenderer;

	/**
	 * Creates an instance of the Terminal Text effect on an element.
	 * @param elmt - Target element
	 */
	constructor(elmt: HTMLElement) {
		this.elmt = elmt;

		elmt.style.visibility = "hidden";

		this.parser = new TerminalTextParser();
		this.renderer = new TerminalTextRenderer();
	}

	/**
	 * Start the effect.
	 */
	async start(options?: TerminalTextRenderOptions) {
		const nodesWithFragments = this.parser.parse(this.elmt);
		await this.renderer.render(this.elmt, nodesWithFragments, options);
	}
}