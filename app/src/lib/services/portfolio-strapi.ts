import config from "@/config";
import { PortfolioStrapiService } from "@/lib/service-classes/portfolio-strapi";

/**
 * Portfolio Strapi service instance.
 */
export const strapi = new PortfolioStrapiService({
	hostname: config.STRAPI_HOST,
	basePath: "/api",
	baseParams: { populate: "deep" },
	timeout: config.STRAPI_TIMEOUT
});