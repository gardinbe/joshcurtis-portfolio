import { Config } from "../../../types/config.types";
import { requiredEnv } from "../../../utils/required-env";

export default <Config>(({ env }) => ({
	url: requiredEnv(env, "RENDER_EXTERNAL_URL"),
	dirs: {
		public: "/data/public" // need to get upgrade ".tmp/public"
	}
}));
