import { DeepReadonly } from "ts-essentials";

/**
 * A Bootstrap breakpoint name.
 */
export type BSBreakpointName =
	"xs" |
	"sm" |
	"md" |
	"lg" |
	"xl" |
	"xxl";

/**
 * A set of Bootstrap breakpoint upper and lower boundaries.
 */
export interface BSBreakpoint {
	/** Lower boundary of the breakpoint. */
	min: number;
	/** Upper boundary of the breakpoint. */
	max?: number;
}

/**
 * Object of Bootstrap breakpoints.
 *
 * - When using `max-width` in media queries, the value should be
 * set to the upper boundary, `max`, subtracted by `0.02px`.
 */
export const BS_BREAKPOINTS: DeepReadonly<Record<BSBreakpointName, BSBreakpoint>> = {
	xs: {
		min: 0,
		max: 576
	},
	sm: {
		min: 576,
		max: 768
	},
	md: {
		min: 768,
		max: 992
	},
	lg: {
		min: 992,
		max: 1200
	},
	xl: {
		min: 1200,
		max: 1400
	},
	xxl: {
		min: 1400
	}
};