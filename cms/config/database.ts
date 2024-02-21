import { Config } from "./lib/types/config";
import { databaseClientConfigs, throwExp } from "./lib/utils";

const config: Config = ({ env }) => {
	const client = env("DATABASE_CLIENT")
		?? throwExp("Missing 'DATABASE_CLIENT' environment variable");

	const clientConfig = databaseClientConfigs(env)[client]
		?? throwExp("Invalid database connection type provided");

	return {
		connection: {
			client,
			...clientConfig,
			acquireConnectionTimeout: env.int("DATABASE_CONNECTION_TIMEOUT", 60000)
		}
	};
};

export default config;