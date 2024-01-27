declare interface ImportMetaEnv {
	/** Hostname of the Strapi API. */
	VITE_STRAPI_HOST?: string;
	/** Hostname of the Strapi API's media provider. */
	VITE_STRAPI_MEDIA_HOST?: string;
	/** The time to wait for a response (in seconds) before giving up. */
	VITE_STRAPI_TIMEOUT?: string;
}