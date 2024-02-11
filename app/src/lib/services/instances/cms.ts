import config from "@/config";
import { CMSService, CMSServiceOptions } from "@/lib/services/cms-service";

const options: CMSServiceOptions = {
	hostname: config.STRAPI_HOST,
	basePath: "/api",
	baseParams: { populate: "deep" }
};

if (config.STRAPI_TIMEOUT)
	options.timeout = config.STRAPI_TIMEOUT;

/**
 * CMS service instance.
 */
export const cms = new CMSService(options);