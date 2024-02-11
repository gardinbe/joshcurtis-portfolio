import { TerminalTyperParser, TerminalTyperParserOptions } from "./parser";
import { TerminalTyperRendererOptions, TerminalTyperRenderer } from "./renderer";
import { Effect } from "./effects";

/*
 * TODO: this whole thing needs rewriting
 *
 * See this: https://www.reddit.com/r/css/comments/kd1g0a/before_with_position_absolute_causing_line_breaks/
 *
 * It will be a massive pain, but probably how it should have been written
 * from the start:
 *
 * - make a <span> for every character
 * - position:absolute the cursor and use js to position it. use a resizeobserver
 *
 * this will fuck up everything already written... a problem for another day
 */




/**
 * Options for a terminal-typer instance.
 */
export type TerminalTyperOptions =
	TerminalTyperParserOptions &
	TerminalTyperRendererOptions;

/**
 * Handles a terminal-typing effect on element with text nodes.
 *
 * Using the provided syntax, effects can be specified and applied
 * within the text of these text nodes themselves.
 */
export class TerminalTyper {
	private readonly el: HTMLElement;
	private readonly parser: TerminalTyperParser;
	private readonly renderer: TerminalTyperRenderer;
	private readonly textNodesWithEffects: Map<Text, Effect[]>;

	/**
	 * Creates a new terminal-typer instance.
	 * @param el - Target element
	 * @param options - Terminal-typer options
	 */
	constructor(el: HTMLElement, options?: TerminalTyperOptions) {
		this.el = el;
		this.parser = new TerminalTyperParser(options);
		this.renderer = new TerminalTyperRenderer(options);
		this.textNodesWithEffects = this.parser.parse(this.el);
	}

	/**
	 * Starts rendering the effect.
	 */
	async start() {
		await this.renderer.render(this.textNodesWithEffects);
	}
}