import { Defined } from "@/lib/types/utils";

interface IEnvironmentVariableCaster {
	string(variable: string | undefined): string;
	string<TDefault = unknown>(variable: string | undefined, defaultValue: TDefault): string | Defined<TDefault>;
	bool(variable: string | undefined): boolean;
	bool<TDefault = unknown>(variable: string | undefined, defaultValue: TDefault): boolean | Defined<TDefault>;
	number(variable: string | undefined): number;
	number<TDefault = unknown>(variable: string | undefined, defaultValue: TDefault): number | Defined<TDefault>;
}

/**
 * Functions to cast an environment variable to a given type.
 */
export const castEnv: IEnvironmentVariableCaster = {
	string<TDefault>(variable: string | undefined, defaultValue?: TDefault) {
		if (variable === undefined || variable === "") {
			if (typeof defaultValue !== "undefined")
				return defaultValue;
			else
				throw new Error("Required environment variable is missing");
		}

		return variable;
	},
	bool<TDefault>(variable: string | undefined, defaultValue?: TDefault) {
		if (variable === undefined || variable === "") {
			if (typeof defaultValue !== "undefined")
				return defaultValue;
			else
				throw new Error("Required environment variable is missing");
		}

		if (variable === "true")
			return true;
		else if (variable === "false")
			return false;

		throw new Error(`Failed to cast environment variable value '${variable}' as boolean`);
	},
	number<TDefault>(variable: string | undefined, defaultValue?: TDefault) {
		if (variable === undefined || variable === "") {
			if (typeof defaultValue !== "undefined")
				return defaultValue;
			else
				throw new Error("Required environment variable is missing");
		}

		const parsedVariable = parseFloat(variable);
		if (isNaN(parsedVariable))
			throw new Error(`Failed to cast environment variable value '${variable}' as number`);

		return parsedVariable;
	}
};