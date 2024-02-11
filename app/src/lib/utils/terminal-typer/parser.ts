import { unionWith } from "ramda";
import { DelayEffect, DeleteEffect, Effect } from "./effects";
import { InsertEffect } from "./effects/insert";
import { EffectBuilder } from "./types";
import { DefaultOptions, Options } from "@/lib/types/utils";
import { throwExp } from "@/lib/utils/throw-expression";
import { escapeRegex } from "@/lib/utils";

/**
 * Options for a terminal-typer parser.
 */
export interface TerminalTyperParserOptions {
	/**
	 * Effect symbols used when parsing effects from text.
	 *
	 * - Symbols can be multiple characters.
	 * - Opening and closing symbols can be the same.
	 */
	effectSymbols?: {
		/**
		 * Opening symbol for an effect.
		 * @defaultValue
		 * ```typescript
		 *	"<<"
		 * ```
		 */
		opening?: string;
		/**
		 * Closing symbol for an effect.
		 * @defaultValue
		 * ```typescript
		 *	">>"
		 * ```
		 */
		closing?: string;
		/**
		 * Separator symbol for an effect.
		 * @defaultValue
		 * ```typescript
		 *	":"
		 * ```
		 */
		separator?: string;
	};
	/**
	 * Register additional effects by providing effect builders.
	 *
	 * - If you specify an effect builder that shares the same key as a built-in
	 * effect builder, it will overwrite the built-in one.
	 * @defaultValue
	 * ```typescript
	 *	[
	 *		InsertEffect.builder,
	 *		DelayEffect.builder,
	 *		DeleteEffect.builder
	 *	]
	 * ```
	 */
	effects?: EffectBuilder[];
}

/**
 * Parser for the terminal-typer.
 *
 * Responsible for parsing characters and effects from text.
 */
export class TerminalTyperParser {
	static readonly DEFAULT_OPTIONS: DefaultOptions<TerminalTyperParserOptions> = {
		effectSymbols: {
			opening: "<<",
			closing: ">>",
			separator: ":"
		},
		effects: [
			InsertEffect.builder,
			DelayEffect.builder,
			DeleteEffect.builder
		]
	};

	static createOptions(
		defaultOptions: DefaultOptions<TerminalTyperParserOptions>,
		options?: TerminalTyperParserOptions
	): Options<TerminalTyperParserOptions> {
		return {
			...Object.assign({},
				defaultOptions,
				options),
			effectSymbols: Object.assign({},
				defaultOptions.effectSymbols,
				options?.effectSymbols),
			effects: unionWith(
				(a, b) => a.key === b.key,
				options?.effects ?? [],
				defaultOptions.effects
			)
		};
	}

	/**
	 * Returns all the text nodes on an element.
	 *
	 * Recursively retrieves all text nodes within child nodes.
	 * @param node - Target element/non-text node
	 * @returns All text nodes
	 */
	private static getTextNodes(node: Node): Text[] {
		return Array.from(node.childNodes)
			.flatMap(child => {
				if (child.nodeType !== Node.TEXT_NODE)
					return this.getTextNodes(child);

				//do not use `Array.filter` above: remember that `textContent`
				//returns the text content of every child node as well!
				if (child.textContent === "\n")
					return [];

				return child as Text;
			});
	}

	private readonly options: Options<TerminalTyperParserOptions>;

	/** Regex pattern to match effect strings. */
	private readonly effectPattern: RegExp;
	private readonly escapeOpeningRegex: RegExp;
	private readonly escapeClosingRegex: RegExp;

	/**
	 * Creates a new terminal-typer parser instance.
	 * @param options - Terminal-typer parser options.
	 */
	constructor(options?: TerminalTyperParserOptions) {
		this.options = TerminalTyperParser.createOptions(
			TerminalTyperParser.DEFAULT_OPTIONS,
			options
		);
		this.effectPattern =
			//d flag is needed for `match.index`
			//s flag is to allow modifiers to span multiple lines
			new RegExp(String.raw`(?<!\\)${escapeRegex(this.options.effectSymbols.opening)}\s*(.*?)\s*(?<!\\)${escapeRegex(this.options.effectSymbols.closing)}`, "gds");
		this.escapeOpeningRegex =
			new RegExp(String.raw`\\${this.options.effectSymbols.opening}`, "gds");

		this.escapeClosingRegex =
			new RegExp(String.raw`\\${this.options.effectSymbols.closing}`, "gds");
	}

	/**
	 * Parses a node and returns a map of all of it's text nodes with
	 * their effects.
	 * @param node - Target element
	 * @returns Map of text nodes with their effects
	 */
	parse(node: Node) {
		const textNodes = TerminalTyperParser.getTextNodes(node);

		return new Map(
			textNodes
				.filter(
					textNode => !!textNode.textContent
				)
				.map(
					textNode => [textNode, this.extractEffects(textNode)]
				)
		);
	}

	/**
	 * Parses a text string to extract any effects.
	 *
	 * Returns an array of effects to be performed in order.
	 * @param textNode - Target text node
	 * @returns Array of effects
	 */
	private extractEffects(textNode: Text): Effect[] {
		const effects: Effect[] = [];

		let lastEffectEndIndex = 0;

		const matches = textNode.textContent!.matchAll(this.effectPattern);

		for (const match of matches) {
			//get all the plain text leading up to this effect string
			const leadingText = this.sanitize(
				textNode.textContent!
					.slice(lastEffectEndIndex, match.index)
			);

			effects.push(
				InsertEffect.builder.create(leadingText),
				this.createEffect(match[1]!)
			);

			lastEffectEndIndex = match.index! + match[0].length;
		}

		//get all the remaining text after the last effect string, or
		//if no effect string existed.
		const trailingText = this.sanitize(
			textNode.textContent!
				.slice(lastEffectEndIndex)
		);

		effects.push(
			InsertEffect.builder.create(trailingText)
		);

		return effects;
	}

	/**
	 * Sanitizes a string.
	 *
	 * Removes escape characters where necessary.
	 * @param str - Target string
	 * @returns Sanitized string
	 */
	private sanitize(str: string) {
		return str
			.replaceAll(
				this.escapeOpeningRegex,
				this.options.effectSymbols.opening
			)
			.replaceAll(
				this.escapeClosingRegex,
				this.options.effectSymbols.closing
			);
	}

	/**
	 * Parses and returns a effect.
	 * @param str - Unparsed effect string
	 * @returns Effect builder
	 */
	private createEffect(str: string): Effect {
		const pattern = new RegExp(String.raw`^\s*(.*?)\s*${this.options.effectSymbols.separator}\s*(.*?)\s*$`, "gds");

		const matches = pattern.exec(str);

		const key = matches?.[1]
			?? throwExp("Terminal-typer effect string is invalid");
		const rawValue = matches?.[2]
			?? throwExp("Terminal-typer effect value is missing");

		const effectBuilder = this.options.effects
			.find(
				builder => builder.key === key
			)
			?? throwExp(`Unrecognized terminal-typer effect '${key}'`);

		return effectBuilder.create(rawValue);
	}
}