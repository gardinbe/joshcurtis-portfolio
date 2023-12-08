import { Config } from "../types/config.types";
import clientConfigs from "../utils/database-client-configs";
import { requiredEnv } from "../utils/required-env";

export default <Config>(({ env }) => {
	const client = requiredEnv(env, "DATABASE_CLIENT");

	const config = clientConfigs.get(client);
	if (config === undefined)
		throw new Error("Invalid database connection type provided");

	return {
		connection: {
			client,
			...config(env),
			acquireConnectionTimeout: env.int("DATABASE_CONNECTION_TIMEOUT", 60000)
		}
	};
});
