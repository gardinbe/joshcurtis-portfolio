import { Config } from "../../../types/config.types";
import { requiredEnv } from "../../../utils/required-env";

const config: Config = ({ env }) => ({
	url: requiredEnv(env, "RENDER_EXTERNAL_URL"),
	dirs: {
		public: "/data/public"
	}
});

export default config;