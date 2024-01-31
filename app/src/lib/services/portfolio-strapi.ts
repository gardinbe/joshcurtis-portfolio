import config from "@/config";
import { StrapiService, StrapiServiceOptions } from "@/lib/service-classes/strapi-service";

const options: StrapiServiceOptions = {
	hostname: config.STRAPI_HOST,
	basePath: "/api",
	baseParams: { populate: "deep" }
};

if (config.STRAPI_TIMEOUT)
	options.timeout = config.STRAPI_TIMEOUT;

/**
 * Portfolio Strapi service instance.
 */
export const strapi = new StrapiService(options);