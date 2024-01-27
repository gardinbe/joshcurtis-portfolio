import { castEnv } from "@/lib/utils";

export default {
	/** Hostname of the Strapi API. */
	STRAPI_HOST: castEnv.string(
		import.meta.env.VITE_STRAPI_HOST
	),
	/** Hostname of the Strapi API's media provider. */
	STRAPI_MEDIA_HOST: castEnv.string(
		import.meta.env.VITE_STRAPI_MEDIA_HOST,
		import.meta.env.VITE_STRAPI_HOST
	),
	/** The time to wait for a response (in seconds) before giving up. */
	STRAPI_TIMEOUT: castEnv.number(
		import.meta.env.VITE_STRAPI_TIMEOUT,
		30000
	)
} as const;