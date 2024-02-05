/**
 * Functions to parse environment variables.
 */
export const envParser = {
	/**
	 * Parse and resolve an environment variable as a string.
	 * @param value - Target environment variable value
	 * @returns Parsed value
	 */
	str(value: string | undefined) {
		return value ?? null;
	},

	/**
	 * Parse and resolve an environment variable as a boolean.
	 * @param value - Target environment variable value
	 * @returns Parsed value
	 */
	bool(value: string | undefined) {
		if (value === "true")
			return true;

		if (value === "false")
			return false;

		return null;
	},

	/**
	 * Parse and resolve an environment variable as a number.
	 * @param value - Target environment variable value
	 * @returns Parsed value
	 */
	num(value: string | undefined) {
		if (!value)
			return null;

		const parsedValue = parseFloat(value);
		if (isNaN(parsedValue))
			return null;

		return parsedValue;
	}
} as const;