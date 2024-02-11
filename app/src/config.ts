import { envParser, throwExp } from "@/lib/utils";

export default {
	/** Hostname of the Strapi API. */
	STRAPI_HOST: envParser.str(import.meta.env.VITE_STRAPI_HOST)
		?? throwExp("Missing 'VITE_STRAPI_HOST' environment variable"),
	/** Hostname of the Strapi API's media provider. */
	STRAPI_MEDIA_HOST: envParser.str(import.meta.env.VITE_STRAPI_MEDIA_HOST),
	/** Time to wait for a response (in seconds) before giving up. */
	STRAPI_TIMEOUT: envParser.num(import.meta.env.VITE_STRAPI_TIMEOUT)
} as const;