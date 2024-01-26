import { Config } from "../types/config.types";

const config: Config = () => ({
	rest: {
		defaultLimit: 25,
		maxLimit: 100,
		withCount: true
	}
});

export default config;
