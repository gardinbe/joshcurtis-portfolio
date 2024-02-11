import { Cursor, EffectInterval } from "./types";
import { Effect } from "./effects";
import { DefaultOptions, Options } from "@/lib/types/utils";

/**
 * Options for a terminal-typer renderer instance.
 */
export interface TerminalTyperRendererOptions {
	/** Cursor options. */
	cursor?: {
		/**
		 * Symbol used for the cursor.
		 *
		 * ### Suggested values
		 *
		 * - ▏ Left One-Eighth Block
		 * - ▎ Left One-Quarter Block
		 * - ▍ Left Three-Eighths Block
		 * - ▌ Left Half Block
		 * - ▋ Left Five-Eighths Block
		 * - ▊ Left Three-Quarters Block
		 * - ▉ Left Seven-Eighths Block
		 * - ▁ Lower One-Eighth Block
		 * - ▂ Lower One-Quarter Block
		 * - ▃ Lower Three-Eighths Block
		 * - ▄ Lower Half Block
		 * - █ Full Block
		 * - _ Low Line (underscore)
		 * - | Vertical Line (pipe)
		 * - ▮ Black Vertical Rectangle
		 * - ● Black Circle
		 * - ◆ Black Diamond
		 * - ❖ Black Diamond Minus White X
		 * @defaultValue
		 * ```typescript
		 *	"|" //Vertical Line (pipe)
		 * ```
		 */
		symbol?: string;
		/**
		 * Class name for the cursor.
		 *
		 * You can target this class name to apply any custom styling to the
		 * cursor.
		 * - You can also write styling rules for the 'blinking' dataset
		 * property:
		 * ```css
		 *	data-blinking=["true"/"false"]
		 * ```
		 * @defaultValue
		 * ```typescript
		 *	"cursor"
		 * ```
		 */
		className?: string;
	};
	/** Interval durations between character operations. */
	intervals?: {
		/**
		 * Interval between character insertions.
		 * @defaultValue
		 * ```typescript
		 *	{ variance: "random", min: 10, max: 80 }
		 * ```
		 */
		insert?: EffectInterval;
		/**
		 * Interval between character deletions.
		 * @defaultValue
		 * ```typescript
		 *	{ variance: "constant", value: 40, afterFirstChar: 350 }
		 * ```
		 */
		delete?: EffectInterval & {
			/**
			 * Delay after the first character has been deleted.
			 * - Remember that whitespaces are counted as characters.
			 * @defaultValue
			 * ```typescript
			 *	null
			 * ```
			 */
			afterFirstCharacter: number | null;
		};
	};
	/**
	 * Whether or not the layout should shift dynamically as effects are
	 * applied.
	 *
	 * ### If layout shift is disabled
	 *
	 * Before rendering is started, an invisible version of the final
	 * output of the rendering will be rendered immediately.
	 *
	 * Once rendering starts, visible text nodes will be created alongside
	 * the invisible ones. As effects are applied (such as character insertions)
	 * to these visible nodes, the corresponding characters in the invisible
	 * nodes are removed.
	 *
	 * By doing this, the layout does not shift, as the overall text content of
	 * the containing element remains constant.
	 * @defaultValue
	 * ```typescript
	 *	false
	 * ```
	 */
	noLayoutShift?: boolean;
}

/**
 * Handles the rendering of terminal-typer characters and effects onto
 * the document.
 */
export class TerminalTyperRenderer {
	static readonly DEFAULT_OPTIONS: DefaultOptions<TerminalTyperRendererOptions> = {
		cursor: {
			symbol: "|",
			className: "cursor"
		},
		intervals: {
			insert: {
				variance: "random",
				min: 10,
				max: 80
			},
			delete: {
				variance: "constant",
				value: 40,
				afterFirstCharacter: 350
			}
		},
		noLayoutShift: false
	};

	static createOptions(
		defaultOptions: DefaultOptions<TerminalTyperRendererOptions>,
		options?: TerminalTyperRendererOptions
	): Options<TerminalTyperRendererOptions> {
		return {
			...Object.assign({},
				defaultOptions,
				options),
			cursor: Object.assign({},
				defaultOptions.cursor,
				options?.cursor),
			intervals: Object.assign({},
				defaultOptions.intervals,
				options?.intervals)
		};
	}

