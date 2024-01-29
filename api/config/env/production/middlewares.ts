import { Config } from "../../lib/types/config";

const config: Config = () => ([
	"strapi::errors",
	"strapi::security",
	{
		name: "strapi::cors",
		config: {
			headers: "*",
			origin: [
				"http://localhost:1337",
				"http://127.0.0.1:1337",
				"http://localhost:5173",
				"http://127.0.0.1:5173",
				"http://localhost:4173",
				"http://127.0.0.1:4173",
				"http://joshcurtis.co.uk",
				"https://joshcurtis.co.uk",
				"http://www.joshcurtis.co.uk",
				"https://www.joshcurtis.co.uk",
				"http://api.joshcurtis.co.uk",
				"https://api.joshcurtis.co.uk",
				"http://www.api.joshcurtis.co.uk",
				"https://www.api.joshcurtis.co.uk"
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
					"connect-src": [
						"'self'",
						"https:"
					],
					"img-src": [
						"'self'",
						"data:",
						"blob:",
						"market-assets.strapi.io",
						"res.cloudinary.com"
					],
					"media-src": [
						"'self'",
						"data:",
						"blob:",
						"market-assets.strapi.io",
						"res.cloudinary.com"
					],
					"upgradeInsecureRequests": null
				}
			}
		}
	}
]);

export default config;
