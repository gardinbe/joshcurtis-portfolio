/**
 * Wrapper function to ensure that the variable passed is present. If missing, throw an
 * error.
 * @param getter Item getter function
 * @param key Target key
 * @returns Item
 */
export const requiredEnv = <T>(getter: (key: string) => T | undefined, key: string) => {
	const item = getter(key);
	if (item === null || item === undefined)
		throw new Error(`Missing required environment variable '${key}'`);

	return item as T;
};