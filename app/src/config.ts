import { envCast } from "@/utils";

export default {
	strapiUrl: envCast.string(
		import.meta.env.VITE_STRAPI_URL
	),
	strapiTimeoutDuration: envCast.number(
		import.meta.env.VITE_STRAPI_TIMEOUT_DURATION,
		30000
	),
	contentCaching: envCast.bool(
		import.meta.env.VITE_CONTENT_CACHING,
		true
	),
	artificialDelay: envCast.bool(
		import.meta.env.VITE_ARTIFICIAL_DELAY,
		false
	),
	artificialDelayDuration: envCast.number(
		import.meta.env.VITE_ARTIFICIAL_DELAY_DURATION,
		1000
	)
} as const;