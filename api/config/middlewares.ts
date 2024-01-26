import { Config } from "../types/config.types";

const config: Config = () => ([
	"strapi::errors",
	"strapi::security",
	{
		name: "strapi::cors",
		config: {
			headers: "*",
			origin: [
				"*"
			]
		}
	},
	"strapi::poweredBy",
	"strapi::logger",
	"strapi::query",
	"strapi::body",
	"strapi::session",
	"strapi::favicon",
	"strapi::public",
	{
		name: "strapi::security",
		config: {
			contentSecurityPolicy: {
				useDefaults: true,
				directives: {
					"connect-src": ["'self'", "https:"],
					"img-src": ["'self'", "data:", "blob:", "market-assets.strapi.io", "res.cloudinary.com"],
					"media-src": ["'self'", "data:", "blob:", "market-assets.strapi.io", "res.cloudinary.com"],
					"upgradeInsecureRequests": null
				}
			}
		}
	}
]);

export default config;
