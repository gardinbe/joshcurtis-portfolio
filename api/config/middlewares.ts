export default [
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
				"http://joshuacurtis.co.uk",
				"https://joshuacurtis.co.uk",
				"http://www.joshuacurtis.co.uk",
				"https://www.joshuacurtis.co.uk"
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
];
