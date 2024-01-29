import { Config } from "../../lib/types/config";

const config: Config = () => ([
	"strapi::errors",
	"strapi::security",
	{
		name: "strapi::cors",
		config: {
			headers: "*",
			origin: [
				"http://joshuacurtis.co.uk",
				"https://joshuacurtis.co.uk",
				"http://www.joshuacurtis.co.uk",
				"https://www.joshuacurtis.co.uk",
				"http://joshuacurtis-portfolio-app.onrender.com",
				"https://joshuacurtis-portfolio-app.onrender.com",
				"http://www.joshuacurtis-portfolio-app.onrender.com",
				"https://www.joshuacurtis-portfolio-app.onrender.com",
				"http://api.joshuacurtis.co.uk",
				"https://api.joshuacurtis.co.uk",
				"http://www.api.joshuacurtis.co.uk",
				"https://www.api.joshuacurtis.co.uk",
				"http://joshuacurtis-portfolio-api.onrender.com",
				"https://joshuacurtis-portfolio-api.onrender.com",
				"http://www.joshuacurtis-portfolio-api.onrender.com",
				"https://www.joshuacurtis-portfolio-api.onrender.com"
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
						"http://api.joshuacurtis.co.uk",
						"https://api.joshuacurtis.co.uk",
						"http://www.api.joshuacurtis.co.uk",
						"https://www.api.joshuacurtis.co.uk",
						"http://joshuacurtis-portfolio-api.onrender.com",
						"https://joshuacurtis-portfolio-api.onrender.com",
						"http://www.joshuacurtis-portfolio-api.onrender.com",
						"https://www.joshuacurtis-portfolio-api.onrender.com"
					],
					"img-src": [
						"'self'",
						"data:",
						"blob:",
						"market-assets.strapi.io",
						"res.cloudinary.com",
						"http://api.joshuacurtis.co.uk",
						"https://api.joshuacurtis.co.uk",
						"http://www.api.joshuacurtis.co.uk",
						"https://www.api.joshuacurtis.co.uk",
						"http://joshuacurtis-portfolio-api.onrender.com",
						"https://joshuacurtis-portfolio-api.onrender.com",
						"http://www.joshuacurtis-portfolio-api.onrender.com",
						"https://www.joshuacurtis-portfolio-api.onrender.com"
					],
					"media-src": [
						"'self'",
						"data:",
						"blob:",
						"market-assets.strapi.io",
						"res.cloudinary.com",
						"http://api.joshuacurtis.co.uk",
						"https://api.joshuacurtis.co.uk",
						"http://www.api.joshuacurtis.co.uk",
						"https://www.api.joshuacurtis.co.uk",
						"http://joshcurtis-portfolio-api.onrender.com",
						"https://joshcurtis-portfolio-api.onrender.com",
						"http://www.joshcurtis-portfolio-api.onrender.com",
						"https://www.joshcurtis-portfolio-api.onrender.com"
					],
					"upgradeInsecureRequests": null
				}
			}
		}
	}
]);

export default config;
