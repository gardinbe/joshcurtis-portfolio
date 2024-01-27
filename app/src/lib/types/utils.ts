/**
 * Get only the optional properties from an object.
 */
export type OptionalProps<T> = Pick<T,
	{ [K in keyof T]-?: object extends Pick<T, K> ? K : never }[keyof T]
>;

/**
 * A type who must not be undefined.
 */
export type Defined<T = unknown> = T extends undefined ? never : T;