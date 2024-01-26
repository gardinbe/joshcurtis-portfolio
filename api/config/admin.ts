import { Config } from "../types/config.types";

const config: Config = ({ env }) => ({
	auth: {
		secret: env("ADMIN_JWT_SECRET")
	},
	apiToken: {
		salt: env("API_TOKEN_SALT")
	},
	transfer: {
		token: {
			salt: env("TRANSFER_TOKEN_SALT")
		}
	}
});

export default config;