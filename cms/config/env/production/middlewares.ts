import { Config } from "../../lib/types/config";

const config: Config = () => ([
	"strapi::errors",
	"strapi::security",
	{
		name: "strapi::cors",
		config: {
			headers: "*",
			origin: [
				"http://joshuacurtis.dev",
				"https://joshuacurtis.dev",
				"http://www.joshuacurtis.dev",
				"https://www.joshuacurtis.dev",
				"http://joshuacurtis-portfolio-app.onrender.com",
				"https://joshuacurtis-portfolio-app.onrender.com",
				"http://www.joshuacurtis-portfolio-app.onrender.com",
				"https://www.joshuacurtis-portfolio-app.onrender.com",
				"http://cms.joshuacurtis.dev",
				"https://cms.joshuacurtis.dev",
				"http://www.cms.joshuacurtis.dev",
				"https://www.cms.joshuacurtis.dev",
				"http://joshuacurtis-portfolio-cms.onrender.com",
				"https://joshuacurtis-portfolio-cms.onrender.com",
				"http://www.joshuacurtis-portfolio-cms.onrender.com",
				"https://www.joshuacurtis-portfolio-cms.onrender.com"
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
						"https:",
						"http://cms.joshuacurtis.dev",
						"https://cms.joshuacurtis.dev",
						"http://www.cms.joshuacurtis.dev",
						"https://www.cms.joshuacurtis.dev",
						"http://joshuacurtis-portfolio-cms.onrender.com",
						"https://joshuacurtis-portfolio-cms.onrender.com",
						"http://www.joshuacurtis-portfolio-cms.onrender.com",
						"https://www.joshuacurtis-portfolio-cms.onrender.com"
					],
					"img-src": [
						"'self'",
						"data:",
						"blob:",
						"market-assets.strapi.io",
						"res.cloudinary.com",
						"http://cms.joshuacurtis.dev",
						"https://cms.joshuacurtis.dev",
						"http://www.cms.joshuacurtis.dev",
						"https://www.cms.joshuacurtis.dev",
						"http://joshuacurtis-portfolio-cms.onrender.com",
						"https://joshuacurtis-portfolio-cms.onrender.com",
						"http://www.joshuacurtis-portfolio-cms.onrender.com",
						"https://www.joshuacurtis-portfolio-cms.onrender.com"
					],
					"media-src": [
						"'self'",
						"data:",
						"blob:",
						"market-assets.strapi.io",
						"res.cloudinary.com",
						"http://cms.joshuacurtis.dev",
						"https://cms.joshuacurtis.dev",
						"http://www.cms.joshuacurtis.dev",
						"https://www.cms.joshuacurtis.dev",
						"http://joshuacurtis-portfolio-cms.onrender.com",
						"https://joshuacurtis-portfolio-cms.onrender.com",
						"http://www.joshuacurtis-portfolio-cms.onrender.com",
						"https://www.joshuacurtis-portfolio-cms.onrender.com"
					],
					"upgradeInsecureRequests": null
				}
			}
		}
	}
]);

export default config;
