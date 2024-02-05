import { DeepReadonly } from "vue";

/**
 * A Boostrap breakpoint name.
 */
export type BSBreakpointName =
	"XS" |
	"SM" |
	"MD" |
	"LG" |
	"XL" |
	"XXL";

/**
 * A set of Bootstrap breakpoint upper and lower boundaries.
 */
export interface BSBreakpoint {
	/** The lower boundary of the breakpoint. */
	min: number;
	/** The upper boundary of the breakpoint. */
	max?: number;
}

/**
 * Object of Bootstrap breakpoints.
 *
 * ***Note***: When using `max-width` in media queries, the value should be
 * set to the upper boundary, `max`, subtracted by `0.02px`.
 */
export const bsBreakpoints: DeepReadonly<Record<BSBreakpointName, BSBreakpoint>> = {
	XS: {
		min: 0,
		max: 576
	},
	SM: {
		min: 576,
		max: 768
	},
	MD: {
		min: 768,
		max: 992
	},
	LG: {
		min: 992,
		max: 1200
	},
	XL: {
		min: 1200,
		max: 1400
	},
	XXL: {
		min: 1400
	}
};