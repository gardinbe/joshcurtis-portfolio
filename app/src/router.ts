import { createRouter, createWebHistory } from "vue-router";
import { lazy } from "~/lib/utils";

export default createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			name: "not-found",
			path: "/:pathMatch(.*)*",
			component: lazy(import("~/pages/NotFound/NotFound.vue"))
		},
		{
			name: "error",
			path: "/error",
			component: lazy(import("~/pages/Error/Error.vue"))
		},
		{
			name: "home",
			path: "/",
			component: lazy(import("~/pages/Home/Home.vue")),
			children: [
				{
					name: "about",
					path: "/about",
					component: lazy(import("~/pages/About/About.vue"))
				},
				{
					name: "work",
					path: "/my-work",
					component: lazy(import("~/pages/Work/Work.vue")),
					children: [
						{
							name: "Product",
							path: ":slug",
							component: lazy(import("~/pages/Work/Product/Product.vue"))
						}
					]
				},
				{
					name: "contact",
					path: "/contact",
					component: lazy(import("~/pages/Contact/Contact.vue"))
				}
			]
		}
	]
});