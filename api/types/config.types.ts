export type Config = (props: { env: EnvFunction; }) => object;

/**
 * Ben - this Strapi `env` helper has no types... so I've copied the types from the
 * docs and their descriptions and popped them here.
 */
export interface EnvFunction {
	/**
	 * Returns the env if defined without casting it
	 */
	(this: void, key: string): string | undefined;
	(this: void, key: string, defaultValue: string | number): string;

	/**
	 * Cast to integer (using parseInt)
	 */
	int(this: void, key: string): number | undefined;
	int(this: void, key: string, defaultValue: number): number;

	/**
	 * Cast to float (using parseFloat)
	 */
	float(this: void, key: string): number | undefined;
	float(this: void, key: string, defaultValue: number): number;

	/**
	 * Cast to boolean (check if the value is equal to 'true')
	 */
	bool(this: void, key: string): boolean | undefined;
	bool(this: void, key: string, defaultValue: boolean): boolean;

	/**
	 * Cast to JS object (using JSON.parse)
	 */
	json<T = unknown>(this: void, key: string): T | undefined;
	json<T = unknown>(this: void, key: string, defaultValue: object): T;

	/**
	 * Cast to array (syntax: ENV_VAR=[value1, value2, value3] | ENV_VAR=["value1", "value2", "value3"])
	 */
	array<T = unknown>(this: void, key: string): T[] | undefined;
	array<T = unknown>(this: void, key: string, defaultValue: T[]): T[];

	/**
	 * Cast to date (using new Date(value))
	 */
	date(this: void, key: string): Date | undefined;
	date(this: void, key: string, defaultValue: Date): Date;

	/**
	 * Returns the env matching oneOf union types
	 */
	oneOf<T = unknown>(this: void, key: string, typesToMatch: string[]): T | undefined;
	oneOf<T = unknown>(this: void, key: string, typesToMatch: string[], defaultValue: string): T;
}