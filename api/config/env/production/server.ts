import { Config } from "../../lib/types/config";
import { throwExp } from "../../lib/utils";

const config: Config = ({ env }) => ({
	url: env("RENDER_EXTERNAL_URL")
		?? throwExp("Missing 'RENDER_EXTERNAL_URL' environment variable"),
	dirs: {
		public: env("PUBLIC_PATH")
			?? throwExp("Missing 'PUBLIC_PATH' environment variable")
	}
});

export default config;