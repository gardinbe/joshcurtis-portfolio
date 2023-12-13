/**
 * Object of functions to cast an environment variable to a given type.
 */
export const envCast = {
	string(envVar: unknown, defaultValue?: string) {
		if (envVar === undefined) {
			if (defaultValue !== undefined)
				return defaultValue;
			else
				throw new Error("Required environment variable is missing");
		}

		//always a string otherwise - just return string
		return envVar as string;
	},
	bool(envVar: unknown, defaultValue?: boolean) {
		if (envVar === undefined) {
			if (defaultValue !== undefined)
				return defaultValue;
			else
				throw new Error("Required environment variable is missing");
		}

		//convert string to bool
		if (envVar === "true")
			return true;
		else if (envVar === "false")
			return false;
		else
			throw new Error(`Failed to cast environment variable value '${envVar as string}' as boolean`);
	},
	number(envVar: unknown, defaultValue?: number) {
		if (envVar === undefined) {
			if (defaultValue !== undefined)
				return defaultValue;
			else
				throw new Error("Required environment variable is missing");
		}

		//convert string to number
		const num = parseFloat(envVar as string);
		if (isNaN(num))
			throw new Error(`Failed to cast environment variable value '${envVar as string}' as number`);

		return num;
	}
};