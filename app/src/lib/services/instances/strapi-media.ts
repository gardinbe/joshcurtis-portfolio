import config from "@/config";
import { StrapiMediaService } from "@/lib/services/strapi-media-service";

/**
 * Strapi media service instance.
 */
export const strapiMedia = new StrapiMediaService({
	mediaProviderHostname: config.STRAPI_MEDIA_HOST
		?? config.STRAPI_HOST,
	defaultFallbackColor: "var(--fallback-image-color)"
});