	private readonly options: Options<TerminalTyperRendererOptions>;

	private readonly cursor: Cursor;

	/**
	 * Creates a new terminal-typer renderer instance.
	 * @param options - Terminal-typer renderer options
	 */
	constructor(options?: TerminalTyperRendererOptions) {
		this.options = TerminalTyperRenderer.createOptions(
			TerminalTyperRenderer.DEFAULT_OPTIONS,
			options
		);
		this.cursor = this.createCursor();
	}

	/**
	 * Renders a set of text nodes' effects.
	 * @param textNodesWithEffects - Map of text nodes with their effects
	 */
	async render(textNodesWithEffects: Map<Text, Effect[]>) {
		for (const [textNode] of textNodesWithEffects)
			textNode.textContent = "";

		if (this.options.noLayoutShift)
			this.renderInvisible(textNodesWithEffects);

		for (const [textNode, effects] of textNodesWithEffects)
			await this.applyEffects(textNode, effects);
	}

	/**
	 * Immediately renders an invisible version of the final output of the
	 * effect.
	 * @param textNodesWithEffects - Map of text nodes with their effects
	 */
	private renderInvisible(textNodesWithEffects: Map<Text, Effect[]>) {
		/**
		 * Create a container <span> around the text node, so we can hide it
		 * with css.
		 * @param textNode - Target text node
		 */
		const wrapTextNode = (textNode: Text) => {
			const container = document.createElement("span");
			container.style.visibility = "hidden";
			textNode.parentNode!.insertBefore(container, textNode);
			container.appendChild(textNode);
		};

		for (const [textNode, effects] of textNodesWithEffects) {
			wrapTextNode(textNode);

			for (const effect of effects)
				effect.applyInstantly({
					currentTextNode: textNode,
					cursor: this.cursor,
					options: this.options
				});
		}
	}

	/**
	 * Applies a set of effects to a text node sequentially.
	 * @param textNode - Target text node
	 * @param effects - Effects to apply
	 */
	private async applyEffects(
		textNode: Text,
		effects: Effect[]
	) {
		let
			/** Text node container. The text node may itself be the container. */
			textNodeContainer,
			/** Text node to apply effects to. */
			targetTextNode,
			/** Invisible text node to remove characters from, if it exists. */
			invisibleTextNode;

		if (this.options.noLayoutShift) {
			textNodeContainer = textNode.parentNode!;
			//create a new text node right before the existing one
			targetTextNode = document.createTextNode("");
			textNodeContainer.parentNode!.insertBefore(targetTextNode, textNodeContainer);
			invisibleTextNode = textNode;

		} else {
			textNodeContainer = textNode;
			targetTextNode = textNode;
		}

		//move the cursor right after the text node
		textNodeContainer.parentNode!.insertBefore(this.cursor.el, targetTextNode.nextSibling);

		this.cursor.stopBlinking();

		for (const effect of effects)
			await effect.apply({
				currentTextNode: targetTextNode,
				currentInvisibleTextNode: invisibleTextNode,
				cursor: this.cursor,
				options: this.options
			});

		if (this.options.noLayoutShift)
			//remove the original node (and it's wrapper)
			textNodeContainer.parentNode!.removeChild(textNodeContainer);

		this.cursor.startBlinking();
	}

	/**
	 * Creates and returns an object with a cursor element and functions to
	 * perform actions to it.
	 * @returns Object of cursor element and functions
	 */
	private createCursor(): Cursor {
		const el = document.createElement("span");
		el.classList.add(this.options.cursor.className);
		el.dataset.symbol = this.options.cursor.symbol;
		el.dataset.blinking = "false";

		return {
			/** Cursor element. */
			el,
			/**
			 * Starts blinking the cursor.
			 */
			startBlinking() {
				this.el.dataset.blinking = "true";
			},
			/**
			 * Stops blinking the cursor.
			 */
			stopBlinking() {
				this.el.dataset.blinking = "false";
			}
		};
	}
}