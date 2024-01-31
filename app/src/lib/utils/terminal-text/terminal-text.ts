import { merge } from "lodash";
import { TerminalTextParser } from "./parser";
import { TerminalTextRenderOptions, TerminalTextRenderer } from "./renderer";
import { OptionalProps } from "@/lib/types/utils";

export interface TerminalTextOptions extends TerminalTextRenderOptions { }

/**
 * Applies a terminal-text/typewriter effect to an element with text
 * nodes.
 *
 * Using the provided syntax, modifiers and effects can be applied to the text.
 */
export class TerminalText {
	private static readonly defaultOptions: Required<OptionalProps<
		TerminalTextOptions
	>> = merge({}, TerminalTextRenderer.defaultRenderOptions);

	private readonly options: Required<TerminalTextOptions>;

	private readonly elmt: HTMLElement;
	private readonly parser: TerminalTextParser;
	private readonly renderer: TerminalTextRenderer;

	/**
	 * Creates a new terminal text instance.
	 * @param elmt - Target element
	 * @param options - Terminal text options
	 */
	constructor(elmt: HTMLElement, defaultOptions?: TerminalTextRenderOptions) {
		this.options = merge({}, TerminalText.defaultOptions, defaultOptions);

		this.elmt = elmt;
		elmt.style.visibility = "hidden";

		this.parser = new TerminalTextParser();
		this.renderer = new TerminalTextRenderer();
	}

	/**
	 * Start the effect.
	 * @param options - Override the default terminal text options for this operation.
	 */
	async start(options?: TerminalTextRenderOptions) {
		const _options = merge({}, this.options, options);
		const nodesWithFragments = this.parser.parse(this.elmt);
		await this.renderer.render(this.elmt, nodesWithFragments, _options);
	}
}