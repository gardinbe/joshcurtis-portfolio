import { Config } from "./lib/types/config";

const config: Config = () => ({
	rest: {
		defaultLimit: 25,
		maxLimit: 100,
		withCount: true
	}
});

export default config;
