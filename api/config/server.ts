import { Config } from "./lib/types/config";

const config: Config = ({ env }) => ({
	host: env("HOST", "0.0.0.0"),
	port: env.int("PORT", 1337),
	app: {
		keys: env.array<string>("APP_KEYS")
	},
	webhooks: {
		populateRelations: env.bool("WEBHOOKS_POPULATE_RELATIONS", false)
	}
});

export default config;
