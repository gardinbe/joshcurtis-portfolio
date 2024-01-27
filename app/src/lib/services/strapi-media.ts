import config from "@/config";
import { StrapiMediaService } from "@/lib/service-classes/strapi-media";

/**
 * Strapi media service instance.
 */
export const strapiMedia = new StrapiMediaService({
	mediaProviderHostname: config.STRAPI_MEDIA_HOST,
	defaultFallbackColor: "var(--fallback-image-color)"
});